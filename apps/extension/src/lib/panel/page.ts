import { browser } from 'wxt/browser';

/** Published path of the full-page surface (`src/entrypoints/panel/index.html`). */
export const PANEL_PAGE_PATH = '/panel.html';

/** Query parameter that names the tab a full page describes. */
export const PANEL_PAGE_TAB_PARAMETER = 'tab';

/** Build the extension URL of a full page pinned to one tab. */
export function panelPageUrl(tabId: number): string {
	const url = new URL(browser.runtime.getURL(PANEL_PAGE_PATH));
	url.searchParams.set(PANEL_PAGE_TAB_PARAMETER, String(tabId));
	return url.href;
}

/** Read the pinned tab id from a full-page URL, or `undefined` when it names none. */
export function panelPageTabId(href: string): number | undefined {
	const raw = new URL(href).searchParams.get(PANEL_PAGE_TAB_PARAMETER);
	const tabId = raw === null ? Number.NaN : Number(raw);
	return Number.isSafeInteger(tabId) && tabId >= 0 ? tabId : undefined;
}
