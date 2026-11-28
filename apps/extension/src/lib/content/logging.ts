import type { collectPageSignals } from "./signals/index.ts";
import * as logging from '../diagnostics/logging.ts';
import * as summary from '../diagnostics/summary.ts';
import type { ContentPageSessionSnapshotTarget } from "../messaging/analysis.ts";
import type { ObservationBatch, ObservationBatchControllerStats } from "@deepscope/detection/observations";
import { diagnosticErrorType } from "@deepscope/detection/privacy/redaction";
import * as url from '../../utils/url.ts';

const contentLogger = logging.get("content");

/** Record a content event with its stable fields and a compact diagnostic summary. */
export function logContentEvent(event: string, details?: Record<string, unknown>): void {
  contentLogger.debug("[kaiju-deepscope][content] {event}{summary}", {
    event,
    summary: summary.format(details, SUMMARY_KEYS, { skipBlank: true }),
    ...(details ?? {}),
  });
}

/** Detail keys shown in each content log line's summary. */
const SUMMARY_KEYS = [
  "tabId",
  "frameId",
  "documentId",
  "sessionId",
  "hostname",
  "status",
  "observationCount",
  "acceptedCount",
  "queuedCount",
  "resultCount",
  "timingTraceId",
] as const;

/** Keep document state available without recording the location of a private page. */
export function summarizeCurrentDocument(incognito: boolean): Record<string, unknown> {
  return {
    ...(!incognito && {
      url: globalThis.location?.href,
      hostname: globalThis.location?.hostname,
    }),
    readyState: globalThis.document?.readyState,
  };
}

/** Omit all persistent target identity from private-context diagnostics. */
export function summarizeSnapshotTarget(
  target: ContentPageSessionSnapshotTarget | undefined,
  incognito: boolean,
): Record<string, unknown> {
  if (incognito || !target) {
    return {};
  }

  return {
    tabId: target.key.tabId,
    frameId: target.key.frameId,
    documentId: target.key.documentId,
    originHash: target.key.originHash,
    urlHash: target.urlHash,
    snapshotHostname: target.hostname,
  };
}

/** Project bounded queue counters without retaining observations or page values. */
export function summarizeObservationStats(
  stats: ObservationBatchControllerStats,
): Record<string, unknown> {
  return {
    queuedCount: stats.queuedCount,
    acceptedCount: stats.acceptedCount,
    duplicateDropCount: stats.duplicateDropCount,
    queueLimitDropCount: stats.queueLimitDropCount,
    stormLimitDropCount: stats.stormLimitDropCount,
    acceptedInStormWindow: stats.acceptedInStormWindow,
  };
}

/** Count observation kinds; only ordinary-context records include the hostname. */
export function summarizeObservationBatch(batch: ObservationBatch | undefined, incognito: boolean): Record<string, unknown> {
  if (!batch) {
    return { observationCount: 0 };
  }

  const kindCounts = batch.observations.reduce<Record<string, number>>((counts, observation) => {
    counts[observation.kind] = (counts[observation.kind] ?? 0) + 1;
    return counts;
  }, {});

  return {
    ...(!incognito && { hostname: batch.target.hostname }),
    observationCount: batch.observations.length,
    observedAt: batch.observedAt,
    kindCounts,
  };
}

/** Keep a stable failure type in place of exception text in private diagnostics. */
export function summarizeContentError(
  error: unknown,
  incognito: boolean,
  fallback = "Unexpected content runtime failure",
): Record<string, unknown> {
  return incognito
    ? { errorType: diagnosticErrorType(error) }
    : { message: error instanceof Error ? error.message : fallback };
}

/** Describe collection size without copying raw DOM, cookie or storage content. */
export function summarizeSignals(
  signals: Awaited<ReturnType<typeof collectPageSignals>>,
  incognito: boolean,
): Record<string, unknown> {
  return {
    ...(!incognito && { hostname: signals.hostname }),
    scriptCount: signals.scripts.length,
    stylesheetCount: signals.stylesheets.length,
    linkCount: signals.links.length,
    resourceCount: signals.resources.length,
    requestCount: signals.requests.length,
    scriptContentCount: signals.scriptContents.length,
    stylesheetContentCount: signals.stylesheetContents.length,
    metaKeyCount: Object.keys(signals.meta).length,
    domSelectorCount: Object.keys(signals.dom.selectors).length,
    jsGlobalCount: Object.keys(signals.jsGlobals).length,
    htmlMatchCount: Object.keys(signals.htmlMatches ?? {}).length,
    textChars: signals.text.length,
    cookieNameCount: Object.keys(signals.cookies).length,
    localStorageKeyCount: Object.keys(signals.storage.localStorage).length,
    sessionStorageKeyCount: Object.keys(signals.storage.sessionStorage).length,
    collectedAt: signals.collectedAt,
  };
}
