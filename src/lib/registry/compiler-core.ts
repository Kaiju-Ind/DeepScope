import { buildCollectionPlan, type CollectionPlan } from '../collectors/planning';
import { createObservationMatcherIndex, type ObservationMatcherIndex } from '../detection/observation-matcher-index';
import {
	createCompiledDetectionRegistry,
	type CompiledDetectionRegistry,
	type RegistryRelationshipEdge,
} from '../detection/registry-graph';
import type { DetectionRelationshipKind, DetectionRule, TechnologyDefinition } from '../detection/types';
import { REGISTRY_SOURCE_SCHEMA_VERSION, type RegistrySourceSchemaVersion } from './source-schema-version';
import type { RegistryDiagnostic } from './diagnostics';
import { createRegistryDiagnostic } from './diagnostics';

/** Current compiler artifact schema version. */
export const REGISTRY_COMPILER_ARTIFACT_VERSION = 1;

/** Literal compiler artifact version used by compatibility tests. */
export type RegistryCompilerArtifactVersion = typeof REGISTRY_COMPILER_ARTIFACT_VERSION;

/** Source kind used while the registry still comes from TypeScript modules. */
export const REGISTRY_SOURCE_KINDS = ['typescript-definition'] as const;

/** Source kind recorded for every source-map entry. */
export type RegistrySourceKind = typeof REGISTRY_SOURCE_KINDS[number];

/** Stable artifact section names used by source-map entries. */
export type RegistryArtifactSection = 'technology' | 'rule' | 'relationship';

/**
 * One source-map entry connecting compiled output back to registry source.
 *
 * This is not a JavaScript source map. It is registry provenance: when a
 * compiled rule, relationship, or technology produces a diagnostic or replay
 * explanation, this entry tells maintainers which source definition owns it.
 */
export interface RegistrySourceMapEntry {
	/** Stable identifier such as `technology:react` or `rule:react:0`. */
	readonly artifactId: string;
	/** Artifact section that owns the compiled item. */
	readonly section: RegistryArtifactSection;
	/** Source format that produced the compiled item. */
	readonly sourceKind: RegistrySourceKind;
	/** Logical source locator until a file-backed loader can add path and line data. */
	readonly sourceLocator: string;
	/** Technology id that owns the compiled item. */
	readonly technologyId: string;
	/** Rule index for rule source-map entries. */
	readonly ruleIndex?: number;
	/** Relationship kind for relationship source-map entries. */
	readonly relationshipKind?: DetectionRelationshipKind;
	/** Relationship target for relationship source-map entries. */
	readonly relationshipTarget?: string;
}

/** Source-map table keyed by stable artifact id. */
export type RegistrySourceMap = Readonly<Record<string, RegistrySourceMapEntry>>;

/** Lightweight technology metadata extracted for tools and diagnostics. */
export interface CompiledRegistryTechnologyMetadata {
	/** Technology id used by rules, relationships, and final detections. */
	readonly id: string;
	/** Display name from the source definition. */
	readonly name: string;
	/** Category ids in detector order. */
	readonly categories: readonly string[];
	/** Number of detection rules owned by this technology. */
	readonly ruleCount: number;
	/** Registry order preserved for result sorting and tie-break compatibility. */
	readonly order: number;
}

/** Counts of detection rules by rule kind. */
export type CompiledRegistryPatternTableSummary = Readonly<Record<string, number>>;

/**
 * Compiler artifact consumed by runtime and build-time checks.
 *
 * The artifact deliberately keeps the ordered technology definitions so result
 * sorting, rule metadata lookup, optimized indexes, and graph structures all
 * come from one compiled registry product.
 */
export interface CompiledTechnologyRegistryArtifact {
	/** Compiler output schema version. */
	readonly artifactVersion: RegistryCompilerArtifactVersion;
	/** Source schema version validated before artifact generation. */
	readonly sourceSchemaVersion: RegistrySourceSchemaVersion;
	/** Ordered technology definitions preserved for result sorting and rule metadata lookup. */
	readonly technologies: readonly TechnologyDefinition[];
	/** Metadata table that can be inspected without walking full rule objects. */
	readonly technologyMetadata: readonly CompiledRegistryTechnologyMetadata[];
	/** Pattern-rule counts by kind for diagnostics and benchmark setup. */
	readonly patternTables: CompiledRegistryPatternTableSummary;
	/** Relationship graph used by candidate refinement. */
	readonly relationshipGraph: CompiledDetectionRegistry;
	/** Indexed matcher routes used by the event pipeline. */
	readonly matcherIndex: ObservationMatcherIndex;
	/** Extension collection needs derived from the active registry. */
	readonly collectionPlan: CollectionPlan;
	/** Provenance table from compiled items back to source definitions. */
	readonly sourceMap: RegistrySourceMap;
	/** Errors and warnings produced during validation and compiler-only checks. */
	readonly diagnostics: readonly RegistryDiagnostic[];
}

