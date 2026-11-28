import type { RuleTimingRecord, RuleProfileBudgets } from "./types.ts";

/** Default report budget for rule evaluations that are expected to match. */
export const DEFAULT_RULE_PROFILE_PASS_BUDGET_MS = 5;

/** Default report budget for rule evaluations that are expected to miss. */
export const DEFAULT_RULE_PROFILE_MISS_BUDGET_MS = 25;

/** Default number of slowest rule rows printed after a benchmark run. */
export const DEFAULT_RULE_PROFILE_REPORT_LIMIT = 20;

/** Keep the slowest timing seen for each scenario and rule pair. */
export function recordSlowRule(
	records: Map<string, RuleTimingRecord>,
	record: RuleTimingRecord,
): void {
	const existing = records.get(record.key);
	if (!existing || record.durationMs > existing.durationMs) {
		records.set(record.key, record);
	}
}

/** Return timing records that exceeded their configured pass or miss budget. */
export function findRuleProfileBudgetViolations(
	records: readonly RuleTimingRecord[],
	budgets: RuleProfileBudgets,
): readonly RuleTimingRecord[] {
	return records
		.filter((record) => record.durationMs > getRecordBudgetMs(record, budgets))
		.sort((left, right) => right.durationMs - left.durationMs);
}

/** Return cases whose actual matcher result did not match the expected result. */
export function findRuleProfileExpectationMismatches(
	records: readonly RuleTimingRecord[],
): readonly RuleTimingRecord[] {
	return records.filter((record) => (record.expected === 'match') !== record.matched);
}

/** Format a timing record as a single grep-friendly diagnostics row. */
export function formatRuleTimingRecord(record: RuleTimingRecord): string {
	return [
		`durationMs=${formatDurationMs(record.durationMs)}`,
		`maxDurationMs=${formatDurationMs(record.maxDurationMs)}`,
		`samples=${record.sampleCount}`,
		`scenario=${quoteReportValue(record.scenario)}`,
		`origin=${record.origin}`,
		`expected=${record.expected}`,
		`matched=${record.matched}`,
		`technologyId=${record.technologyId}`,
		`ruleId=${record.ruleId}`,
		`kind=${record.kind}`,
	].join(' ');
}

/** Keep sub-millisecond matcher costs visible without noisy long decimals. */
function formatDurationMs(value: number): string {
	if (value < 0.01) return value.toFixed(4);
	if (value < 1) return value.toFixed(3);
	return value.toFixed(1);
}

/** Get benchmark budgets from environment variables with safe defaults. */
export function getRuleProfileBudgets(env: Record<string, string | undefined>): RuleProfileBudgets {
	return {
		passBudgetMs: getPositiveNumberEnv(env.KAIJU_DEEPSCOPE_RULE_BENCH_PASS_BUDGET_MS, DEFAULT_RULE_PROFILE_PASS_BUDGET_MS),
		missBudgetMs: getPositiveNumberEnv(env.KAIJU_DEEPSCOPE_RULE_BENCH_MISS_BUDGET_MS, DEFAULT_RULE_PROFILE_MISS_BUDGET_MS),
		reportLimit: getPositiveIntegerEnv(env.KAIJU_DEEPSCOPE_RULE_BENCH_REPORT_LIMIT, DEFAULT_RULE_PROFILE_REPORT_LIMIT),
		failOnBudget: env.KAIJU_DEEPSCOPE_RULE_BENCH_FAIL_ON_BUDGET === '1',
	};
}

/** Select the separate hit or miss timing budget from the case's declared expectation. */
function getRecordBudgetMs(record: RuleTimingRecord, budgets: RuleProfileBudgets): number {
	return record.expected === 'match' ? budgets.passBudgetMs : budgets.missBudgetMs;
}

/** JSON-escape report text so quotes and line breaks cannot corrupt a diagnostic row. */
function quoteReportValue(value: string): string {
	return JSON.stringify(value);
}

/** Use a finite positive numeric override, falling back when configuration is absent or invalid. */
function getPositiveNumberEnv(value: string | undefined, fallback: number): number {
	if (!value) {
		return fallback;
	}

	const parsed = Number.parseFloat(value);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/** Use a finite positive integer override, falling back when configuration is absent or invalid. */
function getPositiveIntegerEnv(value: string | undefined, fallback: number): number {
	if (!value) {
		return fallback;
	}

	const parsed = Number.parseInt(value, 10);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
