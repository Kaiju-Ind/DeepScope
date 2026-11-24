import { compileValidatedTechnologyRegistry, type CompiledTechnologyRegistryArtifact } from '../registry/compiler-core';
import { compileMatcherRegistry, type CompiledMatcherRegistryArtifact } from '../registry/matcher-artifact';
import { createObservationKindTechnologyRegistry } from '../registry/packaged-artifacts';
import { createRuntimeTechnologyRegistryArtifact, type RuntimeTechnologyRegistryArtifact } from '../registry/runtime-artifact';
import type { TechnologyDefinition } from './types';
import type { NormalizedObservationKind } from '../observations';

/** Rule-free registry capability allowed in the background service worker. */
export interface RuntimeTechnologyRegistryProvider {
	/** Return collection planning, relationships, and lightweight technology profiles without matcher rules. */
	getRuntimeRegistry(): Promise<RuntimeTechnologyRegistryArtifact>;
}

/** One matcher worker's narrow shard-loading capability. */
export interface MatcherTechnologyRegistryProvider {
	/** Return the build-routed matcher shard for one normalized observation kind. */
	getCompiledObservationKindRegistry(kind: NormalizedObservationKind): Promise<CompiledMatcherRegistryArtifact>;
	/** Report whether a kind is warm and the current weighted cache cost without exposing cache internals. */
	getCacheState(kind: NormalizedObservationKind): MatcherRegistryCacheState;
}

/** Lightweight cache telemetry used for performance diagnostics, never matching semantics. */
export interface MatcherRegistryCacheState {
	readonly cached: boolean;
	/** Total encoded bytes retained by all completed worker-local shards. */
	readonly retainedBytes: number;
	readonly retainedShardCount: number;
	readonly budgetBytes: number;
	/** Encoded bytes retained by the requested shard when it is loaded. */
	readonly shardRetainedBytes: number;
	readonly shardPatternCount: number;
	readonly shardRuleCount: number;
}

/**
 * Complete registry capability reserved for build tooling, tests, and benchmarks.
 *
 * Browser production modules intentionally accept the focused runtime or matcher
 * interfaces above. That makes it impossible for the background to regain an API
 * that can materialize the complete executable registry by accident.
 */
export interface BuildTechnologyRegistryProvider extends RuntimeTechnologyRegistryProvider, MatcherTechnologyRegistryProvider {
	readonly listTechnologies: () => Promise<readonly TechnologyDefinition[]>;
	readonly listBootstrapTechnologies: () => Promise<readonly TechnologyDefinition[]>;
	readonly getCompiledRegistry: () => Promise<CompiledTechnologyRegistryArtifact>;
	readonly getCompiledBootstrapRegistry: () => Promise<CompiledTechnologyRegistryArtifact>;
}

/** Build a complete provider around an in-memory registry for tests and build-only tools. */
export function createStaticTechnologyRegistryProvider(
	registry: readonly TechnologyDefinition[],
): BuildTechnologyRegistryProvider {
	let compiledRegistry: CompiledTechnologyRegistryArtifact | undefined;
	let runtimeRegistry: RuntimeTechnologyRegistryArtifact | undefined;
	const matcherByKind = new Map<NormalizedObservationKind, CompiledMatcherRegistryArtifact>();

	const getCompiled = (): CompiledTechnologyRegistryArtifact => {
		compiledRegistry ??= compileValidatedTechnologyRegistry({
			technologies: registry,
			sourceKind: 'typescript-definition',
		});
		return compiledRegistry;
	};

	return {
		async listTechnologies() {
			return registry;
		},
		async listBootstrapTechnologies() {
			return registry;
		},
		async getCompiledRegistry() {
			return getCompiled();
		},
		async getRuntimeRegistry() {
			runtimeRegistry ??= createRuntimeTechnologyRegistryArtifact(getCompiled());
			return runtimeRegistry;
		},
		async getCompiledBootstrapRegistry() {
			return getCompiled();
		},
		async getCompiledObservationKindRegistry(kind) {
			let artifact = matcherByKind.get(kind);
			if (!artifact) {
				artifact = compileMatcherRegistry(createObservationKindTechnologyRegistry(registry, kind));
				matcherByKind.set(kind, artifact);
			}
			return artifact;
		},
		getCacheState(kind) {
			return {
				cached: matcherByKind.has(kind),
				retainedBytes: 0,
				retainedShardCount: matcherByKind.size,
				budgetBytes: Number.POSITIVE_INFINITY,
				shardRetainedBytes: 0,
				shardPatternCount: 0,
				shardRuleCount: 0,
			};
		},
	};
}
