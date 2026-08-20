import type { CollectionPlan } from '../collectors/planning';
import {
	createCompiledDetectionGraph,
	type CompiledDetectionGraph,
	type RegistryRelationshipEdge,
} from '../detection/registry-graph';
import type { TechnologyProfileType } from '../detection/types';
import type {
	CompiledRegistryPatternTableSummary,
	CompiledTechnologyRegistryArtifact,
} from './compiler-core';

/** Rule-free registry product retained by the background service worker. */
export interface RuntimeTechnologyRegistryArtifact {
	/** Lightweight ordered technology metadata used for candidates and final cards. */
	readonly technologies: readonly TechnologyProfileType[];
	/** Build-time rule-kind counts used by diagnostics without retaining rules. */
	readonly patternTables: CompiledRegistryPatternTableSummary;
	/** Relationship graph rebuilt from lightweight profiles and normalized edges. */
	readonly relationshipGraph: CompiledDetectionGraph;
	/** Collector work compiled during the extension build. */
	readonly collectionPlan: CollectionPlan;
	/** Number of compiler diagnostics produced while generating this artifact. */
	readonly diagnosticCount: number;
}

/** Serialized rule-free runtime payload emitted by the registry build module. */
export interface PackagedRuntimeTechnologyRegistryData {
	readonly technologies: readonly TechnologyProfileType[];
	readonly patternTables: CompiledRegistryPatternTableSummary;
	readonly relationshipEdges: readonly RegistryRelationshipEdge[];
	readonly collectionPlan: CollectionPlan;
	readonly diagnosticCount: number;
}

/** Project a full build-time compiler artifact into the background runtime product. */
export function createRuntimeTechnologyRegistryArtifact(
	artifact: Pick<CompiledTechnologyRegistryArtifact,
		'technologies' | 'patternTables' | 'relationshipGraph' | 'collectionPlan' | 'diagnostics'>,
): RuntimeTechnologyRegistryArtifact {
	return createRuntimeTechnologyRegistryFromData({
		technologies: artifact.technologies.map(createTechnologyProfile),
		patternTables: artifact.patternTables,
		relationshipEdges: artifact.relationshipGraph.relationshipEdges,
		collectionPlan: artifact.collectionPlan,
		diagnosticCount: artifact.diagnostics.length,
	});
}

/** Hydrate maps for a packaged background runtime payload without loading detection rules. */
export function createRuntimeTechnologyRegistryFromData(
	data: PackagedRuntimeTechnologyRegistryData,
): RuntimeTechnologyRegistryArtifact {
	const technologies = data.technologies.map(createTechnologyProfile);

	return {
		technologies,
		patternTables: data.patternTables,
		relationshipGraph: createCompiledDetectionGraph(technologies, data.relationshipEdges),
		collectionPlan: data.collectionPlan,
		diagnosticCount: data.diagnosticCount,
	};
}

/** Strip executable rules and relationship declarations from one registry definition. */
function createTechnologyProfile(technology: TechnologyProfileType): TechnologyProfileType {
	return {
		id: technology.id,
		name: technology.name,
		website: technology.website,
		...(technology.description ? { description: technology.description } : {}),
		...(technology.icon ? { icon: technology.icon } : {}),
		categories: technology.categories,
	};
}
