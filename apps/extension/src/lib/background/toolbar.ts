import { browser } from 'wxt/browser';

import { SIDE_PANEL_ACTION_NOTIFICATION_TYPE } from "../messaging/side-panel-notifications.ts";
import { panelPageUrl } from "../panel/page.ts";

/** Diagnostic logger used by the toolbar handler. */
type Log = (event: string, details?: Record<string, unknown>) => void;

/** Firefox's sidebar API. `wxt/browser` types follow Chrome, which has no such namespace. */
interface FirefoxSidebarAction {
	toggle(): Promise<void>;
}

/**
 * Open DeepScope for the tab whose toolbar button was clicked.
 *
 * Each browser offers a different surface, chosen by what the API provides:
 *
 * - Chromium: the window's side panel. It belongs to the window, so it keeps
 *   following the active tab after it opens.
 * - Firefox: the sidebar. Firefox only opens it while handling the click, so
 *   the call is made synchronously, before anything is awaited.
 * - Safari: the manifest declares a popup, so the browser opens it and never
 *   delivers this click. If a browser without either API does deliver it, a
 *   full page pinned to the clicked tab opens instead.
 *
 * After the surface opens, the mounted panel is told which tab was clicked, in
 * case it missed the activation event while it was starting.
 */
export function openPanelFromToolbar(tab: { readonly id?: number; readonly windowId?: number }, log: Log): void {
	const { id: tabId, windowId } = tab;
	if (typeof tabId !== 'number' || typeof windowId !== 'number') {
		log('side-panel-open-skipped', { reason: 'missing-tab-id' });
		return;
	}

	const opened = openSurface(tabId, windowId);
	void opened
		.then((surface) => {
			if (surface === 'page') return;
			return browser.runtime.sendMessage({ type: SIDE_PANEL_ACTION_NOTIFICATION_TYPE, tabId, windowId })
				.catch((error: unknown) => {
					log('side-panel-action-notification-failed', { tabId, windowId, message: errorMessage(error) });
				});
		})
		.catch((error: unknown) => {
			log('side-panel-open-failed', { tabId, windowId, message: errorMessage(error) });
		});
}

/** Start opening the best available surface. Must run synchronously inside the click handler. */
function openSurface(tabId: number, windowId: number): Promise<'side-panel' | 'sidebar' | 'page'> {
	if (browser.sidePanel?.open) {
		return browser.sidePanel.open({ windowId }).then(() => 'side-panel' as const);
	}

	const sidebarAction = (browser as unknown as { sidebarAction?: FirefoxSidebarAction }).sidebarAction;
	if (sidebarAction?.toggle) {
		return sidebarAction.toggle().then(() => 'sidebar' as const);
	}

	return browser.tabs.create({ url: panelPageUrl(tabId), windowId, openerTabId: tabId }).then(() => 'page' as const);
}

/** Normalize a toolbar failure to readable text for its caller's error-reporting policy. */
function errorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}
