/** Runtime message sent after a toolbar action grants active-tab access and opens the side panel. */
export const SIDE_PANEL_ACTION_NOTIFICATION_TYPE = 'kaiju-site-scope.side-panel-action.v1';

/** Runtime message sent when Chrome changes the active page shown beside a mounted side panel. */
export const SIDE_PANEL_TAB_NOTIFICATION_TYPE = 'kaiju-site-scope.side-panel-tab.v1';

/** Lets an already-mounted window-scoped side panel retry its active-tab sync after a toolbar action. */
export type SidePanelActionNotification = {
	readonly type: typeof SIDE_PANEL_ACTION_NOTIFICATION_TYPE;
	readonly tabId: number;
	readonly windowId: number;
};

/** Why background asked the mounted side panel to resolve a new visible tab target. */
export type SidePanelTabNotificationReason = 'activated' | 'updated';

/**
 * Active-tab change forwarded by the background service worker.
 *
 * The side panel also subscribes to `tabs` events directly. Background forwards
 * the same lifecycle signal because Chrome can keep a side-panel document alive
 * across tab changes while extension-page event delivery and service-worker
 * wake-up follow different lifetimes. Either path is enough to trigger a sync;
 * exact target validation prevents duplicate notifications from starting stale
 * analysis work.
 */
export type SidePanelTabNotification = {
	readonly type: typeof SIDE_PANEL_TAB_NOTIFICATION_TYPE;
	readonly tabId: number;
	readonly windowId: number;
	readonly reason: SidePanelTabNotificationReason;
};


/** Browser tab-update fields that can change the page rendered by a side panel. */
export type SidePanelTabUpdateChange = {
	readonly status?: string;
	readonly url?: string;
};

/** Return whether a Chrome tab update can change the visible page identity. */
export function isSidePanelTabUpdateChange(changeInfo: SidePanelTabUpdateChange): boolean {
	return (
		typeof changeInfo.url === 'string' ||
		changeInfo.status === 'loading' ||
		changeInfo.status === 'complete'
	);
}

/** Return whether an arbitrary runtime message is a side-panel action notification. */
export function isSidePanelActionNotification(value: unknown): value is SidePanelActionNotification {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<SidePanelActionNotification>;
	return (
		candidate.type === SIDE_PANEL_ACTION_NOTIFICATION_TYPE &&
		typeof candidate.tabId === 'number' &&
		typeof candidate.windowId === 'number'
	);
}

/** Return whether an arbitrary runtime message is a background active-tab notification. */
export function isSidePanelTabNotification(value: unknown): value is SidePanelTabNotification {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<SidePanelTabNotification>;
	return (
		candidate.type === SIDE_PANEL_TAB_NOTIFICATION_TYPE &&
		typeof candidate.tabId === 'number' &&
		typeof candidate.windowId === 'number' &&
		(candidate.reason === 'activated' || candidate.reason === 'updated')
	);
}
