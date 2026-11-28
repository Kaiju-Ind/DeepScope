import type { MatcherTechnologyType, TechnologyDefinition } from "@deepscope/registry/types";
import type { ObservationMatcherIndex } from "@deepscope/detection/matcher/routing/types";
import { hydrateMatcherIndex, packageMatcherIndex } from "@deepscope/detection/artifacts/matcher";
import { PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION, PACKAGED_REGISTRY_OBSERVATION_KINDS, countTechnologyPatterns, countTechnologyRules, createObservationKindTechnologyRegistry, hydratePackagedTechnologyRegistryShard, isPackagedTechnologyRegistryShardAsset, renderPackagedRegistryJson, type PackagedRegistryObservationKind } from "@deepscope/detection/artifacts/packaged";

/** One matcher shard as a worker sees it after fetching and hydrating the packaged JSON. */
export interface LoadedShard {
	readonly technologies: readonly MatcherTechnologyType[];
	readonly index: ObservationMatcherIndex;
}

/** Render one shard's packaged JSON as the build writes it. */
export function renderShard(registry: readonly TechnologyDefinition[], kind: PackagedRegistryObservationKind): string {
	const technologies = createObservationKindTechnologyRegistry(registry, kind);
	return renderPackagedRegistryJson({
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
}

/** Parse and hydrate packaged shard JSON exactly as the worker does. */
export function parseShard(json: string, kind: PackagedRegistryObservationKind): LoadedShard {
	const parsed: unknown = JSON.parse(json);
	if (!isPackagedTechnologyRegistryShardAsset(parsed, kind)) throw new Error(`Rendered ${kind} shard failed its own schema guard.`);
	const hydrated = hydratePackagedTechnologyRegistryShard(parsed);
	return { technologies: hydrated, index: hydrateMatcherIndex(hydrated, parsed.matcherIndex) };
}

/** Render, parse and hydrate one shard exactly as the worker receives it from the package. */
export function loadShard(registry: readonly TechnologyDefinition[], kind: PackagedRegistryObservationKind): LoadedShard {
	return parseShard(renderShard(registry, kind), kind);
}

/** Load every packaged shard once. */
export function loadShards(registry: readonly TechnologyDefinition[]): ReadonlyMap<PackagedRegistryObservationKind, LoadedShard> {
	return new Map(PACKAGED_REGISTRY_OBSERVATION_KINDS.map((kind) => [kind, loadShard(registry, kind)]));
}
