import {
	createObservationMatcherIndex,
	type IndexedObservationRule,
	type LiteralPrefilteredObservationRule,
	type ObservationMatcherIndex,
} from '../detection/observation-matcher-index';
import type { DetectionRule, MatcherTechnologyType } from '../detection/types';
import type { NormalizedObservationKind } from '../observations';

/** Minimal compiled product required inside a dedicated matcher worker. */
export interface CompiledMatcherRegistryArtifact {
	/** Narrow technology records that contain only identity and rules for this shard. */
	readonly technologies: readonly MatcherTechnologyType[];
	/** Kind/key/literal routes used to avoid unrelated semantic rule evaluation. */
	readonly matcherIndex: ObservationMatcherIndex;
}

/** Compact pointer from generated route data back into the shard's technology/rule arrays. */
export interface PackagedMatcherRuleReference {
	/** Index into the shard `technologies` array. */
	readonly technologyIndex: number;
	/** Local index into that technology's narrowed `rules` array. */
	readonly localRuleIndex: number;
	/** Source registry rule index preserved for evidence identity and diagnostics. */
	readonly ruleIndex: number;
	/** Original global rule sequence used to preserve deterministic match ordering. */
	readonly sequence: number;
	/** Conservative literal required before semantic regex evaluation, when available. */
	readonly requiredLiteral?: string;
}

/** Generated route tables that contain only numeric references, never duplicated rule objects. */
export interface PackagedMatcherIndex {
	readonly technologyCount: number;
	readonly ruleCount: number;
	readonly fallbackRules: Partial<Record<NormalizedObservationKind, readonly PackagedMatcherRuleReference[]>>;
	readonly keyedRules: Partial<Record<NormalizedObservationKind, Readonly<Record<string, readonly PackagedMatcherRuleReference[]>>>>;
	readonly literalRules: Partial<Record<NormalizedObservationKind, readonly PackagedMatcherRuleReference[]>>;
}

/** Compile one matcher shard without graphs, collection plans, metadata tables, or source maps. */
export function compileMatcherRegistry(
	technologies: readonly MatcherTechnologyType[],
): CompiledMatcherRegistryArtifact {
	return {
		technologies,
		matcherIndex: createObservationMatcherIndex(technologies),
	};
}

/**
 * Convert an executable matcher index into JSON-safe references during the extension build.
 *
 * Emitting references instead of complete indexed-rule objects is important. The latter
 * repeat technology and rule data in every route bucket and would make the packaged shard
 * substantially larger than the source registry it is intended to narrow.
 */
export function packageMatcherIndex(
	technologies: readonly MatcherTechnologyType[],
	matcherIndex: ObservationMatcherIndex = createObservationMatcherIndex(technologies),
): PackagedMatcherIndex {
	const references = createRuleReferenceLookup(technologies);
	return {
		technologyCount: matcherIndex.technologyCount,
		ruleCount: matcherIndex.ruleCount,
		fallbackRules: mapRuleBuckets(matcherIndex.fallbackRules, references),
		keyedRules: mapKeyBuckets(matcherIndex.keyedRules, references),
		literalRules: mapLiteralBuckets(matcherIndex.literalRules, references),
	};
}

/**
 * Rehydrate generated matcher routes by reconnecting references to shared shard objects.
 *
 * Runtime workers do no registry walk here. This operation only maps small numeric route
 * references back to the already hydrated technology/rule arrays, so build-time routing
 * decisions remain the executable source of truth.
 */
export function hydrateMatcherIndex(
	technologies: readonly MatcherTechnologyType[],
	packaged: PackagedMatcherIndex,
): ObservationMatcherIndex {
	return {
		technologyCount: packaged.technologyCount,
		ruleCount: packaged.ruleCount,
		fallbackRules: hydrateRuleBuckets(packaged.fallbackRules, technologies),
		keyedRules: hydrateKeyBuckets(packaged.keyedRules, technologies),
		literalRules: hydrateLiteralBuckets(packaged.literalRules, technologies),
	};
}

/** Internal lookup from the exact build-time rule object to its shard-local coordinates. */
type RuleReferenceLookup = ReadonlyMap<DetectionRule, { readonly technologyIndex: number; readonly localRuleIndex: number }>;

/** Build one identity lookup without changing source rule indices carried by narrowed rules. */
function createRuleReferenceLookup(technologies: readonly MatcherTechnologyType[]): RuleReferenceLookup {
	const lookup = new Map<DetectionRule, { readonly technologyIndex: number; readonly localRuleIndex: number }>();
	for (const [technologyIndex, technology] of technologies.entries()) {
		for (const [localRuleIndex, rule] of technology.rules.entries()) {
			lookup.set(rule, { technologyIndex, localRuleIndex });
		}
	}
	return lookup;
}

