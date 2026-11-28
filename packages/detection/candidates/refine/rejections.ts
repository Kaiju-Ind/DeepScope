import type { EvidenceCandidateRelationshipContext, EvidenceCandidateRejection } from "../refinement.ts";
import type { RejectionRecorder } from "./types.ts";
import { cloneCandidate } from "./copy.ts";

/** Retain edge direction and both technology IDs for a rejection explanation. */
export function createRelationshipContext(
	kind: EvidenceCandidateRelationshipContext['kind'],
	sourceTechnologyId: string,
	targetTechnologyId: string,
): EvidenceCandidateRelationshipContext {
	return { kind, sourceTechnologyId, targetTechnologyId };
}

/** Record each rejection identity once and copy its mutable evidence before later refinement passes run. */
export function recordRejection(recorder: RejectionRecorder, rejection: EvidenceCandidateRejection): void {
	const key = createRejectionKey(rejection);
	if (recorder.seen.has(key)) {
		return;
	}

	recorder.seen.add(key);
	recorder.rejections.push({
		...rejection,
		candidate: cloneCandidate(rejection.candidate),
		missingRequirementIds: rejection.missingRequirementIds ? [...rejection.missingRequirementIds] : undefined,
		relationship: rejection.relationship ? { ...rejection.relationship } : undefined,
	});
}

/** Include reason, technology, relationship, winner and missing requirements in the deduplication identity. */
function createRejectionKey(rejection: EvidenceCandidateRejection): string {
	return [
		rejection.reason,
		rejection.candidate.technology.id,
		rejection.relationship?.kind ?? '',
		rejection.relationship?.sourceTechnologyId ?? '',
		rejection.relationship?.targetTechnologyId ?? '',
		rejection.rejectedByTechnologyId ?? '',
		...(rejection.missingRequirementIds ?? []),
	].join(':');
}
