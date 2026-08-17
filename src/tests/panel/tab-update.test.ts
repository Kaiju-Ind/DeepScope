import { describe, expect, it } from 'vitest';

import { shouldSyncPanelTabUpdate } from '@/panel/tab-update';

describe('side-panel tab update filtering', () => {
	it('resyncs an active page update when no visible identity is available yet', () => {
		expect(shouldSyncPanelTabUpdate({
			tabId: 37,
			panelWindowId: 12,
			visibleTabId: null,
			changeInfo: { status: 'loading', url: 'https://example.com' },
			tab: { active: true, windowId: 12 },
		})).toBe(true);
	});

	it('resyncs navigation updates for the visible tab', () => {
		expect(shouldSyncPanelTabUpdate({
			tabId: 37,
			panelWindowId: 12,
			visibleTabId: 37,
			changeInfo: { url: 'https://example.com/next' },
			tab: { active: true, windowId: 12 },
		})).toBe(true);
	});

	it('ignores updates from another window or a different known tab', () => {
		expect(shouldSyncPanelTabUpdate({
			tabId: 37,
			panelWindowId: 12,
			visibleTabId: 37,
			changeInfo: { status: 'loading' },
			tab: { active: true, windowId: 13 },
		})).toBe(false);
		expect(shouldSyncPanelTabUpdate({
			tabId: 38,
			panelWindowId: 12,
			visibleTabId: 37,
			changeInfo: { status: 'loading' },
			tab: { active: true, windowId: 12 },
		})).toBe(false);
	});

	it('resyncs completion but ignores inactive tabs and irrelevant updates', () => {
		expect(shouldSyncPanelTabUpdate({
			tabId: 37,
			panelWindowId: 12,
			visibleTabId: 37,
			changeInfo: { status: 'complete' },
			tab: { active: true, windowId: 12 },
		})).toBe(true);
		expect(shouldSyncPanelTabUpdate({
			tabId: 37,
			panelWindowId: 12,
			visibleTabId: 37,
			changeInfo: { status: 'unloaded' },
			tab: { active: true, windowId: 12 },
		})).toBe(false);
		expect(shouldSyncPanelTabUpdate({
			tabId: 37,
			panelWindowId: 12,
			visibleTabId: 37,
			changeInfo: { status: 'loading' },
			tab: { active: false, windowId: 12 },
		})).toBe(false);
	});
});
