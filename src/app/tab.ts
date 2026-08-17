import { browser, type Browser } from 'wxt/browser';

import { isSidePanelActionNotification, isSidePanelTabNotification } from '@/lib/messaging';
import { shouldSyncTabUpdate } from '@/app/tab-update';

type BrowserTab = Browser.tabs.Tab;

/** Browser window and active tab currently owned by one side-panel document. */
export type TabTarget = {
	readonly windowId: number;
	readonly tabId: number;
};

/** Minimal document lifecycle surface used to recover a visible side panel after suspension. */
export type TabVisibility = {
	readonly visibilityState: DocumentVisibilityState;
	addEventListener(type: 'visibilitychange', listener: () => void): void;
	removeEventListener(type: 'visibilitychange', listener: () => void): void;
};

/** Inputs needed to subscribe one mounted side panel to its active tab target. */
export type TabTargetSubscription = {
	readonly getWindowId: () => number | null;
	readonly getVisibleTabId: () => number | null;
	readonly sync: (target?: TabTarget) => void;
	readonly visibility?: TabVisibility;
};

/** Return the browser window that contains the mounted side-panel document. */
export async function getWindowId(): Promise<number> {
	const currentWindow = await browser.windows.getCurrent();
	if (typeof currentWindow.id !== 'number') {
		throw new Error('Chrome did not provide a window id for the side panel.');
	}

	return currentWindow.id;
}

/** Return the active tab in the browser window that owns the side panel. */
export async function getActiveTab(windowId: number): Promise<BrowserTab | undefined> {
	const [tab] = await browser.tabs.query({ active: true, windowId });
	return tab;
}

/** Return the exact window/tab target that the mounted side panel should render. */
export async function getTabTarget(windowId: number): Promise<TabTarget | undefined> {
	const tab = await getActiveTab(windowId);
	if (typeof tab?.id !== 'number') {
		return undefined;
	}

	return { windowId, tabId: tab.id };
}

/**
 * Subscribe one mounted side panel to the active tab in its browser window.
 *
 * Chrome tab events are the primary signal. Background notifications provide a
 * second delivery path because a long-lived side panel can miss an extension-page
 * event while Chrome suspends or recreates another extension context. Duplicate
 * signals are safe because the caller compares the resolved visible-tab identity.
 */
export function subscribeTabTargetChanges(input: TabTargetSubscription): () => void {
	const visibility = input.visibility ?? document;
	const onActivated = (activeInfo: { readonly tabId: number; readonly windowId: number }): void => {
		if (input.getWindowId() !== activeInfo.windowId) return;
		input.sync(activeInfo);
	};
	const onUpdated = (
		tabId: number,
		changeInfo: { readonly status?: string; readonly url?: string },
		tab: { readonly active?: boolean; readonly windowId?: number },
	): void => {
		const panelWindowId = input.getWindowId();
		if (!shouldSyncTabUpdate({
			tabId,
			panelWindowId,
			visibleTabId: input.getVisibleTabId(),
			changeInfo,
			tab,
		})) return;

		input.sync({ windowId: tab.windowId!, tabId });
	};
	const onRuntimeMessage = (message: unknown): void => {
		const panelWindowId = input.getWindowId();
		if (isSidePanelActionNotification(message)) {
			if (message.windowId !== panelWindowId) return;
			input.sync({ windowId: message.windowId, tabId: message.tabId });
			return;
		}

		if (!isSidePanelTabNotification(message) || message.windowId !== panelWindowId) return;
		input.sync({ windowId: message.windowId, tabId: message.tabId });
	};
	const onVisibilityChange = (): void => {
		if (visibility.visibilityState === 'visible') input.sync();
	};

	browser.tabs.onActivated.addListener(onActivated);
	browser.tabs.onUpdated.addListener(onUpdated);
	browser.runtime.onMessage.addListener(onRuntimeMessage);
	visibility.addEventListener('visibilitychange', onVisibilityChange);

	return () => {
		browser.tabs.onActivated.removeListener(onActivated);
		browser.tabs.onUpdated.removeListener(onUpdated);
		browser.runtime.onMessage.removeListener(onRuntimeMessage);
		visibility.removeEventListener('visibilitychange', onVisibilityChange);
	};
}
