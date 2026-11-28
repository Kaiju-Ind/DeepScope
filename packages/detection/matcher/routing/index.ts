import type { MatcherTechnologyType } from "@deepscope/registry/types";
import { gate } from "../../match/gate.ts";
import type { ObservationMatcherIndex, MutableRuleBuckets, MutableKeyBuckets, MutableLiteralBuckets, IndexedObservationRule, ObservationRuleRoute } from "./types.ts";
import { prepareLiteralScanners } from "./literal.ts";
import { freezeRuleBuckets, freezeKeyBuckets, freezeLiteralBuckets } from "./buckets.ts";
import type { NormalizedObservationKind } from "../../observations/index.ts";
import type { DetectionRule, PatternDetectionRule } from "@deepscope/registry/rules";
import { canonicalHeaderKey, canonicalLinkRel } from "./keys.ts";
import { requiredLiteral } from "../../match/extract.ts";

/**
 * Build an observation matcher index for a registry snapshot.
 *
 * The returned index is safe to reuse for many observation batches as long as
 * the caller keeps the same registry object and rule order. Rebuilding is cheap
 * enough for tests, but runtime paths should reuse the index when matching
 * several batches from the same compiled registry.
 */
export function createObservationMatcherIndex(
	registry: readonly MatcherTechnologyType[],
): ObservationMatcherIndex {
	const fallbackRules: MutableRuleBuckets = Object.create(null) as MutableRuleBuckets;
	const keyedRules: MutableKeyBuckets = Object.create(null) as MutableKeyBuckets;
	const literalRules: MutableLiteralBuckets = Object.create(null) as MutableLiteralBuckets;
	let sequence = 0;

	for (const technology of registry) {
		for (const [ruleIndex, rule] of technology.rules.entries()) {
			const sourceRuleIndex = getRuleSourceIndex(rule, ruleIndex);
			const literal = gate(rule);
			const indexedRule: IndexedObservationRule = literal === undefined
				? { technology, rule, ruleIndex: sourceRuleIndex, sequence }
				: { technology, rule, ruleIndex: sourceRuleIndex, sequence, gate: literal };
			for (const route of getRuleRoutes(technology.id, sourceRuleIndex, rule)) {
				addIndexedRule({ fallbackRules, keyedRules, literalRules, route, indexedRule });
			}
			sequence += 1;
		}
	}

	return prepareLiteralScanners({
		technologyCount: registry.length,
		ruleCount: sequence,
		fallbackRules: freezeRuleBuckets(fallbackRules),
		keyedRules: freezeKeyBuckets(keyedRules),
		literalRules: freezeLiteralBuckets(literalRules),
	});
}

/** Add one indexed rule to its exact-key bucket, literal-prefilter bucket, or kind fallback bucket. */
function addIndexedRule(input: {
	readonly fallbackRules: MutableRuleBuckets;
	readonly keyedRules: MutableKeyBuckets;
	readonly literalRules: MutableLiteralBuckets;
	readonly route: ObservationRuleRoute;
	readonly indexedRule: IndexedObservationRule;
}): void {
	if (input.route.key !== undefined) {
		const keyBuckets = input.keyedRules[input.route.kind]
			?? (input.keyedRules[input.route.kind] = Object.create(null) as Record<string, IndexedObservationRule[]>);
		const rules = keyBuckets[input.route.key] ?? (keyBuckets[input.route.key] = []);
		rules.push(input.indexedRule);
		return;
	}

	if (input.route.requiredLiteral !== undefined) {
		const rules = input.literalRules[input.route.kind] ?? (input.literalRules[input.route.kind] = []);
		rules.push(Object.assign({}, input.indexedRule, { requiredLiteral: input.route.requiredLiteral }));
		return;
	}

	pushRule(input.fallbackRules, input.route.kind, input.indexedRule);
}

/** Append a rule to a mutable observation-kind bucket. */
function pushRule(
	buckets: MutableRuleBuckets,
	kind: NormalizedObservationKind,
	rule: IndexedObservationRule,
): void {
	const rules = buckets[kind] ?? (buckets[kind] = []);
	rules.push(rule);
}

