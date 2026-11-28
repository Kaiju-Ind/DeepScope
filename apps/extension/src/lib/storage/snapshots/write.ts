import type { DetectionSessionSnapshot } from "../session.ts";
import * as fence from "../../../utils/fence.ts";

import type { DetectionSessionSnapshotWriteResult } from "../../persistence/ports.ts";
import { browser } from "wxt/browser";

import { getDetectionOriginSnapshotKey, getDetectionSessionSnapshotKey } from "../contracts.ts";
import { getStoredDetectionSnapshot } from './read.ts';
import { cloneDetectionSessionSnapshot } from './clone.ts';
import { shouldPreserveExistingAnalysisForCandidate, mergeLowerCompletenessSnapshot } from './rank.ts';
import { promoteOriginSnapshot, refreshDetectionStorageStatusSnapshot } from './origins.ts';
import { upsertDetectionSessionIndex } from './sessions.ts';

/** Serialize detector writes and lifecycle changes within their owning background context. */
const sessionWrites = fence.create<string>();

/**
 * Persist a newer detector revision under the exact session's mutation fence.
 *
 * Concurrent callers in this background context cannot overwrite a newer revision
 * with a delayed older write. Content uses a separate lifecycle storage key; this
 * fence is not a browser-wide transaction or a lock across extension contexts.
 */
export function saveDetectionSessionSnapshot(
	snapshot: DetectionSessionSnapshot,
): Promise<DetectionSessionSnapshotWriteResult> {
	const sessionStorageKey = getDetectionSessionSnapshotKey(snapshot.key);
	return sessionWrites.run(sessionStorageKey, async () => {
		const existing = await getStoredDetectionSnapshot(sessionStorageKey);
		return persistSnapshot(snapshot, existing);
	});
}

/**
 * Allocate a lifecycle revision from the latest stored detector state under the same fence.
 *
 * The callback receives an owned copy and may return null to skip the transition.
 * This writer retains session identity and allocates the next revision, so a tab
 * lifecycle event cannot read an old revision while a detector write is pending.
 */
export function reviseDetectionSessionSnapshot(
	key: DetectionSessionSnapshot['key'],
	change: (existing: DetectionSessionSnapshot) => DetectionSessionSnapshot | null,
): Promise<DetectionSessionSnapshotWriteResult | null> {
	return sessionWrites.run(getDetectionSessionSnapshotKey(key), async () => {
		const existing = await getStoredDetectionSnapshot(getDetectionSessionSnapshotKey(key));
		if (!existing) return null;
		const changed = change(cloneDetectionSessionSnapshot(existing));
		if (!changed) return null;
		return persistSnapshot({ ...changed, key: { ...key }, revision: existing.revision + 1 }, existing);
	});
}

/**
 * Commit a revision and its derived indexes while the caller holds the exact-session fence.
 *
 * Shared slots are acquired and released in order: origin plus summary, aggregate
 * status, then tab index. They never overlap or call back into the session writer.
 */
async function persistSnapshot(
	snapshot: DetectionSessionSnapshot,
	existing: DetectionSessionSnapshot | null,
): Promise<DetectionSessionSnapshotWriteResult> {
	const sessionStorageKey = getDetectionSessionSnapshotKey(snapshot.key);
	const originStorageKey = getDetectionOriginSnapshotKey(snapshot.key.originHash);

	if (existing && existing.revision >= snapshot.revision) {
		return {
			accepted: false,
			sessionStorageKey,
			originStorageKey,
			snapshot: cloneDetectionSessionSnapshot(existing),
			rejectedByRevision: existing.revision,
		};
	}

	if (existing && shouldPreserveExistingAnalysisForCandidate(snapshot, existing)) {
		const merged = mergeLowerCompletenessSnapshot(snapshot, existing);
		await browser.storage.local.set({ [sessionStorageKey]: merged });
		const promoted = await promoteOriginSnapshot(originStorageKey, merged);
		if (promoted) {
			await refreshDetectionStorageStatusSnapshot();
		}
		await upsertDetectionSessionIndex(merged);

		return {
			accepted: true,
			sessionStorageKey,
			originStorageKey,
			snapshot: cloneDetectionSessionSnapshot(merged),
		};
	}

	const normalized = cloneDetectionSessionSnapshot(snapshot);
	await browser.storage.local.set({ [sessionStorageKey]: normalized });
	const promoted = await promoteOriginSnapshot(originStorageKey, normalized);
	if (promoted) {
		await refreshDetectionStorageStatusSnapshot();
	}
	await upsertDetectionSessionIndex(normalized);

	return {
		accepted: true,
		sessionStorageKey,
		originStorageKey,
		snapshot: cloneDetectionSessionSnapshot(normalized),
	};
}
