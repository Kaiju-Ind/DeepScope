import { compileValidatedTechnologyRegistry, type CompiledTechnologyRegistryArtifact } from "../compiler/core.ts";
import { compileMatcherRegistry, type CompiledMatcherRegistryArtifact } from "../artifacts/matcher.ts";
import { createObservationKindTechnologyRegistry } from "../artifacts/packaged.ts";
import { createRuntimeTechnologyRegistryArtifact, type RuntimeTechnologyRegistryArtifact } from "../artifacts/runtime.ts";
import type { TechnologyDefinition } from "@deepscope/registry/types";
import type { NormalizedObservationKind } from "../observations/index.ts";

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

	/** Compile the provider's borrowed registry at most once and retain the artifact for later consumers. */
	const getCompiled = (): CompiledTechnologyRegistryArtifact => {
		compiledRegistry ??= compileValidatedTechnologyRegistry({
			technologies: registry,
			sourceKind: 'typescript-definition',
		});
		return compiledRegistry;
	};

	return {
		/** Return the provider-owned definition view without cloning or compiling it. */
		async listTechnologies() {
			return registry;
		},
		/** Use the complete in-memory registry for bootstrap; this provider has no separate bootstrap shard. */
		async listBootstrapTechnologies() {
			return registry;
		},
		/** Resolve the lazily cached full artifact through the provider's single compiler owner. */
		async getCompiledRegistry() {
			return getCompiled();
		},
		/** Derive and retain the runtime projection once from the full compiled artifact. */
		async getRuntimeRegistry() {
			runtimeRegistry ??= createRuntimeTechnologyRegistryArtifact(getCompiled());
			return runtimeRegistry;
		},
		/** Reuse the full artifact because this in-memory provider has no reduced bootstrap artifact. */
		async getCompiledBootstrapRegistry() {
			return getCompiled();
		},
		/** Compile each requested observation-kind shard once and retain it in this provider instance. */
		async getCompiledObservationKindRegistry(kind) {
			let artifact = matcherByKind.get(kind);
			if (!artifact) {
				artifact = compileMatcherRegistry(createObservationKindTechnologyRegistry(registry, kind));
				matcherByKind.set(kind, artifact);
			}
			return artifact;
		},
		/** Report shard presence/count with an unbounded budget; this provider does not measure retained byte sizes. */
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
