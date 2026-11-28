import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { matchIndexedObservationBatch } from "@deepscope/detection/matcher";
import { type ObservationMatcherDiagnostics } from "@deepscope/detection/matcher/diagnostics";
import { createCuratedRuleProfileCases, createGeneratedRuleMissCases, createGeneratedRulePassCases } from "@deepscope/detection/profile/cases";
import type { TechnologyDefinition } from "@deepscope/registry/types";
import type { NormalizedObservation, ObservationBatch } from "@deepscope/detection/observations";
import { normalizePageSignals } from "@deepscope/detection/observations/page";
import { normalizePackagedRegistryObservationKind, PACKAGED_REGISTRY_OBSERVATION_KINDS } from "@deepscope/detection/artifacts/packaged";
import { technologyDefinitions } from "@deepscope/registry";

import { page } from "../support/corpus.ts";
import { RULE_PERFORMANCE_FIXTURES } from "@deepscope/detection/testing/rules";
import { loadShards } from "../support/shards.ts";

/**
 * Golden output for the packaged, indexed matcher.
 *
 * Every matcher speed-up must leave detections byte-for-byte unchanged: the
 * same matches, in the same order, with the same evidence. This test runs the
 * shipped path (render shard JSON, parse, hydrate, match per shard) over a
 * generated page and the curated and generated rule fixtures, and compares a
 * digest of the full match and evidence lists against `golden.json`, which was
 * written by the matcher before any routing change.
 *
 * Routing counters (`routing.json`) are kept apart: they describe work done,
 * not results, so a routing change may lower them deliberately.
 *
 * The golden depends on the catalog. After a catalog change, regenerate both
 * files with `DEEPSCOPE_GOLDEN=update` at a commit whose matcher is trusted,
 * then re-run without the flag.
 */

const GOLDEN = fileURLToPath(new URL('./golden.json', import.meta.url));
const ROUTING = fileURLToPath(new URL('./routing.json', import.meta.url));
const UPDATE = process.env.DEEPSCOPE_GOLDEN === 'update';

/** Counters summed per corpus section. */
const COUNTERS = ['candidateRuleCount', 'keyedRuleCount', 'fallbackRuleCount', 'literalRuleCount', 'literalRejectedRuleCount', 'matchCount'] as const;

interface Section {
	readonly observations: number;
	readonly matches: number;
	readonly digest: string;
	readonly technologies: Readonly<Record<string, number>>;
}

const registry = technologyDefinitions as readonly TechnologyDefinition[];
const shards = loadShards(registry);

/** Corpus sections; each is matched independently so a failure names its source. */
function sections(): Record<string, readonly NormalizedObservation[]> {
	const keyed = (kind: 'jsGlobal' | 'dom' | 'htmlMatch') => Object.keys(shards.get(kind)?.index.keyedRules[kind] ?? {}).sort();
	const signals = page({ globals: keyed('jsGlobal'), selectors: keyed('dom'), probes: keyed('htmlMatch') });
	const observations = (cases: readonly { readonly observation: NormalizedObservation }[]) => cases.map((entry) => entry.observation);
	return {
		page: normalizePageSignals(signals, { observedAt: 1_700_000_000_000 }).observations,
		curated: observations(createCuratedRuleProfileCases({ registry, fixtures: RULE_PERFORMANCE_FIXTURES })),
		miss: observations(createGeneratedRuleMissCases(registry, { contentPayloadChars: 256 })),
		pass: observations(createGeneratedRulePassCases(registry)),
	};
}

/** Match one section shard by shard, as the worker partitioner does, and serialize every match. */
function run(observations: readonly NormalizedObservation[]): { section: Section; routing: Record<string, number> } {
	const byKind = new Map<string, NormalizedObservation[]>();
	const position = new Map<NormalizedObservation, number>();
	for (const [index, observation] of observations.entries()) {
		position.set(observation, index);
		const kind = normalizePackagedRegistryObservationKind(observation.kind);
		const list = byKind.get(kind) ?? [];
		list.push(observation);
		byKind.set(kind, list);
	}

	const hash = createHash('sha256');
	const technologies: Record<string, number> = {};
	const routing: Record<string, number> = Object.fromEntries(COUNTERS.map((name) => [name, 0]));
	let matches = 0;
	for (const kind of PACKAGED_REGISTRY_OBSERVATION_KINDS) {
		const list = byKind.get(kind);
		const shard = shards.get(kind);
		if (!list || !shard) continue;
		const batch: ObservationBatch = { target: list[0]!.target, interface: 'extension', observedAt: 1, observations: list };
		const result = matchIndexedObservationBatch({ registry: shard.technologies, batch, index: shard.index });
		for (const name of COUNTERS) routing[name]! += result.diagnostics[name as keyof ObservationMatcherDiagnostics] as number;
		for (const match of result.matches) {
			matches += 1;
			technologies[match.technologyId] = (technologies[match.technologyId] ?? 0) + 1;
			hash.update(JSON.stringify([kind, position.get(match.observation), match.technologyId, match.ruleIndex, match.ruleId ?? null, match.evidence]));
			hash.update('\n');
		}
	}

	const sorted = Object.fromEntries(Object.entries(technologies).sort(([left], [right]) => left.localeCompare(right)));
	return { section: { observations: observations.length, matches, digest: hash.digest('hex'), technologies: sorted }, routing };
}

describe('packaged matcher golden output', () => {
	const results = Object.fromEntries(Object.entries(sections()).map(([name, observations]) => [name, run(observations)]));
	const golden = Object.fromEntries(Object.entries(results).map(([name, result]) => [name, result.section]));
	const routing = Object.fromEntries(Object.entries(results).map(([name, result]) => [name, result.routing]));

	if (UPDATE) {
		writeFileSync(GOLDEN, `${JSON.stringify(golden, null, '\t')}\n`);
		writeFileSync(ROUTING, `${JSON.stringify(routing, null, '\t')}\n`);
	}

	it.each(Object.keys(golden))('keeps every %s match and its evidence unchanged', (name) => {
		const expected = JSON.parse(readFileSync(GOLDEN, 'utf8')) as Record<string, Section>;
		expect(golden[name]).toEqual(expected[name]);
	});

	it('records the routing work behind those matches', () => {
		const expected = JSON.parse(readFileSync(ROUTING, 'utf8')) as Record<string, Record<string, number>>;
		expect(routing).toEqual(expected);
	});

	it('covers a realistic volume of observations and matches', () => {
		expect(golden.page!.observations).toBeGreaterThan(900);
		expect(golden.page!.matches).toBeGreaterThan(100);
		expect(golden.miss!.observations).toBeGreaterThan(1_000);
		expect(golden.pass!.matches).toBeGreaterThan(1_000);
	});
}, 120_000);
