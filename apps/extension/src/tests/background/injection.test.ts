/**
 * Content-runtime injection waits once more for a script that loaded slowly.
 *
 * Found by the Firefox stress run: during a burst of tab switches a freshly
 * injected script on a private tab took longer than one 750 ms ping to answer,
 * and the scan gave up with CONTENT_SCRIPT_UNAVAILABLE.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import * as injection from '../../lib/background/injection.ts';
import type { ContentApi } from "../../lib/messaging/index.ts";
import { ok } from "../../lib/messaging/result.ts";

const TAB = { id: 7, incognito: true };

/** A content script that is absent until injected, then answers after `answerAfterMs`. */
function page(answerAfterMs: number | undefined) {
	let injectedAt: number | undefined;
	const executeContentScript = vi.fn(async () => {
		injectedAt = Date.now();
	});
	const contentApi = {
		getObservationSessionState: () => {
			if (injectedAt === undefined || answerAfterMs === undefined) return new Promise<never>(() => undefined);
			const wait = Math.max(0, injectedAt + answerAfterMs - Date.now());
			return new Promise((resolve) => setTimeout(() => resolve(ok({ status: 'idle' })), wait));
		},
	} as unknown as ContentApi;
	const log = vi.fn();
	const injector = injection.create({ executeContentScript, createContentApiClient: () => contentApi, log });
	return { injector, executeContentScript, log };
}

afterEach(() => {
	vi.useRealTimers();
});

describe('content runtime injection', () => {
	it('accepts a script that registers after the first ping but within the retry', async () => {
		vi.useFakeTimers();
		const { injector, executeContentScript, log } = page(injection.PING_TIMEOUT_MS + 500);

		const ready = injector.ensure(TAB);
		await vi.advanceTimersByTimeAsync(injection.PING_TIMEOUT_MS * 2 + injection.INJECT_RETRY_PING_MS);

		await expect(ready).resolves.toMatchObject({ ok: true });
		expect(executeContentScript).toHaveBeenCalledOnce();
		expect(log).toHaveBeenCalledWith('content-runtime-inject-retry', { tabId: 7 });
		expect(log).toHaveBeenCalledWith('content-runtime-inject-ready', { tabId: 7, retried: true });
	});

	it('still reports a script that never registers as unavailable, after one retry', async () => {
		vi.useFakeTimers();
		const { injector, executeContentScript } = page(undefined);

		const ready = injector.ensure(TAB);
		await vi.advanceTimersByTimeAsync(injection.PING_TIMEOUT_MS * 2 + injection.INJECT_RETRY_PING_MS);

		await expect(ready).resolves.toMatchObject({ ok: false, failure: { code: 'CONTENT_SCRIPT_UNAVAILABLE' } });
		expect(executeContentScript).toHaveBeenCalledOnce();
	});
});
