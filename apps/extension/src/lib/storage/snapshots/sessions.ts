import type { DetectionSessionKey, DetectionSessionSnapshot } from "../session.ts";

import type { DetectionSessionIndexEntry, DetectionSessionIndexRecord } from "../../persistence/ports.ts";
import { browser } from "wxt/browser";
import * as fence from "../../../utils/fence.ts";

import { getContentSessionLifecycleKey, getDetectionSessionIndexKey, getDetectionSessionSnapshotKey } from "../contracts.ts";
import { isDetectionSessionIndexRecord } from './schema.ts';
import { cloneDetectionSessionIndexRecord } from './clone.ts';

/** Order pointer updates, eviction, and removal per tab within the owning background context. */
const indexWrites = fence.create<number>();

/** Return the known detection sessions for one browser tab, newest first. */
export async function getDetectionSessionIndex(
	tabId: number,
): Promise<DetectionSessionIndexRecord> {
	const key = getDetectionSessionIndexKey(tabId);
	const raw = await browser.storage.local.get(key);
	const value = raw[key];

	if (!isDetectionSessionIndexRecord(value, tabId)) {
		return { tabId, entries: [], updatedAt: 0 };
	}

	return cloneDetectionSessionIndexRecord(value);
}

/**
 * Remove indexed sessions after any already queued update for this tab settles.
 *
 * The lifecycle caller still closes write admission and performs a second cleanup
 * after admitted writers settle; this slot cannot stop an earlier writer that
 * has not reached its index update yet.
 */
export async function removeDetectionSessionIndex(tabId: number): Promise<void> {
	return indexWrites.run(tabId, async () => {
		const index = await getDetectionSessionIndex(tabId);
		const keys = [
			getDetectionSessionIndexKey(tabId),
			...index.entries.flatMap((entry) => [
				getDetectionSessionSnapshotKey(entry.key),
				getContentSessionLifecycleKey(entry.key),
			]),
		];

		await browser.storage.local.remove(keys);
	});
}

/** Merge, retain, and evict pointers under one tab slot so independent sessions cannot erase each other. */
export async function upsertDetectionSessionIndex(snapshot: DetectionSessionSnapshot): Promise<void> {
	const tabId = snapshot.key.tabId;
	return indexWrites.run(tabId, async () => {
		const index = await getDetectionSessionIndex(tabId);
		const entry: DetectionSessionIndexEntry = {
			key: { ...snapshot.key },
			urlHash: snapshot.urlHash,
			status: snapshot.status,
			updatedAt: snapshot.updatedAt,
		};
		const allEntries = [
			entry,
			...index.entries.filter((item) => !isSameDetectionSessionKey(item.key, snapshot.key)),
		];
		const entries = allEntries
			.sort((left, right) => right.updatedAt - left.updatedAt)
			.slice(0, 20);
		const evictedEntries = allEntries.filter((candidate) =>
			!entries.some((retained) => isSameDetectionSessionKey(retained.key, candidate.key))
		);

		await browser.storage.local.set({
			[getDetectionSessionIndexKey(tabId)]: {
				tabId,
				entries,
				updatedAt: snapshot.updatedAt,
			} satisfies DetectionSessionIndexRecord,
		});

		if (evictedEntries.length > 0) {
			await browser.storage.local.remove(evictedEntries.flatMap((evicted) => [
				getDetectionSessionSnapshotKey(evicted.key),
				getContentSessionLifecycleKey(evicted.key),
			]));
		}
	});
}

/** Compare exact session keys without depending on object identity from storage mocks. */
function isSameDetectionSessionKey(left: DetectionSessionKey, right: DetectionSessionKey): boolean {
	return (
		left.tabId === right.tabId &&
		left.frameId === right.frameId &&
		left.documentId === right.documentId &&
		left.originHash === right.originHash
	);
}
