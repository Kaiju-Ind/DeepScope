import { browser } from 'wxt/browser';

/**
 * Where the DeepScope application is mounted.
 *
 * - `sidepanel`: the Chromium side panel.
 * - `sidebar`: the Firefox sidebar (`sidebar_action`). It loads the same page as
 *   the side panel, so it reports `sidepanel` until the two need to differ.
 * - `popup`: the toolbar popup. Safari uses it because Safari has no sidebar API.
 * - `page`: a full browser tab, available from every other surface.
 */
export type PanelSurface = 'sidepanel' | 'popup' | 'page';

/**
 * How a mounted surface chooses the browser tab it describes.
 *
 * Side panels, sidebars and popups follow the active tab of their own window.
 * A full page cannot do that: opening it makes the page itself the active tab.
 * It is therefore pinned to the tab it was opened for and keeps describing that
 * tab while the user switches tabs or moves the tab to another window.
 */
export type TargetPolicy =
	| { readonly kind: 'follow-window' }
	| { readonly kind: 'pinned'; readonly tabId: number };

/** Query parameter that names the tab a full page describes. */
const TAB_PARAMETER = 'tab';

/** Published path of the full-page entrypoint (`src/entrypoints/panel/index.html`). */
const PAGE_PATH = '/panel.html';

/** Read the target policy for a mounted document from its own URL. */
export function policyFromLocation(href: string): TargetPolicy {
	const raw = new URL(href).searchParams.get(TAB_PARAMETER);
	const tabId = raw === null ? Number.NaN : Number(raw);
	return Number.isSafeInteger(tabId) && tabId >= 0 ? { kind: 'pinned', tabId } : { kind: 'follow-window' };
}

/** Build the extension URL of a full page pinned to one tab. */
export function pageUrl(tabId: number): string {
	const url = new URL(browser.runtime.getURL(PAGE_PATH));
	url.searchParams.set(TAB_PARAMETER, String(tabId));
	return url.href;
}

/**
 * Open a full DeepScope page for one tab, next to that tab.
 *
 * Opening it beside the inspected tab keeps the pair together in the tab strip.
 */
export async function openPage(tab: { readonly tabId: number; readonly windowId: number }): Promise<void> {
	const source = await browser.tabs.get(tab.tabId);
	await browser.tabs.create({
		url: pageUrl(tab.tabId),
		windowId: tab.windowId,
		...(typeof source.index === 'number' ? { index: source.index + 1 } : {}),
		openerTabId: tab.tabId,
	});
}
