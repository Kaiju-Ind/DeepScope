import { onCleanup, onMount } from "solid-js";

import type { VisibleTabIdentity, AnalyzeVisibleTabInput } from "../../lib/messaging/index.ts";

import { same as sameTab } from "../../lib/messaging/identity.ts";

import { formatError } from "../model/update.ts";

import type { TargetPolicy } from "../browser/surface.ts";
import type { TabTarget } from "../browser/tabs.ts";
import * as session from "./routes.ts";

import type { TabSyncReasonType, VisibleTabLookup } from "./types.ts";
import { normalizeError, type Log } from './logging.ts';
import type { Type as State } from './state.ts';
import type { Type as Browser } from '../browser/panel.ts';
import type { Type as Observation } from './observation.ts';
import type { Type as Snapshots } from './snapshots.ts';
import type { Type as Analysis } from './analysis.ts';
import type { Type as Settings } from './settings.ts';

/** Explicit state accessors, browser capabilities and peer operations used by this owner. */
export interface Dependencies {
  readonly state: Pick<State, 'workflow' | 'setWorkflow' | 'setLiveUpdateMode' | 'setNotice' | 'setErrorMessage' | 'analysis' | 'setAnalysis' | 'setLateAddedIds' | 'setExplanationsByTechnologyId' | 'setMatcherStatus' | 'setReplayHistory' | 'setLatestReplaySummary' | 'setEvidenceState' | 'sessionTarget' | 'setSessionTarget' | 'visibleTabIdentity' | 'setVisibleTabIdentity' | 'setQueuedAnalysisIdentity' | 'setQueuedManualRefreshIdentity' | 'setAutoScanEnabled' | 'pendingVisibleTabIdentitySync' | 'setPendingVisibleTabIdentitySync' | 'setVisibleDetectorSnapshotRevision' | 'analysisRequestInFlight' | 'isDisposed' | 'dispose'>;
  readonly browser: Pick<Browser, 'backgroundApi' | 'getAutoScanEnabled' | 'getTabTarget' | 'getWindowId' | 'subscribeTabTargetChanges'>;
  readonly logPanelEvent: Log;
  readonly policy: TargetPolicy;
  readonly targetFollow: Pick<AnalyzeVisibleTabInput, 'follow'>;
  readonly releaseObservationTarget: Observation['releaseObservationTarget'];
  readonly clearSnapshotSubscription: Snapshots['clearSnapshotSubscription'];
  readonly subscribeSnapshots: Snapshots['subscribeSnapshots'];
  readonly resetLifecycleSnapshot: Snapshots['resetLifecycleSnapshot'];
  readonly showStoredAnalysis: Snapshots['showStoredAnalysis'];
  readonly loadAnalysisForTab: Analysis['loadAnalysisForTab'];
  readonly syncObservation: Observation['syncObservation'];
  readonly refreshStatus: Settings['refreshStatus'];
}

/** Panel operations with state retained only for the mounted provider lifetime. */
export interface Type {
  readonly replacementTabPending: (identity: VisibleTabIdentity | null) => boolean;
  readonly waitForCurrentTab: (identity: VisibleTabIdentity | null) => Promise<void>;
  readonly getLookup: () => VisibleTabLookup | null;
  readonly mount: () => void;
}

