import type { SiteAnalysis } from "@deepscope/detection/types";

import type { VisibleTabIdentity, AnalyzeVisibleTabOutput, ObservationSessionTarget } from "../../lib/messaging/index.ts";

import { isVisibleRevisionPending, type VisibleRevision } from "./revision.ts";
import type { MatcherStatus } from "./matcher.ts";

/**
 * Translate an analysis response into the matcher lane without relying on count alone.
 *
 * Cache hits and stored snapshots are already completed work, while cache misses
 * without a replay trace represent queued matcher work that will publish storage
 * revisions later. Auto-applied storage revisions keep the status chosen from the
 * snapshot itself so final replay-backed snapshots can clear the busy state.
 */
export function getMatcherStatus(
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

/** Compare the content session handle returned by analysis before applying a session-state reply. */
export function sameObservationTarget(left: ObservationSessionTarget | null, right: ObservationSessionTarget | null): boolean {
  return left === right || Boolean(
    left && right && left.tabId === right.tabId && left.sessionId === right.sessionId &&
      left.expectedUrl === right.expectedUrl && left.incognito === right.incognito,
  );
}

/** True when a background response still belongs to the tab the side panel is rendering. */
export function canApplyResponse(
  response: AnalyzeVisibleTabOutput,
  requestedIdentity: VisibleTabIdentity | null,
  visibleIdentity: VisibleTabIdentity | null,
): boolean {
  if (!requestedIdentity) {
    return true;
  }

  return response.analysis.url === requestedIdentity.url && visibleIdentity === requestedIdentity;
}

/** Only include a returned page address when it belongs to the known ordinary request. */
export function diagnosticResponseUrls(identity: VisibleTabIdentity, responseUrl: string) {
  if (identity.incognito) return {};
  return {
    expectedUrl: identity.url,
    ...(responseUrl === identity.url ? { responseUrl } : {}),
  };
}

/** Whether a background command only registered queued matcher work. */
export function isQueuedResponse(response: AnalyzeVisibleTabOutput): boolean {
  return (
    response.enrichment?.status === "pending" &&
    response.analysis.results.length === 0 &&
    !response.replayTrace &&
    response.snapshot.status !== "hit"
  );
}

/** Whether a queued placeholder should preserve the richer analysis already visible. */
export function shouldKeepAnalysis(
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
