import type * as observe from '../../lib/content/observe/index.ts';
import type { AnalysisEnrichmentState, AnalyzeVisibleTabOutput, ObservationSessionTarget, SnapshotReuseStatus } from "../../lib/messaging/analysis.ts";
import { DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION, evidenceRank, type DetectionEvidenceState, type MatcherProgressType, type DetectionSessionSnapshotSource, type DetectionSessionStatus, type DetectionSessionSnapshot } from "../../lib/storage/session.ts";
import { type DetectionReplaySummary } from "@deepscope/detection/pipeline/replay";
import type { SiteAnalysis } from "@deepscope/detection/types";
import { isDetectionReplayTraceForAnalysis, type DetectionReplayTrace } from "@deepscope/detection/pipeline";
import * as replay from '@deepscope/detection/pipeline/replay';
import { getMatcherStatusFromSnapshot } from './matcher.ts';
import { getReplayTraceForVisibleAnalysis, getReplayHistoryForVisibleAnalysis } from './replay.ts';

/** Panel-visible detector revision independent from background command envelopes. */
export type VisibleRevision = {
	/** Origin of this visible revision in the side panel data flow. */
	readonly source: 'command' | 'snapshot';
	/** Normalized detector output safe for side panel rendering. */
	readonly analysis: SiteAnalysis;
	/** Snapshot reuse metadata used for copy and diagnostics. */
	readonly snapshot: {
		readonly status: SnapshotReuseStatus;
		readonly key: string;
		readonly expiresAt?: number;
	};
	/** Durable snapshot lifecycle status when this revision was derived from storage. */
	readonly sessionSnapshotStatus?: DetectionSessionStatus;
	/** Durable snapshot writer when this revision was derived from storage. */
	readonly sessionSnapshotSource?: DetectionSessionSnapshotSource;
	/** Live observation state when this revision owns a content session. */
	readonly session?: observe.StateType;
	/** Stable session handle for refresh, stop, and cleanup. */
	readonly sessionTarget?: ObservationSessionTarget;
	/** Latest full replay trace, when hydrated. */
	readonly replayTrace?: DetectionReplayTrace;
	/** Bounded newest-first replay traces, when hydrated. */
	readonly replayHistory?: readonly DetectionReplayTrace[];
	/** Compact replay summary stored on detector snapshots. */
	readonly replaySummary?: DetectionReplaySummary;
	/** Compact matcher progress stored on partial snapshot revisions. */
	readonly matcherProgress?: MatcherProgressType;
	/** Deeper evidence lifecycle state attached to the revision. */
	readonly enrichment?: AnalysisEnrichmentState;
	/** Evidence completeness represented by this detector revision. */
	readonly evidence?: DetectionEvidenceState;
	/** Revision write timestamp when the value came from storage. */
	readonly updatedAt?: number;
};

/** Returns whether this revision still represents in-flight matcher work. */
export function isVisibleRevisionPending(revision: VisibleRevision): boolean {
	if (revision.enrichment?.status === 'pending') {
		return true;
	}

	if (revision.replayTrace || revision.replaySummary) {
		return false;
	}

	if (revision.sessionSnapshotStatus) {
		return getMatcherStatusFromSnapshot({
			key: { tabId: 0, frameId: 0, documentId: 'revision', originHash: 'revision' },
			schemaVersion: DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION,
			revision: 0,
			urlHash: 'revision',
			hostname: revision.analysis.hostname,
			status: revision.sessionSnapshotStatus,
			source: revision.sessionSnapshotSource ?? (revision.source === 'snapshot' ? 'background' : 'cache'),
			updatedAt: revision.updatedAt ?? revision.analysis.analyzedAt,
			detectionCount: revision.analysis.results.length,
			analysis: revision.analysis,
			enrichment: { status: revision.enrichment?.status ?? 'not-needed' },
			...(revision.matcherProgress ? { matcherProgress: revision.matcherProgress } : {}),
		}) !== 'idle';
	}

	return false;
}

/** Returns whether replay details belong to the current visible revision. */
export function shouldApplyReplayState(revision: VisibleRevision): boolean {
	if (isVisibleRevisionPending(revision)) {
		return false;
	}

	if (revision.replayTrace && !isDetectionReplayTraceForAnalysis(revision.replayTrace, revision.analysis)) {
		return false;
	}

	if (revision.replaySummary && !replay.describes(revision.replaySummary, revision.analysis)) {
		return false;
	}

	return true;
}

/** Convert the current background command response into a side panel revision bridge. */
export function createVisibleRevisionFromAnalysisResponse(
	response: AnalyzeVisibleTabOutput,
): VisibleRevision {
	const replayTrace = getReplayTraceForVisibleAnalysis(response.replayTrace, response.analysis);
	const replayHistory = getReplayHistoryForVisibleAnalysis(response.replayHistory, response.analysis);
	return {
		source: 'command',
		analysis: response.analysis,
		snapshot: { ...response.snapshot },
		...(response.session ? { session: response.session } : {}),
		...(response.sessionTarget ? { sessionTarget: response.sessionTarget } : {}),
		...(replayTrace ? { replayTrace } : {}),
		...(replayHistory.length ? { replayHistory } : {}),
		...(response.enrichment ? { enrichment: response.enrichment } : {}),
		...(response.evidence ? { evidence: response.evidence } : {}),
	};
}

/**
 * Decide whether a storage snapshot can replace the detector output already shown.
 *
 * Content-owned lifecycle revisions are allowed to move observation status forward,
 * but an empty bootstrap snapshot must not erase richer detector output from the
 * same page. Background and cache snapshots still apply because they carry real
 * detector results or explicit cache state.
 */
export function shouldApplySnapshotRevision(input: {
	readonly currentAnalysis: SiteAnalysis | null;
	readonly snapshot: DetectionSessionSnapshot;
}): boolean {
	const currentAnalysis = input.currentAnalysis;
	if (!currentAnalysis) {
		return true;
	}

	if (isLowerCompletenessDetectorRevision(currentAnalysis, input.snapshot)) {
		return false;
	}

	if (input.snapshot.source !== 'content') {
		return true;
	}

	if (input.snapshot.analysis.url !== currentAnalysis.url) {
		return true;
	}

	// Content snapshots own page-session lifecycle only. They can preserve detector
	// output while writing storage, but replaying that copied analysis into Solid on
	// every observer revision creates unnecessary list work and visible churn. The
	// background-owned detector snapshot remains the authority for same-page results.
	return false;
}

/**
 * Keep older partial matcher snapshots from making the count visibly move backward.
 *
 * Partial background revisions are useful while the first scan is growing, but a
 * lower-count partial from a slower worker batch or a deferred refresh should not
 * replace a richer visible snapshot for the same URL. Replay-backed lower counts
 * remain eligible only when they do not advertise lower evidence completeness,
 * which preserves backward compatibility for older stored snapshots.
 */
function isLowerCompletenessDetectorRevision(
	currentAnalysis: SiteAnalysis,
	snapshot: DetectionSessionSnapshot,
): boolean {
	if (
		snapshot.source !== 'background' ||
		snapshot.analysis.url !== currentAnalysis.url ||
		snapshot.analysis.results.length >= currentAnalysis.results.length
	) {
		return false;
	}

	if (snapshot.evidence && evidenceRank(snapshot.evidence) < 5) {
		return true;
	}

	return snapshot.replaySummary === undefined;
}