/** Input accepted by the registry compiler while TypeScript remains the source. */
export interface CompileTechnologyRegistryInput {
	/** Ordered technology definitions from the bundled registry provider. */
	readonly technologies: readonly TechnologyDefinition[];
	/** Source kind to record in source-map entries. */
	readonly sourceKind?: RegistrySourceKind;
}

/**
 * Compile already-validated technology definitions into reusable runtime artifacts.
 *
 * Packaged extension assets are generated during the build, so runtime callers do
 * not need to import the Zod-backed source validator before rebuilding matcher
 * indexes from local JSON shards. Build and test callers that need schema
 * validation should use `compileTechnologyRegistry` from `./compiler.ts`.
 */
export function compileValidatedTechnologyRegistry(
	input: CompileTechnologyRegistryInput & { readonly diagnostics?: readonly RegistryDiagnostic[] },
): CompiledTechnologyRegistryArtifact {
	const sourceKind = input.sourceKind ?? 'typescript-definition';
	const technologies = input.technologies;
	const relationshipGraph = createCompiledDetectionRegistry(technologies);
	const sourceMap = createRegistrySourceMap({ technologies, relationshipEdges: relationshipGraph.relationshipEdges, sourceKind });
	const diagnostics = [
		...(input.diagnostics ?? []),
		...collectDuplicateTechnologyDiagnostics(technologies),
		...collectRuleDiagnostics(technologies),
		...collectRelationshipDiagnostics(technologies),
	];

	return {
		artifactVersion: REGISTRY_COMPILER_ARTIFACT_VERSION,
		sourceSchemaVersion: REGISTRY_SOURCE_SCHEMA_VERSION,
		technologies,
		technologyMetadata: createTechnologyMetadata(technologies),
		patternTables: createPatternTableSummary(technologies),
		relationshipGraph,
		matcherIndex: createObservationMatcherIndex(technologies),
		collectionPlan: buildCollectionPlan(technologies),
		sourceMap,
		diagnostics,
	};
}

/** Create a structurally valid artifact when schema validation blocks compilation. */
export function createEmptyRegistryArtifact(input: {
	readonly diagnostics: readonly RegistryDiagnostic[];
	readonly sourceKind?: RegistrySourceKind;
}): CompiledTechnologyRegistryArtifact {
	return createEmptyArtifact({ diagnostics: input.diagnostics, sourceKind: input.sourceKind ?? 'typescript-definition' });
}

function createEmptyArtifact(input: {
	readonly diagnostics: readonly RegistryDiagnostic[];
	readonly sourceKind: RegistrySourceKind;
}): CompiledTechnologyRegistryArtifact {
	return {
		artifactVersion: REGISTRY_COMPILER_ARTIFACT_VERSION,
		sourceSchemaVersion: REGISTRY_SOURCE_SCHEMA_VERSION,
		technologies: [],
		technologyMetadata: [],
		patternTables: Object.freeze({}),
		relationshipGraph: createCompiledDetectionRegistry([]),
		matcherIndex: createObservationMatcherIndex([]),
		collectionPlan: buildCollectionPlan([]),
		sourceMap: Object.freeze({}),
		diagnostics: input.diagnostics,
	};
}

function createTechnologyMetadata(
	technologies: readonly TechnologyDefinition[],
): readonly CompiledRegistryTechnologyMetadata[] {
	return technologies.map((technology, order) => ({
		id: technology.id,
		name: technology.name,
		categories: technology.categories,
		ruleCount: technology.rules.length,
		order,
	}));
}

function createPatternTableSummary(
	technologies: readonly TechnologyDefinition[],
): CompiledRegistryPatternTableSummary {
	const counts: Record<string, number> = Object.create(null) as Record<string, number>;

	for (const technology of technologies) {
		for (const rule of technology.rules) {
			counts[rule.kind] = (counts[rule.kind] ?? 0) + 1;
		}
	}

	return Object.freeze(counts);
}

function createRegistrySourceMap(input: {
	readonly technologies: readonly TechnologyDefinition[];
	readonly relationshipEdges: readonly RegistryRelationshipEdge[];
	readonly sourceKind: RegistrySourceKind;
}): RegistrySourceMap {
	const entries: Record<string, RegistrySourceMapEntry> = Object.create(null) as Record<string, RegistrySourceMapEntry>;

	for (const technology of input.technologies) {
		entries[technologyArtifactId(technology.id)] = {
			artifactId: technologyArtifactId(technology.id),
			section: 'technology',
			sourceKind: input.sourceKind,
			sourceLocator: `technologies.${technology.id}`,
			technologyId: technology.id,
		};

		technology.rules.forEach((_rule, ruleIndex) => {
			const artifactId = ruleArtifactId(technology.id, ruleIndex);
			entries[artifactId] = {
				artifactId,
				section: 'rule',
				sourceKind: input.sourceKind,
				sourceLocator: `technologies.${technology.id}.rules.${ruleIndex}`,
				technologyId: technology.id,
				ruleIndex,
			};
		});
	}

	for (const edge of input.relationshipEdges) {
		const artifactId = relationshipArtifactId(edge.kind, edge.sourceId, edge.targetId);
		entries[artifactId] = {
			artifactId,
			section: 'relationship',
			sourceKind: input.sourceKind,
			sourceLocator: `technologies.${edge.sourceId}.relationships.${edge.kind}.${edge.targetId}`,
			technologyId: edge.sourceId,
			relationshipKind: edge.kind,
			relationshipTarget: edge.targetId,
		};
	}

	return Object.freeze(entries);
}

