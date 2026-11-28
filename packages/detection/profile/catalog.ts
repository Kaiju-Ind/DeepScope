import type { TechnologyDefinition } from "@deepscope/registry/types";
import type { RuleProfileCase, RulePerformanceFixture, RuleProfileCoverageSummary, RuleProfileTarget } from "./types.ts";
import type { DetectionRule } from "@deepscope/registry/rules";

/** Build coverage counters for the registry-wide rule profile. */
export function summarizeRuleProfileCoverage(input: {
	readonly registry: readonly TechnologyDefinition[];
	readonly generatedMissCases: readonly RuleProfileCase[];
	readonly generatedPassCases: readonly RuleProfileCase[];
	readonly curatedFixtures: readonly RulePerformanceFixture[];
}): RuleProfileCoverageSummary {
	return {
		technologyCount: input.registry.length,
		ruleCount: countRegistryRules(input.registry),
		generatedMissCaseCount: input.generatedMissCases.length,
		generatedPassCaseCount: input.generatedPassCases.length,
		generatedMissUncoveredRuleCount: countRegistryRules(input.registry) - input.generatedMissCases.length,
		generatedPassUncoveredRuleCount: countRegistryRules(input.registry) - input.generatedPassCases.length,
		curatedFixtureCount: input.curatedFixtures.length,
	};
}

/** Collect every rule in registry order with a stable report id. */
export function collectRuleProfileTargets(
	registry: readonly TechnologyDefinition[],
): readonly RuleProfileTarget[] {
	const targets: RuleProfileTarget[] = [];
	for (const technology of registry) {
		for (const [ruleIndex, rule] of technology.rules.entries()) {
			targets.push({
				technology,
				rule,
				ruleIndex: getRuleSourceIndex(rule, ruleIndex),
				ruleId: getRuleId(rule, ruleIndex),
			});
		}
	}
	return targets;
}

/** Resolve a hand-authored fixture to a concrete registry rule. */
export function findRuleProfileTarget(
	registry: readonly TechnologyDefinition[],
	technologyId: string,
	ruleId: string,
): RuleProfileTarget {
	const technology = registry.find((candidate) => candidate.id === technologyId);
	if (!technology) {
		throw new Error(`Missing technology fixture target: ${technologyId}`);
	}

	const ruleIndex = technology.rules.findIndex((candidate) => candidate.id === ruleId);
	const rule = technology.rules[ruleIndex];
	if (!rule) {
		throw new Error(`Missing rule fixture target: ${technologyId}/${ruleId}`);
	}

	return {
		technology,
		rule,
		ruleIndex: getRuleSourceIndex(rule, ruleIndex),
		ruleId: getRuleId(rule, ruleIndex),
	};
}

/** Count the complete declared rule workload before filtering individual profile targets. */
function countRegistryRules(registry: readonly TechnologyDefinition[]): number {
	return registry.reduce((count, technology) => count + technology.rules.length, 0);
}

/** Keep an authored rule ID when present and otherwise use its deterministic registry position. */
function getRuleId(rule: DetectionRule, ruleIndex: number): string {
	return rule.id ?? `rule:${ruleIndex}`;
}

/** Prefer a generated shard's full-registry position over the local array index for source attribution. */
function getRuleSourceIndex(rule: DetectionRule, fallbackRuleIndex: number): number {
	return typeof rule.sourceRuleIndex === 'number' ? rule.sourceRuleIndex : fallbackRuleIndex;
}
