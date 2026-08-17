import { defineProxy } from "comctx";
import { browser } from "wxt/browser";

import { collectPageSignals } from "@/lib/content/collect-page-signals";
import {
  createObservedPageSignals,
  type ObservedPageSignals,
  type ObservedPageSignalsQueuedBatchEvent,
} from "@/lib/content/observed-page-signals";
import { writeContentPageSessionSnapshot } from "@/lib/content/page-session-snapshots";
import { validatePageSignals } from "@/lib/detection/validate";
import { installDiagnosticCrashHooks } from "@/lib/diagnostics/crash";
import { configureKaijuSiteScopeLogging, getKaijuSiteScopeLogger } from "@/lib/diagnostics/logging";
import type { CollectPageSignalsInput, ContentApi } from "@/lib/messaging";
import {
  CONTENT_RPC_NAMESPACE,
  createContentServerAdapter,
} from "@/lib/messaging";
import { createObservationDirtyNotification } from "@/lib/messaging/observation-notifications";
import type {
  ContentPageSessionSnapshotTarget,
  ObservationStopReason,
} from "@/lib/contracts/analysis";
import { timeAsyncSpan, timeSyncSpan, type TimingContext } from "@/lib/diagnostics/timing";
import {
  normalizePageSignals,
  type ObservationBatch,
  type ObservationBatchControllerStats,
} from "@/lib/observations";
import { errorResponse, ok } from "@/lib/shared/result";

configureKaijuSiteScopeLogging("content");
installDiagnosticCrashHooks("content", { captureGlobalError: false });

const contentLogger = getKaijuSiteScopeLogger("content");
const DOM_MUTATION_THROTTLE_MS = 1_500;
const CONTENT_RUNTIME_KEY = '__kaijuSiteScopeContentRuntimeV1';

type ContentRuntimeState = {
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
  /** Publish a durable lifecycle revision after the observer queues new facts. */
  publishObservedBatchQueued(event: ObservedPageSignalsQueuedBatchEvent): void;
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
  contentLogger.debug("[kaiju-site-scope][content] {event}{summary}", {
    event,
    summary: formatContentLogSummary(details),
    ...(details ?? {}),
  });
}

function formatContentLogSummary(details?: Record<string, unknown>): string {
  if (!details) {
    return "";
  }

  const fields: string[] = [];
  const keys = [
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
  ];
  for (const key of keys) {
    const value = details[key];
    if (value !== undefined && value !== null && value !== "") {
      fields.push(`${key}=${String(value)}`);
    }
  }

  return fields.length ? ` ${fields.join(" ")}` : "";
}

function summarizeCurrentDocument(): Record<string, unknown> {
  return {
    url: globalThis.location?.href,
    hostname: globalThis.location?.hostname,
    readyState: globalThis.document?.readyState,
  };
}

