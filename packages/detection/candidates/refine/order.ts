import type { EvidenceCandidateBatch, EvidenceCandidate } from "../types.ts";
import type { CandidateNode } from "./types.ts";
import { cloneCandidate } from "./copy.ts";

/** Copy input candidates into refinement-owned state and record registry position plus direct-versus-inferred support. */
export function createInitialCandidateNodes(
	batch: EvidenceCandidateBatch,
	registryOrderById: ReadonlyMap<string, number>,
): Map<string, CandidateNode> {
	const accepted = new Map<string, CandidateNode>();
	for (const candidate of batch.candidates) {
		accepted.set(candidate.technology.id, {
			candidate: cloneCandidate(candidate),
			inferred: isRelationshipOnlyCandidate(candidate),
			registryOrder: registryOrderById.get(candidate.technology.id) ?? Number.MAX_SAFE_INTEGER,
		});
	}

	return accepted;
}

/** Emit detached candidates in stable registry order so callers cannot mutate the accepted-state records. */
export function sortAcceptedCandidates(
	accepted: Map<string, CandidateNode>,
	registryOrderById: ReadonlyMap<string, number>,
): EvidenceCandidate[] {
	return Array.from(accepted.values())
		.sort((left, right) => compareCandidateNodes(left, right, registryOrderById))
		.map((node) => cloneCandidate(node.candidate));
}

/** Use registry position before technology ID to keep equivalent refinement runs deterministic. */
function compareCandidateNodes(
	left: CandidateNode,
	right: CandidateNode,
	registryOrderById: ReadonlyMap<string, number>,
): number {
	return (
		compareRegistryOrder(registryOrderById, left.candidate.technology.id, right.candidate.technology.id) ||
		left.candidate.technology.id.localeCompare(right.candidate.technology.id)
	);
}

/** Place unknown IDs after known registry positions; callers supply any final tie breaker. */
export function compareRegistryOrder(registryOrderById: ReadonlyMap<string, number>, left: string, right: string): number {
	return (
		(registryOrderById.get(left) ?? Number.MAX_SAFE_INTEGER) -
		(registryOrderById.get(right) ?? Number.MAX_SAFE_INTEGER)
	);
}

/** Treat a candidate as inferred only when it has relationship support and no direct evidence. */
function isRelationshipOnlyCandidate(candidate: EvidenceCandidate): boolean {
	return candidate.directEvidenceCount === 0 && candidate.relationshipEvidenceCount > 0;
}
