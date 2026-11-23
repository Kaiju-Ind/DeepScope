import { describe, expect, it } from 'vitest';

import { createGeneratedRulePassCases, makeRuleProfileObservation } from '@/lib/detection/rule-performance-profile';
import { createObservationMatcherIndex, matchIndexedObservationBatch } from '@/lib/detection/observation-matcher-index';
import type { MatcherTechnologyType, TechnologyDefinition } from '@/lib/detection/types';
import type { NormalizedObservation, ObservationBatch } from '@/lib/observations';
import { hydrateMatcherIndex, packageMatcherIndex } from '@/lib/registry/matcher-artifact';
import {
	PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
	PACKAGED_REGISTRY_OBSERVATION_KINDS,
	countTechnologyPatterns,
	countTechnologyRules,
	createObservationKindTechnologyRegistry,
	hydratePackagedTechnologyRegistryShard,
	isPackagedTechnologyRegistryShardAsset,
	normalizePackagedRegistryObservationKind,
	renderPackagedRegistryJson,
	type PackagedRegistryObservationKind,
} from '@/lib/registry/packaged-artifacts';
import { technologyDefinitions } from '@/registry/technologies';

/** Keys a page controls that collide with `Object.prototype` members. */
const PROTOTYPE_KEYS = ['constructor', '__proto__', 'toString', 'hasOwnProperty'] as const;

/** Render, parse and hydrate one shard exactly as the worker receives it from the package. */
function loadPackagedShard(kind: PackagedRegistryObservationKind, technologies: readonly MatcherTechnologyType[]) {
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
		generatedAt: 1,
	});
	const parsed: unknown = JSON.parse(json);
	if (!isPackagedTechnologyRegistryShardAsset(parsed, kind)) throw new Error(`Rendered ${kind} shard failed its own schema guard.`);
	const hydrated = hydratePackagedTechnologyRegistryShard(parsed);
	return { technologies: hydrated, index: hydrateMatcherIndex(hydrated, parsed.matcherIndex) };
}

/** Observations that should reach every route: generated passes plus prototype-named keys. */
function observationsFor(kind: PackagedRegistryObservationKind, passes: readonly NormalizedObservation[]): NormalizedObservation[] {
	const ofKind = passes.filter((observation) => normalizePackagedRegistryObservationKind(observation.kind) === kind);
	const keyed = PROTOTYPE_KEYS.map((key) => makeRuleProfileObservation(kind, 'prototype-key-probe', { key }));
	return [...ofKind, ...keyed];
}

/** Project a match to the fields that identify which rule fired, in emission order. */
function matchIdentity(batch: ObservationBatch, technologies: readonly MatcherTechnologyType[], index: ReturnType<typeof createObservationMatcherIndex>) {
	return matchIndexedObservationBatch({ registry: technologies, batch, index }).matches
		.map((match) => [match.technologyId, match.ruleIndex, match.observation.kind, match.observation.key, match.observation.value] as const);
}

describe('build-routed matcher shards', () => {
	// Generated pass observations are derived once for the real registry.
	const registry = technologyDefinitions as readonly TechnologyDefinition[];
	const passObservations = createGeneratedRulePassCases(registry).map((profileCase) => profileCase.observation);

	it.each([...PACKAGED_REGISTRY_OBSERVATION_KINDS])(
		'match the runtime-built index for %s after a JSON round trip',
		(kind) => {
			const shard = createObservationKindTechnologyRegistry(registry, kind);
			const packaged = loadPackagedShard(kind, shard);
			const runtimeIndex = createObservationMatcherIndex(packaged.technologies);
			expect(packaged.index.ruleCount).toBe(runtimeIndex.ruleCount);

			const observations = observationsFor(kind, passObservations);
			const target = observations[0]!.target;
			const batch: ObservationBatch = { target, interface: 'extension', observedAt: 1, observations };

			expect(matchIdentity(batch, packaged.technologies, packaged.index))
				.toEqual(matchIdentity(batch, packaged.technologies, runtimeIndex));
		},
	);
});
