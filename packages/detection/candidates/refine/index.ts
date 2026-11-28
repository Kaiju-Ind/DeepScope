import type { RefineEvidenceCandidateBatchInput, RefinedEvidenceCandidateBatch } from "../refinement.ts";
import type { EvidenceEntry } from "../../evidence/index.ts";
import { createRefinementPolicy } from "./policy.ts";
import { buildRelationshipIndex, pruneUnsatisfiedRequirements, pruneOrphanedRelationshipCandidates } from "./relationships.ts";
import { createInitialCandidateNodes, sortAcceptedCandidates } from "./order.ts";
import type { RejectionRecorder, ResolveRelationshipsInput } from "./types.ts";
import { cloneTarget } from "./copy.ts";
import { expandImpliedCandidates } from "./implications.ts";
import { applyExclusions } from "./conflicts.ts";

/**
 * Apply compiled registry relationships to an evidence candidate batch.
 *
 * Relationship rules run after direct evidence has created candidates.
 * Implications create relationship-supported candidates, requirements must be
 * satisfied by independent evidence, and exclusions deterministically remove the
 * weaker side of a conflict until the accepted candidate set stabilizes.
 */
export function refineEvidenceCandidateBatch(
	input: RefineEvidenceCandidateBatchInput,
): RefinedEvidenceCandidateBatch {
	const policy = createRefinementPolicy(input.policy);
	const relationships = buildRelationshipIndex(input.compiledRegistry.relationshipEdges, input.compiledRegistry.registryOrderById);
	const accepted = createInitialCandidateNodes(input.batch, input.compiledRegistry.registryOrderById);
	const recorder: RejectionRecorder = { rejections: [], seen: new Set() };
	const relationshipEvidence: EvidenceEntry[] = [];

	resolveCandidateRelationshipsToFixedPoint({
		accepted,
		batch: input.batch,
		definitionsById: input.compiledRegistry.definitionsById,
		registryOrderById: input.compiledRegistry.registryOrderById,
		relationships,
		policy,
		recorder,
		relationshipEvidence,
		suppressedImpliedCandidateIds: new Set(),
	});

	return {
		target: cloneTarget(input.batch.target),
		observedAt: input.batch.observedAt,
		candidates: sortAcceptedCandidates(accepted, input.compiledRegistry.registryOrderById),
		rejections: recorder.rejections,
		relationshipEvidence,
	};
}

/** Repeat implication, requirement, orphan and exclusion passes until none changes the accepted set. */
function resolveCandidateRelationshipsToFixedPoint(input: ResolveRelationshipsInput): void {
	let changed = true;

	while (changed) {
		changed = false;
		changed = expandImpliedCandidates(input) || changed;
		changed = pruneUnsatisfiedRequirements(input) || changed;
		changed = pruneOrphanedRelationshipCandidates(input) || changed;
		changed = applyExclusions(input) || changed;
	}
}
