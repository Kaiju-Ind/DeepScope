import type { RefinedEvidenceCandidateBatch } from '../candidates';
import type { SiteAnalysis } from '../detection/types';

/**
 * Policy for turning graph-refined candidates into final detector output.
 *
 * The emission stage is where a candidate becomes visible as a `DetectionResult`.
 * Keeping the display threshold here lets earlier stages keep weak candidates for
 * replay and explanation without showing them in the popup prematurely.
 */
export interface FinalDetectionEmissionPolicy {
	/** Minimum candidate confidence required before a result appears in `SiteAnalysis.results`. */
	readonly displayConfidenceThreshold: number;
}

/** Runtime source label written onto the emitted `SiteAnalysis`. */
export type FinalDetectionAnalysisSource = SiteAnalysis['source'];

/**
 * Input for emitting current `SiteAnalysis` output from refined evidence candidates.
 *
 * The batch is already relationship-refined. This stage only applies final output
 * compatibility rules: threshold filtering, version selection, evidence mapping,
 * final sorting, and the `SiteAnalysis` envelope.
 */
export interface EmitSiteAnalysisFromCandidatesInput {
	/** Relationship-refined candidate batch that should become detector output. */
	readonly batch: RefinedEvidenceCandidateBatch;
	/** Optional analysis timestamp for deterministic tests and replay. Defaults to `Date.now()`. */
	readonly analyzedAt?: number;
	/** Source marker for the emitted analysis. Defaults to `fresh` to match current detector output. */
	readonly source?: FinalDetectionAnalysisSource;
	/** Optional policy override for compatibility experiments. */
	readonly policy?: Partial<FinalDetectionEmissionPolicy>;
}

/**
 * Metadata about one emission pass.
 *
 * The current popup only needs the `SiteAnalysis`, but parity tests and future
 * replay tooling need to know how many candidates were hidden by the final
 * threshold without storing rejected candidates inside the public analysis shape.
 */
export interface FinalDetectionEmissionMetadata {
	/** Candidates received from relationship refinement before final threshold filtering. */
	readonly candidateCount: number;
	/** Candidates that passed the final display threshold and became detection results. */
	readonly emittedResultCount: number;
	/** Candidates below the final display threshold. */
	readonly filteredCandidateCount: number;
	/** Candidates removed or skipped earlier by graph refinement. */
	readonly rejectionCount: number;
	/** Relationship evidence entries generated during refinement. */
	readonly relationshipEvidenceCount: number;
}

/**
 * Output of the emission stage.
 *
 * `analysis` stays compatible with cached and rendered detector output.
 * `metadata` carries pipeline diagnostics without widening `SiteAnalysis`.
 */
export interface FinalDetectionEmissionResult {
	/** Site analysis compatible with the existing background, storage, and popup contracts. */
	readonly analysis: SiteAnalysis;
	/** Sidecar metadata for tests, replay, and migration diagnostics. */
	readonly metadata: FinalDetectionEmissionMetadata;
}
