import type { DetectionRelationship, TechnologyDefinition } from './types';

/** Relationship kinds that affect detector graph reasoning. */
export type RegistryRelationshipKind = DetectionRelationship['kind'];

/**
 * A normalized relationship edge from one technology to another.
 *
 * Rule files can express the same edge through shorthand arrays such as
 * `implies` or through richer `relationships` objects. The compiled registry
 * stores both forms as the same edge shape so graph logic does not need to know
 * which source format produced the edge.
 */
export type RegistryRelationshipEdge = {
	/** Relationship behavior applied during graph resolution. */
	kind: RegistryRelationshipKind;
	/** Technology that owns the relationship. */
	sourceId: string;
	/** Technology affected by the relationship. */
	targetId: string;
};

/**
 * Registry shape consumed by the detector after rule files are loaded.
 *
 * The current backing source is still the TypeScript rule tree. This compiled
 * shape gives the detector the same ordered technologies plus lookup maps and
 * normalized relationship edges that a future registry compiler can emit.
 */
export type CompiledDetectionRegistry = {
	/** Technology definitions in detector order. This order is part of output compatibility. */
	technologies: TechnologyDefinition[];
	/** Fast lookup by technology id for relationship expansion. */
	definitionsById: Map<string, TechnologyDefinition>;
	/** Stable registry order used for result sorting and equal-confidence conflicts. */
	registryOrderById: Map<string, number>;
	/** Shorthand and explicit relationship declarations converted into one edge list. */
	relationshipEdges: RegistryRelationshipEdge[];
};

/**
 * Compile loaded technology definitions into the registry graph shape used by detection.
 *
 * This does not validate or transform rule patterns yet. It preserves today\'s order
 * and relationship behavior while giving later registry-compiler work a concrete
 * object to match before any runtime cutover.
 */
export function createCompiledDetectionRegistry(
	registry: readonly TechnologyDefinition[],
): CompiledDetectionRegistry {
	const technologies = [...registry];
	const definitionsById = new Map<string, TechnologyDefinition>();
	const registryOrderById = new Map<string, number>();

	technologies.forEach((definition, index) => {
		definitionsById.set(definition.id, definition);
		registryOrderById.set(definition.id, index);
	});

	return {
		technologies,
		definitionsById,
		registryOrderById,
		relationshipEdges: collectRelationshipEdges(technologies),
	};
}

/**
 * Return relationship targets in detector order.
 *
 * Relationship resolution uses this order for deterministic expansion and pruning.
 * Unknown targets sort after known technologies, matching the old fallback behavior.
 */
export function listRegistryRelationshipTargets(
	compiled: CompiledDetectionRegistry,
	kind: RegistryRelationshipKind,
	sourceId: string,
): string[] {
	return compiled.relationshipEdges
		.filter((edge) => edge.kind === kind && edge.sourceId === sourceId)
		.map((edge) => edge.targetId)
		.sort((a, b) => compareRegistryOrder(compiled.registryOrderById, a, b));
}

function collectRelationshipEdges(
	registry: readonly TechnologyDefinition[],
): RegistryRelationshipEdge[] {
	const edges: RegistryRelationshipEdge[] = [];
	const seen = new Set<string>();

	for (const definition of registry) {
		addRelationshipTargets(edges, seen, 'implies', definition.id, definition.implies ?? []);
		addRelationshipTargets(edges, seen, 'requires', definition.id, definition.requires ?? []);
		addRelationshipTargets(edges, seen, 'excludes', definition.id, definition.excludes ?? []);

		for (const relationship of definition.relationships ?? []) {
			addRelationshipTargets(edges, seen, relationship.kind, definition.id, [relationship.target]);
		}
	}

	return edges;
}

function addRelationshipTargets(
	edges: RegistryRelationshipEdge[],
	seen: Set<string>,
	kind: RegistryRelationshipKind,
	sourceId: string,
	targetIds: readonly string[],
): void {
	for (const targetId of targetIds) {
		const key = `${kind}:${sourceId}:${targetId}`;
		if (seen.has(key)) {
			continue;
		}

		seen.add(key);
		edges.push({ kind, sourceId, targetId });
	}
}

function compareRegistryOrder(
	registryOrderById: Map<string, number>,
	a: string,
	b: string,
): number {
	return (
		(registryOrderById.get(a) ?? Number.MAX_SAFE_INTEGER) -
			(registryOrderById.get(b) ?? Number.MAX_SAFE_INTEGER) ||
		a.localeCompare(b)
	);
}
