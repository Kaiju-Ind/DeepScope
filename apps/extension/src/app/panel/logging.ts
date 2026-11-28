import * as logging from '../../lib/diagnostics/logging.ts';

import type { ExtensionError } from "../../lib/messaging/failure.ts";

/** Convert thrown messaging values into user-safe panel text. */
export function normalizeError(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Unexpected messaging failure";
}

/** Private RPC messages can contain page addresses. The stable code identifies the failure. */
export function diagnosticFailure(error: ExtensionError, incognito?: boolean) {
  return incognito ? { code: error.code } : { code: error.code, message: error.message };
}

/** Classify a private exception without reading its message or caller-controlled name. */
export function diagnosticException(error: unknown, incognito?: boolean) {
  return incognito
    ? { errorType: error instanceof Error ? "Error" : typeof error }
    : { message: normalizeError(error) };
}

/** Structured panel diagnostics bound when its mounted owner is created. */
export type Log = (event: string, details?: Record<string, unknown>) => void;

/** Get a panel logger without constructing it at module import time. */
export function create(): Log {
  const panelLogger = logging.get("sidepanel");
  /** Write one structured side-panel lifecycle record. */
  function logPanelEvent(event: string, details?: Record<string, unknown>): void {
    panelLogger.debug("[kaiju-deepscope][sidepanel] {event}", {
      event,
      ...(details ?? {}),
    });
  }
  return logPanelEvent;
}