/**
 * Convert one detection rule into the observation routes it can receive.
 *
 * `html` and `responseHeader` intentionally fan out. HTML rules can match the
 * full HTML observation or a bounded `htmlMatch` probe, and response-header
 * rules remain compatible with current snapshots that normalize background
 * response headers as `header` observations.
 */
function getRuleRoutes(
	technologyId: string,
	ruleIndex: number,
	rule: DetectionRule,
): readonly ObservationRuleRoute[] {
	switch (rule.kind) {
		case 'dom':
			return [{ kind: 'dom', key: rule.selector }];
		case 'cookie':
			return [{ kind: 'cookie', key: rule.key }];
		case 'header':
		case 'requestHeader':
			return [{ kind: rule.kind, key: canonicalHeaderKey(rule.key) }];
		case 'responseHeader':
			return [
				{ kind: 'responseHeader', key: canonicalHeaderKey(rule.key) },
				{ kind: 'header', key: canonicalHeaderKey(rule.key) },
			];
		case 'meta':
			return [{ kind: 'meta', key: canonicalHeaderKey(rule.key) }];
		case 'jsGlobal':
			return [{ kind: 'jsGlobal', key: rule.property }];
		case 'storage':
			return [{ kind: 'storage', key: rule.key }];
		case 'link':
			return [createLinkRoute(rule)];
		case 'dns':
			return [{ kind: 'dns' }];
		case 'html':
			return [
				createPatternRoute(rule),
				{ kind: 'htmlMatch', key: htmlProbeKey(technologyId, ruleIndex) },
			];
		default:
			return [createPatternRoute(rule)];
	}
}

/**
 * Route link rules by the relation token when one is declared.
 *
 * Link observations preserve `rel` as their key. Most link rules constrain that
 * field, so routing them through the generic fallback bucket makes every link
 * evaluate every link rule. Rules without `rel` can still use an href literal
 * prefilter because the observation value is the link URL.
 */
function createLinkRoute(rule: Extract<DetectionRule, { kind: 'link' }>): ObservationRuleRoute {
	if (rule.rel) {
		return { kind: 'link', key: canonicalLinkRel(rule.rel) };
	}

	const literal = requiredLiteral(rule.hrefPattern);
	return literal
		? { kind: 'link', requiredLiteral: literal }
		: { kind: 'link' };
}

/** Use a proven required literal only for supported scalar kinds; all other patterns retain their fallback route. */
function createPatternRoute(rule: PatternDetectionRule): ObservationRuleRoute {
	const literal = isLiteralPrefilterSupported(rule.kind)
		? requiredLiteral(rule.pattern)
		: undefined;

	return literal
		? { kind: rule.kind, requiredLiteral: literal }
		: { kind: rule.kind };
}

/**
 * Literal prefilters are applied to scalar URL and content observations.
 *
 * The filter is only an admission check: rules whose regex does not expose a
 * provably required literal stay in the fallback bucket and still reach the
 * semantic matcher. This keeps source-heavy observations cheap without changing
 * detection semantics.
 */
function isLiteralPrefilterSupported(kind: NormalizedObservationKind): boolean {
    switch (kind) {
        case 'imageSrc':
        case 'scriptSrc':
        case 'stylesheetHref':
        case 'resourceUrl':
        case 'requestUrl':
        case 'url':
        case 'scriptContent':
        case 'stylesheetContent':
        case 'html':
        case 'text':
            return true;
        default:
            return false;
    }
}

/** Prefer a generated shard's full-registry rule index when one is present. */
function getRuleSourceIndex(rule: DetectionRule, fallbackRuleIndex: number): number {
	return typeof rule.sourceRuleIndex === 'number' ? rule.sourceRuleIndex : fallbackRuleIndex;
}

/** Use the same technology/rule identity as the bounded HTML collector and semantic matcher. */
function htmlProbeKey(technologyId: string, ruleIndex: number): string {
	return `${technologyId}:${ruleIndex}`;
}
