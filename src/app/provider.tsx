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
  readStoredAnalysis,
  subscribeToSnapshotRevisions,
} from "@/app/snapshot";
import { browserDetectionPersistence } from "@/lib/persistence";
import { PanelContext, type PanelContextType } from "@/app/context";
import { getTabTarget, getWindowId, subscribeTabTargetChanges, type TabTarget } from "@/app/tab";


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
type AnalysisCommandInput = Omit<AnalyzeVisibleTabInput, "target">;

function logPanelEvent(event: string, details?: Record<string, unknown>): void {
  panelLogger.debug("[kaiju-deepscope][sidepanel] {event}", {
    event,
    ...(details ?? {}),
  });
}

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
function getMatcherStatusForAnalysisResponse(
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

function isSameVisibleTabIdentity(left: VisibleTabIdentity | null, right: VisibleTabIdentity): boolean {
  return Boolean(
    left &&
      left.windowId === right.windowId &&
      left.tabId === right.tabId &&
      left.frameId === right.frameId &&
      left.originHash === right.originHash &&
      left.urlHash === right.urlHash,
  );
}


type WorkflowState =
  | { readonly kind: "idle" }
  | { readonly kind: "loading-stored-snapshot"; readonly identity: VisibleTabIdentity }
  | { readonly kind: "queued-initial-analysis"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "streaming-revisions"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "refreshing-observed-session"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "switching-tab"; readonly identity: VisibleTabIdentity }
  | { readonly kind: "stopped"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "failed"; readonly identity: VisibleTabIdentity | null; readonly message: string };

type VisibleTabIdentitySyncReason = "initial" | "tab-change";

/** Panel actions are busy only while user-visible commands own the current tab target. */
function isWorkflowBusy(state: WorkflowState): boolean {
  return (
    state.kind === "loading-stored-snapshot" ||
    state.kind === "queued-initial-analysis" ||
    state.kind === "refreshing-observed-session" ||
    state.kind === "switching-tab"
  );
}

/** True when a background response still belongs to the tab the side panel is rendering. */
function canApplyAnalysisResponseToVisibleIdentity(
  response: AnalyzeVisibleTabOutput,
  requestedIdentity: VisibleTabIdentity | null,
  visibleIdentity: VisibleTabIdentity | null,
): boolean {
  if (!requestedIdentity) {
    return true;
  }

  return response.analysis.url === requestedIdentity.url && isSameVisibleTabIdentity(visibleIdentity, requestedIdentity);
}

/** Whether a background command only registered queued matcher work. */
function isQueuedPlaceholderResponse(response: AnalyzeVisibleTabOutput): boolean {
  return (
    response.enrichment?.status === "pending" &&
    response.analysis.results.length === 0 &&
    !response.replayTrace &&
    response.snapshot.status !== "hit"
  );
}

/** Whether a queued placeholder should preserve the richer analysis already visible. */
function shouldPreserveVisibleAnalysisForQueuedPlaceholder(
  response: AnalyzeVisibleTabOutput,
  identity: VisibleTabIdentity,
  currentAnalysis: SiteAnalysis | null,
): boolean {
  return Boolean(
    currentAnalysis &&
      currentAnalysis.url === identity.url &&
      isQueuedPlaceholderResponse(response),
  );
}

function formatEvidenceCompleteness(state: DetectionEvidenceState | null): string {
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
  const [workflow, setWorkflow] = createSignal<WorkflowState>({ kind: "idle" });
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
    createSignal<VisibleTabIdentitySyncReason | null>(null);
  const [visibleDetectorSnapshotRevision, setVisibleDetectorSnapshotRevision] = createSignal<DetectionSessionSnapshot | null>(null);
  const [visibleLifecycleSnapshotRevision, setVisibleLifecycleSnapshotRevision] = createSignal<DetectionSessionSnapshot | null>(null);
  let unsubscribeSnapshotRevisions: (() => void) | undefined;
  let subscribedSnapshotSessionKey: DetectionSessionKey | null = null;
  let panelWindowId: number | null = null;
  let disposed = false;

  const analysisRequestInFlight = createMemo(() => analysisRequestTarget() !== null);
  const visibleAnalysisRequestInFlight = createMemo(() => {
    const target = analysisRequestTarget();
    const visible = visibleTabIdentity();
    return Boolean(target && visible && isSameVisibleTabIdentity(visible, target));
  });
  const queuedVisibleAnalysis = createMemo(() => {
    const visible = visibleTabIdentity();
    const queued = queuedManualRefreshIdentity() ?? queuedAnalysisIdentity();
    return Boolean(visible && queued && isSameVisibleTabIdentity(visible, queued));
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
  const evidenceCompletenessLabel = createMemo(() => formatEvidenceCompleteness(evidenceState()));

  async function hydrateReplayHistoryIfMissing(revision: VisibleRevision) {
    if (!shouldApplyReplayState(revision)) {
      return;
    }

    if (revision.replayHistory) {
      return;
    }

    try {
      const historyResponse = await backgroundApi.getReplayTraceHistory({ url: revision.analysis.url });
      if (disposed) return;
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


  async function drainQueuedAnalysisWork(): Promise<void> {
    if (disposed || analysisRequestInFlight()) {
      return;
    }

    const visibleIdentity = visibleTabIdentity();
    const manualIdentity = queuedManualRefreshIdentity();
    if (manualIdentity && (!visibleIdentity || !isSameVisibleTabIdentity(visibleIdentity, manualIdentity))) {
      setQueuedManualRefreshIdentity(null);
    } else if (manualIdentity) {
      setQueuedManualRefreshIdentity(null);
      await loadLatestAnalysisForIdentity(manualIdentity, {
        input: { mode: "refresh", observe: "while-panel-open" },
        resetLateMarkers: true,
        source: "manual",
      });
      return;
    }

    const queuedIdentity = queuedAnalysisIdentity();
    if (queuedIdentity && (!visibleIdentity || !isSameVisibleTabIdentity(visibleIdentity, queuedIdentity))) {
      setQueuedAnalysisIdentity(null);
    } else if (queuedIdentity) {
      setQueuedAnalysisIdentity(null);
      await loadLatestAnalysisForIdentity(queuedIdentity, {
        input: { mode: "snapshot-first", observe: "while-panel-open" },
        resetLateMarkers: !analysis(),
        source: "initial",
      });
    }
  }

  function queueManualRefresh(identity: VisibleTabIdentity): void {
    setQueuedManualRefreshIdentity(identity);
    setNotice({
      variant: "warning",
      text: "Refresh will run after the current analysis finishes.",
    });
  }

  async function readObservationSessionState() {
    const target = sessionTarget();
    return target ? backgroundApi.getObservationSessionState(target) : null;
  }

  function updateMatcherStatusFromSnapshot(snapshot: DetectionSessionSnapshot): void {
    const status = getMatcherStatusFromSnapshot(snapshot);
    if (status) setMatcherStatus(status);
  }

  function isSameDetectionSessionKey(
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
  function subscribeToVisibleSnapshotRevisions(
    identity: VisibleTabIdentity,
    exactSessionKey: DetectionSessionKey | null,
  ): void {
    if (
      unsubscribeSnapshotRevisions &&
      ((exactSessionKey === null && subscribedSnapshotSessionKey === null) ||
        isSameDetectionSessionKey(subscribedSnapshotSessionKey, exactSessionKey))
    ) {
      return;
    }

    unsubscribeSnapshotRevisions?.();
    subscribedSnapshotSessionKey = exactSessionKey ? { ...exactSessionKey } : null;
    unsubscribeSnapshotRevisions = subscribeToSnapshotRevisions(
      identity,
      exactSessionKey,
      applySnapshotRevision,
    );
  }

  function applySnapshotRevision(snapshot: DetectionSessionSnapshot) {
    if (disposed) return;

    const currentSnapshot = snapshot.source === "content"
      ? visibleLifecycleSnapshotRevision()
      : visibleDetectorSnapshotRevision();
    if (!isNewerSnapshotRevision(currentSnapshot, snapshot)) {
      logPanelEvent("snapshot-revision-ignored", { revision: snapshot.revision, updatedAt: snapshot.updatedAt });
      return;
    }

    const identity = visibleTabIdentity();
    if (identity && snapshot.source !== "content") {
      subscribeToVisibleSnapshotRevisions(identity, snapshot.key);
    }

    if (!shouldApplySnapshotRevision({ currentAnalysis: analysis(), snapshot })) {
      if (snapshot.source === "content") {
        setVisibleLifecycleSnapshotRevision(snapshot);
      } else {
        setVisibleDetectorSnapshotRevision(snapshot);
      }
      updateMatcherStatusFromSnapshot(snapshot);
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
      setVisibleLifecycleSnapshotRevision(snapshot);
    } else {
      setVisibleDetectorSnapshotRevision(snapshot);
    }
    if (snapshot.replaySummary) {
      setLatestReplaySummary(snapshot.replaySummary);
    }
    updateMatcherStatusFromSnapshot(snapshot);
    logPanelEvent("snapshot-revision-applied", {
      revision: snapshot.revision,
      resultCount: snapshot.analysis.results.length,
      status: snapshot.status,
    });
    applyPanelRevision(createStoredVisibleRevision({
      source: "origin-snapshot",
      analysis: snapshot.analysis,
      snapshot,
    }), { source: "auto", identity: visibleTabIdentity() ?? undefined });
    void refreshStatus();
  }

  async function renderStoredAnalysisForVisibleTab(identity: VisibleTabIdentity) {
    setWorkflow({ kind: "loading-stored-snapshot", identity });
    try {
      const stored = await readStoredAnalysis(identity, browserDetectionPersistence);
      if (disposed) return false;
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
      setVisibleLifecycleSnapshotRevision(stored.lifecycleSnapshot ?? null);
      if (stored.snapshot) {
        subscribeToVisibleSnapshotRevisions(identity, stored.snapshot.key);
        updateMatcherStatusFromSnapshot(stored.snapshot);
      } else {
        setMatcherStatus("idle");
      }
      applyPanelRevision(stored.revision, {
        source: "initial",
        resetLateMarkers: true,
        identity,
      });
      return true;
    } catch (error) {
      if (disposed) return false;
      logPanelEvent("stored-analysis-render-failed", { message: normalizeError(error) });
      return false;
    } finally {
      if (!disposed) setWorkflow({ kind: "idle" });
    }
  }

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


  async function updateAutoScanSetting(enabled: boolean): Promise<void> {
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

  async function clearStoredData() {
    setClearStoredDataInFlight(true);
    setErrorMessage("");
    setNotice(null);
    try {
      const removedCount = await browserDetectionPersistence.clearStoredData();
      setAnalysis(null);
      setVisibleDetectorSnapshotRevision(null);
      setVisibleLifecycleSnapshotRevision(null);
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

  function applyAnalysisResponse(
    response: AnalyzeVisibleTabOutput,
    options: {
      source: "initial" | "manual" | "auto";
      resetLateMarkers?: boolean;
      identity?: VisibleTabIdentity;
    },
  ) {
    applyPanelRevision(createVisibleRevisionFromAnalysisResponse(response), options);
  }

  function applyPanelRevision(
    revision: VisibleRevision,
    options: {
      source: "initial" | "manual" | "auto";
      resetLateMarkers?: boolean;
      identity?: VisibleTabIdentity;
    },
  ) {
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
    setMatcherStatus(getMatcherStatusForAnalysisResponse(revision, options.source, matcherStatus()));
    const _shouldApplyReplayState = shouldApplyReplayState(revision);
    const nextReplayHistory = _shouldApplyReplayState
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
      !shouldApplyReplayState
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

    void hydrateReplayHistoryIfMissing(revision);
  }

  async function syncObservationState() {
    try {
      const response = await readObservationSessionState();
      if (disposed) return;
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
      if (disposed) return;
      setLiveUpdateMode("unknown");
      setErrorMessage(normalizeError(error));
    }
  }

  async function loadLatestAnalysis(options: {
    input: AnalysisCommandInput;
    resetLateMarkers?: boolean;
    source: "initial" | "manual" | "auto";
  }) {
    const identity = visibleTabIdentity();
    if (!identity) {
      setErrorMessage("No inspectable visible tab is available for analysis.");
      return;
    }

    await loadLatestAnalysisForIdentity(identity, options);
  }

  async function loadLatestAnalysisForIdentity(identity: VisibleTabIdentity, options: {
    input: AnalysisCommandInput;
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
      subscribeToVisibleSnapshotRevisions(identity, null);
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
      if (disposed) return;

      if (!response.ok) {
        logPanelEvent("analysis-failed", {
          source: options.source,
          code: response.error.code,
          message: response.error.message,
        });
        if (isUserVisibleRefresh && isSameVisibleTabIdentity(visibleTabIdentity(), identity)) {
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
        return;
      }

      if (!canApplyAnalysisResponseToVisibleIdentity(response.value, identity, visibleTabIdentity())) {
        logPanelEvent("analysis-response-ignored-for-stale-tab", {
          source: options.source,
          responseUrl: response.value.analysis.url,
          expectedUrl: identity.url,
        });
        return;
      }

      if (response.value.sessionTarget && !response.value.sessionTarget.incognito) {
        subscribeToVisibleSnapshotRevisions(identity, {
          tabId: response.value.sessionTarget.tabId,
          frameId: identity.frameId,
          documentId: response.value.sessionTarget.sessionId,
          originHash: identity.originHash,
        });
      }

      if (shouldPreserveVisibleAnalysisForQueuedPlaceholder(response.value, identity, analysis())) {
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

      applyAnalysisResponse(response.value, { ...options, identity });
      await refreshStatus();
    } catch (error) {
      if (disposed) return;
      logPanelEvent("analysis-request-threw", {
        source: options.source,
        message: normalizeError(error),
      });
      if (isUserVisibleRefresh && isSameVisibleTabIdentity(visibleTabIdentity(), identity)) {
        setErrorMessage(normalizeError(error));
      }
      setMatcherStatus("idle");
    } finally {
      if (!disposed) {
        if (isSameVisibleTabIdentity(analysisRequestTarget(), identity)) {
          setAnalysisRequestTarget(null);
        }
        if (isUserVisibleRefresh && isSameVisibleTabIdentity(visibleTabIdentity(), identity)) {
          setWorkflow({ kind: "idle" });
        }
        await drainQueuedAnalysisWork();
      }
    }
  }

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

  async function refreshAndRestartObservation() {
    if (analysisRequestInFlight()) {
      const identity = visibleTabIdentity();
      if (identity) queueManualRefresh(identity);
      return;
    }

    await loadLatestAnalysis({
      input: {
        mode: "refresh",
        observe: "while-panel-open",
      },
      resetLateMarkers: true,
      source: "manual",
    });
  }

  function resetVisibleStateForVisibleTab(identity: VisibleTabIdentity): void {
    unsubscribeSnapshotRevisions?.();
    unsubscribeSnapshotRevisions = undefined;
    subscribedSnapshotSessionKey = null;
    subscribeToVisibleSnapshotRevisions(identity, null);
    logPanelEvent("visible-state-reset", {
      previousUrl: analysis()?.url,
      previousResultCount: analysis()?.results.length ?? 0,
      nextUrl: identity.url,
      sameVisibleIdentity: isSameVisibleTabIdentity(visibleTabIdentity(), identity),
    });
    setVisibleDetectorSnapshotRevision(null);
    setVisibleLifecycleSnapshotRevision(null);
    setVisibleTabIdentity(identity);
    setSessionTarget(null);
    setLiveUpdateMode("unknown");
    setMatcherStatus("idle");
    setWorkflow({ kind: "switching-tab", identity });
  }

  async function activateVisibleTab(identity: VisibleTabIdentity, reason: "initial" | "tab-change"): Promise<void> {
    if (isSameVisibleTabIdentity(visibleTabIdentity(), identity)) return;

    logPanelEvent("visible-tab-identity-applied", {
      reason,
      tabId: identity.tabId,
      hostname: identity.hostname,
    });
    resetVisibleStateForVisibleTab(identity);
    await renderStoredAnalysisForVisibleTab(identity);
    if (disposed) return;
    if (pendingVisibleTabIdentitySync() === "tab-change") {
      logPanelEvent("visible-tab-analysis-deferred-for-pending-sync", {
        tabId: identity.tabId,
        hostname: identity.hostname,
      });
      return;
    }
    await loadLatestAnalysisForIdentity(identity, {
      input: {
        mode: "snapshot-first",
        observe: "while-panel-open",
      },
      resetLateMarkers: !analysis(),
      source: "initial",
    });
    if (disposed) return;
    if (pendingVisibleTabIdentitySync() === "tab-change") {
      return;
    }
    await syncObservationState();
  }

  function queueVisibleTabIdentitySync(reason: VisibleTabIdentitySyncReason): void {
    setPendingVisibleTabIdentitySync((current) => {
      if (current === "tab-change" || reason === "tab-change") {
        return "tab-change";
      }

      return current ?? reason;
    });
  }

  function resetVisibleStateForUnavailableTab(message: string): void {
    unsubscribeSnapshotRevisions?.();
    unsubscribeSnapshotRevisions = undefined;
    subscribedSnapshotSessionKey = null;
    setVisibleDetectorSnapshotRevision(null);
    setVisibleLifecycleSnapshotRevision(null);
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

  async function syncVisibleTabIdentity(
    reason: VisibleTabIdentitySyncReason,
    requestedTarget?: TabTarget,
  ): Promise<void> {
    if (disposed) return;

    if (visibleTabIdentitySyncInFlight()) {
      queueVisibleTabIdentitySync(reason);
      return;
    }

    if (panelWindowId === null) {
      queueVisibleTabIdentitySync(reason);
      return;
    }

    if (requestedTarget && requestedTarget.windowId !== panelWindowId) {
      return;
    }

    setVisibleTabIdentitySyncInFlight(true);
    try {
      const target = requestedTarget ?? await getTabTarget(panelWindowId);
      if (disposed) return;
      if (!target) {
        const message = "No active browser tab is available in this window.";
        logPanelEvent("visible-tab-target-unavailable", { reason, windowId: panelWindowId });
        resetVisibleStateForUnavailableTab(message);
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
        resetVisibleStateForUnavailableTab(message);
        return;
      }

      if (isSameVisibleTabIdentity(visibleTabIdentity(), identityResponse.value)) {
        setErrorMessage("");
        if (workflow().kind === "failed") setWorkflow({ kind: "idle" });
        return;
      }

      if (reason === "tab-change" && analysisRequestInFlight()) {
        setQueuedAnalysisIdentity(identityResponse.value);
        logPanelEvent("visible-tab-identity-rendered-during-refresh", {
          windowId: target.windowId,
          tabId: identityResponse.value.tabId,
          hostname: identityResponse.value.hostname,
        });
        resetVisibleStateForVisibleTab(identityResponse.value);
        await renderStoredAnalysisForVisibleTab(identityResponse.value);
        setNotice({
          variant: "warning",
          text: "Visible tab changed. Stored detections are shown while the previous analysis finishes.",
        });
        return;
      }

      await activateVisibleTab(identityResponse.value, reason);
    } catch (error) {
      if (disposed) return;
      const message = normalizeError(error);
      logPanelEvent("visible-tab-sync-failed", { reason, windowId: panelWindowId, message });
      resetVisibleStateForUnavailableTab(message);
    } finally {
      setVisibleTabIdentitySyncInFlight(false);
      const pendingReason = pendingVisibleTabIdentitySync();
      if (!disposed && pendingReason) {
        setPendingVisibleTabIdentitySync(null);
        void syncVisibleTabIdentity(pendingReason);
      }
    }
  }

  onMount(() => {
    const unsubscribeTabTargets = subscribeTabTargetChanges({
      getWindowId: () => panelWindowId,
      getVisibleTabId: () => visibleTabIdentity()?.tabId ?? null,
      sync: (target) => { void syncVisibleTabIdentity("tab-change", target); },
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
        resetVisibleStateForUnavailableTab(message);
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
      await syncVisibleTabIdentity("initial");
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
    logPanelEvent(target ? "cleanup-retain-observation" : "cleanup-without-owned-session", target
      ? { sessionId: target.sessionId, tabId: target.tabId }
      : undefined);
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
    refresh: refreshAndRestartObservation,
    stopObservation,
    setAutoScanEnabled: updateAutoScanSetting,
    clearStoredData,
  };

  return <PanelContext.Provider value={context}>{props.children}</PanelContext.Provider>;
}
