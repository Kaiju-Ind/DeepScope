import { defineProxy } from 'comctx';
import type { ContentScriptContext } from 'wxt/utils/content-script-context';
import * as artifact from './artifact.ts';
import { collectPageSignals } from "./signals/index.ts";
import * as observe from './observe/index.ts';
import { getDiagnosticBuildId } from "../diagnostics/build.ts";
import { installDiagnosticCrashHooks } from "../diagnostics/crash.ts";
import * as logging from '../diagnostics/logging.ts';
import { type ContentApi, CONTENT_RPC_NAMESPACE, createContentServerAdapter } from "../messaging/index.ts";
import { logContentEvent, summarizeCurrentDocument, summarizeContentError } from './logging.ts';
import { type ContentRuntime, createContentRuntime } from './api.ts';

/** Mutation coalescing interval shared by the installed document observer. */
const DOM_MUTATION_THROTTLE_MS = 1_500;

/** Stable per-document install identity; reinjection must not create a second observer. */
const CONTENT_RUNTIME_KEY = '__kaijuDeepScopeContentRuntimeV1';

/** Owner retained by the document until WXT invalidates or replaces this build. */
type ContentRuntimeState = {
  /** Build that owns the observer; equal-build reinjection reuses this state. */
  readonly buildId?: string;
  /** Release this installation once without removing a newer document owner. */
  dispose(): void;
};

/** Find the installed owner before deciding whether this injection replaces it. */
function getRuntimeState(): ContentRuntimeState | undefined {
  return (globalThis as unknown as Record<string, ContentRuntimeState | undefined>)[CONTENT_RUNTIME_KEY];
}

/** Publish the owner only after observation and artifact setup have succeeded. */
function setRuntimeState(state: ContentRuntimeState): void {
  (globalThis as unknown as Record<string, ContentRuntimeState | undefined>)[CONTENT_RUNTIME_KEY] = state;
}

/** Release this owner without deleting a newer installation from the same document. */
function clearRuntimeState(state: ContentRuntimeState): void {
  const runtime = globalThis as unknown as Record<string, ContentRuntimeState | undefined>;
  if (runtime[CONTENT_RUNTIME_KEY] === state) {
    delete runtime[CONTENT_RUNTIME_KEY];
  }
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
export function startContentRuntime(ctx: ContentScriptContext, incognito: boolean): void {
  logging.configure("content");
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

  const crashHooks = installDiagnosticCrashHooks("content", {
    captureGlobalError: false,
    includeErrorDetails: !incognito,
  });
  let runtime: ContentRuntime | undefined;
  let state: ContentRuntimeState | undefined;
  let disposed = false;

  /** Release acquired observation and crash owners once, including a partly installed runtime. */
  function dispose(): void {
    if (disposed) return;
    disposed = true;
    logContentEvent("runtime-dispose", summarizeCurrentDocument(incognito));
    try {
      runtime?.dispose("invalidated");
    } finally {
      if (state) clearRuntimeState(state);
      crashHooks.dispose();
    }
  }

  try {
    const observedSignals = observe.create({
      throttleMs: DOM_MUTATION_THROTTLE_MS,
      incognito,
      /** The observer can notify only after the RPC runtime is constructed. */
      onObservationBatchQueued(event) {
        runtime?.publishObservedBatchQueued(event);
      },
    });
    const contentRuntime = createContentRuntime(observedSignals, incognito);
    runtime = contentRuntime;
    const { contentApi } = contentRuntime;
    artifact.publish({
      contentApi,
      /** Artifact checks use the installed document's trusted privacy context. */
      collectPageSignals: (input) => collectPageSignals(input, undefined, incognito),
      /** The probe stops observation; WXT still owns the installed RPC and crash hooks. */
      dispose: (reason) => contentRuntime.dispose(reason),
    });

    state = { buildId, dispose };
    setRuntimeState(state);
    provideContentApi(createContentServerAdapter(), () => contentApi);

    ctx.onInvalidated(() => {
      try {
        dispose();
      } catch (error) {
        if (!incognito) throw error;
        logContentEvent("runtime-dispose-failed", summarizeContentError(error, incognito));
      }
    });
  } catch (error) {
    // No successful WXT registration remains to clean up a failed installation.
    // Keep the original startup error even if releasing an observer also fails.
    try {
      dispose();
    } catch (cleanupError) {
      logContentEvent("runtime-dispose-failed", summarizeContentError(cleanupError, incognito));
    }
    throw error;
  }
}
