import type { SiteAnalysis } from '../detection/types';
import type { DetectionPipelineStage } from '../pipeline';

/** Schema marker for storage-backed detection session snapshots. */
export const DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION = 1 as const;

/** Version marker carried by every stored detection session snapshot. */
export type DetectionSessionSnapshotSchemaVersion = typeof DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION;


/** Evidence completeness levels carried by stored detector snapshots. */
export const DETECTION_EVIDENCE_COMPLETENESS_LEVELS = [
	'unknown',
	'recovered-initial',
	'initial',
	'incremental',
	'enriched',
	'full',
] as const;

/** How much evidence was available when a snapshot's detector output was produced. */
export type DetectionEvidenceCompletenessLevel = typeof DETECTION_EVIDENCE_COMPLETENESS_LEVELS[number];

/**
 * Durable evidence coverage attached to one detector snapshot.
 *
 * Matcher completion only proves that the matcher finished the observations it
 * received. This record says whether those observations came from the cheap
 * first pass, a recovered service-worker pass, late incremental observations, or
 * the richer enrichment passes that read broader page evidence.
 */
export interface DetectionEvidenceState {
	/** Coarse completeness level used for monotonic snapshot promotion. */
	readonly level: DetectionEvidenceCompletenessLevel;
	/** Evidence pass ids that successfully contributed to this snapshot. */
	readonly completedPassIds: readonly string[];
	/** Evidence pass ids expected for a full run, when known. */
	readonly requiredPassIds: readonly string[];
	/** Whether all required pass ids have completed. */
	readonly complete: boolean;
	/** Millisecond timestamp when this evidence state was produced. */
	readonly updatedAt: number;
	/** Short machine-readable note for recovered, partial, or degraded paths. */
	readonly reason?: string;
}

/** Schema marker for origin-level detector summaries. */
export const DETECTION_ORIGIN_SUMMARY_SCHEMA_VERSION = 1 as const;

/** Version marker carried by every stored origin summary. */
export type DetectionOriginSummarySchemaVersion = typeof DETECTION_ORIGIN_SUMMARY_SCHEMA_VERSION;

/** Schema marker for the compact aggregate storage status record. */
export const DETECTION_STORAGE_STATUS_SCHEMA_VERSION = 1 as const;

/** Version marker carried by the compact aggregate storage status record. */
export type DetectionStorageStatusSchemaVersion = typeof DETECTION_STORAGE_STATUS_SCHEMA_VERSION;

/**
 * Lifecycle state for the visible detection result associated with one page document.
 *
 * A popup can read this value from storage after a background service-worker restart
 * and still explain whether the visible data is cached, actively collecting,
 * observing for late page facts, finished, failed, stale, or intentionally stopped.
 */
export const DETECTION_SESSION_STATUSES = [
	'unknown',
	'cached',
	'collecting',
	'observing',
	'enriching',
	'complete',
	'failed',
	'stale',
	'stopped',
] as const;

/** Stored status for a detection session snapshot. */
export type DetectionSessionStatus = typeof DETECTION_SESSION_STATUSES[number];

/**
 * Lifecycle state for optional deeper evidence collection.
 *
 * Enrichment can outlive a popup render. Persisting terminal states such as
 * `failed`, `timed-out`, and `skipped` prevents the UI from looking like it is
 * still checking when no more evidence will arrive.
 */
export const DETECTION_ENRICHMENT_STATUSES = [
	'not-needed',
	'pending',
	'complete',
	'failed',
	'timed-out',
	'skipped',
] as const;

/** Stored status for deeper evidence collection attached to a snapshot. */
export type DetectionEnrichmentStatus = typeof DETECTION_ENRICHMENT_STATUSES[number];

/**
 * Stable identity for one page-local detection session.
 *
 * Manifest V3 background memory is disposable, so the identity is stored with the
 * result instead of living only in a background global. `documentId` distinguishes
 * navigations within the same tab, while `originHash` lets the popup recover the
 * latest origin-level result when the exact document session is not known yet.
 */
