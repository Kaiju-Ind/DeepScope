import type * as observe from '../../../content/observe/index.ts';

import type { DetectionEvidenceState } from "../../../storage/session.ts";

import type { AnalysisEnrichmentState, AnalyzeVisibleTabOutput } from "../../../messaging/index.ts";
import type { ObservationBatch } from "@deepscope/detection/observations";

import { errorResponse, ok, type ExtensionResult } from "../../../messaging/result.ts";
import type { MatcherJobMode, MatcherJobRecord } from "../../../matcher/index.ts";

import { diagnosticErrorType } from "@deepscope/detection/privacy/redaction";

import type { BackgroundRuntimeDependencies, InspectableTab, CompiledRegistry, TabDocumentWorkScope, ActiveMatcherProgressContext, MatcherRunReason } from '../types.ts';
import { summarizeTab, getVisibleSessionId, createMatcherTiming } from '../output.ts';

import type { Type as Analysis } from '../analysis.ts';
import type { Type as Progress } from '../progress.ts';
import type { Type as RefreshSchedule } from '../refresh/schedule.ts';
import type { Type as Work } from '../work.ts';
import type { Type as Tabs } from '../tabs.ts';
import type { Type as JobsExecute } from './execute.ts';
import type { Type as JobsRecord } from './record.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
	readonly matcherContextId: string;
	readonly matcher: Pick<BackgroundRuntimeDependencies['matcher'], 'touchLifecycle'>;
	readonly persistence: Pick<BackgroundRuntimeDependencies['persistence'], 'saveMatcherJob' | 'updateMatcherJob'>;
	readonly hasFreshAnalysis: Analysis['hasFreshAnalysis'];
	readonly hasMatcherProgress: Progress['hasMatcherProgress'];
	readonly flushDeferredObservationRefreshesForTab: RefreshSchedule['flushDeferredObservationRefreshesForTab'];
	readonly getDocumentWork: Work['getDocumentWork'];
	readonly canSaveMatcher: Tabs['canSaveMatcher'];
	readonly getVisibleSessionOwner: Progress['getVisibleSessionOwner'];
	readonly cancelSupersededTabMatchers: Progress['cancelSupersededTabMatchers'];
	readonly setVisibleSessionOwner: Progress['setVisibleSessionOwner'];
	readonly registerMatcherProgress: Progress['registerMatcherProgress'];
	readonly isMatcherCurrent: Progress['isMatcherCurrent'];
	readonly runMatcher: JobsExecute['runMatcher'];
	readonly cancelMatcherJob: JobsExecute['cancelMatcherJob'];
	readonly saveMatcher: JobsRecord['saveMatcher'];
	readonly releaseMatcherProgress: Progress['releaseMatcherProgress'];
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly hasMatcherWorkForTab: (tabId: number) => boolean;
	readonly queueAnalysis: (input: {
	readonly tab: InspectableTab;
	readonly batch: ObservationBatch;
	readonly compiledRegistryArtifact: CompiledRegistry;
	readonly snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'];
	readonly session?: observe.StateType;
	readonly details: MatcherRunReason;
	readonly enrichment?: AnalysisEnrichmentState;
	readonly evidence?: DetectionEvidenceState;
	readonly timingTraceId?: string;
	readonly workScope?: TabDocumentWorkScope;
}) => { readonly registered: Promise<void>; readonly completion: Promise<void> };
	readonly forgetPendingMatcherPersistence: (tabId: number) => void;
}

