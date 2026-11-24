import { fc } from '@fast-check/vitest';
import { describe, expect, it } from 'vitest';

import type { LiteralPrefilteredObservationRule } from '@/lib/detection/observation-matcher-index';
import type { DetectionPatternType, TechnologyDefinition } from '@/lib/detection/types';
import { technologyDefinitions } from '@/registry/technologies';

import { loadShards } from '../support/shards';

/**
 * Soundness of the literal prefilter.
 *
 * A rule whose required literal is absent from a value is never evaluated, so
 * the prefilter is only correct if every value its regex accepts contains the
 * literal under the matcher's case rules (both sides lowercased). Samples come
 * from `fc.stringMatching`, which only produces matching strings, and ASCII
 * letters are re-cased at random for `i` patterns (which still match).
 *
 * Samples are not re-run through the real regex: several catalog patterns
 * backtrack catastrophically (e.g. `(?:[^"'\s]{0,200}\s*)*`), so testing a
 * sample can take minutes. Unicode case-fold look-alikes (`ſ`, Kelvin `K`) are
 * covered by `extract.test.ts`.
 */

const registry = technologyDefinitions as readonly TechnologyDefinition[];
const shards = loadShards(registry);

/** The regex a literal route guards: `hrefPattern` for links, `pattern` otherwise. */
function guarded(rule: LiteralPrefilteredObservationRule): DetectionPatternType | undefined {
	return rule.rule.kind === 'link' ? rule.rule.hrefPattern : (rule.rule as { readonly pattern?: DetectionPatternType }).pattern;
}

/** Distinct (pattern, literal) pairs across every shard. */
function pairs(): { readonly source: string; readonly flags: string; readonly literal: string; readonly id: string }[] {
	const seen = new Map<string, { source: string; flags: string; literal: string; id: string }>();
	for (const shard of shards.values()) {
		for (const rules of Object.values(shard.index.literalRules)) {
			for (const rule of rules ?? []) {
				const pattern = guarded(rule);
				if (!pattern) throw new Error(`Literal route without a pattern: ${rule.technology.id}:${rule.ruleIndex}`);
				const key = `${pattern.flags}/${pattern.source}/${rule.requiredLiteral}`;
				if (!seen.has(key)) seen.set(key, { source: pattern.source, flags: pattern.flags, literal: rule.requiredLiteral, id: `${rule.technology.id}:${rule.ruleIndex}` });
			}
		}
	}
	return [...seen.values()];
}

/** Swap the case of ASCII letters where `bits` says so; an `i` pattern still matches. */
function recase(value: string, bits: readonly boolean[]): string {
	let out = '';
	for (let index = 0; index < value.length; index += 1) {
		const char = value[index]!;
		const ascii = /[a-zA-Z]/.test(char);
		out += ascii && bits[index % bits.length] ? (char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()) : char;
	}
	return out;
}

/** Sample values for one regex; `undefined` when fast-check cannot model the pattern. */
function arbitrary(source: string, flags: string): fc.Arbitrary<string> | undefined {
	try {
		// fast-check rejects `i`; samples of the case-sensitive pattern also match the `i` one.
		const plain = fc.stringMatching(new RegExp(source, flags.replace(/[giy]/g, '')), { size: 'small' });
		return flags.includes('i')
			? fc.tuple(plain, fc.array(fc.boolean(), { minLength: 1, maxLength: 8 })).map(([value, bits]) => recase(value, bits))
			: plain;
	} catch {
		return undefined;
	}
}

describe('literal prefilter soundness', () => {
	const all = pairs();

	it('finds literal-routed rules to check', () => {
		expect(all.length).toBeGreaterThan(1_000);
	});

	it('only drops a rule when its regex cannot match: every match contains the literal', () => {
		let checked = 0;
		let skipped = 0;
		for (const { source, flags, literal, id } of all) {
			const values = arbitrary(source, flags);
			if (!values) {
				skipped += 1;
				continue;
			}
			fc.assert(fc.property(values, (value) => {
				checked += 1;
				return value.toLowerCase().includes(literal);
			}), { numRuns: 6, seed: 42, examples: [], verbose: 0, reporter: (details) => {
				if (details.failed) throw new Error(`${id} /${source}/${flags} literal "${literal}" fails on ${JSON.stringify(details.counterexample)}`);
			} });
		}
		// Most registry regexes are inside fast-check's supported subset.
		expect(skipped).toBeLessThan(all.length / 10);
		expect(checked).toBeGreaterThan(all.length * 5);
	}, 120_000);
});
