import { defineProxy } from "comctx";
import { browser } from "wxt/browser";
import { createMemo, createSignal, For, Show, onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";

import { CategoryGroup } from "@/components/CategoryGroup";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { PopupShell } from "./PopupRegions";
import { getKaijuSiteScopeLogger } from "@/lib/diagnostics/logging";
import type {
  AnalysisStatus,
  SiteAnalysis,
} from "@/lib/detection/types";
import type {
  DetectionEvidenceState,
  DetectionReplaySummary,
  DetectionSessionKey,
  DetectionSessionSnapshot,
} from "@/lib/contracts/detection-session";
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
  isSidePanelActionNotification,
} from "@/lib/messaging";
import {
  buildPopupAnalysisUpdate,
  createPopupVisibleRevisionFromAnalysisResponse,
  createReplaySummaryFromTrace,
  formatPopupAppError,
  getPopupAnalysisActivity,
  getPopupMatcherStatusFromSnapshot,
  getReplayHistoryForVisibleAnalysis,
  getPopupObservationLabel,
  getPopupObservationModeFromSession,
  getPopupObservationModeFromSnapshot,
  groupDetectionsByPrimaryCategory,
  isPopupVisibleRevisionPending,
  shouldApplyPopupReplayState,
  shouldApplyPopupSnapshotRevision,
  shouldPreservePopupReplayState,
  type PopupExplanationLookup,
  type PopupMatcherStatus,
  type PopupNotice,
  type PopupObservationMode,
  type PopupVisibleRevision,
} from "@/lib/popup/view-model";
import {
  createStoredPopupVisibleRevision,
  isNewerSnapshotRevision,
  readStoredPopupAnalysis,
  subscribeToPopupSnapshotRevisions,
} from "@/lib/popup/snapshot-state";
import { browserDetectionPersistence } from "@/lib/persistence";

import "./App.css";

const popupLogger = getKaijuSiteScopeLogger("popup");
const [, injectBackgroundApi] = defineProxy(() => ({}) as BackgroundApi, {
  namespace: BACKGROUND_RPC_NAMESPACE,
  heartbeatCheck: false,
  transfer: false,
});

const backgroundApi = injectBackgroundApi(
  createBackgroundClientAdapter("popup", { href: globalThis.location?.href }),
);

/** Popup commands own the visible target separately from mode and observation policy. */
type PopupAnalysisCommandInput = Omit<AnalyzeVisibleTabInput, "target">;

