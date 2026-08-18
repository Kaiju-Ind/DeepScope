import { defineProxy } from "comctx";
import { createMemo, createSignal, onCleanup, onMount, type JSX } from "solid-js";
import { createStore } from "solid-js/store";

import * as logging from '@/lib/diagnostics/logging';
import {
  DEFAULT_AUTO_SCAN_ENABLED,
  getAutoScanEnabled,
  setAutoScanEnabled as persistAutoScanEnabled,
} from "@/lib/autostart/settings";
import type {
  AnalysisStatus,
  SiteAnalysis,
} from "@/lib/detection/types";
import type {
  DetectionEvidenceState,
  DetectionReplaySummary,
  DetectionSessionKey,
  DetectionSessionSnapshot,
} from "@/lib/storage/session";
import type { DetectionReplayTrace } from "@/lib/pipeline";
import type {
  VisibleTabIdentity,
  AnalyzeVisibleTabInput,
  AnalyzeVisibleTabOutput,
  BackgroundApi,
  ObservationSessionTarget,
} from "@/lib/messaging";
import {
  BACKGROUND_RPC_NAMESPACE,
  createBackgroundClientAdapter,
} from "@/lib/messaging";
import {
  buildAnalysisUpdate,
  createVisibleRevisionFromAnalysisResponse,
  createReplaySummaryFromTrace,
  formatError,
  getAnalysisActivity,
  getMatcherStatusFromSnapshot,
  getReplayHistoryForVisibleAnalysis,
  getObservationLabel,
  getObservationModeFromSession,
  getObservationModeFromSnapshot,
  groupDetectionsByPrimaryCategory,
  isVisibleRevisionPending,
  shouldApplyReplayState,
  shouldApplySnapshotRevision,
  shouldPreserveReplayState,
  type ExplanationLookup,
  type MatcherStatus,
  type Notice,
  type ObservationMode,
  type VisibleRevision,
} from "@/app/model";
import {
  createStoredVisibleRevision,
  isNewerSnapshotRevision,
  getStoredAnalysis,
  subscribeToSnapshotRevisions,
} from "@/app/snapshot";
import { browserDetectionPersistence } from "@/lib/persistence";
import { PanelContext, type PanelContextType } from "@/app/context";
import { getTabTarget, getWindowId, subscribeTabTargetChanges, type TabTarget } from "@/app/tab";
import * as session from "@/app/session";


const panelLogger = logging.get("sidepanel");
const [, injectBackgroundApi] = defineProxy(() => ({}) as BackgroundApi, {
  namespace: BACKGROUND_RPC_NAMESPACE,
  heartbeatCheck: false,
  transfer: false,
});

const backgroundApi = injectBackgroundApi(
  createBackgroundClientAdapter("sidepanel", { href: globalThis.location?.href }),
);

/** Panel commands own the visible target separately from mode and observation policy. */
type AnalysisCommandInputType = Omit<AnalyzeVisibleTabInput, "target">;

/** Write one structured side-panel lifecycle record. */
function logPanelEvent(event: string, details?: Record<string, unknown>): void {
  panelLogger.debug("[kaiju-deepscope][sidepanel] {event}", {
    event,
    ...(details ?? {}),
  });
}

/** Convert thrown messaging values into user-safe panel text. */
function normalizeError(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Unexpected messaging failure";
}

/**
 * Translate an analysis response into the matcher lane without relying on count alone.
 *
 * Cache hits and stored snapshots are already completed work, while cache misses
 * without a replay trace represent queued matcher work that will publish storage
 * revisions later. Auto-applied storage revisions keep the status chosen from the
 * snapshot itself so final replay-backed snapshots can clear the busy state.
 */
function getMatcherStatus(
  revision: VisibleRevision,
  source: "initial" | "manual" | "auto",
  currentStatus: MatcherStatus,
): MatcherStatus {
  if (isVisibleRevisionPending(revision)) {
    return "matching";
  }

  if (revision.replayTrace || revision.snapshot.status === "hit") {
    return "idle";
  }

  if (source === "auto") {
    return currentStatus;
  }

  return revision.analysis.results.length > 0 ? "matching" : "recording";
}

/** Compare the exact tab, frame, origin, and document identity rendered by the panel. */
function sameTab(left: VisibleTabIdentity | null, right: VisibleTabIdentity): boolean {
  return Boolean(
    left &&
      left.windowId === right.windowId &&
      left.tabId === right.tabId &&
      left.frameId === right.frameId &&
      left.originHash === right.originHash &&
      left.urlHash === right.urlHash,
  );
}


/** User-visible side-panel work that can own buttons, progress, or tab transition state. */
type WorkflowStateType =
  | { readonly kind: "idle" }
  | { readonly kind: "loading-stored-snapshot"; readonly identity: VisibleTabIdentity }
  | { readonly kind: "queued-initial-analysis"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "streaming-revisions"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "refreshing-observed-session"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "switching-tab"; readonly identity: VisibleTabIdentity }
  | { readonly kind: "stopped"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "failed"; readonly identity: VisibleTabIdentity | null; readonly message: string };

/** Why the panel needs to resolve the browser's visible tab again. */
type TabSyncReasonType = "initial" | "tab-change";

/** Panel actions are busy only while user-visible commands own the current tab target. */
function isWorkflowBusy(state: WorkflowStateType): boolean {
  return (
    state.kind === "loading-stored-snapshot" ||
    state.kind === "queued-initial-analysis" ||
    state.kind === "refreshing-observed-session" ||
    state.kind === "switching-tab"
  );
}

