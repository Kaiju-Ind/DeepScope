import type { NormalizedObservation } from "../../observations/index.ts";
import type { ObservationMatcherIndex, IndexedObservationRule } from "./types.ts";
import { findLiteralPrefilteredRules } from "./literal.ts";
import { mergeRuleBucketList } from "./buckets.ts";
import * as dictionary from "../../observations/dictionary.ts";
import { getObservationRouteKeys } from "./keys.ts";

/**
 * Return candidate rules for one observation without changing match semantics.
 *
 * Exact-key, literal-prefiltered, and fallback buckets are merged by original
 * registry sequence. This avoids the subtle bug where one routing class would
 * appear before another, which would break version and evidence ordering
 * compared with the sequential matcher.
 */
export function findIndexedObservationRules(
	index: ObservationMatcherIndex,
	observation: NormalizedObservation,
): readonly IndexedObservationRule[] {
	return findIndexedObservationRulesWithDiagnostics(index, observation).rules;
}

/** Merge exact-key, literal and fallback candidates in original rule sequence while exposing admission counters. */
export function findIndexedObservationRulesWithDiagnostics(
	index: ObservationMatcherIndex,
	observation: NormalizedObservation,
): {
	readonly rules: readonly IndexedObservationRule[];
	readonly keyedRuleCount: number;
	readonly fallbackRuleCount: number;
	readonly literalRuleCount: number;
	readonly literalRejectedRuleCount: number;
} {
	const fallbackRules = index.fallbackRules[observation.kind] ?? [];
	const keyedRules = findKeyedObservationRules(index, observation);
	const literalRoute = findLiteralPrefilteredRules(index, observation);
	const rules = mergeRuleBucketList([keyedRules, literalRoute.rules, fallbackRules]);

	return {
		rules,
		keyedRuleCount: keyedRules.length,
		fallbackRuleCount: fallbackRules.length,
		literalRuleCount: literalRoute.rules.length,
		literalRejectedRuleCount: literalRoute.rejectedCount,
	};
}

/** Merge all exact-key buckets that can match one observation. */
function findKeyedObservationRules(
	index: ObservationMatcherIndex,
	observation: NormalizedObservation,
): readonly IndexedObservationRule[] {
	const kindBuckets = index.keyedRules[observation.kind];
	if (!kindBuckets) {
		return [];
	}

	const keys = getObservationRouteKeys(observation);
	return mergeRuleBucketList(keys.map((key) => dictionary.get(kindBuckets, key) ?? []));
}
