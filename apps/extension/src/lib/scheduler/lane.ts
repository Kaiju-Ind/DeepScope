import { errorResponse, type ExtensionResult } from '@/lib/messaging/result';

/**
 * Longest one analysis may hold the lane.
 *
 * A fresh analysis returns once its first matcher job is queued, so the slow
 * part it waits for is collection, which a live but busy content script may
 * stretch to `CONTENT_SCRIPT_BUSY_LIMIT_MS` (60 s). Twice that leaves room for
 * injection and registry loading while still bounding a wait that would
 * otherwise block every later scan in the browser.
 */
export const LANE_TIMEOUT_MS = 120_000;

/**
 * Settle one lane execution within `timeoutMs`.
 *
 * On timeout the caller receives `ANALYSIS_TIMEOUT` and the lane moves on. The
 * abandoned execution keeps running; the runtime's document ownership checks
 * stop it from publishing into a page that has since changed.
 */
export async function bound<Value>(
	execution: Promise<ExtensionResult<Value>>,
	onTimeout: () => void,
	timeoutMs = LANE_TIMEOUT_MS,
): Promise<ExtensionResult<Value>> {
	let timer: ReturnType<typeof setTimeout> | undefined;
	const expired = new Promise<ExtensionResult<Value>>((resolve) => {
		timer = setTimeout(() => {
			onTimeout();
			resolve(errorResponse('ANALYSIS_TIMEOUT', `The analysis did not finish within ${timeoutMs / 1000} s and was released so other pages can be scanned.`));
		}, timeoutMs);
	});
	try {
		return await Promise.race([execution, expired]);
	} finally {
		clearTimeout(timer);
	}
}
