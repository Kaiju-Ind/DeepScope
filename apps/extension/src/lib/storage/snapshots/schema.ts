import type { DetectionEnrichmentState, DetectionEvidenceState, MatcherProgressType, DetectionOriginSummary, DetectionSessionKey, DetectionSessionSnapshot, DetectionMatcherExecutor, DetectionStorageStatusSnapshot, DetectionSessionSnapshotSource, DetectionSessionStatus } from "../session.ts";
import type { DetectionReplaySummary } from "@deepscope/detection/pipeline/replay";
import type { SiteAnalysis } from "@deepscope/detection/types";

import type { DetectionSessionIndexEntry, DetectionSessionIndexRecord } from "../../persistence/ports.ts";

import { DETECTION_ENRICHMENT_STATUSES, DETECTION_EVIDENCE_COMPLETENESS_LEVELS, MATCHER_PHASES, DETECTION_ORIGIN_SUMMARY_SCHEMA_VERSION, DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION, DETECTION_SESSION_STATUSES, DETECTION_STORAGE_STATUS_SCHEMA_VERSION } from "../session.ts";

/**
 * Return whether a storage value matches the durable snapshot envelope.
 *
 * Storage change listeners receive unknown values from every extension context.
 * The guard keeps side panel streaming on the normalized snapshot contract instead
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
		(candidate.matcherProgress === undefined || isMatcherProgress(candidate.matcherProgress)) &&
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
export function isDetectionSessionIndexRecord(
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

/** Guard matcher executor diagnostics emitted by the current snapshot contract. */
function isDetectionMatcherExecutor(value: unknown): value is DetectionMatcherExecutor {
	return (
		value === 'offscreen-worker-pool' || value === 'background-workers' ||
		value === 'unknown'
	);
}

/** Guard optional matcher progress carried only by in-flight snapshot revisions. */
function isMatcherProgress(value: unknown): value is MatcherProgressType {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<MatcherProgressType>;

	return (
		typeof candidate.jobId === 'string' &&
		typeof candidate.mode === 'string' &&
		typeof candidate.phase === 'string' &&
		MATCHER_PHASES.includes(candidate.phase as MatcherProgressType['phase']) &&
		isOptionalNumber(candidate.queuedAt) &&
		isOptionalNumber(candidate.startedAt) &&
		isOptionalNumber(candidate.queuePosition) &&
		isOptionalNumber(candidate.queueDepth) &&
		typeof candidate.completedPartitionCount === 'number' &&
		typeof candidate.partitionCount === 'number' &&
		(candidate.latestPartitionKind === undefined || typeof candidate.latestPartitionKind === 'string') &&
		isOptionalNumber(candidate.latestPartitionObservationCount) &&
		isOptionalNumber(candidate.latestPartitionMatchCount) &&
		typeof candidate.resultCount === 'number' &&
		typeof candidate.updatedAt === 'number'
	);
}

/** Guard the enrichment state carried by every current session snapshot. */
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

/** Guard optional evidence completeness metadata when a collection pass has reported it. */
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

/** Guard the analysis envelope fields needed by side panel rendering and cache recovery. */
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
