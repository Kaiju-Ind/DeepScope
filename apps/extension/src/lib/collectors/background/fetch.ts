import { uniqueStrings, limitStringsByTotalChars, truncate } from "@deepscope/detection/normalizers";
import { SOURCE_LIMITS } from "@deepscope/detection/limits";
import * as dictionary from "@deepscope/detection/observations/dictionary";

const PASSIVE_FETCH_TIMEOUT_MS = 1_500;
const BACKGROUND_FETCH_CONCURRENCY = 4;

/** Collect bounded response-header signals with a credential-free HEAD request; unavailable headers produce an empty record. */
export async function collectResponseHeaders(pageUrl: string, signal?: AbortSignal): Promise<Record<string, string>> {
	try {
		const response = await fetchWithTimeout(pageUrl, {
			cache: 'force-cache',
			credentials: 'omit',
			method: 'HEAD',
		}, PASSIVE_FETCH_TIMEOUT_MS, signal);

		return headersToSignalRecord(response.headers);
	} catch {
		return {};
	}
}

/** Fetch unique same-origin candidates in bounded batches, applying both per-source and total text budgets. */
export async function fetchBoundedTextSignals(
	urls: readonly string[],
	allowedOrigin: string,
	maxItems: number,
	maxChars: number,
	maxTotalChars: number,
	signal?: AbortSignal,
): Promise<string[]> {
	signal?.throwIfAborted();
	if (maxItems <= 0 || maxTotalChars <= 0) {
		return [];
	}

	const candidates = uniqueStrings(
		urls.filter((value) => isFetchableSameOriginUrl(value, allowedOrigin)),
	).slice(0, maxItems);

	const fetched: string[] = [];
	for (let index = 0; index < candidates.length; index += BACKGROUND_FETCH_CONCURRENCY) {
		signal?.throwIfAborted();
		const batch = candidates.slice(index, index + BACKGROUND_FETCH_CONCURRENCY);
		const values = await Promise.all(
			batch.map((value) => fetchBoundedText(value, maxChars, signal)),
		);

		for (const value of values) {
			if (!value) {
				continue;
			}
			fetched.push(value);
			if (fetched.length >= maxItems) {
				return limitStringsByTotalChars(fetched, maxItems, maxTotalChars);
			}
		}
	}

	return limitStringsByTotalChars(fetched, maxItems, maxTotalChars);
}

/** Read at most the requested text budget and always release the response reader; unavailable sources contribute no text. */
async function fetchBoundedText(value: string, maxChars: number, signal?: AbortSignal): Promise<string> {
	let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

	try {
		const response = await fetchWithTimeout(value, {
			cache: 'force-cache',
			credentials: 'omit',
		}, PASSIVE_FETCH_TIMEOUT_MS, signal);

		if (!response.ok || !response.body) {
			return '';
		}

		reader = response.body.getReader();
		const decoder = new globalThis.TextDecoder();
		let text = '';

		while (text.length < maxChars) {
			const { done, value } = await reader.read();
			if (done) break;

			text += decoder.decode(value, { stream: true });
			if (text.length >= maxChars) {
				await reader.cancel();
				break;
			}
		}

		return text.slice(0, maxChars);
	} catch {
		return '';
	} finally {
		if (reader) {
			try {
				await reader.cancel();
			} catch {
				// The stream may already be closed after a short bounded read.
			}

			try {
				reader.releaseLock();
			} catch {
				// Some runtimes release the lock as part of canceling the reader.
			}
		}
	}
}

/** Limit the fetch response wait and link it to caller cancellation; remove both temporary cancellation resources when fetch settles. */
async function fetchWithTimeout(
	value: string,
	init: RequestInit,
	timeoutMs: number,
	parentSignal?: AbortSignal,
): Promise<Response> {
	parentSignal?.throwIfAborted();
	const controller = new globalThis.AbortController();
	/** Forward the caller's cancellation reason to this fetch without taking ownership of the parent signal. */
	const abortFromParent = () => controller.abort(parentSignal?.reason);
	if (parentSignal) parentSignal.addEventListener('abort', abortFromParent, { once: true });
	const timeoutId = globalThis.setTimeout(() => controller.abort(new DOMException('Passive fetch timed out.', 'TimeoutError')), timeoutMs);
	try {
		return await globalThis.fetch(value, {
			...init,
			signal: controller.signal,
		});
	} finally {
		globalThis.clearTimeout(timeoutId);
		if (parentSignal) parentSignal.removeEventListener('abort', abortFromParent);
	}
}

/** Normalize header names and cap their count and value size in a prototype-free signal record. */
function headersToSignalRecord(headers: Headers): Record<string, string> {
	const entries: Array<[string, string]> = [];
	for (const [key, value] of headers.entries()) {
		if (entries.length >= SOURCE_LIMITS.headers) {
			break;
		}

		entries.push([
			key.toLowerCase(),
			truncate(value, SOURCE_LIMITS.headerValueChars),
		]);
	}

	return dictionary.fromEntries(entries);
}

/** Accept only absolute HTTP or HTTPS URLs whose origin exactly matches the collection target. */
function isFetchableSameOriginUrl(value: string, allowedOrigin: string): boolean {
	try {
		const parsed = new globalThis.URL(value);
		return parsed.origin === allowedOrigin && (parsed.protocol === 'http:' || parsed.protocol === 'https:');
	} catch {
		return false;
	}
}