export interface DetectionSessionKey {
	/** Browser tab that owns the inspected document. */
	readonly tabId: number;
	/** Frame that produced the snapshot, usually the top frame for popup results. */
	readonly frameId: number;
	/** Browser document identifier or generated fallback for the inspected page load. */
	readonly documentId: string;
	/** Stable non-raw key for origin-level cache lookup. */
	readonly originHash: string;
}

/**
 * Persisted enrichment state for the session snapshot.
 *
 * The status is the only required field because some outcomes, especially
 * `not-needed` and `skipped`, have no meaningful start or completion timestamp.
 */
export interface DetectionEnrichmentState {
	/** Current enrichment lifecycle state. */
	readonly status: DetectionEnrichmentStatus;
	/** Millisecond timestamp when deeper evidence collection started, when known. */
	readonly startedAt?: number;
	/** Millisecond timestamp when the current state was last updated. */
	readonly updatedAt?: number;
	/** Millisecond timestamp when enrichment reached a terminal state, when known. */
	readonly completedAt?: number;
	/** Short machine-readable reason for failed, timed-out, skipped, or unnecessary enrichment. */
	readonly reason?: string;
}

/**
 * Public-safe replay summary embedded in a detection snapshot.
 *
 * Full replay traces stay in their existing replay storage namespace. The
 * snapshot keeps only the counts and stage names needed for a snapshot-first popup
 * render to say that explanation data exists and roughly how far the pipeline ran.
 */
export interface DetectionReplaySummary {
	/** Matcher run id that produced this replay, when available. */
	readonly runId?: string;
	/** Millisecond timestamp of the replayed analysis run. */
	readonly analyzedAt: number;
	/** Number of public replay events represented by the full trace. */
	readonly eventCount: number;
	/** Number of emitted detection explanations in the full trace. */
	readonly explanationCount: number;
	/** Number of final detections emitted by the replayed run. */
	readonly resultCount: number;
	/** Ordered unique pipeline stages represented by the summary. */
	readonly stages: readonly DetectionPipelineStage[];
}

/** Source that wrote the visible snapshot revision. */
export type DetectionSessionSnapshotSource = 'cache' | 'content' | 'background';

/**
 * Executor that produced detector output for a snapshot revision.
 *
 * The popup can show this in diagnostics so worker crashes, development-mode
 * fallbacks, and service-worker-bound matching are visible instead of being
 * misread as page collection or replay latency.
 */
export type DetectionMatcherExecutor =
	| 'offscreen-worker-pool'
	| 'background-fallback'
	| 'dev-fallback'
	| 'unknown';

/**
 * Public-safe matcher progress embedded in a partial snapshot revision.
 *
 * The popup does not need raw observations or match details to show that work is
 * still moving. Keeping only partition counters gives users a trustworthy
 * progress cue even when a partial write preserves an older, richer result list.
 */
export interface DetectionMatcherProgressSummary {
	/** Matcher job that produced the latest progress receipt. */
	readonly jobId: string;
	/** Matcher lane that owns the job, such as initial or enrichment. */
	readonly mode: string;
	/** Number of worker partitions that have completed for the job. */
	readonly completedPartitionCount: number;
	/** Total worker partitions scheduled for the job. */
	readonly partitionCount: number;
	/** Observation surface from the latest completed partition. */
	readonly latestPartitionKind?: string;
	/** Number of observations handled by the latest completed partition. */
	readonly latestPartitionObservationCount?: number;
	/** Number of matches emitted by the latest completed partition. */
	readonly latestPartitionMatchCount?: number;
	/** Detection count visible after the latest progress receipt. */
	readonly resultCount: number;
	/** Millisecond timestamp when this progress receipt was written. */
	readonly updatedAt: number;
}

/**
 * Durable popup-facing result for one inspected document.
 *
 * Each write advances a monotonically increasing `revision` for the same
 * `DetectionSessionKey`. The popup subscribes to storage changes and applies
 * only newer revisions, which makes visible updates resilient to popup teardown
 * and background service-worker shutdown.
 */
