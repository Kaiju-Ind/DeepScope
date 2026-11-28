import type { DetectionSessionKey, DetectionSessionSnapshot } from "../../lib/storage/session.ts";

import type { VisibleTabIdentity } from "../../lib/messaging/index.ts";

import { same as sameTab } from "../../lib/messaging/identity.ts";

import { shouldApplySnapshotRevision } from "../model/revision.ts";
import { getMatcherStatusFromSnapshot } from "../model/matcher.ts";

import { getObservationModeFromSnapshot } from "../model/observation.ts";

import { createStoredVisibleRevision, isNewerSnapshotRevision } from "../browser/stored.ts";

import { normalizeError, type Log } from './logging.ts';
import type { Type as State } from './state.ts';
import type { Type as Browser } from '../browser/panel.ts';
import type { Type as Settings } from './settings.ts';
import type { Type as Revisions } from './revisions.ts';

/** Explicit state accessors, browser capabilities and peer operations used by this owner. */
export interface Dependencies {
  readonly state: Pick<State, 'status' | 'setWorkflow' | 'setLiveUpdateMode' | 'setNotice' | 'analysis' | 'setAnalysis' | 'setLateAddedIds' | 'setExplanationsByTechnologyId' | 'setMatcherStatus' | 'setReplayHistory' | 'setLatestReplaySummary' | 'setEvidenceState' | 'setSessionTarget' | 'visibleTabIdentity' | 'visibleDetectorSnapshotRevision' | 'setVisibleDetectorSnapshotRevision' | 'resultCount' | 'isDisposed'>;
  readonly browser: Pick<Browser, 'getStoredAnalysis' | 'subscribeToSnapshotRevisions'>;
  readonly logPanelEvent: Log;
  readonly refreshStatus: Settings['refreshStatus'];
  readonly applyRevision: Revisions['applyRevision'];
}

/** Panel operations with state retained only for the mounted provider lifetime. */
export interface Type {
  readonly subscribeSnapshots: (identity: VisibleTabIdentity, exactSessionKey: DetectionSessionKey | null) => void;
  readonly showStoredAnalysis: (identity: VisibleTabIdentity) => Promise<boolean>;
  readonly clearSnapshotSubscription: () => void;
  readonly resetLifecycleSnapshot: () => void;
}

/** Create the panel's snapshots owner without starting asynchronous work. */
export function create(dependencies: Dependencies): Type {
  const { status, setWorkflow, setLiveUpdateMode, setNotice, analysis, setAnalysis, setLateAddedIds, setExplanationsByTechnologyId, setMatcherStatus, setReplayHistory, setLatestReplaySummary, setEvidenceState, setSessionTarget, visibleTabIdentity, visibleDetectorSnapshotRevision, setVisibleDetectorSnapshotRevision, resultCount, isDisposed } = dependencies.state;

  const { getStoredAnalysis, subscribeToSnapshotRevisions } = dependencies.browser;

  const { logPanelEvent, refreshStatus, applyRevision } = dependencies;

  /** Latest content-owned lifecycle revision. It is not reactive because no UI renders the revision itself. */
  let visibleLifecycleSnapshotRevision: DetectionSessionSnapshot | null = null;

  let unsubscribeSnapshotRevisions: (() => void) | undefined;

  let subscribedSnapshotSessionKey: DetectionSessionKey | null = null;

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
    if (identity.incognito) return;
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
    if (isDisposed() || !sameTab(visibleTabIdentity(), identity)) {
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
      const stored = await getStoredAnalysis(identity);
      if (isDisposed() || !sameTab(visibleTabIdentity(), identity)) return false;
      if (!stored) {
        const current = analysis();
        const preservingCurrentTabAnalysis = current?.url === identity.url;
        logPanelEvent("stored-analysis-miss", {
          ...(!identity.incognito ? { hostname: identity.hostname } : {}),
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
      if (isDisposed() || !sameTab(visibleTabIdentity(), identity)) return false;
      logPanelEvent("stored-analysis-render-failed", { message: normalizeError(error) });
      return false;
    } finally {
      if (!isDisposed() && sameTab(visibleTabIdentity(), identity)) setWorkflow({ kind: "idle" });
    }
  }

  /** Remove the current storage listener before changing its exact document target. */
  function clearSnapshotSubscription(): void {
    unsubscribeSnapshotRevisions?.();
    unsubscribeSnapshotRevisions = undefined;
    subscribedSnapshotSessionKey = null;
  }

  /** Forget the content-owned revision when detector data or the visible document resets. */
  function resetLifecycleSnapshot(): void { visibleLifecycleSnapshotRevision = null; }

  return { subscribeSnapshots, showStoredAnalysis, clearSnapshotSubscription, resetLifecycleSnapshot };
}
