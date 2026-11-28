import type { DetectionEnrichmentState, DetectionEvidenceState, MatcherProgressType, DetectionOriginSummary, DetectionSessionSnapshot, DetectionStorageStatusSnapshot } from "../session.ts";
import type { DetectionReplaySummary } from "@deepscope/detection/pipeline/replay";
import type { Evidence, SiteAnalysis } from "@deepscope/detection/types";

import type { DetectionSessionIndexRecord } from "../../persistence/ports.ts";

/**
 * Clone a detection snapshot using only the persisted contract fields.
 *
 * Browser storage serializes values, but Vitest storage mocks keep object
 * references. Manual cloning prevents callers from mutating cached snapshots and
 * drops accidental raw collector payloads attached to an object before saving.
 */
export function cloneDetectionSessionSnapshot(snapshot: DetectionSessionSnapshot): DetectionSessionSnapshot {
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
		...(snapshot.matcherProgress ? { matcherProgress: cloneMatcherProgress(snapshot.matcherProgress) } : {}),
		...(snapshot.replaySummary ? { replaySummary: cloneDetectionReplaySummary(snapshot.replaySummary) } : {}),
	};
}

/** Clone a lightweight origin summary so callers cannot mutate storage mocks by reference. */
export function cloneDetectionOriginSummary(summary: DetectionOriginSummary): DetectionOriginSummary {
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
export function cloneDetectionStorageStatusSnapshot(
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
export function cloneDetectionEvidenceState(state: DetectionEvidenceState): DetectionEvidenceState {
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
export function cloneDetectionEnrichmentState(state: DetectionEnrichmentState): DetectionEnrichmentState {
	return {
		status: state.status,
		...(state.startedAt !== undefined ? { startedAt: state.startedAt } : {}),
		...(state.updatedAt !== undefined ? { updatedAt: state.updatedAt } : {}),
		...(state.completedAt !== undefined ? { completedAt: state.completedAt } : {}),
		...(state.reason ? { reason: state.reason } : {}),
	};
}

/** Clone matcher progress counters so storage mock reads cannot mutate the saved value. */
export function cloneMatcherProgress(
	progress: MatcherProgressType,
): MatcherProgressType {
	return {
		jobId: progress.jobId,
		mode: progress.mode,
		phase: progress.phase,
		...(progress.queuedAt !== undefined ? { queuedAt: progress.queuedAt } : {}),
		...(progress.startedAt !== undefined ? { startedAt: progress.startedAt } : {}),
		...(progress.queuePosition !== undefined ? { queuePosition: progress.queuePosition } : {}),
		...(progress.queueDepth !== undefined ? { queueDepth: progress.queueDepth } : {}),
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
export function cloneDetectionReplaySummary(summary: DetectionReplaySummary): DetectionReplaySummary {
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
export function cloneDetectionSessionIndexRecord(record: DetectionSessionIndexRecord): DetectionSessionIndexRecord {
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
