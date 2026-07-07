import type { ContentPageSessionSnapshotTarget } from '../contracts/analysis';
import type {
	DetectionSessionSnapshot,
	DetectionSessionStatus,
} from '../contracts/detection-session';
import type { SiteAnalysis } from '../detection/types';

import { DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION } from '../contracts/detection-session';
import {
	getLatestDetectionSessionSnapshot,
	saveDetectionSessionSnapshot,
} from '../storage';

/**
 * Input for publishing content-owned progress to the durable popup stream.
 *
 * The content script does not run the full detector. It can still publish the
 * page-session lifecycle so the popup sees that the page-local observer is alive
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
): Promise<DetectionSessionSnapshot | null> {
	if (input.target.incognito) {
		return null;
	}

	const updatedAt = input.observedAt ?? Date.now();
	const existing = await getLatestDetectionSessionSnapshot(input.target.key);
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
	const result = await saveDetectionSessionSnapshot(snapshot);

	return result.accepted ? result.snapshot : null;
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
