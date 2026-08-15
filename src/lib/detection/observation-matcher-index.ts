import type { MatchObservationBatchInput, ObservationPatternMatch, ObservationPatternMatchBatch } from './observation-match-types';
import type { DetectionRule, DetectionRunOptions, TechnologyDefinition } from './types';
import type { NormalizedObservation, NormalizedObservationKind } from '../observations';
import { matchObservationRule } from './observation-matcher';

/**
 * Registry rule prepared for observation-kind and exact-key routing.
 *
 * The matcher keeps the original technology object and rule index so evidence
 * creation stays identical to the sequential matcher. `sequence` records the
 * old nested-loop order, which lets keyed, literal-prefiltered, and fallback
 * buckets merge without changing observable match ordering.
 */
export interface IndexedObservationRule {
	/** Technology that owns the indexed rule. */
	readonly technology: TechnologyDefinition;
	/** Rule evaluated when a compatible observation arrives. */
	readonly rule: DetectionRule;
	/** Rule index inside the owning technology definition. */
	readonly ruleIndex: number;
	/** Global registry order used to preserve sequential matcher ordering. */
	readonly sequence: number;
}

/**
 * Registry rule that carries a literal substring required by its regex source.
 *
 * URL and content rules often contain stable host, path, package, or API-name fragments.
 * Checking one required literal before running the full regex turns most
 * unrelated observations into cheap substring checks while keeping
 * unindexable regexes in the fallback bucket.
 */
export interface LiteralPrefilteredObservationRule extends IndexedObservationRule {
	/** Lowercase substring that must appear in the observation value. */
	readonly requiredLiteral: string;
}

/** Read-only rule buckets keyed by normalized observation kind. */
export type IndexedObservationRuleBuckets = Partial<Record<NormalizedObservationKind, readonly IndexedObservationRule[]>>;

/** Read-only exact-key buckets nested below each normalized observation kind. */
export type IndexedObservationKeyBuckets = Partial<Record<NormalizedObservationKind, Readonly<Record<string, readonly IndexedObservationRule[]>>>>;

/** Read-only literal-prefiltered buckets keyed by normalized observation kind. */
export type IndexedObservationLiteralBuckets = Partial<Record<NormalizedObservationKind, readonly LiteralPrefilteredObservationRule[]>>;

/**
 * Observation matcher index built from the current technology registry.
 *
 * The index does not compile or rewrite rules. It pre-routes rules by the
 * observation surfaces, exact lookup keys, and conservative literal filters that
 * are already implied by the rule regex source, then delegates final semantics
 * to the existing one-rule matcher.
 */
export interface ObservationMatcherIndex {
	/** Number of technologies represented by the index. */
	readonly technologyCount: number;
	/** Number of registry rules represented before observation-kind fan-out. */
	readonly ruleCount: number;
	/** Rules that need only observation-kind routing or pattern checks. */
	readonly fallbackRules: IndexedObservationRuleBuckets;
	/** Rules that can be routed by a normalized observation key before matching. */
	readonly keyedRules: IndexedObservationKeyBuckets;
	/** Regex rules that can skip full evaluation when a required literal is absent. */
	readonly literalRules: IndexedObservationLiteralBuckets;
}

/** Scalar matcher diagnostics safe to emit in timing logs and replay summaries. */
export interface ObservationMatcherDiagnostics {
	/** Number of observations received by the matcher. */
	readonly observationCount: number;
	/** Observations skipped before rule routing because the run disabled their kind. */
	readonly skippedObservationCount: number;
	/** Number of candidate rules passed to the semantic matcher. */
	readonly candidateRuleCount: number;
	/** Number of candidate rules routed from exact-key buckets. */
	readonly keyedRuleCount: number;
	/** Number of candidate rules routed from fallback buckets. */
	readonly fallbackRuleCount: number;
	/** Number of candidate rules admitted by a successful literal prefilter. */
	readonly literalRuleCount: number;
	/** Number of literal-prefiltered rules rejected before regex evaluation. */
	readonly literalRejectedRuleCount: number;
	/** Number of emitted pattern matches. */
	readonly matchCount: number;
	/** Observation counts grouped by normalized observation kind. */
	readonly observationsByKind: Readonly<Record<string, number>>;
	/** Skipped-observation counts grouped by normalized observation kind. */
	readonly skippedObservationsByKind: Readonly<Record<string, number>>;
	/** Candidate-rule counts grouped by normalized observation kind. */
	readonly candidateRulesByKind: Readonly<Record<string, number>>;
}

