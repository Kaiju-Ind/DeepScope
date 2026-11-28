import type { MatcherTechnologyType } from "@deepscope/registry/types";
import type { DetectionRule } from "@deepscope/registry/rules";
import type { NormalizedObservationKind, NormalizedObservation } from "../../observations/index.ts";
import type { ObservationPatternMatchBatch, MatchObservationBatchInput } from "../types.ts";
import type { ObservationMatcherDiagnostics } from "../diagnostics.ts";

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
	readonly technology: MatcherTechnologyType;
	/** Rule evaluated when a compatible observation arrives. */
	readonly rule: DetectionRule;
	/** Rule index inside the owning technology definition. */
	readonly ruleIndex: number;
	/** Global registry order used to preserve sequential matcher ordering. */
	readonly sequence: number;
	/**
	 * Lowercase literal the rule's subject must contain before its regex runs
	 * (cookie, header, meta and DNS rules; see `match/gate.ts`).
	 */
	readonly gate?: string;
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
	readonly technology: MatcherTechnologyType;
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
export type MutableRuleBuckets = Partial<Record<NormalizedObservationKind, IndexedObservationRule[]>>;

/** Internal mutable form used while building exact-key buckets. */
export type MutableKeyBuckets = Partial<Record<NormalizedObservationKind, Record<string, IndexedObservationRule[]>>>;

/** Internal mutable form used while building literal-prefilter buckets. */
export type MutableLiteralBuckets = Partial<Record<NormalizedObservationKind, LiteralPrefilteredObservationRule[]>>;

/** Route that places one rule into a kind bucket, exact-key bucket, or literal-prefilter bucket. */
export interface ObservationRuleRoute {
	/** Observation kind that can trigger the rule. */
	readonly kind: NormalizedObservationKind;
	/** Canonical key used for exact lookup before running the full rule matcher. */
	readonly key?: string;
	/** Required lowercase substring used to avoid regex work for scalar patterns. */
	readonly requiredLiteral?: string;
}

/** Literal-prefilter result for one observation. */
export interface LiteralPrefilterResult {
	readonly rules: readonly LiteralPrefilteredObservationRule[];
	readonly rejectedCount: number;
}
