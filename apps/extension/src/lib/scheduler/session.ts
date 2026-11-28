import { browser } from 'wxt/browser';

const STORAGE_KEY = 'kaiju-deepscope.execution.browser-session-id';
let pending: Promise<string> | undefined;

/**
 * Return the current browser-session identity shared by service-worker restarts.
 *
 * `chrome.storage.session` survives Manifest V3 service-worker replacement but
 * is cleared when the browser session ends. The in-flight Promise prevents two
 * concurrently starting schedulers from creating different identities.
 */
export function get(): Promise<string> {
	if (pending) return pending;
	const request = (async () => {
		const stored = await browser.storage.session.get(STORAGE_KEY);
		const existing = stored[STORAGE_KEY];
		if (typeof existing === 'string' && existing.length > 0) return existing;
		const value = createId('browser');
		await browser.storage.session.set({ [STORAGE_KEY]: value });
		return value;
	})();
	const guarded = request.catch((error) => {
		if (pending === guarded) pending = undefined;
		throw error;
	});
	pending = guarded;
	return guarded;
}

/** Create a stable-enough local identity without depending on Node or browser-only crypto helpers. */
export function createId(prefix: string): string {
	const random = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
	return `${prefix}:${Date.now()}:${random}`;
}
