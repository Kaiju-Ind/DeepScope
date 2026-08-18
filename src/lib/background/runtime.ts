import {
	createIncrementalCollectionPasses,
	type CollectionEvidencePass,
	type CollectionEvidencePassId,
	type CollectionTierPlan,
} from '@/lib/collectors/planning';
import type { ExtensionPageCollectorInput } from '@/lib/collectors/extension-page-collector';
import { DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION } from '@/lib/storage/session';
import type { ObservationSessionState } from '@/lib/content/observed-page-signals';
import type { ContentPageSessionSnapshotTarget } from '@/lib/messaging/analysis';
import type {
	DetectionEnrichmentState,
	DetectionEvidenceState,
	DetectionReplaySummary,
	DetectionSessionKey,
	DetectionSessionSnapshot,
	DetectionSessionSnapshotSource,
	DetectionSessionStatus,
} from '@/lib/storage/session';
import type { TechnologyRegistryProvider } from '@/lib/detection/registry-provider';
import type { SiteAnalysis } from '@/lib/detection/types';
import {
	createDetectionReplayTrace,
	filterReplayHistoryForAnalysis,
	isDetectionReplayTraceForAnalysis,
} from '@/lib/pipeline';
import type { DetectionPipelineStage, DetectionReplayTrace } from '@/lib/pipeline';
import {
	createTimingTraceId,
	endTimingSpan,
	startTimingSpan,
	timeAsyncSpan,
	timeSyncSpan,
	type TimingContext,
} from '@/lib/diagnostics/timing';
import type {
	VisibleTabIdentity,
	AnalysisEnrichmentState,
	AnalyzeVisibleTabInput,
	AnalyzeVisibleTabOutput,
	BackgroundApi,
	ContentApi,
	FlushObservationBatchOutput,
	ObservationSessionTarget,
} from '@/lib/messaging';
import type { NormalizedObservation, ObservationBatch } from '@/lib/observations';
import {
	CONTENT_SCRIPT_TIMEOUT_MS,
	RpcTimeoutError,
	contentScriptFailure,
	withTimeout,
} from '@/lib/messaging/rpc';
import { isObservationDirtyNotification } from '@/lib/messaging/observation-notifications';
import {
	EXTENSION_OBSERVATION_POLICY,
	canRefreshObservationSession,
	getObservationRefreshBlockReason,
	shouldStartObservationForAnalysis,
} from '@/lib/lifecycle/observation';
import { errorResponse, extensionSuccess, type ExtensionResult } from '@/lib/messaging/result';
import {
	MATCHER_OFFSCREEN_CHANNEL,
	createMatcherPipelineResult,
	type MatcherJobMode,
	type MatcherJobRecord,
	type MatcherJobRunResult,
	type MatcherPartitionProgressMessage,
	type MatcherPartitionResult,
	type RunMatcherJobRequest,
} from '@/lib/matcher';
import type { BackgroundDetectionPersistence } from '@/lib/persistence/ports';
import type { CompiledTechnologyRegistryArtifact } from '@/lib/registry/compiler-core';
import * as revision from '@/lib/background/revision';
import * as rank from '@/lib/detection/rank';
import * as url from '@/utils/url';
import {
	STORAGE_LIMITS,
	createDetectionStorageHash,
	getAnalysisResponseKey,
} from '@/lib/storage/contracts';

/** Browser tab fields needed by background orchestration. */
export interface BackgroundRuntimeTab {
	readonly id?: number;
	readonly windowId?: number;
	readonly url?: string;
	readonly active?: boolean;
	readonly incognito?: boolean;
}

/** Sender metadata needed when routing content-runtime notifications. */
export interface BackgroundRuntimeMessageSender {
	readonly tab?: BackgroundRuntimeTab;
}

/** Runtime adapters wired by the browser entrypoint. */
export interface BackgroundRuntimeDependencies {
	readonly getTab: (tabId: number) => Promise<BackgroundRuntimeTab>;
	readonly executeContentScript: (tabId: number) => Promise<void>;
	readonly createContentApiClient: (tabId: number, frameId?: number) => ContentApi;
	readonly collectObservationBatch: (input: ExtensionPageCollectorInput) => Promise<ExtensionResult<ObservationBatch>>;
	readonly registryProvider: Pick<TechnologyRegistryProvider, 'getCompiledRegistry'>;
	readonly matcher: {
		readonly cancelJob: (jobId: string) => Promise<void>;
		readonly ensureOffscreenDocument: () => Promise<boolean>;
		readonly runJob: (request: RunMatcherJobRequest) => Promise<MatcherJobRunResult>;
	};
	readonly persistence: BackgroundDetectionPersistence;
	readonly logEvent: (event: string, details?: Record<string, unknown>) => void;
	readonly logAnalysisSummary: (analysis: SiteAnalysis) => void;
	/** Update the toolbar count and optional highest-confidence finding for one tab. */
	readonly setBadge: (tabId: number, count: number, finding?: string) => Promise<void>;
}

/** Public surface owned by one isolated background runtime instance. */
export interface BackgroundRuntime {
	readonly api: BackgroundApi;
	readonly handleRuntimeMessage: (message: unknown, sender: BackgroundRuntimeMessageSender) => void;
	readonly onTabActivated: (tabId: number, windowId: number) => void;
	readonly onTabNavigation: (tabId: number) => void;
	readonly onTabRemoved: (tabId: number) => void;
}

/** Visible tab shape after unsupported URLs and missing ids have been rejected. */
type InspectableTab = {
	readonly id: number;
	readonly windowId: number;
	readonly url: string;
	readonly incognito: boolean;
};

type CompiledRegistry = CompiledTechnologyRegistryArtifact;

/** Keep browser/internal pages out of content-script orchestration. */
function canInspectTab(tab: { readonly url?: string }): boolean {
	if (!tab.url) {
		return false;
	}

	try {
		const { protocol } = new globalThis.URL(tab.url);
		return protocol === 'http:' || protocol === 'https:';
	} catch {
		return false;
	}
}

/** Select one concise finding for the browser action tooltip without inventing impact scoring. */
function getFinding(analysis: SiteAnalysis): string | undefined {
	return rank.best(analysis.results)?.name;
}

/**
 * Create one background orchestration runtime around explicit browser/infrastructure adapters.
 *
 * All mutable service-worker coordination state is scoped to this instance. The browser
 * entrypoint is responsible only for choosing concrete adapters and registering listeners.
 */
