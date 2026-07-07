import type {
	DetectionKind,
	DetectionRunOptions,
	DetectionRule,
	TechnologyDefinition,
} from './types';
import type {
	EvidenceBatch,
	EvidenceEntry,
} from '../evidence';
import type {
	NormalizedObservation,
	ObservationBatch,
	ObservationTarget,
} from '../observations';

/**
 * Single observation-to-rule match event emitted by the observation matcher.
 *
 * Pattern matching records which normalized page fact satisfied which registry
 * rule before evidence aggregation turns that match into technology support.
 */
export interface ObservationPatternMatch {
	/** Target document or request that produced the source observation. */
	target: ObservationTarget;
	/** Technology whose rule accepted the observation. */
	technologyId: string;
	/** Rule index inside the technology definition at match time. */
	ruleIndex: number;
	/** Optional stable rule id from the registry source. */
	ruleId?: string;
	/** Rule surface that matched the observation. */
	kind: DetectionKind;
	/** Observation that supplied the matched value. */
	observation: NormalizedObservation;
	/** Evidence entry created from this pattern match. */
	evidence: EvidenceEntry;
}

/**
 * Ordered match and evidence output for one observation batch.
 *
 * Keeping matches and evidence together lets tests inspect the pattern-match
 * event stream while downstream code can already consume the evidence batch.
 */
export interface ObservationPatternMatchBatch {
	/** Target shared by the matched observations. */
	target: ObservationTarget;
	/** Timestamp inherited from the input observation batch. */
	observedAt: number;
	/** Ordered pattern-match events emitted for the batch. */
	matches: ObservationPatternMatch[];
	/** Evidence entries derived from `matches`, ready for the evidence repository. */
	evidenceBatch: EvidenceBatch;
}

/** Input for matching one observation against one registry rule. */
export interface MatchObservationRuleInput {
	/** Technology that owns the rule. */
	technology: TechnologyDefinition;
	/** Rule to evaluate against the observation. */
	rule: DetectionRule;
	/** Rule index inside the owning technology definition. */
	ruleIndex: number;
	/** Normalized observation to evaluate. */
	observation: NormalizedObservation;
	/** Optional detector compatibility flags, such as disabled kinds or rule ids. */
	options?: DetectionRunOptions;
}

/** Input for matching a full observation batch against a registry. */
export interface MatchObservationBatchInput {
	/** Technologies whose rules should receive observations. */
	registry: readonly TechnologyDefinition[];
	/** Ordered observations from one collector snapshot or replay segment. */
	batch: ObservationBatch;
	/** Optional detector compatibility flags, such as disabled kinds or rule ids. */
	options?: DetectionRunOptions;
}
