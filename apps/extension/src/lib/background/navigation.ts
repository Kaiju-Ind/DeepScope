/** Why one `tabs.onUpdated` event should start an automatic refresh of the tab's document. */
export type RefreshReason = 'page-load' | 'same-document';

/** The parts of a `tabs.onUpdated` change and tab this decision reads. */
interface TabChange {
	readonly status?: string;
	readonly url?: string;
}

/**
 * Return why a tab update should refresh the tab's results, or nothing.
 *
 * A full load ends with `status: 'complete'`. `history.pushState`,
 * `replaceState` and fragment changes swap the URL of a document that has
 * already loaded: the browser reports only the new URL, and no `complete`
 * follows. The lifecycle listener has already marked the old URL's results
 * stale and cancelled its scans by then, so without a refresh here the new URL
 * would never get results of its own while the tab stays active.
 * (`webNavigation.onHistoryStateUpdated` reports the same change but needs a
 * permission this extension does not request.)
 */
export function refreshReason(change: TabChange, tab: TabChange): RefreshReason | undefined {
	if (change.status === 'complete') return 'page-load';
	if (change.url !== undefined && change.status === undefined && tab.status === 'complete') return 'same-document';
	return undefined;
}
