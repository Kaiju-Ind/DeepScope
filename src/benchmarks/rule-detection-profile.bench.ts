import { bench, do_not_optimize } from 'mitata';

import {
	createCuratedRuleProfileCases,
	createGeneratedRuleMissCases,
	createGeneratedRulePassCases,
	createPayloadScanCases,
	evaluateRuleProfileCase,
	makeNextHydrationPayload,
	makeReactRouterHydrationPayload,
	summarizeRuleProfileCoverage,
	type RuleProfileCase,
} from '@/lib/detection/rule-performance-profile';
import { technologyDefinitions } from '@/registry/technologies';
import { RULE_PERFORMANCE_FIXTURES } from '../tests/support/rule-performance-fixtures';

const ENABLE_REGISTRY_WIDE_SCAN = process.env.KAIJU_DEEPSCOPE_RULE_BENCH_REGISTRY_SCAN === '1';
const ENABLE_GENERATED_PASS_SCAN = process.env.KAIJU_DEEPSCOPE_RULE_BENCH_GENERATED_PASS_SCAN === '1';
const registry = technologyDefinitions;
const curatedCases = createCuratedRuleProfileCases({ registry, fixtures: RULE_PERFORMANCE_FIXTURES });
const generatedMissCases = createGeneratedRuleMissCases(registry);
const generatedPassCases = createGeneratedRulePassCases(registry);
const coverage = summarizeRuleProfileCoverage({
	registry,
	generatedMissCases,
	generatedPassCases,
	curatedFixtures: RULE_PERFORMANCE_FIXTURES,
});

/** Consume semantic results so the benchmark cannot discard the matcher work. */
function consume(value: number): void {
	do_not_optimize(value);
}

/** Evaluate a fixed case set once. Mitata owns timing, warmup, and sampling policy. */
function evaluate(cases: readonly RuleProfileCase[]): void {
	let matches = 0;
	for (const profileCase of cases) {
		if (evaluateRuleProfileCase(profileCase)) matches += 1;
	}
	consume(matches);
}

/**
 * Measure semantic rule evaluation without nesting another wall-clock profiler.
 *
 * Correctness belongs to `rule-performance-fixtures.test.ts`. This file only
 * measures representative matcher work, so workstation timing noise cannot turn
 * a semantic regression test red or double-count warmup/sample loops.
 */
for (const profileCase of curatedCases) {
	bench(`curated / ${profileCase.scenario}`, () => evaluate([profileCase]));
}

bench(`generated misses across ${generatedMissCases.length} registry rules`, () => {
	evaluate(generatedMissCases);
});

if (ENABLE_GENERATED_PASS_SCAN) {
	bench(`generated passes across ${generatedPassCases.length} structural rules`, () => {
		evaluate(generatedPassCases);
	});
}

if (ENABLE_REGISTRY_WIDE_SCAN) {
	const reactRouterCases = createPayloadScanCases({
		registry,
		scenario: 'react-router-hydration-miss',
		payload: makeReactRouterHydrationPayload(),
	});
	const nextCases = createPayloadScanCases({
		registry,
		scenario: 'next-hydration-miss',
		payload: makeNextHydrationPayload(),
	});

	bench(`React Router hydration miss across ${reactRouterCases.length} content rules`, () => {
		evaluate(reactRouterCases);
	});
	bench(`Next hydration miss across ${nextCases.length} content rules`, () => {
		evaluate(nextCases);
	});
}


console.log('[kaiju-deepscope][rule-benchmark] coverage', {
	technologies: coverage.technologyCount,
	rules: coverage.ruleCount,
	generatedMissCases: coverage.generatedMissCaseCount,
	generatedPassCases: coverage.generatedPassCaseCount,
	curatedFixtures: coverage.curatedFixtureCount,
});
