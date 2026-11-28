import { createIncrementalCollectionPasses } from "@deepscope/detection/collection/plan";

import type * as observe from '../../content/observe/index.ts';

import { createTimingTraceId, endTimingSpan, startTimingSpan, timeAsyncSpan, type TimingContext } from "../../diagnostics/timing.ts";
import type { AnalyzeVisibleTabInput, AnalyzeVisibleTabOutput } from "../../messaging/index.ts";
import type { ObservationBatch } from "@deepscope/detection/observations";

import { shouldStartObservationForAnalysis } from "../../lifecycle/observation.ts";

import { errorResponse, ok, type ExtensionResult } from "../../messaging/result.ts";

import type { BackgroundRuntimeDependencies, InspectableTab } from './types.ts';
import { summarizeTab, summarizeCompiledRegistryArtifact, createAnalysisOutput, createDetectionEvidenceState, getEvidencePassIds, getReplayTraceForAnalysis, getReplayHistoryForAnalysis } from './output.ts';

import type { Type as Work } from './work.ts';
import type { Type as Content } from './content.ts';
import type { Type as Sessions } from './sessions.ts';
import type { Type as Tabs } from './tabs.ts';
import type { Type as RefreshBaseline } from './refresh/baseline.ts';
import type { Type as JobsIndex } from './jobs/index.ts';
import type { Type as Publish } from './publish.ts';
import type { Type as Evidence } from './evidence.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
	readonly registryProvider: Pick<BackgroundRuntimeDependencies['registryProvider'], 'getRuntimeRegistry'>;
	readonly matcher: Pick<BackgroundRuntimeDependencies['matcher'], 'releaseLifecycle'>;
	readonly persistence: Pick<BackgroundRuntimeDependencies['persistence'], 'getReplayTrace' | 'getReplayHistory'>;
	readonly beginDocumentWork: Work['beginDocumentWork'];
	readonly beginObservationSessionForTab: Content['beginObservationSessionForTab'];
	readonly collectObservationBatchFromTab: Content['collectObservationBatchFromTab'];
	readonly stopFailedFreshObservation: Sessions['stopFailedFreshObservation'];
	readonly canSaveMatcher: Tabs['canSaveMatcher'];
	readonly retainObservationRefreshBaseline: RefreshBaseline['retainObservationRefreshBaseline'];
	readonly queueAnalysis: JobsIndex['queueAnalysis'];
	readonly createQueuedAnalysisOutput: Publish['createQueuedAnalysisOutput'];
	readonly runIncrementalEvidencePasses: Evidence['runIncrementalEvidencePasses'];
	readonly getInspectableVisibleTab: Tabs['getInspectableVisibleTab'];
	readonly getInspectableScheduledTab: Tabs['getInspectableScheduledTab'];
	readonly getLatestVisibleDetectionSnapshot: Publish['getLatestVisibleDetectionSnapshot'];
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly analyzeFreshVisibleTab: (tab: InspectableTab, input: AnalyzeVisibleTabInput, snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status']) => Promise<ExtensionResult<AnalyzeVisibleTabOutput>>;
	readonly analyzeTabTarget: (input: AnalyzeVisibleTabInput, scope: 'visible' | 'scheduled') => Promise<ExtensionResult<AnalyzeVisibleTabOutput>>;
	readonly hasFreshAnalysis: (tabId: number) => boolean;
	readonly forgetFreshAnalysis: (tabId: number) => void;
}

