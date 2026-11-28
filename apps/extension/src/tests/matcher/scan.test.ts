import { fc, test } from '@fast-check/vitest';
import { describe, expect, it } from 'vitest';

import { scan, table } from "@deepscope/detection/match/literal";
import type { TechnologyDefinition } from "@deepscope/registry/types";
import { normalizePageSignals } from "@deepscope/detection/observations/page";
import { technologyDefinitions } from "@deepscope/registry";

import { page } from "../support/corpus.ts";
import { loadShards } from "../support/shards.ts";

/**
 * The multi-literal scanner must report exactly what per-literal `includes`
 * reports, for every literal of a bucket, on every value.
 */

/** Reference answer: one `includes` per rule position. */
function reference(literals: readonly string[], value: string): boolean[] {
	return literals.map((literal) => value.includes(literal));
}

/** Scanner answer projected back to rule positions. */
function scanned(literals: readonly string[], value: string): boolean[] {
	const scanner = table(literals.map((requiredLiteral) => ({ requiredLiteral })));
	const found = scan(scanner, value);
	return literals.map((_, position) => found[scanner.ids[position]!] === 1);
}

/** Small alphabet so literals overlap, repeat and collide; includes a surrogate pair half. */
const char = fc.constantFrom('a', 'b', 'c', '.', '/', '-', 'A', 'é', '\ud83d', '\ude00');
const text = (max: number) => fc.array(char, { maxLength: max }).map((chars) => chars.join(''));

describe('multi-literal scanner', () => {
	test.prop([fc.array(text(7), { maxLength: 40 }), text(200)])('equals per-literal includes on arbitrary input', (literals, value) => {
		expect(scanned(literals, value)).toEqual(reference(literals, value));
	});

	test.prop([fc.array(text(9), { minLength: 1, maxLength: 30 }), fc.array(fc.nat(), { maxLength: 12 }), text(20)])(
		'finds literals planted at any position, including the very end',
		(literals, picks, noise) => {
			const value = picks.map((pick) => `${noise}${literals[pick % literals.length]}`).join('');
			expect(scanned(literals, value)).toEqual(reference(literals, value));
		},
	);

	it('handles empty and short literals and values', () => {
		const literals = ['', 'a', 'ab', 'abc', 'abcd', 'bcd', 'abcd'];
		for (const value of ['', 'a', 'abc', 'abcd', 'xabcd', 'bcda']) {
			expect(scanned(literals, value), value).toEqual(reference(literals, value));
		}
	});

	describe('on the real literal buckets', () => {
		const registry = technologyDefinitions as readonly TechnologyDefinition[];
		const shards = loadShards(registry);
		const keys = (kind: 'jsGlobal' | 'dom' | 'htmlMatch') => Object.keys(shards.get(kind)?.index.keyedRules[kind] ?? {}).sort();
		const observations = normalizePageSignals(page({ globals: keys('jsGlobal'), selectors: keys('dom'), probes: keys('htmlMatch') })).observations;
		const buckets = [...shards.values()].flatMap((shard) => Object.entries(shard.index.literalRules)
			.map(([kind, rules]) => ({ kind, literals: (rules ?? []).map((rule) => rule.requiredLiteral) })))
			.filter((bucket) => bucket.literals.length > 0);

		it('agrees with includes for every page observation', () => {
			let compared = 0;
			for (const bucket of buckets) {
				for (const observation of observations.filter((entry) => entry.kind === bucket.kind)) {
					const value = String(observation.value).toLowerCase();
					expect(scanned(bucket.literals, value), `${bucket.kind}`).toEqual(reference(bucket.literals, value));
					compared += 1;
				}
			}
			expect(compared).toBeGreaterThan(500);
		});

		test.prop([fc.nat(), fc.array(fc.nat(), { maxLength: 20 }), text(12)], { numRuns: 200 })(
			'agrees with includes on values built from bucket literals',
			(bucketPick, picks, noise) => {
				const { literals } = buckets[bucketPick % buckets.length]!;
				const value = picks.map((pick) => `${noise}${literals[pick % literals.length]!.slice(pick % 3)}`).join('');
				expect(scanned(literals, value)).toEqual(reference(literals, value));
			},
		);
	});
});