/** True when a background response still belongs to the tab the side panel is rendering. */
function canApplyResponse(
  response: AnalyzeVisibleTabOutput,
  requestedIdentity: VisibleTabIdentity | null,
  visibleIdentity: VisibleTabIdentity | null,
): boolean {
  if (!requestedIdentity) {
    return true;
  }

  return response.analysis.url === requestedIdentity.url && sameTab(visibleIdentity, requestedIdentity);
}

/** Whether a background command only registered queued matcher work. */
function isQueuedResponse(response: AnalyzeVisibleTabOutput): boolean {
  return (
    response.enrichment?.status === "pending" &&
    response.analysis.results.length === 0 &&
    !response.replayTrace &&
    response.snapshot.status !== "hit"
  );
}

/** Whether a queued placeholder should preserve the richer analysis already visible. */
function shouldKeepAnalysis(
  response: AnalyzeVisibleTabOutput,
  identity: VisibleTabIdentity,
  currentAnalysis: SiteAnalysis | null,
): boolean {
  return Boolean(
    currentAnalysis &&
      currentAnalysis.url === identity.url &&
      isQueuedResponse(response),
  );
}

/** Convert evidence progress into the compact Summary label. */
function formatCompleteness(state: DetectionEvidenceState | null): string {
  if (!state) return "unknown";

  if (state.level === "full") return "complete";
  if (state.level === "enriched") return state.complete ? "enriched" : "enriching";
  if (state.level === "incremental") return "incremental";
  if (state.level === "initial") return state.complete ? "initial complete" : "initial";
  if (state.level === "recovered-initial") return "recovered initial";
  return "unknown";
}

