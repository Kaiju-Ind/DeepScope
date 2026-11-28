import type { TechnologyDefinition } from "@deepscope/registry/types";
import { Graph } from "@dagrejs/graphlib";
import type { DetectionResult } from "../types.ts";
import type { CompiledDetectionRegistry } from "../registry/graph.ts";
import { compareDetectionResults } from "./order.ts";
import { detectionCandidateToResult, createRelationshipDetectionCandidate } from "./candidate.ts";
import { toConfidenceScore } from "./confidence.ts";

const IMPLIED_CONFIDENCE = 55;

type RelationshipGraph = {
	definitionsById: Map<string, TechnologyDefinition>;
	registryOrderById: Map<string, number>;
	implies: Graph;
	requires: Graph;
	excludes: Graph;
};

type RelationshipNode = {
	result: DetectionResult;
	inferred: boolean;
	registryOrder: number;
};

/** Resolve graph rules over direct detections in owned acceptance state, then return deterministic confidence-ranked results. */
export function applyRelationships(
	results: DetectionResult[],
	compiledRegistry: CompiledDetectionRegistry,
): DetectionResult[] {
	const graph = buildRelationshipGraph(compiledRegistry);
	const accepted = new Map<string, RelationshipNode>();

	for (const result of results) {
		accepted.set(result.technologyId, {
			result,
			inferred: false,
			registryOrder: graph.registryOrderById.get(result.technologyId) ?? Number.MAX_SAFE_INTEGER,
		});
	}

	resolveRelationshipsToFixedPoint(accepted, graph);

	return Array.from(accepted.values())
		.map((node) => node.result)
		.sort(compareDetectionResults(graph.registryOrderById));
}

/** Separate compiled implication, requirement and exclusion edges while borrowing immutable definition/order indexes. */
function buildRelationshipGraph(compiledRegistry: CompiledDetectionRegistry): RelationshipGraph {
	const implies = createDirectedRelationshipGraph(compiledRegistry);
	const requires = createDirectedRelationshipGraph(compiledRegistry);
	const excludes = createDirectedRelationshipGraph(compiledRegistry);

	for (const edge of compiledRegistry.relationshipEdges) {
		switch (edge.kind) {
			case 'implies':
				implies.setEdge(edge.sourceId, edge.targetId);
				break;
			case 'requires':
				requires.setEdge(edge.sourceId, edge.targetId);
				break;
			case 'excludes':
				excludes.setEdge(edge.sourceId, edge.targetId);
				break;
		}
	}

	return {
		definitionsById: compiledRegistry.definitionsById,
		registryOrderById: compiledRegistry.registryOrderById,
		implies,
		requires,
		excludes,
	};
}

/** Include every known technology even when it has no edges, so successor and predecessor lookups share one node set. */
function createDirectedRelationshipGraph(compiledRegistry: CompiledDetectionRegistry): Graph {
	const graph = new Graph({ directed: true });
	for (const definition of compiledRegistry.technologies) {
		graph.setNode(definition.id);
	}
	return graph;
}

/** Return directed targets in registry order, using ID ordering for ties and unknown positions. */
function relationshipTargets(
	graph: Graph,
	sourceId: string,
	registryOrderById: Map<string, number>,
): string[] {
	return ((graph.successors(sourceId) ?? []) as string[]).sort(
		(a: string, b: string) =>
			(registryOrderById.get(a) ?? Number.MAX_SAFE_INTEGER) -
				(registryOrderById.get(b) ?? Number.MAX_SAFE_INTEGER) || a.localeCompare(b),
	);
}

/** Repeat implication, requirement, orphan and exclusion passes until the accepted set stops changing. */
function resolveRelationshipsToFixedPoint(
	accepted: Map<string, RelationshipNode>,
	graph: RelationshipGraph,
): void {
	let changed = true;

	while (changed) {
		changed = false;
		changed = expandImpliedTechnologies(accepted, graph) || changed;
		changed = pruneUnsatisfiedRequirements(accepted, graph) || changed;
		changed = pruneOrphanedImpliedTechnologies(accepted, graph) || changed;
		changed = applyExclusions(accepted, graph) || changed;
	}
}

/** Remove detections whose prerequisites lack independent direct evidence in the current accepted set. */
function pruneUnsatisfiedRequirements(
	accepted: Map<string, RelationshipNode>,
	graph: RelationshipGraph,
): boolean {
	let changed = false;

	for (const id of Array.from(accepted.keys())) {
		const requiredIds = relationshipTargets(graph.requires, id, graph.registryOrderById);
		const hasAllRequirements = requiredIds.every((requiredId) =>
			hasDirectRequirementEvidence(requiredId, accepted),
		);

		if (!hasAllRequirements) {
			accepted.delete(id);
			changed = true;
		}
	}

	return changed;
}

/** Remove inferred results when no surviving source still implies them. */
function pruneOrphanedImpliedTechnologies(
	accepted: Map<string, RelationshipNode>,
	graph: RelationshipGraph,
): boolean {
	let changed = false;

	for (const [id, node] of Array.from(accepted.entries())) {
		if (!node.inferred) {
			continue;
		}

		const hasAcceptedSource = ((graph.implies.predecessors(id) ?? []) as string[]).some((sourceId) =>
			accepted.has(sourceId),
		);

		if (!hasAcceptedSource) {
			accepted.delete(id);
			changed = true;
		}
	}

	return changed;
}

