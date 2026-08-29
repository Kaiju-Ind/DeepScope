import { browser } from 'wxt/browser';

import { compileValidatedTechnologyRegistry, type CompiledTechnologyRegistryArtifact } from './compiler-core';
import { compileMatcherRegistry } from './matcher-artifact';
import {
	PACKAGED_REGISTRY_ASSET_PATHS,
	createObservationKindTechnologyRegistry,
	hydratePackagedTechnologyRegistry,
	isPackagedTechnologyRegistryAsset,
	type PackagedTechnologyRegistryAsset,
} from './packaged-artifacts';
import { createRuntimeTechnologyRegistryArtifact } from './runtime-artifact';
import type { BuildTechnologyRegistryProvider } from '../detection/registry-provider';
import type { TechnologyDefinition } from '../detection/types';
import type { RegistryAssetFetch } from './asset-fetch';

/** Build/test-only input for complete packaged registry products that never ship to browser runtime code. */
export interface PackagedBuildTechnologyRegistryProviderInput {
	readonly resolveUrl?: (path: string) => string;
	readonly fetchAsset?: RegistryAssetFetch;
}

/** Cached complete registry tier used only by tests, benchmarks, and build tools. */
interface RegistryTierCache {
	readonly kind: PackagedTechnologyRegistryAsset['kind'];
	registry?: Promise<readonly TechnologyDefinition[]>;
	compiled?: Promise<CompiledTechnologyRegistryArtifact>;
}

/**
 * Load complete generated registry products for non-production tooling.
 *
 * Complete build products stay physically separate from the packaged runtime and
 * matcher providers so browser entry points cannot retain this compiler graph by
 * importing a broader convenience module.
 */
export function createPackagedBuildTechnologyRegistryProvider(
	input: PackagedBuildTechnologyRegistryProviderInput = {},
): BuildTechnologyRegistryProvider {
	const resolveUrl = input.resolveUrl ?? ((path) => browser.runtime.getURL(
		path as Parameters<typeof browser.runtime.getURL>[0],
	));
	const fetchAsset = input.fetchAsset ?? (async (url: string) => globalThis.fetch(url));
	const bootstrap: RegistryTierCache = { kind: 'bootstrap' };
	const enrichment: RegistryTierCache = { kind: 'enrichment' };
	let runtime: ReturnType<typeof createRuntimeTechnologyRegistryArtifact> | undefined;
	const matcherByKind = new Map<Parameters<BuildTechnologyRegistryProvider['getCompiledObservationKindRegistry']>[0], ReturnType<typeof compileMatcherRegistry>>();

	const load = (cache: RegistryTierCache): Promise<readonly TechnologyDefinition[]> => {
		if (!cache.registry) {
			cache.registry = loadPackagedRegistry(cache.kind, resolveUrl, fetchAsset).catch((error) => {
				cache.registry = undefined;
				throw error;
			});
		}
		return cache.registry;
	};
	const compile = (cache: RegistryTierCache): Promise<CompiledTechnologyRegistryArtifact> => {
		if (!cache.compiled) {
			cache.compiled = load(cache)
				.then((technologies) => compileValidatedTechnologyRegistry({ technologies, sourceKind: 'typescript-definition' }))
				.catch((error) => {
					cache.compiled = undefined;
					throw error;
				});
		}
		return cache.compiled;
	};

	return {
		listTechnologies: () => load(enrichment),
		listBootstrapTechnologies: () => load(bootstrap),
		getCompiledRegistry: () => compile(enrichment),
		async getRuntimeRegistry() {
			runtime ??= createRuntimeTechnologyRegistryArtifact(await compile(enrichment));
			return runtime;
		},
		getCompiledBootstrapRegistry: () => compile(bootstrap),
		async getCompiledObservationKindRegistry(kind) {
			let artifact = matcherByKind.get(kind);
			if (!artifact) {
				artifact = compileMatcherRegistry(createObservationKindTechnologyRegistry(await load(enrichment), kind));
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

/** Load one complete build-cache tier and reject stale schema generations. */
async function loadPackagedRegistry(
	kind: PackagedTechnologyRegistryAsset['kind'],
	resolveUrl: (path: string) => string,
	fetchAsset: RegistryAssetFetch,
): Promise<readonly TechnologyDefinition[]> {
	const url = resolveUrl(PACKAGED_REGISTRY_ASSET_PATHS[kind]);
	const response = await fetchAsset(url);
	if (!response.ok) throw new Error(`Unable to load packaged ${kind} registry asset from ${url}.`);
	const parsed = await response.json();
	if (!isPackagedTechnologyRegistryAsset(parsed, kind)) {
		throw new Error(`Packaged ${kind} registry asset did not match the expected schema.`);
	}
	return hydratePackagedTechnologyRegistry(parsed);
}
