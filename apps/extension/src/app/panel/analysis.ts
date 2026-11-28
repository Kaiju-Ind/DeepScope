import type { VisibleTabIdentity, AnalyzeVisibleTabInput } from "../../lib/messaging/index.ts";

import { same as sameTab } from "../../lib/messaging/identity.ts";

import { formatError } from "../model/update.ts";

import { getObservationModeFromSession } from "../model/observation.ts";

import { canApplyResponse, diagnosticResponseUrls, shouldKeepAnalysis } from "../model/response.ts";
import type { WorkflowStateType } from "../model/workflow.ts";

import type { AnalysisCommandInputType } from "./types.ts";
import { normalizeError, diagnosticFailure, diagnosticException, type Log } from './logging.ts';
import type { Type as State } from './state.ts';
import type { Type as Browser } from '../browser/panel.ts';
import type { Type as Targeting } from './targeting.ts';
import type { Type as Snapshots } from './snapshots.ts';
import type { Type as Observation } from './observation.ts';
import type { Type as Settings } from './settings.ts';
import type { Type as Revisions } from './revisions.ts';

/** Explicit state accessors, browser capabilities and peer operations used by this owner. */
export interface Dependencies {
  readonly state: Pick<State, 'status' | 'workflow' | 'setWorkflow' | 'liveUpdateMode' | 'setLiveUpdateMode' | 'setNotice' | 'setErrorMessage' | 'analysis' | 'setLateAddedIds' | 'setMatcherStatus' | 'sessionTarget' | 'setSessionTarget' | 'visibleTabIdentity' | 'analysisRequestTarget' | 'setAnalysisRequestTarget' | 'queuedAnalysisIdentity' | 'setQueuedAnalysisIdentity' | 'queuedManualRefreshIdentity' | 'setQueuedManualRefreshIdentity' | 'visibleDetectorSnapshotRevision' | 'analysisRequestInFlight' | 'isDisposed'>;
  readonly browser: Pick<Browser, 'backgroundApi'>;
  readonly logPanelEvent: Log;
  readonly targetFollow: Pick<AnalyzeVisibleTabInput, 'follow'>;
  readonly getLookup: Targeting['getLookup'];
  readonly subscribeSnapshots: Snapshots['subscribeSnapshots'];
  readonly replacementTabPending: Targeting['replacementTabPending'];
  readonly waitForCurrentTab: Targeting['waitForCurrentTab'];
  readonly releaseObservationTarget: Observation['releaseObservationTarget'];
  readonly refreshStatus: Settings['refreshStatus'];
  readonly applyResponse: Revisions['applyResponse'];
}

/** Panel operations with state retained only for the mounted provider lifetime. */
export interface Type {
  readonly loadAnalysisForTab: (identity: VisibleTabIdentity, options: {
  input: AnalysisCommandInputType;
  resetLateMarkers?: boolean;
  source: "initial" | "manual" | "auto";
}) => Promise<void>;
  readonly refreshObservation: () => Promise<void>;
}

/** Create the panel's analysis owner without starting asynchronous work. */
export function create(dependencies: Dependencies): Type {
  const { status, workflow, setWorkflow, liveUpdateMode, setLiveUpdateMode, setNotice, setErrorMessage, analysis, setLateAddedIds, setMatcherStatus, sessionTarget, setSessionTarget, visibleTabIdentity, analysisRequestTarget, setAnalysisRequestTarget, queuedAnalysisIdentity, setQueuedAnalysisIdentity, queuedManualRefreshIdentity, setQueuedManualRefreshIdentity, visibleDetectorSnapshotRevision, analysisRequestInFlight, isDisposed } = dependencies.state;

  const { backgroundApi } = dependencies.browser;

  const { logPanelEvent, targetFollow, getLookup, subscribeSnapshots, replacementTabPending, waitForCurrentTab, releaseObservationTarget, refreshStatus, applyResponse } = dependencies;

  /** Start the newest queued analysis after the current request releases ownership. */
  async function drainAnalysis(): Promise<void> {
    // Queued commands can use the old visible identity until tab resolution commits the replacement.
    while (getLookup()?.reason === "tab-change") await getLookup()!.completed;
    if (isDisposed() || analysisRequestInFlight()) {
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
    if (isDisposed() || visibleTabIdentity() !== identity) return;
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
    const requestWorkflow: WorkflowStateType | null = isUserVisibleRefresh
      ? { kind: options.source === "manual" ? "refreshing-observed-session" : "queued-initial-analysis", identity }
      : null;
    if (requestWorkflow) setWorkflow(requestWorkflow);

    /** Only the activation that started this request can display its failure or finish its matcher. */
    function showFailure(message: string): void {
      if (visibleTabIdentity() !== identity || analysisRequestTarget() !== identity ||
        replacementTabPending(identity)) return;
      if (isUserVisibleRefresh) setErrorMessage(message);
      setMatcherStatus("idle");
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
        ...targetFollow,
      });
      await waitForCurrentTab(identity);
      if (isDisposed()) {
        if (response.ok) void releaseObservationTarget(response.value.sessionTarget, "panel-close");
        return;
      }

      if (!response.ok) {
        logPanelEvent("analysis-failed", {
          source: options.source,
          ...diagnosticFailure(response.failure, identity.incognito),
        });
        showFailure(formatError(response.failure));
        return;
      }

      if (replacementTabPending(identity)) {
        logPanelEvent("analysis-response-ignored-for-pending-tab-sync", {
          source: options.source,
          ...diagnosticResponseUrls(identity, response.value.analysis.url),
        });
        void releaseObservationTarget(response.value.sessionTarget, "stale-response");
        return;
      }

      if (!canApplyResponse(response.value, identity, visibleTabIdentity())) {
        logPanelEvent("analysis-response-ignored-for-stale-tab", {
          source: options.source,
          ...diagnosticResponseUrls(identity, response.value.analysis.url),
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
      await waitForCurrentTab(identity);
      if (isDisposed()) return;
      logPanelEvent("analysis-request-threw", {
        source: options.source,
        ...diagnosticException(error, identity.incognito),
      });
      showFailure(normalizeError(error));
    } finally {
      if (!isDisposed()) {
        if (analysisRequestTarget() === identity) {
          setAnalysisRequestTarget(null);
        }
        if (requestWorkflow && workflow() === requestWorkflow) {
          setWorkflow({ kind: "idle" });
        }
        await drainAnalysis();
      }
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

  return { loadAnalysisForTab, refreshObservation };
}
