/** Per-tab state retained only for the lifetime of one mounted side panel. */
interface TabSessionType {
	/** Last route visited for this browser tab during the current panel session. */
	route: string;
	/** Page-owned transient state such as searches and view choices. */
	readonly pages: Map<string, unknown>;
}

/** In-memory session store. A new side-panel document starts with an empty store. */
const tabs = new Map<number, TabSessionType>();

/** Open a tab in this panel session and report whether it has been seen before. */
export function open(tabId: number): { readonly first: boolean; readonly route: string } {
	const existing = tabs.get(tabId);
	if (existing) return { first: false, route: existing.route };

	tabs.set(tabId, { route: '/', pages: new Map() });
	return { first: true, route: '/' };
}

/** Save the last route used by one tab. */
export function route(tabId: number, value: string): void {
	const tab = tabs.get(tabId) ?? { route: '/', pages: new Map<string, unknown>() };
	tab.route = value;
	tabs.set(tabId, tab);
}

/** Get transient page state for one tab in the current side-panel session. */
export function get<T>(tabId: number | undefined, page: string): T | undefined {
	if (tabId === undefined) return undefined;
	return tabs.get(tabId)?.pages.get(page) as T | undefined;
}

/** Save transient page state for one tab in the current side-panel session. */
export function save<T>(tabId: number | undefined, page: string, value: T): void {
	if (tabId === undefined) return;
	const tab = tabs.get(tabId) ?? { route: '/', pages: new Map<string, unknown>() };
	tab.pages.set(page, value);
	tabs.set(tabId, tab);
}