/** Create one analysis owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const { beginDocumentWork, beginObservationSessionForTab, collectObservationBatchFromTab, stopFailedFreshObservation, canSaveMatcher, retainObservationRefreshBaseline, queueAnalysis, createQueuedAnalysisOutput, runIncrementalEvidencePasses, getInspectableVisibleTab, getInspectableScheduledTab, getLatestVisibleDetectionSnapshot } = dependencies;

	const { getReplayTrace: getCachedReplayTrace, getReplayHistory: getCachedReplayTraceHistory } = dependencies.persistence;

	const logBackgroundEvent = dependencies.logEvent;

	/**
	 * Fresh visible-tab collection blocks observer flushes until the first matcher job is queued.
	 *
	 * Content observers can report dirty facts while the background is still collecting
	 * the initial evidence passes. Those facts stay queued in the content script until
	 * the first matcher job has a chance to publish detector output, otherwise each
	 * dirty notification can start a newer matcher job and make every earlier job
	 * stale before anything is persisted.
	 */
	const activeFreshAnalysisByTab = new Set<number>();

	/** Own a fresh document scan through collection and matcher admission, return its immediate panel state and release in-flight analysis ownership on every exit. */
	async function analyzeFreshVisibleTab(
		tab: InspectableTab,
		input: AnalyzeVisibleTabInput,
		snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'],
	): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
		const timingTraceId = createTimingTraceId(input.mode === 'refresh' ? 'refresh' : 'analysis');
		const totalSpan = startTimingSpan('background.analysis-fresh.total', {
			traceId: timingTraceId,
			surface: 'background',
			incognito: tab.incognito,
			details: {
				...summarizeTab(tab),
				mode: input.mode,
				observe: input.observe,
				snapshotStatus,
			},
		});
		const workScope = beginDocumentWork(tab, 'newer-job');
		logBackgroundEvent('analysis-fresh-start', {
			...summarizeTab(tab),
			mode: input.mode,
			observe: input.observe,
			snapshotStatus,
			pipeline: 'event',
			timingTraceId,
		});
		activeFreshAnalysisByTab.add(tab.id);
		try {
			workScope.controller.signal.throwIfAborted();

			const timingContext: TimingContext = {
				traceId: timingTraceId,
				surface: 'background',
				incognito: tab.incognito,
				details: {
					...summarizeTab(tab),
					mode: input.mode,
					observe: input.observe,
				},
			};
			const compiledRegistryArtifact = await timeAsyncSpan(
				'background.registry.get-complete-compiled',
				timingContext,
				() => dependencies.registryProvider.getRuntimeRegistry(),
				summarizeCompiledRegistryArtifact,
			);
			const collectionPasses = createIncrementalCollectionPasses(compiledRegistryArtifact.collectionPlan);
			const [initialPass, ...remainingPasses] = collectionPasses;
			const requiredEvidencePassIds = getEvidencePassIds(collectionPasses);
			const hasFollowUpEnrichment = remainingPasses.length > 0;
			if (!initialPass) {
				endTimingSpan(totalSpan, { ok: false, failedAt: 'create-collection-passes' });
				return errorResponse('VALIDATION_ERROR', 'No collection pass was available for the active registry.');
			}

			let session: observe.StateType | undefined;
			if (shouldStartObservationForAnalysis(input)) {
				const sessionResponse = await timeAsyncSpan(
					'background.observation-session.begin',
					timingContext,
					() => beginObservationSessionForTab(tab, compiledRegistryArtifact, workScope.controller.signal),
					(response) => ({ ok: response.ok, status: response.ok ? response.value.status : undefined }),
				);
				if (sessionResponse.ok) {
					session = sessionResponse.value;
				} else {
					dependencies.logEvent('observation-session-unavailable', {
						code: sessionResponse.failure.code,
						...(!tab.incognito && { message: sessionResponse.failure.message }),
					});
				}
			}

			let batchResponse: ExtensionResult<ObservationBatch>;
			try {
				batchResponse = await collectObservationBatchFromTab(
					tab,
					compiledRegistryArtifact,
					initialPass.plan.tier,
					timingTraceId,
					initialPass.plan,
					workScope.controller.signal,
				);
			} catch (error) {
				await stopFailedFreshObservation(tab, session, 'collect-initial-threw');
				endTimingSpan(totalSpan, { ok: false, failedAt: 'collect-initial-threw' });
				throw error;
			}
			if (!batchResponse.ok) {
				await stopFailedFreshObservation(tab, session, 'collect-initial');
				endTimingSpan(totalSpan, { ok: false, failedAt: 'collect-initial' });
				return batchResponse;
			}
			if (!await canSaveMatcher(tab, batchResponse.value.target.url)) {
				await stopFailedFreshObservation(tab, session, 'document-changed-after-collection');
				endTimingSpan(totalSpan, { ok: false, failedAt: 'document-changed-after-collection' });
				return errorResponse('VALIDATION_ERROR', 'The tab navigated to another document before matcher work could start.');
			}

			retainObservationRefreshBaseline(tab, batchResponse.value, session);
			const initialMatcher = queueAnalysis({
				tab,
				batch: batchResponse.value,
				compiledRegistryArtifact,
				snapshotStatus,
				session,
				details: {
					refreshKind: 'queued-continuous-initial',
					matcherMode: 'complete',
					collectionPassId: initialPass.id,
					collectionPassCount: collectionPasses.length,
					hasFollowUpEnrichment,
				},
				enrichment: hasFollowUpEnrichment
					? { status: 'pending', reason: 'awaiting-enrichment-pass' }
					: undefined,
				evidence: createDetectionEvidenceState({
					level: hasFollowUpEnrichment ? 'initial' : 'full',
					completedPassIds: [initialPass.id],
					requiredPassIds: requiredEvidencePassIds,
					complete: !hasFollowUpEnrichment,
				}),
				timingTraceId,
				workScope,
			});

			let response: AnalyzeVisibleTabOutput;
			try {
				response = await createQueuedAnalysisOutput(tab, snapshotStatus, session, timingTraceId);
			} catch (error) {
				await stopFailedFreshObservation(tab, session, 'create-queued-response');
				endTimingSpan(totalSpan, { ok: false, failedAt: 'create-queued-response' });
				throw error;
			}
			if (remainingPasses.length > 0) {
				void initialMatcher.registered.then(() => {
					void runIncrementalEvidencePasses({
						tab,
						baseBatch: batchResponse.value,
						passes: remainingPasses,
						compiledRegistryArtifact,
						snapshotStatus,
						session,
						timingTraceId,
						workScope,
						waitForPreviousMatcherCompletion: initialMatcher.completion,
					});
				});
			}
			else {
				void initialMatcher.completion.finally(() => dependencies.matcher.releaseLifecycle(workScope.lifecycleId));
			}
			endTimingSpan(totalSpan, {
				ok: true,
				returnedImmediately: true,
				queuedObservationCount: batchResponse.value.observations.length,
				deferredCollectionPassCount: remainingPasses.length,
				returnedResultCount: response.analysis.results.length,
			});
			return ok(response);
		} finally {
			activeFreshAnalysisByTab.delete(tab.id);
		}
	}

	/** Analyze one exact target using either visible-tab or scheduler-owned validation. */
	async function analyzeTabTarget(
		input: AnalyzeVisibleTabInput,
		scope: 'visible' | 'scheduled',
	): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
		try {
			const tabResponse = scope === 'visible'
				? await getInspectableVisibleTab(input.target)
				: await getInspectableScheduledTab(input.target);
			if (!tabResponse.ok) return tabResponse;

			const tab = tabResponse.value;
			const requestTimingTraceId = createTimingTraceId(input.mode === 'snapshot-first' ? 'panel-open' : 'panel-refresh');
			const requestTimingContext: TimingContext = {
				traceId: requestTimingTraceId,
				surface: 'background',
				incognito: tab.incognito,
				details: {
					...summarizeTab(tab),
					mode: input.mode,
					observe: input.observe,
				},
			};
			logBackgroundEvent('analysis-requested', {
				...summarizeTab(tab),
				mode: input.mode,
				observe: input.observe,
				pipeline: 'event',
				timingTraceId: requestTimingTraceId,
			});
			if (input.mode === 'snapshot-first' && !tab.incognito) {
				const snapshot = await getLatestVisibleDetectionSnapshot(
					input.target,
					requestTimingContext,
					'storage.get-visible-detection-snapshot',
				);
				if (snapshot) {
					const replayTrace = await timeAsyncSpan(
						'storage.get-cached-replay-trace',
						requestTimingContext,
						() => getCachedReplayTrace(snapshot.analysis.url),
						(value) => ({ replayTraceHit: Boolean(value) }),
					);
					const replayHistory = await timeAsyncSpan(
						'storage.get-replay-history',
						requestTimingContext,
						() => getCachedReplayTraceHistory(snapshot.analysis.url),
						(value) => ({ replayHistoryCount: value.length }),
					);
					logBackgroundEvent('analysis-snapshot-hit', {
						...summarizeTab(tab),
						revision: snapshot.revision,
						resultCount: snapshot.analysis.results.length,
						analyzedAt: snapshot.analysis.analyzedAt,
						timingTraceId: requestTimingTraceId,
					});
					const output = createAnalysisOutput(
						snapshot.analysis,
						'hit',
						undefined,
						getReplayTraceForAnalysis(replayTrace, snapshot.analysis),
						getReplayHistoryForAnalysis(replayHistory, snapshot.analysis),
						undefined,
						undefined,
						snapshot.evidence,
					);
					return ok(output);
				}

				logBackgroundEvent('analysis-snapshot-miss', {
					...summarizeTab(tab),
					timingTraceId: requestTimingTraceId,
				});
			}

			return analyzeFreshVisibleTab(tab, input, input.mode === 'refresh' ? 'bypassed' : 'miss');
		} catch (error) {
			activeFreshAnalysisByTab.delete(input.target.tabId);
			const stack = error instanceof Error ? error.stack : undefined;
			const message = error instanceof Error ? error.message : 'Unexpected runtime error';
			return errorResponse('UNKNOWN', message, stack);
		}
	}

	/** Whether initial evidence collection still owns the tab's refresh lane. */
	function hasFreshAnalysis(tabId: number): boolean { return activeFreshAnalysisByTab.has(tabId); }

	/** Release volatile fresh-analysis ownership on navigation or tab closure. */
	function forgetFreshAnalysis(tabId: number): void { activeFreshAnalysisByTab.delete(tabId); }

	return { analyzeFreshVisibleTab, analyzeTabTarget, hasFreshAnalysis, forgetFreshAnalysis };
}
