import { onCleanup, type JSX } from "solid-js";

import { PanelContext, type PanelContextType } from "./context.ts";
import type { TargetPolicy } from "../browser/surface.ts";

import { create as createState } from './state.ts';
import { create as createBrowser } from '../browser/panel.ts';
import { create as createLog } from './logging.ts';
import { create as createAnalysis } from './analysis.ts';
import { create as createRevisions } from './revisions.ts';
import { create as createSnapshots } from './snapshots.ts';
import { create as createObservation } from './observation.ts';
import { create as createSettings } from './settings.ts';
import { create as createTargeting } from './targeting.ts';

/** Own detector state and browser targeting across routed page changes. */
export function PanelProvider(props: {
  readonly children: JSX.Element;
  /** Follow the active tab or stay on the tab named by a full-page surface. */
  readonly policy?: TargetPolicy;
}) {
  const policy: TargetPolicy = props.policy ?? { kind: "follow-window" };
  // A pinned full page is active itself; its inspected tab can remain inactive.
  const targetFollow = policy.kind === "pinned" ? { follow: "pinned" as const } : {};
  const browser = createBrowser();
  const logPanelEvent = createLog();
  const state = createState(browser.defaultAutoScanEnabled);
  // Peer callbacks run after all owners exist. Reactive setup stays in this Solid owner.
  const analysisOwner = createAnalysis({
    state,
    browser,
    logPanelEvent,
    targetFollow,
    /** Read targeting's latest lookup after peer construction. */ getLookup: () => targetingOwner.getLookup(),
    /** Let the snapshot owner replace its current subscription. */ subscribeSnapshots: (...args) => snapshotsOwner.subscribeSnapshots(...args),
    /** Read targeting's current replacement state at call time. */ replacementTabPending: (...args) => targetingOwner.replacementTabPending(...args),
    /** Await targeting's active lookup without capturing an old tab. */ waitForCurrentTab: (...args) => targetingOwner.waitForCurrentTab(...args),
    /** Release only the observation owner's exact session. */ releaseObservationTarget: (...args) => observationOwner.releaseObservationTarget(...args),
    /** Read storage/settings state through its owner after wiring. */ refreshStatus: (...args) => settingsOwner.refreshStatus(...args),
    /** Apply responses through the revision owner's stale-result checks. */ applyResponse: (...args) => revisionsOwner.applyResponse(...args),
  });
  const revisionsOwner = createRevisions({
    state,
    browser,
    logPanelEvent,
  });
  const snapshotsOwner = createSnapshots({
    state,
    browser,
    logPanelEvent,
    /** Read storage/settings state through its owner after wiring. */ refreshStatus: (...args) => settingsOwner.refreshStatus(...args),
    /** Route stored revisions through the same state reconciliation owner. */ applyRevision: (...args) => revisionsOwner.applyRevision(...args),
  });
  const observationOwner = createObservation({
    state,
    browser,
    logPanelEvent,
    /** Read targeting's current replacement state at call time. */ replacementTabPending: (...args) => targetingOwner.replacementTabPending(...args),
    /** Await targeting's active lookup without capturing an old tab. */ waitForCurrentTab: (...args) => targetingOwner.waitForCurrentTab(...args),
  });
  const settingsOwner = createSettings({
    state,
    browser,
    /** Reset lifecycle state through the subscription owner. */ resetLifecycleSnapshot: (...args) => snapshotsOwner.resetLifecycleSnapshot(...args),
  });
  const targetingOwner = createTargeting({
    state,
    browser,
    logPanelEvent,
    policy,
    targetFollow,
    /** Release only the observation owner's exact session. */ releaseObservationTarget: (...args) => observationOwner.releaseObservationTarget(...args),
    /** Release the subscription through its sole cleanup owner. */ clearSnapshotSubscription: (...args) => snapshotsOwner.clearSnapshotSubscription(...args),
    /** Let the snapshot owner replace its current subscription. */ subscribeSnapshots: (...args) => snapshotsOwner.subscribeSnapshots(...args),
    /** Reset lifecycle state through the subscription owner. */ resetLifecycleSnapshot: (...args) => snapshotsOwner.resetLifecycleSnapshot(...args),
    /** Restore stored analysis through snapshot revision checks. */ showStoredAnalysis: (...args) => snapshotsOwner.showStoredAnalysis(...args),
    /** Ask the analysis owner to load the resolved target after wiring. */ loadAnalysisForTab: (...args) => analysisOwner.loadAnalysisForTab(...args),
    /** Align observation ownership after targeting resolves the tab. */ syncObservation: (...args) => observationOwner.syncObservation(...args),
    /** Read storage/settings state through its owner after wiring. */ refreshStatus: (...args) => settingsOwner.refreshStatus(...args),
  });
  targetingOwner.mount();

  onCleanup(() => {
    snapshotsOwner.clearSnapshotSubscription();
    const target = state.sessionTarget();
    logPanelEvent(target ? "cleanup-release-observation" : "cleanup-without-owned-session", target
      ? { sessionId: target.sessionId, tabId: target.tabId }
      : undefined);
    if (target) void observationOwner.releaseObservationTarget(target, "panel-close");
  });

  const {
    status, liveUpdateMode, notice, errorMessage,
    analysis, lateAddedIds, explanationsByTechnologyId, matcherStatus,
    replayHistory, latestReplaySummary, evidenceState, visibleTabIdentity,
    clearStoredDataInFlight, autoScanEnabled, autoScanSettingInFlight, busy,
    analysisActivity, resultCount, groupedResults, hasLateDetections,
    liveUpdateChipLabel, evidenceCompletenessLabel,
  } = state;
  const { refreshObservation } = analysisOwner;
  const { stopObservation } = observationOwner;
  const { setAutoScan, clearStoredData } = settingsOwner;
  const { getReplayHistory } = revisionsOwner;
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
