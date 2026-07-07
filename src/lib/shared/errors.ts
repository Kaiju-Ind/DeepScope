export type ErrorCode =
	| 'NO_ACTIVE_TAB'
	| 'UNSUPPORTED_URL'
	| 'CONTENT_SCRIPT_UNAVAILABLE'
	| 'OBSERVATION_SESSION_UNAVAILABLE'
	| 'PERMISSION_DENIED'
	| 'DETECTION_FAILED'
	| 'VALIDATION_ERROR'
	| 'PAYLOAD_TOO_LARGE'
	| 'BROWSER_UNSUPPORTED'
	| 'UNKNOWN';

export type AppError = {
	code: ErrorCode;
	message: string;
	stack?: string;
};

export function appError(code: ErrorCode, message: string, stack?: string): AppError {
	return { code, message, stack };
}