/** Indexed matcher output with scalar route diagnostics attached. */
export interface IndexedObservationPatternMatchBatch extends ObservationPatternMatchBatch {
	/** Summary of routing work performed before evidence aggregation. */
	readonly diagnostics: ObservationMatcherDiagnostics;
}

/** Input for indexed matching with an optional prebuilt reusable index. */
export interface MatchIndexedObservationBatchInput extends MatchObservationBatchInput {
	/** Existing index to reuse across batches from the same registry. */
	readonly index?: ObservationMatcherIndex;
	/** Optional hot-path hook used by worker diagnostics to identify slow rules. */
	readonly onRuleEvaluation?: (event: ObservationRuleEvaluationEvent) => void;
}

/** Per-rule matcher timing emitted only when callers opt into worker diagnostics. */
export interface ObservationRuleEvaluationEvent {
	/** Technology that owns the evaluated rule. */
	readonly technology: TechnologyDefinition;
	/** Rule evaluated against the observation. */
	readonly rule: DetectionRule;
	/** Rule index inside the owning technology definition. */
	readonly ruleIndex: number;
	/** Global registry order for the evaluated rule. */
	readonly sequence: number;
	/** Observation evaluated against the rule. */
	readonly observation: NormalizedObservation;
	/** Whether the rule emitted a match. */
	readonly matched: boolean;
	/** Milliseconds spent inside the semantic rule matcher. */
	readonly durationMs: number;
}

/** Internal mutable form used while building observation-kind buckets. */
type MutableRuleBuckets = Partial<Record<NormalizedObservationKind, IndexedObservationRule[]>>;

/** Internal mutable form used while building exact-key buckets. */
type MutableKeyBuckets = Partial<Record<NormalizedObservationKind, Record<string, IndexedObservationRule[]>>>;

/** Internal mutable form used while building literal-prefilter buckets. */
type MutableLiteralBuckets = Partial<Record<NormalizedObservationKind, LiteralPrefilteredObservationRule[]>>;

/** Route that places one rule into a kind bucket, exact-key bucket, or literal-prefilter bucket. */
interface ObservationRuleRoute {
	/** Observation kind that can trigger the rule. */
	readonly kind: NormalizedObservationKind;
	/** Canonical key used for exact lookup before running the full rule matcher. */
	readonly key?: string;
	/** Required lowercase substring used to avoid regex work for scalar patterns. */
	readonly requiredLiteral?: string;
}

/** Mutable counters used while matching one observation batch. */
interface MutableObservationMatcherDiagnostics {
	observationCount: number;
	skippedObservationCount: number;
	candidateRuleCount: number;
	keyedRuleCount: number;
	fallbackRuleCount: number;
	literalRuleCount: number;
	literalRejectedRuleCount: number;
	matchCount: number;
	observationsByKind: Record<string, number>;
	skippedObservationsByKind: Record<string, number>;
	candidateRulesByKind: Record<string, number>;
}

/** Literal-prefilter result for one observation. */
interface LiteralPrefilterResult {
	readonly rules: readonly LiteralPrefilteredObservationRule[];
	readonly rejectedCount: number;
}

/** Lookup table for rule kinds disabled before matcher routing begins. */
type DisabledKindLookup = Readonly<Partial<Record<string, true>>>;

/**
 * Build an observation matcher index for a registry snapshot.
 *
 * The returned index is safe to reuse for many observation batches as long as
 * the caller keeps the same registry object and rule order. Rebuilding is cheap
 * enough for tests, but runtime paths should reuse the index when matching
 * several batches from the same compiled registry.
 */
