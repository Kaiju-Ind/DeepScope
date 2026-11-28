import type { EvidenceCandidateRefinementPolicy } from "../refinement.ts";
import type { ConfidenceScore } from "../../types.ts";

/** Default policy for evidence candidate relationship refinement. */
export const DEFAULT_EVIDENCE_CANDIDATE_REFINEMENT_POLICY: EvidenceCandidateRefinementPolicy = Object.freeze({
	impliedConfidence: 55,
});

/** Copy the default implication policy before applying caller overrides. */
export function createRefinementPolicy(
	policy: Partial<EvidenceCandidateRefinementPolicy> = {},
): EvidenceCandidateRefinementPolicy {
	return Object.assign({}, DEFAULT_EVIDENCE_CANDIDATE_REFINEMENT_POLICY, policy);
}

/** Round and clamp policy confidence to zero through 100, then assign the shared display bands. */
export function toConfidenceScore(value: number): ConfidenceScore {
	const clamped = Math.max(0, Math.min(100, Math.round(value)));
	if (clamped >= 100) {
		return { value: clamped, level: 'certain' };
	}
	if (clamped >= 80) {
		return { value: clamped, level: 'high' };
	}
	if (clamped >= 50) {
		return { value: clamped, level: 'medium' };
	}
	return { value: clamped, level: 'low' };
}