function summarizeSnapshotTarget(
  target: ContentPageSessionSnapshotTarget | undefined,
): Record<string, unknown> {
  if (!target) {
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

function summarizeObservationBatch(batch: ObservationBatch | undefined): Record<string, unknown> {
  if (!batch) {
    return { observationCount: 0 };
  }

  const kindCounts = batch.observations.reduce<Record<string, number>>((counts, observation) => {
    counts[observation.kind] = (counts[observation.kind] ?? 0) + 1;
    return counts;
  }, {});

  return {
    hostname: batch.target.hostname,
    observationCount: batch.observations.length,
    observedAt: batch.observedAt,
    kindCounts,
  };
}

function notifyBackgroundObservationDirty(event: ObservedPageSignalsQueuedBatchEvent): void {
  const message = createObservationDirtyNotification(event.session, event.observedAt);
  if (!message) {
    return;
  }

  void browser.runtime.sendMessage(message).catch((error: unknown) => {
    logContentEvent("observation-dirty-notify-failed", {
      sessionId: event.session.sessionId,
      message: error instanceof Error ? error.message : "Background notification failed",
    });
  });
}

function describeContentError(error: unknown): string {
  return error instanceof Error ? error.message : "Unexpected content runtime failure";
}

function summarizeSignals(signals: Awaited<ReturnType<typeof collectPageSignals>>): Record<string, unknown> {
  return {
    hostname: signals.hostname,
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
  observedSignals: ObservedPageSignals,
) {
  try {
    const timingContext: TimingContext = {
      traceId: input.timingTraceId,
      surface: 'content',
      details: {
        hostname: globalThis.location?.hostname,
        tier: input.tier ?? 'initial',
      },
    };
    logContentEvent("collect-start", {
      hostname: globalThis.location?.hostname,
      includeHtml: Boolean(input.includeHtml),
      includeText: Boolean(input.includeText),
      includeScriptContent: Boolean(input.includeScriptContent),
      includeStylesheetContent: Boolean(input.includeStylesheetContent),
      selectorProbeCount: input.selectorProbeList.length,
      domCandidateSelectorCount: input.domSelectorPlan?.candidateSelector ? 1 : 0,
      htmlProbeCount: input.htmlProbeList?.length ?? 0,
      timingTraceId: input.timingTraceId,
    });

    const snapshot = await timeAsyncSpan(
      'content.observed-signals.snapshot',
      timingContext,
      () => observedSignals.snapshot({
        includeScriptContent: input.includeScriptContent,
        includeStylesheetContent: input.includeStylesheetContent,
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
      () => collectPageSignals(input, snapshot),
      (value) => summarizeSignals(value),
    );
    const validationError = timeSyncSpan(
      'content.collect-signals.validate-page-signals',
      timingContext,
      () => validatePageSignals(signals),
      (value) => ({ valid: value === null }),
    );

    if (validationError) {
      logContentEvent("collect-validation-failed", {
        hostname: signals.hostname,
        error: validationError,
      });
      return errorResponse("PAYLOAD_TOO_LARGE", validationError);
    }

    logContentEvent("collect-success", summarizeSignals(signals));

    return ok(signals);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to collect page signals";
    const stack = error instanceof Error ? error.stack : undefined;
    logContentEvent("collect-failed", {
      hostname: globalThis.location?.hostname,
      message,
    });
    return errorResponse("DETECTION_FAILED", message, stack);
  }
}

/**
 * Collect the current document and return the event-pipeline input shape.
 *
 * The content script still uses the bounded DOM collector internally because it
 * owns safe access to the document. The RPC contract no longer exposes the
 * snapshot when the background asks for event-mode analysis.
 */
async function collectInitialObservationBatch(
  input: CollectPageSignalsInput,
  observedSignals: ObservedPageSignals,
) {
  const timingContext: TimingContext = {
    traceId: input.timingTraceId,
    surface: 'content',
    details: {
      hostname: globalThis.location?.hostname,
      tier: input.tier ?? 'initial',
    },
  };
  const response = await timeAsyncSpan(
    'content.collect-observation-batch.collect-signals',
    timingContext,
    () => collectSignals(input, observedSignals),
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
    ...summarizeCurrentDocument(),
    ...summarizeObservationBatch(batch),
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
 */
export function createContentRuntime(observedSignals: ObservedPageSignals): ContentRuntime {
  let observationExpiryTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
  let activeSnapshotTarget: ContentPageSessionSnapshotTarget | undefined;

  function clearObservationExpiry() {
    if (observationExpiryTimer !== undefined) {
      globalThis.clearTimeout(observationExpiryTimer);
      observationExpiryTimer = undefined;
    }
  }

  /**
   * Content lifecycle changes become durable side-panel-visible revisions when the
   * background has supplied a storage target for the current tab document. The
   * write runs outside the RPC response so observation can start and flush
   * without waiting on storage latency.
   */
  function publishContentSnapshot(
    status: "observing" | "stopped",
    details: { readonly observedAt?: number; readonly reason?: string } = {},
  ): void {
    const target = activeSnapshotTarget;
    if (!target) {
      return;
    }

    void writeContentPageSessionSnapshot({
      target,
      status,
      observedAt: details.observedAt,
      reason: details.reason,
    }).catch((error) => {
      logContentEvent("snapshot-write-failed", {
        status,
        message: describeContentError(error),
      });
    });
  }

  const contentApi: ContentApi = {
    async collectObservationBatch(input) {
      return collectInitialObservationBatch(input, observedSignals);
    },

    async beginObservationSession(input) {
      clearObservationExpiry();

      logContentEvent("observation-start", {
        ...summarizeCurrentDocument(),
        ...summarizeSnapshotTarget(input.snapshotTarget),
        sessionId: input.sessionId,
        expectedUrl: input.expectedUrl,
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
          hostname: globalThis.location?.hostname,
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
        ...summarizeCurrentDocument(),
        ...summarizeSnapshotTarget(activeSnapshotTarget),
        sessionId: session.sessionId,
        status: session.status,
        expiresAt: session.expiresAt,
      });

      return ok(session);
    },

    async flushObservationBatch() {
      const flush = await observedSignals.flushObservationBatch();
      logContentEvent("observation-flush", {
        ...summarizeCurrentDocument(),
        ...summarizeSnapshotTarget(activeSnapshotTarget),
        ...summarizeObservationBatch(flush.batch),
        ...summarizeObservationStats(flush.stats),
        sessionId: flush.session.sessionId,
        status: flush.session.status,
        pendingMutationCount: flush.session.pendingMutationCount,
      });
      if (flush.batch && flush.batch.observations.length > 0) {
        publishContentSnapshot("observing", {
          observedAt: flush.batch.observedAt,
          reason: "observation-batch-flushed",
        });
      }

      return ok(flush);
    },

    async stopObservationSession() {
      clearObservationExpiry();
      const session = observedSignals.stopObservationSession("manual");
      publishContentSnapshot("stopped", {
        observedAt: session.lastObservedAt,
        reason: session.stopReason ?? "manual",
      });
      activeSnapshotTarget = undefined;
      logContentEvent("observation-stopped", {
        ...summarizeCurrentDocument(),
        ...summarizeSnapshotTarget(activeSnapshotTarget),
        sessionId: session.sessionId,
        status: session.status,
        stopReason: session.stopReason,
      });
      return ok(session);
    },

    async getObservationSessionState() {
      const session = observedSignals.status();
      logContentEvent("observation-state-read", {
        ...summarizeCurrentDocument(),
        ...summarizeSnapshotTarget(activeSnapshotTarget),
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
        ...summarizeCurrentDocument(),
        ...summarizeSnapshotTarget(activeSnapshotTarget),
        ...summarizeObservationStats(event.stats),
        sessionId: event.session.sessionId,
        status: event.session.status,
        observedAt: event.observedAt,
        pendingMutationCount: event.session.pendingMutationCount,
      });
      publishContentSnapshot("observing", {
        observedAt: event.observedAt,
        reason: "observation-batch-queued",
      });
      notifyBackgroundObservationDirty(event);
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
 */
export function createContentApi(observedSignals: ObservedPageSignals): ContentApi {
  return createContentRuntime(observedSignals).contentApi;
}

const [provideContentApi] = defineProxy(
  (createApi: () => ContentApi) => createApi(),
  {
    namespace: CONTENT_RPC_NAMESPACE,
    heartbeatCheck: false,
    transfer: false,
  },
);

export default defineContentScript({
  registration: "runtime",
  runAt: "document_idle",
  noScriptStartedPostMessage: true,
  main(ctx) {
    if (getRuntimeState()) {
      logContentEvent("runtime-already-active", {
        ...summarizeCurrentDocument(),
      });
      return;
    }

    logContentEvent("runtime-ready", {
      ...summarizeCurrentDocument(),
      throttleMs: DOM_MUTATION_THROTTLE_MS,
    });

    let runtime: ContentRuntime | undefined;
    const observedSignals = createObservedPageSignals({
      throttleMs: DOM_MUTATION_THROTTLE_MS,
      onObservationBatchQueued(event) {
        runtime?.publishObservedBatchQueued(event);
      },
    });
    runtime = createContentRuntime(observedSignals);
    const { contentApi } = runtime;

    const state: ContentRuntimeState = {
      dispose() {
        logContentEvent("runtime-dispose", {
          ...summarizeCurrentDocument(),
        });
        runtime.dispose("invalidated");
        clearRuntimeState(state);
      },
    };

    setRuntimeState(state);
    provideContentApi(createContentServerAdapter(), () => contentApi);

    ctx.onInvalidated(() => {
      state.dispose();
    });
  },
});
