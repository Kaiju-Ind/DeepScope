import type {
	DetectionEnrichmentState,
	DetectionEvidenceState,
	DetectionMatcherProgressSummary,
	DetectionOriginSummary,
	DetectionReplaySummary,
	DetectionSessionKey,
	DetectionSessionSnapshot,
	DetectionMatcherExecutor,
	DetectionStorageStatusSnapshot,
	DetectionSessionSnapshotSource,
	DetectionSessionStatus,
} from '../contracts/detection-session';
import type { Evidence, SiteAnalysis } from '../detection/types';
import type { VisibleTabIdentity } from '../contracts/analysis';

import { browser } from 'wxt/browser';

import {
	DETECTION_ENRICHMENT_STATUSES,
	DETECTION_EVIDENCE_COMPLETENESS_LEVELS,
	DETECTION_ORIGIN_SUMMARY_SCHEMA_VERSION,
	DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION,
	DETECTION_SESSION_STATUSES,
	DETECTION_STORAGE_STATUS_SCHEMA_VERSION,
} from '../contracts/detection-session';
import {
	DETECTION_ORIGIN_SUMMARY_PREFIX,
	DETECTION_STORAGE_STATUS_KEY,
	getDetectionOriginSnapshotKey,
	getDetectionOriginSummaryKey,
	getDetectionSessionIndexKey,
	getDetectionSessionSnapshotKey,
} from './contracts';

/** Stored pointer to one exact detection snapshot owned by a browser tab. */
export interface DetectionSessionIndexEntry {
	/** Exact page-session key used to read or update the stored snapshot. */
	readonly key: DetectionSessionKey;
	/** Stable non-raw URL key used to detect same-document replacements. */
	readonly urlHash: string;
	/** Last known snapshot status for tab lifecycle cleanup. */
	readonly status: DetectionSessionStatus;
	/** Last write timestamp used to keep the newest entry when records collide. */
	readonly updatedAt: number;
}

/** Stored list of known detection sessions for one browser tab. */
export interface DetectionSessionIndexRecord {
	/** Browser tab id that owns every entry in this index. */
	readonly tabId: number;
	/** Latest known sessions for this tab, newest first. */
	readonly entries: readonly DetectionSessionIndexEntry[];
	/** Millisecond timestamp when the index was last rewritten. */
	readonly updatedAt: number;
}

/**
 * Result returned after attempting to persist a detection snapshot revision.
 *
 * Older revisions are rejected instead of overwriting the visible snapshot. The
 * caller still receives the stored value so a popup or background command can
 * converge on the newest known state without issuing a second read.
 */
export interface DetectionSessionSnapshotWriteResult {
	/** Whether the submitted snapshot replaced the exact session record. */
	readonly accepted: boolean;
	/** Exact session storage key used for the write or rejected comparison. */
	readonly sessionStorageKey: string;
	/** Origin-level storage key considered for latest-snapshot promotion. */
	readonly originStorageKey: string;
	/** Snapshot currently stored for the exact session after the operation. */
	readonly snapshot: DetectionSessionSnapshot;
	/** Revision that prevented a stale write, when the submitted snapshot was rejected. */
	readonly rejectedByRevision?: number;
}

/**
 * Persist the latest visible detection snapshot for one page session.
 *
 * Snapshot revisions are monotonic per session. A stale write returns the stored
 * snapshot instead of mutating storage, which protects the popup from applying an
 * older content or background response after a newer revision has already landed.
 */
