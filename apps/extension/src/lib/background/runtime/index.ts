import type { BackgroundRuntime, BackgroundRuntimeDependencies } from './types.ts';
import { create as createWork } from './work.ts';
import { create as createTabs } from './tabs.ts';
import { create as createContent } from './content.ts';
import { create as createRefreshBaseline } from './refresh/baseline.ts';
import { create as createRefreshSchedule } from './refresh/schedule.ts';
import { create as createRefreshAnalysis } from './refresh/analysis.ts';
import { create as createAnalysis } from './analysis.ts';
import { create as createEvidence } from './evidence.ts';
import { create as createPublish } from './publish.ts';
import { create as createProgress } from './progress.ts';
import { create as createJobsIndex } from './jobs/index.ts';
import { create as createJobsExecute } from './jobs/execute.ts';
import { create as createJobsRecord } from './jobs/record.ts';
import { create as createSessions } from './sessions.ts';
import { create as createApi } from './api.ts';

/**
 * Compose isolated background owners around browser and persistence adapters.
 *
 * Peer callbacks are resolved only when an operation runs. Construction does not
 * start work, so every owner exists before the first API call or browser event.
 * Document cancellation precedes release of injection, refresh and matcher state.
 */
export function createBackgroundRuntime(dependencies: BackgroundRuntimeDependencies): BackgroundRuntime {
	const matcherContextId = dependencies.matcherContextId ?? crypto.randomUUID();
	const work = createWork({
		logEvent: dependencies.logEvent,
		matcher: dependencies.matcher,
	});
	const tabs = createTabs({
		getTab: dependencies.getTab,
		missingUrlFailure: dependencies.missingUrlFailure,
		logEvent: dependencies.logEvent,
	});
	const content = createContent({
		executeContentScript: dependencies.executeContentScript,
		createContentApiClient: dependencies.createContentApiClient,
		collectObservationBatch: dependencies.collectObservationBatch,
		logEvent: dependencies.logEvent,
	});
	const refreshBaseline = createRefreshBaseline();
	const refreshSchedule = createRefreshSchedule({
		scheduleBackgroundWork: dependencies.scheduleBackgroundWork,
		logEvent: dependencies.logEvent,
		/** Read job admission state at notification time; jobsIndex is wired after the refresh owner. */
		hasMatcherWorkForTab: (...args) => jobsIndex.hasMatcherWorkForTab(...args),
		/** Resolve the session owner when a deferred refresh runs, after all peers exist. */
		refreshObservationSessionTarget: (...args) => sessions.refreshObservationSessionTarget(...args),
	});
	const refreshAnalysis = createRefreshAnalysis({
		logEvent: dependencies.logEvent,
		registryProvider: dependencies.registryProvider,
		matcher: dependencies.matcher,
		persistence: dependencies.persistence,
		/** Use the publication owner's exact-session lookup and badge policy after composition. */
		getLatestVisibleDetectionSnapshot: (...args) => publish.getLatestVisibleDetectionSnapshot(...args),
		/** Start a fresh scan through the analysis owner only when a refresh actually needs recovery. */
		analyzeFreshVisibleTab: (...args) => analysis.analyzeFreshVisibleTab(...args),
		/** Read the retained batch from its sole refresh-state owner instead of caching a construction-time value. */
		getObservationRefreshBaseline: (...args) => refreshBaseline.getObservationRefreshBaseline(...args),
		/** Borrow the current document cancellation scope from the work owner when the operation starts. */
		getDocumentWork: (...args) => work.getDocumentWork(...args),
		/** Recheck live tab identity through the tab owner before a matcher may publish. */
		canSaveMatcher: (...args) => tabs.canSaveMatcher(...args),
		/** Release a failed scan's exact content session through the session owner after wiring. */
		stopFailedFreshObservation: (...args) => sessions.stopFailedFreshObservation(...args),
		/** Keep merged observation batches in the refresh owner shared by subsequent evidence passes. */
		retainObservationRefreshBaseline: (...args) => refreshBaseline.retainObservationRefreshBaseline(...args),
		/** Submit to the single matcher-admission owner after its persistence and progress peers exist. */
		queueAnalysis: (...args) => jobsIndex.queueAnalysis(...args),
		/** Build the immediate panel response through the same publication owner used by completed jobs. */
		createQueuedAnalysisOutput: (...args) => publish.createQueuedAnalysisOutput(...args),
		/** Delegate follow-up collection to the evidence owner without starting work during construction. */
		runIncrementalEvidencePasses: (...args) => evidence.runIncrementalEvidencePasses(...args),
		/** Use the content owner's injection/readiness policy for every requested batch. */
		collectObservationBatchFromTab: (...args) => content.collectObservationBatchFromTab(...args),
	});
	const analysis = createAnalysis({
		logEvent: dependencies.logEvent,
		registryProvider: dependencies.registryProvider,
		matcher: dependencies.matcher,
		persistence: dependencies.persistence,
		/** Allocate the next document cancellation scope only when analysis begins. */
		beginDocumentWork: (...args) => work.beginDocumentWork(...args),
		/** Start page observation through the shared content adapter after the runtime is fully wired. */
		beginObservationSessionForTab: (...args) => content.beginObservationSessionForTab(...args),
		/** Use the content owner's injection/readiness policy for every requested batch. */
		collectObservationBatchFromTab: (...args) => content.collectObservationBatchFromTab(...args),
		/** Release a failed scan's exact content session through the session owner after wiring. */
		stopFailedFreshObservation: (...args) => sessions.stopFailedFreshObservation(...args),
		/** Recheck live tab identity through the tab owner before a matcher may publish. */
		canSaveMatcher: (...args) => tabs.canSaveMatcher(...args),
		/** Keep merged observation batches in the refresh owner shared by subsequent evidence passes. */
		retainObservationRefreshBaseline: (...args) => refreshBaseline.retainObservationRefreshBaseline(...args),
		/** Submit to the single matcher-admission owner after its persistence and progress peers exist. */
		queueAnalysis: (...args) => jobsIndex.queueAnalysis(...args),
		/** Build the immediate panel response through the same publication owner used by completed jobs. */
		createQueuedAnalysisOutput: (...args) => publish.createQueuedAnalysisOutput(...args),
		/** Delegate follow-up collection to the evidence owner without starting work during construction. */
		runIncrementalEvidencePasses: (...args) => evidence.runIncrementalEvidencePasses(...args),
		/** Apply visible-tab identity and privacy checks through the tab owner at request time. */
		getInspectableVisibleTab: (...args) => tabs.getInspectableVisibleTab(...args),
		/** Validate a scheduled target through the tab owner without requiring foreground activation. */
		getInspectableScheduledTab: (...args) => tabs.getInspectableScheduledTab(...args),
		/** Use the publication owner's exact-session lookup and badge policy after composition. */
		getLatestVisibleDetectionSnapshot: (...args) => publish.getLatestVisibleDetectionSnapshot(...args),
	});
	const evidence = createEvidence({
		logEvent: dependencies.logEvent,
		matcher: dependencies.matcher,
		/** Read the retained batch from its sole refresh-state owner instead of caching a construction-time value. */
		getObservationRefreshBaseline: (...args) => refreshBaseline.getObservationRefreshBaseline(...args),
		/** Recheck live tab identity through the tab owner before a matcher may publish. */
		canSaveMatcher: (...args) => tabs.canSaveMatcher(...args),
		/** Use the content owner's injection/readiness policy for every requested batch. */
		collectObservationBatchFromTab: (...args) => content.collectObservationBatchFromTab(...args),
		/** Release a failed scan's exact content session through the session owner after wiring. */
		stopFailedFreshObservation: (...args) => sessions.stopFailedFreshObservation(...args),
		/** Keep merged observation batches in the refresh owner shared by subsequent evidence passes. */
		retainObservationRefreshBaseline: (...args) => refreshBaseline.retainObservationRefreshBaseline(...args),
		/** Submit to the single matcher-admission owner after its persistence and progress peers exist. */
		queueAnalysis: (...args) => jobsIndex.queueAnalysis(...args),
	});
	const publish = createPublish({
		setBadge: dependencies.setBadge,
		logEvent: dependencies.logEvent,
		persistence: dependencies.persistence,
	});
	const progress = createProgress({
		logEvent: dependencies.logEvent,
		persistence: dependencies.persistence,
		/** Send cancellation through the execution owner while progress retains publication ownership. */
		requestMatcherCancellation: (...args) => jobsExecute.requestMatcherCancellation(...args),
		/** Route visible revisions through the publication owner's per-session write fence. */
		savePanelSnapshot: (...args) => publish.savePanelSnapshot(...args),
	});
	const jobsIndex = createJobsIndex({
		logEvent: dependencies.logEvent,
		matcherContextId,
		matcher: dependencies.matcher,
		persistence: dependencies.persistence,
		/** Read the analysis owner's current in-flight state when admitting matcher work. */
		hasFreshAnalysis: (...args) => analysis.hasFreshAnalysis(...args),
		/** Ask the progress owner whether a job still owns visible revision state. */
		hasMatcherProgress: (...args) => progress.hasMatcherProgress(...args),
		/** Resume dirty content notifications through the timer owner after matcher ownership is released. */
		flushDeferredObservationRefreshesForTab: (...args) => refreshSchedule.flushDeferredObservationRefreshesForTab(...args),
		/** Borrow the current document cancellation scope from the work owner when the operation starts. */
		getDocumentWork: (...args) => work.getDocumentWork(...args),
		/** Recheck live tab identity through the tab owner before a matcher may publish. */
		canSaveMatcher: (...args) => tabs.canSaveMatcher(...args),
		/** Read the progress owner's current document/session claim before admitting another job. */
		getVisibleSessionOwner: (...args) => progress.getVisibleSessionOwner(...args),
		/** Let the progress owner retire publication claims before canceling superseded jobs. */
		cancelSupersededTabMatchers: (...args) => progress.cancelSupersededTabMatchers(...args),
		/** Publish a session claim in the one progress owner shared by all matcher callbacks. */
		setVisibleSessionOwner: (...args) => progress.setVisibleSessionOwner(...args),
		/** Allocate progress state only after job admission, through its single owner. */
		registerMatcherProgress: (...args) => progress.registerMatcherProgress(...args),
		/** Check the live progress claim when an asynchronous matcher completion returns. */
		isMatcherCurrent: (...args) => progress.isMatcherCurrent(...args),
		/** Start execution through the job owner after admission and persistence peers are wired. */
		runMatcher: (...args) => jobsExecute.runMatcher(...args),
		/** Cancel an admitted job through the execution owner instead of mutating its state here. */
		cancelMatcherJob: (...args) => jobsExecute.cancelMatcherJob(...args),
		/** Record matcher output through the record owner, which also controls panel publication. */
		saveMatcher: (...args) => jobsRecord.saveMatcher(...args),
		/** Release the progress claim through its owner after a job settles. */
		releaseMatcherProgress: (...args) => progress.releaseMatcherProgress(...args),
	});
	const jobsExecute = createJobsExecute({
		logEvent: dependencies.logEvent,
		matcher: dependencies.matcher,
		persistence: dependencies.persistence,
		/** Apply executor lifecycle updates to the shared progress owner at callback time. */
		updateMatcherState: (...args) => progress.updateMatcherState(...args),
		/** Accumulate partition results in the progress owner that coordinates visible revisions. */
		updatePartitionProgress: (...args) => progress.updatePartitionProgress(...args),
		/** Read current progress when execution needs it; do not retain a stale snapshot during wiring. */
		getMatcherProgress: (...args) => progress.getMatcherProgress(...args),
	});
	const jobsRecord = createJobsRecord({
		logEvent: dependencies.logEvent,
		logAnalysisSummary: dependencies.logAnalysisSummary,
		persistence: dependencies.persistence,
		/** Route visible revisions through the publication owner's per-session write fence. */
		savePanelSnapshot: (...args) => publish.savePanelSnapshot(...args),
	});
	const sessions = createSessions({
		logEvent: dependencies.logEvent,
		/** Validate the exact content-session target through the tab owner before touching observation. */
		getInspectableTabForObservationSessionTarget: (...args) => tabs.getInspectableTabForObservationSessionTarget(...args),
		/** Borrow the current document cancellation scope from the work owner when the operation starts. */
		getDocumentWork: (...args) => work.getDocumentWork(...args),
		/** Recheck live tab identity through the tab owner before a matcher may publish. */
		canSaveMatcher: (...args) => tabs.canSaveMatcher(...args),
		/** Query the installed page runtime through the content owner with its readiness policy. */
		getObservationSessionStateForTab: (...args) => content.getObservationSessionStateForTab(...args),
		/** Drain page-owned observations through the content adapter when session refresh requests them. */
		flushObservationBatchForTab: (...args) => content.flushObservationBatchForTab(...args),
		/** Route a drained batch to the refresh-analysis owner after all dependencies exist. */
		analyzeObservationBatchRefresh: (...args) => refreshAnalysis.analyzeObservationBatchRefresh(...args),
		/** Cancel scheduled and deferred work for the exact session through the timer owner. */
		clearObservationRefreshForSession: (...args) => refreshSchedule.clearObservationRefreshForSession(...args),
		/** Drop the session's retained evidence batch through its sole baseline owner. */
		releaseObservationRefreshBaseline: (...args) => refreshBaseline.releaseObservationRefreshBaseline(...args),
		/** Retire the session's publication claim through the progress owner before late callbacks return. */
		retireVisibleSessionOwnership: (...args) => progress.retireVisibleSessionOwnership(...args),
		/** Stop the exact content session through the shared RPC adapter. */
		stopObservationSessionForTab: (...args) => content.stopObservationSessionForTab(...args),
	});
	const api = createApi({
		persistence: dependencies.persistence,
		/** Resolve ordinary tab inspection through the tab owner's permission and privacy checks. */
		getInspectableTab: (...args) => tabs.getInspectableTab(...args),
		/** Resolve an active target at API-call time using the tab owner's foreground policy. */
		getInspectableActiveTab: (...args) => tabs.getInspectableActiveTab(...args),
		/** Pass API analysis requests to the already-composed analysis owner. */
		analyzeTabTarget: (...args) => analysis.analyzeTabTarget(...args),
		/** Resolve the session owner when a deferred refresh runs, after all peers exist. */
		refreshObservationSessionTarget: (...args) => sessions.refreshObservationSessionTarget(...args),
		/** Route API stop requests to the exact-session owner rather than stopping unrelated page work. */
		stopObservationSessionTarget: (...args) => sessions.stopObservationSessionTarget(...args),
		/** Read observation status through the owner that validates the requested session. */
		getObservationSessionStateForTarget: (...args) => sessions.getObservationSessionStateForTarget(...args),
		/** Coalesce content dirty notifications in the one timer/deferred-work owner. */
		scheduleObservationRefreshFromContent: (...args) => refreshSchedule.scheduleObservationRefreshFromContent(...args),
	});

	/** Drop volatile document state in the same order for navigation and closure. */
	function forgetTabRuntimeState(tabId: number, reason: 'navigation' | 'tab-closed'): void {
		work.abortDocumentWork(tabId, reason);
		content.forgetContentScript(tabId);
		refreshBaseline.releaseObservationRefreshBaseline(tabId);
		analysis.forgetFreshAnalysis(tabId);
		jobsIndex.forgetPendingMatcherPersistence(tabId);
		refreshSchedule.clearScheduledObservationRefreshesForTab(tabId);
		refreshSchedule.clearDeferredObservationRefreshesForTab(tabId);
		progress.forgetMatcherProgress(tabId, reason);
	}

	return {
		api: api.createBackgroundApi(),
		resolveScheduledTab: tabs.resolveScheduledTab,
		/** Select scheduled analysis policy for scheduler callers; the analysis owner retains execution state. */
		analyzeScheduledTab: (input) => analysis.analyzeTabTarget(input, 'scheduled'),
		handleRuntimeMessage: api.handleRuntimeMessage,
		/** Abort and release the old document's volatile owners before navigation can admit fresh work. */
		onTabNavigation: (tabId) => forgetTabRuntimeState(tabId, 'navigation'),
		/** Use the same ordered cleanup for a closed tab while recording its terminal reason. */
		onTabRemoved: (tabId) => forgetTabRuntimeState(tabId, 'tab-closed'),
	};
}
