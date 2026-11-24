import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

describe('side-panel tab target', () => {
	it('resolves the window that contains the mounted panel', async () => {
		vi.doMock('wxt/browser', () => ({
			browser: {
				windows: { getCurrent: vi.fn(async () => ({ id: 12 })) },
				tabs: { query: vi.fn(async () => []) },
			},
		}));
		const { getWindowId } = await import('@/app/tab');

		await expect(getWindowId()).resolves.toBe(12);
	});

	it('queries the active tab only inside the panel window', async () => {
		const query = vi.fn(async () => [{ id: 37, windowId: 12, active: true }]);
		vi.doMock('wxt/browser', () => ({
			browser: {
				windows: { getCurrent: vi.fn(async () => ({ id: 12 })) },
				tabs: { query },
			},
		}));
		const { getTabTarget } = await import('@/app/tab');

		await expect(getTabTarget(12)).resolves.toEqual({ windowId: 12, tabId: 37 });
		expect(query).toHaveBeenCalledWith({ active: true, windowId: 12 });
	});

	it('returns no target when the window has no active tab id', async () => {
		vi.doMock('wxt/browser', () => ({
			browser: {
				windows: { getCurrent: vi.fn(async () => ({ id: 12 })) },
				tabs: { query: vi.fn(async () => [{}]) },
			},
		}));
		const { getTabTarget } = await import('@/app/tab');

		await expect(getTabTarget(12)).resolves.toBeUndefined();
	});

	it('subscribes to direct and background active-tab changes for the owning window', async () => {
		const activatedListeners = new Set<(value: { tabId: number; windowId: number }) => void>();
		const updatedListeners = new Set<(tabId: number, changeInfo: { status?: string; url?: string }, tab: { active?: boolean; windowId?: number }) => void>();
		const removedListeners = new Set<(tabId: number, removeInfo: { windowId: number }) => void>();
		const messageListeners = new Set<(message: unknown) => void>();
		vi.doMock('wxt/browser', () => ({
			browser: {
				windows: { getCurrent: vi.fn(async () => ({ id: 12 })) },
				tabs: {
					query: vi.fn(async () => []),
					onActivated: {
						addListener: (listener: (value: { tabId: number; windowId: number }) => void) => activatedListeners.add(listener),
						removeListener: (listener: (value: { tabId: number; windowId: number }) => void) => activatedListeners.delete(listener),
					},
					onUpdated: {
						addListener: (listener: (tabId: number, changeInfo: { status?: string; url?: string }, tab: { active?: boolean; windowId?: number }) => void) => updatedListeners.add(listener),
						removeListener: (listener: (tabId: number, changeInfo: { status?: string; url?: string }, tab: { active?: boolean; windowId?: number }) => void) => updatedListeners.delete(listener),
					},
					onRemoved: {
						addListener: (listener: (tabId: number, removeInfo: { windowId: number }) => void) => removedListeners.add(listener),
						removeListener: (listener: (tabId: number, removeInfo: { windowId: number }) => void) => removedListeners.delete(listener),
					},
				},
				runtime: {
					onMessage: {
						addListener: (listener: (message: unknown) => void) => messageListeners.add(listener),
						removeListener: (listener: (message: unknown) => void) => messageListeners.delete(listener),
					},
				},
			},
		}));
		const { subscribeTabTargetChanges } = await import('@/app/tab');
		const sync = vi.fn();
		const visibilityListeners = new Set<() => void>();
		const visibility = {
			visibilityState: 'visible' as const,
			addEventListener: (_type: 'visibilitychange', listener: () => void) => visibilityListeners.add(listener),
			removeEventListener: (_type: 'visibilitychange', listener: () => void) => visibilityListeners.delete(listener),
		};
		const closed = vi.fn();
		const unsubscribe = subscribeTabTargetChanges({
			getWindowId: () => 12,
			getVisibleTabId: () => 37,
			sync,
			closed,
			visibility,
		});

		for (const listener of activatedListeners) listener({ tabId: 38, windowId: 12 });
		for (const listener of activatedListeners) listener({ tabId: 90, windowId: 13 });
		for (const listener of messageListeners) listener({
			type: 'kaiju-deepscope.side-panel-tab.v1',
			windowId: 12,
			tabId: 39,
			reason: 'activated',
		});
		for (const listener of removedListeners) listener(37, { windowId: 12 });
		for (const listener of removedListeners) listener(90, { windowId: 13 });
		for (const listener of visibilityListeners) listener();

		expect(sync).toHaveBeenCalledWith({ tabId: 38, windowId: 12 });
		expect(sync).not.toHaveBeenCalledWith({ tabId: 90, windowId: 13 });
		expect(sync).toHaveBeenCalledWith({ tabId: 39, windowId: 12 });
		expect(sync).toHaveBeenCalledWith();
		expect(closed).toHaveBeenCalledWith(37);
		expect(closed).not.toHaveBeenCalledWith(90);

		unsubscribe();
		expect(activatedListeners.size).toBe(0);
		expect(updatedListeners.size).toBe(0);
		expect(removedListeners.size).toBe(0);
		expect(messageListeners.size).toBe(0);
		expect(visibilityListeners.size).toBe(0);
	});

});
