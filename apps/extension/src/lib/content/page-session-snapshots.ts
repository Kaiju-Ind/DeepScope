import type { ContentPageSessionSnapshotTarget } from "../messaging/analysis.ts";
import type { DetectionSessionSnapshot, DetectionSessionStatus } from "../storage/session.ts";
import type { SiteAnalysis } from "@deepscope/detection/types";

import { browser } from 'wxt/browser';

import { DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION } from "../storage/session.ts";
import { browserDetectionSnapshotStore } from "../persistence/index.ts";
import type { DetectionSnapshotReader, DetectionSnapshotWriter } from "../persistence/index.ts";
import { getContentSessionLifecycleKey, getDetectionOriginSnapshotKey, getDetectionSessionSnapshotKey } from "../storage/contracts.ts";

/**
 * Input for publishing content-owned progress to the durable side-panel stream.
 *
 * The content script does not run the full detector. It can still publish the
 * page-session lifecycle so the side panel sees that the page-local observer is alive
 * before the background service worker finishes richer analysis.
 */
export interface WriteContentPageSessionSnapshotInput {
	/** Session storage identity supplied by the background. */
	readonly target: ContentPageSessionSnapshotTarget;
	/** Visible lifecycle state represented by this content revision. */
	readonly status: Extract<
		DetectionSessionStatus,
		'collecting' | 'observing' | 'stopped' | 'stale'
	>;
	/** Timestamp from the collector or observer event. Defaults to the wall clock. */
	readonly observedAt?: number;
	/** Optional reason stored on the enrichment state for diagnostics. */
	readonly reason?: string;
}

/** Store shape used when content publishes lifecycle-only page-session revisions. */
export type ContentPageSessionSnapshotStore = Pick<DetectionSnapshotReader, 'getLatestSessionSnapshot'> & DetectionSnapshotWriter;

/**
 * Publish a content-owned snapshot revision for the current page session.
 *
 * Content revisions preserve any existing analysis for the same document. That
 * lets page-local observation update the stream without erasing detections that
 * the background already produced. When no analysis exists yet, a minimal empty
 * analysis paints the correct URL, hostname, and lifecycle state until the first
 * detector result arrives.
 */
export async function writeContentPageSessionSnapshot(
	input: WriteContentPageSessionSnapshotInput,
	store: ContentPageSessionSnapshotStore = createBrowserContentPageSessionSnapshotStore(),
): Promise<DetectionSessionSnapshot | null> {
	if (input.target.incognito) {
		return null;
	}

	const updatedAt = input.observedAt ?? Date.now();
	const existing = await store.getLatestSessionSnapshot(input.target.key);
	// A stop with nothing stored to stop means the session no longer owns
	// publication: its tab closed and the background removed it, or it never
	// published. Writing would recreate a record no cleanup will visit again.
	if (!existing && input.status === 'stopped') {
		return null;
	}
	const analysis = existing && existing.analysis.url === input.target.url
		? existing.analysis
		: createContentBootstrapAnalysis(input.target, updatedAt);
	const snapshot: DetectionSessionSnapshot = {
		key: { ...input.target.key },
		schemaVersion: DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION,
		revision: (existing?.revision ?? 0) + 1,
		urlHash: input.target.urlHash,
		hostname: input.target.hostname,
		status: input.status,
		source: 'content',
		updatedAt,
		detectionCount: analysis.results.length,
		analysis,
		enrichment: {
			status: existing?.enrichment.status ?? 'not-needed',
			updatedAt,
			...(input.reason
				? { reason: input.reason }
				: existing?.enrichment.reason
					? { reason: existing.enrichment.reason }
					: {}),
		},
		...(existing?.replaySummary ? { replaySummary: existing.replaySummary } : {}),
	};
	const result = await store.saveSnapshot(snapshot);

	return result.accepted ? result.snapshot : null;
}

/**
 * Browser-backed store that keeps content lifecycle writes separate from detector snapshots.
 *
 * Content should advance the durable lifecycle stream without overwriting the
 * detector-owned exact-session record. Reads still consider the latest detector
 * and lifecycle revision so content can keep incrementing the same session.
 */
export function createBrowserContentPageSessionSnapshotStore(): ContentPageSessionSnapshotStore {
	return {
		/** Compare detector and separate content-lifecycle revisions without letting content overwrite detector-owned analysis. */
		async getLatestSessionSnapshot(key) {
			const [detectorSnapshot, lifecycleSnapshot] = await Promise.all([
				browserDetectionSnapshotStore.getLatestSessionSnapshot(key),
				getLatestContentSessionLifecycleSnapshot(key),
			]);

			if (!lifecycleSnapshot) {
				return detectorSnapshot;
			}
			if (!detectorSnapshot) {
				return lifecycleSnapshot;
			}

			return lifecycleSnapshot.revision > detectorSnapshot.revision
				? lifecycleSnapshot
				: detectorSnapshot;
		},
		/** Write a detached lifecycle snapshot to its dedicated key while returning the established detector-key result envelope. */
		async saveSnapshot(snapshot) {
			const normalized = structuredClone(snapshot);
			await browser.storage.local.set({
				[getContentSessionLifecycleKey(snapshot.key)]: normalized,
			});

			return {
				accepted: true,
				sessionStorageKey: getDetectionSessionSnapshotKey(snapshot.key),
				originStorageKey: getDetectionOriginSnapshotKey(snapshot.key.originHash),
				snapshot: normalized,
			};
		},
	};
}

/** Read the content-owned lifecycle record and reject values missing its minimum snapshot envelope. */
async function getLatestContentSessionLifecycleSnapshot(
	key: DetectionSessionSnapshot['key'],
): Promise<DetectionSessionSnapshot | null> {
	const storageKey = getContentSessionLifecycleKey(key);
	const raw = await browser.storage.local.get(storageKey);
	const value = raw[storageKey];

	return isDetectionSessionSnapshot(value) ? value : null;
}

/** Require the persisted envelope fields before treating storage data as a lifecycle snapshot; this is a structural guard. */
function isDetectionSessionSnapshot(value: unknown): value is DetectionSessionSnapshot {
	return (
		typeof value === 'object' &&
		value !== null &&
		'schemaVersion' in value &&
		'key' in value &&
		'urlHash' in value &&
		'hostname' in value &&
		'analysis' in value &&
		'detectionCount' in value &&
		'updatedAt' in value
	);
}

/** Create the minimal public analysis envelope used before detector output exists. */
function createContentBootstrapAnalysis(
	target: ContentPageSessionSnapshotTarget,
	analyzedAt: number,
): SiteAnalysis {
	return {
		url: target.url,
		hostname: target.hostname,
		analyzedAt,
		source: 'fresh',
		results: [],
		errors: [],
	};
}
