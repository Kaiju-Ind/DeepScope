import type { DetectionSessionKey, DetectionSessionSnapshot } from "../session.ts";

import type { VisibleTabIdentity } from "../../messaging/analysis.ts";

import { browser } from "wxt/browser";

import { getDetectionOriginSnapshotKey, getDetectionSessionSnapshotKey } from "../contracts.ts";
import { getDetectionSessionIndex } from './sessions.ts';
import { isSnapshotForVisibleIdentity, isRenderableDetectorSnapshot } from './rank.ts';
import { cloneDetectionSessionSnapshot } from './clone.ts';
import { isDetectionSessionSnapshot } from './schema.ts';

/** Return the latest snapshot for an exact page session, when storage still has one. */
export async function getLatestDetectionSessionSnapshot(
	key: DetectionSessionKey,
): Promise<DetectionSessionSnapshot | null> {
	return getStoredDetectionSnapshot(getDetectionSessionSnapshotKey(key));
}

/** Return the newest stored snapshot for an origin hash, regardless of document session. */
export async function getLatestDetectionOriginSnapshot(
	originHash: string,
): Promise<DetectionSessionSnapshot | null> {
	return getStoredDetectionSnapshot(getDetectionOriginSnapshotKey(originHash));
}

/**
 * Return the best renderable snapshot for the currently visible tab.
 *
 * Exact page-session snapshots win because they prove the result belongs to the
 * active tab and URL. The origin pointer is only a fallback when it still matches
 * the exact visible identity, so a queued background response cannot erase the
 * side panel with an empty placeholder after the tab already produced detections.
 */
export async function getBestVisibleDetectionSessionSnapshot(
	identity: VisibleTabIdentity,
): Promise<DetectionSessionSnapshot | null> {
	if (identity.incognito) {
		return null;
	}

	const index = await getDetectionSessionIndex(identity.tabId);
	const exactSnapshots: DetectionSessionSnapshot[] = [];

	for (const entry of index.entries) {
		if (entry.key.frameId !== identity.frameId || entry.urlHash !== identity.urlHash) {
			continue;
		}

		const snapshot = await getLatestDetectionSessionSnapshot(entry.key);
		if (snapshot && isSnapshotForVisibleIdentity(identity, snapshot) && isRenderableDetectorSnapshot(snapshot)) {
			exactSnapshots.push(snapshot);
		}
	}

	const newestExactSnapshot = exactSnapshots
		.sort((left, right) => right.updatedAt - left.updatedAt || right.revision - left.revision)[0];
	if (newestExactSnapshot) {
		return cloneDetectionSessionSnapshot(newestExactSnapshot);
	}

	const originSnapshot = await getLatestDetectionOriginSnapshot(identity.originHash);
	if (!originSnapshot || !isSnapshotForVisibleIdentity(identity, originSnapshot) || !isRenderableDetectorSnapshot(originSnapshot)) {
		return null;
	}

	return originSnapshot;
}

/** Read and clone a snapshot only after the storage value passes a defensive shape check. */
export async function getStoredDetectionSnapshot(storageKey: string): Promise<DetectionSessionSnapshot | null> {
	const raw = await browser.storage.local.get(storageKey);
	const value = raw[storageKey];

	if (!isDetectionSessionSnapshot(value)) {
		return null;
	}

	return cloneDetectionSessionSnapshot(value);
}