/** Create the panel's targeting owner without starting asynchronous work. */
export function create(dependencies: Dependencies): Type {
  const { workflow, setWorkflow, setLiveUpdateMode, setNotice, setErrorMessage, analysis, setAnalysis, setLateAddedIds, setExplanationsByTechnologyId, setMatcherStatus, setReplayHistory, setLatestReplaySummary, setEvidenceState, sessionTarget, setSessionTarget, visibleTabIdentity, setVisibleTabIdentity, setQueuedAnalysisIdentity, setQueuedManualRefreshIdentity, setAutoScanEnabled, pendingVisibleTabIdentitySync, setPendingVisibleTabIdentitySync, setVisibleDetectorSnapshotRevision, analysisRequestInFlight, isDisposed, dispose } = dependencies.state;

  const { backgroundApi, getAutoScanEnabled, getTabTarget, getWindowId, subscribeTabTargetChanges } = dependencies.browser;

  const { logPanelEvent, policy, targetFollow, releaseObservationTarget, clearSnapshotSubscription, subscribeSnapshots, resetLifecycleSnapshot, showStoredAnalysis, loadAnalysisForTab, syncObservation, refreshStatus } = dependencies;

  let panelWindowId: number | null = null;

  let visibleTabLookup: VisibleTabLookup | null = null;

  /** A different tab or window invalidates replies before its full identity is available. */
  function replacementTabPending(identity: VisibleTabIdentity | null): boolean {
    if (pendingVisibleTabIdentitySync() === "tab-change") return true;
    const requested = visibleTabLookup?.requestedTarget;
    return visibleTabLookup?.reason === "tab-change" && requested !== undefined &&
      (!identity || requested.tabId !== identity.tabId || requested.windowId !== identity.windowId);
  }

  /** A same-tab signal can be a duplicate update or a new page. Let the browser lookup distinguish them. */
  async function waitForCurrentTab(identity: VisibleTabIdentity | null): Promise<void> {
    while (visibleTabLookup?.reason === "tab-change" && !replacementTabPending(identity)) {
      await visibleTabLookup.completed;
    }
  }

  /** Reset document-owned analysis state before showing another browser tab. */
  function resetTab(identity: VisibleTabIdentity): void {
    const previousSessionTarget = sessionTarget();
    if (previousSessionTarget) void releaseObservationTarget(previousSessionTarget, "tab-change");
    clearSnapshotSubscription();
    subscribeSnapshots(identity, null);
    logPanelEvent("visible-state-reset", {
      ...(visibleTabIdentity()?.incognito === false ? { previousUrl: analysis()?.url } : {}),
      previousResultCount: analysis()?.results.length ?? 0,
      ...(!identity.incognito ? { nextUrl: identity.url } : {}),
      sameVisibleIdentity: sameTab(visibleTabIdentity(), identity),
    });
    setVisibleDetectorSnapshotRevision(null);
    resetLifecycleSnapshot();
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
      ...(!identity.incognito ? { hostname: identity.hostname } : {}),
    });
    resetTab(identity);
    await showStoredAnalysis(identity);
    if (isDisposed() || !sameTab(visibleTabIdentity(), identity)) return;

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
    if (isDisposed() || !sameTab(visibleTabIdentity(), identity)) return;
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
    clearSnapshotSubscription();
    setVisibleDetectorSnapshotRevision(null);
    resetLifecycleSnapshot();
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
    if (isDisposed()) return;

    if (panelWindowId === null) {
      queueTabSync(reason);
      return;
    }

    if (requestedTarget && requestedTarget.windowId !== panelWindowId) return;
    if (visibleTabLookup) {
      queueTabSync(reason);
      return;
    }

    let identity: VisibleTabIdentity | null = null;
    let skipActivation = false;
    const { promise, resolve } = Promise.withResolvers<void>();
    visibleTabLookup = { reason, requestedTarget, completed: promise, settle: resolve };
    try {
      const target = requestedTarget ?? await getTabTarget(panelWindowId, policy);
      // A pinned tab can move to another window; follow it there.
      if (target && policy.kind === "pinned") panelWindowId = target.windowId;
      if (isDisposed()) return;
      if (!target) {
        const message = policy.kind === "pinned"
          ? "The tab this page described was closed."
          : "No active browser tab is available in this window.";
        logPanelEvent("visible-tab-target-unavailable", { reason, windowId: panelWindowId });
        if (!pendingVisibleTabIdentitySync()) resetUnavailableTab(message);
        return;
      }

      const identityResponse = await backgroundApi.getVisibleTabIdentity({
        tabId: target.tabId,
        windowId: target.windowId,
        ...targetFollow,
      });
      if (isDisposed()) return;
      if (!identityResponse.ok) {
        const message = formatError(identityResponse.failure);
        logPanelEvent("visible-tab-identity-unavailable", {
          reason,
          windowId: target.windowId,
          tabId: target.tabId,
          code: identityResponse.failure.code,
          message: identityResponse.failure.message,
        });
        if (identityResponse.failure.code === "NO_ACTIVE_TAB" && requestedTarget) {
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
      if (isDisposed()) return;
      const message = normalizeError(error);
      logPanelEvent("visible-tab-sync-failed", { reason, windowId: panelWindowId, message });
      if (!pendingVisibleTabIdentitySync()) resetUnavailableTab(message);
      return;
    } finally {
      visibleTabLookup = null;
      const pendingReason = pendingVisibleTabIdentitySync();
      if (!isDisposed() && pendingReason) {
        setPendingVisibleTabIdentitySync(null);
        skipActivation = true;
        void syncTab(pendingReason);
      }
      resolve();
    }

    if (isDisposed() || skipActivation || !identity) return;

    if (reason === "tab-change" && analysisRequestInFlight()) {
      logPanelEvent("visible-tab-identity-rendered-during-refresh", {
        windowId: identity.windowId,
        tabId: identity.tabId,
        ...(!identity.incognito ? { hostname: identity.hostname } : {}),
      });
      resetTab(identity);
      await showStoredAnalysis(identity);
      if (isDisposed() || !sameTab(visibleTabIdentity(), identity)) return;
      setWorkflow({ kind: "idle" });
      return;
    }

    await activateTab(identity, reason);
  }

  /** Read the current identity lookup without adding a Promise turn to queued commands. */
  function getLookup(): VisibleTabLookup | null { return visibleTabLookup; }

  /** Attach browser targeting to the current Solid owner and release it on unmount. */
  function mount(): void {
    onMount(() => {
      const unsubscribeTabTargets = subscribeTabTargetChanges({
        /** Read the latest resolved window when browser listeners fire rather than capturing startup state. */
        getWindowId: () => panelWindowId,
        /** Read the current panel target, using null while no tab identity is available. */
        getVisibleTabId: () => visibleTabIdentity()?.tabId ?? null,
        /** Translate browser notifications into the targeting owner's tab-change path without blocking the event listener. */
        sync: (target) => { void syncTab("tab-change", target); },
        closed: session.remove,
        policy,
      });

      void (async () => {
        logPanelEvent("mount");
        try {
          panelWindowId = await getWindowId(policy);
          if (isDisposed()) return;
          logPanelEvent("window-target-resolved", { windowId: panelWindowId });
        } catch (error) {
          if (isDisposed()) return;
          const message = normalizeError(error);
          logPanelEvent("window-target-failed", { message });
          resetUnavailableTab(message);
          return;
        }

        try {
          const enabled = await getAutoScanEnabled();
          if (isDisposed()) return;
          setAutoScanEnabled(enabled);
        } catch (error) {
          if (!isDisposed()) logPanelEvent("auto-scan-setting-read-failed", { message: normalizeError(error) });
        }
        await refreshStatus();
        await syncTab("initial");
      })();

      onCleanup(() => {
        dispose();
        const lookup = visibleTabLookup;
        visibleTabLookup = null;
        lookup?.settle();
        unsubscribeTabTargets();
      });
    });
  }

  return { replacementTabPending, waitForCurrentTab, getLookup, mount };
}
