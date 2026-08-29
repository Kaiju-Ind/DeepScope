import {
	createIncrementalCollectionPasses,
	type CollectionEvidencePass,
	type CollectionEvidencePassId,
	type CollectionTierPlan,
} from '@/lib/collectors/planning';
import type { ExtensionPageCollectorInput } from '@/lib/collectors/extension-page-collector';
import { DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION } from '@/lib/storage/session';
import type * as observe from '@/lib/content/observe';
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
import type { RuntimeTechnologyRegistryProvider } from '@/lib/detection/registry-provider';
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
	MatcherError,
	createMatcherPipelineResult,
	type MatcherJobMode,
	type MatcherJobTerminalReason,
	type MatcherJobRecord,
	type MatcherJobExecutorResult,
	type MatcherJobObserver,
	type MatcherJobRunResult,
	type MatcherJobState,
	type MatcherPartitionProgress,
	type MatcherPartitionResult,
	type RunMatcherJobRequest,
} from '@/lib/matcher';
import type { BackgroundDetectionPersistence } from '@/lib/persistence/ports';
import type { RuntimeTechnologyRegistryArtifact } from '@/lib/registry/runtime-artifact';
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

/** Hashed browser-document identity safe to persist in the execution scheduler. */
export interface ScheduledTabIdentity {
	readonly windowId: number;
	readonly tabId: number;
	readonly frameId: number;
	readonly urlHash: string;
}

/** Runtime adapters wired by the browser entrypoint. */
export interface BackgroundRuntimeDependencies {
	readonly getTab: (tabId: number) => Promise<BackgroundRuntimeTab>;
	readonly executeContentScript: (tabId: number) => Promise<void>;
	readonly createContentApiClient: (tabId: number, frameId?: number) => ContentApi;
	readonly collectObservationBatch: (input: ExtensionPageCollectorInput) => Promise<ExtensionResult<ObservationBatch>>;
	readonly registryProvider: RuntimeTechnologyRegistryProvider;
	/** Stable identity for matcher lifecycle records created by this background context. */
	readonly matcherContextId?: string;
	readonly matcher: {
		readonly cancelJob: (jobId: string) => Promise<void>;
		readonly cancelTab: (tabId: number, reason: MatcherJobTerminalReason) => Promise<void>;
		readonly touchLifecycle: (lifecycleId: string, tabId: number) => Promise<void>;
		readonly releaseLifecycle: (lifecycleId: string) => Promise<void>;
		readonly runJob: (request: RunMatcherJobRequest, observer?: MatcherJobObserver) => Promise<MatcherJobExecutorResult>;
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
	/** Resolve one persisted hashed scheduler identity against the current browser document. */
	readonly resolveScheduledTab: (target: ScheduledTabIdentity) => Promise<ExtensionResult<VisibleTabIdentity>>;
	/** Continue scheduler-owned work for the exact document even after its tab becomes inactive. */
	readonly analyzeScheduledTab: (input: AnalyzeVisibleTabInput) => Promise<ExtensionResult<AnalyzeVisibleTabOutput>>;
	readonly handleRuntimeMessage: (message: unknown, sender: BackgroundRuntimeMessageSender) => void;
	readonly onTabNavigation: (tabId: number) => void;
	readonly onTabRemoved: (tabId: number) => void;
}

/** Visible tab shape after unsupported URLs and missing ids have been rejected. */
type InspectableTab = {
	readonly id: number;
	readonly windowId: number;
	readonly url: string;
	readonly active: boolean;
	readonly incognito: boolean;
};

type CompiledRegistry = RuntimeTechnologyRegistryArtifact;

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
	const matcherContextId = dependencies.matcherContextId ?? crypto.randomUUID();

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

	/** Latest matcher job created for each tab while the background is alive. */

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

	/** One cancelable document-work owner per tab while this service worker is alive. */
	interface TabDocumentWorkScope {
		/** Browser tab that owns the work. */
		readonly tabId: number;
		/** Browser window used to cancel work when another tab becomes visible. */
		readonly windowId: number;
		/** Document URL this work is allowed to publish into. */
		readonly expectedUrl: string;
		/** Monotonic local generation used only for diagnostics. */
		readonly generation: number;
		/** Offscreen lifecycle lease shared by initial and enrichment matcher jobs. */
		readonly lifecycleId: string;
		/** Cancellation authority propagated into collection and matcher scheduling. */
		readonly controller: AbortController;
	}

	/** Current document work scope for each tab. Small control state survives until replacement/navigation. */
	const documentWorkByTab = new Map<number, TabDocumentWorkScope>();
	let documentWorkGeneration = 0;

	/** Create a new document-work generation and cancel every older generation for the tab. */
	function beginDocumentWork(tab: InspectableTab, reason: MatcherJobTerminalReason = 'newer-job'): TabDocumentWorkScope {
		abortDocumentWork(tab.id, reason);
		const generation = ++documentWorkGeneration;
		const scope: TabDocumentWorkScope = {
			tabId: tab.id,
			windowId: tab.windowId,
			expectedUrl: tab.url,
			generation,
			lifecycleId: `matcher-lifecycle:${tab.id}:${generation}:${Date.now()}`,
			controller: new AbortController(),
		};
		documentWorkByTab.set(tab.id, scope);
		return scope;
	}

