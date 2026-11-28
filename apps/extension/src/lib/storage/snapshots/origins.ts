import type { DetectionOriginSummary, DetectionSessionSnapshot, DetectionStorageStatusSnapshot } from "../session.ts";

import { browser } from "wxt/browser";
import * as dictionary from "@deepscope/detection/observations/dictionary";
import * as fence from "../../../utils/fence.ts";
import { readStorageEntries } from "../../../utils/storage-entries.ts";
import { DETECTION_ORIGIN_SUMMARY_SCHEMA_VERSION, DETECTION_STORAGE_STATUS_SCHEMA_VERSION } from "../session.ts";
import { DETECTION_ORIGIN_SUMMARY_PREFIX, DETECTION_STORAGE_STATUS_KEY, getDetectionOriginSummaryKey } from "../contracts.ts";
import { isDetectionOriginSummary, isDetectionStorageStatusSnapshot } from './schema.ts';
import { cloneDetectionOriginSummary, cloneDetectionStorageStatusSnapshot, cloneDetectionSessionSnapshot, cloneDetectionEvidenceState, cloneDetectionReplaySummary } from './clone.ts';
import { getStoredDetectionSnapshot } from './read.ts';
import { isOriginSnapshotNewer } from './rank.ts';

/** Keep one origin's comparison, snapshot, and summary ordered within this background context. */
const originWrites = fence.create<string>();

/** Serialize the single aggregate read/write without locking unrelated origin mutations. */
const statusWrites = fence.create<string>();

/** Return the newest lightweight summary for an origin hash, when storage has one. */
export async function getLatestDetectionOriginSummary(
	originHash: string,
): Promise<DetectionOriginSummary | null> {
	const raw = await browser.storage.local.get(getDetectionOriginSummaryKey(originHash));
	const value = raw[getDetectionOriginSummaryKey(originHash)];

	if (!isDetectionOriginSummary(value)) {
		return null;
	}

	return cloneDetectionOriginSummary(value);
}

/** Return the compact aggregate status record, when storage has one. */
export async function getDetectionStorageStatusSnapshot(): Promise<DetectionStorageStatusSnapshot | null> {
	const raw = await browser.storage.local.get(DETECTION_STORAGE_STATUS_KEY);
	const value = raw[DETECTION_STORAGE_STATUS_KEY];

	if (!isDetectionStorageStatusSnapshot(value)) {
		return null;
	}

	return cloneDetectionStorageStatusSnapshot(value);
}

/** Promote detector-owned snapshots and their summaries under the shared origin fence.
 *
 * Content snapshots describe page-session lifecycle. They can preserve detector output
 * for the exact session, but they must not become the origin-level startup record
 * when they only carry an empty bootstrap analysis. Side panel startup uses the origin
 * record as its snapshot-first render path, so detector output must outrank lifecycle
 * updates even when the lifecycle update was written later.
 *
 * Different session keys can share this origin. Keep the eligibility read and both
 * writes in one background-context slot; release it before the caller refreshes
 * aggregate status. These writes do not form a browser-wide storage transaction.
 */
export async function promoteOriginSnapshot(
	originStorageKey: string,
	snapshot: DetectionSessionSnapshot,
): Promise<boolean> {
	return originWrites.run(originStorageKey, async () => {
		const existing = await getStoredDetectionSnapshot(originStorageKey);

		if (existing && !isOriginSnapshotNewer(snapshot, existing)) {
			return false;
		}

		await browser.storage.local.set({ [originStorageKey]: cloneDetectionSessionSnapshot(snapshot) });
		await saveDetectionOriginSummary(createDetectionOriginSummary(snapshot));
		return true;
	});
}

/** Derive the lightweight origin summary from the renderable exact snapshot. */
function createDetectionOriginSummary(snapshot: DetectionSessionSnapshot): DetectionOriginSummary {
	return {
		schemaVersion: DETECTION_ORIGIN_SUMMARY_SCHEMA_VERSION,
		originHash: snapshot.key.originHash,
		hostname: snapshot.hostname,
		url: snapshot.analysis.url,
		urlHash: snapshot.urlHash,
		sessionKey: { ...snapshot.key },
		status: snapshot.status,
		source: snapshot.source,
		detectionCount: snapshot.detectionCount,
		analyzedAt: snapshot.analysis.analyzedAt,
		updatedAt: snapshot.updatedAt,
		...(snapshot.evidence ? { evidence: cloneDetectionEvidenceState(snapshot.evidence) } : {}),
		...(snapshot.matcherExecutor ? { matcherExecutor: snapshot.matcherExecutor } : {}),
		...(snapshot.replaySummary ? { replaySummary: cloneDetectionReplaySummary(snapshot.replaySummary) } : {}),
	};
}

/** Save the matching summary while origin promotion still owns this origin's mutation slot. */
async function saveDetectionOriginSummary(summary: DetectionOriginSummary): Promise<void> {
	await browser.storage.local.set({
		[getDetectionOriginSummaryKey(summary.originHash)]: cloneDetectionOriginSummary(summary),
	});
}

/** Read summaries and persist their aggregate after earlier status refreshes settle in this context. */
export async function refreshDetectionStorageStatusSnapshot(): Promise<DetectionStorageStatusSnapshot> {
	return statusWrites.run(DETECTION_STORAGE_STATUS_KEY, async () => {
		const all = dictionary.fromEntries(await readStorageEntries(browser.storage.local, (key) => key.startsWith(DETECTION_ORIGIN_SUMMARY_PREFIX)));
		const summaries = Object.entries(all)
			.filter((entry): entry is [string, DetectionOriginSummary] =>
				entry[0].startsWith(DETECTION_ORIGIN_SUMMARY_PREFIX) && isDetectionOriginSummary(entry[1])
			)
			.map(([, value]) => value);
		const lastAnalyzedAt = summaries.reduce(
			(latest, summary) => Math.max(latest, summary.analyzedAt, summary.updatedAt),
			0,
		);
		const status: DetectionStorageStatusSnapshot = {
			schemaVersion: DETECTION_STORAGE_STATUS_SCHEMA_VERSION,
			totalAnalyses: summaries.length,
			trackedOrigins: new Set(summaries.map((summary) => summary.originHash)).size,
			...(lastAnalyzedAt ? { lastAnalyzedAt } : {}),
			updatedAt: Date.now(),
		};

		await browser.storage.local.set({ [DETECTION_STORAGE_STATUS_KEY]: cloneDetectionStorageStatusSnapshot(status) });
		return status;
	});
}
