import { errorResponse, type AppFailure } from '../shared/result';

export const CONTENT_SCRIPT_TIMEOUT_MS = 5_000;

export class RpcTimeoutError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'RpcTimeoutError';
	}
}

export function withTimeout<T>(
	operation: Promise<T>,
	timeoutMs: number,
	message: string,
): Promise<T> {
	let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;

	const timeout = new Promise<never>((_, reject) => {
		timeoutId = globalThis.setTimeout(() => {
			reject(new RpcTimeoutError(message));
		}, timeoutMs);
	});

	return Promise.race([operation, timeout]).finally(() => {
		if (timeoutId !== undefined) {
			globalThis.clearTimeout(timeoutId);
		}
	});
}

export function contentScriptFailure(error: unknown): AppFailure {
	if (error instanceof RpcTimeoutError) {
		return errorResponse('CONTENT_SCRIPT_UNAVAILABLE', error.message, error.stack);
	}

	const message = error instanceof Error ? error.message : 'Content script did not respond';
	const stack = error instanceof Error ? error.stack : undefined;
	return errorResponse('CONTENT_SCRIPT_UNAVAILABLE', message, stack);
}
