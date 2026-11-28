import type { VisibleTabIdentity } from "./analysis.ts";

/**
 * Whether two identities name the same document in the same tab and frame.
 *
 * Window, tab and frame ids, the hashed origin and URL, and the privacy mode
 * must all match. The background uses this before analysing a requested target;
 * the panel uses it before applying any reply to what it shows.
 */
export function same(left: VisibleTabIdentity | null, right: VisibleTabIdentity): boolean {
	return Boolean(
		left &&
			left.windowId === right.windowId &&
			left.tabId === right.tabId &&
			left.frameId === right.frameId &&
			left.originHash === right.originHash &&
			left.urlHash === right.urlHash &&
			left.incognito === right.incognito,
	);
}
