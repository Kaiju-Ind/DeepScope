import { browser } from 'wxt/browser';
import * as observe from './observe/index.ts';
import { writeContentPageSessionSnapshot } from "./page-session-snapshots.ts";
import type { ContentApi } from "../messaging/index.ts";
import { createObservationDirtyNotification } from "../messaging/observation-notifications.ts";
import type { ContentPageSessionSnapshotTarget, ObservationStopReason } from "../messaging/analysis.ts";
import { errorResponse, ok } from "../messaging/result.ts";
import * as url from '../../utils/url.ts';
import { logContentEvent, summarizeContentError, summarizeCurrentDocument, summarizeSnapshotTarget, summarizeObservationBatch, summarizeObservationStats } from './logging.ts';
import { collectInitialObservationBatch } from './collect.ts';

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

/** Send only the session's dirty notification and contain transport failures using the trusted privacy context. */
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

  /** Cancel the active session deadline and release its handle before replacement or stop. */
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
    /** Run the existing initial collector against this runtime's observer and fixed privacy context. */
    async collectObservationBatch(input) {
      return collectInitialObservationBatch(input, observedSignals, incognito);
    },

    /** Replace the prior deadline, start the requested bounded observer session and serialize its lifecycle publication. */
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

    /** Drain queued page facts and log scalar session counters without rewriting the lifecycle record. */
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

    /** Require the exact active session/document before canceling its deadline and publishing a manual stop. */
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

    /** Read the observer's current navigation-aware state and return it through the RPC result contract. */
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
    /** Log queued-fact counters and notify background without transferring the observer's actual evidence queue. */
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
    /** Cancel the deadline, disconnect observation and queue the terminal lifecycle write before releasing its target. */
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
