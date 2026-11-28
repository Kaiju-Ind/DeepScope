import type { ResolveRelationshipsInput, RelationshipIndex, CandidateNode } from "./types.ts";
import { recordRejection, createRelationshipContext } from "./rejections.ts";
import type { RefineEvidenceCandidateBatchInput } from "../refinement.ts";
import { compareRegistryOrder } from "./order.ts";

/** Remove candidates missing independently observed requirements and record the exact absent IDs. */
export function pruneUnsatisfiedRequirements(input: ResolveRelationshipsInput): boolean {
	let changed = false;

	for (const [technologyId, node] of Array.from(input.accepted.entries())) {
		const missingRequirementIds = getMissingDirectRequirementIds(
			technologyId,
			input.accepted,
			input.relationships,
		);
		if (missingRequirementIds.length === 0) {
			continue;
		}

		input.accepted.delete(technologyId);
		recordRejection(input.recorder, {
			candidate: node.candidate,
			reason: 'missing-requirement',
			relationship: createRelationshipContext('requires', technologyId, missingRequirementIds[0] ?? ''),
			missingRequirementIds,
		});
		changed = true;
	}

	return changed;
}

/** Remove inferred candidates whose implication sources no longer survive refinement. */
export function pruneOrphanedRelationshipCandidates(input: ResolveRelationshipsInput): boolean {
	let changed = false;

	for (const [technologyId, node] of Array.from(input.accepted.entries())) {
		if (!node.inferred) {
			continue;
		}

		const hasAcceptedSource = (input.relationships.impliedSourcesByTarget.get(technologyId) ?? [])
			.some((sourceId) => input.accepted.has(sourceId));
		if (hasAcceptedSource) {
			continue;
		}

		input.accepted.delete(technologyId);
		recordRejection(input.recorder, {
			candidate: node.candidate,
			reason: 'orphaned-relationship',
		});
		changed = true;
	}

	return changed;
}

/** Index compiled edges in both implication directions and sort each list by registry order for deterministic passes. */
export function buildRelationshipIndex(
	edges: RefineEvidenceCandidateBatchInput['compiledRegistry']['relationshipEdges'],
	registryOrderById: ReadonlyMap<string, number>,
): RelationshipIndex {
	const impliesBySource = new Map<string, string[]>();
	const requiresBySource = new Map<string, string[]>();
	const excludesBySource = new Map<string, string[]>();
	const impliedSourcesByTarget = new Map<string, string[]>();

	for (const edge of edges) {
		switch (edge.kind) {
			case 'implies':
				pushRelationship(impliesBySource, edge.sourceId, edge.targetId);
				pushRelationship(impliedSourcesByTarget, edge.targetId, edge.sourceId);
				break;
			case 'requires':
				pushRelationship(requiresBySource, edge.sourceId, edge.targetId);
				break;
			case 'excludes':
				pushRelationship(excludesBySource, edge.sourceId, edge.targetId);
				break;
		}
	}

	sortRelationshipIndex(impliesBySource, registryOrderById);
	sortRelationshipIndex(requiresBySource, registryOrderById);
	sortRelationshipIndex(excludesBySource, registryOrderById);
	sortRelationshipIndex(impliedSourcesByTarget, registryOrderById);

	return {
		impliesBySource,
		requiresBySource,
		excludesBySource,
		impliedSourcesByTarget,
	};
}

/** Deduplicate each target within a source's relationship list while preserving insertion order. */
function pushRelationship(map: Map<string, string[]>, key: string, value: string): void {
	const values = map.get(key) ?? [];
	if (!values.includes(value)) {
		values.push(value);
	}
	map.set(key, values);
}

/** Normalize relationship traversal to registry order before inference and conflict resolution. */
function sortRelationshipIndex(map: Map<string, string[]>, registryOrderById: ReadonlyMap<string, number>): void {
	for (const [key, values] of map.entries()) {
		map.set(key, values.sort((left, right) => compareRegistryOrder(registryOrderById, left, right)));
	}
}

/** Return requirements that lack a surviving directly observed candidate; inference alone cannot satisfy them. */
export function getMissingDirectRequirementIds(
	technologyId: string,
	accepted: Map<string, CandidateNode>,
	relationships: RelationshipIndex,
): string[] {
	return (relationships.requiresBySource.get(technologyId) ?? [])
		.filter((requiredId) => !hasDirectRequirementEvidence(requiredId, accepted));
}

/**
 * Requirements are guards, not evidence producers.
 *
 * A relationship-only candidate cannot satisfy another candidate's requirement;
 * otherwise an implication chain could bootstrap itself into acceptance without
 * an independently observed supporting technology.
 */
function hasDirectRequirementEvidence(requiredId: string, accepted: Map<string, CandidateNode>): boolean {
	const node = accepted.get(requiredId);
	return Boolean(node && !node.inferred && node.candidate.directEvidenceCount > 0);
}

/** Check one directed exclusion edge; callers decide whether the reverse direction also matters. */
export function hasExclusionEdge(relationships: RelationshipIndex, sourceId: string, targetId: string): boolean {
	return Boolean(relationships.excludesBySource.get(sourceId)?.includes(targetId));
}
