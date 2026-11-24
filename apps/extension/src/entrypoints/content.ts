import { defineProxy } from "comctx";
import { browser } from "wxt/browser";
import type { ContentScriptContext } from "wxt/utils/content-script-context";

import * as artifact from "@/lib/content/artifact";
import { collectPageSignals } from "@/lib/content/collect-page-signals";
import * as observe from "@/lib/content/observe";
import { writeContentPageSessionSnapshot } from "@/lib/content/page-session-snapshots";
import { validatePageSignals } from "@/lib/detection/validate";
import { getDiagnosticBuildId } from "@/lib/diagnostics/build";
import { installDiagnosticCrashHooks } from "@/lib/diagnostics/crash";
import * as logging from '@/lib/diagnostics/logging';
import * as summary from '@/lib/diagnostics/summary';
import type { CollectPageSignalsInput, ContentApi } from "@/lib/messaging";
import {
  CONTENT_RPC_NAMESPACE,
  createContentServerAdapter,
} from "@/lib/messaging";
import { createObservationDirtyNotification } from "@/lib/messaging/observation-notifications";
import type {
  ContentPageSessionSnapshotTarget,
  ObservationStopReason,
} from "@/lib/messaging/analysis";
import { timeAsyncSpan, timeSyncSpan, type TimingContext } from "@/lib/diagnostics/timing";
import {
  normalizePageSignals,
  type ObservationBatch,
  type ObservationBatchControllerStats,
} from "@/lib/observations";
import { errorResponse, ok } from "@/lib/messaging/result";
import { diagnosticErrorType } from "@/lib/privacy/redaction";
import * as url from "@/utils/url";

const contentLogger = logging.get("content");
const DOM_MUTATION_THROTTLE_MS = 1_500;
const CONTENT_RUNTIME_KEY = '__kaijuDeepScopeContentRuntimeV1';

type ContentRuntimeState = {
  readonly buildId?: string;
  dispose(): void;
};

/**
 * Content-script runtime pieces that share one observation timer.
 *
 * The RPC API exposes manual start, stop, and status calls to the background.
 * The local `dispose` function is not part of RPC; it lets WXT invalidation stop
 * the observer with the correct reason without pretending the user clicked Stop.
 */
export type ContentRuntime = {
  /** API registered with the content-script messaging adapter. */
  contentApi: ContentApi;
  /** Stop timers and observers for content-runtime shutdown. */
  dispose(reason: ObservationStopReason): void;
  /** Notify background after the observer queues new facts for detector refresh. */
  publishObservedBatchQueued(event: observe.QueuedBatchEventType): void;
};

function getRuntimeState(): ContentRuntimeState | undefined {
  return (globalThis as unknown as Record<string, ContentRuntimeState | undefined>)[CONTENT_RUNTIME_KEY];
}

function setRuntimeState(state: ContentRuntimeState): void {
  (globalThis as unknown as Record<string, ContentRuntimeState | undefined>)[CONTENT_RUNTIME_KEY] = state;
}

function clearRuntimeState(state: ContentRuntimeState): void {
  const runtime = globalThis as unknown as Record<string, ContentRuntimeState | undefined>;
  if (runtime[CONTENT_RUNTIME_KEY] === state) {
    delete runtime[CONTENT_RUNTIME_KEY];
  }
}

