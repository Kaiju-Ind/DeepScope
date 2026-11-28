import { browser } from 'wxt/browser';

import { panelPageTabId, panelPageUrl } from "../../lib/panel/page.ts";

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

/** Read the target policy for a mounted document from its own URL. */
export function policyFromLocation(href: string): TargetPolicy {
	const tabId = panelPageTabId(href);
	return tabId === undefined ? { kind: 'follow-window' } : { kind: 'pinned', tabId };
}

/**
 * Open a full DeepScope page for one tab, next to that tab.
 *
 * Opening it beside the inspected tab keeps the pair together in the tab strip.
 */
export async function openPage(tab: { readonly tabId: number; readonly windowId: number }): Promise<void> {
	const source = await browser.tabs.get(tab.tabId);
	await browser.tabs.create({
		url: panelPageUrl(tab.tabId),
		windowId: tab.windowId,
		...(typeof source.index === 'number' ? { index: source.index + 1 } : {}),
		openerTabId: tab.tabId,
	});
}

/** Open the independent support page through the browser's options-page contract. */
export function openDiagnostics(): Promise<void> {
	return browser.runtime.openOptionsPage();
}

/** Read the installed version when a panel mounts; importing a UI module performs no browser work. */
export function getVersion(): string {
	return browser.runtime.getManifest().version;
}
