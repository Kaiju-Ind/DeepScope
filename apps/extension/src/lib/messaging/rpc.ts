import * as context from '@utils/context';
import { asyncDispose } from '@utils/dispose';

import { errorResponse, type ExtensionFailure } from '@/lib/messaging/result';

export const CONTENT_SCRIPT_TIMEOUT_MS = 10_000;

export class RpcTimeoutError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'RpcTimeoutError';
	}
}

/** The receiver kept answering liveness probes but did not finish within the hard cap. */
export class RpcBusyError extends RpcTimeoutError {
	constructor(message: string) {
		super(message);
		this.name = 'RpcBusyError';
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
 *
 * Each wait owns one `@utils/context` scope that follows the parent signal.
 * The timer cancels the scope with an `RpcTimeoutError`, and `context.observe`
 * rejects the wait with the scope's reason. Settling disposes the scope, which
 * removes its parent listener and stops its timer. The operation's signal is
 * separate from the scope, so that disposal never aborts work the operation
 * left running after it settled.
 *
 * `context.timeout` is not used: its reason is `ContextDeadlineExceededError`,
 * while callers rely on `RpcTimeoutError` as both the rejection and the child
 * signal's reason.
 */
export function withTimeout<T>(
	operation: Promise<T> | ((signal: AbortSignal) => Promise<T>),
	timeoutMs: number,
	message: string,
	options: RpcDeadlineOptions = {},
): Promise<T> {
	const parent = options.signal;
	if (typeof operation === 'function' && parent?.aborted) {
		return Promise.reject(getAbortReason(parent));
	}

	const controller = typeof operation === 'function' ? new AbortController() : undefined;
	const pending = typeof operation === 'function' ? operation(controller!.signal) : operation;
	if (parent?.aborted) {
		// Like the race this replaces, an operation that already settled still wins.
		const error = getAbortReason(parent);
		controller?.abort(error);
		return Promise.race([pending, Promise.reject(error)]);
	}

	const scope = context.create({ id: 'rpc.timeout', ...(parent ? { signal: parent } : {}) });
	let settled = false;
	let stopped: Error | undefined;
	/** The timeout error, or the parent's reason as an Error; the same object for the child and the caller. */
	const reason = (): Error => stopped ??= scope.signal.reason instanceof RpcTimeoutError
		? scope.signal.reason
		: getAbortReason(parent!);
	if (controller) {
		const forward = () => {
			if (!settled) controller.abort(reason());
		};
		scope.signal.addEventListener('abort', forward, { once: true });
		if (scope.signal.aborted) forward();
	}
	void context.delay(timeoutMs, scope.signal).then(
		() => context.cancel(scope, new RpcTimeoutError(message)),
		() => undefined,
	);

	return context.observe(scope.signal, pending)
		.catch((error: unknown) => {
			throw scope.signal.aborted && error === scope.signal.reason ? reason() : error;
		})
		.finally(() => {
			settled = true;
			void scope[asyncDispose]();
		});
}

/**
 * Longest a content script may keep working on one collection while it still
 * answers liveness probes. Large documents in Firefox (Xray-wrapped DOM access
 * from the isolated world) can need well over `CONTENT_SCRIPT_TIMEOUT_MS`.
 */
export const CONTENT_SCRIPT_BUSY_LIMIT_MS = 60_000;

export interface LivenessDeadlineOptions extends RpcDeadlineOptions {
	/** Quiet period after which the receiver is probed instead of given up on. */
	readonly timeoutMs: number;
	/** Hard cap on total waiting, however responsive the receiver stays. */
	readonly maxMs: number;
	/** Resolve true once the receiver answers; reject or false when it is gone. */
	readonly isAlive: (signal: AbortSignal) => Promise<boolean>;
	/** Called each time a probe extends the deadline. */
	readonly onExtended?: (elapsedMs: number) => void;
}

/**
 * Await one RPC whose receiver may be slow but alive.
 *
 * `withTimeout` cannot tell a missing content script from one that is still
 * walking a very large document, so both surface as "did not respond". This
 * waits `timeoutMs`, then asks `isAlive`; a live receiver earns another period,
 * up to `maxMs` in total. A dead receiver rejects with `RpcTimeoutError`
 * exactly as `withTimeout` would; reaching the cap after the receiver answered
 * a probe rejects with `RpcBusyError`, so callers can tell busy from missing.
 */
export async function withLivenessDeadline<T>(
	operation: Promise<T>,
	message: string,
	options: LivenessDeadlineOptions,
): Promise<T> {
	const startedAt = Date.now();
	/** Set once a probe answered: from then on, running out of time means busy, not missing. */
	let alive = false;
	const settled = operation.then(
		(value) => ({ done: true as const, value }),
		(error: unknown) => ({ done: true as const, error }),
	);
	// The caller's operation may still reject after we give up; keep that silent.
	settled.catch(() => undefined);

	for (;;) {
		const remaining = options.maxMs - (Date.now() - startedAt);
		if (remaining <= 0) throw alive ? new RpcBusyError(message) : new RpcTimeoutError(message);
		const outcome = await withTimeout(settled, Math.min(options.timeoutMs, remaining), message, options)
			.catch((error: unknown) => {
				if (error instanceof RpcTimeoutError) return { done: false as const };
				throw error;
			});
		if (outcome.done) {
			if ('error' in outcome) throw outcome.error;
			return outcome.value;
		}
		const budget = options.maxMs - (Date.now() - startedAt);
		if (budget <= 0) throw alive ? new RpcBusyError(message) : new RpcTimeoutError(message);
		// A busy receiver may only answer the probe once its current work ends,
		// so the probe may use the rest of the budget. A missing one fails fast.
		alive = await withTimeout(options.isAlive, budget, message, options).catch((error: unknown) => {
			if (options.signal?.aborted) throw error;
			return false;
		});
		if (!alive) throw new RpcTimeoutError(message);
		options.onExtended?.(Date.now() - startedAt);
	}
}

/** Convert arbitrary AbortSignal reasons into an Error that survives extension messaging/logging. */
function getAbortReason(signal: AbortSignal): Error {
	if (signal.reason instanceof Error) return signal.reason;
	return new DOMException(typeof signal.reason === 'string' ? signal.reason : 'Operation canceled.', 'AbortError');
}

export function contentScriptFailure(error: unknown): ExtensionFailure {
	if (error instanceof RpcBusyError) {
		return errorResponse(
			'CONTENT_SCRIPT_BUSY',
			'The page is still busy: its content script kept answering but did not finish before the time limit.',
			error.stack,
		);
	}
	if (error instanceof RpcTimeoutError) {
		return errorResponse('CONTENT_SCRIPT_UNAVAILABLE', error.message, error.stack);
	}

	const message = error instanceof Error ? error.message : 'Content script did not respond';
	const stack = error instanceof Error ? error.stack : undefined;
	return errorResponse('CONTENT_SCRIPT_UNAVAILABLE', message, stack);
}

/**
 * Browser refusals to script a page. Firefox says "Missing host permission for
 * the tab" both for pages no extension may touch (addons.mozilla.org,
 * quarantined domains, the built-in PDF viewer) and when the user has turned
 * off DeepScope's site access; Chrome says "Cannot access contents of ...".
 */
const SCRIPTING_REFUSED = /missing host permission|cannot access contents of|cannot be scripted|extensions gallery|cannot access a chrome/i;

/** Map a failed content-script injection to the error the panel shows. */
export function injectionFailure(error: unknown): ExtensionFailure {
	const message = error instanceof Error ? error.message : String(error);
	if (SCRIPTING_REFUSED.test(message)) {
		return errorResponse(
			'PERMISSION_DENIED',
			'The browser does not let extensions read this page, or DeepScope\'s access to this site is turned off in the browser\'s extension settings.',
			error instanceof Error ? error.stack : undefined,
		);
	}
	return contentScriptFailure(error);
}
