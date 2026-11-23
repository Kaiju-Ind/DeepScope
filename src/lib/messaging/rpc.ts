import { errorResponse, type ExtensionFailure } from '@/lib/messaging/result';

export const CONTENT_SCRIPT_TIMEOUT_MS = 10_000;

export class RpcTimeoutError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'RpcTimeoutError';
	}
}

export interface RpcDeadlineOptions {
	/** Parent lifecycle signal. Aborting it stops the caller from waiting for stale work. */
	readonly signal?: AbortSignal;
}

/**
 * Await one RPC-like operation with a timeout and optional parent cancellation.
 *
 * Passing a Promise preserves compatibility with RPC mechanisms that cannot
 * transport `AbortSignal`; only the local wait can stop in that form. Passing
 * an operation factory also receives a child signal. Timeout or parent
 * cancellation aborts that signal before the caller is rejected, so local
 * fetch/collection work can release its resources promptly.
 */
export function withTimeout<T>(
	operation: Promise<T> | ((signal: AbortSignal) => Promise<T>),
	timeoutMs: number,
	message: string,
	options: RpcDeadlineOptions = {},
): Promise<T> {
	if (typeof operation === 'function' && options.signal?.aborted) {
		return Promise.reject(getAbortReason(options.signal));
	}

	const controller = typeof operation === 'function' ? new AbortController() : undefined;
	let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;
	let abortListener: (() => void) | undefined;
	const operationPromise = typeof operation === 'function' ? operation(controller!.signal) : operation;

	const timeout = new Promise<never>((_, reject) => {
		timeoutId = globalThis.setTimeout(() => {
			const error = new RpcTimeoutError(message);
			controller?.abort(error);
			reject(error);
		}, timeoutMs);
	});
	const candidates: Promise<T | never>[] = [operationPromise, timeout];
	if (options.signal) {
		candidates.push(new Promise<never>((_, reject) => {
			const rejectAbort = () => {
				const error = getAbortReason(options.signal!);
				controller?.abort(error);
				reject(error);
			};
			if (options.signal!.aborted) {
				rejectAbort();
				return;
			}
			abortListener = rejectAbort;
			options.signal!.addEventListener('abort', rejectAbort, { once: true });
		}));
	}

	return Promise.race(candidates).finally(() => {
		if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
		if (abortListener && options.signal) options.signal.removeEventListener('abort', abortListener);
	});
}

/** Convert arbitrary AbortSignal reasons into an Error that survives extension messaging/logging. */
function getAbortReason(signal: AbortSignal): Error {
	if (signal.reason instanceof Error) return signal.reason;
	return new DOMException(typeof signal.reason === 'string' ? signal.reason : 'Operation canceled.', 'AbortError');
}

export function contentScriptFailure(error: unknown): ExtensionFailure {
	if (error instanceof RpcTimeoutError) {
		return errorResponse('CONTENT_SCRIPT_UNAVAILABLE', error.message, error.stack);
	}

	const message = error instanceof Error ? error.message : 'Content script did not respond';
	const stack = error instanceof Error ? error.stack : undefined;
	return errorResponse('CONTENT_SCRIPT_UNAVAILABLE', message, stack);
}
