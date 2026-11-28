import { createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import type { AnalysisStatus, SiteAnalysis } from "@deepscope/detection/types";
import type { DetectionEvidenceState, DetectionSessionSnapshot } from "../../lib/storage/session.ts";
import type { DetectionReplaySummary } from "@deepscope/detection/pipeline/replay";

import type { DetectionReplayTrace } from "@deepscope/detection/pipeline";
import type { VisibleTabIdentity, ObservationSessionTarget } from "../../lib/messaging/index.ts";

import { same as sameTab } from "../../lib/messaging/identity.ts";

import type { Notice } from "../model/update.ts";

import { getAnalysisActivity, type MatcherStatus } from "../model/matcher.ts";

import { getObservationLabel, type ObservationMode } from "../model/observation.ts";
import { groupDetectionsByPrimaryCategory } from "../model/categories.ts";
import type { ExplanationLookup } from "../model/explanations.ts";

import { type WorkflowStateType, isWorkflowBusy } from "../model/workflow.ts";
import { formatCompleteness } from "../model/evidence.ts";
import type { TabSyncReasonType } from "./types.ts";

/** Accessors and setters owned by one mounted Solid provider. */
export type Type = ReturnType<typeof create>;

/** Create every signal and memo synchronously under the caller's Solid owner. */
export function create(autoScanDefault: boolean) {
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

  const [clearStoredDataInFlight, setClearStoredDataInFlight] = createSignal(false);

  const [autoScanEnabled, setAutoScanEnabled] = createSignal(autoScanDefault);

  const [autoScanSettingInFlight, setAutoScanSettingInFlight] = createSignal(false);

  const [pendingVisibleTabIdentitySync, setPendingVisibleTabIdentitySync] =
    createSignal<TabSyncReasonType | null>(null);

  const [visibleDetectorSnapshotRevision, setVisibleDetectorSnapshotRevision] = createSignal<DetectionSessionSnapshot | null>(null);

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
  let disposed = false;
  /** Whether pending work has lost its mounted panel owner. */
  const isDisposed = (): boolean => disposed;
  /** Revoke every asynchronous UI apply path before releasing browser listeners. */
  const dispose = (): void => { disposed = true; };
  return { status, setStatus, workflow, setWorkflow, liveUpdateMode, setLiveUpdateMode, notice, setNotice, errorMessage, setErrorMessage, analysis, setAnalysis, lateAddedIds, setLateAddedIds, explanationsByTechnologyId, setExplanationsByTechnologyId, matcherStatus, setMatcherStatus, replayHistory, setReplayHistory, latestReplaySummary, setLatestReplaySummary, evidenceState, setEvidenceState, sessionTarget, setSessionTarget, visibleTabIdentity, setVisibleTabIdentity, analysisRequestTarget, setAnalysisRequestTarget, queuedAnalysisIdentity, setQueuedAnalysisIdentity, queuedManualRefreshIdentity, setQueuedManualRefreshIdentity, clearStoredDataInFlight, setClearStoredDataInFlight, autoScanEnabled, setAutoScanEnabled, autoScanSettingInFlight, setAutoScanSettingInFlight, pendingVisibleTabIdentitySync, setPendingVisibleTabIdentitySync, visibleDetectorSnapshotRevision, setVisibleDetectorSnapshotRevision, analysisRequestInFlight, visibleAnalysisRequestInFlight, queuedVisibleAnalysis, workflowBusy, busy, matcherProgress, analysisActivity, resultCount, groupedResults, hasLateDetections, liveUpdateChipLabel, evidenceCompletenessLabel, isDisposed, dispose };
}