export interface DetectionSessionSnapshot {
	/** Stable page-session identity used for exact storage lookup. */
	readonly key: DetectionSessionKey;
	/** Storage schema version for future migrations. */
	readonly schemaVersion: DetectionSessionSnapshotSchemaVersion;
	/** Monotonic revision for the same page-session key. */
	readonly revision: number;
	/** Stable non-raw key for the full document URL. */
	readonly urlHash: string;
	/** Hostname safe for popup display. */
	readonly hostname: string;
	/** Visible lifecycle state for the stored result. */
	readonly status: DetectionSessionStatus;
	/** Extension context or cache path that produced the revision. */
	readonly source: DetectionSessionSnapshotSource;
	/** Millisecond timestamp when the snapshot revision was written. */
	readonly updatedAt: number;
	/** Number of detections in the embedded analysis. */
	readonly detectionCount: number;
	/** Evidence coverage represented by the embedded analysis. */
	readonly evidence?: DetectionEvidenceState;
	/** Normalized detector output safe for popup rendering and cache storage. */
	readonly analysis: SiteAnalysis;
	/** Stored deeper-evidence state for snapshot-first popup recovery. */
	readonly enrichment: DetectionEnrichmentState;
	/** Matcher executor path that produced this revision, when known. */
	readonly matcherExecutor?: DetectionMatcherExecutor;
	/** Optional public-safe matcher progress for in-flight partial revisions. */
	readonly matcherProgress?: DetectionMatcherProgressSummary;
	/** Optional public-safe replay progress summary. */
	readonly replaySummary?: DetectionReplaySummary;
}

/**
 * Lightweight origin-level summary derived from the newest promoted snapshot.
 *
 * This record is not a render model. It lets popup startup, status counts, and
 * diagnostics know which origin has recent detector state without treating an
 * origin pointer as proof that a snapshot belongs to the currently visible tab.
 */
export interface DetectionOriginSummary {
	/** Storage schema version for future migrations. */
	readonly schemaVersion: DetectionOriginSummarySchemaVersion;
	/** Stable non-raw key for the origin represented by this summary. */
	readonly originHash: string;
	/** Hostname safe for popup display. */
	readonly hostname: string;
	/** Full URL from the snapshot that produced this summary. */
	readonly url: string;
	/** Stable non-raw key for the full URL that produced this summary. */
	readonly urlHash: string;
	/** Exact session key that owns the renderable snapshot. */
	readonly sessionKey: DetectionSessionKey;
	/** Snapshot lifecycle state at the time this summary was derived. */
	readonly status: DetectionSessionStatus;
	/** Extension context or cache path that produced the summarized snapshot. */
	readonly source: DetectionSessionSnapshotSource;
	/** Number of detections in the summarized snapshot. */
	readonly detectionCount: number;
	/** Analysis timestamp copied from the summarized snapshot. */
	readonly analyzedAt: number;
	/** Summary update timestamp copied from the summarized snapshot. */
	readonly updatedAt: number;
	/** Evidence coverage copied from the summarized snapshot, when available. */
	readonly evidence?: DetectionEvidenceState;
	/** Matcher executor path copied from the summarized snapshot, when known. */
	readonly matcherExecutor?: DetectionMatcherExecutor;
	/** Optional public-safe replay progress summary copied from the summarized snapshot. */
	readonly replaySummary?: DetectionReplaySummary;
}

/**
 * Compact aggregate storage status updated with snapshot writes.
 *
 * `getStatus()` can still rebuild this from existing records, but keeping a
 * bounded status record means the popup does not need to scan all storage after
 * every revision once summaries exist.
 */
export interface DetectionStorageStatusSnapshot {
	/** Storage schema version for future migrations. */
	readonly schemaVersion: DetectionStorageStatusSchemaVersion;
	/** Number of origin summaries currently tracked. */
	readonly totalAnalyses: number;
	/** Number of unique origins represented by summaries. */
	readonly trackedOrigins: number;
	/** Newest analysis or summary update timestamp, when any summary exists. */
	readonly lastAnalyzedAt?: number;
	/** Timestamp when this aggregate record was written. */
	readonly updatedAt: number;
}