function collectDuplicateTechnologyDiagnostics(
	technologies: readonly TechnologyDefinition[],
): RegistryDiagnostic[] {
	const diagnostics: RegistryDiagnostic[] = [];
	const seen = new Set<string>();

	technologies.forEach((technology, index) => {
		if (!seen.has(technology.id)) {
			seen.add(technology.id);
			return;
		}

		diagnostics.push(createRegistryDiagnostic({
			severity: 'error',
			code: 'technology.duplicate_id',
			message: `Duplicate technology id "${technology.id}".`,
			path: ['technologies', String(index), 'id'],
			technologyId: technology.id,
		}));
	});

	return diagnostics;
}

function collectRuleDiagnostics(technologies: readonly TechnologyDefinition[]): RegistryDiagnostic[] {
	const diagnostics: RegistryDiagnostic[] = [];

	for (const technology of technologies) {
		const seenRuleIds = new Set<string>();
		technology.rules.forEach((rule, ruleIndex) => {
			if (rule.id) {
				if (seenRuleIds.has(rule.id)) {
					diagnostics.push(createRegistryDiagnostic({
						severity: 'warning',
						code: 'rule.duplicate_id',
						message: `Duplicate rule id "${rule.id}" in technology "${technology.id}".`,
						path: ['technologies', technology.id, 'rules', String(ruleIndex), 'id'],
						technologyId: technology.id,
						ruleIndex,
					}));
				}
				seenRuleIds.add(rule.id);
			}

			const unsafePatternDiagnostic = createUnsafePatternDiagnostic(technology.id, rule, ruleIndex);
			if (unsafePatternDiagnostic) {
				diagnostics.push(unsafePatternDiagnostic);
			}
		});
	}

	return diagnostics;
}

function createUnsafePatternDiagnostic(
	technologyId: string,
	rule: DetectionRule,
	ruleIndex: number,
): RegistryDiagnostic | undefined {
	const pattern = 'pattern' in rule ? rule.pattern : undefined;
	if (!pattern || !looksCatastrophic(pattern)) {
		return undefined;
	}

	return createRegistryDiagnostic({
		severity: 'warning',
		code: 'rule.unsafe_pattern',
		message: `Rule pattern for "${technologyId}" contains nested wildcards that may be slow on long inputs.`,
		path: ['technologies', technologyId, 'rules', String(ruleIndex), 'pattern'],
		technologyId,
		ruleIndex,
	});
}

function collectRelationshipDiagnostics(
	technologies: readonly TechnologyDefinition[],
): RegistryDiagnostic[] {
	const technologyIds = new Set(technologies.map((technology) => technology.id));
	const diagnostics: RegistryDiagnostic[] = [];

	for (const technology of technologies) {
		for (const kind of ['implies', 'requires', 'excludes'] as const) {
			for (const targetId of technology[kind] ?? []) {
				if (!technologyIds.has(targetId)) {
					diagnostics.push(unknownRelationshipDiagnostic(technology.id, kind, targetId));
				}
			}
		}

		for (const relationship of technology.relationships ?? []) {
			if (!technologyIds.has(relationship.target)) {
				diagnostics.push(unknownRelationshipDiagnostic(technology.id, relationship.kind, relationship.target));
			}
		}
	}

	return diagnostics;
}

function unknownRelationshipDiagnostic(
	technologyId: string,
	kind: DetectionRelationshipKind,
	targetId: string,
): RegistryDiagnostic {
	return createRegistryDiagnostic({
		severity: 'error',
		code: 'relationship.unknown_target',
		message: `Technology "${technologyId}" ${kind} unknown technology "${targetId}".`,
		path: ['technologies', technologyId, kind, targetId],
		technologyId,
	});
}

function looksCatastrophic(pattern: RegExp): boolean {
	return /\([^)]*[+*][^)]*\)[+*]/.test(pattern.source);
}

function technologyArtifactId(technologyId: string): string {
	return `technology:${technologyId}`;
}

function ruleArtifactId(technologyId: string, ruleIndex: number): string {
	return `rule:${technologyId}:${ruleIndex}`;
}

function relationshipArtifactId(kind: DetectionRelationshipKind, sourceId: string, targetId: string): string {
	return `relationship:${kind}:${sourceId}:${targetId}`;
}
