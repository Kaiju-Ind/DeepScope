import type { NormalizedObservation } from "../../observations/index.ts";
import { tableFor, scan } from "../../match/literal.ts";
import type { ObservationMatcherIndex, LiteralPrefilterResult, LiteralPrefilteredObservationRule } from "./types.ts";

/** Scan one observation value once for all required literals, preserving bucket order and reporting rules rejected before regex work. */
export function findLiteralPrefilteredRules(
	index: ObservationMatcherIndex,
	observation: NormalizedObservation,
): LiteralPrefilterResult {
	const rules = index.literalRules[observation.kind] ?? [];
	if (rules.length === 0) {
		return { rules, rejectedCount: 0 };
	}

	// One scan of the value answers `value.includes(literal)` for every literal
	// in the bucket at once (see `match/literal.ts` for the exactness argument).
	const value = String(observation.value).toLowerCase();
	const scanner = tableFor(rules);
	const found = scan(scanner, value);
	const ids = scanner.ids;
	const matched: LiteralPrefilteredObservationRule[] = [];
	let rejectedCount = 0;
	for (let position = 0; position < rules.length; position += 1) {
		if (found[ids[position]!] === 1) {
			matched.push(rules[position]!);
		} else {
			rejectedCount += 1;
		}
	}

	return { rules: matched, rejectedCount };
}

/** Build every literal bucket's scanner now, so the first observation does not pay for it. */
export function prepareLiteralScanners(index: ObservationMatcherIndex): ObservationMatcherIndex {
	for (const rules of Object.values(index.literalRules)) {
		if (rules && rules.length > 0) tableFor(rules);
	}
	return index;
}