function logPopupEvent(event: string, details?: Record<string, unknown>): void {
  popupLogger.debug("[kaiju-site-scope][popup] {event}", {
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
  revision: PopupVisibleRevision,
  source: "initial" | "manual" | "auto",
  currentStatus: PopupMatcherStatus,
): PopupMatcherStatus {
  if (isPopupVisibleRevisionPending(revision)) {
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
      left.tabId === right.tabId &&
      left.frameId === right.frameId &&
      left.originHash === right.originHash &&
      left.urlHash === right.urlHash,
  );
}


type PopupWorkflowState =
  | { readonly kind: "idle" }
  | { readonly kind: "loading-stored-snapshot"; readonly identity: VisibleTabIdentity }
  | { readonly kind: "queued-initial-analysis"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "streaming-revisions"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "refreshing-observed-session"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "switching-tab"; readonly identity: VisibleTabIdentity }
  | { readonly kind: "stopped"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "failed"; readonly identity: VisibleTabIdentity | null; readonly message: string };

type VisibleTabIdentitySyncReason = "initial" | "tab-change";

/** Popup actions are busy only while user-visible commands own the current tab target. */
function isPopupWorkflowBusy(state: PopupWorkflowState): boolean {
  return (
    state.kind === "loading-stored-snapshot" ||
    state.kind === "queued-initial-analysis" ||
    state.kind === "refreshing-observed-session" ||
    state.kind === "switching-tab"
  );
}

/** True when a background response still belongs to the tab the popup is rendering. */
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

/** Format replay timestamps for the compact popup history list. */
function formatReplayTime(trace: DetectionReplayTrace) {
  return new Date(trace.analyzedAt).toLocaleString();
}

/** Summarize a full replay trace without exposing raw page observations. */
function formatReplaySummary(trace: DetectionReplayTrace) {
  return `${trace.resultCount} detection${trace.resultCount === 1 ? "" : "s"}`;
}

/** Summarize the latest stored replay receipt when the full history is not hydrated yet. */
function formatReplaySummarySnapshot(summary: DetectionReplaySummary) {
  return `${summary.resultCount} detection${summary.resultCount === 1 ? "" : "s"} · ${summary.eventCount} replay event${summary.eventCount === 1 ? "" : "s"}`;
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

function LoadingState(props: { headline: string; message: string }) {
  return (
    <div class="loading-state" role="status" aria-live="polite">
      <span class="loading-spinner" aria-hidden="true" />
      <div>
        <strong>{props.headline}</strong>
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [status, setStatus] = createStore<AnalysisStatus>({
    totalAnalyses: 0,
    trackedOrigins: 0,
  });
  /**
   * User-visible commands and tab switches share one workflow state so buttons,
   * busy affordances, and stale-response guards read the same target ownership.
   */
  const [workflow, setWorkflow] = createSignal<PopupWorkflowState>({ kind: "idle" });
  const [liveUpdateMode, setLiveUpdateMode] = createSignal<PopupObservationMode>("unknown");
  const [notice, setNotice] = createSignal<PopupNotice | null>(null);
  const [errorMessage, setErrorMessage] = createSignal("");
  const [analysis, setAnalysis] = createSignal<SiteAnalysis | null>(null);
  const [lateAddedIds, setLateAddedIds] = createSignal<string[]>([]);
  const [explanationsByTechnologyId, setExplanationsByTechnologyId] =
    createSignal<PopupExplanationLookup>({});
  const [matcherStatus, setMatcherStatus] = createSignal<PopupMatcherStatus>("idle");
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
  const [pendingVisibleTabIdentitySync, setPendingVisibleTabIdentitySync] =
    createSignal<VisibleTabIdentitySyncReason | null>(null);
  const [visibleDetectorSnapshotRevision, setVisibleDetectorSnapshotRevision] = createSignal<DetectionSessionSnapshot | null>(null);
  const [visibleLifecycleSnapshotRevision, setVisibleLifecycleSnapshotRevision] = createSignal<DetectionSessionSnapshot | null>(null);
  let unsubscribeSnapshotRevisions: (() => void) | undefined;
  let subscribedSnapshotSessionKey: DetectionSessionKey | null = null;

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
  const workflowBusy = createMemo(() => isPopupWorkflowBusy(workflow()));
  const busy = createMemo(() => isPopupWorkflowBusy(workflow()) || analysisRequestInFlight());
  const matcherProgress = createMemo(() => visibleDetectorSnapshotRevision()?.matcherProgress);
  const analysisActivity = createMemo(() => getPopupAnalysisActivity({
    matcherStatus: matcherStatus(),
    workflowBusy: workflowBusy(),
    analysisRequestInFlight: visibleAnalysisRequestInFlight(),
    queuedVisibleAnalysis: queuedVisibleAnalysis(),
    matcherProgress: matcherProgress(),
  }));
  const resultCount = createMemo(() => analysis()?.results.length ?? 0);
  const groupedResults = createMemo(() => groupDetectionsByPrimaryCategory(analysis()?.results ?? []));
  const hasLateDetections = createMemo(() => lateAddedIds().length > 0);
  const liveUpdateChipLabel = createMemo(() => getPopupObservationLabel(liveUpdateMode()));
  const evidenceCompletenessLabel = createMemo(() => formatEvidenceCompleteness(evidenceState()));

  async function hydrateReplayHistoryIfMissing(revision: PopupVisibleRevision) {
    if (!shouldApplyPopupReplayState(revision)) {
      return;
    }

    if (revision.replayHistory) {
      return;
    }

    try {
      const historyResponse = await backgroundApi.getReplayTraceHistory({ url: revision.analysis.url });
      if (historyResponse.ok) {
        const current = analysis();
        if (current?.url === revision.analysis.url) {
          setReplayHistory(getReplayHistoryForVisibleAnalysis(historyResponse.value, current));
        }
      }
    } catch (error) {
      logPopupEvent("replay-history-hydration-failed", {
        message: normalizeError(error),
      });
    }
  }


  async function drainQueuedAnalysisWork(): Promise<void> {
    if (analysisRequestInFlight()) {
      return;
    }

    const visibleIdentity = visibleTabIdentity();
    const manualIdentity = queuedManualRefreshIdentity();
    if (manualIdentity && (!visibleIdentity || !isSameVisibleTabIdentity(visibleIdentity, manualIdentity))) {
      setQueuedManualRefreshIdentity(null);
    } else if (manualIdentity) {
      setQueuedManualRefreshIdentity(null);
      await loadLatestAnalysisForIdentity(manualIdentity, {
        input: { mode: "refresh", observe: "while-popup-open" },
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
        input: { mode: "snapshot-first", observe: "while-popup-open" },
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
    const status = getPopupMatcherStatusFromSnapshot(snapshot);
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
    unsubscribeSnapshotRevisions = subscribeToPopupSnapshotRevisions(
      identity,
      exactSessionKey,
      applySnapshotRevision,
    );
  }

  function applySnapshotRevision(snapshot: DetectionSessionSnapshot) {
    const currentSnapshot = snapshot.source === "content"
      ? visibleLifecycleSnapshotRevision()
      : visibleDetectorSnapshotRevision();
    if (!isNewerSnapshotRevision(currentSnapshot, snapshot)) {
      logPopupEvent("snapshot-revision-ignored", { revision: snapshot.revision, updatedAt: snapshot.updatedAt });
      return;
    }

    const identity = visibleTabIdentity();
    if (identity && snapshot.source !== "content") {
      subscribeToVisibleSnapshotRevisions(identity, snapshot.key);
    }

    if (!shouldApplyPopupSnapshotRevision({ currentAnalysis: analysis(), snapshot })) {
      if (snapshot.source === "content") {
        setVisibleLifecycleSnapshotRevision(snapshot);
      } else {
        setVisibleDetectorSnapshotRevision(snapshot);
      }
      updateMatcherStatusFromSnapshot(snapshot);
      const nextMode = getPopupObservationModeFromSnapshot(snapshot);
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
      logPopupEvent("snapshot-lifecycle-applied", {
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
    logPopupEvent("snapshot-revision-applied", {
      revision: snapshot.revision,
      resultCount: snapshot.analysis.results.length,
      status: snapshot.status,
    });
    applyPopupRevision(createStoredPopupVisibleRevision({
      source: "origin-snapshot",
      analysis: snapshot.analysis,
      snapshot,
    }), { source: "auto", identity: visibleTabIdentity() ?? undefined });
    void refreshStatus();
  }

  async function renderStoredAnalysisForVisibleTab(identity: VisibleTabIdentity) {
    setWorkflow({ kind: "loading-stored-snapshot", identity });
    try {
      const stored = await readStoredPopupAnalysis(identity, browserDetectionPersistence);
      if (!stored) {
        const current = analysis();
        const preservingCurrentTabAnalysis = current?.url === identity.url;
        logPopupEvent("stored-analysis-miss", {
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

      logPopupEvent("stored-analysis-rendered", {
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
      applyPopupRevision(stored.revision, {
        source: "initial",
        resetLateMarkers: true,
        identity,
      });
      return true;
    } catch (error) {
      logPopupEvent("stored-analysis-render-failed", { message: normalizeError(error) });
      return false;
    } finally {
      setWorkflow({ kind: "idle" });
    }
  }

  async function refreshStatus() {
    try {
      const response = await backgroundApi.getAnalysisStatus();
      if (response.ok) {
        setStatus(response.value);
      }
    } catch (error) {
      setErrorMessage(normalizeError(error));
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
    applyPopupRevision(createPopupVisibleRevisionFromAnalysisResponse(response), options);
  }

  function applyPopupRevision(
    revision: PopupVisibleRevision,
    options: {
      source: "initial" | "manual" | "auto";
      resetLateMarkers?: boolean;
      identity?: VisibleTabIdentity;
    },
  ) {
    const previousAnalysis = analysis();
    const preserveReplayState = shouldPreservePopupReplayState({ previousAnalysis, revision });
    const update = buildPopupAnalysisUpdate({
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
    const shouldApplyReplayState = shouldApplyPopupReplayState(revision);
    const nextReplayHistory = shouldApplyReplayState
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
    logPopupEvent("analysis-applied", {
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
      logPopupEvent("snapshot-stream-awaiting-revisions", {
        observationMode: update.observationMode,
      });
    }

    if (update.addedDetectionIds.length) {
      logPopupEvent("late-detections-found", {
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
      if (!response) {
        setLiveUpdateMode("unknown");
        return;
      }

      if (!response.ok) {
        logPopupEvent("observation-sync-unavailable", {
          code: response.error.code,
          message: response.error.message,
        });
        setLiveUpdateMode("unknown");
        return;
      }

      logPopupEvent("observation-sync", {
        status: response.value.status,
        stopReason: response.value.stopReason,
      });

      const nextLiveUpdateMode = getPopupObservationModeFromSession(response.value);
      setLiveUpdateMode(nextLiveUpdateMode);
    } catch (error) {
      setLiveUpdateMode("unknown");
      setErrorMessage(normalizeError(error));
    }
  }

  async function loadLatestAnalysis(options: {
    input: PopupAnalysisCommandInput;
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
    input: PopupAnalysisCommandInput;
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
      logPopupEvent("analysis-requested", {
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

      if (!response.ok) {
        logPopupEvent("analysis-failed", {
          source: options.source,
          code: response.error.code,
          message: response.error.message,
        });
        if (isUserVisibleRefresh && isSameVisibleTabIdentity(visibleTabIdentity(), identity)) {
          setErrorMessage(formatPopupAppError(response.error));
        }
        setMatcherStatus("idle");
        return;
      }

      if (pendingVisibleTabIdentitySync() === "tab-change") {
        logPopupEvent("analysis-response-ignored-for-pending-tab-sync", {
          source: options.source,
          responseUrl: response.value.analysis.url,
          expectedUrl: identity.url,
        });
        return;
      }

      if (!canApplyAnalysisResponseToVisibleIdentity(response.value, identity, visibleTabIdentity())) {
        logPopupEvent("analysis-response-ignored-for-stale-tab", {
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
            ? getPopupObservationModeFromSession(response.value.session)
            : liveUpdateMode(),
        );
        logPopupEvent("queued-placeholder-preserved-visible-analysis", {
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
      logPopupEvent("analysis-request-threw", {
        source: options.source,
        message: normalizeError(error),
      });
      if (isUserVisibleRefresh && isSameVisibleTabIdentity(visibleTabIdentity(), identity)) {
        setErrorMessage(normalizeError(error));
      }
      setMatcherStatus("idle");
    } finally {
      if (isSameVisibleTabIdentity(analysisRequestTarget(), identity)) {
        setAnalysisRequestTarget(null);
      }
      if (isUserVisibleRefresh && isSameVisibleTabIdentity(visibleTabIdentity(), identity)) {
        setWorkflow({ kind: "idle" });
      }
      await drainQueuedAnalysisWork();
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
          text: "No active observation session is attached to this popup. Refresh starts a new session for the visible tab.",
        });
        setLiveUpdateMode("unknown");
        return;
      }

      logPopupEvent("observation-stop-requested", { sessionId: target.sessionId, tabId: target.tabId });
      const response = await backgroundApi.stopObservationSession(target);
      if (!response.ok) {
        logPopupEvent("observation-stop-failed", {
          code: response.error.code,
          message: response.error.message,
        });
        setErrorMessage(formatPopupAppError(response.error));
        return;
      }

      logPopupEvent("observation-stopped", {
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
        observe: "while-popup-open",
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
    logPopupEvent("visible-state-reset", {
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

  async function activatePopupVisibleTab(identity: VisibleTabIdentity, reason: "initial" | "tab-change"): Promise<void> {
    if (isSameVisibleTabIdentity(visibleTabIdentity(), identity)) return;

    logPopupEvent("visible-tab-identity-applied", {
      reason,
      tabId: identity.tabId,
      hostname: identity.hostname,
    });
    resetVisibleStateForVisibleTab(identity);
    await renderStoredAnalysisForVisibleTab(identity);
    if (pendingVisibleTabIdentitySync() === "tab-change") {
      logPopupEvent("visible-tab-analysis-deferred-for-pending-sync", {
        tabId: identity.tabId,
        hostname: identity.hostname,
      });
      return;
    }
    await loadLatestAnalysisForIdentity(identity, {
      input: {
        mode: "snapshot-first",
        observe: "while-popup-open",
      },
      resetLateMarkers: !analysis(),
      source: "initial",
    });
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

  async function syncVisibleTabIdentity(reason: VisibleTabIdentitySyncReason): Promise<void> {
    if (visibleTabIdentitySyncInFlight()) {
      queueVisibleTabIdentitySync(reason);
      return;
    }

    setVisibleTabIdentitySyncInFlight(true);
    try {
      const identityResponse = await backgroundApi.getVisibleTabIdentity();
      if (!identityResponse.ok) {
        logPopupEvent("visible-tab-identity-unavailable", {
          reason,
          code: identityResponse.error.code,
          message: identityResponse.error.message,
        });
        if (reason === "initial") {
          setErrorMessage(formatPopupAppError(identityResponse.error));
        }
        return;
      }

      if (isSameVisibleTabIdentity(visibleTabIdentity(), identityResponse.value)) {
        return;
      }

      if (reason === "tab-change" && analysisRequestInFlight()) {
        setQueuedAnalysisIdentity(identityResponse.value);
        logPopupEvent("visible-tab-identity-rendered-during-refresh", {
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

      await activatePopupVisibleTab(identityResponse.value, reason);
    } finally {
      setVisibleTabIdentitySyncInFlight(false);
      const pendingReason = pendingVisibleTabIdentitySync();
      if (pendingReason) {
        setPendingVisibleTabIdentitySync(null);
        void syncVisibleTabIdentity(pendingReason);
      }
    }
  }

  onMount(() => {
    const handleUpdated = (
      tabId: number,
      changeInfo: { readonly status?: string; readonly url?: string },
      tab: { readonly active?: boolean },
    ): void => {
      const identity = visibleTabIdentity();
      if (!identity || identity.tabId !== tabId || tab.active !== true) {
        return;
      }

      if (typeof changeInfo.url === "string" || changeInfo.status === "loading") {
        void syncVisibleTabIdentity("tab-change");
      }
    };
    const handleVisibilityChange = (): void => {
      if (document.visibilityState === "visible") {
        void syncVisibleTabIdentity("tab-change");
      }
    };
    const handleRuntimeMessage = (message: unknown): void => {
      if (!isSidePanelActionNotification(message)) {
        return;
      }

      const identity = visibleTabIdentity();
      if (identity && identity.tabId !== message.tabId) {
        return;
      }

      // An already-mounted panel may need to re-read the tab after a toolbar
      // click grants activeTab for a newly navigated origin. The normal identity
      // sync starts analysis only when the target actually changed, avoiding a
      // duplicate first-launch scan for a panel that just mounted.
      void syncVisibleTabIdentity("tab-change");
    };

    browser.tabs.onUpdated.addListener(handleUpdated);
    browser.runtime.onMessage.addListener(handleRuntimeMessage);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    void (async () => {
      logPopupEvent("mount");
      await refreshStatus();
      await syncVisibleTabIdentity("initial");
    })();

    onCleanup(() => {
      browser.tabs.onUpdated.removeListener(handleUpdated);
      browser.runtime.onMessage.removeListener(handleRuntimeMessage);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    });
  });

  onCleanup(() => {
    unsubscribeSnapshotRevisions?.();
    unsubscribeSnapshotRevisions = undefined;
    subscribedSnapshotSessionKey = null;
    const target = sessionTarget();
    logPopupEvent(target ? "cleanup-retain-observation" : "cleanup-without-owned-session", target
      ? { sessionId: target.sessionId, tabId: target.tabId }
      : undefined);
  });

  return (
    <PopupShell.Root busy={busy()}>
      <PopupShell.Hero>
        <PopupShell.HeroCopy>
          <p class="eyebrow">Technology Detection</p>
          <h1>Kaiju Site Scope</h1>
          <p class="lede">
            Analyze the visible tab locally, then keep the latest normalized
            detections up to date as the page lazy-loads.
          </p>
        </PopupShell.HeroCopy>

        <PopupShell.Actions>
          <button
            class="primary-button"
            disabled={busy()}
            onClick={() => void refreshAndRestartObservation()}
          >
            {busy() ? "Refreshing..." : "Refresh"}
          </button>
          <button
            class="secondary-button"
            disabled={busy() || liveUpdateMode() !== "active"}
            onClick={() => void stopObservation()}
          >
            Stop observation
          </button>
        </PopupShell.Actions>

        <PopupShell.Stats>
          <PopupShell.Stat
            accent="moss"
            label="Cached Analyses"
            value={status.totalAnalyses}
          />
          <PopupShell.Stat
            accent="amber"
            label="Tracked Origins"
            value={status.trackedOrigins}
          />
          <PopupShell.Stat
            accent="slate"
            label="Detected Technologies"
            value={resultCount()}
          />
        </PopupShell.Stats>

        <PopupShell.Metrics>
          <p>Source: {analysis()?.source ?? "none"}</p>
          <p>Host: {analysis()?.hostname ?? visibleTabIdentity()?.hostname ?? "not analyzed"}</p>
          <p>Detector: {analysisActivity().label}</p>
          <p>Evidence: {evidenceCompletenessLabel()}</p>
          <p>Observation: {liveUpdateChipLabel().toLowerCase()}</p>
        </PopupShell.Metrics>
      </PopupShell.Hero>

      <PopupShell.Feedback>
        <Show when={errorMessage()}>
          {(value) => <ErrorState message={value()} />}
        </Show>
        <Show when={notice()}>
          {(value) => (
            <p
              class={`status-message ${value().variant}`}
              role="status"
              aria-live="polite"
            >
              {value().text}
            </p>
          )}
        </Show>
        <Show when={analysisActivity().busy}>
          <div class="scan-activity" role="status" aria-live="polite">
            <div class="scan-activity-orb" aria-hidden="true" />
            <div class="scan-activity-copy">
              <strong>{analysisActivity().headline}</strong>
              <p>{analysisActivity().description}</p>
            </div>
          </div>
        </Show>
      </PopupShell.Feedback>


      <section class="privacy-disclosure" aria-label="Privacy and local storage">
        <div>
          <strong>Local active-tab analysis</strong>
          <p>
            Kaiju Site Scope inspects page signals from the active tab to identify
            website technologies and explain the evidence behind each detection.
            Detection results, replay summaries, and cache records stay in local
            extension storage unless you clear them or uninstall the extension.
          </p>
        </div>
        <button
          class="secondary-button compact-button"
          disabled={clearStoredDataInFlight()}
          onClick={() => void clearStoredData()}
        >
          {clearStoredDataInFlight() ? "Clearing..." : "Clear stored detector data"}
        </button>
      </section>

      <PopupShell.ResultPanel
        modeChip={(
          <Show when={analysis()}>
            {(value) => <span class="mode-chip">{value().source}</span>}
          </Show>
        )}
        meta={
          analysisActivity().busy
            ? analysisActivity().description
            : hasLateDetections()
              ? `${lateAddedIds().length} detection${lateAddedIds().length === 1 ? "" : "s"} changed during recent analysis updates and are marked below.`
              : liveUpdateMode() === "active"
                ? "Initial scan is complete. Observed page updates will appear separately as new evidence arrives."
                : liveUpdateMode() === "stopped"
                  ? "Observation is stopped. The latest detector snapshot remains visible until refresh starts a new session."
                  : "Showing the latest detector snapshot for this page."
        }
      >
        <Show
          when={analysis()}
          fallback={
            <EmptyState message="Opening the popup loads the latest detections automatically." />
          }
        >
          {(value) => (
            <Show
              when={value().results.length}
              fallback={
                <Show
                  when={analysisActivity().busy}
                  fallback={<EmptyState message="No technologies detected yet." />}
                >
                  <LoadingState
                    headline={analysisActivity().headline}
                    message={analysisActivity().description}
                  />
                </Show>
              }
            >
              <For each={groupedResults()}>
                {(group) => (
                  <CategoryGroup
                    label={group.label}
                    results={group.results}
                    newDetectionIds={lateAddedIds()}
                    explanationsByTechnologyId={explanationsByTechnologyId()}
                  />
                )}
              </For>
              <Show when={!analysisActivity().busy && (Boolean(latestReplaySummary()) || replayHistory().length > 0)}>
                <PopupShell.ReplayHistory>
                  <div class="replay-history-heading">
                    <h3>Replay History</h3>
                    <p class="result-meta">
                      {matcherStatus() === "recording" || matcherStatus() === "matching"
                        ? "Current run is still recording. Stored summaries appear here as soon as snapshot persistence completes."
                        : liveUpdateMode() === "active"
                        ? "A saved replay receipt is available, but page observation is still open and new detections can still arrive."
                        : "Replay receipts that match the visible detector run. Open one to inspect the saved explanation count."}
                    </p>
                    <Show when={latestReplaySummary()}>
                      {(summary) => (
                        <p class="result-meta">
                          Latest stored summary: {formatReplaySummarySnapshot(summary())}
                        </p>
                      )}
                    </Show>
                  </div>
                  <Show when={replayHistory().length > 0}>
                    <ol class="replay-history-list">
                      <For each={replayHistory().slice(0, 5)}>
                        {(trace) => (
                          <li>
                            <details>
                              <summary>
                                <span>{formatReplayTime(trace)}</span>
                                <span>{formatReplaySummary(trace)}</span>
                              </summary>
                              <ul class="evidence-list replay-event-list">
                                <For each={trace.events}>
                                  {(event) => (
                                    <li>
                                      {event.sequence + 1}. {event.stage}: {event.count}
                                    </li>
                                  )}
                                </For>
                              </ul>
                            </details>
                          </li>
                        )}
                      </For>
                    </ol>
                  </Show>
                </PopupShell.ReplayHistory>
              </Show>
            </Show>
          )}
        </Show>
      </PopupShell.ResultPanel>
    </PopupShell.Root>
  );
}
