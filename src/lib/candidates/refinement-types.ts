import type { CompiledDetectionRegistry } from '../detection/registry-graph';
import type { EvidenceEntry } from '../evidence';
import type { EvidenceCandidate, EvidenceCandidateBatch } from './types';

/**
 * Policy values used by candidate relationship refinement.
 *
 * The stage is still pre-output: the values here decide how graph-created
 * candidates are represented, not whether a technology is shown in the popup.
 */
export interface EvidenceCandidateRefinementPolicy {
	/** Confidence assigned to candidates that are created only through `implies`. */
	readonly impliedConfidence: number;
}

/**
 * Reason a candidate was removed or skipped during relationship refinement.
 *
 * These reasons are intentionally small and stable so future explanation and
 * replay output can group graph effects without depending on private resolver
 * control flow.
 */
export type EvidenceCandidateRejectionReason =
	| 'missing-requirement'
	| 'excluded'
	| 'orphaned-relationship'
	| 'unknown-implied-technology';

/**
 * Relationship edge that caused a candidate to be created, removed, or skipped.
 */
export interface EvidenceCandidateRelationshipContext {
	/** Relationship kind that affected the candidate. */
	readonly kind: 'implies' | 'requires' | 'excludes';
	/** Technology that owns the relationship declaration. */
	readonly sourceTechnologyId: string;
	/** Technology affected by the relationship declaration. */
	readonly targetTechnologyId: string;
}

/**
 * Candidate removed from the accepted candidate set during graph refinement.
 *
 * Keeping rejections separate from accepted candidates makes graph decisions
 * explainable without changing the stable `SiteAnalysis` shape.
 */
export interface EvidenceCandidateRejection {
	/** Candidate that was removed or skipped. */
	readonly candidate: EvidenceCandidate;
	/** Stable reason explaining why the candidate is not accepted. */
	readonly reason: EvidenceCandidateRejectionReason;
	/** Relationship context that triggered the rejection, when one direct edge explains it. */
	readonly relationship?: EvidenceCandidateRelationshipContext;
	/** Direct requirements that were missing when `reason` is `missing-requirement`. */
	readonly missingRequirementIds?: readonly string[];
	/** Candidate that won an exclusion conflict, when `reason` is `excluded`. */
	readonly rejectedByTechnologyId?: string;
}

/**
 * Input for resolving evidence candidates against compiled registry relationships.
 */
export interface RefineEvidenceCandidateBatchInput {
	/** Candidate batch produced from accumulated evidence. */
	readonly batch: EvidenceCandidateBatch;
	/** Compiled registry graph that provides relationship edges and registry order. */
	readonly compiledRegistry: CompiledDetectionRegistry;
	/** Optional policy override for deterministic compatibility experiments. */
	readonly policy?: Partial<EvidenceCandidateRefinementPolicy>;
}

/**
 * Candidate batch after applying `implies`, `requires`, and `excludes` edges.
 *
 * The accepted candidates are still not final detections. They are the graph-
 * refined candidate set that a later output compatibility stage can compare
 * against the current detector.
 */
export interface RefinedEvidenceCandidateBatch extends EvidenceCandidateBatch {
	/** Accepted candidates after fixed-point relationship refinement. */
	readonly candidates: readonly EvidenceCandidate[];
	/** Candidates removed or skipped by graph refinement. */
	readonly rejections: readonly EvidenceCandidateRejection[];
	/** Relationship evidence entries created for inferred candidates. */
	readonly relationshipEvidence: readonly EvidenceEntry[];
}
