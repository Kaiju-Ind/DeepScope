import type { RuleProfileCase, RuleProfileSampleOptions, RuleTimingRecord } from "./types.ts";
import { matchObservationRule } from "../matcher/rule.ts";

/**
 * Run one profile case through the production semantic matcher.
 *
 * Budget checks use the median of a small warmed sample group instead of one
 * wall-clock observation. This prevents an unrelated scheduler or GC pause from
 * masquerading as sustained matcher cost while `maxDurationMs` still preserves
 * the outlier for diagnostics.
 */
export function profileRuleCase(
	input: RuleProfileCase,
	options: RuleProfileSampleOptions = {},
): RuleTimingRecord {
	const sampleCount = normalizeSampleCount(options.samples ?? 1);
	const warmupCount = normalizeSampleCount(options.warmup ?? 0, true);
	let matched = false;

	for (let index = 0; index < warmupCount; index += 1) {
		matched = Boolean(matchProfileCase(input));
	}

	const durations: number[] = [];
	for (let index = 0; index < sampleCount; index += 1) {
		const startedAt = performance.now();
		matched = Boolean(matchProfileCase(input));
		durations.push(performance.now() - startedAt);
	}
	durations.sort((left, right) => left - right);
	const durationMs = durations[Math.floor(durations.length / 2)] ?? 0;
	const maxDurationMs = durations[durations.length - 1] ?? durationMs;

	return {
		key: `${input.scenario}:${input.target.technology.id}:${input.target.ruleId}`,
		scenario: input.scenario,
		origin: input.origin,
		technologyId: input.target.technology.id,
		ruleId: input.target.ruleId,
		kind: input.target.rule.kind,
		expected: input.expected,
		matched,
		durationMs,
		maxDurationMs,
		sampleCount,
	};
}

/** Execute one matcher case without adding profiler timing policy. */
function matchProfileCase(input: RuleProfileCase) {
	return matchObservationRule({
		technology: input.target.technology,
		rule: input.target.rule,
		ruleIndex: input.target.ruleIndex,
		observation: input.observation,
	});
}

/** Normalize benchmark sample counts while permitting zero warmup runs. */
function normalizeSampleCount(value: number, allowZero = false): number {
	if (!Number.isFinite(value)) return allowZero ? 0 : 1;
	const normalized = Math.floor(value);
	return Math.max(allowZero ? 0 : 1, normalized);
}
