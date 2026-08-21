import { browser } from 'wxt/browser';

import { compileValidatedTechnologyRegistry, type CompiledTechnologyRegistryArtifact } from './compiler-core';
import { compileMatcherRegistry, type CompiledMatcherRegistryArtifact } from './matcher-artifact';
import {
	PACKAGED_REGISTRY_ASSET_PATHS,
	getPackagedRegistryShardAssetPath,
	hydratePackagedTechnologyRegistry,
	hydratePackagedTechnologyRegistryShard,
	isPackagedRuntimeTechnologyRegistryAsset,
	isPackagedTechnologyRegistryAsset,
	isPackagedTechnologyRegistryShardAsset,
	normalizePackagedRegistryObservationKind,
	type PackagedRegistryObservationKind,
	type PackagedTechnologyRegistryAsset,
} from './packaged-artifacts';
import {
	createRuntimeTechnologyRegistryFromData,
	type RuntimeTechnologyRegistryArtifact,
} from './runtime-artifact';
import type { TechnologyRegistryProvider } from '../detection/registry-provider';
import type { MatcherTechnologyType, TechnologyDefinition } from '../detection/types';
import type { NormalizedObservationKind } from '../observations';

/** Fetch implementation used by tests and non-browser harnesses. */
export type RegistryAssetFetch = (url: string) => Promise<{ readonly ok: boolean; json(): Promise<unknown> }>;

/** Runtime hooks needed to load generated registry JSON from the extension package. */
export interface PackagedTechnologyRegistryProviderInput {
	/** Convert a packaged asset path into an extension URL. */
	readonly resolveUrl?: (path: string) => string;
	/** Fetch a generated JSON asset. */
	readonly fetchAsset?: RegistryAssetFetch;
	/** Maximum compiled observation-kind shards retained by this provider. Omit to retain every loaded shard. */
	readonly maxObservationKindShards?: number;
}

/** Registry asset tier that still contains complete technology definitions. */
type PackagedExecutableRegistryKind = PackagedTechnologyRegistryAsset['kind'];

/** Cached runtime state for one complete registry tier. */
interface PackagedRegistryTierCache {
	readonly kind: PackagedExecutableRegistryKind;
	registryPromise?: Promise<readonly TechnologyDefinition[]>;
	artifactPromise?: Promise<CompiledTechnologyRegistryArtifact>;
}

/** Cached worker-local state for one minimal matcher shard. */
interface PackagedMatcherShardCache {
	registryPromise?: Promise<readonly MatcherTechnologyType[]>;
	artifactPromise?: Promise<CompiledMatcherRegistryArtifact>;
}

/** Create the rule-free packaged provider used by the background service worker. */
export function createPackagedRuntimeTechnologyRegistryProvider(
	input: Pick<PackagedTechnologyRegistryProviderInput, 'resolveUrl' | 'fetchAsset'> = {},
): Pick<TechnologyRegistryProvider, 'getRuntimeRegistry'> {
	const resolveUrl = input.resolveUrl ?? ((path) => browser.runtime.getURL(
		path as Parameters<typeof browser.runtime.getURL>[0],
	));
	const fetchAsset = input.fetchAsset ?? fetchRegistryAsset;
	let runtimePromise: Promise<RuntimeTechnologyRegistryArtifact> | undefined;

	return {
		getRuntimeRegistry() {
			runtimePromise ??= loadPackagedRuntimeRegistry({ resolveUrl, fetchAsset });
			return runtimePromise;
		},
	};
}

/** Create the shard-only packaged provider used by one dedicated matcher worker. */
export function createPackagedMatcherTechnologyRegistryProvider(
	input: PackagedTechnologyRegistryProviderInput = {},
): Pick<TechnologyRegistryProvider, 'getCompiledObservationKindRegistry'> {
	const resolveUrl = input.resolveUrl ?? ((path) => browser.runtime.getURL(
		path as Parameters<typeof browser.runtime.getURL>[0],
	));
	const fetchAsset = input.fetchAsset ?? fetchRegistryAsset;
	const shards = new Map<PackagedRegistryObservationKind, PackagedMatcherShardCache>();
	const maxObservationKindShards = normalizeShardCacheLimit(input.maxObservationKindShards);

	return {
		getCompiledObservationKindRegistry(kind) {
			const observationKind = normalizePackagedRegistryObservationKind(kind);
			const existing = shards.get(observationKind);
			const cache = existing ?? {};
			if (existing) shards.delete(observationKind);
			shards.set(observationKind, cache);
			while (shards.size > maxObservationKindShards) {
				const leastRecentlyUsedKind = shards.keys().next().value as PackagedRegistryObservationKind | undefined;
				if (leastRecentlyUsedKind === undefined) break;
				shards.delete(leastRecentlyUsedKind);
			}

			cache.registryPromise ??= loadPackagedRegistryShard({ observationKind, resolveUrl, fetchAsset });
			cache.artifactPromise ??= (async () => compileMatcherRegistry(await cache.registryPromise!))();
			return cache.artifactPromise;
		},
	};
}

