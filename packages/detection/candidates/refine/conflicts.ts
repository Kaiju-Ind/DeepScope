import type { ResolveRelationshipsInput, RelationshipIndex, CandidateNode } from "./types.ts";
import { recordRejection, createRelationshipContext } from "./rejections.ts";
import { compareRegistryOrder } from "./order.ts";
import type { EvidenceCandidateRelationshipContext } from "../refinement.ts";
import { hasExclusionEdge } from "./relationships.ts";

const MAX_EXACT_CONFLICT_COMPONENT_SIZE = 14;

/** Choose a compatible subset per conflict component, suppress rejected inferred IDs and retain a rejection explanation. */
export function applyExclusions(input: ResolveRelationshipsInput): boolean {
	let changed = false;
	const components = getExclusionConflictComponents(input);

	for (const component of components) {
		const selectedIds = component.length <= MAX_EXACT_CONFLICT_COMPONENT_SIZE
			? solveExactConflictComponent(component, input)
			: solveGreedyConflictComponent(component, input);

		for (const technologyId of component) {
			if (selectedIds.has(technologyId)) {
				continue;
			}

			const node = input.accepted.get(technologyId);
			if (!node) {
				continue;
			}

			input.accepted.delete(technologyId);
			if (node.inferred) {
				input.suppressedImpliedCandidateIds.add(technologyId);
			}

			recordRejection(input.recorder, {
				candidate: node.candidate,
				reason: 'excluded',
				relationship: createExclusionRejectionRelationship(technologyId, selectedIds, input.relationships),
				rejectedByTechnologyId: getExclusionRejectionWinner(technologyId, selectedIds, input),
			});
			changed = true;
		}
	}

	return changed;
}

/**
 * Exclusion conflicts are solved per connected component.
 *
 * Pairwise removal is deterministic but can keep a weaker overall explanation
 * when one candidate conflicts with a small cluster. Solving the component asks
 * a better question: which surviving subset keeps the most supported evidence
 * while obeying hard rules such as excludes, requirements, and live implication
 * sources?
 */
function getExclusionConflictComponents(input: ResolveRelationshipsInput): string[][] {
	const adjacency = new Map<string, Set<string>>();

	for (const [sourceId, excludedIds] of input.relationships.excludesBySource.entries()) {
		if (!input.accepted.has(sourceId)) {
			continue;
		}

		for (const excludedId of excludedIds) {
			if (!input.accepted.has(excludedId)) {
				continue;
			}

			pushConflictNeighbor(adjacency, sourceId, excludedId);
			pushConflictNeighbor(adjacency, excludedId, sourceId);
		}
	}

	const components: string[][] = [];
	const visited = new Set<string>();

	for (const technologyId of adjacency.keys()) {
		if (visited.has(technologyId)) {
			continue;
		}

		const component: string[] = [];
		const pending = [technologyId];
		visited.add(technologyId);

		while (pending.length > 0) {
			const currentId = pending.pop()!;
			component.push(currentId);

			for (const nextId of adjacency.get(currentId) ?? []) {
				if (visited.has(nextId)) {
					continue;
				}

				visited.add(nextId);
				pending.push(nextId);
			}
		}

		components.push(component.sort((left, right) => compareRegistryOrder(input.registryOrderById, left, right)));
	}

	return components;
}

/** Add a unique conflict edge to the traversal index without creating duplicate neighbors. */
function pushConflictNeighbor(adjacency: Map<string, Set<string>>, sourceId: string, targetId: string): void {
	const neighbors = adjacency.get(sourceId) ?? new Set<string>();
	neighbors.add(targetId);
	adjacency.set(sourceId, neighbors);
}

/** Enumerate valid subsets for components of at most 14 nodes and choose the strongest deterministic explanation. */
function solveExactConflictComponent(
	component: readonly string[],
	input: ResolveRelationshipsInput,
): Set<string> {
	let bestIds = new Set<string>();
	let bestScore: ConflictSubsetScore | null = null;
	const variantCount = 2 ** component.length;

	for (let mask = 1; mask < variantCount; mask += 1) {
		const selectedIds = new Set<string>();
		for (let index = 0; index < component.length; index += 1) {
			if ((mask & (1 << index)) !== 0) {
				selectedIds.add(component[index]!);
			}
		}

		if (!isValidConflictSubset(selectedIds, input)) {
			continue;
		}

		const score = scoreConflictSubset(selectedIds, input);
		if (!bestScore || compareConflictSubsetScore(score, bestScore) > 0) {
			bestIds = selectedIds;
			bestScore = score;
		}
	}

	return bestIds.size > 0 ? bestIds : new Set([component[0]!]);
}

/** Bound work for larger components by removing pairwise losers, then checking remaining dependency support. */
function solveGreedyConflictComponent(
	component: readonly string[],
	input: ResolveRelationshipsInput,
): Set<string> {
	const selectedIds = new Set(component);
	let changed = true;

	while (changed) {
		changed = false;
		for (const sourceId of component) {
			if (!selectedIds.has(sourceId)) {
				continue;
			}

			for (const excludedId of input.relationships.excludesBySource.get(sourceId) ?? []) {
				if (!selectedIds.has(excludedId)) {
					continue;
				}

				const sourceNode = input.accepted.get(sourceId);
				const excludedNode = input.accepted.get(excludedId);
				if (!sourceNode || !excludedNode) {
					continue;
				}

				selectedIds.delete(chooseConflictLoser(sourceId, sourceNode, excludedId, excludedNode));
				changed = true;
			}
		}
	}

	for (const technologyId of [...selectedIds]) {
		if (!candidateHasValidDependencies(technologyId, selectedIds, input)) {
			selectedIds.delete(technologyId);
		}
	}

	return selectedIds.size > 0 ? selectedIds : new Set([component[0]!]);
}