/** Add known implied technologies only when direct prerequisites survive and no stronger accepted conflict defeats them. */
function expandImpliedTechnologies(
	accepted: Map<string, RelationshipNode>,
	graph: RelationshipGraph,
): boolean {
	let changed = false;

	for (const sourceId of Array.from(accepted.keys())) {
		const sourceDefinition = graph.definitionsById.get(sourceId);
		if (!sourceDefinition) {
			continue;
		}

		for (const impliedId of relationshipTargets(graph.implies, sourceId, graph.registryOrderById)) {
			if (accepted.has(impliedId)) {
				continue;
			}

			const impliedDefinition = graph.definitionsById.get(impliedId);
			if (!impliedDefinition) {
				continue;
			}

			if (!hasSatisfiedRequirements(impliedDefinition, accepted, graph)) {
				continue;
			}

			const impliedNode: RelationshipNode = {
				result: createImpliedResult(impliedDefinition, sourceDefinition),
				inferred: true,
				registryOrder: graph.registryOrderById.get(impliedId) ?? Number.MAX_SAFE_INTEGER,
			};

			if (wouldLoseAcceptedExclusionConflict(impliedId, impliedNode, accepted, graph)) {
				continue;
			}

			accepted.set(impliedId, impliedNode);
			changed = true;
		}
	}

	return changed;
}

/** Require every graph prerequisite to be independently detected before an implication may be accepted. */
function hasSatisfiedRequirements(
	definition: TechnologyDefinition,
	accepted: Map<string, RelationshipNode>,
	graph: RelationshipGraph,
): boolean {
	return relationshipTargets(graph.requires, definition.id, graph.registryOrderById).every((requiredId) =>
		hasDirectRequirementEvidence(requiredId, accepted),
	);
}

/**
 * A requirement is a guard, not extra evidence. It must be satisfied by an
 * independently detected technology, otherwise a weak component-library hit can
 * imply its own framework dependency and then use that implication to survive.
 */
function hasDirectRequirementEvidence(
	requiredId: string,
	accepted: Map<string, RelationshipNode>,
): boolean {
	const requiredNode = accepted.get(requiredId);
	return Boolean(requiredNode && !requiredNode.inferred);
}

/** Check both exclusion directions before adding an implication, preventing a losing node from reappearing each pass. */
function wouldLoseAcceptedExclusionConflict(
	id: string,
	node: RelationshipNode,
	accepted: Map<string, RelationshipNode>,
	graph: RelationshipGraph,
): boolean {
	for (const [acceptedId, acceptedNode] of accepted.entries()) {
		if (graph.excludes.hasEdge(acceptedId, id)) {
			const loserId = chooseConflictLoser(acceptedId, acceptedNode, id, node);
			if (loserId === id) {
				return true;
			}
		}

		if (graph.excludes.hasEdge(id, acceptedId)) {
			const loserId = chooseConflictLoser(id, node, acceptedId, acceptedNode);
			if (loserId === id) {
				return true;
			}
		}
	}

	return false;
}

/** Remove conflict losers until the current accepted set has no remaining directed exclusion conflict. */
function applyExclusions(
	accepted: Map<string, RelationshipNode>,
	graph: RelationshipGraph,
): boolean {
	let changed = false;
	let localChange = true;

	while (localChange) {
		localChange = false;

		for (const [sourceId, sourceNode] of Array.from(accepted.entries())) {
			for (const excludedId of relationshipTargets(graph.excludes, sourceId, graph.registryOrderById)) {
				const excludedNode = accepted.get(excludedId);
				if (!excludedNode) {
					continue;
				}

				const loserId = chooseConflictLoser(sourceId, sourceNode, excludedId, excludedNode);
				accepted.delete(loserId);
				changed = true;
				localChange = true;

				if (loserId === sourceId) {
					break;
				}
			}
		}
	}

	return changed;
}

/** Prefer direct detections, then higher confidence, then earlier registry position. */
function chooseConflictLoser(
	sourceId: string,
	sourceNode: RelationshipNode,
	excludedId: string,
	excludedNode: RelationshipNode,
): string {
	if (sourceNode.inferred !== excludedNode.inferred) {
		return sourceNode.inferred ? sourceId : excludedId;
	}

	const confidenceDifference =
		sourceNode.result.confidence.value - excludedNode.result.confidence.value;
	if (confidenceDifference !== 0) {
		return confidenceDifference > 0 ? excludedId : sourceId;
	}

	return sourceNode.registryOrder <= excludedNode.registryOrder ? excludedId : sourceId;
}

/** Create an explanation-bearing inferred result with the fixed 55-point relationship confidence. */
function createImpliedResult(
	definition: TechnologyDefinition,
	sourceDefinition: TechnologyDefinition,
): DetectionResult {
	return detectionCandidateToResult(
		createRelationshipDetectionCandidate(
			definition,
			sourceDefinition,
			toConfidenceScore(IMPLIED_CONFIDENCE),
		),
	);
}
