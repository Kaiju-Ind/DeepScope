import * as session from '@/app/session';

/** Diagnostics sections retained for an investigator during one mounted document session. */
export type TabType = 'overview' | 'timeline' | 'jobs' | 'contexts' | 'raw';

/** Diagnostic chronology used by the virtual timeline. */
export type OrderType = 'newest' | 'oldest';

/** Transient diagnostic controls owned by one browser tab in the current panel session. */
export interface StateType {
	readonly tab: TabType;
	readonly search: string;
	readonly level: string;
	readonly surface: string;
	readonly order: OrderType;
	readonly selectedRecordId?: string;
	readonly timelineScrollTop: number;
	readonly jobSearch: string;
}

/** Fresh investigator state for a browser tab that has not opened Diagnostics yet. */
const initial: StateType = {
	tab: 'overview',
	search: '',
	level: 'all',
	surface: 'all',
	order: 'newest',
	timelineScrollTop: 0,
	jobSearch: '',
};

/** Options-page state has no browser-tab owner, so it stays local to this document. */
let standalone: StateType = { ...initial };

/** Get investigator state for one side-panel tab or the standalone options document. */
export function get(tabId: number | undefined): StateType {
	return tabId === undefined ? standalone : session.get<StateType>(tabId, 'diagnostics') ?? initial;
}

/** Save transient investigator controls without writing them to extension storage. */
export function save(tabId: number | undefined, next: Partial<StateType>): void {
	const value = { ...get(tabId), ...next };
	if (tabId === undefined) standalone = value;
	else session.save(tabId, 'diagnostics', value);
}