	/** Reuse the current exact-document scope or create one after service-worker recovery. */
	function getDocumentWork(tab: InspectableTab, expectedUrl = tab.url): TabDocumentWorkScope {
		const current = documentWorkByTab.get(tab.id);
		if (current && !current.controller.signal.aborted && url.sameDocument(current.expectedUrl, expectedUrl)) {
			return current;
		}
		return beginDocumentWork(tab);
	}

	/** Abort background work and ask the offscreen host to discard tab-owned queue/worker state. */
	function abortDocumentWork(tabId: number, reason: MatcherJobTerminalReason): void {
		const scope = documentWorkByTab.get(tabId);
		if (scope && !scope.controller.signal.aborted) {
			scope.controller.abort(new DOMException(`Tab document work canceled: ${reason}.`, 'AbortError'));
		}
		documentWorkByTab.delete(tabId);
		void dependencies.matcher.cancelTab(tabId, reason);
	}

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
		/** Rule-free runtime registry used by the coordinator after worker shards emit matches. */
		readonly compiledRegistryArtifact: CompiledRegistry;
		/** Cache status attached to partial side-panel outputs. */
		readonly snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'];
		/** Active observation session, when the side panel asked for live updates. */
		readonly session?: observe.StateType;
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
		session?: observe.StateType,
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
		session?: observe.StateType,
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
		abortDocumentWork(tabId, reason);
		contentScriptInjectionByTab.delete(tabId);
		releaseObservationRefreshBaseline(tabId);
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
	}

	async function cancelMatcherJob(
		jobId: string,
		reason: 'navigation' | 'tab-closed' | 'newer-job',
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
		return validateInspectableTarget(target, await getInspectableActiveTab(target.tabId, target.windowId));
	}

	/** Validate scheduler-owned work against the exact still-open document without requiring tab visibility. */
	async function getInspectableScheduledTab(target: VisibleTabIdentity): Promise<ExtensionResult<InspectableTab>> {
		return validateInspectableTarget(target, await getInspectableTab(target.tabId, target.windowId));
	}

	/** Resolve durable hashed scheduler identity without persisting the page URL. */
	async function resolveScheduledTab(target: ScheduledTabIdentity): Promise<ExtensionResult<VisibleTabIdentity>> {
		const tab = await getInspectableTab(target.tabId, target.windowId);
		if (!tab.ok) return tab;
		const identity = createVisibleTabIdentity(tab.value);
		if (identity.frameId === target.frameId && identity.urlHash === target.urlHash) {
			return extensionSuccess(identity);
		}

		logBackgroundEvent('scheduled-tab-target-mismatch', {
			requestedWindowId: target.windowId,
			actualWindowId: identity.windowId,
			requestedTabId: target.tabId,
			actualTabId: identity.tabId,
			requestedUrlHash: target.urlHash,
			actualUrlHash: identity.urlHash,
		});
		return errorResponse('VALIDATION_ERROR', 'Scheduled analysis no longer matches its browser document.');
	}

	function validateInspectableTarget(
		target: VisibleTabIdentity,
		targetTab: ExtensionResult<InspectableTab>,
	): ExtensionResult<InspectableTab> {
		if (!targetTab.ok) return targetTab;
		const targetIdentity = createVisibleTabIdentity(targetTab.value);
		if (isSameVisibleTabIdentity(targetIdentity, target)) return targetTab;

		logBackgroundEvent('visible-tab-target-mismatch', {
			requestedWindowId: target.windowId,
			actualWindowId: targetIdentity.windowId,
			requestedTabId: target.tabId,
			actualTabId: targetIdentity.tabId,
			requestedUrlHash: target.urlHash,
			actualUrlHash: targetIdentity.urlHash,
		});
		return errorResponse('VALIDATION_ERROR', 'Analysis request no longer matches its browser document.');
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

	function summarizeSession(session: observe.StateType): Record<string, unknown> {
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
			diagnosticCount: artifact.diagnosticCount,
			initialDomSelectorCount: artifact.collectionPlan.initial.domSelectorPlan.selectors.length,
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
			logBackgroundEvent('tab-missing', { tabId });
			return errorResponse('NO_ACTIVE_TAB', 'The requested browser tab is no longer available.');
		}

		if (tab.windowId !== windowId) {
			logBackgroundEvent('tab-window-mismatch', {
				tabId,
				requestedWindowId: windowId,
				actualWindowId: tab.windowId,
			});
			return errorResponse('NO_ACTIVE_TAB', 'The requested browser tab no longer belongs to this window.');
		}

		if (typeof tab.id !== 'number' || !tab.url) {
			logBackgroundEvent('tab-unavailable', { tabId });
			return errorResponse('NO_ACTIVE_TAB', 'The browser tab does not have an inspectable URL yet.');
		}

		if (!canInspectTab(tab)) {
			logBackgroundEvent('tab-unsupported', { tabId: tab.id, url: tab.url });
			return errorResponse(
				'UNSUPPORTED_URL',
				'Detection only works on normal http/https pages. Reload a website tab and try again.',
			);
		}

		return extensionSuccess({
			id: tab.id,
			windowId: tab.windowId,
			url: tab.url,
			active: tab.active === true,
			incognito: tab.incognito === true,
		});
	}

	/** Require an active tab only while acquiring a user-visible target. */
	async function getInspectableActiveTab(tabId: number, windowId: number): Promise<ExtensionResult<InspectableTab>> {
		const tab = await getInspectableTab(tabId, windowId);
		if (!tab.ok || tab.value.active) return tab;
		logBackgroundEvent('visible-tab-inactive', { tabId });
		return errorResponse('NO_ACTIVE_TAB', 'The requested browser tab is no longer active.');
	}

	async function pingContentScript(tabId: number, signal?: AbortSignal): Promise<boolean> {
		const contentApi = createContentApiClient(tabId, 0);

		try {
			const response = await withTimeout(
				contentApi.getObservationSessionState(),
				CONTENT_SCRIPT_PING_TIMEOUT_MS,
				'Content script ping timed out.',
				{ signal },
			);

			return response.ok;
		} catch {
			return false;
		}
	}

	async function injectContentScript(tabId: number, signal?: AbortSignal): Promise<ExtensionResult<void>> {
		try {
			signal?.throwIfAborted();
			await dependencies.executeContentScript(tabId);
			signal?.throwIfAborted();
			return extensionSuccess(undefined);
		} catch (error) {
			return contentScriptFailure(error);
		}
	}

	async function ensureContentScript(tabId: number, signal?: AbortSignal): Promise<ExtensionResult<void>> {
		signal?.throwIfAborted();
		if (await pingContentScript(tabId, signal)) {
			logBackgroundEvent('content-runtime-ready', { tabId });
			return extensionSuccess(undefined);
		}

		const existingInjection = contentScriptInjectionByTab.get(tabId);
		if (existingInjection) {
			logBackgroundEvent('content-runtime-await-existing-injection', { tabId });
			return await withTimeout(existingInjection, CONTENT_SCRIPT_TIMEOUT_MS, 'Existing content-script injection did not settle.', { signal });
		}

		const injection = (async () => {
			logBackgroundEvent('content-runtime-inject-start', { tabId });
			const injectionResponse = await injectContentScript(tabId, signal);
			if (!injectionResponse.ok) {
				logBackgroundEvent('content-runtime-inject-failed', {
					tabId,
					code: injectionResponse.error.code,
					message: injectionResponse.error.message,
				});
				return injectionResponse;
			}

			if (await pingContentScript(tabId, signal)) {
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
		signal?: AbortSignal,
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
			() => ensureContentScript(tabId, signal),
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
				...(signal ? { signal } : {}),
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
		session?: observe.StateType,
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
		session?: observe.StateType,
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
	async function savePanelSnapshot(
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
		await queueSnapshotWrite(key, async () => {
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
	function getSnapshotQueueKey(key: DetectionSessionKey): string {
		return `${key.tabId}:${key.frameId}:${key.originHash}:${key.documentId}`;
	}

	/** Serialize revision assignment and storage writes for one exact session. */
	function queueSnapshotWrite(
		key: DetectionSessionKey,
		operation: () => Promise<void>,
	): Promise<void> {
		const queueKey = getSnapshotQueueKey(key);
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
		actual: observe.StateType,
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
		signal?: AbortSignal,
	): Promise<ExtensionResult<observe.StateType>> {
		const contentApi = createContentApiClient(tabId, 0);

		try {
			return await withTimeout(
				contentApi.getObservationSessionState(),
				CONTENT_SCRIPT_TIMEOUT_MS,
				'Content script did not respond before the messaging timeout.',
				{ signal },
			);
		} catch (error) {
			return contentScriptFailure(error);
		}
	}

	async function flushObservationBatchForTab(
		tabId: number,
		signal?: AbortSignal,
	): Promise<ExtensionResult<FlushObservationBatchOutput>> {
		const contentApi = createContentApiClient(tabId, 0);

		try {
			return await withTimeout(
				contentApi.flushObservationBatch(),
				CONTENT_SCRIPT_TIMEOUT_MS,
				'Content script did not respond before the messaging timeout.',
				{ signal },
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
			? extensionSuccess(timeSyncSpan(
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
		return extensionSuccess(response);
	}

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

		const recoveredBatch = await collectObservationBatchFromTab(tab.id, tab.url, compiledRegistryArtifact, 'initial', timingTraceId, undefined, signal);
		if (!recoveredBatch.ok) {
			return recoveredBatch;
		}

		return extensionSuccess(mergeObservationBatches(recoveredBatch.value, lateBatch));
	}

	async function beginObservationSessionForTab(
		tab: InspectableTab,
		compiledRegistryArtifact: CompiledRegistry,
		signal?: AbortSignal,
	): Promise<ExtensionResult<observe.StateType>> {
		const sessionId = crypto.randomUUID();
		logBackgroundEvent('observation-start-requested', {
			...summarizeTab(tab),
			sessionId,
			policy: EXTENSION_OBSERVATION_POLICY,
		});

		const contentScriptResponse = await ensureContentScript(tab.id, signal);
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
	): Promise<ExtensionResult<observe.StateType>> {
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
		session: observe.StateType | undefined,
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
				return errorResponse('VALIDATION_ERROR', 'The visible tab changed before matcher work could start.');
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
			return extensionSuccess(response);
		} finally {
			activeFreshAnalysisByTab.delete(tab.id);
		}
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
		readonly session?: observe.StateType;
		/** Timing trace shared with the initial side-panel command. */
		readonly timingTraceId: string;
		/** Cancelable document owner and matcher lifecycle lease shared with the initial pass. */
		readonly workScope: TabDocumentWorkScope;
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
		const signal = input.workScope.controller.signal;
		let currentBatch = getObservationRefreshBaseline(input.tab.id, input.session) ?? input.baseBatch;
		const completedPassIds: CollectionEvidencePass['id'][] = [];

		try {
			for (const pass of input.passes) {
				signal.throwIfAborted();
				await dependencies.matcher.touchLifecycle(input.workScope.lifecycleId, input.tab.id);
				if (!await canSaveMatcher(input.tab, currentBatch.target.url)) {
					logBackgroundEvent('evidence-passes-stopped-after-navigation', {
						...summarizeTab(input.tab),
						passId: pass.id,
					});
					return;
				}

				const passBatch = await runEvidencePassWithTimeout((deadlineSignal) => collectObservationBatchFromTab(
					input.tab.id,
					input.tab.url,
					input.compiledRegistryArtifact,
					pass.plan.tier,
					`${input.timingTraceId}:collect:${pass.id}`,
					pass.plan,
					deadlineSignal,
				), signal);
				signal.throwIfAborted();
				if (!passBatch.ok) {
					logBackgroundEvent('evidence-pass-collection-skipped', {
						...summarizeTab(input.tab),
						passId: pass.id,
						code: passBatch.error.code,
						message: passBatch.error.message,
					});
					continue;
				}
				if (!await canSaveMatcher(input.tab, passBatch.value.target.url)) {
					await stopFailedFreshObservation(input.tab, input.session, 'evidence-pass-document-changed');
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

			if (completedPassIds.length === 0) return;

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
			signal.throwIfAborted();
			if (!await canSaveMatcher(input.tab, currentBatch.target.url)) {
				await stopFailedFreshObservation(input.tab, input.session, 'evidence-pass-document-changed-before-matcher');
				return;
			}
			logBackgroundEvent('evidence-pass-matcher-ready', {
				...summarizeTab(input.tab),
				collectionPassIds: completedPassIds,
				observationCount: currentBatch.observations.length,
				timingTraceId: input.timingTraceId,
			});

			const matcher = queueAnalysis({
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
				workScope: input.workScope,
			});
			await matcher.completion;
		} catch (error) {
			if (signal.aborted) {
				logBackgroundEvent('evidence-passes-canceled', {
					...summarizeTab(input.tab),
					completedPassIds,
				});
				return;
			}
			throw error;
		} finally {
			await dependencies.matcher.releaseLifecycle(input.workScope.lifecycleId);
		}
	}

	async function runEvidencePassWithTimeout<T>(
		operation: (signal: AbortSignal) => Promise<ExtensionResult<T>>,
		signal?: AbortSignal,
	): Promise<ExtensionResult<T>> {
		try {
			return await withTimeout(
				operation,
				EVIDENCE_PASS_TIMEOUT_MS,
				'Evidence collection pass timed out before it could update the side panel.',
				{ signal },
			);
		} catch (error) {
			if (signal?.aborted) throw error;
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

	function getVisibleSessionId(
		tab: InspectableTab,
		batch: ObservationBatch,
		session?: observe.StateType,
	): VisibleSessionId {
		const documentId = session?.sessionId ?? createDetectionStorageHash(batch.target.url);
		const urlHash = createDetectionStorageHash(batch.target.url);
		return `${tab.id}:0:${documentId}:${urlHash}`;
	}

	function getMatcherMode(value: unknown, _session?: observe.StateType): MatcherJobMode {
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
	function shouldStoreReplay(details: Record<string, unknown>): boolean {
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

	async function canSaveMatcher(tab: InspectableTab, expectedUrl: string): Promise<boolean> {
		try {
			const current = await dependencies.getTab(tab.id);
			if (!current.url) return false;
			if (typeof current.windowId === 'number' && current.windowId !== tab.windowId) return false;
			return url.sameDocument(current.url, expectedUrl);
		} catch {
			return false;
		}
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
		session?: observe.StateType,
		details: Record<string, unknown> = {},
		enrichment?: AnalysisEnrichmentState,
		evidence?: DetectionEvidenceState,
		timingTraceId?: string,
		workScope?: TabDocumentWorkScope,
		onRegistered?: () => void,
	): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
		const matcherMode = getMatcherMode(details.matcherMode, session);
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
			: latestMatcherJobByVisibleSession.get(visibleSessionId) ?? matcherJob.jobId;
		if (supersedesVisibleSession) cancelSupersededTabMatchers(tab.id, visibleSessionId, matcherJob.jobId);

		await saveMatcherJobRecord(matcherJob);
		if (supersedesVisibleSession) latestMatcherJobByVisibleSession.set(visibleSessionId, matcherJob.jobId);
		activeMatcherProgressByJob.set(matcherJob.jobId, {
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
		});

		try {
			await updateMatcherJobRecord(matcherJob.jobId, { status: 'dispatching' });
			if (!isMatcherCurrent(matcherJob.jobId, visibleSessionId, ownerJobId)) {
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
			const progressContext = activeMatcherProgressByJob.get(matcherJob.jobId);
			if (progressContext) progressContext.matcherExecutor = matcherResult.executor;

			if (!isMatcherCurrent(matcherJob.jobId, visibleSessionId, ownerJobId)) {
				await cancelMatcherJob(matcherJob.jobId, 'newer-job');
				return errorResponse('VALIDATION_ERROR', 'Matcher result was superseded by a newer analysis job.');
			}
			if (!await canSaveMatcher(tab, batch.target.url)) {
				await updateMatcherJobRecord(matcherJob.jobId, { status: 'stale', reason: 'navigation' });
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
			});
			return extensionSuccess(output);
		} finally {
			// This context owns the full observation batch and rule-free runtime registry. Every
			// success, stale-result, cancellation, and persistence failure path must release
			// it so a failed storage write cannot become a long-lived background retainer.
			activeMatcherProgressByJob.delete(matcherJob.jobId);
		}
	}

	type MatcherRunType = {
		readonly tab: InspectableTab;
		readonly job: MatcherJobRecord;
		readonly mode: MatcherJobMode;
		readonly batch: ObservationBatch;
		readonly registry: CompiledRegistry;
		readonly details: Record<string, unknown>;
		readonly timingContext: TimingContext;
		readonly timingTraceId?: string;
		readonly workScope: TabDocumentWorkScope;
	};

	/** Run the isolated matcher and assemble the terminal pipeline from the one background accumulator. */
	async function runMatcher(input: MatcherRunType): Promise<MatcherJobRunResult> {
		const signal = input.workScope.controller.signal;
		signal.throwIfAborted();
		logBackgroundEvent('matcher-job-dispatch', {
			...summarizeTab(input.tab),
			jobId: input.job.jobId,
			mode: input.mode,
			refreshKind: input.details.refreshKind,
			observationCount: input.batch.observations.length,
			timingTraceId: input.timingTraceId,
		});
		try {
			const executor = await timeAsyncSpan(
				'pipeline.run-partitioned-matcher-job',
				input.timingContext,
				() => dependencies.matcher.runJob({
					job: input.job,
					mode: input.mode,
					batch: input.batch,
					registry: input.registry.technologies,
					relationshipGraph: input.registry.relationshipGraph,
					source: 'fresh',
					lifecycleId: input.workScope.lifecycleId,
				}, {
					onState: updateMatcherState,
					onPartition: updatePartitionProgress,
				}),
				(value) => ({ partitionCount: value.partitionCount, executor: value.executor }),
			);
			signal.throwIfAborted();

			const progress = activeMatcherProgressByJob.get(input.job.jobId);
			if (!progress) {
				throw new MatcherError('host-failed', 'Matcher progress owner disappeared before terminal assembly.');
			}
			if (executor.partitionCount !== progress.partitions.length) {
				throw new MatcherError(
					'host-failed',
					`Matcher completed ${executor.partitionCount} partitions but background retained ${progress.partitions.length}.`,
				);
			}

			const pipeline = createMatcherPipelineResult({
				batch: input.batch,
				registry: input.registry.technologies,
				relationshipGraph: input.registry.relationshipGraph,
				partitions: progress.partitions,
				analyzedAt: executor.completedAt,
				source: 'fresh',
			});
			const result: MatcherJobRunResult = {
				job: executor.job,
				mode: executor.mode,
				result: pipeline,
				partitions: progress.partitions,
				executor: executor.executor,
				completedAt: executor.completedAt,
			};
			logBackgroundEvent('matcher-job-matched', {
				...summarizeTab(input.tab),
				jobId: input.job.jobId,
				mode: input.mode,
				refreshKind: input.details.refreshKind,
				executor: result.executor,
				partitionCount: result.partitions.length,
				resultCount: result.result.analysis.results.length,
				timingTraceId: input.timingTraceId,
			});
			return result;
		} catch (error) {
			if (error instanceof MatcherError && error.reason === 'canceled') throw error;
			if (signal.aborted) throw signal.reason;
			await updateMatcherJobRecord(input.job.jobId, {
				status: 'failed',
				reason: getMatcherFailureReason(error),
				errorMessage: error instanceof Error ? error.message : String(error),
			});
			throw error;
		}
	}

	/** Map runtime matcher failures to durable lifecycle reasons without parsing error messages. */
	function getMatcherFailureReason(error: unknown): MatcherJobRecord['reason'] {
		if (!(error instanceof MatcherError)) return 'worker-failed';
		switch (error.reason) {
			case 'offscreen-unavailable': return 'offscreen-unavailable';
			case 'queue-full': return 'queue-full';
			case 'run-timeout': return 'matcher-timeout';
			default: return 'worker-failed';
		}
	}

	type MatcherSaveType = {
		readonly tab: InspectableTab;
		readonly job: MatcherJobRecord;
		readonly mode: MatcherJobMode;
		readonly result: MatcherJobRunResult;
		readonly observationCount: number;
		readonly snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'];
		readonly session?: observe.StateType;
		readonly details: Record<string, unknown>;
		readonly enrichment?: AnalysisEnrichmentState;
		readonly evidence?: DetectionEvidenceState;
		readonly timingContext: TimingContext;
		readonly timingTraceId?: string;
	};

	/** Persist replay and final side-panel state after matcher computation has completed. */
	async function saveMatcher(input: MatcherSaveType): Promise<AnalyzeVisibleTabOutput> {
		const pipelineResult = input.result.result;
		const analysis = timeSyncSpan(
			'analysis.normalize-fresh-output',
			input.timingContext,
			() => Object.assign({}, pipelineResult.analysis, { source: 'fresh' as const }),
			(value) => ({ resultCount: value.results.length, incognito: input.tab.incognito }),
		);
		const sessionTarget = createObservationSessionTarget(input.tab, input.session);

		try {
			await saveRecording(input, analysis, sessionTarget);
			const replayTrace = timeSyncSpan(
				'pipeline.create-replay-trace',
				input.timingContext,
				() => createDetectionReplayTrace({ result: pipelineResult, runId: input.job.jobId }),
				(trace) => ({ eventCount: trace.events.length }),
			);
			const shouldStoreReplayTrace = shouldStoreReplay(input.details);
			const savedReplayTrace = shouldStoreReplayTrace
				? await timeAsyncSpan(
					'storage.save-replay-trace',
					input.timingContext,
					async () => input.tab.incognito ? replayTrace : await saveReplayTrace(replayTrace),
					() => ({ incognito: input.tab.incognito, stored: true }),
				)
				: replayTrace;
			const replayHistory = await timeAsyncSpan(
				'storage.get-replay-history',
				input.timingContext,
				async () => input.tab.incognito ? [] : await getCachedReplayTraceHistory(input.tab.url),
				(history) => ({
					replayHistoryCount: history.length,
					incognito: input.tab.incognito,
					storedCurrentRun: shouldStoreReplayTrace,
				}),
			);

			logAnalysisSummary(analysis);
			void dependencies.setBadge(input.tab.id, analysis.results.length, getFinding(analysis)).catch((error) => {
				logBackgroundEvent('toolbar-badge-update-failed', {
					tabId: input.tab.id,
					message: error instanceof Error ? error.message : String(error),
				});
			});
			logBackgroundEvent('analysis-event-complete', {
				...summarizeTab(input.tab),
				snapshotStatus: input.snapshotStatus,
				resultCount: analysis.results.length,
				observationCount: input.observationCount,
				eventCount: pipelineResult.events.length,
				sessionStatus: input.session?.status ?? 'none',
				timingTraceId: input.timingTraceId,
				...input.details,
			});

			const output = createAnalysisOutput(
				analysis,
				input.snapshotStatus,
				input.session,
				getReplayTraceForAnalysis(savedReplayTrace, analysis),
				getReplayHistoryForAnalysis(replayHistory, analysis),
				sessionTarget,
				input.enrichment,
				input.evidence,
			);
			await savePanelSnapshot(input.tab, output, 'background', input.result.executor, undefined, input.evidence);
			await updateMatcherJobRecord(input.job.jobId, {
				status: 'completed',
				reason: 'completed',
				partitionCount: input.result.partitions.length,
				completedPartitionCount: input.result.partitions.length,
			});
			logBackgroundEvent('matcher-job-complete', {
				...summarizeTab(input.tab),
				jobId: input.job.jobId,
				mode: input.mode,
				executor: input.result.executor,
				partitionCount: input.result.partitions.length,
				resultCount: analysis.results.length,
				timingTraceId: input.timingTraceId,
			});
			return output;
		} catch (error) {
			await updateMatcherJobRecord(input.job.jobId, {
				status: 'failed',
				reason: 'persistence-failed',
				errorMessage: error instanceof Error ? error.message : String(error),
			});
			throw error;
		}
	}

	/** Publish the final matcher output as a visible recording stage before storage work. */
	async function saveRecording(
		input: MatcherSaveType,
		analysis: SiteAnalysis,
		sessionTarget: ObservationSessionTarget | undefined,
	): Promise<void> {
		await updateMatcherJobRecord(input.job.jobId, {
			status: 'recording',
			partitionCount: input.result.partitions.length,
			completedPartitionCount: input.result.partitions.length,
		});
		const output = createAnalysisOutput(
			analysis,
			input.snapshotStatus,
			input.session,
			undefined,
			undefined,
			sessionTarget,
			input.enrichment,
			input.evidence,
		);
		await savePanelSnapshot(input.tab, output, 'background', input.result.executor, {
			jobId: input.job.jobId,
			mode: input.mode,
			phase: 'recording',
			completedPartitionCount: input.result.partitions.length,
			partitionCount: input.result.partitions.length,
			resultCount: analysis.results.length,
			updatedAt: Date.now(),
		}, input.evidence);
	}

	/** Return whether one matcher still owns the newest visible-session generation. */
	function isMatcherCurrent(jobId: string, visibleSessionId: VisibleSessionId, ownerJobId: string): boolean {
		if (!activeMatcherProgressByJob.has(jobId)) return false;
		const newestJobId = latestMatcherJobByVisibleSession.get(visibleSessionId);
		return newestJobId === undefined || newestJobId === ownerJobId;
	}

	/** Cancel matcher work and retire session keys superseded by a new complete analysis for one tab. */
	function cancelSupersededTabMatchers(tabId: number, visibleSessionId: VisibleSessionId, jobId: string): void {
		for (const [activeJobId, context] of activeMatcherProgressByJob) {
			if (context.tab.id !== tabId || activeJobId === jobId) continue;
			activeMatcherProgressByJob.delete(activeJobId);
			void cancelMatcherJob(activeJobId, 'newer-job');
		}

		const tabPrefix = `${tabId}:`;
		for (const sessionId of latestMatcherJobByVisibleSession.keys()) {
			if (sessionId !== visibleSessionId && sessionId.startsWith(tabPrefix)) {
				latestMatcherJobByVisibleSession.delete(sessionId);
			}
		}
	}

	/** Retire matcher freshness state when one live observation session is explicitly stopped. */
	function retireVisibleSessionOwnership(tabId: number, sessionId: string, expectedUrl: string): void {
		const urlHash = createDetectionStorageHash(expectedUrl);
		latestMatcherJobByVisibleSession.delete(`${tabId}:0:${sessionId}:${urlHash}`);
	}

	/** Build timing metadata once so matcher spans share the same stable context. */
	function createMatcherTiming(
		tab: InspectableTab,
		batch: ObservationBatch,
		snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'],
		matcherMode: MatcherJobMode,
		details: Record<string, unknown>,
		timingTraceId?: string,
	): TimingContext {
		return {
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
		knownSession?: observe.StateType,
	): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
		const tabResponse = await getInspectableTabForObservationSessionTarget(target);
		if (!tabResponse.ok) {
			return tabResponse;
		}

		const tab = tabResponse.value;
		const workScope = getDocumentWork(tab, target.expectedUrl);
		const signal = workScope.controller.signal;
		signal.throwIfAborted();
		if (!await canSaveMatcher(tab, target.expectedUrl)) {
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
				() => getObservationSessionStateForTab(tab.id, signal),
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
			() => flushObservationBatchForTab(tab.id, signal),
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
	): Promise<ExtensionResult<observe.StateType>> {
		const tabResponse = await getInspectableTabForObservationSessionTarget(target);
		if (!tabResponse.ok) {
			return tabResponse;
		}

		const tab = tabResponse.value;
		logBackgroundEvent('observation-stop-api', summarizeTab(tab));
		clearObservationRefreshForSession(tab.id, target.sessionId);
		releaseObservationRefreshBaseline(tab.id, target.sessionId);
		retireVisibleSessionOwnership(tab.id, target.sessionId, target.expectedUrl);
		return stopObservationSessionForTab(tab.id, target);
	}


	async function getObservationSessionStateForTarget(
		target: ObservationSessionTarget,
	): Promise<ExtensionResult<observe.StateType>> {
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
				active: tab.active === true,
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
		session?: observe.StateType,
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
	function queueAnalysis(input: {
		readonly tab: InspectableTab;
		readonly batch: ObservationBatch;
		readonly compiledRegistryArtifact: CompiledRegistry;
		readonly snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'];
		readonly session?: observe.StateType;
		readonly details?: Record<string, unknown>;
		readonly enrichment?: AnalysisEnrichmentState;
		readonly evidence?: DetectionEvidenceState;
		readonly timingTraceId?: string;
		readonly workScope?: TabDocumentWorkScope;
	}): { readonly registered: Promise<void>; readonly completion: Promise<void> } {
		beginPendingMatcherPersistence(input.tab.id);
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
			input.details ?? {},
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

			return analyzeFreshVisibleTab(tab, input, input.mode === 'refresh' ? 'bypassed' : 'miss');
		} catch (error) {
			activeFreshAnalysisByTab.delete(input.target.tabId);
			const stack = error instanceof Error ? error.stack : undefined;
			const message = error instanceof Error ? error.message : 'Unexpected runtime error';
			return errorResponse('UNKNOWN', message, stack);
		}
	}

	function createBackgroundApi(): BackgroundApi {
		return {
			async getAnalysisStatus() {
				return extensionSuccess(await getStatus());
			},

			async getVisibleTabIdentity(input) {
				const tabResponse = await getInspectableActiveTab(input.tabId, input.windowId);
				if (!tabResponse.ok) {
					return tabResponse;
				}

				return extensionSuccess(createVisibleTabIdentity(tabResponse.value));
			},

			async analyzeVisibleTab(input): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
				return await analyzeTabTarget(input, 'visible');
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



	/**
	 * Project offscreen scheduler state into one lightweight side-panel revision.
	 *
	 * Queue messages intentionally preserve the newest detector analysis already
	 * stored for the page instead of replacing it with an empty analysis. The new
	 * revision changes only matcher progress, so a user can keep reading previous
	 * detections while the next evidence job waits for capacity.
	 */
	async function updateMatcherState(state: MatcherJobState): Promise<void> {
		const context = activeMatcherProgressByJob.get(state.jobId);
		if (!context || context.tab.incognito) return;
		const newestJobId = latestMatcherJobByVisibleSession.get(context.visibleSessionId);
		if (newestJobId && newestJobId !== context.visibleSessionOwnerJobId) return;

		context.matcherExecutor = 'offscreen-worker-pool';
		await updateMatcherJobRecord(state.jobId, {
			status: state.phase === 'queued' ? 'queued' : 'running',
			...(state.partitionCount === undefined ? {} : { partitionCount: state.partitionCount }),
			completedPartitionCount: 0,
		});
		logBackgroundEvent(`matcher-job-${state.phase}`, {
			...summarizeTab(context.tab),
			jobId: state.jobId,
			mode: context.matcherMode,
			queuePosition: state.queuePosition,
			queueDepth: state.queueDepth,
			partitionCount: state.partitionCount,
			queuedAt: state.queuedAt,
			startedAt: state.startedAt,
			...(state.startedAt === undefined ? {} : { queueWaitMs: Math.max(0, state.startedAt - state.queuedAt) }),
		});

		const pending = createAnalysisOutput(
			createPendingSiteAnalysis(context.tab),
			context.snapshotStatus,
			context.session,
			undefined,
			undefined,
			createObservationSessionTarget(context.tab, context.session),
		);
		const key = createDetectionSessionKeyForOutput(context.tab, pending);
		const existing = await getLatestDetectionSessionSnapshot(key);
		const analysis = existing?.analysis ?? pending.analysis;
		const output = createAnalysisOutput(
			analysis,
			context.snapshotStatus,
			context.session,
			undefined,
			undefined,
			createObservationSessionTarget(context.tab, context.session),
		);
		await savePanelSnapshot(context.tab, output, 'background', context.matcherExecutor, {
			jobId: state.jobId,
			mode: context.matcherMode,
			phase: state.phase === 'queued' ? 'queued' : 'matching',
			queuedAt: state.queuedAt,
			...(state.startedAt === undefined ? {} : { startedAt: state.startedAt }),
			...(state.queuePosition === undefined ? {} : { queuePosition: state.queuePosition }),
			queueDepth: state.queueDepth,
			completedPartitionCount: 0,
			partitionCount: state.partitionCount ?? 0,
			resultCount: analysis.results.length,
			updatedAt: Date.now(),
		}, context.evidence);
	}

	async function updatePartitionProgress(
		progress: MatcherPartitionProgress,
	): Promise<void> {
		const jobId = progress.partition.job.jobId;
		const context = activeMatcherProgressByJob.get(jobId);
		if (!context || context.tab.incognito) {
			return;
		}

		const newestJobId = latestMatcherJobByVisibleSession.get(context.visibleSessionId);
		if (newestJobId && newestJobId !== context.visibleSessionOwnerJobId) {
			return;
		}

		const previousIndex = context.partitions.findIndex((partition) => partition.partitionId === progress.partition.partitionId);
		if (previousIndex >= 0) {
			context.partitions[previousIndex] = progress.partition;
		} else {
			context.partitions.push(progress.partition);
		}

		await updateMatcherJobRecord(jobId, {
			status: 'streaming',
			partitionCount: progress.partitionCount,
			completedPartitionCount: progress.completedPartitionCount,
		});
		logBackgroundEvent('matcher-partition-complete', {
			...summarizeTab(context.tab),
			jobId,
			mode: context.matcherMode,
			kind: progress.partition.kind,
			partitionId: progress.partition.partitionId,
			observationCount: progress.partition.observationCount,
			matchCount: progress.partition.matches.length,
			candidateRuleCount: progress.partition.diagnostics.candidateRuleCount,
			completedPartitionCount: progress.completedPartitionCount,
			partitionCount: progress.partitionCount,
		});

		if (context.partitions.length === 0) {
			return;
		}

		const partial = createMatcherPipelineResult({
			batch: context.batch,
			registry: context.compiledRegistryArtifact.technologies,
			relationshipGraph: context.compiledRegistryArtifact.relationshipGraph,
			partitions: context.partitions,
			analyzedAt: Date.now(),
			source: 'fresh',
		});
		const now = Date.now();
		const isFinalPartition = progress.completedPartitionCount >= progress.partitionCount;
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
		await savePanelSnapshot(context.tab, output, 'background', context.matcherExecutor ?? 'unknown', {
			jobId,
			mode: context.matcherMode,
			phase: 'matching',
			completedPartitionCount: progress.completedPartitionCount,
			partitionCount: progress.partitionCount,
			latestPartitionKind: progress.partition.kind,
			latestPartitionObservationCount: progress.partition.observationCount,
			latestPartitionMatchCount: progress.partition.matches.length,
			resultCount: partial.analysis.results.length,
			updatedAt: now,
		}, context.evidence);
		context.lastVisibleRevisionAt = now;
		context.lastVisibleResultCount = partial.analysis.results.length;
	}



	const api = createBackgroundApi();

	return {
		api,
		resolveScheduledTab,
		analyzeScheduledTab(input) {
			return analyzeTabTarget(input, 'scheduled');
		},
		handleRuntimeMessage(message, sender) {
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
		onTabNavigation(tabId) {
			forgetTabRuntimeState(tabId, 'navigation');
		},
		onTabRemoved(tabId) {
			forgetTabRuntimeState(tabId, 'tab-closed');
		},
	};
}
