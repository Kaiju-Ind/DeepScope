import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

/** Load the toolbar handler against a browser that exposes only `apis`. */
async function loadToolbar(apis: Record<string, unknown>) {
	const sendMessage = vi.fn(async () => undefined);
	const create = vi.fn(async () => ({}));
	vi.doMock('wxt/browser', () => ({
		browser: {
			runtime: { sendMessage, getURL: (path: string) => `moz-extension://deepscope${path}` },
			tabs: { create },
			...apis,
		},
	}));
	const { openPanelFromToolbar } = await import('../../lib/background/toolbar.ts');
	return { openPanelFromToolbar, sendMessage, create };
}

describe('toolbar button', () => {
	it('opens the Chromium side panel for the clicked window', async () => {
		const open = vi.fn(async () => undefined);
		const { openPanelFromToolbar, sendMessage } = await loadToolbar({ sidePanel: { open } });

		openPanelFromToolbar({ id: 7, windowId: 3 }, vi.fn());

		expect(open).toHaveBeenCalledWith({ windowId: 3 });
		await vi.waitFor(() => expect(sendMessage).toHaveBeenCalledWith(expect.objectContaining({ tabId: 7, windowId: 3 })));
	});

	it('toggles the Firefox sidebar synchronously inside the click', async () => {
		const toggle = vi.fn(async () => undefined);
		const { openPanelFromToolbar, sendMessage } = await loadToolbar({ sidebarAction: { toggle } });

		openPanelFromToolbar({ id: 7, windowId: 3 }, vi.fn());

		// Firefox rejects sidebar calls made after an await, so the call must already have happened.
		expect(toggle).toHaveBeenCalledOnce();
		await vi.waitFor(() => expect(sendMessage).toHaveBeenCalledWith(expect.objectContaining({ tabId: 7, windowId: 3 })));
	});

	it('opens a full page pinned to the clicked tab when no side surface exists', async () => {
		const { openPanelFromToolbar, sendMessage, create } = await loadToolbar({});

		openPanelFromToolbar({ id: 7, windowId: 3 }, vi.fn());

		await vi.waitFor(() => expect(create).toHaveBeenCalledWith({
			url: 'moz-extension://deepscope/panel.html?tab=7',
			windowId: 3,
			openerTabId: 7,
		}));
		expect(sendMessage).not.toHaveBeenCalled();
	});

	it('skips a click that has no tab', async () => {
		const open = vi.fn(async () => undefined);
		const { openPanelFromToolbar } = await loadToolbar({ sidePanel: { open } });
		const log = vi.fn();

		openPanelFromToolbar({ windowId: 3 }, log);

		expect(open).not.toHaveBeenCalled();
		expect(log).toHaveBeenCalledWith('side-panel-open-skipped', { reason: 'missing-tab-id' });
	});
});
