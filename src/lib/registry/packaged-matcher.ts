import { browser } from 'wxt/browser';

import { fetchRegistryAsset, type RegistryAssetFetch } from './asset-fetch';
import {
	hydrateMatcherIndex,
	type CompiledMatcherRegistryArtifact,
} from './matcher-artifact';
import {
	getPackagedRegistryShardAssetPath,
	hydratePackagedTechnologyRegistryShard,
	isPackagedTechnologyRegistryShardAsset,
	normalizePackagedRegistryObservationKind,
	type PackagedRegistryObservationKind,
} from './packaged-artifacts';
import type {
	MatcherRegistryCacheState,
	MatcherTechnologyRegistryProvider,
} from '../detection/registry-provider';
import type { NormalizedObservationKind } from '../observations';

/** Runtime hooks needed to load generated matcher shards from extension assets. */
export interface PackagedMatcherTechnologyRegistryProviderInput {
	readonly resolveUrl?: (path: string) => string;
	readonly fetchAsset?: RegistryAssetFetch;
	/** Weighted per-worker matcher-shard retention budget. */
	readonly maxShardCacheBytes?: number;
}

/** Loaded worker-local shard plus its generated retention metadata. */
interface LoadedMatcherShard {
	readonly artifact: CompiledMatcherRegistryArtifact;
	readonly retainedBytes: number;
	readonly patternCount: number;
	readonly ruleCount: number;
}

/** One LRU entry. Failed initialization is removed instead of becoming a poisoned cached Promise. */
interface MatcherShardCacheEntry {
	readonly promise: Promise<LoadedMatcherShard>;
	retainedBytes: number;
	patternCount: number;
	ruleCount: number;
}

/** Default allows one large shard plus useful smaller routing surfaces without a count-based guess. */
const DEFAULT_MATCHER_SHARD_CACHE_BYTES = 6 * 1024 * 1024;

/** Create the shard-only packaged provider used by one dedicated matcher worker. */
export function createPackagedMatcherTechnologyRegistryProvider(
	input: PackagedMatcherTechnologyRegistryProviderInput = {},
): MatcherTechnologyRegistryProvider {
	const resolveUrl = input.resolveUrl ?? ((path) => browser.runtime.getURL(
		path as Parameters<typeof browser.runtime.getURL>[0],
	));
	const fetchAsset = input.fetchAsset ?? fetchRegistryAsset;
	const shards = new Map<PackagedRegistryObservationKind, MatcherShardCacheEntry>();
	const maxShardCacheBytes = normalizeShardCacheBudget(input.maxShardCacheBytes);
	let retainedBytes = 0;

	/** Move one successful or in-flight entry to the most-recent end of the LRU map. */
	const touch = (kind: PackagedRegistryObservationKind, entry: MatcherShardCacheEntry): void => {
		if (shards.get(kind) === entry) shards.delete(kind);
		shards.set(kind, entry);
	};

	/** Evict least-recently-used completed shards until the weighted budget is satisfied. */
	const enforceBudget = (protectedKind: PackagedRegistryObservationKind): void => {
		for (const [kind, entry] of shards) {
			if (retainedBytes <= maxShardCacheBytes) break;
			if (kind === protectedKind) continue;
			// An unresolved entry has no reliable cost yet. Leave it until its own completion.
			if (entry.retainedBytes <= 0) continue;
			shards.delete(kind);
			retainedBytes = Math.max(0, retainedBytes - entry.retainedBytes);
		}
	};

	const getCompiledObservationKindRegistry = (kind: NormalizedObservationKind): Promise<CompiledMatcherRegistryArtifact> => {
		const observationKind = normalizePackagedRegistryObservationKind(kind);
		const existing = shards.get(observationKind);
		if (existing) {
			touch(observationKind, existing);
			return existing.promise.then((loaded) => loaded.artifact);
		}

		let entry!: MatcherShardCacheEntry;
		const promise = loadPackagedRegistryShard({ observationKind, resolveUrl, fetchAsset })
			.then((loaded) => {
				// The entry may have been displaced while loading. Only current entries own budget.
				if (shards.get(observationKind) === entry) {
					entry.retainedBytes = loaded.retainedBytes;
					entry.patternCount = loaded.patternCount;
					entry.ruleCount = loaded.ruleCount;
					retainedBytes += loaded.retainedBytes;
					touch(observationKind, entry);
					enforceBudget(observationKind);
				}
				return loaded;
			})
			.catch((error) => {
				// A transient fetch/schema failure must never poison every later request for this kind.
				if (shards.get(observationKind) === entry) shards.delete(observationKind);
				if (entry.retainedBytes > 0) retainedBytes = Math.max(0, retainedBytes - entry.retainedBytes);
				throw error;
			});
		entry = { promise, retainedBytes: 0, patternCount: 0, ruleCount: 0 };
		shards.set(observationKind, entry);
		return promise.then((loaded) => loaded.artifact);
	};

	return {
		getCompiledObservationKindRegistry,
		getCacheState(kind): MatcherRegistryCacheState {
			const observationKind = normalizePackagedRegistryObservationKind(kind);
			const entry = shards.get(observationKind);
			return {
				cached: entry !== undefined,
				retainedBytes,
				retainedShardCount: shards.size,
				budgetBytes: maxShardCacheBytes,
				shardRetainedBytes: entry?.retainedBytes ?? 0,
				shardPatternCount: entry?.patternCount ?? 0,
				shardRuleCount: entry?.ruleCount ?? 0,
			};
		},
	};
}

/** Normalize an optional weighted cache budget without permitting a zero-byte thrash loop. */
function normalizeShardCacheBudget(value: number | undefined): number {
	if (value === undefined || !Number.isFinite(value)) return DEFAULT_MATCHER_SHARD_CACHE_BYTES;
	return Math.max(256 * 1024, Math.floor(value));
}

/** Load one build-routed shard and reconnect compact route references without recompiling routes. */
async function loadPackagedRegistryShard(input: {
	readonly observationKind: PackagedRegistryObservationKind;
	readonly resolveUrl: (path: string) => string;
	readonly fetchAsset: RegistryAssetFetch;
}): Promise<LoadedMatcherShard> {
	const path = getPackagedRegistryShardAssetPath(input.observationKind);
	const url = input.resolveUrl(path);
	const response = await input.fetchAsset(url);
	if (!response.ok) throw new Error(`Unable to load packaged ${input.observationKind} matcher shard from ${url}.`);

	const parsed = await response.json();
	if (!isPackagedTechnologyRegistryShardAsset(parsed, input.observationKind)) {
		throw new Error(`Packaged ${input.observationKind} matcher shard did not match the expected schema.`);
	}
	const technologies = hydratePackagedTechnologyRegistryShard(parsed);
	return {
		artifact: {
			technologies,
			matcherIndex: hydrateMatcherIndex(technologies, parsed.matcherIndex),
		},
		retainedBytes: parsed.encodedPayloadBytes,
		patternCount: parsed.patternCount,
		ruleCount: parsed.ruleCount,
	};
}
