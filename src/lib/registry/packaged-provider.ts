import { browser } from 'wxt/browser';

import { compileValidatedTechnologyRegistry, type CompiledTechnologyRegistryArtifact } from './compiler-core';
import {
	PACKAGED_REGISTRY_ASSET_PATHS,
	getPackagedRegistryShardAssetPath,
	hydratePackagedTechnologyRegistry,
	isPackagedTechnologyRegistryAsset,
	isPackagedTechnologyRegistryShardAsset,
	normalizePackagedRegistryObservationKind,
	type PackagedRegistryObservationKind,
	type PackagedTechnologyRegistryAsset,
} from './packaged-artifacts';
import type { TechnologyRegistryProvider } from '../detection/registry-provider';
import type { TechnologyDefinition } from '../detection/types';
import type { NormalizedObservationKind } from '../observations';

/** Fetch implementation used by tests and non-browser harnesses. */
export type RegistryAssetFetch = (url: string) => Promise<{ readonly ok: boolean; json(): Promise<unknown> }>;

/** Runtime hooks needed to load generated registry JSON from the extension package. */
export interface PackagedTechnologyRegistryProviderInput {
	/** Convert a packaged asset path into an extension URL. */
	readonly resolveUrl?: (path: string) => string;
	/** Fetch a generated JSON asset. */
	readonly fetchAsset?: RegistryAssetFetch;
}

/** Registry asset tier that contains executable technology definitions. */
type PackagedExecutableRegistryKind = PackagedTechnologyRegistryAsset['kind'];

/** Cached runtime state for one packaged registry tier. */
interface PackagedRegistryTierCache {
	/** Ordered technology definitions hydrated from JSON. */
	registryPromise?: Promise<readonly TechnologyDefinition[]>;
	/** Compiled matcher, graph, and collection-plan artifact for the hydrated registry. */
	artifactPromise?: Promise<CompiledTechnologyRegistryArtifact>;
}

/** Cached runtime state for observation-kind matcher shards. */
type PackagedRegistryShardCache = Partial<Record<PackagedRegistryObservationKind, PackagedRegistryTierCache>>;

/**
 * Create a registry provider backed by generated JSON assets.
 *
 * The full payload is fetched for collection planning, graph refinement, and
 * final emission. Dedicated matcher workers fetch observation-kind shards on
 * demand, so a `scriptSrc` partition does not clone DOM, HTML, header, and text
 * rules through the worker message channel before it can begin matching.
 */
export function createPackagedTechnologyRegistryProvider(
	input: PackagedTechnologyRegistryProviderInput = {},
): TechnologyRegistryProvider {
	const resolveUrl = input.resolveUrl ?? ((path) => browser.runtime.getURL(
		path as Parameters<typeof browser.runtime.getURL>[0],
	));
	const fetchAsset = input.fetchAsset ?? fetchRegistryAsset;
	const bootstrap = createRegistryTierCache();
	const enrichment = createRegistryTierCache();
	const shards: PackagedRegistryShardCache = Object.create(null) as PackagedRegistryShardCache;

	const loadRegistry = (kind: PackagedExecutableRegistryKind, cache: PackagedRegistryTierCache) => {
		cache.registryPromise ??= loadPackagedRegistry({ kind, resolveUrl, fetchAsset });
		return cache.registryPromise;
	};
	const compileRegistry = (kind: PackagedExecutableRegistryKind, cache: PackagedRegistryTierCache) => {
		cache.artifactPromise ??= (async () => compileValidatedTechnologyRegistry({
			technologies: await loadRegistry(kind, cache),
			sourceKind: 'typescript-definition',
		}))();
		return cache.artifactPromise;
	};
	const getShardCache = (kind: NormalizedObservationKind) => {
		const observationKind = normalizePackagedRegistryObservationKind(kind);
		return shards[observationKind] ?? (shards[observationKind] = createRegistryTierCache());
	};

	return {
		listTechnologies: () => loadRegistry('enrichment', enrichment),
		listBootstrapTechnologies: () => loadRegistry('bootstrap', bootstrap),
		getCompiledRegistry: () => compileRegistry('enrichment', enrichment),
		getCompiledBootstrapRegistry: () => compileRegistry('bootstrap', bootstrap),
		getCompiledObservationKindRegistry(kind) {
			const observationKind = normalizePackagedRegistryObservationKind(kind);
			const cache = getShardCache(kind);
			cache.registryPromise ??= loadPackagedRegistryShard({ observationKind, resolveUrl, fetchAsset });
			cache.artifactPromise ??= (async () => compileValidatedTechnologyRegistry({
				technologies: await cache.registryPromise!,
				sourceKind: 'typescript-definition',
			}))();
			return cache.artifactPromise;
		},
	};
}

function createRegistryTierCache(): PackagedRegistryTierCache {
	return {};
}

/**
 * Fetch packaged registry data without detaching the native worker fetch method.
 *
 * Chrome's worker `fetch` expects the worker global as its receiver. Passing the
 * native method through an object and later invoking it as `input.fetchAsset(...)`
 * can bind `this` to that object, which raises `Illegal invocation` before the
 * registry URL is even requested. Wrapping the call preserves the correct
 * browser receiver while keeping tests free to inject a fake fetcher.
 */
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
	if (!response.ok) {
		throw new Error(`Unable to load packaged ${input.kind} registry asset from ${url}.`);
	}

	const parsed = await response.json();
	if (!isPackagedTechnologyRegistryAsset(parsed, input.kind)) {
		throw new Error(`Packaged ${input.kind} registry asset did not match the expected schema.`);
	}

	return hydratePackagedTechnologyRegistry(parsed);
}

async function loadPackagedRegistryShard(input: {
	readonly observationKind: PackagedRegistryObservationKind;
	readonly resolveUrl: (path: string) => string;
	readonly fetchAsset: RegistryAssetFetch;
}): Promise<readonly TechnologyDefinition[]> {
	const path = getPackagedRegistryShardAssetPath(input.observationKind);
	const url = input.resolveUrl(path);
	const response = await input.fetchAsset(url);
	if (!response.ok) {
		throw new Error(`Unable to load packaged ${input.observationKind} matcher shard from ${url}.`);
	}

	const parsed = await response.json();
	if (!isPackagedTechnologyRegistryShardAsset(parsed, input.observationKind)) {
		throw new Error(`Packaged ${input.observationKind} matcher shard did not match the expected schema.`);
	}

	return hydratePackagedTechnologyRegistry(parsed);
}