export async function saveDetectionSessionSnapshot(
	snapshot: DetectionSessionSnapshot,
): Promise<DetectionSessionSnapshotWriteResult> {
	const sessionStorageKey = getDetectionSessionSnapshotKey(snapshot.key);
	const originStorageKey = getDetectionOriginSnapshotKey(snapshot.key.originHash);
	const existing = await getStoredDetectionSnapshot(sessionStorageKey);

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
			await saveDetectionOriginSummary(createDetectionOriginSummary(merged));
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
		await saveDetectionOriginSummary(createDetectionOriginSummary(normalized));
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
 * popup with an empty placeholder after the tab already produced detections.
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

/** Remove the tab-session index after a tab closes and volatile state is gone. */
export async function removeDetectionSessionIndex(tabId: number): Promise<void> {
	await browser.storage.local.remove(getDetectionSessionIndexKey(tabId));
}

/**
 * Mark every active snapshot for a tab with a terminal lifecycle state.
 *
 * Navigation and tab removal can happen while the background has no reliable
 * in-memory session. The tab index lets the lifecycle listener update stored
 * snapshots directly so a popup does not keep rendering an observing session for
 * a document that can no longer produce content events.
 */
export async function markDetectionSessionSnapshotsForTab(
	tabId: number,
	status: Extract<DetectionSessionStatus, 'stale' | 'stopped'>,
	reason: string,
): Promise<readonly DetectionSessionSnapshot[]> {
	const index = await getDetectionSessionIndex(tabId);
	const marked: DetectionSessionSnapshot[] = [];

	for (const entry of index.entries) {
		const snapshot = await getLatestDetectionSessionSnapshot(entry.key);
		if (!snapshot || snapshot.status === status) {
			continue;
		}
		if (snapshot.status === 'stopped' && status === 'stale') {
			continue;
		}

		const updatedAt = Date.now();
		const nextSnapshot: DetectionSessionSnapshot = {
			...snapshot,
			key: { ...snapshot.key },
			revision: snapshot.revision + 1,
			status,
			source: 'background',
			updatedAt,
			enrichment: {
				...snapshot.enrichment,
				updatedAt,
				reason,
			},
		};
		const result = await saveDetectionSessionSnapshot(nextSnapshot);
		marked.push(result.snapshot);
	}

	return marked;
}

/** Add or refresh one snapshot pointer in the owning tab's session index. */
async function upsertDetectionSessionIndex(snapshot: DetectionSessionSnapshot): Promise<void> {
	const tabId = snapshot.key.tabId;
	const index = await getDetectionSessionIndex(tabId);
	const entry: DetectionSessionIndexEntry = {
		key: { ...snapshot.key },
		urlHash: snapshot.urlHash,
		status: snapshot.status,
		updatedAt: snapshot.updatedAt,
	};
	const entries = [
		entry,
		...index.entries.filter((item) => !isSameDetectionSessionKey(item.key, snapshot.key)),
	]
		.sort((left, right) => right.updatedAt - left.updatedAt)
		.slice(0, 20);

	await browser.storage.local.set({
		[getDetectionSessionIndexKey(tabId)]: {
			tabId,
			entries,
			updatedAt: snapshot.updatedAt,
		} satisfies DetectionSessionIndexRecord,
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

/** Read and clone a snapshot only after the storage value passes a defensive shape check. */
async function getStoredDetectionSnapshot(storageKey: string): Promise<DetectionSessionSnapshot | null> {
	const raw = await browser.storage.local.get(storageKey);
	const value = raw[storageKey];

	if (!isDetectionSessionSnapshot(value)) {
		return null;
	}

	return cloneDetectionSessionSnapshot(value);
}

/** Promote detector-owned snapshots to the origin-level latest record.
 *
 * Content snapshots describe page-session lifecycle. They can preserve detector output
 * for the exact session, but they must not become the origin-level startup record
 * when they only carry an empty bootstrap analysis. Popup startup uses the origin
 * record as its snapshot-first render path, so detector output must outrank lifecycle
 * updates even when the lifecycle update was written later.
 */
async function promoteOriginSnapshot(
	originStorageKey: string,
	snapshot: DetectionSessionSnapshot,
): Promise<boolean> {
	const existing = await getStoredDetectionSnapshot(originStorageKey);

	if (existing && !isOriginSnapshotNewer(snapshot, existing)) {
		return false;
	}

	await browser.storage.local.set({ [originStorageKey]: cloneDetectionSessionSnapshot(snapshot) });
	return true;
}

/** Compare origin candidates across sessions where revision numbers are not shared. */
function isOriginSnapshotNewer(
	candidate: DetectionSessionSnapshot,
	existing: DetectionSessionSnapshot,
): boolean {
	const sameVisiblePage = candidate.urlHash === existing.urlHash && candidate.analysis.url === existing.analysis.url;
	if (sameVisiblePage && candidate.detectionCount < existing.detectionCount) {
		return false;
	}

	const candidateRank = getOriginSnapshotRank(candidate);
	const existingRank = getOriginSnapshotRank(existing);
	if (candidateRank !== existingRank) {
		return candidateRank > existingRank;
	}

	if (candidate.detectionCount !== existing.detectionCount) {
		return candidate.detectionCount > existing.detectionCount;
	}

	if (candidate.updatedAt !== existing.updatedAt) {
		return candidate.updatedAt > existing.updatedAt;
	}

	return candidate.revision > existing.revision;
}

/**
 * Detector snapshots outrank lifecycle snapshots for origin startup recovery.
 *
 * Content revisions can be newer because observers are active, but a newer empty
 * content record should not replace a background/cache detector result when the
 * popup opens again. A content snapshot that preserves real detections stays useful
 * as a lower-ranked fallback for exact-session lifecycle reads.
 */
function getOriginSnapshotRank(snapshot: DetectionSessionSnapshot): number {
	const evidenceRank = getEvidenceCompletenessRank(snapshot.evidence);
	const sourceRank = snapshot.source === 'background' && snapshot.replaySummary
		? 4
		: snapshot.source === 'background'
			? 3
			: snapshot.source === 'cache'
				? 2
				: snapshot.detectionCount > 0
					? 1
					: 0;
	return evidenceRank * 10 + sourceRank;
}

/**
 * Preview background writes can arrive after a richer exact snapshot.
 *
 * Worker partitions and non-final matcher passes are useful while the visible
 * count is growing, but they must not make the durable session record move
 * backward. A replay-backed recovered run can still be lower-completeness, so
 * evidence rank decides whether it may replace an older richer snapshot.
 */
function shouldPreserveExistingAnalysisForCandidate(
	candidate: DetectionSessionSnapshot,
	existing: DetectionSessionSnapshot,
): boolean {
	if (candidate.source !== 'background' || candidate.analysis.url !== existing.analysis.url) {
		return false;
	}

	if (candidate.detectionCount >= existing.detectionCount) {
		return false;
	}

	return true;
}

function getEvidenceCompletenessRank(state: DetectionEvidenceState | undefined): number {
	switch (state?.level) {
		case 'full':
			return 5;
		case 'enriched':
			return 4;
		case 'incremental':
			return 3;
		case 'initial':
			return 2;
		case 'recovered-initial':
			return 1;
		case 'unknown':
		default:
			return 0;
	}
}

/**
 * Keep richer detector output while still publishing progress-only revisions.
 *
 * A lower-count partial can be useful because it proves worker progress, but it
 * should not visibly shrink the result list. The merged snapshot advances the
 * revision and lifecycle fields from the candidate while preserving the richer
 * analysis payload already stored for the same exact session.
 */
function mergeLowerCompletenessSnapshot(
	candidate: DetectionSessionSnapshot,
	existing: DetectionSessionSnapshot,
): DetectionSessionSnapshot {
	return cloneDetectionSessionSnapshot({
		...existing,
		revision: Math.max(existing.revision + 1, candidate.revision),
		status: candidate.status,
		source: candidate.source,
		updatedAt: candidate.updatedAt,
		enrichment: cloneDetectionEnrichmentState(candidate.enrichment),
		...(candidate.matcherExecutor ? { matcherExecutor: candidate.matcherExecutor } : {}),
		...(candidate.matcherProgress ? { matcherProgress: cloneDetectionMatcherProgressSummary(candidate.matcherProgress) } : {}),
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

/** Save one lightweight origin summary. */
async function saveDetectionOriginSummary(summary: DetectionOriginSummary): Promise<void> {
	await browser.storage.local.set({
		[getDetectionOriginSummaryKey(summary.originHash)]: cloneDetectionOriginSummary(summary),
	});
}

/** Recompute and persist the compact aggregate status from origin summaries. */
export async function refreshDetectionStorageStatusSnapshot(): Promise<DetectionStorageStatusSnapshot> {
	const all = await browser.storage.local.get(null);
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
}

/** Return whether a snapshot still belongs to the popup-visible tab identity. */
function isSnapshotForVisibleIdentity(
	identity: VisibleTabIdentity,
	snapshot: DetectionSessionSnapshot,
): boolean {
	return (
		snapshot.key.tabId === identity.tabId &&
		snapshot.key.frameId === identity.frameId &&
		snapshot.key.originHash === identity.originHash &&
		snapshot.urlHash === identity.urlHash
	);
}

/** Detector-owned or detection-bearing snapshots are safe as first popup paint. */
function isRenderableDetectorSnapshot(snapshot: DetectionSessionSnapshot): boolean {
	if (snapshot.source === 'background' || snapshot.source === 'cache') {
		return true;
	}

	return snapshot.detectionCount > 0;
}

/**
 * Return whether a storage value matches the durable snapshot envelope.
 *
 * Storage change listeners receive unknown values from every extension context.
 * The guard keeps popup streaming on the normalized snapshot contract instead
 * of trusting arbitrary records that happen to share the same storage area.
 */
export function isDetectionSessionSnapshot(value: unknown): value is DetectionSessionSnapshot {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<DetectionSessionSnapshot>;

	return (
		candidate.schemaVersion === DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION &&
		isDetectionSessionKey(candidate.key) &&
		typeof candidate.revision === 'number' &&
		typeof candidate.urlHash === 'string' &&
		typeof candidate.hostname === 'string' &&
		isDetectionSessionStatus(candidate.status) &&
		isDetectionSessionSnapshotSource(candidate.source) &&
		typeof candidate.updatedAt === 'number' &&
		typeof candidate.detectionCount === 'number' &&
		isSnapshotSiteAnalysis(candidate.analysis) &&
		isDetectionEnrichmentState(candidate.enrichment) &&
		(candidate.evidence === undefined || isDetectionEvidenceState(candidate.evidence)) &&
		(candidate.matcherExecutor === undefined || isDetectionMatcherExecutor(candidate.matcherExecutor)) &&
		(candidate.matcherProgress === undefined || isDetectionMatcherProgressSummary(candidate.matcherProgress)) &&
		(candidate.replaySummary === undefined || isDetectionReplaySummary(candidate.replaySummary))
	);
}

/** Return whether a storage value matches the lightweight origin summary envelope. */
export function isDetectionOriginSummary(value: unknown): value is DetectionOriginSummary {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<DetectionOriginSummary>;

	return (
		candidate.schemaVersion === DETECTION_ORIGIN_SUMMARY_SCHEMA_VERSION &&
		typeof candidate.originHash === 'string' &&
		typeof candidate.hostname === 'string' &&
		typeof candidate.url === 'string' &&
		typeof candidate.urlHash === 'string' &&
		isDetectionSessionKey(candidate.sessionKey) &&
		isDetectionSessionStatus(candidate.status) &&
		isDetectionSessionSnapshotSource(candidate.source) &&
		typeof candidate.detectionCount === 'number' &&
		typeof candidate.analyzedAt === 'number' &&
		typeof candidate.updatedAt === 'number' &&
		(candidate.evidence === undefined || isDetectionEvidenceState(candidate.evidence)) &&
		(candidate.matcherExecutor === undefined || isDetectionMatcherExecutor(candidate.matcherExecutor)) &&
		(candidate.replaySummary === undefined || isDetectionReplaySummary(candidate.replaySummary))
	);
}

/** Return whether a storage value matches the compact aggregate status envelope. */
export function isDetectionStorageStatusSnapshot(value: unknown): value is DetectionStorageStatusSnapshot {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<DetectionStorageStatusSnapshot>;

	return (
		candidate.schemaVersion === DETECTION_STORAGE_STATUS_SCHEMA_VERSION &&
		typeof candidate.totalAnalyses === 'number' &&
		typeof candidate.trackedOrigins === 'number' &&
		isOptionalNumber(candidate.lastAnalyzedAt) &&
		typeof candidate.updatedAt === 'number'
	);
}

/** Guard the page-session identity before using it in storage key helpers. */
function isDetectionSessionKey(value: unknown): value is DetectionSessionKey {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<DetectionSessionKey>;

	return (
		typeof candidate.tabId === 'number' &&
		typeof candidate.frameId === 'number' &&
		typeof candidate.documentId === 'string' &&
		typeof candidate.originHash === 'string'
	);
}

/** Guard the tab-session index before lifecycle cleanup trusts stored pointers. */
function isDetectionSessionIndexRecord(
	value: unknown,
	tabId: number,
): value is DetectionSessionIndexRecord {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<DetectionSessionIndexRecord>;

	return (
		candidate.tabId === tabId &&
		typeof candidate.updatedAt === 'number' &&
		Array.isArray(candidate.entries) &&
		candidate.entries.every((entry) => isDetectionSessionIndexEntry(entry, tabId))
	);
}

/** Guard one indexed session pointer without reading the pointed-to snapshot yet. */
function isDetectionSessionIndexEntry(
	value: unknown,
	tabId: number,
): value is DetectionSessionIndexEntry {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<DetectionSessionIndexEntry>;

	return (
		isDetectionSessionKey(candidate.key) &&
		candidate.key.tabId === tabId &&
		typeof candidate.urlHash === 'string' &&
		isDetectionSessionStatus(candidate.status) &&
		typeof candidate.updatedAt === 'number'
	);
}

/** Guard session statuses with the shared contract list instead of duplicated literals. */
function isDetectionSessionStatus(value: unknown): value is DetectionSessionStatus {
	return typeof value === 'string' && DETECTION_SESSION_STATUSES.includes(value as DetectionSessionStatus);
}

/** Guard snapshot write sources with the narrow persisted source set. */
function isDetectionSessionSnapshotSource(value: unknown): value is DetectionSessionSnapshotSource {
	return value === 'cache' || value === 'content' || value === 'background';
}

/** Guard matcher executor diagnostics while accepting older snapshots without the field. */
function isDetectionMatcherExecutor(value: unknown): value is DetectionMatcherExecutor {
	return (
		value === 'offscreen-worker-pool' ||
		value === 'background-fallback' ||
		value === 'dev-fallback' ||
		value === 'unknown'
	);
}

/** Guard matcher progress while accepting older snapshots without the field. */
function isDetectionMatcherProgressSummary(value: unknown): value is DetectionMatcherProgressSummary {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<DetectionMatcherProgressSummary>;

	return (
		typeof candidate.jobId === 'string' &&
		typeof candidate.mode === 'string' &&
		typeof candidate.completedPartitionCount === 'number' &&
		typeof candidate.partitionCount === 'number' &&
		(candidate.latestPartitionKind === undefined || typeof candidate.latestPartitionKind === 'string') &&
		isOptionalNumber(candidate.latestPartitionObservationCount) &&
		isOptionalNumber(candidate.latestPartitionMatchCount) &&
		typeof candidate.resultCount === 'number' &&
		typeof candidate.updatedAt === 'number'
	);
}

/** Guard enrichment state while accepting older records with only the required status. */
function isDetectionEnrichmentState(value: unknown): value is DetectionEnrichmentState {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<DetectionEnrichmentState>;

	return (
		typeof candidate.status === 'string' &&
		DETECTION_ENRICHMENT_STATUSES.includes(candidate.status as DetectionEnrichmentState['status']) &&
		isOptionalNumber(candidate.startedAt) &&
		isOptionalNumber(candidate.updatedAt) &&
		isOptionalNumber(candidate.completedAt) &&
		(candidate.reason === undefined || typeof candidate.reason === 'string')
	);
}


/** Guard evidence completeness state while accepting older records without it. */
function isDetectionEvidenceState(value: unknown): value is DetectionEvidenceState {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<DetectionEvidenceState>;

	return (
		typeof candidate.level === 'string' &&
		DETECTION_EVIDENCE_COMPLETENESS_LEVELS.includes(candidate.level as DetectionEvidenceState['level']) &&
		Array.isArray(candidate.completedPassIds) &&
		candidate.completedPassIds.every((passId) => typeof passId === 'string') &&
		Array.isArray(candidate.requiredPassIds) &&
		candidate.requiredPassIds.every((passId) => typeof passId === 'string') &&
		typeof candidate.complete === 'boolean' &&
		typeof candidate.updatedAt === 'number' &&
		(candidate.reason === undefined || typeof candidate.reason === 'string')
	);
}

/** Guard replay summaries without pulling the full replay trace contract into snapshot storage. */
function isDetectionReplaySummary(value: unknown): value is DetectionReplaySummary {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<DetectionReplaySummary>;

	return (
		(candidate.runId === undefined || typeof candidate.runId === 'string') &&
		typeof candidate.analyzedAt === 'number' &&
		typeof candidate.eventCount === 'number' &&
		typeof candidate.explanationCount === 'number' &&
		typeof candidate.resultCount === 'number' &&
		Array.isArray(candidate.stages) &&
		candidate.stages.every((stage) => typeof stage === 'string')
	);
}

/** Guard the analysis envelope fields needed by popup rendering and cache recovery. */
function isSnapshotSiteAnalysis(value: unknown): value is SiteAnalysis {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<SiteAnalysis>;

	return (
		typeof candidate.url === 'string' &&
		typeof candidate.hostname === 'string' &&
		typeof candidate.analyzedAt === 'number' &&
		(candidate.source === 'fresh' || candidate.source === 'cache') &&
		Array.isArray(candidate.results) &&
		Array.isArray(candidate.errors)
	);
}

/** Optional timestamp fields remain optional, but stored non-number values are ignored. */
function isOptionalNumber(value: unknown): boolean {
	return value === undefined || typeof value === 'number';
}

/**
 * Clone a detection snapshot using only the persisted contract fields.
 *
 * Browser storage serializes values, but Vitest storage mocks keep object
 * references. Manual cloning prevents callers from mutating cached snapshots and
 * drops accidental raw collector payloads attached to an object before saving.
 */
function cloneDetectionSessionSnapshot(snapshot: DetectionSessionSnapshot): DetectionSessionSnapshot {
	return {
		key: { ...snapshot.key },
		schemaVersion: snapshot.schemaVersion,
		revision: snapshot.revision,
		urlHash: snapshot.urlHash,
		hostname: snapshot.hostname,
		status: snapshot.status,
		source: snapshot.source,
		updatedAt: snapshot.updatedAt,
		detectionCount: snapshot.detectionCount,
		...(snapshot.evidence ? { evidence: cloneDetectionEvidenceState(snapshot.evidence) } : {}),
		analysis: cloneSiteAnalysis(snapshot.analysis),
		enrichment: cloneDetectionEnrichmentState(snapshot.enrichment),
		...(snapshot.matcherExecutor ? { matcherExecutor: snapshot.matcherExecutor } : {}),
		...(snapshot.matcherProgress ? { matcherProgress: cloneDetectionMatcherProgressSummary(snapshot.matcherProgress) } : {}),
		...(snapshot.replaySummary ? { replaySummary: cloneDetectionReplaySummary(snapshot.replaySummary) } : {}),
	};
}

/** Clone a lightweight origin summary so callers cannot mutate storage mocks by reference. */
function cloneDetectionOriginSummary(summary: DetectionOriginSummary): DetectionOriginSummary {
	return {
		schemaVersion: summary.schemaVersion,
		originHash: summary.originHash,
		hostname: summary.hostname,
		url: summary.url,
		urlHash: summary.urlHash,
		sessionKey: { ...summary.sessionKey },
		status: summary.status,
		source: summary.source,
		detectionCount: summary.detectionCount,
		analyzedAt: summary.analyzedAt,
		updatedAt: summary.updatedAt,
		...(summary.evidence ? { evidence: cloneDetectionEvidenceState(summary.evidence) } : {}),
		...(summary.matcherExecutor ? { matcherExecutor: summary.matcherExecutor } : {}),
		...(summary.replaySummary ? { replaySummary: cloneDetectionReplaySummary(summary.replaySummary) } : {}),
	};
}

/** Clone the compact aggregate status record. */
function cloneDetectionStorageStatusSnapshot(
	status: DetectionStorageStatusSnapshot,
): DetectionStorageStatusSnapshot {
	return {
		schemaVersion: status.schemaVersion,
		totalAnalyses: status.totalAnalyses,
		trackedOrigins: status.trackedOrigins,
		...(status.lastAnalyzedAt ? { lastAnalyzedAt: status.lastAnalyzedAt } : {}),
		updatedAt: status.updatedAt,
	};
}

/** Clone normalized detector output without preserving object identity from tests. */
function cloneSiteAnalysis(analysis: SiteAnalysis): SiteAnalysis {
	return {
		url: analysis.url,
		hostname: analysis.hostname,
		analyzedAt: analysis.analyzedAt,
		source: analysis.source,
		results: analysis.results.map((result) => ({
			...result,
			categories: [...result.categories],
			confidence: { ...result.confidence },
			evidence: result.evidence.map(cloneEvidence),
			...(result.warnings ? { warnings: [...result.warnings] } : {}),
		})),
		errors: analysis.errors.map((error) => ({ ...error })),
	};
}

/** Clone public detector evidence while preserving optional scalar context. */
function cloneEvidence(evidence: Evidence): Evidence {
	return {
		...evidence,
		...(evidence.attributes ? { attributes: { ...evidence.attributes } } : {}),
		...(evidence.scope ? { scope: { ...evidence.scope } } : {}),
	};
}


/** Clone evidence completeness state so storage mock reads cannot mutate the saved value. */
function cloneDetectionEvidenceState(state: DetectionEvidenceState): DetectionEvidenceState {
	return {
		level: state.level,
		completedPassIds: [...state.completedPassIds],
		requiredPassIds: [...state.requiredPassIds],
		complete: state.complete,
		updatedAt: state.updatedAt,
		...(state.reason ? { reason: state.reason } : {}),
	};
}

/** Clone enrichment state so storage mock reads cannot mutate the saved value. */
function cloneDetectionEnrichmentState(state: DetectionEnrichmentState): DetectionEnrichmentState {
	return {
		status: state.status,
		...(state.startedAt !== undefined ? { startedAt: state.startedAt } : {}),
		...(state.updatedAt !== undefined ? { updatedAt: state.updatedAt } : {}),
		...(state.completedAt !== undefined ? { completedAt: state.completedAt } : {}),
		...(state.reason ? { reason: state.reason } : {}),
	};
}

/** Clone matcher progress counters so storage mock reads cannot mutate the saved value. */
function cloneDetectionMatcherProgressSummary(
	progress: DetectionMatcherProgressSummary,
): DetectionMatcherProgressSummary {
	return {
		jobId: progress.jobId,
		mode: progress.mode,
		completedPartitionCount: progress.completedPartitionCount,
		partitionCount: progress.partitionCount,
		...(progress.latestPartitionKind ? { latestPartitionKind: progress.latestPartitionKind } : {}),
		...(progress.latestPartitionObservationCount !== undefined
			? { latestPartitionObservationCount: progress.latestPartitionObservationCount }
			: {}),
		...(progress.latestPartitionMatchCount !== undefined
			? { latestPartitionMatchCount: progress.latestPartitionMatchCount }
			: {}),
		resultCount: progress.resultCount,
		updatedAt: progress.updatedAt,
	};
}

/** Clone the bounded replay summary embedded in a snapshot. */
function cloneDetectionReplaySummary(summary: DetectionReplaySummary): DetectionReplaySummary {
	return {
		...(summary.runId ? { runId: summary.runId } : {}),
		analyzedAt: summary.analyzedAt,
		eventCount: summary.eventCount,
		explanationCount: summary.explanationCount,
		resultCount: summary.resultCount,
		stages: [...summary.stages],
	};
}

/** Clone a tab-session index so tests cannot mutate storage by reference. */
function cloneDetectionSessionIndexRecord(record: DetectionSessionIndexRecord): DetectionSessionIndexRecord {
	return {
		tabId: record.tabId,
		entries: record.entries.map((entry) => ({
			key: { ...entry.key },
			urlHash: entry.urlHash,
			status: entry.status,
			updatedAt: entry.updatedAt,
		})),
		updatedAt: record.updatedAt,
	};
}
