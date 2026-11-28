import type { VisibleTabIdentity, ObservationSessionTarget } from "../../lib/messaging/index.ts";

import { formatError } from "../model/update.ts";

import { getObservationModeFromSession } from "../model/observation.ts";

import { sameObservationTarget } from "../model/response.ts";
import type { WorkflowStateType } from "../model/workflow.ts";

import { normalizeError, diagnosticFailure, diagnosticException, type Log } from './logging.ts';
import type { Type as State } from './state.ts';
import type { Type as Browser } from '../browser/panel.ts';
import type { Type as Targeting } from './targeting.ts';

/** Explicit state accessors, browser capabilities and peer operations used by this owner. */
export interface Dependencies {
  readonly state: Pick<State, 'status' | 'workflow' | 'setWorkflow' | 'setLiveUpdateMode' | 'setNotice' | 'setErrorMessage' | 'sessionTarget' | 'setSessionTarget' | 'visibleTabIdentity' | 'isDisposed'>;
  readonly browser: Pick<Browser, 'backgroundApi'>;
  readonly logPanelEvent: Log;
  readonly replacementTabPending: Targeting['replacementTabPending'];
  readonly waitForCurrentTab: Targeting['waitForCurrentTab'];
}

/** Panel operations with state retained only for the mounted provider lifetime. */
export interface Type {
  readonly releaseObservationTarget: (target: ObservationSessionTarget | null | undefined, reason: "tab-change" | "stale-response" | "panel-close" | "unavailable-tab") => Promise<void>;
  readonly syncObservation: (identity: VisibleTabIdentity) => Promise<void>;
  readonly stopObservation: () => Promise<void>;
}

/** Create the panel's observation owner without starting asynchronous work. */
export function create(dependencies: Dependencies): Type {
  const { status, workflow, setWorkflow, setLiveUpdateMode, setNotice, setErrorMessage, sessionTarget, setSessionTarget, visibleTabIdentity, isDisposed } = dependencies.state;

  const { backgroundApi } = dependencies.browser;

  const { logPanelEvent, replacementTabPending, waitForCurrentTab } = dependencies;

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
          : diagnosticFailure(response.failure, target.incognito)),
      });
    } catch (error) {
      logPanelEvent("observation-release-threw", {
        reason,
        sessionId: target.sessionId,
        tabId: target.tabId,
        ...diagnosticException(error, target.incognito),
      });
    }
  }

  /** Reconcile content observation state after analysis or a tab change. */
  async function syncObservation(identity: VisibleTabIdentity) {
    const target = sessionTarget();
    /** Reject late observation results after disposal, retargeting, replacement or a change of exact session ownership. */
    function ownsSession(): boolean {
      return !isDisposed() && visibleTabIdentity() === identity && !replacementTabPending(identity) &&
        sameObservationTarget(target, sessionTarget());
    }
    try {
      const response = target ? await backgroundApi.getObservationSessionState(target) : null;
      await waitForCurrentTab(identity);
      if (!ownsSession()) return;
      if (!response) {
        setLiveUpdateMode("unknown");
        return;
      }

      if (!response.ok) {
        logPanelEvent("observation-sync-unavailable", diagnosticFailure(response.failure, identity.incognito));
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
      await waitForCurrentTab(identity);
      if (!ownsSession()) return;
      setLiveUpdateMode("unknown");
      setErrorMessage(normalizeError(error));
    }
  }

  /** Stop the live observation session attached to the visible tab. */
  async function stopObservation() {
    const target = sessionTarget();
    const identity = visibleTabIdentity();
    const stopping: WorkflowStateType = { kind: "refreshing-observed-session", identity };
    setWorkflow(stopping);
    /** A late Stop reply can update only the workflow and observation session that requested it. */
    function ownsReply(): boolean {
      return !isDisposed() && workflow() === stopping && visibleTabIdentity() === identity &&
        !replacementTabPending(identity) && sameObservationTarget(target, sessionTarget());
    }
    setErrorMessage("");
    setNotice(null);
    try {
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
      await waitForCurrentTab(identity);
      if (!ownsReply()) return;
      if (!response.ok) {
        logPanelEvent("observation-stop-failed", diagnosticFailure(response.failure, target.incognito));
        setErrorMessage(formatError(response.failure));
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
      await waitForCurrentTab(identity);
      if (ownsReply()) setErrorMessage(normalizeError(error));
    } finally {
      if (!isDisposed() && workflow() === stopping) setWorkflow({ kind: "idle" });
    }
  }

  return { releaseObservationTarget, syncObservation, stopObservation };
}
