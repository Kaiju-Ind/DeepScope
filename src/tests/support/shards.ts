import type { MatcherTechnologyType, TechnologyDefinition } from '@/lib/detection/types';
import type { ObservationMatcherIndex } from '@/lib/detection/observation-matcher-index';
import { hydrateMatcherIndex, packageMatcherIndex } from '@/lib/registry/matcher-artifact';
import {
	PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
	PACKAGED_REGISTRY_OBSERVATION_KINDS,
	countTechnologyPatterns,
	countTechnologyRules,
	createObservationKindTechnologyRegistry,
	hydratePackagedTechnologyRegistryShard,
	isPackagedTechnologyRegistryShardAsset,
	renderPackagedRegistryJson,
	type PackagedRegistryObservationKind,
} from '@/lib/registry/packaged-artifacts';

/** One matcher shard as a worker sees it after fetching and hydrating the packaged JSON. */
export interface LoadedShard {
	readonly technologies: readonly MatcherTechnologyType[];
	readonly index: ObservationMatcherIndex;
}

/** Render, parse and hydrate one shard exactly as the worker receives it from the package. */
export function loadShard(registry: readonly TechnologyDefinition[], kind: PackagedRegistryObservationKind): LoadedShard {
	const technologies = createObservationKindTechnologyRegistry(registry, kind);
	const json = renderPackagedRegistryJson({
		schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
		kind: 'kind-shard',
		observationKind: kind,
		technologies,
		ruleCount: countTechnologyRules(technologies),
		technologyCount: technologies.length,
		matcherIndex: packageMatcherIndex(technologies),
		patternCount: countTechnologyPatterns(technologies),
		encodedPayloadBytes: 1,
		priority: 1,
	});
	const parsed: unknown = JSON.parse(json);
	if (!isPackagedTechnologyRegistryShardAsset(parsed, kind)) throw new Error(`Rendered ${kind} shard failed its own schema guard.`);
	const hydrated = hydratePackagedTechnologyRegistryShard(parsed);
	return { technologies: hydrated, index: hydrateMatcherIndex(hydrated, parsed.matcherIndex) };
}

/** Load every packaged shard once. */
export function loadShards(registry: readonly TechnologyDefinition[]): ReadonlyMap<PackagedRegistryObservationKind, LoadedShard> {
	return new Map(PACKAGED_REGISTRY_OBSERVATION_KINDS.map((kind) => [kind, loadShard(registry, kind)]));
}
