import type { ExtensionError, ExtensionErrorCode } from './failure';
import { createExtensionError } from './failure';
import { failure, success, type Failure, type Result, type Success } from '@/utils/result';

/** Successful extension operation response. */
export type ExtensionSuccess<Value> = Success<Value>;

/** Failed extension operation response. */
export type ExtensionFailure = Failure<ExtensionError>;

/** Serializable result returned across extension runtime interfaces. */
export type ExtensionResult<Value> = Result<Value, ExtensionError>;

/** Create a successful extension response. */
export function extensionSuccess<Value>(value: Value): ExtensionSuccess<Value> {
	return success(value);
}

/** Create a failed extension response from an existing error. */
export function extensionFailure(error: ExtensionError): ExtensionFailure {
	return failure(error);
}

/** Create a failed extension response from a stable error code. */
export function errorResponse(
	code: ExtensionErrorCode,
	message: string,
	stack?: string,
): ExtensionFailure {
	return extensionFailure(createExtensionError(code, message, stack));
}
