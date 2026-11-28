import type { DetectionSessionSnapshot } from "../session.ts";

import type { VisibleTabIdentity } from "../../messaging/analysis.ts";

import { evidenceRank } from "../session.ts";

import { cloneDetectionSessionSnapshot, cloneDetectionEnrichmentState, cloneMatcherProgress } from './clone.ts';

/** Compare origin candidates across sessions where revision numbers are not shared. */
export function isOriginSnapshotNewer(
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
 * side panel opens again. A content snapshot that preserves real detections stays useful
 * as a lower-ranked fallback for exact-session lifecycle reads.
 */
function getOriginSnapshotRank(snapshot: DetectionSessionSnapshot): number {
	const coverage = evidenceRank(snapshot.evidence);
	const sourceRank = snapshot.source === 'background' && snapshot.replaySummary
		? 4
		: snapshot.source === 'background'
			? 3
			: snapshot.source === 'cache'
				? 2
				: snapshot.detectionCount > 0
					? 1
					: 0;
	return coverage * 10 + sourceRank;
}

/**
 * Preview background writes can arrive after a richer exact snapshot.
 *
 * Worker partitions and non-final matcher passes are useful while the visible
 * count is growing, but they must not make the durable session record move
 * backward. A replay-backed recovered run can still be lower-completeness, so
 * evidence rank decides whether it may replace an older richer snapshot.
 */
export function shouldPreserveExistingAnalysisForCandidate(
	candidate: DetectionSessionSnapshot,
	existing: DetectionSessionSnapshot,
): boolean {
	if (candidate.source !== 'background' || candidate.analysis.url !== existing.analysis.url) {
		return false;
	}

	if (candidate.detectionCount >= existing.detectionCount) {
		return false;
	}

	const candidateEvidenceRank = evidenceRank(candidate.evidence);
	const existingEvidenceRank = evidenceRank(existing.evidence);
	if (candidateEvidenceRank < existingEvidenceRank) {
		return true;
	}
	if (candidate.replaySummary) {
		return false;
	}

	return true;
}

/**
 * Keep richer detector output while still publishing progress-only revisions.
 *
 * A lower-count partial can be useful because it proves worker progress, but it
 * should not visibly shrink the result list. The merged snapshot advances the
 * revision and lifecycle fields from the candidate while preserving the richer
 * analysis payload already stored for the same exact session.
 */
export function mergeLowerCompletenessSnapshot(
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
		...(candidate.matcherProgress ? { matcherProgress: cloneMatcherProgress(candidate.matcherProgress) } : {}),
	});
}

/** Return whether a snapshot still belongs to the side panel-visible tab identity. */
export function isSnapshotForVisibleIdentity(
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

/** Detector-owned or detection-bearing snapshots are safe as first side panel paint. */
export function isRenderableDetectorSnapshot(snapshot: DetectionSessionSnapshot): boolean {
	if (snapshot.source === 'background' || snapshot.source === 'cache') {
		return true;
	}

	return snapshot.detectionCount > 0;
}
