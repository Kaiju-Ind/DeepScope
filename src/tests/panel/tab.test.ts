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
		const { getPanelWindowId } = await import('@/panel/tab');

		await expect(getPanelWindowId()).resolves.toBe(12);
	});

	it('queries the active tab only inside the panel window', async () => {
		const query = vi.fn(async () => [{ id: 37, windowId: 12, active: true }]);
		vi.doMock('wxt/browser', () => ({
			browser: {
				windows: { getCurrent: vi.fn(async () => ({ id: 12 })) },
				tabs: { query },
			},
		}));
		const { getPanelTabTarget } = await import('@/panel/tab');

		await expect(getPanelTabTarget(12)).resolves.toEqual({ windowId: 12, tabId: 37 });
		expect(query).toHaveBeenCalledWith({ active: true, windowId: 12 });
	});

	it('returns no target when the window has no active tab id', async () => {
		vi.doMock('wxt/browser', () => ({
			browser: {
				windows: { getCurrent: vi.fn(async () => ({ id: 12 })) },
				tabs: { query: vi.fn(async () => [{}]) },
			},
		}));
		const { getPanelTabTarget } = await import('@/panel/tab');

		await expect(getPanelTabTarget(12)).resolves.toBeUndefined();
	});
});
