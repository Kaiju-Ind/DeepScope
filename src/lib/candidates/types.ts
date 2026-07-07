import type { CategoryId, ConfidenceScore, DetectionKind } from '../detection/types';
import type { EvidenceEntry } from '../evidence';
import type { ObservationTarget } from '../observations';

/**
 * Runtime source mix that created a candidate from accumulated evidence.
 *
 * `direct` means every supporting entry came from a rule or observation match,
 * `relationship` means every entry came from graph inference, and `mixed`
 * preserves compatibility batches where current `SiteAnalysis` output already
 * contains both direct and relationship evidence for the same technology.
 */
export type EvidenceCandidateSource = 'direct' | 'relationship' | 'mixed';

/**
 * Policy for combining evidence entries into candidate confidence.
 *
 * Candidate confidence is still a pre-graph score. These weights mirror the
 * current detector's rule that repeated evidence from one surface should help
 * less than evidence from a new surface.
 */
export interface EvidenceCandidateAggregationPolicy {
	/** Extra weight applied after the strongest evidence when the kind was already seen. */
	readonly sameSurfaceWeight: number;
	/** Extra weight applied after the strongest evidence when the kind is new to the candidate. */
	readonly distinctSurfaceWeight: number;
	/** Candidate confidence floor. Use zero to keep every technology that has evidence. */
	readonly minimumConfidence: number;
}

/**
 * Registry metadata attached to an evidence candidate.
 *
 * The candidate stage can run from raw evidence alone, but registry metadata is
 * needed before the candidate can be rendered or compared with the existing
 * `DetectionResult` shape.
 */
export interface EvidenceCandidateTechnology {
	/** Stable technology identifier from the registry or evidence entry. */
	readonly id: string;
	/** Display name from the registry, when the registry entry is available. */
	readonly name?: string;
	/** Canonical project or vendor website from the registry. */
	readonly website?: string;
	/** Optional maintainer-facing description from the registry. */
	readonly description?: string;
	/** Optional icon reference from the registry. */
	readonly icon?: string;
	/** Registry categories used by UI grouping and future reporting. */
	readonly categories: readonly CategoryId[];
}

/**
 * Detection candidate produced from evidence before graph refinement.
 *
 * A candidate means “this technology has support worth evaluating.” It is not a
 * final detection until relationship rules, final thresholds, and output
 * compatibility rules have been applied.
 */
export interface EvidenceCandidate {
	/** Target page or request context shared by the candidate evidence. */
	readonly target: ObservationTarget;
	/** Technology metadata associated with the candidate. */
	readonly technology: EvidenceCandidateTechnology;
	/** Source mix of the evidence supporting this candidate. */
	readonly source: EvidenceCandidateSource;
	/** Detector-compatible score derived from supporting evidence entries. */
	readonly confidence: ConfidenceScore;
	/** First version seen in deterministic evidence order, when any entry captured one. */
	readonly version?: string;
	/** Unique versions captured by supporting evidence entries. */
	readonly versions: readonly string[];
	/** Unique evidence surfaces that contributed to the candidate. */
	readonly kinds: readonly DetectionKind[];
	/** Number of direct rule or observation evidence entries. */
	readonly directEvidenceCount: number;
	/** Number of relationship evidence entries. */
	readonly relationshipEvidenceCount: number;
	/** Total number of evidence entries supporting this candidate. */
	readonly evidenceCount: number;
	/** Earliest supporting evidence timestamp. */
	readonly firstObservedAt: number;
	/** Latest supporting evidence timestamp. */
	readonly lastObservedAt: number;
	/** Defensive copy of the evidence entries used to create this candidate. */
	readonly evidence: readonly EvidenceEntry[];
}

/** Ordered candidate group produced for one target. */
export interface EvidenceCandidateBatch {
	/** Target shared by candidates in the batch. */
	readonly target: ObservationTarget;
	/** Timestamp associated with the aggregation pass. */
	readonly observedAt: number;
	/** Ordered candidates derived from accumulated evidence. */
	readonly candidates: readonly EvidenceCandidate[];
}
