import * as dictionary from "../observations/dictionary.ts";

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

/** Allocate counters for one batch with null-prototype maps so observation kinds remain ordinary data keys. */
export function createMutableMatcherDiagnostics(): MutableObservationMatcherDiagnostics {
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

/** Detach and freeze all counter maps before returning diagnostics to callers. */
export function freezeDiagnostics(diagnostics: MutableObservationMatcherDiagnostics): ObservationMatcherDiagnostics {
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

/** Add to an own-key counter with zero as its initial value; the default increment is one. */
export function incrementCount(counts: Record<string, number>, key: string, amount = 1): void {
	counts[key] = (dictionary.get(counts, key) ?? 0) + amount;
}
