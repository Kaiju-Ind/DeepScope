import { collectPageSignals } from "./signals/index.ts";
import * as observe from './observe/index.ts';
import { validatePageSignals } from "@deepscope/detection/validate";
import type { CollectPageSignalsInput } from "@deepscope/detection/collection/input";
import { timeAsyncSpan, timeSyncSpan, type TimingContext } from "../diagnostics/timing.ts";
import { normalizePageSignals } from "@deepscope/detection/observations";
import { errorResponse, ok } from "../messaging/result.ts";
import { diagnosticErrorType } from "@deepscope/detection/privacy/redaction";
import { logContentEvent, summarizeSignals, summarizeCurrentDocument, summarizeObservationBatch } from './logging.ts';

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
export async function collectInitialObservationBatch(
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