export function createBackgroundRuntime(
	dependencies: BackgroundRuntimeDependencies,
): BackgroundRuntime {
	const CONTENT_SCRIPT_PING_TIMEOUT_MS = 750;

	const {
		getBestVisibleSnapshot: getBestVisibleDetectionSessionSnapshot,
		getReplayTrace: getCachedReplayTrace,
		getReplayHistory: getCachedReplayTraceHistory,
		getLatestSessionSnapshot: getLatestDetectionSessionSnapshot,
		getStatus,
		saveSnapshot: saveDetectionSessionSnapshot,
		saveMatcherJob: saveMatcherJobRecord,
		saveReplayTrace,
		updateMatcherJob: updateMatcherJobRecord,
	} = dependencies.persistence;

	/** Dirty observation notifications are coalesced before background flushes queued facts. */
	const BACKGROUND_OBSERVATION_REFRESH_DELAY_MS = 250;

	/** Each follow-up evidence surface is bounded so one slow collector cannot own the UX. */
	const EVIDENCE_PASS_TIMEOUT_MS = 10_000;

	/**
	 * In-flight runtime injections are deduplicated per tab.
	 *
	 * Side panel refreshes and live-update requests can ask for the content runtime at nearly the same
	 * time. The first request owns the injection; later requests await the same
	 * promise instead of injecting duplicate runtime scripts into the page.
	 */
	const contentScriptInjectionByTab = new Map<number, Promise<ExtensionResult<void>>>();

	/** Observation batch retained only while one refreshable content session owns it. */
	interface ObservationRefreshBaseline {
		/** Full batch used to merge late observer facts into the next refresh. */
		readonly batch: ObservationBatch;
		/** Browser window that owned the visible tab when the session started. */
		readonly windowId: number;
		/** Whether the observed tab belongs to an incognito browser context. */
		readonly incognito: boolean;
		/** Content-session identity that owns this retained batch. */
		readonly sessionId: string;
		/** Session start time used to reject late writes from an older matcher job. */
		readonly startedAt?: number;
		/** Session expiry copied here so an expired baseline is rejected on access. */
		readonly expiresAt?: number;
	}

	/**
	 * Refresh baselines for active content observation sessions only.
	 *
	 * One-shot analyses never enter this map. A panel-owned observer needs one full
	 * batch so late facts can be merged without recollecting the document. The entry
	 * is released when that session stops, navigates, switches tabs, expires, or no
	 * longer matches the caller's session identity. If the Manifest V3 service worker
	 * is suspended and this memory disappears, the refresh path recollects instead.
	 */
	const observationRefreshBaselineByTab = new Map<number, ObservationRefreshBaseline>();

	/** Latest activated tab known for each browser window while this service worker is alive. */
	const activeTabByWindow = new Map<number, number>();

	/** Latest matcher job created for each tab while the background is alive. */
	const latestMatcherJobByTab = new Map<number, string>();

	/** Stable owner for active visible document work while the background is alive. */
	type VisibleSessionId = `${number}:${number}:${string}:${string}`;

	/** Latest matcher job created for each visible page session while the background is alive. */
	const latestMatcherJobByVisibleSession = new Map<VisibleSessionId, string>();

	/** Dirty content-session notifications waiting for a background-owned flush. */
	const scheduledObservationRefreshBySession = new Map<string, ReturnType<typeof globalThis.setTimeout>>();

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

	/** Number of matcher persistence jobs queued per tab before or between progress registrations. */
	const pendingMatcherPersistenceByTab = new Map<number, number>();

	interface PendingObservationRefresh {
		/** Session target whose content queue still needs to be flushed by background. */
		readonly target: ObservationSessionTarget;
		/** Summary-only debug details carried into the eventual scheduled refresh. */
		readonly details: Record<string, unknown>;
	}

	/** Dirty notifications deferred while another matcher job owns the document. */
	const deferredObservationRefreshBySession = new Map<string, PendingObservationRefresh>();

	/** Partial matcher state used to turn worker partition completions into side-panel revisions. */
	interface ActiveMatcherProgressContext {
		/** Stable visible session that owns the matcher job. */
		readonly visibleSessionId: VisibleSessionId;
		/** Superseding job generation this matcher work belongs to. */
		readonly visibleSessionOwnerJobId: string;
		/** Tab and URL identity that owns the matcher job. */
		readonly tab: InspectableTab;
		/** Full observation batch for deterministic partial candidate refinement. */
		readonly batch: ObservationBatch;
		/** Full compiled registry used by the coordinator after worker shards emit matches. */
		readonly compiledRegistryArtifact: CompiledRegistry;
		/** Cache status attached to partial side-panel outputs. */
		readonly snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'];
		/** Active observation session, when the side panel asked for live updates. */
		readonly session?: ObservationSessionState;
		/** Matcher executor path known for partial snapshot revisions. */
		matcherExecutor: DetectionSessionSnapshot['matcherExecutor'];
		/** Evidence completeness attached to partial and final snapshot writes. */
		readonly evidence?: DetectionEvidenceState;
		/** Matcher mode attached to this job for diagnostics. */
		readonly matcherMode: MatcherJobMode;
		/** Completed partition results accumulated in original completion order. */
		readonly partitions: MatcherPartitionResult[];
		/** Last time a partial detector revision was written for side-panel consumption. */
		lastVisibleRevisionAt: number;
		/** Result count written in the last visible detector revision. */
		lastVisibleResultCount: number;
	}

	/** Matcher jobs currently able to publish real incremental side-panel revisions. */
	const activeMatcherProgressByJob = new Map<string, ActiveMatcherProgressContext>();

	/** Background snapshot writes are serialized per exact visible session. */
	const snapshotWriteQueueBySession = new Map<string, Promise<void>>();

	/** Retain one full observation batch only for a live content observation session. */
	function retainObservationRefreshBaseline(
		tab: InspectableTab,
		batch: ObservationBatch,
		session?: ObservationSessionState,
	): void {
		const tabId = tab.id;
		if (!session?.sessionId || !canRefreshObservationSession(session)) {
			return;
		}

		const current = observationRefreshBaselineByTab.get(tabId);
		if (
			current &&
			current.sessionId !== session.sessionId &&
			(current.startedAt ?? 0) > (session.startedAt ?? 0)
		) {
			return;
		}

		observationRefreshBaselineByTab.set(tabId, {
			batch,
			windowId: tab.windowId,
			incognito: tab.incognito,
			sessionId: session.sessionId,
			...(session.startedAt ? { startedAt: session.startedAt } : {}),
			...(session.expiresAt ? { expiresAt: session.expiresAt } : {}),
		});
	}

	/** Return the retained batch only when the requesting content session still owns it. */
	function getObservationRefreshBaseline(
		tabId: number,
		session?: ObservationSessionState,
	): ObservationBatch | undefined {
		if (!session?.sessionId || !canRefreshObservationSession(session)) {
			return undefined;
		}

		const baseline = observationRefreshBaselineByTab.get(tabId);
		if (!baseline) {
			return undefined;
		}

		if (baseline.sessionId !== session.sessionId) {
			return undefined;
		}

		if (baseline.expiresAt !== undefined && baseline.expiresAt <= Date.now()) {
			releaseObservationRefreshBaseline(tabId, baseline.sessionId);
			return undefined;
		}

		return baseline.batch;
	}

	/** Release one retained refresh baseline without disturbing a newer session for the same tab. */
	function releaseObservationRefreshBaseline(tabId: number, sessionId?: string): void {
		const baseline = observationRefreshBaselineByTab.get(tabId);
		if (!baseline || (sessionId !== undefined && baseline.sessionId !== sessionId)) {
			return;
		}

		observationRefreshBaselineByTab.delete(tabId);
	}

	/**
	 * Drop volatile state that only makes sense while a tab can still answer RPC.
	 *
	 * Manifest V3 can restart the background at any time, so these maps are only
	 * performance and lifecycle conveniences. Removing them when a tab closes keeps
	 * stale observation batches or evidence-pass schedules from being reused by
	 * a later tab that receives the same browser id.
	 */
	function forgetTabRuntimeState(tabId: number, reason: 'navigation' | 'tab-closed' = 'navigation'): void {
		contentScriptInjectionByTab.delete(tabId);
		releaseObservationRefreshBaseline(tabId);
		latestMatcherJobByTab.delete(tabId);
		activeFreshAnalysisByTab.delete(tabId);
		pendingMatcherPersistenceByTab.delete(tabId);
		clearScheduledObservationRefreshesForTab(tabId);
		clearDeferredObservationRefreshesForTab(tabId);

		for (const [jobId, context] of activeMatcherProgressByJob) {
			if (context.tab.id === tabId) {
				void cancelMatcherJob(jobId, reason);
				activeMatcherProgressByJob.delete(jobId);
			}
		}

		const tabPrefix = `${tabId}:`;
		for (const [visibleSessionId] of latestMatcherJobByVisibleSession) {
			if (visibleSessionId.startsWith(tabPrefix)) {
				latestMatcherJobByVisibleSession.delete(visibleSessionId);
			}
		}

		if (reason === 'tab-closed') {
			for (const [windowId, activeTabId] of activeTabByWindow) {
				if (activeTabId === tabId) activeTabByWindow.delete(windowId);
			}
		}
	}

	/** Cancel matcher work and quiesce content observation as soon as another tab becomes visible. */
	function handleTabActivated(tabId: number, windowId: number): void {
		activeTabByWindow.set(windowId, tabId);

		for (const [jobId, context] of activeMatcherProgressByJob) {
			if (context.tab.windowId !== windowId || context.tab.id === tabId) {
				continue;
			}

			activeMatcherProgressByJob.delete(jobId);
			void cancelMatcherJob(jobId, 'tab-deactivated');
		}

		for (const [observedTabId, baseline] of observationRefreshBaselineByTab) {
			if (observedTabId === tabId || baseline.windowId !== windowId) {
				continue;
			}

			void stopDeactivatedObservation(observedTabId, baseline);
		}
	}

	/** Stop one old panel-owned observer without stopping a newer session that reused the tab id. */
	async function stopDeactivatedObservation(
		tabId: number,
		baseline: ObservationRefreshBaseline,
	): Promise<void> {
		if (activeTabByWindow.get(baseline.windowId) === tabId) {
			return;
		}

		if (observationRefreshBaselineByTab.get(tabId) !== baseline) {
			return;
		}

		const target: ObservationSessionTarget = {
			tabId,
			sessionId: baseline.sessionId,
			expectedUrl: baseline.batch.target.url,
			...(baseline.incognito ? { incognito: true } : {}),
		};
		try {
			const response = await stopObservationSessionTarget(target);
			if (!response.ok) {
				releaseObservationRefreshBaseline(tabId, baseline.sessionId);
				logBackgroundEvent('observation-deactivated-stop-failed', {
					tabId,
					windowId: baseline.windowId,
					code: response.error.code,
					message: response.error.message,
				});
			}
		} catch (error) {
			releaseObservationRefreshBaseline(tabId, baseline.sessionId);
			logBackgroundEvent('observation-deactivated-stop-failed', {
				tabId,
				windowId: baseline.windowId,
				message: error instanceof Error ? error.message : String(error),
			});
		}
	}

	async function cancelMatcherJob(
		jobId: string,
		reason: 'navigation' | 'tab-closed' | 'newer-job' | 'tab-deactivated',
	): Promise<void> {
		await dependencies.matcher.cancelJob(jobId);
		await updateMatcherJobRecord(jobId, { status: 'canceled', reason });
	}

	function createObservationRefreshScheduleKey(tabId: number, sessionId: string): string {
		return `${tabId}:${sessionId}`;
	}

	function clearScheduledObservationRefreshesForTab(tabId: number): void {
		const tabPrefix = `${tabId}:`;
		for (const [key, timer] of scheduledObservationRefreshBySession) {
			if (!key.startsWith(tabPrefix)) {
				continue;
			}

			globalThis.clearTimeout(timer);
			scheduledObservationRefreshBySession.delete(key);
		}
	}

	function clearDeferredObservationRefreshesForTab(tabId: number): void {
		const tabPrefix = `${tabId}:`;
		for (const key of deferredObservationRefreshBySession.keys()) {
			if (key.startsWith(tabPrefix)) {
				deferredObservationRefreshBySession.delete(key);
			}
		}
	}

	/** Clear scheduled and deferred refresh work for one exact content observation session. */
	function clearObservationRefreshForSession(tabId: number, sessionId: string): void {
		const key = createObservationRefreshScheduleKey(tabId, sessionId);
		const timer = scheduledObservationRefreshBySession.get(key);
		if (timer !== undefined) {
			globalThis.clearTimeout(timer);
			scheduledObservationRefreshBySession.delete(key);
		}
		deferredObservationRefreshBySession.delete(key);
	}

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

	function hasMatcherWorkForTab(tabId: number): boolean {
		if (activeFreshAnalysisByTab.has(tabId) || pendingMatcherPersistenceByTab.has(tabId)) {
			return true;
		}

		for (const context of activeMatcherProgressByJob.values()) {
			if (context.tab.id === tabId) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Keep dirty observer flushes behind the matcher job that already owns the page.
	 *
	 * Content queues are durable for the current page runtime, so a dirty notification
	 * does not need to start a competing matcher immediately. Deferring the flush
	 * lets the first complete matcher publish detections before later page facts
	 * enqueue another revision.
	 */
	function deferObservationRefresh(
		target: ObservationSessionTarget,
		details: Record<string, unknown>,
	): void {
		const key = createObservationRefreshScheduleKey(target.tabId, target.sessionId);
		deferredObservationRefreshBySession.set(key, { target, details });
		logBackgroundEvent('observation-refresh-deferred-during-match', details);
	}

	function flushDeferredObservationRefreshesForTab(tabId: number): void {
		const tabPrefix = `${tabId}:`;
		const pending: PendingObservationRefresh[] = [];
		for (const [key, refresh] of deferredObservationRefreshBySession) {
			if (!key.startsWith(tabPrefix)) {
				continue;
			}

			deferredObservationRefreshBySession.delete(key);
			pending.push(refresh);
		}

		for (const refresh of pending) {
			scheduleObservationRefreshFromContent(refresh.target, refresh.details);
		}
	}

	function scheduleObservationRefreshFromContent(
		target: ObservationSessionTarget,
		details: Record<string, unknown>,
	): void {
		const key = createObservationRefreshScheduleKey(target.tabId, target.sessionId);
		if (scheduledObservationRefreshBySession.has(key)) {
			logBackgroundEvent('observation-refresh-already-scheduled', details);
			return;
		}

		if (hasMatcherWorkForTab(target.tabId)) {
			deferObservationRefresh(target, details);
			return;
		}

		logBackgroundEvent('observation-refresh-scheduled', details);
		const timer = globalThis.setTimeout(() => {
			scheduledObservationRefreshBySession.delete(key);
			if (hasMatcherWorkForTab(target.tabId)) {
				deferObservationRefresh(target, details);
				return;
			}

			void refreshObservationSessionTarget(target).then((response) => {
				if (!response.ok) {
					logBackgroundEvent('observation-refresh-background-failed', {
						...details,
						code: response.error.code,
						message: response.error.message,
					});
					return;
				}

				logBackgroundEvent('observation-refresh-background-complete', {
					...details,
					resultCount: response.value.analysis.results.length,
					analyzedAt: response.value.analysis.analyzedAt,
				});
			});
		}, BACKGROUND_OBSERVATION_REFRESH_DELAY_MS);

		scheduledObservationRefreshBySession.set(key, timer);
	}

	function logBackgroundEvent(event: string, details?: Record<string, unknown>): void {
		dependencies.logEvent(event, details);
	}

	function summarizeTab(tab: InspectableTab): Record<string, unknown> {
		return {
			windowId: tab.windowId,
			tabId: tab.id,
			hostname: new globalThis.URL(tab.url).hostname,
		};
	}

	function createVisibleTabIdentity(tab: InspectableTab): VisibleTabIdentity {
		const parsedUrl = new globalThis.URL(tab.url);
		const tabOrigin = url.getOrigin(tab.url);

		return {
			windowId: tab.windowId,
			tabId: tab.id,
			frameId: 0,
			url: tab.url,
			hostname: parsedUrl.hostname,
			originHash: createDetectionStorageHash(tabOrigin),
			urlHash: createDetectionStorageHash(tab.url),
			incognito: tab.incognito,
		};
	}

	function isSameVisibleTabIdentity(left: VisibleTabIdentity, right: VisibleTabIdentity): boolean {
		return (
			left.windowId === right.windowId &&
			left.tabId === right.tabId &&
			left.frameId === right.frameId &&
			left.originHash === right.originHash &&
			left.urlHash === right.urlHash &&
			left.incognito === right.incognito
		);
	}

	async function getInspectableVisibleTab(target: VisibleTabIdentity): Promise<ExtensionResult<InspectableTab>> {
		const targetTab = await getInspectableTab(target.tabId, target.windowId);
		if (!targetTab.ok) {
			return targetTab;
		}

		const targetIdentity = createVisibleTabIdentity(targetTab.value);
		if (!isSameVisibleTabIdentity(targetIdentity, target)) {
			logBackgroundEvent('visible-tab-target-mismatch', {
				requestedWindowId: target.windowId,
				actualWindowId: targetIdentity.windowId,
				requestedTabId: target.tabId,
				actualTabId: targetIdentity.tabId,
				requestedUrlHash: target.urlHash,
				actualUrlHash: targetIdentity.urlHash,
			});
			return errorResponse(
				'VALIDATION_ERROR',
				'Analysis request no longer matches the active tab target.',
			);
		}

		return targetTab;
	}

	async function getLatestVisibleDetectionSnapshot(
		target: VisibleTabIdentity,
		timingContext: TimingContext,
		spanName: string,
	): Promise<DetectionSessionSnapshot | null> {
		const snapshot = await timeAsyncSpan(
			spanName,
			timingContext,
			() => getBestVisibleDetectionSessionSnapshot(target),
			(value) => ({ snapshotHit: Boolean(value), revision: value?.revision, detectionCount: value?.detectionCount }),
		);
		if (!snapshot) {
			logBackgroundEvent('visible-snapshot-miss', {
				tabId: target.tabId,
				hostname: target.hostname,
				reason: 'no-exact-session-or-matching-origin-snapshot',
				targetUrlHash: target.urlHash,
			});
		}

		return snapshot;
	}

	function summarizeSession(session: ObservationSessionState): Record<string, unknown> {
		return {
			sessionId: session.sessionId,
			status: session.status,
			startedAt: session.startedAt,
			expiresAt: session.expiresAt,
			pendingMutationCount: session.pendingMutationCount,
			stopReason: session.stopReason,
		};
	}

	function summarizeCompiledRegistryArtifact(artifact: CompiledRegistry): Record<string, unknown> {
		const ruleCount = Object.values(artifact.patternTables).reduce((total, count) => total + count, 0);
		return {
			technologyCount: artifact.technologies.length,
			ruleCount,
			diagnosticCount: artifact.diagnostics.length,
			initialSelectorProbeCount: artifact.collectionPlan.initial.selectorProbeList.length,
			initialJsGlobalProbeCount: artifact.collectionPlan.initial.jsGlobalPropertyList.length,
			enrichmentHtmlProbeCount: artifact.collectionPlan.enrichment.htmlProbeList.length,
		};
	}


	function createContentApiClient(tabId: number, frameId = 0): ContentApi {
		return dependencies.createContentApiClient(tabId, frameId);
	}

	async function getInspectableTab(tabId: number, windowId: number): Promise<ExtensionResult<InspectableTab>> {
		let tab: BackgroundRuntimeTab;
		try {
			tab = await dependencies.getTab(tabId);
		} catch {
			logBackgroundEvent('visible-tab-missing', { tabId });
			return errorResponse('NO_ACTIVE_TAB', 'The requested browser tab is no longer available.');
		}

		if (tab.active !== true) {
			logBackgroundEvent('visible-tab-inactive', { tabId });
			return errorResponse('NO_ACTIVE_TAB', 'The requested browser tab is no longer active.');
		}

		if (tab.windowId !== windowId) {
			logBackgroundEvent('visible-tab-window-mismatch', {
				tabId,
				requestedWindowId: windowId,
				actualWindowId: tab.windowId,
			});
			return errorResponse('NO_ACTIVE_TAB', 'The requested browser tab no longer belongs to this window.');
		}

		if (typeof tab.id !== 'number' || !tab.url) {
			logBackgroundEvent('visible-tab-missing', { tabId });
			return errorResponse('NO_ACTIVE_TAB', 'The active browser tab does not have an inspectable URL yet.');
		}

		if (!canInspectTab(tab)) {
			logBackgroundEvent('visible-tab-unsupported', {
				tabId: tab.id,
				url: tab.url,
			});
			return errorResponse(
				'UNSUPPORTED_URL',
				'Detection only works on normal http/https pages. Reload a website tab and try again.',
			);
		}

		return extensionSuccess({ id: tab.id, windowId: tab.windowId, url: tab.url, incognito: tab.incognito === true });
	}

	async function pingContentScript(tabId: number): Promise<boolean> {
		const contentApi = createContentApiClient(tabId, 0);

		try {
			const response = await withTimeout(
				contentApi.getObservationSessionState(),
				CONTENT_SCRIPT_PING_TIMEOUT_MS,
				'Content script ping timed out.',
			);

			return response.ok;
		} catch {
			return false;
		}
	}

	async function injectContentScript(tabId: number): Promise<ExtensionResult<void>> {
		try {
			await dependencies.executeContentScript(tabId);
			return extensionSuccess(undefined);
		} catch (error) {
			return contentScriptFailure(error);
		}
	}

	async function ensureContentScript(tabId: number): Promise<ExtensionResult<void>> {
		if (await pingContentScript(tabId)) {
			logBackgroundEvent('content-runtime-ready', { tabId });
			return extensionSuccess(undefined);
		}

		const existingInjection = contentScriptInjectionByTab.get(tabId);
		if (existingInjection) {
			logBackgroundEvent('content-runtime-await-existing-injection', { tabId });
			return existingInjection;
		}

		const injection = (async () => {
			logBackgroundEvent('content-runtime-inject-start', { tabId });
			const injectionResponse = await injectContentScript(tabId);
			if (!injectionResponse.ok) {
				logBackgroundEvent('content-runtime-inject-failed', {
					tabId,
					code: injectionResponse.error.code,
					message: injectionResponse.error.message,
				});
				return injectionResponse;
			}

			if (await pingContentScript(tabId)) {
				logBackgroundEvent('content-runtime-inject-ready', { tabId });
				return extensionSuccess(undefined);
			}

			logBackgroundEvent('content-runtime-inject-timeout', { tabId });
			return errorResponse(
				'CONTENT_SCRIPT_UNAVAILABLE',
				'Injected content script did not register before the messaging timeout.',
			);
		})();

		contentScriptInjectionByTab.set(tabId, injection);

		try {
			return await injection;
		} finally {
			contentScriptInjectionByTab.delete(tabId);
		}
	}

	/**
	 * Ask the extension collector for normalized observations from the visible tab.
	 *
	 * Fresh analysis no longer exposes the old page-snapshot detector path to the
	 * background. The content script collects document facts, background evidence passes
	 * appends privileged facts, and the event pipeline consumes the enriched batch.
	 */
	async function collectObservationBatchFromTab(
		tabId: number,
		expectedUrl: string,
		compiledRegistryArtifact: CompiledRegistry,
		tier: 'initial' | 'enrichment' = 'initial',
		timingTraceId?: string,
		collectionTierPlan?: CollectionTierPlan,
	): Promise<ExtensionResult<ObservationBatch>> {
		const timingContext: TimingContext = {
			traceId: timingTraceId,
			surface: 'background',
			details: {
				tabId,
				hostname: new globalThis.URL(expectedUrl).hostname,
				tier,
			},
		};
		const contentScriptResponse = await timeAsyncSpan(
			'background.content-runtime.ensure',
			timingContext,
			() => ensureContentScript(tabId),
			(response) => ({ ok: response.ok }),
		);
		if (!contentScriptResponse.ok) {
			return contentScriptResponse;
		}

		return timeAsyncSpan(
			'background.collect-extension-observation-batch',
			timingContext,
			() => dependencies.collectObservationBatch({
				tabId,
				expectedUrl,
				collectionPlan: compiledRegistryArtifact.collectionPlan,
				tier,
				...(collectionTierPlan ? { collectionTierPlan } : {}),
				contentApi: createContentApiClient(tabId, 0),
				log: logBackgroundEvent,
				timingTraceId,
			}),
			(response) => ({
				ok: response.ok,
				observationCount: response.ok ? response.value.observations.length : 0,
			}),
		);
	}

	/** Create the background response returned to the side panel after analysis. */
	function createAnalysisOutput(
		analysis: SiteAnalysis,
		snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'],
		session?: ObservationSessionState,
		replayTrace?: AnalyzeVisibleTabOutput['replayTrace'],
		replayHistory?: AnalyzeVisibleTabOutput['replayHistory'],
		sessionTarget?: ObservationSessionTarget,
		enrichment?: AnalysisEnrichmentState,
		evidence?: DetectionEvidenceState,
	): AnalyzeVisibleTabOutput {
		return {
			analysis,
			snapshot: {
				status: snapshotStatus,
				key: getAnalysisResponseKey(analysis.url),
				expiresAt: analysis.analyzedAt + STORAGE_LIMITS.analysisTtlMs,
			},
			session,
			...(sessionTarget ? { sessionTarget } : {}),
			...(replayTrace ? { replayTrace } : {}),
			...(replayHistory ? { replayHistory } : {}),
			...(enrichment ? { enrichment } : {}),
			...(evidence ? { evidence } : {}),
		};
	}

	function createObservationSessionTarget(
		tab: InspectableTab,
		session?: ObservationSessionState,
	): ObservationSessionTarget | undefined {
		if (!session?.sessionId || !session.expectedUrl) {
			return undefined;
		}

		return {
			tabId: tab.id,
			sessionId: session.sessionId,
			expectedUrl: tab.url,
			...(tab.incognito ? { incognito: true } : {}),
		};
	}

	/**
	 * Build the content-side snapshot target from background-owned tab identity.
	 *
	 * The content script can observe the document, but only the background receives
	 * the tab id from Chrome. Sharing the same key lets content publish revision 1
	 * and background promote revision 2 for the exact same page session.
	 */
	function createContentPageSessionSnapshotTarget(
		tab: InspectableTab,
		sessionId: string,
	): ContentPageSessionSnapshotTarget {
		return {
			key: {
				tabId: tab.id,
				frameId: 0,
				documentId: sessionId,
				originHash: createDetectionStorageHash(url.getOrigin(tab.url)),
			},
			url: tab.url,
			urlHash: createDetectionStorageHash(tab.url),
			hostname: new globalThis.URL(tab.url).hostname,
			...(tab.incognito ? { incognito: true } : {}),
		};
	}

	/**
	 * Persist the analysis response as the side panel's storage update stream.
	 *
	 * Snapshots are the durable channel that lets an open side panel update without a
	 * polling loop and lets a reopened side panel recover state after background shutdown.
	 */
	async function saveDetectionSnapshotForPanel(
		tab: InspectableTab,
		output: AnalyzeVisibleTabOutput,
		source: DetectionSessionSnapshotSource,
		matcherExecutor: DetectionSessionSnapshot['matcherExecutor'] = 'unknown',
		matcherProgress?: DetectionSessionSnapshot['matcherProgress'],
		evidence?: DetectionEvidenceState,
	): Promise<void> {
		if (tab.incognito) {
			return;
		}

		const key = createDetectionSessionKeyForOutput(tab, output);
		await enqueueSnapshotWrite(key, async () => {
			const existing = await getLatestDetectionSessionSnapshot(key);
			const replaySummary = shouldAttachReplaySummaryToSnapshot(output)
				? createReplaySummary(output.replayTrace)
				: undefined;
			const snapshot: DetectionSessionSnapshot = {
				key,
				schemaVersion: DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION,
				revision: (existing?.revision ?? 0) + 1,
				urlHash: createDetectionStorageHash(output.analysis.url),
				hostname: output.analysis.hostname,
				status: getDetectionSnapshotStatus(output),
				source,
				updatedAt: Date.now(),
				detectionCount: output.analysis.results.length,
				...(evidence ? { evidence } : {}),
				analysis: output.analysis,
				enrichment: toDetectionEnrichmentState(output.enrichment),
				matcherExecutor,
				...(matcherProgress ? { matcherProgress } : {}),
				...(replaySummary ? { replaySummary } : {}),
			};

			const writeResult = await saveDetectionSessionSnapshot(snapshot);
			if (!writeResult.accepted) {
				logBackgroundEvent('snapshot-write-rejected', {
					...summarizeTab(tab),
					reason: classifySnapshotWriteRejection(snapshot, writeResult.snapshot),
					revision: snapshot.revision,
					rejectedByRevision: writeResult.rejectedByRevision ?? 0,
					resultCount: snapshot.analysis.results.length,
					storedResultCount: writeResult.snapshot.analysis.results.length,
					status: snapshot.status,
					source,
				});
			}
		});
	}

	/** Build a stable key for ordered writes to one exact visible page session. */
	function createSnapshotWriteQueueKey(key: DetectionSessionKey): string {
		return `${key.tabId}:${key.frameId}:${key.originHash}:${key.documentId}`;
	}

	/** Serialize revision assignment and storage writes for one exact session. */
	function enqueueSnapshotWrite(
		key: DetectionSessionKey,
		operation: () => Promise<void>,
	): Promise<void> {
		const queueKey = createSnapshotWriteQueueKey(key);
		const previous = snapshotWriteQueueBySession.get(queueKey) ?? Promise.resolve();
		const next = previous
			.catch(() => undefined)
			.then(operation)
			.finally(() => {
				if (snapshotWriteQueueBySession.get(queueKey) === next) {
					snapshotWriteQueueBySession.delete(queueKey);
				}
			});

		snapshotWriteQueueBySession.set(queueKey, next);
		return next;
	}

	/** Explain why storage rejected a write so count regressions are diagnosable. */
	function classifySnapshotWriteRejection(
		candidate: DetectionSessionSnapshot,
		stored: DetectionSessionSnapshot,
	): string {
		if (candidate.revision < stored.revision) {
			return 'older-revision';
		}

		if (candidate.revision === stored.revision) {
			if (candidate.detectionCount > stored.detectionCount) {
				return 'same-revision-race-higher-count';
			}
			if (candidate.detectionCount < stored.detectionCount) {
				return 'same-revision-race-lower-count';
			}
			return 'same-revision-race-same-count';
		}

		return 'lower-completeness-merge-rejected';
	}

	/** Snapshot replay summaries represent durable/final replay state, not preview matcher output. */
	function shouldAttachReplaySummaryToSnapshot(
		output: AnalyzeVisibleTabOutput,
	): output is AnalyzeVisibleTabOutput & { readonly replayTrace: NonNullable<AnalyzeVisibleTabOutput['replayTrace']> } {
		return Boolean(output.replayTrace) && output.enrichment?.status !== 'pending';
	}

	/**
	 * Resolve the page-session key available from a background response.
	 *
	 * Observation sessions provide the strongest document identity. Cached responses
	 * can lack a session, so the URL hash becomes a stable fallback until content
	 * owns browser document ids in the later page-session runtime.
	 */
	function createDetectionSessionKeyForOutput(tab: InspectableTab, output: AnalyzeVisibleTabOutput): DetectionSessionKey {
		return {
			tabId: tab.id,
			frameId: 0,
			documentId: output.sessionTarget?.sessionId ?? output.session?.sessionId ?? createDetectionStorageHash(output.analysis.url),
			originHash: createDetectionStorageHash(url.getOrigin(output.analysis.url)),
		};
	}

	/** Derive the side-panel-visible lifecycle state from the analysis response. */
	function getDetectionSnapshotStatus(output: AnalyzeVisibleTabOutput): DetectionSessionStatus {
		if (output.session?.status === 'observing' || output.session?.status === 'dirty') return 'observing';
		if (output.session?.status === 'stopped') return 'stopped';
		if (output.snapshot.status === 'hit') return 'cached';
		return 'complete';
	}

	/** Normalize response enrichment metadata into the durable snapshot schema. */
	function toDetectionEnrichmentState(enrichment?: AnalysisEnrichmentState): DetectionEnrichmentState {
		const updatedAt = Date.now();
		if (!enrichment) return { status: 'not-needed', updatedAt, reason: 'continuous-evidence-revisions' };
		return {
			status: enrichment.status === 'skipped' ? 'skipped' : enrichment.status,
			updatedAt,
			...(enrichment.completedAt ? { completedAt: enrichment.completedAt } : {}),
			...(enrichment.reason ? { reason: enrichment.reason } : {}),
		};
	}


	/** Build durable evidence completeness metadata for a detector snapshot. */
	function createDetectionEvidenceState(input: {
		readonly level: DetectionEvidenceState['level'];
		readonly completedPassIds?: readonly string[];
		readonly requiredPassIds?: readonly string[];
		readonly complete?: boolean;
		readonly reason?: string;
	}): DetectionEvidenceState {
		const completedPassIds = [...(input.completedPassIds ?? [])];
		const requiredPassIds = [...(input.requiredPassIds ?? completedPassIds)];
		const complete = input.complete ?? (
			requiredPassIds.length > 0 && requiredPassIds.every((passId) => completedPassIds.includes(passId))
		);

		return {
			level: input.level,
			completedPassIds,
			requiredPassIds,
			complete,
			updatedAt: Date.now(),
			...(input.reason ? { reason: input.reason } : {}),
		};
	}

	function getEvidencePassIds(passes: readonly CollectionEvidencePass[]): CollectionEvidencePassId[] {
		return passes.map((pass) => pass.id);
	}

	/** Keep replay details joined to the exact analysis they describe. */
	function getReplayTraceForAnalysis(
		trace: DetectionReplayTrace | null,
		analysis: SiteAnalysis,
	): DetectionReplayTrace | undefined {
		return trace && isDetectionReplayTraceForAnalysis(trace, analysis) ? trace : undefined;
	}

	function getReplayHistoryForAnalysis(
		history: readonly DetectionReplayTrace[],
		analysis: SiteAnalysis,
	): DetectionReplayTrace[] {
		return filterReplayHistoryForAnalysis(history, analysis);
	}

	/** Keep only public-safe replay progress inside the visible snapshot record. */
	function createReplaySummary(trace: DetectionReplayTrace): DetectionReplaySummary {
		const stages: DetectionPipelineStage[] = [];
		for (const event of trace.events) {
			if (!stages.includes(event.stage)) stages.push(event.stage);
		}
		return {
			...(trace.runId ? { runId: trace.runId } : {}),
			analyzedAt: trace.analyzedAt,
			eventCount: trace.events.length,
			explanationCount: trace.explanations.length,
			resultCount: trace.resultCount,
			stages,
		};
	}

	function validateObservationSessionTarget(
		actual: ObservationSessionState,
		expected: ObservationSessionTarget,
	): ExtensionResult<void> {
		if (actual.sessionId !== expected.sessionId) {
			return errorResponse(
				'OBSERVATION_SESSION_UNAVAILABLE',
				'The requested observation session is no longer active in the target tab.',
			);
		}

		if (!actual.expectedUrl || !url.sameDocument(actual.expectedUrl, expected.expectedUrl)) {
			return errorResponse(
				'OBSERVATION_SESSION_UNAVAILABLE',
				'The visible tab navigated away from the observed document.',
			);
		}

		return extensionSuccess(undefined);
	}

	async function getObservationSessionStateForTab(
		tabId: number,
	): Promise<ExtensionResult<ObservationSessionState>> {
		const contentApi = createContentApiClient(tabId, 0);

		try {
			return await withTimeout(
				contentApi.getObservationSessionState(),
				CONTENT_SCRIPT_TIMEOUT_MS,
				'Content script did not respond before the messaging timeout.',
			);
		} catch (error) {
			return contentScriptFailure(error);
		}
	}

	async function flushObservationBatchForTab(
		tabId: number,
	): Promise<ExtensionResult<FlushObservationBatchOutput>> {
		const contentApi = createContentApiClient(tabId, 0);

		try {
			return await withTimeout(
				contentApi.flushObservationBatch(),
				CONTENT_SCRIPT_TIMEOUT_MS,
				'Content script did not respond before the messaging timeout.',
			);
		} catch (error) {
			return contentScriptFailure(error);
		}
	}

	async function analyzeObservationBatchRefresh(
		tab: InspectableTab,
		flush: FlushObservationBatchOutput,
		timingTraceId = createTimingTraceId('refresh'),
	): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
		const timingContext: TimingContext = {
			traceId: timingTraceId,
			surface: 'background',
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
				return extensionSuccess(createAnalysisOutput(
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
			() => dependencies.registryProvider.getCompiledRegistry(),
			summarizeCompiledRegistryArtifact,
		);
		const collectionPasses = createIncrementalCollectionPasses(compiledRegistryArtifact.collectionPlan);
		const [, ...remainingEvidencePasses] = collectionPasses;
		const recoveredRefresh = !baseBatch || !isSameObservationTarget(baseBatch, lateBatch);
		const batchResponse = !recoveredRefresh
			? extensionSuccess(timeSyncSpan(
				'background.observation-refresh.merge-late-batch',
				timingContext,
				() => mergeObservationBatches(baseBatch, lateBatch),
				(batch) => ({ observationCount: batch.observations.length }),
			))
			: await recoverObservationBatchForRefresh(tab, lateBatch, compiledRegistryArtifact, timingTraceId);
		if (!batchResponse.ok) {
			endTimingSpan(totalSpan, { ok: false, failedAt: 'recover-or-merge' });
			return batchResponse;
		}
		if (!await canPersistMatcherResult(tab, batchResponse.value.target.url)) {
			await stopFailedFreshObservation(tab, flush.session, 'refresh-tab-deactivated');
			endTimingSpan(totalSpan, { ok: false, failedAt: 'refresh-tab-deactivated' });
			return errorResponse('VALIDATION_ERROR', 'The visible tab changed before refresh matcher work could start.');
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
		const refreshMatcher = enqueueAnalysisPersistence({
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
					waitForPreviousMatcherCompletion: refreshMatcher.completion,
				});
			});
		}
		endTimingSpan(totalSpan, {
			ok: true,
			queuedMatcher: true,
			resultCount: response.analysis.results.length,
			lateObservationCount: lateBatch.observations.length,
		});
		return extensionSuccess(response);
	}

	async function recoverObservationBatchForRefresh(
		tab: InspectableTab,
		lateBatch: ObservationBatch,
		compiledRegistryArtifact: CompiledRegistry,
		timingTraceId?: string,
	): Promise<ExtensionResult<ObservationBatch>> {
		logBackgroundEvent('observation-refresh-recollect', {
			...summarizeTab(tab),
			lateObservationCount: lateBatch.observations.length,
		});

		const recoveredBatch = await collectObservationBatchFromTab(tab.id, tab.url, compiledRegistryArtifact, 'initial', timingTraceId);
		if (!recoveredBatch.ok) {
			return recoveredBatch;
		}

		return extensionSuccess(mergeObservationBatches(recoveredBatch.value, lateBatch));
	}

	async function beginObservationSessionForTab(
		tab: InspectableTab,
		compiledRegistryArtifact: CompiledRegistry,
	): Promise<ExtensionResult<ObservationSessionState>> {
		const sessionId = crypto.randomUUID();
		logBackgroundEvent('observation-start-requested', {
			...summarizeTab(tab),
			sessionId,
			policy: EXTENSION_OBSERVATION_POLICY,
		});

		const contentScriptResponse = await ensureContentScript(tab.id);
		if (!contentScriptResponse.ok) {
			return contentScriptResponse;
		}

		const contentApi = createContentApiClient(tab.id, 0);

		try {
			const response = await withTimeout(
				contentApi.beginObservationSession({
					sessionId,
					expectedUrl: tab.url,
					snapshotTarget: createContentPageSessionSnapshotTarget(tab, sessionId),
					policy: EXTENSION_OBSERVATION_POLICY,
					includeScriptContent: compiledRegistryArtifact.collectionPlan.enrichment.needsScriptContent,
					includeStylesheetContent: compiledRegistryArtifact.collectionPlan.enrichment.needsStylesheetContent,
					domSelectorPlan: compiledRegistryArtifact.collectionPlan.initial.domSelectorPlan,
				}),
				CONTENT_SCRIPT_TIMEOUT_MS,
				'Content script did not respond before the messaging timeout.',
			);

			if (response.ok) {
				logBackgroundEvent('observation-started', {
					tabId: tab.id,
					...summarizeSession(response.value),
				});
			}

			return response;
		} catch (error) {
			return contentScriptFailure(error);
		}
	}

	async function stopObservationSessionForTab(
		tabId: number,
		target: Pick<ObservationSessionTarget, 'sessionId' | 'expectedUrl'>,
	): Promise<ExtensionResult<ObservationSessionState>> {
		logBackgroundEvent('observation-stop-requested', { tabId, sessionId: target.sessionId });
		const contentApi = createContentApiClient(tabId, 0);

		try {
			const response = await withTimeout(
				contentApi.stopObservationSession(target),
				CONTENT_SCRIPT_TIMEOUT_MS,
				'Content script did not respond before the messaging timeout.',
			);

			if (response.ok) {
				logBackgroundEvent('observation-stopped', {
					tabId,
					...summarizeSession(response.value),
				});
			}

			return response;
		} catch (error) {
			return contentScriptFailure(error);
		}
	}

	/** Stop an observer that started for a fresh analysis which cannot return an owner target. */
	async function stopFailedFreshObservation(
		tab: InspectableTab,
		session: ObservationSessionState | undefined,
		failedAt: string,
	): Promise<void> {
		const target = createObservationSessionTarget(tab, session);
		if (!target) return;

		const response = await stopObservationSessionTarget(target);
		logBackgroundEvent(response.ok ? 'observation-failed-analysis-stopped' : 'observation-failed-analysis-stop-skipped', {
			...summarizeTab(tab),
			sessionId: target.sessionId,
			failedAt,
			...(response.ok ? {} : { code: response.error.code, message: response.error.message }),
		});
	}

	async function analyzeFreshVisibleTab(
		tab: InspectableTab,
		input: AnalyzeVisibleTabInput,
		snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'],
	): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
		const timingTraceId = createTimingTraceId(input.mode === 'refresh' ? 'refresh' : 'analysis');
		const totalSpan = startTimingSpan('background.analysis-fresh.total', {
			traceId: timingTraceId,
			surface: 'background',
			details: {
				...summarizeTab(tab),
				mode: input.mode,
				observe: input.observe,
				snapshotStatus,
			},
		});
		logBackgroundEvent('analysis-fresh-start', {
			...summarizeTab(tab),
			mode: input.mode,
			observe: input.observe,
			snapshotStatus,
			pipeline: 'event',
			timingTraceId,
		});
		activeFreshAnalysisByTab.add(tab.id);

		const timingContext: TimingContext = {
			traceId: timingTraceId,
			surface: 'background',
			details: {
				...summarizeTab(tab),
				mode: input.mode,
				observe: input.observe,
			},
		};
		const compiledRegistryArtifact = await timeAsyncSpan(
			'background.registry.get-complete-compiled',
			timingContext,
			() => dependencies.registryProvider.getCompiledRegistry(),
			summarizeCompiledRegistryArtifact,
		);
		const collectionPasses = createIncrementalCollectionPasses(compiledRegistryArtifact.collectionPlan);
		const [initialPass, ...remainingPasses] = collectionPasses;
		const requiredEvidencePassIds = getEvidencePassIds(collectionPasses);
		const hasFollowUpEnrichment = remainingPasses.length > 0;
		if (!initialPass) {
			activeFreshAnalysisByTab.delete(tab.id);
			endTimingSpan(totalSpan, { ok: false, failedAt: 'create-collection-passes' });
			return errorResponse('VALIDATION_ERROR', 'No collection pass was available for the active registry.');
		}

		let session: ObservationSessionState | undefined;
		if (shouldStartObservationForAnalysis(input)) {
			const sessionResponse = await timeAsyncSpan(
				'background.observation-session.begin',
				timingContext,
				() => beginObservationSessionForTab(tab, compiledRegistryArtifact),
				(response) => ({ ok: response.ok, status: response.ok ? response.value.status : undefined }),
			);
			if (sessionResponse.ok) {
				session = sessionResponse.value;
			} else {
				dependencies.logEvent('observation-session-unavailable', {
					code: sessionResponse.error.code,
					message: sessionResponse.error.message,
				});
			}
		}

		let batchResponse: ExtensionResult<ObservationBatch>;
		try {
			batchResponse = await collectObservationBatchFromTab(
				tab.id,
				tab.url,
				compiledRegistryArtifact,
				initialPass.plan.tier,
				timingTraceId,
				initialPass.plan,
			);
		} catch (error) {
			activeFreshAnalysisByTab.delete(tab.id);
			await stopFailedFreshObservation(tab, session, 'collect-initial-threw');
			endTimingSpan(totalSpan, { ok: false, failedAt: 'collect-initial-threw' });
			throw error;
		}
		if (!batchResponse.ok) {
			activeFreshAnalysisByTab.delete(tab.id);
			await stopFailedFreshObservation(tab, session, 'collect-initial');
			endTimingSpan(totalSpan, { ok: false, failedAt: 'collect-initial' });
			return batchResponse;
		}
		if (!await canPersistMatcherResult(tab, batchResponse.value.target.url)) {
			activeFreshAnalysisByTab.delete(tab.id);
			await stopFailedFreshObservation(tab, session, 'tab-deactivated-after-collection');
			endTimingSpan(totalSpan, { ok: false, failedAt: 'tab-deactivated-after-collection' });
			return errorResponse('VALIDATION_ERROR', 'The visible tab changed before matcher work could start.');
		}

		retainObservationRefreshBaseline(tab, batchResponse.value, session);
		const initialMatcher = enqueueAnalysisPersistence({
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
		});
		activeFreshAnalysisByTab.delete(tab.id);

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
					waitForPreviousMatcherCompletion: initialMatcher.completion,
				});
			});
		}
		endTimingSpan(totalSpan, {
			ok: true,
			returnedImmediately: true,
			queuedObservationCount: batchResponse.value.observations.length,
			deferredCollectionPassCount: remainingPasses.length,
			returnedResultCount: response.analysis.results.length,
		});
		return extensionSuccess(response);
	}

	interface IncrementalEvidencePassRun {
		/** Tab and document identity that owns the staged enrichment work. */
		readonly tab: InspectableTab;
		/** First cheap observation batch already queued for matching. */
		readonly baseBatch: ObservationBatch;
		/** Follow-up collection passes that must not block the first matcher revision. */
		readonly passes: readonly CollectionEvidencePass[];
		/** Compiled registry artifact reused for matching every enriched batch. */
		readonly compiledRegistryArtifact: CompiledRegistry;
		/** Snapshot reuse state attached to the visible analysis response. */
		readonly snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'];
		/** Observation session that remains active while enrichment gathers later evidence. */
		readonly session?: ObservationSessionState;
		/** Timing trace shared with the initial side-panel command. */
		readonly timingTraceId: string;
		/** Matcher completion that enrichment matching must not overlap. */
		readonly waitForPreviousMatcherCompletion?: Promise<void>;
	}

	/**
	 * Run deeper evidence passes only after the first matcher revision has been queued.
	 *
	 * The old flow collected every enrichment surface before matching started, which
	 * made the side panel wait even when cheap observations were already available. The
	 * current flow waits until the initial matcher is registered, collects the
	 * follow-up surfaces, then queues one merged enrichment revision. That keeps
	 * first paint unblocked without running a full terminal pipeline for every
	 * expensive evidence surface.
	 */
	async function runIncrementalEvidencePasses(input: IncrementalEvidencePassRun): Promise<void> {
		let currentBatch = getObservationRefreshBaseline(input.tab.id, input.session) ?? input.baseBatch;
		const completedPassIds: CollectionEvidencePass['id'][] = [];
		for (const pass of input.passes) {
			if (!await canPersistMatcherResult(input.tab, currentBatch.target.url)) {
				logBackgroundEvent('evidence-passes-stopped-after-navigation', {
					...summarizeTab(input.tab),
					passId: pass.id,
				});
				return;
			}

			const passBatch = await runEvidencePassWithTimeout(() => collectObservationBatchFromTab(
				input.tab.id,
				input.tab.url,
				input.compiledRegistryArtifact,
				pass.plan.tier,
				`${input.timingTraceId}:collect:${pass.id}`,
				pass.plan,
			));
			if (!passBatch.ok) {
				logBackgroundEvent('evidence-pass-collection-skipped', {
					...summarizeTab(input.tab),
					passId: pass.id,
					code: passBatch.error.code,
					message: passBatch.error.message,
				});
				continue;
			}
			if (!await canPersistMatcherResult(input.tab, passBatch.value.target.url)) {
				await stopFailedFreshObservation(input.tab, input.session, 'evidence-pass-tab-deactivated');
				logBackgroundEvent('evidence-passes-stopped-after-navigation', {
					...summarizeTab(input.tab),
					passId: pass.id,
				});
				return;
			}

			const latestBatch = getObservationRefreshBaseline(input.tab.id, input.session);
			currentBatch = latestBatch && isSameObservationTarget(latestBatch, passBatch.value)
				? mergeObservationBatches(latestBatch, passBatch.value)
				: mergeObservationBatches(currentBatch, passBatch.value);
			retainObservationRefreshBaseline(input.tab, currentBatch, input.session);
			completedPassIds.push(pass.id);
		}

		if (completedPassIds.length === 0) {
			return;
		}

		const requiredPassIds = ['initial', ...getEvidencePassIds(input.passes)];
		const completedEvidencePassIds = ['initial', ...completedPassIds];
		const completedAllPasses = completedPassIds.length === input.passes.length;
		logBackgroundEvent('evidence-passes-collected', {
			...summarizeTab(input.tab),
			collectionPassIds: completedPassIds,
			observationCount: currentBatch.observations.length,
			timingTraceId: input.timingTraceId,
		});
		await input.waitForPreviousMatcherCompletion;
		if (!await canPersistMatcherResult(input.tab, currentBatch.target.url)) {
			await stopFailedFreshObservation(input.tab, input.session, 'evidence-pass-tab-deactivated-before-matcher');
			return;
		}
		logBackgroundEvent('evidence-pass-matcher-ready', {
			...summarizeTab(input.tab),
			collectionPassIds: completedPassIds,
			observationCount: currentBatch.observations.length,
			timingTraceId: input.timingTraceId,
		});

		void enqueueAnalysisPersistence({
			tab: input.tab,
			batch: currentBatch,
			compiledRegistryArtifact: input.compiledRegistryArtifact,
			snapshotStatus: input.snapshotStatus,
			session: input.session,
			details: {
				refreshKind: 'enrichment-pass',
				matcherMode: 'evidence-pass',
				collectionPassIds: completedPassIds,
				collectionPassCount: input.passes.length + 1,
			},
			enrichment: { status: 'complete', completedAt: Date.now() },
			evidence: createDetectionEvidenceState({
				level: completedAllPasses ? 'full' : 'enriched',
				completedPassIds: completedEvidencePassIds,
				requiredPassIds,
				complete: completedAllPasses,
				reason: completedAllPasses ? undefined : 'some-enrichment-passes-skipped',
			}),
			timingTraceId: input.timingTraceId,
		});
	}

	async function runEvidencePassWithTimeout<T>(
		operation: () => Promise<ExtensionResult<T>>,
	): Promise<ExtensionResult<T>> {
		try {
			return await withTimeout(
				operation(),
				EVIDENCE_PASS_TIMEOUT_MS,
				'Evidence collection pass timed out before it could update the side panel.',
			);
		} catch (error) {
			if (error instanceof RpcTimeoutError) {
				return errorResponse('CONTENT_SCRIPT_UNAVAILABLE', error.message, error.stack);
			}

			const message = error instanceof Error ? error.message : 'Evidence collection pass failed.';
			const stack = error instanceof Error ? error.stack : undefined;
			return errorResponse('UNKNOWN', message, stack);
		}
	}

	function createMatcherJobRecord(
		tab: InspectableTab,
		batch: ObservationBatch,
		mode: MatcherJobMode,
		session?: ObservationSessionState,
	): MatcherJobRecord {
		const now = Date.now();
		const jobId = `matcher:${tab.id}:${now}:${Math.random().toString(36).slice(2)}`;
		return {
			jobId,
			tabId: tab.id,
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

	function createVisibleSessionIdForMatcherJob(
		tab: InspectableTab,
		batch: ObservationBatch,
		session?: ObservationSessionState,
	): VisibleSessionId {
		const documentId = session?.sessionId ?? createDetectionStorageHash(batch.target.url);
		const urlHash = createDetectionStorageHash(batch.target.url);
		return `${tab.id}:0:${documentId}:${urlHash}`;
	}

	function getMatcherJobMode(value: unknown, _session?: ObservationSessionState): MatcherJobMode {
		if (value === 'complete' || value === 'evidence-pass') {
			return value;
		}
		return 'complete';
	}


	/**
	 * Store one replay history entry for each user-visible scan run.
	 *
	 * Background-owned dirty refreshes are detector revisions inside an existing
	 * observation window. They should update snapshots, but they
	 * should not appear as separate top-level replay runs because the user did not
	 * start a new scan and the side panel would show duplicate histories for one action.
	 */
	function shouldStoreReplayHistoryForMatcherJob(details: Record<string, unknown>): boolean {
		const refreshKind = details.refreshKind;
		if (refreshKind === 'queued-continuous-initial' && details.hasFollowUpEnrichment === true) {
			return false;
		}

		if (refreshKind === 'enrichment-pass') {
			return true;
		}

		return (
			refreshKind !== 'incremental' &&
			refreshKind !== 'recovered'
		);
	}

	async function canPersistMatcherResult(tab: InspectableTab, expectedUrl: string): Promise<boolean> {
		const activeTabId = activeTabByWindow.get(tab.windowId);
		if (activeTabId !== undefined && activeTabId !== tab.id) {
			return false;
		}

		try {
			const current = await dependencies.getTab(tab.id);
			if (current.active === false || !current.url) {
				return false;
			}
			if (typeof current.windowId === 'number' && current.windowId !== tab.windowId) {
				return false;
			}
			return url.sameDocument(current.url, expectedUrl);
		} catch {
			return false;
		}
	}


	async function analyzeAndPersistObservationBatch(
		tab: InspectableTab,
		batch: ObservationBatch,
		compiledRegistryArtifact: CompiledRegistry,
		snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'],
		session?: ObservationSessionState,
		details: Record<string, unknown> = {},
		enrichment?: AnalysisEnrichmentState,
		evidence?: DetectionEvidenceState,
		timingTraceId?: string,
		onRegistered?: () => void,
	): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
		const matcherMode = getMatcherJobMode(details.matcherMode, session);
		const supersedesVisibleSession = matcherMode === 'complete';
		const timingContext: TimingContext = {
			traceId: timingTraceId,
			surface: 'pipeline',
			details: {
				...summarizeTab(tab),
				snapshotStatus,
				observationCount: batch.observations.length,
				refreshKind: details.refreshKind,
				matcherMode,
			},
		};
		if (!await canPersistMatcherResult(tab, batch.target.url)) {
			onRegistered?.();
			return errorResponse('VALIDATION_ERROR', 'Matcher work was skipped because the tab is no longer active.');
		}

		const matcherJob = createMatcherJobRecord(tab, batch, matcherMode, session);
		const visibleSessionId = createVisibleSessionIdForMatcherJob(tab, batch, session);
		const visibleSessionOwnerJobId = supersedesVisibleSession
			? matcherJob.jobId
			: latestMatcherJobByVisibleSession.get(visibleSessionId) ?? matcherJob.jobId;
		if (supersedesVisibleSession) {
			for (const [activeJobId, context] of activeMatcherProgressByJob) {
				if (context.visibleSessionId === visibleSessionId && activeJobId !== matcherJob.jobId) {
					activeMatcherProgressByJob.delete(activeJobId);
					void cancelMatcherJob(activeJobId, 'newer-job');
				}
			}
		}

		await saveMatcherJobRecord(matcherJob);
		latestMatcherJobByTab.set(tab.id, matcherJob.jobId);
		if (supersedesVisibleSession) {
			latestMatcherJobByVisibleSession.set(visibleSessionId, matcherJob.jobId);
		}
		activeMatcherProgressByJob.set(matcherJob.jobId, {
			visibleSessionId,
			visibleSessionOwnerJobId,
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
		});
		await updateMatcherJobRecord(matcherJob.jobId, { status: 'dispatching' });
		const newestVisibleSessionOwnerJobId = latestMatcherJobByVisibleSession.get(visibleSessionId);
		if (
			!activeMatcherProgressByJob.has(matcherJob.jobId) ||
			(
				newestVisibleSessionOwnerJobId !== undefined &&
				newestVisibleSessionOwnerJobId !== visibleSessionOwnerJobId
			)
		) {
			return errorResponse('VALIDATION_ERROR', 'Matcher job was canceled before dispatch started.');
		}
		onRegistered?.();
		let matcherResult: MatcherJobRunResult;
		logBackgroundEvent('matcher-job-dispatch', {
			...summarizeTab(tab),
			jobId: matcherJob.jobId,
			mode: matcherMode,
			refreshKind: details.refreshKind,
			observationCount: batch.observations.length,
			timingTraceId,
		});
		try {
			matcherResult = await timeAsyncSpan(
				'pipeline.run-partitioned-matcher-job',
				timingContext,
				() => dependencies.matcher.runJob({
					job: matcherJob,
					mode: matcherMode,
					batch,
					registry: compiledRegistryArtifact.technologies,
					index: compiledRegistryArtifact.matcherIndex,
					relationshipGraph: compiledRegistryArtifact.relationshipGraph,
					source: 'fresh',
				}),
				(result) => ({
					resultCount: result.result.analysis.results.length,
					eventCount: result.result.events.length,
					partitionCount: result.partitions.length,
					executor: result.executor,
				}),
			);
		} catch (error) {
			activeMatcherProgressByJob.delete(matcherJob.jobId);
			throw error;
		}
		const progressContext = activeMatcherProgressByJob.get(matcherJob.jobId);
		if (progressContext) {
			progressContext.matcherExecutor = matcherResult.executor;
		}

		logBackgroundEvent('matcher-job-complete', {
			...summarizeTab(tab),
			jobId: matcherJob.jobId,
			mode: matcherMode,
			refreshKind: details.refreshKind,
			executor: matcherResult.executor,
			partitionCount: matcherResult.partitions.length,
			resultCount: matcherResult.result.analysis.results.length,
			timingTraceId,
		});
		if (matcherResult.executor === 'background-fallback') {
			logBackgroundEvent('matcher-background-fallback', {
				...summarizeTab(tab),
				jobId: matcherJob.jobId,
				partitionCount: matcherResult.partitions.length,
			});
		}

		const newestJobId = latestMatcherJobByVisibleSession.get(visibleSessionId);
		if (newestJobId && newestJobId !== visibleSessionOwnerJobId) {
			activeMatcherProgressByJob.delete(matcherJob.jobId);
			await cancelMatcherJob(matcherJob.jobId, 'newer-job');
			return errorResponse('VALIDATION_ERROR', 'Matcher result was superseded by a newer analysis job.');
		}

		const cacheable = await canPersistMatcherResult(tab, batch.target.url);
		if (!cacheable) {
			activeMatcherProgressByJob.delete(matcherJob.jobId);
			await updateMatcherJobRecord(matcherJob.jobId, { status: 'stale', reason: 'navigation' });
			return errorResponse('VALIDATION_ERROR', 'Matcher result belongs to a document that is no longer active.');
		}
		await updateMatcherJobRecord(matcherJob.jobId, {
			status: 'completed',
			reason: 'completed',
			partitionCount: matcherResult.partitions.length,
			completedPartitionCount: matcherResult.partitions.length,
		});
		const pipelineResult = matcherResult.result;
		const replayTrace = timeSyncSpan(
			'pipeline.create-replay-trace',
			timingContext,
			() => createDetectionReplayTrace({ result: pipelineResult, runId: matcherJob.jobId }),
			(trace) => ({ eventCount: trace.events.length }),
		);
		const savedAnalysis = timeSyncSpan(
			'analysis.normalize-fresh-output',
			timingContext,
			() => Object.assign({}, pipelineResult.analysis, { source: 'fresh' as const }),
			(analysis) => ({ resultCount: analysis.results.length, incognito: tab.incognito }),
		);
		const shouldStoreReplayTrace = shouldStoreReplayHistoryForMatcherJob(details);
		const savedReplayTrace = shouldStoreReplayTrace
			? await timeAsyncSpan(
				'storage.save-replay-trace',
				timingContext,
				async () => tab.incognito ? replayTrace : await saveReplayTrace(replayTrace),
				() => ({ incognito: tab.incognito, stored: true }),
			)
			: replayTrace;
		const replayHistory = await timeAsyncSpan(
			'storage.get-replay-history',
			timingContext,
			async () => tab.incognito ? [] : await getCachedReplayTraceHistory(tab.url),
			(history) => ({
				replayHistoryCount: history.length,
				incognito: tab.incognito,
				storedCurrentRun: shouldStoreReplayTrace,
			}),
		);
		const sessionTarget = createObservationSessionTarget(tab, session);

		logAnalysisSummary(savedAnalysis);
		void dependencies.setBadge(tab.id, savedAnalysis.results.length, getFinding(savedAnalysis)).catch((error) => {
			logBackgroundEvent('toolbar-badge-update-failed', {
				tabId: tab.id,
				message: error instanceof Error ? error.message : String(error),
			});
		});
		logBackgroundEvent('analysis-event-complete', {
			...summarizeTab(tab),
			snapshotStatus,
			resultCount: savedAnalysis.results.length,
			observationCount: batch.observations.length,
			eventCount: pipelineResult.events.length,
			sessionStatus: session?.status ?? 'none',
			timingTraceId,
			...details,
		});

		const output = createAnalysisOutput(
			savedAnalysis,
			snapshotStatus,
			session,
			getReplayTraceForAnalysis(savedReplayTrace, savedAnalysis),
			getReplayHistoryForAnalysis(replayHistory, savedAnalysis),
			sessionTarget,
			enrichment,
			evidence,
		);
		await saveDetectionSnapshotForPanel(tab, output, 'background', matcherResult.executor, undefined, evidence);
		activeMatcherProgressByJob.delete(matcherJob.jobId);

		return extensionSuccess(output);
	}

	/**
	 * Append late observations to the baseline batch and remove duplicate facts.
	 *
	 * Graph refinement needs one candidate set built from everything known about the
	 * page, not a final-result merge. The key deliberately ignores timestamps so a
	 * repeated script URL observed later does not create a second evidence record.
	 */
	function mergeObservationBatches(base: ObservationBatch, next: ObservationBatch): ObservationBatch {
		const observations: NormalizedObservation[] = [];
		const seen = new Set<string>();
		for (const observation of [...base.observations, ...next.observations]) {
			const key = createObservationDeduplicationKey(observation);
			if (seen.has(key)) {
				continue;
			}

			seen.add(key);
			observations.push(observation);
		}

		return Object.assign({}, base, {
			observedAt: Math.max(base.observedAt, next.observedAt),
			observations,
		});
	}

	function createObservationDeduplicationKey(observation: NormalizedObservation): string {
		const attributes = observation.attributes
			? Object.entries(observation.attributes)
				.sort(([left], [right]) => left.localeCompare(right))
				.map(([key, value]) => `${key}:${String(value)}`)
				.join('|')
			: '';

		return [
			observation.kind,
			observation.collector,
			observation.key ?? '',
			String(observation.value),
			attributes,
		].join('\u001f');
	}

	function isSameObservationTarget(left: ObservationBatch, right: ObservationBatch): boolean {
		return left.target.hostname === right.target.hostname && left.target.url === right.target.url;
	}

	async function refreshObservationSessionTarget(
		target: ObservationSessionTarget,
		knownSession?: ObservationSessionState,
	): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
		const tabResponse = await getInspectableTabForObservationSessionTarget(target);
		if (!tabResponse.ok) {
			return tabResponse;
		}

		const tab = tabResponse.value;
		if (!await canPersistMatcherResult(tab, target.expectedUrl)) {
			return errorResponse(
				'OBSERVATION_SESSION_UNAVAILABLE',
				'The observed tab is no longer the active document in its browser window.',
			);
		}
		const timingTraceId = createTimingTraceId('refresh-session');
		const timingContext: TimingContext = {
			traceId: timingTraceId,
			surface: 'background',
			details: {
				...summarizeTab(tab),
				sessionId: target.sessionId,
			},
		};
		logBackgroundEvent('observation-refresh-requested', {
			...summarizeTab(tab),
			timingTraceId,
		});
		const sessionResponse = knownSession
			? extensionSuccess(knownSession)
			: await timeAsyncSpan(
				'background.observation-refresh.get-session-state',
				timingContext,
				() => getObservationSessionStateForTab(tab.id),
				(response) => ({ ok: response.ok, status: response.ok ? response.value.status : undefined }),
			);
		if (!sessionResponse.ok) {
			return sessionResponse;
		}

		const resolvedSession = sessionResponse.value;
		const targetValidation = validateObservationSessionTarget(resolvedSession, target);
		if (!targetValidation.ok) {
			return targetValidation;
		}

		logBackgroundEvent('observation-refresh-session-state', {
			...summarizeTab(tab),
			...summarizeSession(resolvedSession),
		});

		const blockReason = getObservationRefreshBlockReason(resolvedSession, tab.url);
		if (blockReason) {
			logBackgroundEvent('observation-refresh-unavailable', {
				...summarizeTab(tab),
				reason: blockReason,
				sessionExpectedUrl: sessionResponse.value.expectedUrl,
			});
			return errorResponse(
				'OBSERVATION_SESSION_UNAVAILABLE',
				blockReason === 'navigation'
					? 'The visible tab navigated away from the observed document.'
					: 'No active observation session exists for the analyzed tab.',
			);
		}

		const batchResponse = await timeAsyncSpan(
			'background.observation-refresh.flush-batch',
			timingContext,
			() => flushObservationBatchForTab(tab.id),
			(response) => ({
				ok: response.ok,
				queuedCount: response.ok ? response.value.stats.queuedCount : undefined,
				lateObservationCount: response.ok ? (response.value.batch?.observations.length ?? 0) : undefined,
			}),
		);
		if (!batchResponse.ok) {
			return batchResponse;
		}

		return analyzeObservationBatchRefresh(
			tab,
			batchResponse.value,
			timingTraceId,
		);
	}

	async function stopObservationSessionTarget(
		target: ObservationSessionTarget,
	): Promise<ExtensionResult<ObservationSessionState>> {
		const tabResponse = await getInspectableTabForObservationSessionTarget(target);
		if (!tabResponse.ok) {
			return tabResponse;
		}

		const tab = tabResponse.value;
		logBackgroundEvent('observation-stop-api', summarizeTab(tab));
		clearObservationRefreshForSession(tab.id, target.sessionId);
		releaseObservationRefreshBaseline(tab.id, target.sessionId);
		return stopObservationSessionForTab(tab.id, target);
	}


	async function getObservationSessionStateForTarget(
		target: ObservationSessionTarget,
	): Promise<ExtensionResult<ObservationSessionState>> {
		const tabResponse = await getInspectableTabForObservationSessionTarget(target);
		if (!tabResponse.ok) {
			return tabResponse;
		}

		const response = await getObservationSessionStateForTab(target.tabId);
		if (!response.ok) {
			return response;
		}

		const targetValidation = validateObservationSessionTarget(response.value, target);
		if (!targetValidation.ok) {
			return targetValidation;
		}

		return extensionSuccess(response.value);
	}

	async function getInspectableTabForObservationSessionTarget(
		target: ObservationSessionTarget,
	): Promise<ExtensionResult<InspectableTab>> {
		try {
			const tab = await dependencies.getTab(target.tabId);
			if (typeof tab.windowId !== 'number') {
				return errorResponse(
					'OBSERVATION_SESSION_UNAVAILABLE',
					'The browser no longer reports the window that owns the observed tab.',
				);
			}

			if (!tab.url || !url.sameDocument(tab.url, target.expectedUrl)) {
				return errorResponse(
					'OBSERVATION_SESSION_UNAVAILABLE',
					'The visible tab navigated away from the observed document.',
				);
			}

			if (!canInspectTab(tab)) {
				return errorResponse(
					'UNSUPPORTED_URL',
					'Detection only works on normal http/https pages. Reload a website tab and try again.',
				);
			}

			return extensionSuccess({
				id: target.tabId,
				windowId: tab.windowId,
				url: tab.url,
				incognito: target.incognito === true || tab.incognito === true,
			});
		} catch {
			return errorResponse(
				'OBSERVATION_SESSION_UNAVAILABLE',
				'The requested observation session is no longer active in the target tab.',
			);
		}
	}

	/** Debug output is intentionally summary-only; never log raw page observations. */
	function logAnalysisSummary(analysis: SiteAnalysis): void {
		dependencies.logAnalysisSummary(analysis);
	}


	/** Create a minimal analysis envelope while matcher revisions are queued. */
	function createPendingSiteAnalysis(tab: InspectableTab, analyzedAt = Date.now()): SiteAnalysis {
		return {
			url: tab.url,
			hostname: new globalThis.URL(tab.url).hostname,
			analyzedAt,
			source: 'fresh',
			results: [],
			errors: [],
		};
	}

	/**
	 * Return the best immediate response before CPU-bound matcher work finishes.
	 *
	 * Active-tab commands should start collection and matching, then return the last
	 * durable detector output instead of blocking the side panel for a full matcher job.
	 * Storage revisions from the queued matcher job become the receive stream that
	 * moves the side panel from cached output to newer partial and final detections.
	 */
	async function createQueuedAnalysisOutput(
		tab: InspectableTab,
		snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'],
		session?: ObservationSessionState,
		timingTraceId?: string,
	): Promise<AnalyzeVisibleTabOutput> {
		const timingContext: TimingContext = {
			traceId: timingTraceId,
			surface: 'background',
			details: summarizeTab(tab),
		};
		const target = createVisibleTabIdentity(tab);
		const snapshot = tab.incognito
			? null
			: await getLatestVisibleDetectionSnapshot(
				target,
				timingContext,
				'storage.get-visible-snapshot-for-queued-response',
			);
		const analysis = snapshot?.analysis ?? createPendingSiteAnalysis(tab);
		const replayTrace = snapshot && !tab.incognito
			? await timeAsyncSpan(
				'storage.get-cached-replay-trace-for-queued-response',
				timingContext,
				() => getCachedReplayTrace(snapshot.analysis.url),
				(value) => ({ replayTraceHit: Boolean(value) }),
			)
			: null;
		const replayHistory = snapshot && !tab.incognito
			? await timeAsyncSpan(
				'storage.get-replay-history-for-queued-response',
				timingContext,
				() => getCachedReplayTraceHistory(snapshot.analysis.url),
				(value) => ({ replayHistoryCount: value.length }),
			)
			: [];

		return createAnalysisOutput(
			analysis,
			snapshot ? 'hit' : snapshotStatus,
			session,
			getReplayTraceForAnalysis(replayTrace, analysis),
			getReplayHistoryForAnalysis(replayHistory, analysis),
			createObservationSessionTarget(tab, session),
			{ status: 'pending' },
			snapshot?.evidence,
		);
	}

	/** Run matcher persistence after the side-panel command has been released. */
	function enqueueAnalysisPersistence(input: {
		readonly tab: InspectableTab;
		readonly batch: ObservationBatch;
		readonly compiledRegistryArtifact: CompiledRegistry;
		readonly snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'];
		readonly session?: ObservationSessionState;
		readonly details?: Record<string, unknown>;
		readonly enrichment?: AnalysisEnrichmentState;
		readonly evidence?: DetectionEvidenceState;
		readonly timingTraceId?: string;
	}): { readonly registered: Promise<void>; readonly completion: Promise<void> } {
		beginPendingMatcherPersistence(input.tab.id);
		let resolveRegistered: () => void = () => undefined;
		const registered = new Promise<void>((resolve) => {
			resolveRegistered = resolve;
		});
		const completion = analyzeAndPersistObservationBatch(
			input.tab,
			input.batch,
			input.compiledRegistryArtifact,
			input.snapshotStatus,
			input.session,
			input.details ?? {},
			input.enrichment,
			input.evidence,
			input.timingTraceId,
			resolveRegistered,
		).then((response) => {
			if (!response.ok) {
				resolveRegistered();
				logBackgroundEvent('analysis-queued-persist-failed', {
					...summarizeTab(input.tab),
					code: response.error.code,
					message: response.error.message,
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
				message: error instanceof Error ? error.message : 'Queued matcher persistence failed.',
			});
			resolveRegistered();
		}).finally(() => {
			endPendingMatcherPersistence(input.tab.id);
			flushDeferredObservationRefreshesForTab(input.tab.id);
		});
		return { registered, completion };
	}

	function createBackgroundApi(): BackgroundApi {
		return {
			async getAnalysisStatus() {
				return extensionSuccess(await getStatus());
			},

			async getVisibleTabIdentity(input) {
				const tabResponse = await getInspectableTab(input.tabId, input.windowId);
				if (!tabResponse.ok) {
					return tabResponse;
				}

				return extensionSuccess(createVisibleTabIdentity(tabResponse.value));
			},

			async analyzeVisibleTab(input): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
				try {
					const tabResponse = await getInspectableVisibleTab(input.target);
					if (!tabResponse.ok) {
						return tabResponse;
					}

					const tab = tabResponse.value;
					const requestTimingTraceId = createTimingTraceId(input.mode === 'snapshot-first' ? 'panel-open' : 'panel-refresh');
					const requestTimingContext: TimingContext = {
						traceId: requestTimingTraceId,
						surface: 'background',
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
							return extensionSuccess(output);
						}

						logBackgroundEvent('analysis-snapshot-miss', {
							...summarizeTab(tab),
							timingTraceId: requestTimingTraceId,
						});
					}

					return analyzeFreshVisibleTab(
						tab,
						input,
						input.mode === 'refresh' ? 'bypassed' : 'miss',
					);
				} catch (error) {
					activeFreshAnalysisByTab.delete(input.target.tabId);
					const stack = error instanceof Error ? error.stack : undefined;
					const message =
						error instanceof Error ? error.message : 'Unexpected runtime error';
					return errorResponse('UNKNOWN', message, stack);
				}
			},

			async refreshObservationSession(target) {
				try {
					return await refreshObservationSessionTarget(target);
				} catch (error) {
					const stack = error instanceof Error ? error.stack : undefined;
					const message =
						error instanceof Error ? error.message : 'Unexpected runtime error';
					return errorResponse('UNKNOWN', message, stack);
				}
			},

			async stopObservationSession(target) {
				return stopObservationSessionTarget(target);
			},

			async getObservationSessionState(target) {
				return getObservationSessionStateForTarget(target);
			},


			async getReplayTraceHistory(input) {
				return extensionSuccess(await getCachedReplayTraceHistory(input.url));
			},
		};
	}


	function isMatcherPartitionProgressMessage(message: unknown): message is MatcherPartitionProgressMessage {
		return Boolean(
			message &&
			typeof message === 'object' &&
			'channel' in message &&
			message.channel === MATCHER_OFFSCREEN_CHANNEL &&
			'type' in message &&
			message.type === 'matcher.partition-complete',
		);
	}

	function handleMatcherPartitionProgress(message: unknown): void {
		if (!isMatcherPartitionProgressMessage(message)) {
			return;
		}

		void handleMatcherPartitionProgressUpdate(message);
	}

	async function handleMatcherPartitionProgressUpdate(
		message: MatcherPartitionProgressMessage,
	): Promise<void> {
		const jobId = message.partition.job.jobId;
		const context = activeMatcherProgressByJob.get(jobId);
		if (!context || context.tab.incognito) {
			return;
		}

		const newestJobId = latestMatcherJobByVisibleSession.get(context.visibleSessionId);
		if (newestJobId && newestJobId !== context.visibleSessionOwnerJobId) {
			return;
		}

		await updateMatcherJobRecord(jobId, {
			status: 'streaming',
			partitionCount: message.partitionCount,
			completedPartitionCount: message.completedPartitionCount,
		});
		logBackgroundEvent('matcher-partition-complete', {
			...summarizeTab(context.tab),
			jobId,
			mode: context.matcherMode,
			kind: message.partition.kind,
			partitionId: message.partition.partitionId,
			observationCount: message.partition.observationCount,
			matchCount: message.partition.matches.length,
			candidateRuleCount: message.partition.diagnostics.candidateRuleCount,
			completedPartitionCount: message.completedPartitionCount,
			partitionCount: message.partitionCount,
		});

		const previousIndex = context.partitions.findIndex((partition) => partition.partitionId === message.partition.partitionId);
		if (previousIndex >= 0) {
			context.partitions[previousIndex] = message.partition;
		} else {
			context.partitions.push(message.partition);
		}

		if (context.partitions.length === 0) {
			return;
		}

		const partial = createMatcherPipelineResult({
			batch: context.batch,
			registry: context.compiledRegistryArtifact.technologies,
			compiledRegistryArtifact: { relationshipGraph: context.compiledRegistryArtifact.relationshipGraph },
			partitions: context.partitions,
			analyzedAt: Date.now(),
			source: 'fresh',
		});
		const now = Date.now();
		const isFinalPartition = message.completedPartitionCount >= message.partitionCount;
		const resultDelta = Math.max(0, partial.analysis.results.length - context.lastVisibleResultCount);
		const elapsedSinceVisibleRevision = now - context.lastVisibleRevisionAt;
		if (!revision.shouldPublish({ final: isFinalPartition, previousAt: context.lastVisibleRevisionAt, now })) {
			logBackgroundEvent('matcher-partition-revision-coalesced', {
				...summarizeTab(context.tab),
				jobId,
				resultCount: partial.analysis.results.length,
				resultDelta,
				elapsedSinceVisibleRevision,
			});
			return;
		}

		const output = createAnalysisOutput(
			partial.analysis,
			context.snapshotStatus,
			context.session,
			undefined,
			undefined,
			createObservationSessionTarget(context.tab, context.session),
		);
		await saveDetectionSnapshotForPanel(context.tab, output, 'background', context.matcherExecutor ?? 'unknown', {
			jobId,
			mode: context.matcherMode,
			completedPartitionCount: message.completedPartitionCount,
			partitionCount: message.partitionCount,
			latestPartitionKind: message.partition.kind,
			latestPartitionObservationCount: message.partition.observationCount,
			latestPartitionMatchCount: message.partition.matches.length,
			resultCount: partial.analysis.results.length,
			updatedAt: now,
		}, context.evidence);
		context.lastVisibleRevisionAt = now;
		context.lastVisibleResultCount = partial.analysis.results.length;
	}



	const api = createBackgroundApi();

	return {
		api,
		handleRuntimeMessage(message, sender) {
			handleMatcherPartitionProgress(message);

			if (!isObservationDirtyNotification(message) || typeof sender.tab?.id !== 'number') {
				return;
			}

			scheduleObservationRefreshFromContent(
				{
					tabId: sender.tab.id,
					sessionId: message.sessionId,
					expectedUrl: message.expectedUrl,
					...(sender.tab.incognito ? { incognito: true } : {}),
				},
				{
					tabId: sender.tab.id,
					sessionId: message.sessionId,
					hostname: new globalThis.URL(message.expectedUrl).hostname,
					observedAt: message.observedAt,
					pendingMutationCount: message.pendingMutationCount,
				},
			);
		},
		onTabActivated(tabId, windowId) {
			handleTabActivated(tabId, windowId);
		},
		onTabNavigation(tabId) {
			forgetTabRuntimeState(tabId, 'navigation');
		},
		onTabRemoved(tabId) {
			forgetTabRuntimeState(tabId, 'tab-closed');
		},
	};
}
