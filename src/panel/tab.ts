import { browser, type Browser } from 'wxt/browser';

type BrowserTab = Browser.tabs.Tab;

/** Browser window and active tab currently owned by one side-panel document. */
export type PanelTabTarget = {
	readonly windowId: number;
	readonly tabId: number;
};

/** Return the browser window that contains the mounted side-panel document. */
export async function getPanelWindowId(): Promise<number> {
	const currentWindow = await browser.windows.getCurrent();
	if (typeof currentWindow.id !== 'number') {
		throw new Error('Chrome did not provide a window id for the side panel.');
	}

	return currentWindow.id;
}

/** Return the active tab in the browser window that owns the side panel. */
export async function getPanelActiveTab(windowId: number): Promise<BrowserTab | undefined> {
	const [tab] = await browser.tabs.query({ active: true, windowId });
	return tab;
}

/** Return the exact window/tab target that the mounted side panel should render. */
export async function getPanelTabTarget(windowId: number): Promise<PanelTabTarget | undefined> {
	const tab = await getPanelActiveTab(windowId);
	if (typeof tab?.id !== 'number') {
		return undefined;
	}

	return { windowId, tabId: tab.id };
}
