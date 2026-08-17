import { isSideTabUpdateChange, type SideTabUpdateChange } from '@/lib/messaging';

/** Browser tab update fields needed to decide whether the mounted panel must resync. */
export type TabUpdate = {
	readonly tabId: number;
	readonly panelWindowId: number | null;
	readonly visibleTabId: number | null;
	readonly changeInfo: SideTabUpdateChange;
	readonly tab: { readonly active?: boolean; readonly windowId?: number };
};

/** Return whether a tab update can change the page rendered by this side panel. */
export function shouldSyncTabUpdate(input: TabUpdate): boolean {
	if (
		input.panelWindowId === null ||
		input.tab.windowId !== input.panelWindowId ||
		input.tab.active !== true ||
		(input.visibleTabId !== null && input.visibleTabId !== input.tabId)
	) {
		return false;
	}

	return isSideTabUpdateChange(input.changeInfo);
}