interface ConflictSubsetScore {
	/** Direct candidates are weighted heavily so inferred support cannot replace observed evidence without stronger surrounding support. */
	directCount: number;
	/** Sum of detector confidence across the selected set. */
	confidence: number;
	/** Number of selected candidates, used after evidence strength to keep compatible technologies together. */
	candidateCount: number;
	/** Stable registry-order fingerprint for deterministic tie breaks. */
	orderFingerprint: string;
}

/** Prioritize independent detections, total confidence and compatible candidate count before registry-order ties. */
function scoreConflictSubset(
	selectedIds: ReadonlySet<string>,
	input: ResolveRelationshipsInput,
): ConflictSubsetScore {
	let directCount = 0;
	let confidence = 0;
	const orderedIds = [...selectedIds].sort((left, right) => compareRegistryOrder(input.registryOrderById, left, right));

	for (const technologyId of orderedIds) {
		const node = input.accepted.get(technologyId);
		if (!node) {
			continue;
		}

		if (!node.inferred) {
			directCount += 1;
		}
		confidence += node.candidate.confidence.value;
	}

	return {
		directCount,
		confidence,
		candidateCount: selectedIds.size,
		orderFingerprint: orderedIds.map((id) => String(input.registryOrderById.get(id) ?? Number.MAX_SAFE_INTEGER).padStart(8, '0')).join(':'),
	};
}

/** Return a positive value for the stronger subset; earlier registry fingerprints win an otherwise exact tie. */
function compareConflictSubsetScore(left: ConflictSubsetScore, right: ConflictSubsetScore): number {
	return (
		left.directCount - right.directCount ||
		left.confidence - right.confidence ||
		left.candidateCount - right.candidateCount ||
		right.orderFingerprint.localeCompare(left.orderFingerprint)
	);
}

/** Reject subsets with mutual exclusions or candidates whose required direct support is absent. */
function isValidConflictSubset(
	selectedIds: ReadonlySet<string>,
	input: ResolveRelationshipsInput,
): boolean {
	for (const technologyId of selectedIds) {
		for (const excludedId of input.relationships.excludesBySource.get(technologyId) ?? []) {
			if (selectedIds.has(excludedId)) {
				return false;
			}
		}

		if (!candidateHasValidDependencies(technologyId, selectedIds, input)) {
			return false;
		}
	}

	return true;
}

/** Require independently observed prerequisites and, for inferred nodes, at least one surviving implication source. */
function candidateHasValidDependencies(
	technologyId: string,
	selectedIds: ReadonlySet<string>,
	input: ResolveRelationshipsInput,
): boolean {
	const node = input.accepted.get(technologyId);
	if (!node) {
		return false;
	}

	for (const requiredId of input.relationships.requiresBySource.get(technologyId) ?? []) {
		const requiredNode = input.accepted.get(requiredId);
		if (!selectedIds.has(requiredId) || !requiredNode || requiredNode.inferred || requiredNode.candidate.directEvidenceCount === 0) {
			return false;
		}
	}

	if (!node.inferred) {
		return true;
	}

	return (input.relationships.impliedSourcesByTarget.get(technologyId) ?? [])
		.some((sourceId) => selectedIds.has(sourceId));
}

/** Find the directed exclusion edge that explains a removed technology, checking both possible edge directions. */
function createExclusionRejectionRelationship(
	technologyId: string,
	selectedIds: ReadonlySet<string>,
	relationships: RelationshipIndex,
): EvidenceCandidateRelationshipContext | undefined {
	for (const selectedId of selectedIds) {
		if (hasExclusionEdge(relationships, selectedId, technologyId)) {
			return createRelationshipContext('excludes', selectedId, technologyId);
		}
		if (hasExclusionEdge(relationships, technologyId, selectedId)) {
			return createRelationshipContext('excludes', technologyId, selectedId);
		}
	}

	return undefined;
}

/** Name the strongest surviving conflicting candidate for the rejection record. */
function getExclusionRejectionWinner(
	technologyId: string,
	selectedIds: ReadonlySet<string>,
	input: ResolveRelationshipsInput,
): string | undefined {
	let winnerId: string | undefined;
	let winnerNode: CandidateNode | undefined;

	for (const selectedId of selectedIds) {
		if (!hasExclusionEdge(input.relationships, selectedId, technologyId) && !hasExclusionEdge(input.relationships, technologyId, selectedId)) {
			continue;
		}

		const selectedNode = input.accepted.get(selectedId);
		if (!selectedNode) {
			continue;
		}

		if (!winnerNode || chooseConflictLoser(winnerId!, winnerNode, selectedId, selectedNode) === winnerId) {
			winnerId = selectedId;
			winnerNode = selectedNode;
		}
	}

	return winnerId;
}

/** Prefer direct evidence over inference, then confidence, then earlier registry order. */
function chooseConflictLoser(
	sourceId: string,
	sourceNode: CandidateNode,
	excludedId: string,
	excludedNode: CandidateNode,
): string {
	if (sourceNode.inferred !== excludedNode.inferred) {
		return sourceNode.inferred ? sourceId : excludedId;
	}

	const confidenceDifference = sourceNode.candidate.confidence.value - excludedNode.candidate.confidence.value;
	if (confidenceDifference !== 0) {
		return confidenceDifference > 0 ? excludedId : sourceId;
	}

	return sourceNode.registryOrder <= excludedNode.registryOrder ? excludedId : sourceId;
}
