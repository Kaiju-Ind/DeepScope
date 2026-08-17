import { isSidePanelTabUpdateChange, type SidePanelTabUpdateChange } from '@/lib/messaging';

/** Browser tab update fields needed to decide whether the mounted panel must resync. */
export type PanelTabUpdate = {
	readonly tabId: number;
	readonly panelWindowId: number | null;
	readonly visibleTabId: number | null;
	readonly changeInfo: SidePanelTabUpdateChange;
	readonly tab: { readonly active?: boolean; readonly windowId?: number };
};

/** Return whether a tab update can change the page rendered by this side panel. */
export function shouldSyncPanelTabUpdate(input: PanelTabUpdate): boolean {
	if (
		input.panelWindowId === null ||
		input.tab.windowId !== input.panelWindowId ||
		input.tab.active !== true ||
		(input.visibleTabId !== null && input.visibleTabId !== input.tabId)
	) {
		return false;
	}

	return isSidePanelTabUpdateChange(input.changeInfo);
}
