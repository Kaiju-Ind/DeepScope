import type { DetectionKind } from '../detection/types';
import type {
	ObservationAttributes,
	ObservationInterface,
	ObservationCollector,
	ObservationTarget,
	ObservationValue,
	NormalizedObservationKind,
} from '../observations';

/**
 * Runtime path that produced an evidence entry.
 *
 * `observation` means the entry came from a normalized observation 
 * and is ready for the future matcher, `detection-result` means it was 
 * adapted from today's `SiteAnalysis` output for compatibility, and 
 * `relationship` represents graph-derived support such as an implied 
 * technology.
 */
export type EvidenceEntrySource = 'observation' | 'detection-result' | 'relationship';

/**
 * Reference back to the observation that produced evidence.
 *
 * The reference copies only replay-safe scalar metadata. It does not retain the
 * full observation object so future persisted evidence can be stored without
 * accidentally holding larger collector payloads by reference.
 */
export interface EvidenceObservationReference {
	/** Observation surface that generated the evidence, such as `scriptSrc` or `meta`. */
	readonly kind: NormalizedObservationKind;
	/** Optional lookup key from the observation, such as a header name or selector. */
	readonly key?: string;
	/** Interface that saw the observation. */
	readonly interface: ObservationInterface;
	/** Concrete collector that emitted the observation. */
	readonly collector: ObservationCollector;
	/** Timestamp copied from the observation for replay ordering. */
	readonly observedAt: number;
}

/**
 * Evidence record that can be accumulated before candidate creation.
 *
 * This is the bridge between normalized observations and future candidate
 * detection. It intentionally mirrors the public detector evidence fields while
 * adding target, technology, source, and observation metadata that replay and CLI
 * fixtures need.
 */
export interface EvidenceEntry {
	/** Stable identifier generated from target, technology, source, and ordinal data. */
	readonly id: string;
	/** Page or request target associated with this evidence. */
	readonly target: ObservationTarget;
	/** Technology receiving support from this entry. */
	readonly technologyId: string;
	/** Detector surface this evidence can satisfy. */
	readonly kind: DetectionKind;
	/** Runtime path that created the entry. */
	readonly source: EvidenceEntrySource;
	/** Confidence contribution before final candidate aggregation. */
	readonly confidence: number;
	/** Redacted scalar value that matched or explained the evidence. */
	readonly matchedValue: ObservationValue;
	/** Timestamp used for replay and deterministic repository ordering. */
	readonly observedAt: number;
	/** Whether this came from direct rule evidence rather than graph inference. */
	readonly direct: boolean;
	/** Optional rule identifier when the registry supplied one. */
	readonly ruleId?: string;
	/** Human-readable rule note preserved for explanation output. */
	readonly ruleDescription?: string;
	/** Version captured by the supporting rule, when present. */
	readonly version?: string;
	/** Relationship source technology when graph inference produced the entry. */
	readonly sourceTechnologyId?: string;
	/** Observation metadata when an observation directly produced this evidence. */
	readonly observation?: EvidenceObservationReference;
	/** Additional scalar context, such as storage area or request URL. */
	readonly attributes?: ObservationAttributes;
}

/**
 * Ordered group of evidence entries for one target.
 *
 * The batch shape matches `ObservationBatch` closely so future pipeline stages
 * can transform observations into evidence without losing target or ordering
 * information.
 */
export interface EvidenceBatch {
	/** Target shared by entries in the batch. */
	readonly target: ObservationTarget;
	/** Timestamp attached to compatibility batches and replay events. */
	readonly observedAt: number;
	/** Ordered evidence entries derived from observations or compatibility output. */
	readonly entries: readonly EvidenceEntry[];
}

/**
 * Aggregated evidence view used by repository tests and future candidate creation.
 *
 * This is intentionally score-light. It records counts and maximum confidence
 * without choosing final detector confidence math, because that aggregation still
 * belongs to the detector compatibility path.
 */
export interface EvidenceTechnologySummary {
	/** Technology represented by the summary. */
	readonly technologyId: string;
	/** Total entries recorded for the technology. */
	readonly entryCount: number;
	/** Entries that came from direct rule or observation support. */
	readonly directCount: number;
	/** Entries that came from relationship inference. */
	readonly relationshipCount: number;
	/** Highest confidence contribution seen for the technology. */
	readonly maxConfidence: number;
}
