import type { DetectionSessionKey } from '../contracts/detection-session';

import { getOrigin } from '../shared/url';
import { createFnv1a32Hash } from './hash';

/** Prefix used for exact page-document detection snapshot records. */
export const DETECTION_SESSION_SNAPSHOT_PREFIX = 'rd:session:';

/** Prefix used for the newest detection snapshot associated with an origin hash. */
export const DETECTION_ORIGIN_SNAPSHOT_PREFIX = 'rd:origin:';

/** Prefix used for lightweight origin-level detector summary records. */
export const DETECTION_ORIGIN_SUMMARY_PREFIX = 'rd:origin-summary:';

/** Prefix used for tab-owned detection snapshot index records. */
export const DETECTION_SESSION_INDEX_PREFIX = 'rd:session-index:';

/** Key used for the compact aggregate detection storage status record. */
export const DETECTION_STORAGE_STATUS_KEY = 'rd:status';

/** Prefix used for durable matcher job lifecycle records. */
export const MATCHER_JOB_CACHE_PREFIX = 'matcher-job:';

/** Prefix used for legacy origin-level analysis response keys. */
export const ANALYSIS_RESPONSE_PREFIX = 'analysis:';

/** Prefix used for every origin-level replay trace record. */
export const REPLAY_TRACE_CACHE_PREFIX = 'replay:';

/** Prefix used for bounded origin-level replay run history. */
export const REPLAY_TRACE_HISTORY_CACHE_PREFIX = 'replay-history:';

/**
 * Storage limits for snapshot-compatible analysis and replay records.
 *
 * These limits only apply to snapshot detector output and redacted replay traces.
 * Raw page HTML, cookies, text, and source contents are not stored by either
 * storage path.
 */
export const STORAGE_LIMITS = {
	analysisTtlMs: 1000 * 60 * 60 * 24,
	replayTraceTtlMs: 1000 * 60 * 60 * 24,
	maxAnalyses: 250,
	maxReplayTraces: 250,
	maxReplayHistoryRunsPerOrigin: 10,
} as const;

/**
 * Build the analysis response key for a URL origin.
 *
 * Runtime detection state now lives in durable session snapshots. The response envelope still exposes an analysis key for diagnostics, while
 * storage reads and writes use session and origin snapshot keys.
 */
export function getAnalysisResponseKey(url: string): string {
	return `${ANALYSIS_RESPONSE_PREFIX}${getOrigin(url)}`;
}

/**
 * Build the storage key for a redacted replay trace.
 *
 * Replay traces use their own namespace so callers can fetch or delete replay
 * metadata without changing the `SiteAnalysis` response shape.
 */
export function getReplayTraceCacheKey(url: string): string {
	return `${REPLAY_TRACE_CACHE_PREFIX}${getOrigin(url)}`;
}

/** Build the storage key for bounded replay history on one origin. */
export function getReplayTraceHistoryCacheKey(url: string): string {
	return `${REPLAY_TRACE_HISTORY_CACHE_PREFIX}${getOrigin(url)}`;
}

/** Build the storage key for one matcher job lifecycle record. */
export function getMatcherJobCacheKey(jobId: string): string {
	return `${MATCHER_JOB_CACHE_PREFIX}${jobId}`;
}

/**
 * Build a stable non-reversible key fragment for URLs and origins.
 *
 * Snapshot storage needs to correlate popup, background, and content state
 * without placing raw URLs in every session key. The hash is intentionally small
 * and non-cryptographic; it is a deterministic storage partition, not a privacy
 * guarantee against someone who already has extension storage access.
 */
export function createDetectionStorageHash(value: string): string {
	const hash = createFnv1a32Hash(value);

	// Base-36 keeps the storage fragment compact without changing the hash.
	return hash.toString(36);
}

/**
 * Build the storage key for the latest snapshot from one page document.
 *
 * `documentId` can contain browser-generated punctuation, so each identity part
 * is encoded before joining. The readable prefix still keeps DevTools storage
 * inspection useful when debugging snapshot-first popup rendering.
 */
export function getDetectionSessionSnapshotKey(key: DetectionSessionKey): string {
	return [
		DETECTION_SESSION_SNAPSHOT_PREFIX.slice(0, -1),
		String(key.tabId),
		String(key.frameId),
		encodeStorageKeyPart(key.documentId),
	].join(':');
}

/**
 * Build the storage key for the newest snapshot associated with an origin hash.
 *
 * The value stored at this key is a complete `DetectionSessionSnapshot`, not a
 * raw origin record. Popup startup can render it while the background resolves
 * the exact active document session.
 */
export function getDetectionOriginSnapshotKey(originHash: string): string {
	return `${DETECTION_ORIGIN_SNAPSHOT_PREFIX}${encodeStorageKeyPart(originHash)}:latest`;
}

/** Build the storage key for the latest lightweight summary associated with an origin hash. */
export function getDetectionOriginSummaryKey(originHash: string): string {
	return `${DETECTION_ORIGIN_SUMMARY_PREFIX}${encodeStorageKeyPart(originHash)}:latest`;
}

/** Build the storage key for the known page sessions owned by one browser tab. */
export function getDetectionSessionIndexKey(tabId: number): string {
	return `${DETECTION_SESSION_INDEX_PREFIX}${tabId}`;
}

/** Encode storage key parts without changing already readable ASCII keys. */
function encodeStorageKeyPart(value: string): string {
	return encodeURIComponent(value);
}
