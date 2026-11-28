import { browser, type Browser } from 'wxt/browser';

import { isSidePanelActionNotification, isSidePanelTabNotification } from "../../lib/messaging/index.ts";
import type { TargetPolicy } from "./surface.ts";
import { shouldSyncTabUpdate } from "../model/tab.ts";

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
	/** Remove panel-local state when Chrome closes a tab in this panel window. */
	readonly closed?: (tabId: number) => void;
	readonly visibility?: TabVisibility;
	/** Follow the window's active tab, or stay on one pinned tab. Defaults to following. */
	readonly policy?: TargetPolicy;
};

/**
 * Return the browser window whose tab the mounted surface describes.
 *
 * A following surface describes its own window. A pinned page describes the
 * window that currently holds its tab, which changes when the tab is moved.
 */
export async function getWindowId(policy: TargetPolicy = { kind: 'follow-window' }): Promise<number> {
	if (policy.kind === 'pinned') {
		const tab = await browser.tabs.get(policy.tabId);
		if (typeof tab.windowId !== 'number') throw new Error('The browser did not report a window for the inspected tab.');
		return tab.windowId;
	}

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

/** Return the exact window/tab target that the mounted surface should render. */
export async function getTabTarget(
	windowId: number,
	policy: TargetPolicy = { kind: 'follow-window' },
): Promise<TabTarget | undefined> {
	if (policy.kind === 'pinned') {
		try {
			const tab = await browser.tabs.get(policy.tabId);
			return typeof tab.windowId === 'number' ? { windowId: tab.windowId, tabId: policy.tabId } : undefined;
		} catch {
			// `tabs.get` rejects once the tab is closed; the page then has no target.
			return undefined;
		}
	}

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
	const pinnedTabId = input.policy?.kind === 'pinned' ? input.policy.tabId : null;
	/** Retarget following panels only within their owning window; pinned panels ignore activation elsewhere. */
	const onActivated = (activeInfo: { readonly tabId: number; readonly windowId: number }): void => {
		// A pinned page keeps its tab; activating another tab is not a retarget.
		if (pinnedTabId !== null) return;
		if (input.getWindowId() !== activeInfo.windowId) return;
		input.sync(activeInfo);
	};
	/** Re-resolve relevant navigation/completion changes under pinned or following policy without reacting to unrelated tabs. */
	const onUpdated = (
		tabId: number,
		changeInfo: { readonly status?: string; readonly url?: string },
		tab: { readonly active?: boolean; readonly windowId?: number },
	): void => {
		if (pinnedTabId !== null) {
			// Navigation inside the pinned tab, or moving it between windows, re-resolves it.
			if (tabId === pinnedTabId && (changeInfo.status === 'complete' || changeInfo.url !== undefined)) input.sync();
			return;
		}
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
	/** Notify the panel when its relevant tab closes, and re-resolve a closed pinned target. */
	const onRemoved = (tabId: number, removeInfo: { readonly windowId: number }): void => {
		if (pinnedTabId !== null) {
			if (tabId !== pinnedTabId) return;
			input.closed?.(tabId);
			input.sync();
			return;
		}
		if (input.getWindowId() !== removeInfo.windowId) return;
		input.closed?.(tabId);
	};
	/** Accept toolbar/tab notifications only for following panels in the matching window. */
	const onRuntimeMessage = (message: unknown): void => {
		// Toolbar and tab notifications describe the active tab, which a pinned page ignores.
		if (pinnedTabId !== null) return;
		const panelWindowId = input.getWindowId();
		if (isSidePanelActionNotification(message)) {
			if (message.windowId !== panelWindowId) return;
			input.sync({ windowId: message.windowId, tabId: message.tabId });
			return;
		}

		if (!isSidePanelTabNotification(message) || message.windowId !== panelWindowId) return;
		input.sync({ windowId: message.windowId, tabId: message.tabId });
	};
	/** Re-resolve the target when a hidden panel becomes visible and may have missed relevant browser state. */
	const onVisibilityChange = (): void => {
		if (visibility.visibilityState === 'visible') input.sync();
	};

	browser.tabs.onActivated.addListener(onActivated);
	browser.tabs.onUpdated.addListener(onUpdated);
	browser.tabs.onRemoved.addListener(onRemoved);
	browser.runtime.onMessage.addListener(onRuntimeMessage);
	visibility.addEventListener('visibilitychange', onVisibilityChange);

	return () => {
		browser.tabs.onActivated.removeListener(onActivated);
		browser.tabs.onUpdated.removeListener(onUpdated);
		browser.tabs.onRemoved.removeListener(onRemoved);
		browser.runtime.onMessage.removeListener(onRuntimeMessage);
		visibility.removeEventListener('visibilitychange', onVisibilityChange);
	};
}
