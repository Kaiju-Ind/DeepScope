import { browser } from 'wxt/browser';

import { compileValidatedTechnologyRegistry, type CompiledTechnologyRegistryArtifact } from "@deepscope/detection/compiler/core";
import { compileMatcherRegistry } from "@deepscope/detection/artifacts/matcher";
import { PACKAGED_REGISTRY_ASSET_PATHS, createObservationKindTechnologyRegistry, hydratePackagedTechnologyRegistry, isPackagedTechnologyRegistryAsset, type PackagedTechnologyRegistryAsset } from "@deepscope/detection/artifacts/packaged";
import { createRuntimeTechnologyRegistryArtifact } from "@deepscope/detection/artifacts/runtime";
import type { BuildTechnologyRegistryProvider } from "@deepscope/detection/provider";
import type { TechnologyDefinition } from "@deepscope/registry/types";
import type { RegistryAssetFetch } from "./assets.ts";

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

	/** Share each tier's in-flight asset load and clear a failed promise so a later request can retry. */
	const load = (cache: RegistryTierCache): Promise<readonly TechnologyDefinition[]> => {
		if (!cache.registry) {
			cache.registry = loadPackagedRegistry(cache.kind, resolveUrl, fetchAsset).catch((error) => {
				cache.registry = undefined;
				throw error;
			});
		}
		return cache.registry;
	};
	/** Compile each loaded tier once per provider instance and evict a failed compilation promise. */
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
		/** Return the enrichment catalog through this provider's shared load cache. */
		listTechnologies: () => load(enrichment),
		/** Return the bootstrap catalog without loading the larger enrichment tier. */
		listBootstrapTechnologies: () => load(bootstrap),
		/** Return the cached enrichment compilation; validation and retry policy remain with the compile owner. */
		getCompiledRegistry: () => compile(enrichment),
		/** Retain the runtime projection after compiling enrichment data for this provider instance. */
		async getRuntimeRegistry() {
			runtime ??= createRuntimeTechnologyRegistryArtifact(await compile(enrichment));
			return runtime;
		},
		/** Return the bootstrap compilation through the same per-tier cache and failure policy. */
		getCompiledBootstrapRegistry: () => compile(bootstrap),
		/** Compile and retain only the rules for the requested observation kind after loading enrichment data. */
		async getCompiledObservationKindRegistry(kind) {
			let artifact = matcherByKind.get(kind);
			if (!artifact) {
				artifact = compileMatcherRegistry(createObservationKindTechnologyRegistry(await load(enrichment), kind));
				matcherByKind.set(kind, artifact);
			}
			return artifact;
		},
		/** Report kind presence for this build-time cache, which does not measure or enforce a byte budget. */
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