export function createObservationMatcherIndex(
	registry: readonly TechnologyDefinition[],
): ObservationMatcherIndex {
	const fallbackRules: MutableRuleBuckets = Object.create(null) as MutableRuleBuckets;
	const keyedRules: MutableKeyBuckets = Object.create(null) as MutableKeyBuckets;
	const literalRules: MutableLiteralBuckets = Object.create(null) as MutableLiteralBuckets;
	let sequence = 0;

	for (const technology of registry) {
		for (const [ruleIndex, rule] of technology.rules.entries()) {
			const sourceRuleIndex = getRuleSourceIndex(rule, ruleIndex);
			const indexedRule: IndexedObservationRule = { technology, rule, ruleIndex: sourceRuleIndex, sequence };
			for (const route of getRuleRoutes(technology.id, sourceRuleIndex, rule)) {
				addIndexedRule({ fallbackRules, keyedRules, literalRules, route, indexedRule });
			}
			sequence += 1;
		}
	}

	return {
		technologyCount: registry.length,
		ruleCount: sequence,
		fallbackRules: freezeRuleBuckets(fallbackRules),
		keyedRules: freezeKeyBuckets(keyedRules),
		literalRules: freezeLiteralBuckets(literalRules),
	};
}

/**
 * Match observations through a pre-routed registry index.
 *
 * The output shape matches `matchObservationBatch(...)` so downstream evidence,
 * candidate, replay, and popup stages do not need to know whether routing was
 * sequential or indexed. Additional diagnostics describe how much matcher work
 * was avoided before full rule evaluation.
 */
export function matchIndexedObservationBatch(
	input: MatchIndexedObservationBatchInput,
): IndexedObservationPatternMatchBatch {
	const index = input.index ?? createObservationMatcherIndex(input.registry);
	const matches: ObservationPatternMatch[] = [];
	const diagnostics = createMutableMatcherDiagnostics();
	const disabledKinds = createDisabledKindLookup(input.options);

	for (const observation of input.batch.observations) {
		diagnostics.observationCount += 1;
		incrementCount(diagnostics.observationsByKind, observation.kind);

		if (isObservationKindDisabled(observation.kind, disabledKinds)) {
			diagnostics.skippedObservationCount += 1;
			incrementCount(diagnostics.skippedObservationsByKind, observation.kind);
			continue;
		}

		const route = findIndexedObservationRulesWithDiagnostics(index, observation);
		diagnostics.keyedRuleCount += route.keyedRuleCount;
		diagnostics.fallbackRuleCount += route.fallbackRuleCount;
		diagnostics.literalRuleCount += route.literalRuleCount;
		diagnostics.literalRejectedRuleCount += route.literalRejectedRuleCount;
		diagnostics.candidateRuleCount += route.rules.length;
		incrementCount(diagnostics.candidateRulesByKind, observation.kind, route.rules.length);

		for (const indexedRule of route.rules) {
			const startedAt = input.onRuleEvaluation ? performance.now() : 0;
			const match = matchObservationRule({
				technology: indexedRule.technology,
				rule: indexedRule.rule,
				ruleIndex: indexedRule.ruleIndex,
				observation,
				options: input.options,
			});
			input.onRuleEvaluation?.({
				technology: indexedRule.technology,
				rule: indexedRule.rule,
				ruleIndex: indexedRule.ruleIndex,
				sequence: indexedRule.sequence,
				observation,
				matched: Boolean(match),
				durationMs: performance.now() - startedAt,
			});
			if (match) {
				matches.push(match);
			}
		}
	}
	diagnostics.matchCount = matches.length;

	return {
		target: input.batch.target,
		observedAt: input.batch.observedAt,
		matches,
		evidenceBatch: {
			target: input.batch.target,
			observedAt: input.batch.observedAt,
			entries: matches.map((match) => match.evidence),
		},
		diagnostics: freezeDiagnostics(diagnostics),
	};
}

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

/**
 * Decide whether an observation surface should be skipped before rule routing.
 *
 * Initial visible-tab analysis intentionally defers high-fan-out URL-like
 * surfaces. Skipping those observations before exact-key, literal, and fallback
 * buckets are consulted avoids doing thousands of candidate-rule lookups that
 * a deeper rule guard would reject anyway.
 */
