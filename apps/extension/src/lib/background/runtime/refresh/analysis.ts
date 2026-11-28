import { createIncrementalCollectionPasses } from "@deepscope/detection/collection/plan";

import { createTimingTraceId, endTimingSpan, startTimingSpan, timeAsyncSpan, timeSyncSpan, type TimingContext } from "../../../diagnostics/timing.ts";
import type { AnalyzeVisibleTabOutput, FlushObservationBatchOutput } from "../../../messaging/index.ts";
import type { ObservationBatch } from "@deepscope/detection/observations";

import { errorResponse, ok, type ExtensionResult } from "../../../messaging/result.ts";

import type { BackgroundRuntimeDependencies, InspectableTab, CompiledRegistry } from '../types.ts';
import { summarizeTab, createVisibleTabIdentity, summarizeCompiledRegistryArtifact, createAnalysisOutput, createObservationSessionTarget, createDetectionEvidenceState, getEvidencePassIds, getReplayTraceForAnalysis, getReplayHistoryForAnalysis } from '../output.ts';
import { mergeObservationBatches, isSameObservationTarget } from "@deepscope/detection/observations/merge";
import type { Type as Publish } from '../publish.ts';
import type { Type as Analysis } from '../analysis.ts';
import type { Type as RefreshBaseline } from './baseline.ts';
import type { Type as Work } from '../work.ts';
import type { Type as Tabs } from '../tabs.ts';
import type { Type as Sessions } from '../sessions.ts';
import type { Type as JobsIndex } from '../jobs/index.ts';
import type { Type as Evidence } from '../evidence.ts';
import type { Type as Content } from '../content.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
	readonly registryProvider: Pick<BackgroundRuntimeDependencies['registryProvider'], 'getRuntimeRegistry'>;
	readonly matcher: Pick<BackgroundRuntimeDependencies['matcher'], 'releaseLifecycle'>;
	readonly persistence: Pick<BackgroundRuntimeDependencies['persistence'], 'getReplayTrace' | 'getReplayHistory'>;
	readonly getLatestVisibleDetectionSnapshot: Publish['getLatestVisibleDetectionSnapshot'];
	readonly analyzeFreshVisibleTab: Analysis['analyzeFreshVisibleTab'];
	readonly getObservationRefreshBaseline: RefreshBaseline['getObservationRefreshBaseline'];
	readonly getDocumentWork: Work['getDocumentWork'];
	readonly canSaveMatcher: Tabs['canSaveMatcher'];
	readonly stopFailedFreshObservation: Sessions['stopFailedFreshObservation'];
	readonly retainObservationRefreshBaseline: RefreshBaseline['retainObservationRefreshBaseline'];
	readonly queueAnalysis: JobsIndex['queueAnalysis'];
	readonly createQueuedAnalysisOutput: Publish['createQueuedAnalysisOutput'];
	readonly runIncrementalEvidencePasses: Evidence['runIncrementalEvidencePasses'];
	readonly collectObservationBatchFromTab: Content['collectObservationBatchFromTab'];
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly analyzeObservationBatchRefresh: (tab: InspectableTab, flush: FlushObservationBatchOutput, timingTraceId?: string) => Promise<ExtensionResult<AnalyzeVisibleTabOutput>>;
}

