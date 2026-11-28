import type { DetectionReplayTrace } from "@deepscope/detection/pipeline";
import type { VisibleTabIdentity, AnalyzeVisibleTabOutput } from "../../lib/messaging/index.ts";

import { same as sameTab } from "../../lib/messaging/identity.ts";
import * as replay from "@deepscope/detection/pipeline/replay";
import { buildAnalysisUpdate, formatError } from "../model/update.ts";
import { createVisibleRevisionFromAnalysisResponse, shouldApplyReplayState, type VisibleRevision } from "../model/revision.ts";

import { getReplayHistoryForVisibleAnalysis, shouldPreserveReplayState } from "../model/replay.ts";

import { getMatcherStatus } from "../model/response.ts";

import { normalizeError, type Log } from './logging.ts';
import type { Type as State } from './state.ts';
import type { Type as Browser } from '../browser/panel.ts';

/** Explicit state accessors, browser capabilities and peer operations used by this owner. */
export interface Dependencies {
  readonly state: Pick<State, 'status' | 'setLiveUpdateMode' | 'notice' | 'setNotice' | 'analysis' | 'setAnalysis' | 'lateAddedIds' | 'setLateAddedIds' | 'explanationsByTechnologyId' | 'setExplanationsByTechnologyId' | 'matcherStatus' | 'setMatcherStatus' | 'replayHistory' | 'setReplayHistory' | 'latestReplaySummary' | 'setLatestReplaySummary' | 'setEvidenceState' | 'sessionTarget' | 'setSessionTarget' | 'visibleTabIdentity' | 'resultCount' | 'isDisposed'>;
  readonly browser: Pick<Browser, 'backgroundApi'>;
  readonly logPanelEvent: Log;
}

/** Panel operations with state retained only for the mounted provider lifetime. */
export interface Type {
  readonly getReplayHistory: (identity: VisibleTabIdentity) => Promise<readonly DetectionReplayTrace[]>;
  readonly applyResponse: (response: AnalyzeVisibleTabOutput, options: {
    source: "initial" | "manual" | "auto";
    resetLateMarkers?: boolean;
    identity: VisibleTabIdentity;
  }) => void;
  readonly applyRevision: (revision: VisibleRevision, options: {
    source: "initial" | "manual" | "auto";
    resetLateMarkers?: boolean;
    identity: VisibleTabIdentity;
  }) => void;
}

/** Create the panel's revisions owner without starting asynchronous work. */
export function create(dependencies: Dependencies): Type {
  const { status, setLiveUpdateMode, notice, setNotice, analysis, setAnalysis, lateAddedIds, setLateAddedIds, explanationsByTechnologyId, setExplanationsByTechnologyId, matcherStatus, setMatcherStatus, replayHistory, setReplayHistory, latestReplaySummary, setLatestReplaySummary, setEvidenceState, sessionTarget, setSessionTarget, visibleTabIdentity, resultCount, isDisposed } = dependencies.state;

  const { backgroundApi } = dependencies.browser;

  const { logPanelEvent } = dependencies;

  /** Recover replay details only when the visible revision lacks them. */
  async function hydrateReplay(revision: VisibleRevision, identity: VisibleTabIdentity) {
    if (identity.incognito || !shouldApplyReplayState(revision)) {
      return;
    }

    if (revision.replayHistory) {
      return;
    }

    try {
      const historyResponse = await backgroundApi.getReplayTraceHistory({ url: revision.analysis.url });
      if (isDisposed() || !sameTab(visibleTabIdentity(), identity)) return;
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

  /** Read durable replay history through the background API instead of concrete UI storage access. */
  async function getReplayHistory(identity: VisibleTabIdentity): Promise<readonly DetectionReplayTrace[]> {
    if (isDisposed() || identity.incognito || !sameTab(visibleTabIdentity(), identity)) return [];
    const response = await backgroundApi.getReplayTraceHistory({ url: identity.url });
    if (isDisposed() || !sameTab(visibleTabIdentity(), identity)) return [];
    if (!response.ok) {
      throw new Error(formatError(response.failure));
    }

    return response.value;
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
        ...(!options.identity.incognito ? { hostname: revision.analysis.hostname } : {}),
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
        ? replay.summarize(revision.replayTrace)
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
      ...(!options.identity.incognito ? { hostname: update.analysis.hostname } : {}),
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
        ...(!options.identity.incognito ? { hostname: update.analysis.hostname } : {}),
        addedCount: update.addedDetectionIds.length,
      });
    }

    if (update.notice) {
      setNotice(update.notice);
    }

    void hydrateReplay(revision, options.identity);
  }

  return { getReplayHistory, applyResponse, applyRevision };
}
