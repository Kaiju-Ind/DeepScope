import type { NormalizedObservation } from "../observations/index.ts";
import type { DetectionPatternType, DetectionRule } from "@deepscope/registry/rules";
import { requiredLiteral } from "./extract.ts";

/**
 * Literal gates for keyed and fallback value rules.
 *
 * Cookie, header, meta and DNS rules are routed by key (or only by kind), and
 * then run a regex over one string of the observation. A gate is the required
 * literal of that regex (see `extract.ts`), computed when the index is built
 * and checked against the lowercased string before the regex runs. A rule
 * whose gate is absent cannot match, so skipping it changes nothing; the
 * regex is then never compiled either.
 *
 * Invariant: `gatePattern(rule)` is the only regex the semantic matcher
 * (`observation-matcher.ts`) tests against `gateSubject(rule, observation)`
 * for a rule to match, and every route of these rule kinds uses that matcher.
 * Rules whose match does not need the regex (a header rule without
 * `valuePattern`, a meta rule without a pattern) get no gate.
 */

/** The regex a gated rule must match, or `undefined` when the rule kind is not gated. */
export function gatePattern(rule: DetectionRule): DetectionPatternType | undefined {
	switch (rule.kind) {
		case 'cookie':
			return rule.keyPattern;
		case 'header':
		case 'responseHeader':
		case 'requestHeader':
		case 'dns':
			return rule.valuePattern;
		case 'meta':
			return rule.valuePattern ?? rule.pattern;
		default:
			return undefined;
	}
}

/** Lowercase literal a rule's subject must contain, or `undefined` when none is provable. */
export function gate(rule: DetectionRule): string | undefined {
	return requiredLiteral(gatePattern(rule));
}

/** The string `gatePattern(rule)` is tested against: the cookie name, or the observation value. */
export function gateSubject(rule: DetectionRule, observation: NormalizedObservation): string {
	return rule.kind === 'cookie' ? observation.key ?? '' : String(observation.value);
}