/** Create one jobs index owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const { hasFreshAnalysis, hasMatcherProgress, flushDeferredObservationRefreshesForTab, getDocumentWork, canSaveMatcher, getVisibleSessionOwner, cancelSupersededTabMatchers, setVisibleSessionOwner, registerMatcherProgress, isMatcherCurrent, runMatcher, cancelMatcherJob, saveMatcher, releaseMatcherProgress } = dependencies;

	const { saveMatcherJob: saveMatcherJobRecord, updateMatcherJob: updateMatcherJobRecord } = dependencies.persistence;

	const logBackgroundEvent = dependencies.logEvent;

	const matcherContextId = dependencies.matcherContextId;

	/** Number of matcher persistence jobs queued per tab before or between progress registrations. */
	const pendingMatcherPersistenceByTab = new Map<number, number>();

	/** Increment queued matcher ownership without losing a second job for the same tab. */
	function beginPendingMatcherPersistence(tabId: number): void {
		pendingMatcherPersistenceByTab.set(tabId, (pendingMatcherPersistenceByTab.get(tabId) ?? 0) + 1);
	}

	/** Release one queued matcher owner and remove the tab only after the final job settles. */
	function endPendingMatcherPersistence(tabId: number): void {
		const count = pendingMatcherPersistenceByTab.get(tabId) ?? 0;
		if (count <= 1) {
			pendingMatcherPersistenceByTab.delete(tabId);
			return;
		}

		pendingMatcherPersistenceByTab.set(tabId, count - 1);
	}

	/** Tell the refresh scheduler whether fresh collection, queued persistence or a matcher still owns this tab. */
	function hasMatcherWorkForTab(tabId: number): boolean {
		return hasFreshAnalysis(tabId) || pendingMatcherPersistenceByTab.has(tabId) || hasMatcherProgress(tabId);
	}

	/** Run matcher persistence after the side-panel command has been released. */
	function queueAnalysis(input: {
		readonly tab: InspectableTab;
		readonly batch: ObservationBatch;
		readonly compiledRegistryArtifact: CompiledRegistry;
		readonly snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'];
		readonly session?: observe.StateType;
		readonly details: MatcherRunReason;
		readonly enrichment?: AnalysisEnrichmentState;
		readonly evidence?: DetectionEvidenceState;
		readonly timingTraceId?: string;
		readonly workScope?: TabDocumentWorkScope;
	}): { readonly registered: Promise<void>; readonly completion: Promise<void> } {
		beginPendingMatcherPersistence(input.tab.id);
		/** Reserve the admission promise's resolver before executor wiring; callers use it to order later evidence passes. */
		let resolveRegistered: () => void = () => undefined;
		const registered = new Promise<void>((resolve) => {
			resolveRegistered = resolve;
		});
		const completion = analyzeBatch(
			input.tab,
			input.batch,
			input.compiledRegistryArtifact,
			input.snapshotStatus,
			input.session,
			input.details,
			input.enrichment,
			input.evidence,
			input.timingTraceId,
			input.workScope,
			resolveRegistered,
		).then((response) => {
			if (!response.ok) {
				resolveRegistered();
				logBackgroundEvent('analysis-queued-persist-failed', {
					...summarizeTab(input.tab),
					code: response.failure.code,
					...(!input.tab.incognito && { message: response.failure.message }),
				});
				return;
			}

			logBackgroundEvent('analysis-queued-persist-complete', {
				...summarizeTab(input.tab),
				resultCount: response.value.analysis.results.length,
			});
		}, (error) => {
			logBackgroundEvent('analysis-queued-persist-threw', {
				...summarizeTab(input.tab),
				...(input.tab.incognito
					? { errorType: diagnosticErrorType(error) }
					: { message: error instanceof Error ? error.message : 'Queued matcher persistence failed.' }),
			});
			resolveRegistered();
		}).finally(() => {
			endPendingMatcherPersistence(input.tab.id);
			flushDeferredObservationRefreshesForTab(input.tab.id);
		});
		return { registered, completion };
	}

	/**
	 * Match one observation batch and persist the exact result that remains current.
	 *
	 * The active progress map deliberately owns the full batch and rule-free runtime registry
	 * only while this function can still publish progress. Its `finally` block is the
	 * memory-lifetime invariant: matcher, replay, storage, or badge failures must never
	 * leave those registry-scale objects reachable from the background runtime.
	 */
	async function analyzeBatch(
		tab: InspectableTab,
		batch: ObservationBatch,
		compiledRegistryArtifact: CompiledRegistry,
		snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'],
		session: observe.StateType | undefined,
		details: MatcherRunReason,
		enrichment?: AnalysisEnrichmentState,
		evidence?: DetectionEvidenceState,
		timingTraceId?: string,
		workScope?: TabDocumentWorkScope,
		onRegistered?: () => void,
	): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
		const matcherMode = details.matcherMode;
		const timingContext = createMatcherTiming(tab, batch, snapshotStatus, matcherMode, details, timingTraceId);
		const ownedWorkScope = workScope ?? getDocumentWork(tab, batch.target.url);
		const signal = ownedWorkScope.controller.signal;
		signal.throwIfAborted();
		await dependencies.matcher.touchLifecycle(ownedWorkScope.lifecycleId, tab.id);
		if (!await canSaveMatcher(tab, batch.target.url)) {
			onRegistered?.();
			return errorResponse('VALIDATION_ERROR', 'Matcher work was skipped because the document changed before dispatch.');
		}

		const matcherJob = createMatcherJobRecord(tab, batch, matcherMode, session);
		const visibleSessionId = getVisibleSessionId(tab, batch, session);
		const supersedesVisibleSession = matcherMode === 'complete';
		const ownerJobId = supersedesVisibleSession
			? matcherJob.jobId
			: getVisibleSessionOwner(visibleSessionId) ?? matcherJob.jobId;
		if (supersedesVisibleSession) cancelSupersededTabMatchers(tab.id, visibleSessionId, matcherJob.jobId);

		await saveMatcherJobRecord(matcherJob);
		if (supersedesVisibleSession) setVisibleSessionOwner(visibleSessionId, matcherJob.jobId);
		const progressContext: ActiveMatcherProgressContext = {
			visibleSessionId,
			visibleSessionOwnerJobId: ownerJobId,
			tab,
			batch,
			compiledRegistryArtifact,
			snapshotStatus,
			matcherExecutor: 'unknown',
			...(evidence ? { evidence } : {}),
			matcherMode,
			...(session ? { session } : {}),
			partitions: [],
			lastVisibleRevisionAt: 0,
			lastVisibleResultCount: 0,
		};
		registerMatcherProgress(matcherJob.jobId, progressContext);
		/** Recheck this job's current progress claim whenever an asynchronous save is about to publish. */
		const ownsPublication = () => isMatcherCurrent(matcherJob.jobId, progressContext);

		try {
			await updateMatcherJobRecord(matcherJob, { status: 'dispatching' });
			if (!ownsPublication()) {
				return errorResponse('VALIDATION_ERROR', 'Matcher job was canceled before dispatch started.');
			}

			onRegistered?.();
			const matcherResult = await runMatcher({
				tab,
				job: matcherJob,
				mode: matcherMode,
				batch,
				registry: compiledRegistryArtifact,
				details,
				timingContext,
				timingTraceId,
				workScope: ownedWorkScope,
			});
			signal.throwIfAborted();
			if (!ownsPublication()) {
				await cancelMatcherJob(matcherJob, 'newer-job');
				return errorResponse('VALIDATION_ERROR', 'Matcher result was superseded by a newer analysis job.');
			}
			progressContext.matcherExecutor = matcherResult.executor;
			const documentIsCurrent = await canSaveMatcher(tab, batch.target.url);
			if (!ownsPublication()) {
				return errorResponse('VALIDATION_ERROR', 'Matcher result no longer owns the visible session.');
			}
			if (!documentIsCurrent) {
				await updateMatcherJobRecord(matcherJob, { status: 'stale', reason: 'navigation' });
				return errorResponse('VALIDATION_ERROR', 'Matcher result belongs to a document that is no longer current.');
			}

			const output = await saveMatcher({
				tab,
				job: matcherJob,
				mode: matcherMode,
				result: matcherResult,
				observationCount: batch.observations.length,
				snapshotStatus,
				session,
				details,
				enrichment,
				evidence,
				timingContext,
				timingTraceId,
				ownsPublication,
			});
			return output
				? ok(output)
				: errorResponse('VALIDATION_ERROR', 'Matcher result no longer owns the visible session.');
		} catch (error) {
			// Navigation, tab closure and superseding analyses abort the document work
			// scope. That revokes publication rights; it is not a matcher failure, so
			// report it like any other lost ownership instead of rethrowing the abort.
			if (signal.aborted) {
				// Record the terminal state the base flow recorded for a superseded result.
				// A storage failure here must not turn cancellation into a matcher failure.
				await updateMatcherJobRecord(matcherJob, { status: 'canceled', reason: ownedWorkScope.abortReason ?? 'newer-job' })
					.catch(() => undefined);
				return errorResponse('VALIDATION_ERROR', 'Matcher work was canceled before it could publish.');
			}
			throw error;
		} finally {
			// This context owns the full observation batch and rule-free runtime registry. Every
			// success, stale-result, cancellation, and persistence failure path must release
			// it so a failed storage write cannot become a long-lived background retainer.
			releaseMatcherProgress(matcherJob.jobId);
		}
	}

	/** Create the queued recovery record with this background context, document/session identity and zero initial partition counts. */
	function createMatcherJobRecord(
		tab: InspectableTab,
		batch: ObservationBatch,
		mode: MatcherJobMode,
		session?: observe.StateType,
	): MatcherJobRecord {
		const now = Date.now();
		const jobId = `matcher:${tab.id}:${now}:${Math.random().toString(36).slice(2)}`;
		return {
			jobId,
			tabId: tab.id,
			contextId: matcherContextId,
			windowId: tab.windowId,
			...(session?.sessionId ? { sessionId: session.sessionId } : {}),
			expectedUrl: tab.url,
			...(tab.incognito ? { incognito: true } : {}),
			status: 'queued',
			mode,
			target: batch.target,
			createdAt: now,
			updatedAt: now,
			observationCount: batch.observations.length,
			partitionCount: 0,
			completedPartitionCount: 0,
		};
	}

	/** Release queued persistence accounting after the tab's document work is canceled. */
	function forgetPendingMatcherPersistence(tabId: number): void { pendingMatcherPersistenceByTab.delete(tabId); }

	return { hasMatcherWorkForTab, queueAnalysis, forgetPendingMatcherPersistence };
}