function isObservationKindDisabled(
	kind: NormalizedObservationKind,
	disabledKinds: DisabledKindLookup | undefined,
): boolean {
	return disabledKinds?.[kind] === true;
}

/** Build a branch-friendly lookup once so the hot observation loop avoids repeated array scans. */
function createDisabledKindLookup(options: DetectionRunOptions | undefined): DisabledKindLookup | undefined {
	if (!options?.disabledKinds || options.disabledKinds.length === 0) {
		return undefined;
	}

	const lookup: Partial<Record<string, true>> = Object.create(null) as Partial<Record<string, true>>;
	for (const kind of options.disabledKinds) {
		lookup[kind] = true;
	}
	return Object.freeze(lookup);
}

function findIndexedObservationRulesWithDiagnostics(
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
	const key = getObservationRouteKey(observation);
	const keyedRules = key === undefined
		? []
		: index.keyedRules[observation.kind]?.[key] ?? [];
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
		case 'html':
			return [
				createPatternRoute(rule),
				{ kind: 'htmlMatch', key: htmlProbeKey(technologyId, ruleIndex) },
			];
		default:
			return [createPatternRoute(rule)];
	}
}

function createPatternRoute(
	rule: Extract<DetectionRule, { kind: NormalizedObservationKind; pattern?: RegExp }>,
): ObservationRuleRoute {
	const requiredLiteral = isLiteralPrefilterSupported(rule.kind)
		? extractTopLevelRegexLiteral(rule.pattern)
		: undefined;

	return requiredLiteral
		? { kind: rule.kind, requiredLiteral }
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

/**
 * Extract one provably required top-level literal from a regex source.
 *
 * The parser intentionally leaves money on the table. It ignores literals inside
 * groups and character classes, rejects patterns containing alternation, and
 * discards a literal run when `?`, `*`, or `{...}` can make its final atom
 * optional. Escaped classes such as `\d` and `\s`, backreferences, and encoded
 * escapes are never interpreted as source text. Unclear cases remain fallback
 * rules, so this prefilter cannot turn a true regex match into a false negative.
 */
function extractTopLevelRegexLiteral(pattern: RegExp | undefined): string | undefined {
    if (!pattern || pattern.source.includes('|')) {
        return undefined;
    }

    const tokens: string[] = [];
    let token = '';
    let depth = 0;
    let inCharacterClass = false;

    for (let index = 0; index < pattern.source.length; index += 1) {
        const char = pattern.source[index]!;

        if (char === '\\') {
            const next = pattern.source[index + 1];
            if (next === undefined) {
                flushToken();
                break;
            }

            if (depth === 0 && !inCharacterClass && isEscapedLiteralCharacter(next)) {
                token += next;
                index += 1;
            } else {
                flushToken();
                index = skipNonLiteralEscape(pattern.source, index);
            }
            continue;
        }

        if (inCharacterClass) {
            if (char === ']') {
                inCharacterClass = false;
            }
            continue;
        }
        if (char === '[') {
            flushToken();
            inCharacterClass = true;
            continue;
        }
        if (char === '(') {
            flushToken();
            depth += 1;
            continue;
        }
        if (char === ')') {
            flushToken();
            depth = Math.max(0, depth - 1);
            continue;
        }

        if (depth > 0) {
            continue;
        }

        if (isPlainLiteralCharacter(char)) {
            token += char;
            continue;
        }

        switch (char) {
            case '?':
            case '*':
                discardToken();
                break;
            case '{':
                discardToken();
                index = skipBraceExpression(pattern.source, index);
                break;
            default:
                flushToken();
        }
    }
    flushToken();

    return tokens.sort((left, right) => right.length - left.length)[0];

    function flushToken(): void {
        const normalized = token.toLowerCase();
        if (isUsefulLiteralToken(normalized)) {
            tokens.push(normalized);
        }
        token = '';
    }

    function discardToken(): void {
        token = '';
    }
}

function isPlainLiteralCharacter(char: string): boolean {
    return /^[a-zA-Z0-9_~:/@%-]$/.test(char);
}

function isEscapedLiteralCharacter(char: string): boolean {
    return '.\\^$*+?(){}[]|/-'.includes(char);
}

/** Skip escape payloads whose text is regex syntax rather than required source text. */
function skipNonLiteralEscape(source: string, slashIndex: number): number {
    const escapeType = source[slashIndex + 1];
    if (escapeType === undefined) {
        return slashIndex;
    }

    switch (escapeType) {
        case 'x':
            return Math.min(source.length - 1, slashIndex + 3);
        case 'u':
            return source[slashIndex + 2] === '{'
                ? skipBraceExpression(source, slashIndex + 2)
                : Math.min(source.length - 1, slashIndex + 5);
        case 'c':
            return Math.min(source.length - 1, slashIndex + 2);
        case 'p':
        case 'P':
            return source[slashIndex + 2] === '{'
                ? skipBraceExpression(source, slashIndex + 2)
                : slashIndex + 1;
        case 'k': {
            if (source[slashIndex + 2] !== '<') {
                return slashIndex + 1;
            }
            const closing = source.indexOf('>', slashIndex + 3);
            return closing < 0 ? source.length - 1 : closing;
        }
        default:
            if (!/^[0-9]$/.test(escapeType)) {
                return slashIndex + 1;
            }

            let end = slashIndex + 1;
            while (end + 1 < source.length && /^[0-9]$/.test(source[end + 1]!)) {
                end += 1;
            }
            return end;
    }
}

/** Skip a brace-delimited quantifier or escape payload so its digits cannot become literals. */
function skipBraceExpression(source: string, openingBraceIndex: number): number {
    const closing = source.indexOf('}', openingBraceIndex + 1);
    return closing < 0 ? source.length - 1 : closing;
}

function isUsefulLiteralToken(token: string): boolean {
	return token.length >= 4 && /[a-z0-9]/.test(token);
}

function findLiteralPrefilteredRules(
	index: ObservationMatcherIndex,
	observation: NormalizedObservation,
): LiteralPrefilterResult {
	const rules = index.literalRules[observation.kind] ?? [];
	if (rules.length === 0) {
		return { rules, rejectedCount: 0 };
	}

	const value = String(observation.value).toLowerCase();
	const matched: LiteralPrefilteredObservationRule[] = [];
	let rejectedCount = 0;
	for (const rule of rules) {
		if (value.includes(rule.requiredLiteral)) {
			matched.push(rule);
		} else {
			rejectedCount += 1;
		}
	}

	return { rules: matched, rejectedCount };
}

/** Convert observation keys into the same canonical form used by rule routes. */
function getObservationRouteKey(observation: NormalizedObservation): string | undefined {
	if (!observation.key) {
		return undefined;
	}

	switch (observation.kind) {
		case 'header':
		case 'responseHeader':
		case 'requestHeader':
		case 'meta':
			return canonicalHeaderKey(observation.key);
		default:
			return observation.key;
	}
}

/** Lowercase header-like keys because matching treats those names case-insensitively. */
function canonicalHeaderKey(key: string): string {
	return key.toLowerCase();
}

/** Create the bounded HTML probe key used by the existing observation matcher. */

/** Prefer a generated shard's full-registry rule index when one is present. */
function getRuleSourceIndex(rule: DetectionRule, fallbackRuleIndex: number): number {
	return typeof rule.sourceRuleIndex === 'number' ? rule.sourceRuleIndex : fallbackRuleIndex;
}

function htmlProbeKey(technologyId: string, ruleIndex: number): string {
	return `${technologyId}:${ruleIndex}`;
}

/** Merge any number of sequence-sorted rule buckets while preserving old matcher order. */
function mergeRuleBucketList(
	buckets: readonly (readonly IndexedObservationRule[])[],
): readonly IndexedObservationRule[] {
	const nonEmpty = buckets.filter((bucket) => bucket.length > 0);
	if (nonEmpty.length === 0) {
		return [];
	}
	if (nonEmpty.length === 1) {
		return nonEmpty[0]!;
	}

	let merged = nonEmpty[0]!;
	for (const bucket of nonEmpty.slice(1)) {
		merged = mergeRuleBuckets(merged, bucket);
	}
	return merged;
}

/**
 * Merge two sequence-sorted rule buckets while preserving old matcher order.
 *
 * Both buckets are sorted by construction because the index is built in
 * registry order. The merge keeps the hot path linear in the number of
 * candidate rules for the observation instead of sorting a combined array.
 */
function mergeRuleBuckets(
	left: readonly IndexedObservationRule[],
	right: readonly IndexedObservationRule[],
): readonly IndexedObservationRule[] {
	const merged: IndexedObservationRule[] = [];
	let leftIndex = 0;
	let rightIndex = 0;

	while (leftIndex < left.length && rightIndex < right.length) {
		const leftRule = left[leftIndex]!;
		const rightRule = right[rightIndex]!;
		if (leftRule.sequence <= rightRule.sequence) {
			merged.push(leftRule);
			leftIndex += 1;
		} else {
			merged.push(rightRule);
			rightIndex += 1;
		}
	}

	return merged.concat(left.slice(leftIndex), right.slice(rightIndex));
}

/** Freeze kind buckets so callers do not mutate a shared runtime index. */
function freezeRuleBuckets(buckets: MutableRuleBuckets): IndexedObservationRuleBuckets {
	for (const rules of Object.values(buckets)) {
		Object.freeze(rules);
	}
	return Object.freeze(buckets);
}

/** Freeze nested exact-key buckets so the index is safe to share across batches. */
function freezeKeyBuckets(buckets: MutableKeyBuckets): IndexedObservationKeyBuckets {
	for (const keyBuckets of Object.values(buckets)) {
		for (const rules of Object.values(keyBuckets)) {
			Object.freeze(rules);
		}
		Object.freeze(keyBuckets);
	}
	return Object.freeze(buckets);
}

/** Freeze literal-prefilter buckets so the index is safe to share across batches. */
function freezeLiteralBuckets(buckets: MutableLiteralBuckets): IndexedObservationLiteralBuckets {
	for (const rules of Object.values(buckets)) {
		Object.freeze(rules);
	}
	return Object.freeze(buckets);
}

function createMutableMatcherDiagnostics(): MutableObservationMatcherDiagnostics {
	return {
		observationCount: 0,
		skippedObservationCount: 0,
		candidateRuleCount: 0,
		keyedRuleCount: 0,
		fallbackRuleCount: 0,
		literalRuleCount: 0,
		literalRejectedRuleCount: 0,
		matchCount: 0,
		observationsByKind: Object.create(null) as Record<string, number>,
		skippedObservationsByKind: Object.create(null) as Record<string, number>,
		candidateRulesByKind: Object.create(null) as Record<string, number>,
	};
}

function freezeDiagnostics(diagnostics: MutableObservationMatcherDiagnostics): ObservationMatcherDiagnostics {
	return Object.freeze({
		observationCount: diagnostics.observationCount,
		skippedObservationCount: diagnostics.skippedObservationCount,
		candidateRuleCount: diagnostics.candidateRuleCount,
		keyedRuleCount: diagnostics.keyedRuleCount,
		fallbackRuleCount: diagnostics.fallbackRuleCount,
		literalRuleCount: diagnostics.literalRuleCount,
		literalRejectedRuleCount: diagnostics.literalRejectedRuleCount,
		matchCount: diagnostics.matchCount,
		observationsByKind: Object.freeze(Object.assign({}, diagnostics.observationsByKind)),
		skippedObservationsByKind: Object.freeze(Object.assign({}, diagnostics.skippedObservationsByKind)),
		candidateRulesByKind: Object.freeze(Object.assign({}, diagnostics.candidateRulesByKind)),
	});
}

function incrementCount(counts: Record<string, number>, key: string, amount = 1): void {
	counts[key] = (counts[key] ?? 0) + amount;
}
