import { browser } from 'wxt/browser';

import { CONTENT_SESSION_LIFECYCLE_PREFIX, DETECTION_SESSION_SNAPSHOT_PREFIX } from "./contracts.ts";
import { removeDetectionSessionIndex } from './snapshots/sessions.ts';

/** `storage.local` as typed here; `getKeys` is Chrome 130+ and newer Firefox only. */
type KeyedStorageArea = {
	get(keys: null): Promise<Record<string, unknown>>;
	getKeys?: () => Promise<string[]>;
	remove(keys: string | readonly string[]): Promise<void>;
};

/**
 * Remove every stored session a closed tab owned.
 *
 * The tab's index names the sessions the background recorded. A content
 * script also writes lifecycle records (`rd:content-session:`) that the
 * index may never have listed, and a write that was in flight when the
 * index was read can land after it, so the sweep also removes any session
 * or content-session key whose tab part is this tab.
 */
export async function removeTabSessions(tabId: number): Promise<void> {
	await removeDetectionSessionIndex(tabId);
	const area = browser.storage.local as unknown as KeyedStorageArea;
	const keys = area.getKeys ? await area.getKeys() : Object.keys(await area.get(null));
	const owned = [DETECTION_SESSION_SNAPSHOT_PREFIX, CONTENT_SESSION_LIFECYCLE_PREFIX].map((prefix) => `${prefix}${tabId}:`);
	const leftovers = keys.filter((key) => owned.some((prefix) => key.startsWith(prefix)));
	if (leftovers.length > 0) await area.remove(leftovers);
}
