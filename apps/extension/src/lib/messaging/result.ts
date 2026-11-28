/**
 * Results returned across extension contexts.
 *
 * These are `@utils/result` values (`{ ok: true, value }` or
 * `{ ok: false, failure }`), built with its `ok` and `fail`, re-exported here
 * so callers import one module. Both are frozen plain objects, which the
 * structured clone between the background, content script, offscreen document
 * and panel copies as ordinary `{ ok, value | failure }` objects.
 */
import { fail, type Failure, type Result, type Success } from '@utils/result';

import type { ExtensionError, ExtensionErrorCode } from "./failure.ts";
import { createExtensionError } from "./failure.ts";

export { fail, ok } from '@utils/result';

/** Successful extension operation response. */
export type ExtensionSuccess<Value> = Success<Value>;

/** Failed extension operation response. */
export type ExtensionFailure = Failure<ExtensionError>;

/** Serializable result returned across extension runtime interfaces. */
export type ExtensionResult<Value> = Result<Value, ExtensionError>;

/** Create a failed extension response from a stable error code. */
export function errorResponse(
	code: ExtensionErrorCode,
	message: string,
	stack?: string,
): ExtensionFailure {
	return fail(createExtensionError(code, message, stack));
}
