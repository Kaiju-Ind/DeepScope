import type { AnalysisFailure } from '@deepscope/detection/failure';

/** Stable error codes returned across extension runtime messages. */
export type ExtensionErrorCode =
	| 'NO_ACTIVE_TAB'
	| 'UNSUPPORTED_URL'
	| 'CONTENT_SCRIPT_UNAVAILABLE'
	| 'CONTENT_SCRIPT_BUSY'
	| 'OBSERVATION_SESSION_UNAVAILABLE'
	| 'PERMISSION_DENIED'
	| 'DETECTION_FAILED'
	| 'VALIDATION_ERROR'
	| 'PAYLOAD_TOO_LARGE'
	| 'BROWSER_UNSUPPORTED'
	| 'ANALYSIS_TIMEOUT'
	| 'UNKNOWN';

/** Serializable expected failure returned by extension capabilities. */
export type ExtensionError = AnalysisFailure<ExtensionErrorCode>;

/** Create a serializable extension failure. */
export function createExtensionError(
	code: ExtensionErrorCode,
	message: string,
	stack?: string,
): ExtensionError {
	return { code, message, ...(stack ? { stack } : {}) };
}
