import { compileValidatedTechnologyRegistry, type CompiledTechnologyRegistryArtifact } from '../registry/compiler-core';
import { compileMatcherRegistry, type CompiledMatcherRegistryArtifact } from '../registry/matcher-artifact';
import { createObservationKindTechnologyRegistry } from '../registry/packaged-artifacts';
import { createRuntimeTechnologyRegistryArtifact, type RuntimeTechnologyRegistryArtifact } from '../registry/runtime-artifact';
import { createPackagedTechnologyRegistryProvider } from '../registry/packaged-provider';
import type { TechnologyDefinition } from './types';
import type { NormalizedObservationKind } from '../observations';

/**
 * Read-only source of technology definitions for detector calls and collection planning.
 *
 * Registry access is asynchronous because the production extension loads the
 * large generated registry from packaged JSON only when analysis needs it. Tests
 * and small tools can still use the static provider to avoid browser fetches.
 */
export interface TechnologyRegistryProvider {
	/** Return the enrichment technology definitions in detector order. */
	listTechnologies(): Promise<readonly TechnologyDefinition[]>;
	/** Return the cheap first-pass technology definitions in detector order. */
	listBootstrapTechnologies(): Promise<readonly TechnologyDefinition[]>;
	/**
	 * Return the compiled artifact for the active registry.
	 *
	 * The provider owns caching so callers do not rebuild matcher indexes, graphs,
	 * and collection plans during every visible-tab analysis.
	 */
	getCompiledRegistry(): Promise<CompiledTechnologyRegistryArtifact>;
	/** Return the rule-free product used by background collection and finalization. */
	getRuntimeRegistry(): Promise<RuntimeTechnologyRegistryArtifact>;
	/** Return the compiled bootstrap artifact kept for compatibility and benchmark baselines. */
	getCompiledBootstrapRegistry(): Promise<CompiledTechnologyRegistryArtifact>;
	/** Return a compiled matcher shard for one normalized observation kind. */
	getCompiledObservationKindRegistry(kind: NormalizedObservationKind): Promise<CompiledMatcherRegistryArtifact>;
}

/**
 * Build a provider around an existing technology list.
 *
 * Tests and future build steps can use this to pass a tiny registry without
 * reading packaged assets or importing the generated bundled rule tree.
 */
export function createStaticTechnologyRegistryProvider(
	registry: readonly TechnologyDefinition[],
): TechnologyRegistryProvider {
	let compiledRegistry: CompiledTechnologyRegistryArtifact | undefined;
	let runtimeRegistry: RuntimeTechnologyRegistryArtifact | undefined;

	return {
		async listTechnologies() {
			return registry;
		},

		async listBootstrapTechnologies() {
			return registry;
		},

		async getCompiledRegistry() {
			compiledRegistry ??= compileValidatedTechnologyRegistry({
				technologies: registry,
				sourceKind: 'typescript-definition',
			});
			return compiledRegistry;
		},

		async getRuntimeRegistry() {
			compiledRegistry ??= compileValidatedTechnologyRegistry({
				technologies: registry,
				sourceKind: 'typescript-definition',
			});
			runtimeRegistry ??= createRuntimeTechnologyRegistryArtifact(compiledRegistry);
			return runtimeRegistry;
		},

		async getCompiledBootstrapRegistry() {
			compiledRegistry ??= compileValidatedTechnologyRegistry({
				technologies: registry,
				sourceKind: 'typescript-definition',
			});
			return compiledRegistry;
		},

		async getCompiledObservationKindRegistry(kind) {
			return compileMatcherRegistry(createObservationKindTechnologyRegistry(registry, kind));
		},
	};
}

/** Provider backed by WXT-generated registry JSON assets. */
export const bundledTechnologyRegistryProvider = createPackagedTechnologyRegistryProvider();
