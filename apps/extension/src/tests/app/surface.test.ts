import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

type Listener<Args extends unknown[]> = (...args: Args) => void;

/** Minimal browser event surface that records listeners so a test can fire them. */
function browserEvent<Args extends unknown[]>() {
	const listeners = new Set<Listener<Args>>();
	return {
		listeners,
		addListener: (listener: Listener<Args>) => listeners.add(listener),
		removeListener: (listener: Listener<Args>) => listeners.delete(listener),
		fire: (...args: Args) => { for (const listener of listeners) listener(...args); },
	};
}

/** Mock the browser with one pinned tab (37) living in window 12. */
function mockBrowser(options: { readonly tabExists?: boolean } = {}) {
	const onActivated = browserEvent<[{ tabId: number; windowId: number }]>();
	const onUpdated = browserEvent<[number, { status?: string; url?: string }, { active?: boolean; windowId?: number }]>();
	const onRemoved = browserEvent<[number, { windowId: number }]>();
	const onMessage = browserEvent<[unknown]>();
	const get = vi.fn(async (tabId: number) => {
		if (options.tabExists === false) throw new Error(`No tab with id: ${tabId}.`);
		return { id: tabId, windowId: 12, index: 3 };
	});
	const create = vi.fn(async () => ({}));
	vi.doMock('wxt/browser', () => ({
		browser: {
			windows: { getCurrent: vi.fn(async () => ({ id: 99 })) },
			tabs: { get, create, query: vi.fn(async () => [{ id: 50, windowId: 12 }]), onActivated, onUpdated, onRemoved },
			runtime: { onMessage, getURL: (path: string) => `chrome-extension://deepscope${path}` },
		},
	}));
	return { onActivated, onUpdated, onRemoved, onMessage, get, create };
}

/** A visibility source that never changes, so only browser events drive sync. */
const visibility = { visibilityState: 'visible' as const, addEventListener: () => undefined, removeEventListener: () => undefined };

describe('panel surface target policy', () => {
	it('pins a full page to the tab named in its URL and follows otherwise', async () => {
		mockBrowser();
		const { policyFromLocation } = await import("../../app/browser/surface.ts");

		expect(policyFromLocation('chrome-extension://deepscope/panel.html?tab=37')).toEqual({ kind: 'pinned', tabId: 37 });
		expect(policyFromLocation('chrome-extension://deepscope/sidepanel.html')).toEqual({ kind: 'follow-window' });
		expect(policyFromLocation('chrome-extension://deepscope/panel.html?tab=-1')).toEqual({ kind: 'follow-window' });
		expect(policyFromLocation('chrome-extension://deepscope/panel.html?tab=abc')).toEqual({ kind: 'follow-window' });
	});

	it('opens a full page beside the inspected tab', async () => {
		const browser = mockBrowser();
		const { openPage } = await import("../../app/browser/surface.ts");

		await openPage({ tabId: 37, windowId: 12 });

		expect(browser.create).toHaveBeenCalledWith({
			url: 'chrome-extension://deepscope/panel.html?tab=37',
			windowId: 12,
			index: 4,
			openerTabId: 37,
		});
	});

	it('resolves a pinned tab in whichever window holds it, not the page window', async () => {
		mockBrowser();
		const { getTabTarget, getWindowId } = await import("../../app/browser/tabs.ts");
		const policy = { kind: 'pinned', tabId: 37 } as const;

		await expect(getWindowId(policy)).resolves.toBe(12);
		await expect(getTabTarget(99, policy)).resolves.toEqual({ windowId: 12, tabId: 37 });
	});

	it('reports no target once the pinned tab is closed', async () => {
		mockBrowser({ tabExists: false });
		const { getTabTarget } = await import("../../app/browser/tabs.ts");

		await expect(getTabTarget(12, { kind: 'pinned', tabId: 37 })).resolves.toBeUndefined();
	});

	it('ignores activation and toolbar messages but follows its own tab while pinned', async () => {
		const browser = mockBrowser();
		const { subscribeTabTargetChanges } = await import("../../app/browser/tabs.ts");
		const sync = vi.fn();
		const closed = vi.fn();
		const unsubscribe = subscribeTabTargetChanges({
			getWindowId: () => 12,
			getVisibleTabId: () => 37,
			sync,
			closed,
			visibility,
			policy: { kind: 'pinned', tabId: 37 },
		});

		browser.onActivated.fire({ tabId: 50, windowId: 12 });
		browser.onMessage.fire({ type: 'side-panel-tab', windowId: 12, tabId: 50 });
		browser.onUpdated.fire(50, { status: 'complete' }, { active: true, windowId: 12 });
		expect(sync).not.toHaveBeenCalled();

		browser.onUpdated.fire(37, { url: 'https://example.com/next' }, { active: false, windowId: 12 });
		expect(sync).toHaveBeenCalledTimes(1);

		browser.onRemoved.fire(50, { windowId: 12 });
		expect(closed).not.toHaveBeenCalled();
		browser.onRemoved.fire(37, { windowId: 12 });
		expect(closed).toHaveBeenCalledWith(37);
		expect(sync).toHaveBeenCalledTimes(2);

		unsubscribe();
		expect(browser.onActivated.listeners.size).toBe(0);
	});
});
