import { describe, expect, it } from 'vitest';

import { createCuratedRuleProfileCases, createGeneratedRuleMissCases, createGeneratedRulePassCases } from "../profile/cases.ts";
import { profileRuleCase } from "../profile/index.ts";
import { summarizeRuleProfileCoverage } from "../profile/catalog.ts";
import { technologyDefinitions } from "@deepscope/registry";
import { RULE_PERFORMANCE_FIXTURES } from "../testing/rules.ts";

const SEMANTIC_MISS_PAYLOAD_CHARS = 256;

describe('rule performance fixtures', () => {
	it('keep curated passing and failing samples semantically correct', () => {
		const cases = createCuratedRuleProfileCases({
			registry: technologyDefinitions,
			fixtures: RULE_PERFORMANCE_FIXTURES,
		});

		for (const profileCase of cases) {
			const record = profileRuleCase(profileCase);
			expect(record.matched, profileCase.scenario).toBe(profileCase.expected === 'match');
		}
	});

	it('create generated miss coverage only for rules that can be missed safely', () => {
		const cases = createGeneratedRuleMissCases(technologyDefinitions, {
			contentPayloadChars: SEMANTIC_MISS_PAYLOAD_CHARS,
		});
		const coverage = summarizeRuleProfileCoverage({
			registry: technologyDefinitions,
			generatedMissCases: cases,
			generatedPassCases: [],
			curatedFixtures: RULE_PERFORMANCE_FIXTURES,
		});

		expect(cases.length).toBeGreaterThan(0);
		expect(cases.length + coverage.generatedMissUncoveredRuleCount).toBe(coverage.ruleCount);
		for (const profileCase of cases) {
			const record = profileRuleCase(profileCase);
			expect(record.matched, profileCase.scenario).toBe(false);
		}
	});

	it('create generated pass coverage for structural rules with unambiguous observations', () => {
		const cases = createGeneratedRulePassCases(technologyDefinitions);
		const coverage = summarizeRuleProfileCoverage({
			registry: technologyDefinitions,
			generatedMissCases: [],
			generatedPassCases: cases,
			curatedFixtures: RULE_PERFORMANCE_FIXTURES,
		});

		expect(cases.length).toBeGreaterThan(0);
		expect(cases.length + coverage.generatedPassUncoveredRuleCount).toBe(coverage.ruleCount);
		for (const profileCase of cases) {
			const record = profileRuleCase(profileCase);
			expect(record.matched, profileCase.scenario).toBe(true);
		}
	});
});