/**
 * Create a complete packaged provider for build tooling, compatibility tests, and benchmarks.
 *
 * Production background and matcher-worker entrypoints use the focused factories
 * above so they cannot accidentally acquire unrelated registry products.
 */
export function createPackagedTechnologyRegistryProvider(
	input: PackagedTechnologyRegistryProviderInput = {},
): TechnologyRegistryProvider {
	const resolveUrl = input.resolveUrl ?? ((path) => browser.runtime.getURL(
		path as Parameters<typeof browser.runtime.getURL>[0],
	));
	const fetchAsset = input.fetchAsset ?? fetchRegistryAsset;
	const bootstrap = createRegistryTierCache('bootstrap');
	const enrichment = createRegistryTierCache('enrichment');
	const runtime = createPackagedRuntimeTechnologyRegistryProvider({ resolveUrl, fetchAsset });
	const matcher = createPackagedMatcherTechnologyRegistryProvider({
		resolveUrl,
		fetchAsset,
		...(input.maxObservationKindShards !== undefined
			? { maxObservationKindShards: input.maxObservationKindShards }
			: {}),
	});

	const loadRegistry = (cache: PackagedRegistryTierCache) => {
		cache.registryPromise ??= loadPackagedRegistry({ kind: cache.kind, resolveUrl, fetchAsset });
		return cache.registryPromise;
	};
	const compileRegistry = (cache: PackagedRegistryTierCache) => {
		cache.artifactPromise ??= (async () => compileValidatedTechnologyRegistry({
			technologies: await loadRegistry(cache),
			sourceKind: 'typescript-definition',
		}))();
		return cache.artifactPromise;
	};

	return {
		listTechnologies: () => loadRegistry(enrichment),
		listBootstrapTechnologies: () => loadRegistry(bootstrap),
		getCompiledRegistry: () => compileRegistry(enrichment),
		getRuntimeRegistry: runtime.getRuntimeRegistry,
		getCompiledBootstrapRegistry: () => compileRegistry(bootstrap),
		getCompiledObservationKindRegistry: matcher.getCompiledObservationKindRegistry,
	};
}

/** Normalize an optional worker cache budget while keeping existing providers unbounded by default. */
function normalizeShardCacheLimit(value: number | undefined): number {
	if (value === undefined) return Number.POSITIVE_INFINITY;
	if (!Number.isFinite(value)) return Number.POSITIVE_INFINITY;
	return Math.max(1, Math.floor(value));
}

function createRegistryTierCache(kind: PackagedExecutableRegistryKind): PackagedRegistryTierCache {
	return { kind };
}

/** Preserve the native worker fetch receiver while allowing deterministic tests to inject a fake fetcher. */
async function fetchRegistryAsset(url: string): Promise<{ readonly ok: boolean; json(): Promise<unknown> }> {
	return globalThis.fetch(url);
}

async function loadPackagedRegistry(input: {
	readonly kind: PackagedExecutableRegistryKind;
	readonly resolveUrl: (path: string) => string;
	readonly fetchAsset: RegistryAssetFetch;
}): Promise<readonly TechnologyDefinition[]> {
	const url = input.resolveUrl(PACKAGED_REGISTRY_ASSET_PATHS[input.kind]);
	const response = await input.fetchAsset(url);
	if (!response.ok) throw new Error(`Unable to load packaged ${input.kind} registry asset from ${url}.`);

	const parsed = await response.json();
	if (!isPackagedTechnologyRegistryAsset(parsed, input.kind)) {
		throw new Error(`Packaged ${input.kind} registry asset did not match the expected schema.`);
	}
	return hydratePackagedTechnologyRegistry(parsed);
}

async function loadPackagedRuntimeRegistry(input: {
	readonly resolveUrl: (path: string) => string;
	readonly fetchAsset: RegistryAssetFetch;
}): Promise<RuntimeTechnologyRegistryArtifact> {
	const url = input.resolveUrl(PACKAGED_REGISTRY_ASSET_PATHS.runtime);
	const response = await input.fetchAsset(url);
	if (!response.ok) throw new Error(`Unable to load packaged runtime registry asset from ${url}.`);

	const parsed = await response.json();
	if (!isPackagedRuntimeTechnologyRegistryAsset(parsed)) {
		throw new Error('Packaged runtime registry asset did not match the expected schema.');
	}
	return createRuntimeTechnologyRegistryFromData(parsed);
}

async function loadPackagedRegistryShard(input: {
	readonly observationKind: PackagedRegistryObservationKind;
	readonly resolveUrl: (path: string) => string;
	readonly fetchAsset: RegistryAssetFetch;
}): Promise<readonly MatcherTechnologyType[]> {
	const path = getPackagedRegistryShardAssetPath(input.observationKind);
	const url = input.resolveUrl(path);
	const response = await input.fetchAsset(url);
	if (!response.ok) throw new Error(`Unable to load packaged ${input.observationKind} matcher shard from ${url}.`);

	const parsed = await response.json();
	if (!isPackagedTechnologyRegistryShardAsset(parsed, input.observationKind)) {
		throw new Error(`Packaged ${input.observationKind} matcher shard did not match the expected schema.`);
	}
	return hydratePackagedTechnologyRegistryShard(parsed);
}