/** Own detector state and mount browser targeting that must survive routed page changes. */
export function PanelProvider(props: { readonly children: JSX.Element }) {
  const [status, setStatus] = createStore<AnalysisStatus>({
    totalAnalyses: 0,
    trackedOrigins: 0,
  });
  /**
   * User-visible commands and tab switches share one workflow state so buttons,
   * busy affordances, and stale-response guards read the same target ownership.
   */
  const [workflow, setWorkflow] = createSignal<WorkflowStateType>({ kind: "idle" });
  const [liveUpdateMode, setLiveUpdateMode] = createSignal<ObservationMode>("unknown");
  const [notice, setNotice] = createSignal<Notice | null>(null);
  const [errorMessage, setErrorMessage] = createSignal("");
  const [analysis, setAnalysis] = createSignal<SiteAnalysis | null>(null);
  const [lateAddedIds, setLateAddedIds] = createSignal<string[]>([]);
  const [explanationsByTechnologyId, setExplanationsByTechnologyId] =
    createSignal<ExplanationLookup>({});
  const [matcherStatus, setMatcherStatus] = createSignal<MatcherStatus>("idle");
  const [replayHistory, setReplayHistory] = createSignal<readonly DetectionReplayTrace[]>([]);
  const [latestReplaySummary, setLatestReplaySummary] = createSignal<DetectionReplaySummary | null>(null);
  const [evidenceState, setEvidenceState] = createSignal<DetectionEvidenceState | null>(null);
  const [sessionTarget, setSessionTarget] = createSignal<ObservationSessionTarget | null>(null);
  const [visibleTabIdentity, setVisibleTabIdentity] = createSignal<VisibleTabIdentity | null>(null);
  const [analysisRequestTarget, setAnalysisRequestTarget] = createSignal<VisibleTabIdentity | null>(null);
  const [queuedAnalysisIdentity, setQueuedAnalysisIdentity] = createSignal<VisibleTabIdentity | null>(null);
  const [queuedManualRefreshIdentity, setQueuedManualRefreshIdentity] = createSignal<VisibleTabIdentity | null>(null);
  const [visibleTabIdentitySyncInFlight, setVisibleTabIdentitySyncInFlight] = createSignal(false);
  const [clearStoredDataInFlight, setClearStoredDataInFlight] = createSignal(false);
  const [autoScanEnabled, setAutoScanEnabled] = createSignal(DEFAULT_AUTO_SCAN_ENABLED);
  const [autoScanSettingInFlight, setAutoScanSettingInFlight] = createSignal(false);
  const [pendingVisibleTabIdentitySync, setPendingVisibleTabIdentitySync] =
    createSignal<TabSyncReasonType | null>(null);
  const [visibleDetectorSnapshotRevision, setVisibleDetectorSnapshotRevision] = createSignal<DetectionSessionSnapshot | null>(null);
  /** Latest content-owned lifecycle revision. It is not reactive because no UI renders the revision itself. */
  let visibleLifecycleSnapshotRevision: DetectionSessionSnapshot | null = null;
  let unsubscribeSnapshotRevisions: (() => void) | undefined;
  let subscribedSnapshotSessionKey: DetectionSessionKey | null = null;
  let panelWindowId: number | null = null;
  let disposed = false;

  const analysisRequestInFlight = createMemo(() => analysisRequestTarget() !== null);
  const visibleAnalysisRequestInFlight = createMemo(() => {
    const target = analysisRequestTarget();
    const visible = visibleTabIdentity();
    return Boolean(target && visible && sameTab(visible, target));
  });
  const queuedVisibleAnalysis = createMemo(() => {
    const visible = visibleTabIdentity();
    const queued = queuedManualRefreshIdentity() ?? queuedAnalysisIdentity();
    return Boolean(visible && queued && sameTab(visible, queued));
  });
  const workflowBusy = createMemo(() => isWorkflowBusy(workflow()));
  const busy = createMemo(() => isWorkflowBusy(workflow()) || analysisRequestInFlight());
  const matcherProgress = createMemo(() => visibleDetectorSnapshotRevision()?.matcherProgress);
  const analysisActivity = createMemo(() => getAnalysisActivity({
    matcherStatus: matcherStatus(),
    workflowBusy: workflowBusy(),
    analysisRequestInFlight: visibleAnalysisRequestInFlight(),
    queuedVisibleAnalysis: queuedVisibleAnalysis(),
    matcherProgress: matcherProgress(),
  }));
  const resultCount = createMemo(() => analysis()?.results.length ?? 0);
  const groupedResults = createMemo(() => groupDetectionsByPrimaryCategory(analysis()?.results ?? []));
  const hasLateDetections = createMemo(() => lateAddedIds().length > 0);
  const liveUpdateChipLabel = createMemo(() => getObservationLabel(liveUpdateMode()));
  const evidenceCompletenessLabel = createMemo(() => formatCompleteness(evidenceState()));

  /** Recover replay details only when the visible revision lacks them. */
  async function hydrateReplay(revision: VisibleRevision, identity: VisibleTabIdentity) {
    if (!shouldApplyReplayState(revision)) {
      return;
    }

    if (revision.replayHistory) {
      return;
    }

    try {
      const historyResponse = await backgroundApi.getReplayTraceHistory({ url: revision.analysis.url });
      if (disposed || !sameTab(visibleTabIdentity(), identity)) return;
      if (historyResponse.ok) {
        const current = analysis();
        if (current?.url === revision.analysis.url) {
          setReplayHistory(getReplayHistoryForVisibleAnalysis(historyResponse.value, current));
        }
      }
    } catch (error) {
      logPanelEvent("replay-history-hydration-failed", {
        message: normalizeError(error),
      });
    }
  }


  /** Start the newest queued analysis after the current request releases ownership. */
  async function drainAnalysis(): Promise<void> {
    if (disposed || analysisRequestInFlight()) {
      return;
    }

    const visibleIdentity = visibleTabIdentity();
    const manualIdentity = queuedManualRefreshIdentity();
    if (manualIdentity && (!visibleIdentity || !sameTab(visibleIdentity, manualIdentity))) {
      setQueuedManualRefreshIdentity(null);
    } else if (manualIdentity) {
      setQueuedManualRefreshIdentity(null);
      await loadAnalysisForTab(manualIdentity, {
        input: { mode: "refresh", observe: "while-panel-open" },
        resetLateMarkers: true,
        source: "manual",
      });
      return;
    }

    const queuedIdentity = queuedAnalysisIdentity();
    if (queuedIdentity && (!visibleIdentity || !sameTab(visibleIdentity, queuedIdentity))) {
      setQueuedAnalysisIdentity(null);
    } else if (queuedIdentity) {
      setQueuedAnalysisIdentity(null);
      await loadAnalysisForTab(queuedIdentity, {
        input: { mode: "snapshot-first", observe: "while-panel-open" },
        resetLateMarkers: !analysis(),
        source: "initial",
      });
    }
  }

  /** Preserve one manual refresh request while another analysis owns the tab. */
  function queueManualRefresh(identity: VisibleTabIdentity): void {
    setQueuedManualRefreshIdentity(identity);
    setNotice({
      variant: "warning",
      text: "Refresh will run after the current analysis finishes.",
    });
  }

  /** Get the current content observation state for the visible session target. */
  async function getObservationState() {
    const target = sessionTarget();
    return target ? backgroundApi.getObservationSessionState(target) : null;
  }

  /** Stop one panel-owned observation without letting stale completion mutate the visible tab. */
  async function releaseObservationTarget(
    target: ObservationSessionTarget | null | undefined,
    reason: "tab-change" | "stale-response" | "panel-close" | "unavailable-tab",
  ): Promise<void> {
    if (!target) return;

    logPanelEvent("observation-release-requested", {
      reason,
      sessionId: target.sessionId,
      tabId: target.tabId,
    });
    try {
      const response = await backgroundApi.stopObservationSession(target);
      logPanelEvent(response.ok ? "observation-release-complete" : "observation-release-failed", {
        reason,
        sessionId: target.sessionId,
        tabId: target.tabId,
        ...(response.ok
          ? { status: response.value.status, stopReason: response.value.stopReason }
          : { code: response.error.code, message: response.error.message }),
      });
    } catch (error) {
      logPanelEvent("observation-release-threw", {
        reason,
        sessionId: target.sessionId,
        tabId: target.tabId,
        message: normalizeError(error),
      });
    }
  }

  /** Project persisted matcher progress into the compact panel status. */
  function updateMatcherStatus(snapshot: DetectionSessionSnapshot): void {
    const status = getMatcherStatusFromSnapshot(snapshot);
    if (status) setMatcherStatus(status);
  }

  /** Compare a snapshot key with the exact visible document session. */
  function sameSession(
    left: DetectionSessionKey | null,
    right: DetectionSessionKey | null,
  ): boolean {
    return Boolean(
      left &&
        right &&
        left.tabId === right.tabId &&
        left.frameId === right.frameId &&
        left.documentId === right.documentId &&
        left.originHash === right.originHash,
    );
  }

  /**
   * Keep the live storage listener on the origin until the first detector snapshot
   * reveals the exact document session, then narrow it to that detector/lifecycle pair.
   */
  function subscribeSnapshots(
    identity: VisibleTabIdentity,
    exactSessionKey: DetectionSessionKey | null,
  ): void {
    if (
      unsubscribeSnapshotRevisions &&
      ((exactSessionKey === null && subscribedSnapshotSessionKey === null) ||
        sameSession(subscribedSnapshotSessionKey, exactSessionKey))
    ) {
      return;
    }

    unsubscribeSnapshotRevisions?.();
    subscribedSnapshotSessionKey = exactSessionKey ? { ...exactSessionKey } : null;
    unsubscribeSnapshotRevisions = subscribeToSnapshotRevisions(
      identity,
      exactSessionKey,
      (snapshot) => applySnapshot(identity, snapshot),
    );
  }

  /** Apply one accepted storage revision without replacing state from another tab. */
  function applySnapshot(identity: VisibleTabIdentity, snapshot: DetectionSessionSnapshot) {
    if (disposed || !sameTab(visibleTabIdentity(), identity)) {
      logPanelEvent("snapshot-revision-ignored-for-stale-tab", {
        tabId: identity.tabId,
        revision: snapshot.revision,
      });
      return;
    }

    const currentSnapshot = snapshot.source === "content"
      ? visibleLifecycleSnapshotRevision
      : visibleDetectorSnapshotRevision();
    if (!isNewerSnapshotRevision(currentSnapshot, snapshot)) {
      logPanelEvent("snapshot-revision-ignored", { revision: snapshot.revision, updatedAt: snapshot.updatedAt });
      return;
    }

    if (snapshot.source !== "content") {
      subscribeSnapshots(identity, snapshot.key);
    }

    if (!shouldApplySnapshotRevision({ currentAnalysis: analysis(), snapshot })) {
      if (snapshot.source === "content") {
        visibleLifecycleSnapshotRevision = snapshot;
      } else {
        setVisibleDetectorSnapshotRevision(snapshot);
      }
      updateMatcherStatus(snapshot);
      const nextMode = getObservationModeFromSnapshot(snapshot);
      setLiveUpdateMode(nextMode);
      if (snapshot.replaySummary) {
        setLatestReplaySummary(snapshot.replaySummary);
      }
      void refreshStatus();
      if (nextMode === "stopped") {
        setSessionTarget(null);
        setNotice({
          variant: "warning",
          text: "Observation stopped. Existing detections stay visible until refresh starts a new session.",
        });
      }
      logPanelEvent("snapshot-lifecycle-applied", {
        revision: snapshot.revision,
        resultCount: snapshot.analysis.results.length,
        status: snapshot.status,
        source: snapshot.source,
        reason: snapshot.enrichment.reason ?? "content-lifecycle-without-detector-output",
      });
      return;
    }

    if (snapshot.source === "content") {
      visibleLifecycleSnapshotRevision = snapshot;
    } else {
      setVisibleDetectorSnapshotRevision(snapshot);
    }
    if (snapshot.replaySummary) {
      setLatestReplaySummary(snapshot.replaySummary);
    }
    updateMatcherStatus(snapshot);
    logPanelEvent("snapshot-revision-applied", {
      revision: snapshot.revision,
      resultCount: snapshot.analysis.results.length,
      status: snapshot.status,
    });
    applyRevision(createStoredVisibleRevision({
      source: "origin-snapshot",
      analysis: snapshot.analysis,
      snapshot,
    }), { source: "auto", identity });
    void refreshStatus();
  }

  /** Recover the best retained analysis before requesting fresh page work. */
  async function showStoredAnalysis(identity: VisibleTabIdentity) {
    setWorkflow({ kind: "loading-stored-snapshot", identity });
    try {
      const stored = await getStoredAnalysis(identity, browserDetectionPersistence);
      if (disposed || !sameTab(visibleTabIdentity(), identity)) return false;
      if (!stored) {
        const current = analysis();
        const preservingCurrentTabAnalysis = current?.url === identity.url;
        logPanelEvent("stored-analysis-miss", {
          hostname: identity.hostname,
          preservingCurrentTabAnalysis,
          previousResultCount: current?.results.length ?? 0,
        });
        if (!preservingCurrentTabAnalysis) {
          setAnalysis(null);
          setLateAddedIds([]);
          setExplanationsByTechnologyId({});
          setReplayHistory([]);
          setLatestReplaySummary(null);
          setEvidenceState(null);
        }
        return false;
      }

      logPanelEvent("stored-analysis-rendered", {
        hostname: stored.analysis.hostname,
        source: stored.source,
        resultCount: stored.analysis.results.length,
        revision: stored.snapshot?.revision ?? 0,
      });
      setVisibleDetectorSnapshotRevision(stored.snapshot ?? null);
      visibleLifecycleSnapshotRevision = stored.lifecycleSnapshot ?? null;
      if (stored.snapshot) {
        subscribeSnapshots(identity, stored.snapshot.key);
        updateMatcherStatus(stored.snapshot);
      } else {
        setMatcherStatus("idle");
      }
      applyRevision(stored.revision, {
        source: "initial",
        resetLateMarkers: true,
        identity,
      });
      return true;
    } catch (error) {
      if (disposed || !sameTab(visibleTabIdentity(), identity)) return false;
      logPanelEvent("stored-analysis-render-failed", { message: normalizeError(error) });
      return false;
    } finally {
      if (!disposed && sameTab(visibleTabIdentity(), identity)) setWorkflow({ kind: "idle" });
    }
  }

  /** Read durable replay history through the background API instead of concrete UI storage access. */
  async function getReplayHistory(url: string): Promise<readonly DetectionReplayTrace[]> {
    const response = await backgroundApi.getReplayTraceHistory({ url });
    if (!response.ok) {
      throw new Error(formatError(response.error));
    }

    return response.value;
  }

  /** Refresh durable analysis counters shown by the panel chrome. */
  async function refreshStatus() {
    try {
      const response = await backgroundApi.getAnalysisStatus();
      if (disposed) return;
      if (response.ok) {
        setStatus(response.value);
      }
    } catch (error) {
      if (!disposed) setErrorMessage(normalizeError(error));
    }
  }


  /** Persist the automatic-inspection setting and update local UI state. */
  async function setAutoScan(enabled: boolean): Promise<void> {
    if (autoScanSettingInFlight()) {
      return;
    }

    setAutoScanSettingInFlight(true);
    try {
      await persistAutoScanEnabled(enabled);
      setAutoScanEnabled(enabled);
      setNotice({
        variant: "success",
        text: enabled
          ? "Automatic scanning is on. New active pages will scan as soon as they finish loading."
          : "Automatic scanning is off. You can still scan manually from this panel.",
      });
    } catch (error) {
      setErrorMessage(normalizeError(error));
    } finally {
      setAutoScanSettingInFlight(false);
    }
  }

  /** Clear retained detector data while preserving unrelated extension settings. */
  async function clearStoredData() {
    setClearStoredDataInFlight(true);
    setErrorMessage("");
    setNotice(null);
    try {
      const removedCount = await browserDetectionPersistence.clearStoredData();
      setAnalysis(null);
      setVisibleDetectorSnapshotRevision(null);
      visibleLifecycleSnapshotRevision = null;
      setReplayHistory([]);
      setLatestReplaySummary(null);
      setEvidenceState(null);
      setExplanationsByTechnologyId({});
      setLateAddedIds([]);
      await refreshStatus();
      setNotice({
        variant: "success",
        text: removedCount === 0
          ? "No stored detector data was found."
          : `Cleared ${removedCount} stored detector record${removedCount === 1 ? "" : "s"}.`,
      });
    } catch (error) {
      setErrorMessage(normalizeError(error));
    } finally {
      setClearStoredDataInFlight(false);
    }
  }

  /** Normalize one direct background response into the revision application path. */
  function applyResponse(
    response: AnalyzeVisibleTabOutput,
    options: {
      source: "initial" | "manual" | "auto";
      resetLateMarkers?: boolean;
      identity: VisibleTabIdentity;
    },
  ) {
    applyRevision(createVisibleRevisionFromAnalysisResponse(response), options);
  }

  /** Apply one visible revision and keep replay, evidence, and matcher state coherent. */
  function applyRevision(
    revision: VisibleRevision,
    options: {
      source: "initial" | "manual" | "auto";
      resetLateMarkers?: boolean;
      identity: VisibleTabIdentity;
    },
  ) {
    if (!sameTab(visibleTabIdentity(), options.identity)) {
      logPanelEvent("analysis-revision-ignored-for-stale-tab", {
        tabId: options.identity.tabId,
        hostname: revision.analysis.hostname,
        source: options.source,
      });
      return;
    }

    const previousAnalysis = analysis();
    const preserveReplayState = shouldPreserveReplayState({ previousAnalysis, revision });
    const update = buildAnalysisUpdate({
      previousAnalysis,
      revision,
      source: options.source,
      currentLateDetectionIds: lateAddedIds(),
      resetLateMarkers: options.resetLateMarkers,
    });

    setAnalysis(update.analysis);
    setLateAddedIds(update.lateDetectionIds);
    setExplanationsByTechnologyId(
      preserveReplayState ? explanationsByTechnologyId() : update.explanationsByTechnologyId,
    );
    setMatcherStatus(getMatcherStatus(revision, options.source, matcherStatus()));
    const applyReplay = shouldApplyReplayState(revision);
    const nextReplayHistory = applyReplay
      ? getReplayHistoryForVisibleAnalysis(
        revision.replayHistory ?? (preserveReplayState ? replayHistory() : []),
        update.analysis,
      )
      : [];
    const preservedReplaySummary = preserveReplayState && latestReplaySummary()
      ? latestReplaySummary()
      : null;
    setReplayHistory(nextReplayHistory);
    setLatestReplaySummary(
      !applyReplay
        ? null
        : revision.replayTrace
        ? createReplaySummaryFromTrace(revision.replayTrace)
        : revision.replaySummary ?? preservedReplaySummary,
    );
    setEvidenceState(revision.evidence ?? null);
    setSessionTarget(revision.sessionTarget ?? sessionTarget());
    logPanelEvent("analysis-applied", {
      source: options.source,
      analysisSource: update.analysis.source,
      snapshotStatus: revision.snapshot.status,
      resultCount: update.analysis.results.length,
      explanationCount: Object.keys(update.explanationsByTechnologyId).length,
      hostname: update.analysis.hostname,
      sessionStatus: revision.session?.status ?? "none",
    });

    setLiveUpdateMode(update.observationMode);
    if (update.shouldKeepLiveUpdatesActive) {
      logPanelEvent("snapshot-stream-awaiting-revisions", {
        observationMode: update.observationMode,
      });
    }

    if (update.addedDetectionIds.length) {
      logPanelEvent("late-detections-found", {
        hostname: update.analysis.hostname,
        addedCount: update.addedDetectionIds.length,
      });
    }

    if (update.notice) {
      setNotice(update.notice);
    }

    void hydrateReplay(revision, options.identity);
  }

  /** Reconcile content observation state after analysis or a tab change. */
  async function syncObservation(identity: VisibleTabIdentity | null = visibleTabIdentity()) {
    try {
      const response = await getObservationState();
      if (disposed || (identity && !sameTab(visibleTabIdentity(), identity))) return;
      if (!response) {
        setLiveUpdateMode("unknown");
        return;
      }

      if (!response.ok) {
        logPanelEvent("observation-sync-unavailable", {
          code: response.error.code,
          message: response.error.message,
        });
        setLiveUpdateMode("unknown");
        return;
      }

      logPanelEvent("observation-sync", {
        status: response.value.status,
        stopReason: response.value.stopReason,
      });

      const nextLiveUpdateMode = getObservationModeFromSession(response.value);
      setLiveUpdateMode(nextLiveUpdateMode);
    } catch (error) {
      if (disposed || (identity && !sameTab(visibleTabIdentity(), identity))) return;
      setLiveUpdateMode("unknown");
      setErrorMessage(normalizeError(error));
    }
  }

  /** Analyze the currently visible identity through the guarded tab-specific path. */
  async function loadAnalysis(options: {
    input: AnalysisCommandInputType;
    resetLateMarkers?: boolean;
    source: "initial" | "manual" | "auto";
  }) {
    const identity = visibleTabIdentity();
    if (!identity) {
      setErrorMessage("No inspectable visible tab is available for analysis.");
      return;
    }

    await loadAnalysisForTab(identity, options);
  }

  /** Own one analysis request for an exact visible tab identity. */
  async function loadAnalysisForTab(identity: VisibleTabIdentity, options: {
    input: AnalysisCommandInputType;
    resetLateMarkers?: boolean;
    source: "initial" | "manual" | "auto";
  }) {
    if (analysisRequestInFlight()) {
      if (options.source === "manual") {
        queueManualRefresh(identity);
      } else {
        setQueuedAnalysisIdentity(identity);
      }
      return;
    }

    // A refresh can create a new observation/session id. Listen at the origin
    // until that new exact key is known so the first matcher revision cannot race
    // past a listener that is still pinned to the previous document session.
    if (options.input.mode === "refresh" || !visibleDetectorSnapshotRevision()) {
      subscribeSnapshots(identity, null);
    }

    setAnalysisRequestTarget(identity);
    const isUserVisibleRefresh = options.source !== "auto" && !(options.source === "initial" && analysis());
    if (isUserVisibleRefresh) {
      setWorkflow({ kind: options.source === "manual" ? "refreshing-observed-session" : "queued-initial-analysis", identity });
    }
    if (options.resetLateMarkers) {
      setLateAddedIds([]);
    }
    if (options.source !== "auto") {
      setNotice(null);
      setErrorMessage("");
    }

    try {
      setMatcherStatus("collecting");
      logPanelEvent("analysis-requested", {
        source: options.source,
        mode: options.input.mode,
        observe: options.input.observe,
        tabId: identity.tabId,
        pipeline: "event",
      });

      const response = await backgroundApi.analyzeVisibleTab({
        ...options.input,
        target: identity,
      });
      if (disposed) {
        if (response.ok) void releaseObservationTarget(response.value.sessionTarget, "panel-close");
        return;
      }

      if (!response.ok) {
        logPanelEvent("analysis-failed", {
          source: options.source,
          code: response.error.code,
          message: response.error.message,
        });
        if (isUserVisibleRefresh && sameTab(visibleTabIdentity(), identity)) {
          setErrorMessage(formatError(response.error));
        }
        setMatcherStatus("idle");
        return;
      }

      if (pendingVisibleTabIdentitySync() === "tab-change") {
        logPanelEvent("analysis-response-ignored-for-pending-tab-sync", {
          source: options.source,
          responseUrl: response.value.analysis.url,
          expectedUrl: identity.url,
        });
        void releaseObservationTarget(response.value.sessionTarget, "stale-response");
        return;
      }

      if (!canApplyResponse(response.value, identity, visibleTabIdentity())) {
        logPanelEvent("analysis-response-ignored-for-stale-tab", {
          source: options.source,
          responseUrl: response.value.analysis.url,
          expectedUrl: identity.url,
        });
        void releaseObservationTarget(response.value.sessionTarget, "stale-response");
        return;
      }

      if (response.value.sessionTarget && !response.value.sessionTarget.incognito) {
        subscribeSnapshots(identity, {
          tabId: response.value.sessionTarget.tabId,
          frameId: identity.frameId,
          documentId: response.value.sessionTarget.sessionId,
          originHash: identity.originHash,
        });
      }

      if (shouldKeepAnalysis(response.value, identity, analysis())) {
        setMatcherStatus("matching");
        setSessionTarget(response.value.sessionTarget ?? sessionTarget());
        setLiveUpdateMode(
          response.value.session
            ? getObservationModeFromSession(response.value.session)
            : liveUpdateMode(),
        );
        logPanelEvent("queued-placeholder-preserved-visible-analysis", {
          source: options.source,
          visibleResultCount: analysis()?.results.length ?? 0,
          responseResultCount: response.value.analysis.results.length,
          snapshotStatus: response.value.snapshot.status,
          enrichmentStatus: response.value.enrichment?.status ?? "none",
        });
        await refreshStatus();
        return;
      }

      applyResponse(response.value, { ...options, identity });
      await refreshStatus();
    } catch (error) {
      if (disposed) return;
      logPanelEvent("analysis-request-threw", {
        source: options.source,
        message: normalizeError(error),
      });
      if (isUserVisibleRefresh && sameTab(visibleTabIdentity(), identity)) {
        setErrorMessage(normalizeError(error));
      }
      setMatcherStatus("idle");
    } finally {
      if (!disposed) {
        if (sameTab(analysisRequestTarget(), identity)) {
          setAnalysisRequestTarget(null);
        }
        if (isUserVisibleRefresh && sameTab(visibleTabIdentity(), identity)) {
          setWorkflow({ kind: "idle" });
        }
        await drainAnalysis();
      }
    }
  }

  /** Stop the live observation session attached to the visible tab. */
  async function stopObservation() {
    setWorkflow({ kind: "refreshing-observed-session", identity: visibleTabIdentity() });
    setErrorMessage("");
    setNotice(null);
    try {
      const target = sessionTarget();
      if (!target) {
        setNotice({
          variant: "warning",
          text: "No active observation session is attached to this side panel. Refresh starts a new session for the visible tab.",
        });
        setLiveUpdateMode("unknown");
        return;
      }

      logPanelEvent("observation-stop-requested", { sessionId: target.sessionId, tabId: target.tabId });
      const response = await backgroundApi.stopObservationSession(target);
      if (!response.ok) {
        logPanelEvent("observation-stop-failed", {
          code: response.error.code,
          message: response.error.message,
        });
        setErrorMessage(formatError(response.error));
        return;
      }

      logPanelEvent("observation-stopped", {
        status: response.value.status,
        stopReason: response.value.stopReason,
      });

      setSessionTarget(null);
      setLiveUpdateMode("stopped");
      setNotice({
        variant: "warning",
        text: "Observation stopped. Existing detections stay visible, but late-loaded page signals will not be captured until refresh starts a new session.",
      });
    } catch (error) {
      setErrorMessage(normalizeError(error));
    } finally {
      setWorkflow({ kind: "idle" });
    }
  }

  /** Start a fresh observation-backed analysis for the visible tab. */
  async function refreshObservation() {
    if (analysisRequestInFlight()) {
      const identity = visibleTabIdentity();
      if (identity) queueManualRefresh(identity);
      return;
    }

    await loadAnalysis({
      input: {
        mode: "refresh",
        observe: "while-panel-open",
      },
      resetLateMarkers: true,
      source: "manual",
    });
  }

  /** Reset document-owned analysis state before showing another browser tab. */
  function resetTab(identity: VisibleTabIdentity): void {
    const previousSessionTarget = sessionTarget();
    if (previousSessionTarget) void releaseObservationTarget(previousSessionTarget, "tab-change");
    unsubscribeSnapshotRevisions?.();
    unsubscribeSnapshotRevisions = undefined;
    subscribedSnapshotSessionKey = null;
    subscribeSnapshots(identity, null);
    logPanelEvent("visible-state-reset", {
      previousUrl: analysis()?.url,
      previousResultCount: analysis()?.results.length ?? 0,
      nextUrl: identity.url,
      sameVisibleIdentity: sameTab(visibleTabIdentity(), identity),
    });
    setVisibleDetectorSnapshotRevision(null);
    visibleLifecycleSnapshotRevision = null;
    setVisibleTabIdentity(identity);
    setAnalysis(null);
    setLateAddedIds([]);
    setExplanationsByTechnologyId({});
    setReplayHistory([]);
    setLatestReplaySummary(null);
    setEvidenceState(null);
    setNotice(null);
    setErrorMessage("");
    setSessionTarget(null);
    setLiveUpdateMode("unknown");
    setMatcherStatus("idle");
    setWorkflow({ kind: "switching-tab", identity });
  }

  /** Recover stored state, analyze, and reconcile observation for one exact visible tab identity. */
  async function activateTab(identity: VisibleTabIdentity, reason: "initial" | "tab-change"): Promise<void> {
    if (sameTab(visibleTabIdentity(), identity)) return;

    logPanelEvent("visible-tab-identity-applied", {
      reason,
      tabId: identity.tabId,
      hostname: identity.hostname,
    });
    resetTab(identity);
    await showStoredAnalysis(identity);
    if (disposed || !sameTab(visibleTabIdentity(), identity)) return;

    // Tab activation is already owned by the background automatic-scan controller.
    // When automatic scanning is disabled, switching tabs only restores retained
    // state. Opening the panel and pressing Refresh remain the explicit scan actions.
    if (reason === "tab-change") {
      setWorkflow({ kind: "idle" });
      return;
    }

    await loadAnalysisForTab(identity, {
      input: {
        mode: "snapshot-first",
        observe: "while-panel-open",
      },
      resetLateMarkers: !analysis(),
      source: "initial",
    });
    if (disposed || !sameTab(visibleTabIdentity(), identity)) return;
    await syncObservation(identity);
  }

  /** Coalesce tab identity changes while another identity lookup is in flight. */
  function queueTabSync(reason: TabSyncReasonType): void {
    setPendingVisibleTabIdentitySync((current) => {
      if (current === "tab-change" || reason === "tab-change") {
        return "tab-change";
      }

      return current ?? reason;
    });
  }

  /** Clear tab-owned state when Chrome cannot provide an inspectable active page. */
  function resetUnavailableTab(message: string): void {
    const previousSessionTarget = sessionTarget();
    if (previousSessionTarget) void releaseObservationTarget(previousSessionTarget, "unavailable-tab");
    unsubscribeSnapshotRevisions?.();
    unsubscribeSnapshotRevisions = undefined;
    subscribedSnapshotSessionKey = null;
    setVisibleDetectorSnapshotRevision(null);
    visibleLifecycleSnapshotRevision = null;
    setVisibleTabIdentity(null);
    setSessionTarget(null);
    setQueuedAnalysisIdentity(null);
    setQueuedManualRefreshIdentity(null);
    setAnalysis(null);
    setLateAddedIds([]);
    setExplanationsByTechnologyId({});
    setReplayHistory([]);
    setLatestReplaySummary(null);
    setEvidenceState(null);
    setLiveUpdateMode("unknown");
    setMatcherStatus("idle");
    setNotice(null);
    setErrorMessage(message);
    setWorkflow({ kind: "failed", identity: null, message });
  }

  /**
   * Resolve the current browser identity without holding the lookup lock across page analysis.
   *
   * Tab activation is intentionally outside the identity-resolution lock. A second Chrome
   * activation can therefore retarget the mounted Solid application immediately while older
   * storage, analysis, or observation promises finish in the background. Every async apply
   * path checks the exact visible identity before it mutates page-owned UI state.
   */
  async function syncTab(
    reason: TabSyncReasonType,
    requestedTarget?: TabTarget,
  ): Promise<void> {
    if (disposed) return;

    if (visibleTabIdentitySyncInFlight()) {
      queueTabSync(reason);
      return;
    }

    if (panelWindowId === null) {
      queueTabSync(reason);
      return;
    }

    if (requestedTarget && requestedTarget.windowId !== panelWindowId) return;

    let identity: VisibleTabIdentity | null = null;
    let skipActivation = false;
    setVisibleTabIdentitySyncInFlight(true);
    try {
      const target = requestedTarget ?? await getTabTarget(panelWindowId);
      if (disposed) return;
      if (!target) {
        const message = "No active browser tab is available in this window.";
        logPanelEvent("visible-tab-target-unavailable", { reason, windowId: panelWindowId });
        if (!pendingVisibleTabIdentitySync()) resetUnavailableTab(message);
        return;
      }

      const identityResponse = await backgroundApi.getVisibleTabIdentity({ tabId: target.tabId, windowId: target.windowId });
      if (disposed) return;
      if (!identityResponse.ok) {
        const message = formatError(identityResponse.error);
        logPanelEvent("visible-tab-identity-unavailable", {
          reason,
          windowId: target.windowId,
          tabId: target.tabId,
          code: identityResponse.error.code,
          message: identityResponse.error.message,
        });
        if (identityResponse.error.code === "NO_ACTIVE_TAB" && requestedTarget) {
          // Chrome can deliver an activation for tab A after tab B already became
          // active. Re-resolve the window instead of blanking the panel for A.
          queueTabSync("tab-change");
          logPanelEvent("visible-tab-identity-retry-after-stale-target", {
            windowId: target.windowId,
            tabId: target.tabId,
          });
          return;
        }
        if (!pendingVisibleTabIdentitySync()) resetUnavailableTab(message);
        return;
      }

      identity = identityResponse.value;
      if (sameTab(visibleTabIdentity(), identity)) {
        setErrorMessage("");
        if (workflow().kind === "failed") setWorkflow({ kind: "idle" });
        skipActivation = true;
      }
    } catch (error) {
      if (disposed) return;
      const message = normalizeError(error);
      logPanelEvent("visible-tab-sync-failed", { reason, windowId: panelWindowId, message });
      if (!pendingVisibleTabIdentitySync()) resetUnavailableTab(message);
      return;
    } finally {
      setVisibleTabIdentitySyncInFlight(false);
      const pendingReason = pendingVisibleTabIdentitySync();
      if (!disposed && pendingReason) {
        setPendingVisibleTabIdentitySync(null);
        skipActivation = true;
        void syncTab(pendingReason);
      }
    }

    if (disposed || skipActivation || !identity) return;

    if (reason === "tab-change" && analysisRequestInFlight()) {
      logPanelEvent("visible-tab-identity-rendered-during-refresh", {
        windowId: identity.windowId,
        tabId: identity.tabId,
        hostname: identity.hostname,
      });
      resetTab(identity);
      await showStoredAnalysis(identity);
      if (disposed || !sameTab(visibleTabIdentity(), identity)) return;
      setWorkflow({ kind: "idle" });
      return;
    }

    await activateTab(identity, reason);
  }

  onMount(() => {
    const unsubscribeTabTargets = subscribeTabTargetChanges({
      getWindowId: () => panelWindowId,
      getVisibleTabId: () => visibleTabIdentity()?.tabId ?? null,
      sync: (target) => { void syncTab("tab-change", target); },
      closed: session.remove,
    });

    void (async () => {
      logPanelEvent("mount");
      try {
        panelWindowId = await getWindowId();
        if (disposed) return;
        logPanelEvent("window-target-resolved", { windowId: panelWindowId });
      } catch (error) {
        if (disposed) return;
        const message = normalizeError(error);
        logPanelEvent("window-target-failed", { message });
        resetUnavailableTab(message);
        return;
      }

      try {
        const enabled = await getAutoScanEnabled();
        if (disposed) return;
        setAutoScanEnabled(enabled);
      } catch (error) {
        if (!disposed) logPanelEvent("auto-scan-setting-read-failed", { message: normalizeError(error) });
      }
      await refreshStatus();
      await syncTab("initial");
    })();

    onCleanup(() => {
      disposed = true;
      unsubscribeTabTargets();
    });
  });

  onCleanup(() => {
    unsubscribeSnapshotRevisions?.();
    unsubscribeSnapshotRevisions = undefined;
    subscribedSnapshotSessionKey = null;
    const target = sessionTarget();
    logPanelEvent(target ? "cleanup-release-observation" : "cleanup-without-owned-session", target
      ? { sessionId: target.sessionId, tabId: target.tabId }
      : undefined);
    if (target) void releaseObservationTarget(target, "panel-close");
  });

  const context: PanelContextType = {
    status,
    busy,
    liveUpdateMode,
    notice,
    errorMessage,
    analysis,
    visibleTabIdentity,
    lateAddedIds,
    explanationsByTechnologyId,
    matcherStatus,
    replayHistory,
    latestReplaySummary,
    evidenceState,
    resultCount,
    groupedResults,
    hasLateDetections,
    liveUpdateChipLabel,
    evidenceCompletenessLabel,
    analysisActivity,
    autoScanEnabled,
    autoScanSettingInFlight,
    clearStoredDataInFlight,
    refresh: refreshObservation,
    stopObservation,
    setAutoScanEnabled: setAutoScan,
    clearStoredData,
    getReplayHistory,
  };

  return <PanelContext.Provider value={context}>{props.children}</PanelContext.Provider>;
}