/** Create one refresh analysis owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const { getLatestVisibleDetectionSnapshot, analyzeFreshVisibleTab, getObservationRefreshBaseline, getDocumentWork, canSaveMatcher, stopFailedFreshObservation, retainObservationRefreshBaseline, queueAnalysis, createQueuedAnalysisOutput, runIncrementalEvidencePasses, collectObservationBatchFromTab } = dependencies;

	const { getReplayTrace: getCachedReplayTrace, getReplayHistory: getCachedReplayTraceHistory } = dependencies.persistence;

	const logBackgroundEvent = dependencies.logEvent;

	/** Merge late facts with the retained baseline or recollect after recovery, then queue matching under the current document's cancellation scope. */
	async function analyzeObservationBatchRefresh(
		tab: InspectableTab,
		flush: FlushObservationBatchOutput,
		timingTraceId = createTimingTraceId('refresh'),
	): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
		const timingContext: TimingContext = {
			traceId: timingTraceId,
			surface: 'background',
			incognito: tab.incognito,
			details: {
				...summarizeTab(tab),
			},
		};
		const totalSpan = startTimingSpan('background.observation-refresh.total', timingContext);
		if (!flush.batch || flush.batch.observations.length === 0) {
			const target = createVisibleTabIdentity(tab);
			const snapshot = await getLatestVisibleDetectionSnapshot(
				target,
				timingContext,
				'storage.get-visible-snapshot-for-empty-refresh',
			);
			if (snapshot) {
				const replayTrace = await timeAsyncSpan(
					'storage.get-cached-replay-trace',
					timingContext,
					() => getCachedReplayTrace(snapshot.analysis.url),
					(value) => ({ replayTraceHit: Boolean(value) }),
				);
				const replayHistory = await timeAsyncSpan(
					'storage.get-replay-history',
					timingContext,
					() => getCachedReplayTraceHistory(snapshot.analysis.url),
					(value) => ({ replayHistoryCount: value.length }),
				);
				endTimingSpan(totalSpan, { ok: true, snapshotHit: true, lateObservationCount: 0 });
				return ok(createAnalysisOutput(
					snapshot.analysis,
					'hit',
					flush.session,
					getReplayTraceForAnalysis(replayTrace, snapshot.analysis),
					getReplayHistoryForAnalysis(replayHistory, snapshot.analysis),
					createObservationSessionTarget(tab, flush.session),
					undefined,
					snapshot.evidence,
				));
			}

			const response = await analyzeFreshVisibleTab(tab, { target, mode: 'refresh', observe: 'while-panel-open' }, 'bypassed');
			endTimingSpan(totalSpan, { ok: response.ok, cacheHit: false, fallback: 'fresh' });
			return response;
		}

		const lateBatch = flush.batch;
		const baseBatch = getObservationRefreshBaseline(tab.id, flush.session);
		const compiledRegistryArtifact = await timeAsyncSpan(
			'background.registry.get-refresh-compiled',
			timingContext,
			() => dependencies.registryProvider.getRuntimeRegistry(),
			summarizeCompiledRegistryArtifact,
		);
		const workScope = getDocumentWork(tab, lateBatch.target.url);
		const signal = workScope.controller.signal;
		signal.throwIfAborted();
		const collectionPasses = createIncrementalCollectionPasses(compiledRegistryArtifact.collectionPlan);
		const [, ...remainingEvidencePasses] = collectionPasses;
		const recoveredRefresh = !baseBatch || !isSameObservationTarget(baseBatch, lateBatch);
		const batchResponse = !recoveredRefresh
			? ok(timeSyncSpan(
				'background.observation-refresh.merge-late-batch',
				timingContext,
				() => mergeObservationBatches(baseBatch, lateBatch),
				(batch) => ({ observationCount: batch.observations.length }),
			))
			: await recoverObservationBatchForRefresh(tab, lateBatch, compiledRegistryArtifact, timingTraceId, signal);
		if (!batchResponse.ok) {
			endTimingSpan(totalSpan, { ok: false, failedAt: 'recover-or-merge' });
			return batchResponse;
		}
		if (!await canSaveMatcher(tab, batchResponse.value.target.url)) {
			await stopFailedFreshObservation(tab, flush.session, 'refresh-document-changed');
			endTimingSpan(totalSpan, { ok: false, failedAt: 'refresh-document-changed' });
			return errorResponse('VALIDATION_ERROR', 'The tab navigated to another document before refresh matcher work could start.');
		}

		retainObservationRefreshBaseline(tab, batchResponse.value, flush.session);
		const requiredEvidencePassIds = getEvidencePassIds(collectionPasses);
		const evidence = createDetectionEvidenceState(recoveredRefresh
			? {
				level: 'recovered-initial',
				completedPassIds: ['initial'],
				requiredPassIds: requiredEvidencePassIds,
				complete: remainingEvidencePasses.length === 0,
				reason: 'service-worker-recovered-refresh',
			}
			: {
				level: 'incremental',
				completedPassIds: ['initial'],
				requiredPassIds: requiredEvidencePassIds,
				complete: remainingEvidencePasses.length === 0,
				reason: 'late-observation-refresh',
			});
		const refreshMatcher = queueAnalysis({
			tab,
			batch: batchResponse.value,
			compiledRegistryArtifact,
			snapshotStatus: 'bypassed',
			session: flush.session,
			details: {
				refreshKind: recoveredRefresh ? 'recovered' : 'incremental',
				matcherMode: 'complete',
				queuedCount: flush.stats.queuedCount,
				lateObservationCount: lateBatch.observations.length,
			},
			enrichment: recoveredRefresh && remainingEvidencePasses.length > 0
				? { status: 'pending', reason: 'awaiting-recovered-enrichment-pass' }
				: undefined,
			evidence,
			timingTraceId,
			workScope,
		});
		let response: AnalyzeVisibleTabOutput;
		try {
			response = await createQueuedAnalysisOutput(tab, 'bypassed', flush.session, timingTraceId);
		} catch (error) {
			await stopFailedFreshObservation(tab, flush.session, 'refresh-create-queued-response');
			endTimingSpan(totalSpan, { ok: false, failedAt: 'refresh-create-queued-response' });
			throw error;
		}
		if (recoveredRefresh && remainingEvidencePasses.length > 0) {
			void refreshMatcher.registered.then(() => {
				void runIncrementalEvidencePasses({
					tab,
					baseBatch: batchResponse.value,
					passes: remainingEvidencePasses,
					compiledRegistryArtifact,
					snapshotStatus: 'bypassed',
					session: flush.session,
					timingTraceId,
					workScope,
					waitForPreviousMatcherCompletion: refreshMatcher.completion,
				});
			});
		}
		else {
			void refreshMatcher.completion.finally(() => dependencies.matcher.releaseLifecycle(workScope.lifecycleId));
		}
		endTimingSpan(totalSpan, {
			ok: true,
			queuedMatcher: true,
			resultCount: response.analysis.results.length,
			lateObservationCount: lateBatch.observations.length,
		});
		return ok(response);
	}

	/** Recollect initial facts after baseline loss and merge late observations before rebuilding candidate relationships. */
	async function recoverObservationBatchForRefresh(
		tab: InspectableTab,
		lateBatch: ObservationBatch,
		compiledRegistryArtifact: CompiledRegistry,
		timingTraceId?: string,
		signal?: AbortSignal,
	): Promise<ExtensionResult<ObservationBatch>> {
		logBackgroundEvent('observation-refresh-recollect', {
			...summarizeTab(tab),
			lateObservationCount: lateBatch.observations.length,
		});

		const recoveredBatch = await collectObservationBatchFromTab(tab, compiledRegistryArtifact, 'initial', timingTraceId, undefined, signal);
		if (!recoveredBatch.ok) {
			return recoveredBatch;
		}

		return ok(mergeObservationBatches(recoveredBatch.value, lateBatch));
	}

	return { analyzeObservationBatchRefresh };
}
