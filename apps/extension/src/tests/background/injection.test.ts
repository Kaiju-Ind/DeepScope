/**
 * Content-runtime injection waits once more for a script that loaded slowly.
 *
 * Found by the Firefox stress run: during a burst of tab switches a freshly
 * injected script on a private tab took longer than one 750 ms ping to answer,
 * and the scan gave up with CONTENT_SCRIPT_UNAVAILABLE.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import * as injection from '@/lib/background/injection';
import type { ContentApi } from '@/lib/messaging';
import { ok } from '@/lib/messaging/result';

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

/**
 * Found by the Firefox stress run: `scripting.executeScript` rejected once
 * with "An unexpected error occurred" on an ordinary page and the scan ended
 * CONTENT_SCRIPT_UNAVAILABLE. Generic browser errors get one retry; a refusal
 * by permission never does.
 */
describe('transient injection failures', () => {
	/** A page whose first `count` injections reject with `message`, then load a script that answers at once. */
	function flaky(message: string, count = 1) {
		let failures = 0;
		let injected = false;
		const executeContentScript = vi.fn(async () => {
			if (failures < count) {
				failures += 1;
				throw new Error(message);
			}
			injected = true;
		});
		const contentApi = {
			getObservationSessionState: () => injected ? Promise.resolve(ok({ status: 'idle' })) : new Promise<never>(() => undefined),
		} as unknown as ContentApi;
		const log = vi.fn();
		const injector = injection.create({ executeContentScript, createContentApiClient: () => contentApi, log });
		return { injector, executeContentScript, log };
	}

	const settle = injection.PING_TIMEOUT_MS * 3 + 1_000;

	it.each([
		'An unexpected error occurred',
		'An unknown error occurred.',
		'Frame with ID 0 was removed.',
		'Tabs cannot be edited right now (user may be dragging a tab).',
	])('retries once after "%s"', async (message) => {
		vi.useFakeTimers();
		const { injector, executeContentScript, log } = flaky(message);

		const ready = injector.ensure({ id: 7, incognito: false });
		await vi.advanceTimersByTimeAsync(settle);

		await expect(ready).resolves.toMatchObject({ ok: true });
		expect(executeContentScript).toHaveBeenCalledTimes(2);
		expect(log).toHaveBeenCalledWith('content-runtime-inject-transient', { tabId: 7 });
	});

	it('gives up after the one retry', async () => {
		vi.useFakeTimers();
		const { injector, executeContentScript } = flaky('An unexpected error occurred', 2);

		const ready = injector.ensure({ id: 7, incognito: false });
		await vi.advanceTimersByTimeAsync(settle);

		await expect(ready).resolves.toMatchObject({ ok: false, failure: { code: 'CONTENT_SCRIPT_UNAVAILABLE' } });
		expect(executeContentScript).toHaveBeenCalledTimes(2);
	});

	it.each([
		'Missing host permission for the tab',
		'Frame not found, or missing host permission',
		'Cannot access contents of url "https://chromewebstore.google.com/". Extension manifest must request permission to access this host.',
		'No tab with id: 7.',
	])('never retries "%s"', async (message) => {
		vi.useFakeTimers();
		const { injector, executeContentScript } = flaky(message);

		const ready = injector.ensure({ id: 7, incognito: false });
		await vi.advanceTimersByTimeAsync(settle);

		await expect(ready).resolves.toMatchObject({ ok: false });
		expect(executeContentScript).toHaveBeenCalledOnce();
	});
});
