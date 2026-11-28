import type { TechnologyDefinition } from "@deepscope/registry/types";
import type { DetectionRule } from "@deepscope/registry/rules";
import type { NormalizedObservation, NormalizedObservationKind } from "../observations/index.ts";

/** Kind of semantic outcome a rule-profile case is expected to produce. */
export type RuleProfileExpectedOutcome = 'match' | 'miss';

/** Source of a benchmark case. */
export type RuleProfileCaseOrigin = 'curated' | 'generated' | 'payload-scan';

/** Registry rule paired with its owning technology and stable source order. */
export interface RuleProfileTarget {
	/** Technology that owns the profiled rule. */
	readonly technology: TechnologyDefinition;
	/** Rule evaluated by the benchmark case. */
	readonly rule: DetectionRule;
	/** Rule index inside the owning technology definition. */
	readonly ruleIndex: number;
	/** Stable rule identifier used in reports and budget failures. */
	readonly ruleId: string;
}

/** One rule benchmark case with a concrete observation and expected result. */
export interface RuleProfileCase {
	/** Rule target evaluated by the case. */
	readonly target: RuleProfileTarget;
	/** Stable scenario label printed by Vitest and slow-rule reports. */
	readonly scenario: string;
	/** Whether the case should match or miss when the rule behaves correctly. */
	readonly expected: RuleProfileExpectedOutcome;
	/** Whether the case came from a hand-authored fixture or generated coverage. */
	readonly origin: RuleProfileCaseOrigin;
	/** Observation fed directly into the semantic one-rule matcher. */
	readonly observation: NormalizedObservation;
}

/** Timed result from one semantic rule evaluation. */
export interface RuleTimingRecord {
	/** Unique key for deduping repeated benchmark measurements of the same scenario. */
	readonly key: string;
	/** Stable scenario label printed by reports. */
	readonly scenario: string;
	/** Origin of the benchmark case. */
	readonly origin: RuleProfileCaseOrigin;
	/** Technology that owns the evaluated rule. */
	readonly technologyId: string;
	/** Rule identifier reported in diagnostics. */
	readonly ruleId: string;
	/** Observation kind evaluated by the rule. */
	readonly kind: NormalizedObservationKind;
	/** Expected semantic outcome for the case. */
	readonly expected: RuleProfileExpectedOutcome;
	/** Actual semantic outcome from the matcher. */
	readonly matched: boolean;
	/** Median matcher duration used for stable budget decisions. */
	readonly durationMs: number;
	/** Slowest warmed sample retained for diagnostics only. */
	readonly maxDurationMs: number;
	/** Number of warmed matcher samples summarized by this record. */
	readonly sampleCount: number;
}

/** Runtime budgets used to decide which rule timings deserve attention. */
export interface RuleProfileBudgets {
	/** Duration budget for cases expected to match. */
	readonly passBudgetMs: number;
	/** Duration budget for cases expected to miss. */
	readonly missBudgetMs: number;
	/** Number of rows printed for slowest-rule and budget reports. */
	readonly reportLimit: number;
	/** Whether a budget violation should fail the benchmark process. */
	readonly failOnBudget: boolean;
}

/** Summary of generated benchmark coverage for the current registry. */
export interface RuleProfileCoverageSummary {
	/** Number of technologies represented in the scanned registry. */
	readonly technologyCount: number;
	/** Number of rules represented in the scanned registry. */
	readonly ruleCount: number;
	/** Number of generated miss cases created for registry rules. */
	readonly generatedMissCaseCount: number;
	/** Number of generated pass cases created for rules with safe structural fixtures. */
	readonly generatedPassCaseCount: number;
	/** Rules whose match shape cannot safely produce a generated miss case. */
	readonly generatedMissUncoveredRuleCount: number;
	/** Rules whose match shape cannot safely produce a generated pass case. */
	readonly generatedPassUncoveredRuleCount: number;
	/** Number of hand-authored benchmark fixtures loaded by the caller. */
	readonly curatedFixtureCount: number;
}

/** Hand-authored performance fixture consumed by benchmark and regression tests. */
export interface RulePerformanceFixture {
	/** Technology that owns the fixture target. */
	readonly technologyId: string;
	/** Rule id targeted by the fixture. */
	readonly ruleId: string;
	/** Observation kind produced by the fixture. */
	readonly kind: NormalizedObservationKind;
	/** Value expected to make the rule match. */
	readonly passValue: string;
	/** Value expected to make the rule miss. */
	readonly failValue: string;
	/** Extra miss samples that protect near-match false positives for risky rules. */
	readonly additionalFailValues?: readonly RulePerformanceFailValue[];
	/** Human-readable note that explains the performance risk being profiled. */
	readonly note: string;
}

/** Named miss sample used when one hydration blob is not enough to protect rule accuracy. */
export interface RulePerformanceFailValue {
	/** Short label appended to the benchmark scenario and failure diagnostics. */
	readonly label: string;
	/** Value expected to miss the targeted rule. */
	readonly value: string;
}

/** Options for one stable rule timing sample group. */
export type RuleProfileSampleOptions = {
	/** Number of measured samples reduced to one median. */
	readonly samples?: number;
	/** Untimed matcher runs used to warm parser and regex state. */
	readonly warmup?: number;
};