/** Package one indexed rule and fail the build if the index no longer references its shard. */
function packageRule(
	rule: IndexedObservationRule | LiteralPrefilteredObservationRule,
	lookup: RuleReferenceLookup,
): PackagedMatcherRuleReference {
	const reference = lookup.get(rule.rule);
	if (!reference) throw new Error(`Matcher index contains an unowned rule for technology ${rule.technology.id}.`);
	return {
		...reference,
		ruleIndex: rule.ruleIndex,
		sequence: rule.sequence,
		...('requiredLiteral' in rule ? { requiredLiteral: rule.requiredLiteral } : {}),
	};
}

/** Convert fallback kind buckets to compact route references. */
function mapRuleBuckets(
	buckets: ObservationMatcherIndex['fallbackRules'],
	lookup: RuleReferenceLookup,
): PackagedMatcherIndex['fallbackRules'] {
	return Object.fromEntries(Object.entries(buckets).map(([kind, rules]) => [
		kind,
		(rules ?? []).map((rule) => packageRule(rule, lookup)),
	])) as PackagedMatcherIndex['fallbackRules'];
}

/** Convert exact-key route buckets to compact route references. */
function mapKeyBuckets(
	buckets: ObservationMatcherIndex['keyedRules'],
	lookup: RuleReferenceLookup,
): PackagedMatcherIndex['keyedRules'] {
	return Object.fromEntries(Object.entries(buckets).map(([kind, keys]) => [
		kind,
		Object.fromEntries(Object.entries(keys ?? {}).map(([key, rules]) => [
			key,
			(rules ?? []).map((rule) => packageRule(rule, lookup)),
		])),
	])) as PackagedMatcherIndex['keyedRules'];
}

/** Convert literal-prefilter route buckets to compact route references. */
function mapLiteralBuckets(
	buckets: ObservationMatcherIndex['literalRules'],
	lookup: RuleReferenceLookup,
): PackagedMatcherIndex['literalRules'] {
	return Object.fromEntries(Object.entries(buckets).map(([kind, rules]) => [
		kind,
		(rules ?? []).map((rule) => packageRule(rule, lookup)),
	])) as PackagedMatcherIndex['literalRules'];
}

/** Resolve one packaged route and preserve the exact shared technology/rule identities. */
function hydrateRule(
	reference: PackagedMatcherRuleReference,
	technologies: readonly MatcherTechnologyType[],
): IndexedObservationRule {
	const technology = technologies[reference.technologyIndex];
	const rule = technology?.rules[reference.localRuleIndex];
	if (!technology || !rule) {
		throw new Error(`Packaged matcher route references missing rule ${reference.technologyIndex}:${reference.localRuleIndex}.`);
	}
	return { technology, rule, ruleIndex: reference.ruleIndex, sequence: reference.sequence };
}

/** Rehydrate fallback kind buckets. */
function hydrateRuleBuckets(
	buckets: PackagedMatcherIndex['fallbackRules'],
	technologies: readonly MatcherTechnologyType[],
): ObservationMatcherIndex['fallbackRules'] {
	return Object.fromEntries(Object.entries(buckets).map(([kind, rules]) => [
		kind,
		(rules ?? []).map((reference) => hydrateRule(reference, technologies)),
	])) as ObservationMatcherIndex['fallbackRules'];
}

/** Rehydrate exact-key route buckets. */
function hydrateKeyBuckets(
	buckets: PackagedMatcherIndex['keyedRules'],
	technologies: readonly MatcherTechnologyType[],
): ObservationMatcherIndex['keyedRules'] {
	return Object.fromEntries(Object.entries(buckets).map(([kind, keys]) => [
		kind,
		Object.fromEntries(Object.entries(keys ?? {}).map(([key, rules]) => [
			key,
			(rules ?? []).map((reference) => hydrateRule(reference, technologies)),
		])),
	])) as ObservationMatcherIndex['keyedRules'];
}

/** Rehydrate literal-prefilter buckets and restore their required literal. */
function hydrateLiteralBuckets(
	buckets: PackagedMatcherIndex['literalRules'],
	technologies: readonly MatcherTechnologyType[],
): ObservationMatcherIndex['literalRules'] {
	return Object.fromEntries(Object.entries(buckets).map(([kind, rules]) => [
		kind,
		(rules ?? []).map((reference) => ({
			...hydrateRule(reference, technologies),
			requiredLiteral: reference.requiredLiteral ?? '',
		})),
	])) as ObservationMatcherIndex['literalRules'];
}
