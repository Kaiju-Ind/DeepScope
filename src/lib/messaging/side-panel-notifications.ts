/** Runtime message sent after a toolbar action grants active-tab access and opens the side panel. */
export const SIDE_PANEL_ACTION_NOTIFICATION_TYPE = 'kaiju-site-scope.side-panel-action.v1';

/** Lets an already-mounted tab-specific side panel retry analysis after a fresh action invocation. */
export type SidePanelActionNotification = {
	readonly type: typeof SIDE_PANEL_ACTION_NOTIFICATION_TYPE;
	readonly tabId: number;
};

/** Return whether an arbitrary runtime message is a side-panel action notification. */
export function isSidePanelActionNotification(value: unknown): value is SidePanelActionNotification {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<SidePanelActionNotification>;
	return candidate.type === SIDE_PANEL_ACTION_NOTIFICATION_TYPE && typeof candidate.tabId === 'number';
}
