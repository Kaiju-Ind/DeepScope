import { bench, do_not_optimize, summary } from 'mitata';

import { createObservationMatcherIndex } from '@/lib/detection/observation-matcher-index';
import type { DetectionRule, TechnologyDefinition } from '@/lib/detection/types';
import { hydrateMatcherIndex, packageMatcherIndex } from '@/lib/registry/matcher-artifact';
import {
	PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
	createObservationKindTechnologyRegistry,
	hydratePackagedTechnologyRegistryShard,
	renderPackagedRegistryJson,
} from '@/lib/registry/packaged-artifacts';

const LARGE_REGISTRY_SIZE = 1_000;
const RULE_GROUPS_PER_TECHNOLOGY = 4;
function consume(count: number): void {
	do_not_optimize(count);
}

/** Create enough mixed rules to compare route reconstruction against generated route hydration. */
function createBenchmarkRegistry(size: number): TechnologyDefinition[] {
	return Array.from({ length: size }, (_item, index) => {
		const rules = Array.from({ length: RULE_GROUPS_PER_TECHNOLOGY }, (_rule, ruleIndex): DetectionRule[] => [
			{ kind: 'meta', key: `generator-${index}-${ruleIndex}`, valuePattern: /matched-generator/ },
			{ kind: 'scriptSrc', pattern: new RegExp(`tech-${index}-${ruleIndex}\\.js`) },
		]).flat();
		return {
			id: `tech-${index}`,
			name: `Tech ${index}`,
			website: `https://tech-${index}.example`,
			categories: ['framework'],
			rules,
		};
	});
}

const registry = createBenchmarkRegistry(LARGE_REGISTRY_SIZE);
const shard = createObservationKindTechnologyRegistry(registry, 'scriptSrc');
const packagedMatcherIndex = packageMatcherIndex(shard);
const shardJson = renderPackagedRegistryJson({
	schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
	kind: 'kind-shard',
	observationKind: 'scriptSrc',
	technologies: shard,
	ruleCount: packagedMatcherIndex.ruleCount,
	technologyCount: shard.length,
	matcherIndex: packagedMatcherIndex,
	patternCount: packagedMatcherIndex.ruleCount,
	encodedPayloadBytes: 1,
	priority: 3,
	generatedAt: 1,
});
const parsedShard = JSON.parse(shardJson);

/** Parse JSON, hydrate shard values, and reconnect build-generated numeric route references. */
function parseAndHydrateBuildRoutes(): number {
	const parsed = JSON.parse(shardJson);
	const technologies = hydratePackagedTechnologyRegistryShard(parsed);
	return hydrateMatcherIndex(technologies, parsed.matcherIndex).ruleCount;
}

/** Isolate route-reference hydration after JSON parsing has already completed. */
function hydrateBuildRoutes(): number {
	const technologies = hydratePackagedTechnologyRegistryShard(parsedShard);
	return hydrateMatcherIndex(technologies, parsedShard.matcherIndex).ruleCount;
}

/** Previous worker behavior: hydrate shard values and walk every rule to rebuild routing maps. */
function rebuildRoutesAtRuntime(): number {
	const technologies = hydratePackagedTechnologyRegistryShard(parsedShard);
	return createObservationMatcherIndex(technologies).ruleCount;
}

/**
 * Compare current build-routed matcher hydration with the superseded runtime compiler path.
 *
 * This benchmark answers one architecture question only: whether generated route
 * references reduce worker cold-shard setup. Browser fetch and native RegExp cost
 * are measured separately because mixing them here would hide the routing delta.
 */
summary(() => {
	bench('parse and hydrate build-routed shard', () => {
		consume(parseAndHydrateBuildRoutes());
	});

	bench('hydrate build-routed route references', () => {
		consume(hydrateBuildRoutes());
	});

	bench('rebuild matcher routes at worker runtime', () => {
		consume(rebuildRoutesAtRuntime());
	});
});
