import type { RuntimeDetectionKind } from '../detection/types';

/**
 * Runtime surfaces that can become normalized observations.
 *
 * The names intentionally stay close to detection rule kinds so the eventual
 * matcher can route observations to compatible patterns without carrying the
 * current `PageSignals` snapshot shape forward. `htmlMatch` is the one extra
 * surface because current extension collection can preserve rule-oriented HTML
 * snippets when the full document exceeds its bounded HTML budget.
 */
export type NormalizedObservationKind = RuntimeDetectionKind | 'htmlMatch';

/**
 * Interface that produced an observation.
 *
 * Extension and command-line collection will have different raw capabilities.
 * Keeping the producer on every observation lets replay and explanation code
 * compare results without pretending both interfaces saw the same page data.
 */
export type ObservationInterface = 'extension' | 'cli' | 'test';

/**
 * Local extension collector that produced an observation.
 *
 * This is more specific than {@link ObservationInterface}: it records which
 * extension boundary saw the value while still letting all extension collectors
 * feed the same shared pipeline.
 */
export type ObservationCollector =
	| 'content-snapshot'
	| 'content-observer'
	| 'background-enrichment'
	| 'page-main-world'
	| 'test-fixture';

/**
 * Primitive value that can be serialized into replay logs.
 *
 * Observations avoid object payloads as their primary value because replay,
 * hashing, and future persistence need stable scalar comparison. Extra context
 * belongs in `attributes` where keys can be interpreted by the matching stage.
 */
export type ObservationValue = string | number | boolean;

/** Additional scalar context carried with an observation. */
export type ObservationAttributes = Record<string, ObservationValue>;

/**
 * Page or request target associated with an observation.
 *
 * The current extension analyzes one active document at a time, but the future
 * CLI can emit observations from multiple pages or requests. Keeping target
 * data nested avoids widening every observation field when multi-page analysis
 * arrives.
 */
export interface ObservationTarget {
	/** URL of the analyzed document or request context. */
	url: string;
	/** Hostname derived from the analyzed document URL. */
	hostname: string;
}

/**
 * Normalized event-like representation of one collected fact.
 *
 * A normalized observation is the compatibility bridge between today's
 * snapshot-shaped `PageSignals` and the target event pipeline. It records what
 * surface was observed, where it came from, when it was collected, and the
 * scalar value or key/value pair that future pattern matching can consume.
 */
export interface NormalizedObservation {
	/** Collection surface, such as `scriptSrc`, `meta`, `dom`, or `header`. */
	kind: NormalizedObservationKind;
	/** Interface that produced this observation, such as the extension or CLI. */
	interface: ObservationInterface;
	/** Concrete collector boundary that observed the value. */
	collector: ObservationCollector;
	/** Target document or request associated with this value. */
	target: ObservationTarget;
	/** Millisecond timestamp inherited from the collector snapshot. */
	observedAt: number;
	/** Optional lookup key, such as a header name, meta name, selector, or storage key. */
	key?: string;
	/** Scalar value used by pattern matching and replay comparison. */
	value: ObservationValue;
	/** Optional structured scalar context that should not be pattern text itself. */
	attributes?: ObservationAttributes;
}

/**
 * Ordered group of observations produced from one collector snapshot.
 *
 * Order is part of the replay contract. Snapshot adapters should emit stable
 * order so a later evidence store can diff, hash, and replay observations
 * without depending on object property iteration accidents.
 */
export interface ObservationBatch {
	/** Target shared by the observations in the batch. */
	target: ObservationTarget;
	/** Interface that produced the batch. */
	interface: ObservationInterface;
	/** Millisecond timestamp attached to observations that came from this batch. */
	observedAt: number;
	/** Ordered observations derived from the snapshot. */
	observations: NormalizedObservation[];
}
