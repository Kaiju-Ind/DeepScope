import { describe, test } from 'vitest';

import { matchIndexedObservationBatch } from '@/lib/detection/observation-matcher-index';
import type { TechnologyDefinition } from '@/lib/detection/types';
import type { NormalizedObservation, ObservationBatch } from '@/lib/observations';
import { normalizePageSignals } from '@/lib/observations/page-signals';
import { normalizePackagedRegistryObservationKind, type PackagedRegistryObservationKind } from '@/lib/registry/packaged-artifacts';
import { technologyDefinitions } from '@/registry/technologies';

import { page } from '../../tests/support/corpus';
import { loadShard, parseShard, renderShard, type LoadedShard } from '../../tests/support/shards';

/**
 * Real-catalog matcher cost for one generated store page (about 1,100 observations).
 *
 * `steady` matches every partition on warm shards (regexes compiled). `cold`
 * parses and hydrates the shard JSON and matches once, so it includes regex
 * compilation, as the first page in a fresh worker does.
 */

const registry = technologyDefinitions as readonly TechnologyDefinition[];
const keys = (kind: 'jsGlobal' | 'dom' | 'htmlMatch') => Object.keys(loadShard(registry, kind).index.keyedRules[kind] ?? {}).sort();
const signals = page({ globals: keys('jsGlobal'), selectors: keys('dom'), probes: keys('htmlMatch') });
const observations = normalizePageSignals(signals, { observedAt: 1 }).observations;

const parts = new Map<PackagedRegistryObservationKind, NormalizedObservation[]>();
for (const observation of observations) {
	const kind = normalizePackagedRegistryObservationKind(observation.kind);
	parts.set(kind, [...(parts.get(kind) ?? []), observation]);
}
const batches = [...parts].map(([kind, list]) => ({
	kind,
	json: renderShard(registry, kind),
	batch: { target: list[0]!.target, interface: 'extension', observedAt: 1, observations: list } satisfies ObservationBatch,
}));
const warm = new Map(batches.map(({ kind, json }) => [kind, parseShard(json, kind)]));

let sink = 0;

/** Match every partition against its shard. */
function run(shards: ReadonlyMap<PackagedRegistryObservationKind, LoadedShard>): void {
	for (const { kind, batch } of batches) {
		const shard = shards.get(kind)!;
		sink += matchIndexedObservationBatch({ registry: shard.technologies, batch, index: shard.index }).matches.length;
	}
}

describe('real-catalog page match', () => {
	test('steady', async ({ bench }) => {
		await bench('steady', () => run(warm)).run({ time: 5_000, iterations: 30, warmupIterations: 5 });
	});
	test('cold', async ({ bench }) => {
		await bench('cold', () => run(new Map(batches.map(({ kind, json }) => [kind, parseShard(json, kind)])))).run({ time: 5_000, iterations: 20, warmupIterations: 1 });
	});
});

export { sink };