function logContentEvent(event: string, details?: Record<string, unknown>): void {
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
function summarizeCurrentDocument(incognito: boolean): Record<string, unknown> {
  return {
    ...(!incognito && {
      url: globalThis.location?.href,
      hostname: globalThis.location?.hostname,
    }),
    readyState: globalThis.document?.readyState,
  };
}

function summarizeSnapshotTarget(
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

function summarizeObservationStats(
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

function summarizeObservationBatch(batch: ObservationBatch | undefined, incognito: boolean): Record<string, unknown> {
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

async function notifyBackgroundObservationDirty(event: observe.QueuedBatchEventType, incognito: boolean): Promise<void> {
  const message = createObservationDirtyNotification(event.session, event.observedAt);
  if (!message) {
    return;
  }

  try {
    await browser.runtime.sendMessage(message);
  } catch (error) {
    logContentEvent("observation-dirty-notify-failed", {
      sessionId: event.session.sessionId,
      ...summarizeContentError(error, incognito, "Background notification failed"),
    });
  }
}

/** Keep a stable failure type in place of exception text in private diagnostics. */
function summarizeContentError(
  error: unknown,
  incognito: boolean,
  fallback = "Unexpected content runtime failure",
): Record<string, unknown> {
  return incognito
    ? { errorType: diagnosticErrorType(error) }
    : { message: error instanceof Error ? error.message : fallback };
}

function summarizeSignals(
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

/**
 * Content entrypoint boundary: collect and validate before returning to the
 * background service worker. Detection stays out of the page context.
 */
async function collectSignals(
  input: CollectPageSignalsInput,
  observedSignals: observe.SignalsType,
  incognito: boolean,
) {
  try {
    const timingContext: TimingContext = {
      traceId: input.timingTraceId,
      surface: 'content',
      incognito,
      details: {
        ...(!incognito && { hostname: globalThis.location?.hostname }),
        tier: input.tier ?? 'initial',
      },
    };
    logContentEvent("collect-start", {
      ...(!incognito && { hostname: globalThis.location?.hostname }),
      includeHtml: Boolean(input.includeHtml),
      includeText: Boolean(input.includeText),
      includeScriptContent: Boolean(input.includeScriptContent),
      includeStylesheetContent: Boolean(input.includeStylesheetContent),
      domSelectorCount: input.domSelectorPlan?.selectors.length ?? 0,
      domUnroutedSelectorCount: input.domSelectorPlan?.selectorsWithoutRoute.length ?? 0,
      htmlProbeCount: input.htmlProbeList?.length ?? 0,
      timingTraceId: input.timingTraceId,
    });

    const snapshot = await timeAsyncSpan(
      'content.observed-signals.snapshot',
      timingContext,
      () => observedSignals.snapshot({
        includeScriptContent: input.includeScriptContent,
        includeStylesheetContent: input.includeStylesheetContent,
        domSelectorPlan: input.domSelectorPlan,
      }),
      (value) => ({
        scriptCount: value.scripts?.length ?? 0,
        stylesheetCount: value.stylesheets?.length ?? 0,
        resourceCount: value.resources?.length ?? 0,
      }),
    );
    const signals = await timeAsyncSpan(
      'content.collect-signals.collect-page-signals',
      timingContext,
      () => collectPageSignals(input, snapshot, incognito),
      (value) => summarizeSignals(value, incognito),
    );
    const validationError = timeSyncSpan(
      'content.collect-signals.validate-page-signals',
      timingContext,
      () => validatePageSignals(signals),
      (value) => ({ valid: value === null }),
    );

    if (validationError) {
      logContentEvent("collect-validation-failed", {
        code: "PAYLOAD_TOO_LARGE",
        ...(!incognito && { hostname: signals.hostname, error: validationError }),
      });
      return errorResponse("PAYLOAD_TOO_LARGE", validationError);
    }

    logContentEvent("collect-success", summarizeSignals(signals, incognito));

    return ok(signals);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to collect page signals";
    const stack = error instanceof Error ? error.stack : undefined;
    logContentEvent("collect-failed", {
      ...(incognito
        ? { errorType: diagnosticErrorType(error) }
        : { hostname: globalThis.location?.hostname, message }),
    });
    return errorResponse("DETECTION_FAILED", message, stack);
  }
}

/**
 * Collect the current document and return the event-pipeline input shape.
 *
 * The content script owns live document access, including bounded selector
 * matching. The RPC contract returns normalized observations rather than DOM
 * handles or a serialized document copy.
 */
async function collectInitialObservationBatch(
  input: CollectPageSignalsInput,
  observedSignals: observe.SignalsType,
  incognito: boolean,
) {
  const timingContext: TimingContext = {
    traceId: input.timingTraceId,
    surface: 'content',
    incognito,
    details: {
      ...(!incognito && { hostname: globalThis.location?.hostname }),
      tier: input.tier ?? 'initial',
    },
  };
  const response = await timeAsyncSpan(
    'content.collect-observation-batch.collect-signals',
    timingContext,
    () => collectSignals(input, observedSignals, incognito),
    (value) => ({ ok: value.ok }),
  );
  if (!response.ok) {
    return response;
  }

  const batch = timeSyncSpan(
    'content.collect-observation-batch.normalize-page-signals',
    timingContext,
    () => normalizePageSignals(response.value, {
      collector: "content-snapshot",
      interface: "extension",
      observedAt: response.value.collectedAt,
    }),
    (value) => ({ observationCount: value.observations.length }),
  );
  logContentEvent("observation-batch-collected", {
    ...summarizeCurrentDocument(incognito),
    ...summarizeObservationBatch(batch, incognito),
    timingTraceId: input.timingTraceId,
    tier: input.tier ?? "initial",
  });

  return ok({ batch });
}

/**
 * Build the content-script runtime around one observation store.
 *
 * Tests and the WXT entrypoint both use this factory so timer cleanup follows the
 * same path in normal RPC calls and content-script invalidation. Invalidation is
 * a browser lifecycle event, not a manual stop, so the returned `dispose` method
 * records the real stop reason on the observed-signal store.
 *
 * The entrypoint supplies Chrome's fixed incognito context for diagnostics and
 * lifecycle snapshot writes. The default false applies to ordinary documents.
 */
export function createContentRuntime(observedSignals: observe.SignalsType, incognito = false): ContentRuntime {
  let observationExpiryTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
  let activeSnapshotTarget: ContentPageSessionSnapshotTarget | undefined;
  /** Serialize lifecycle writes so start and stop cannot settle out of order. */
  let snapshotWriteQueue: Promise<void> = Promise.resolve();

  function clearObservationExpiry() {
    if (observationExpiryTimer !== undefined) {
      globalThis.clearTimeout(observationExpiryTimer);
      observationExpiryTimer = undefined;
    }
  }

  /**
   * Publish one durable lifecycle transition for the current document session.
   *
   * Late observation batches travel through the background dirty notification and
   * do not rewrite the lifecycle record. Serializing these writes preserves start
   * before stop ordering without putting storage latency on the RPC response path.
   */
  function publishContentSnapshot(
    status: "observing" | "stopped",
    details: { readonly observedAt?: number; readonly reason?: string } = {},
  ): void {
    const target = activeSnapshotTarget;
    if (incognito || !target) return;

    snapshotWriteQueue = snapshotWriteQueue.then(async () => {
      await writeContentPageSessionSnapshot({
        target,
        status,
        observedAt: details.observedAt,
        reason: details.reason,
      });
    }).catch((error) => {
      logContentEvent("snapshot-write-failed", {
        status,
        ...summarizeContentError(error, incognito),
      });
    });
  }

  const contentApi: ContentApi = {
    async collectObservationBatch(input) {
      return collectInitialObservationBatch(input, observedSignals, incognito);
    },

    async beginObservationSession(input) {
      clearObservationExpiry();

      logContentEvent("observation-start", {
        ...summarizeCurrentDocument(incognito),
        ...summarizeSnapshotTarget(input.snapshotTarget, incognito),
        sessionId: input.sessionId,
        ...(!incognito && { expectedUrl: input.expectedUrl }),
        durationMs: input.policy.durationMs,
        throttleMs: input.policy.throttleMs,
        maxPendingNodes: input.policy.maxPendingNodes,
        maxMutations: input.policy.maxMutations,
        includeScriptContent: input.includeScriptContent === true,
        includeStylesheetContent: input.includeStylesheetContent === true,
        domSelectorCount: input.domSelectorPlan?.selectors.length ?? 0,
      });

      activeSnapshotTarget = input.snapshotTarget;
      const session = observedSignals.beginObservationSession({
        sessionId: input.sessionId,
        expectedUrl: input.expectedUrl,
        durationMs: input.policy.durationMs,
        maxPendingNodes: input.policy.maxPendingNodes,
        maxMutations: input.policy.maxMutations,
        ...(input.includeScriptContent === undefined ? {} : { includeScriptContent: input.includeScriptContent }),
        ...(input.includeStylesheetContent === undefined ? {} : { includeStylesheetContent: input.includeStylesheetContent }),
        domSelectorPlan: input.domSelectorPlan,
      });
      publishContentSnapshot("observing", {
        observedAt: session.startedAt,
        reason: "observation-session-started",
      });

      observationExpiryTimer = globalThis.setTimeout(() => {
        clearObservationExpiry();
        logContentEvent("observation-expired", {
          ...(!incognito && { hostname: globalThis.location?.hostname }),
          sessionId: input.sessionId,
        });
        const expiredSession = observedSignals.stopObservationSession("expired");
        publishContentSnapshot("stopped", {
          observedAt: expiredSession.lastObservedAt,
          reason: expiredSession.stopReason ?? "expired",
        });
        activeSnapshotTarget = undefined;
      }, input.policy.durationMs);

      logContentEvent("observation-active", {
        ...summarizeCurrentDocument(incognito),
        ...summarizeSnapshotTarget(activeSnapshotTarget, incognito),
        sessionId: session.sessionId,
        status: session.status,
        expiresAt: session.expiresAt,
      });

      return ok(session);
    },

    async flushObservationBatch() {
      const flush = await observedSignals.flushObservationBatch();
      logContentEvent("observation-flush", {
        ...summarizeCurrentDocument(incognito),
        ...summarizeSnapshotTarget(activeSnapshotTarget, incognito),
        ...summarizeObservationBatch(flush.batch, incognito),
        ...summarizeObservationStats(flush.stats),
        sessionId: flush.session.sessionId,
        status: flush.session.status,
        pendingMutationCount: flush.session.pendingMutationCount,
      });
      return ok(flush);
    },

    async stopObservationSession(input) {
      const active = observedSignals.status();
      if (active.sessionId !== input.sessionId || !active.expectedUrl || !url.sameDocument(active.expectedUrl, input.expectedUrl)) {
        return errorResponse(
          "OBSERVATION_SESSION_UNAVAILABLE",
          "The requested observation session no longer owns this content runtime.",
        );
      }

      clearObservationExpiry();
      const session = observedSignals.stopObservationSession("manual");
      publishContentSnapshot("stopped", {
        observedAt: session.lastObservedAt,
        reason: session.stopReason ?? "manual",
      });
      activeSnapshotTarget = undefined;
      logContentEvent("observation-stopped", {
        ...summarizeCurrentDocument(incognito),
        ...summarizeSnapshotTarget(activeSnapshotTarget, incognito),
        sessionId: session.sessionId,
        status: session.status,
        stopReason: session.stopReason,
      });
      return ok(session);
    },

    async getObservationSessionState() {
      const session = observedSignals.status();
      logContentEvent("observation-state-read", {
        ...summarizeCurrentDocument(incognito),
        ...summarizeSnapshotTarget(activeSnapshotTarget, incognito),
        sessionId: session.sessionId,
        status: session.status,
        pendingMutationCount: session.pendingMutationCount,
        lastObservedAt: session.lastObservedAt,
        stopReason: session.stopReason,
      });
      return ok(session);
    },
  };

  return {
    contentApi,
    publishObservedBatchQueued(event) {
      logContentEvent("observation-batch-queued", {
        ...summarizeCurrentDocument(incognito),
        ...summarizeSnapshotTarget(activeSnapshotTarget, incognito),
        ...summarizeObservationStats(event.stats),
        sessionId: event.session.sessionId,
        status: event.session.status,
        observedAt: event.observedAt,
        pendingMutationCount: event.session.pendingMutationCount,
      });
      void notifyBackgroundObservationDirty(event, incognito);
    },
    dispose(reason) {
      clearObservationExpiry();
      observedSignals.disconnect(reason);
      publishContentSnapshot("stopped", { reason });
      activeSnapshotTarget = undefined;
    },
  };
}

/**
 * Build only the RPC API for callers that do not need runtime disposal control.
 * Diagnostics and snapshot writes use the supplied privacy context. False is the
 * ordinary-document default. The RPC payload does not select that context.
 */
export function createContentApi(observedSignals: observe.SignalsType, incognito = false): ContentApi {
  return createContentRuntime(observedSignals, incognito).contentApi;
}

const [provideContentApi] = defineProxy(
  (createApi: () => ContentApi) => createApi(),
  {
    namespace: CONTENT_RPC_NAMESPACE,
    heartbeatCheck: false,
    transfer: false,
  },
);

/** Connect the observation owner and diagnostics to one WXT runtime. */
function startContentRuntime(ctx: ContentScriptContext, incognito: boolean): void {
  logging.configure("content");
  const crashHooks = installDiagnosticCrashHooks("content", {
    captureGlobalError: false,
    includeErrorDetails: !incognito,
  });
  const buildId = getDiagnosticBuildId();
  const existingRuntime = getRuntimeState();
  if (existingRuntime?.buildId === buildId) {
    logContentEvent("runtime-already-active", {
      ...summarizeCurrentDocument(incognito),
      buildId,
    });
    return;
  }

  if (existingRuntime) {
    try {
      existingRuntime.dispose();
    } catch (error) {
      clearRuntimeState(existingRuntime);
      logContentEvent("stale-runtime-dispose-failed", {
        ...summarizeCurrentDocument(incognito),
        buildId,
        ...summarizeContentError(error, incognito),
      });
    }
  }

  logContentEvent("runtime-ready", {
    ...summarizeCurrentDocument(incognito),
    throttleMs: DOM_MUTATION_THROTTLE_MS,
  });

  let runtime: ContentRuntime | undefined;
  const observedSignals = observe.create({
    throttleMs: DOM_MUTATION_THROTTLE_MS,
    incognito,
    onObservationBatchQueued(event) {
      runtime?.publishObservedBatchQueued(event);
    },
  });
  const contentRuntime = createContentRuntime(observedSignals, incognito);
  runtime = contentRuntime;
  const { contentApi } = contentRuntime;
  artifact.publish({
    contentApi,
    collectPageSignals: (input) => collectPageSignals(input, undefined, incognito),
    dispose: (reason) => contentRuntime.dispose(reason),
  });

  const state: ContentRuntimeState = {
    buildId,
    dispose() {
      logContentEvent("runtime-dispose", {
        ...summarizeCurrentDocument(incognito),
      });
      try {
        contentRuntime.dispose("invalidated");
      } finally {
        clearRuntimeState(state);
      }
    },
  };

  setRuntimeState(state);
  provideContentApi(createContentServerAdapter(), () => contentApi);

  ctx.onInvalidated(() => {
    try {
      state.dispose();
    } catch (error) {
      if (!incognito) throw error;
      logContentEvent("runtime-dispose-failed", summarizeContentError(error, incognito));
    } finally {
      crashHooks.dispose();
    }
  });
}

export default defineContentScript({
  registration: "runtime",
  runAt: "document_idle",
  noScriptStartedPostMessage: true,
  main(ctx) {
    const incognito = browser.extension?.inIncognitoContext === true;
    try {
      startContentRuntime(ctx, incognito);
    } catch (error) {
      if (!incognito) throw error;
      logContentEvent("runtime-start-failed", summarizeContentError(error, incognito));
      // WXT logs startup exceptions before returning them to the injection caller.
      throw new Error("DeepScope content runtime failed to start.");
    }
  },
});
