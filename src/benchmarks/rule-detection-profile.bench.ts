import { afterAll, bench, describe } from 'vitest';

import {
	createCuratedRuleProfileCases,
	createGeneratedRuleMissCases,
	createGeneratedRulePassCases,
	createPayloadScanCases,
	findRuleProfileBudgetViolations,
	findRuleProfileExpectationMismatches,
	formatRuleTimingRecord,
	makeNextHydrationPayload,
	makeReactRouterHydrationPayload,
	profileRuleCase,
	readRuleProfileBudgets,
	recordSlowRule,
	summarizeRuleProfileCoverage,
	type RuleProfileCase,
	type RuleTimingRecord,
} from '@/lib/detection/rule-performance-profile';
import { technologyDefinitions } from '@/registry/technologies';
import { RULE_PERFORMANCE_FIXTURES } from '../tests/support/rule-performance-fixtures';

const BENCHMARK_OPTIONS = {
	time: 250,
	warmupTime: 0,
	iterations: 1,
	warmupIterations: 0,
} as const;

const ENABLE_REGISTRY_WIDE_SCAN = process.env.KAIJU_SITE_SCOPE_RULE_BENCH_REGISTRY_SCAN === '1';
const ENABLE_GENERATED_PASS_SCAN = process.env.KAIJU_SITE_SCOPE_RULE_BENCH_GENERATED_PASS_SCAN === '1';
const registry = technologyDefinitions;
const budgets = readRuleProfileBudgets(process.env);
const curatedCases = createCuratedRuleProfileCases({
	registry,
	fixtures: RULE_PERFORMANCE_FIXTURES,
});
const generatedMissCases = createGeneratedRuleMissCases(registry);
const generatedPassCases = createGeneratedRulePassCases(registry);
const coverage = summarizeRuleProfileCoverage({
	registry,
	generatedMissCases,
	generatedPassCases,
	curatedFixtures: RULE_PERFORMANCE_FIXTURES,
});

let consumedMatchState = 0;
const slowestByKey = new Map<string, RuleTimingRecord>();

describe('rule detection profile', () => {
	describe('curated passing and failing samples', () => {
		for (const profileCase of curatedCases) {
			bench(profileCase.scenario, () => {
				consumeProfiledCase(profileCase);
			}, BENCHMARK_OPTIONS);
		}
	});

	describe('registry-wide generated misses', () => {
		bench(`generated miss coverage across ${generatedMissCases.length} registry rules`, () => {
			consumeProfiledCases(generatedMissCases);
		}, BENCHMARK_OPTIONS);
	});

	if (ENABLE_GENERATED_PASS_SCAN) {
		describe('registry-wide generated passes', () => {
			bench(`generated pass coverage across ${generatedPassCases.length} structural registry rules`, () => {
				consumeProfiledCases(generatedPassCases);
			}, BENCHMARK_OPTIONS);
		});
	}

	if (ENABLE_REGISTRY_WIDE_SCAN) {
		describe('registry-wide failing hydration scans', () => {
			const reactRouterHydrationMissCases = createPayloadScanCases({
				registry,
				scenario: 'react-router-hydration-miss',
				payload: makeReactRouterHydrationPayload(),
			});
			const nextHydrationMissCases = createPayloadScanCases({
				registry,
				scenario: 'next-hydration-miss',
				payload: makeNextHydrationPayload(),
			});

			bench(`React Router hydration miss across ${reactRouterHydrationMissCases.length} content rules`, () => {
				consumeProfiledCases(reactRouterHydrationMissCases);
			}, BENCHMARK_OPTIONS);

			bench(`Next hydration miss across ${nextHydrationMissCases.length} content rules`, () => {
				consumeProfiledCases(nextHydrationMissCases);
			}, BENCHMARK_OPTIONS);
		});
	}
});

afterAll(() => {
	const slowest = [...slowestByKey.values()]
		.sort((left, right) => right.durationMs - left.durationMs)
		.slice(0, budgets.reportLimit);
	const records = [...slowestByKey.values()];
	const expectationMismatches = findRuleProfileExpectationMismatches(records)
		.slice(0, budgets.reportLimit);
	const budgetViolations = findRuleProfileBudgetViolations(records, budgets)
		.slice(0, budgets.reportLimit);

	console.log('\n[kaiju-site-scope][rule-profile] coverage');
	console.log([
		`technologies=${coverage.technologyCount}`,
		`rules=${coverage.ruleCount}`,
		`generatedMissCases=${coverage.generatedMissCaseCount}`,
		`generatedMissUncoveredRules=${coverage.generatedMissUncoveredRuleCount}`,
		`generatedPassCases=${coverage.generatedPassCaseCount}`,
		`generatedPassUncoveredRules=${coverage.generatedPassUncoveredRuleCount}`,
		`curatedFixtures=${coverage.curatedFixtureCount}`,
		`passBudgetMs=${budgets.passBudgetMs}`,
		`missBudgetMs=${budgets.missBudgetMs}`,
		`failOnBudget=${budgets.failOnBudget}`,
	].join(' '));

	if (slowest.length > 0) {
		console.log('\n[kaiju-site-scope][rule-profile] slowest rule evaluations');
		for (const record of slowest) {
			console.log(formatRuleTimingRecord(record));
		}
	}

	if (expectationMismatches.length > 0) {
		console.log('\n[kaiju-site-scope][rule-profile] expectation mismatches');
		for (const record of expectationMismatches) {
			console.log(formatRuleTimingRecord(record));
		}
		throw new Error(`Rule profile expectations failed for ${expectationMismatches.length} evaluated rules.`);
	}

	if (budgetViolations.length === 0) {
		return;
	}

	console.log('\n[kaiju-site-scope][rule-profile] budget violations');
	for (const record of budgetViolations) {
		console.log(formatRuleTimingRecord(record));
	}

	if (budgets.failOnBudget) {
		throw new Error(`Rule performance budget exceeded by ${budgetViolations.length} profiled evaluations.`);
	}
});

function consumeProfiledCases(cases: readonly RuleProfileCase[]): void {
	let matchCount = 0;
	for (const profileCase of cases) {
		const record = profileRuleCase(profileCase);
		recordSlowRule(slowestByKey, record);
		if (record.matched) {
			matchCount += 1;
		}
	}
	consumeMatchState(matchCount);
}

function consumeProfiledCase(profileCase: RuleProfileCase): void {
	const record = profileRuleCase(profileCase);
	recordSlowRule(slowestByKey, record);
	consumeMatchState(record.matched ? 1 : 0);
}

function consumeMatchState(value: number): void {
	consumedMatchState = (consumedMatchState + value) % Number.MAX_SAFE_INTEGER;
}
