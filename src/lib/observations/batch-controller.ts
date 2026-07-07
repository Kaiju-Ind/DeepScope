import type { NormalizedObservation, ObservationBatch, ObservationTarget } from './types';

/** Default queue policy for live extension observation batches. */
export const DEFAULT_OBSERVATION_BATCH_POLICY = {
	maxBatchObservations: 250,
	maxQueuedObservations: 1_000,
	dedupeWindowMs: 2_000,
	stormWindowMs: 10_000,
	maxAcceptedPerStormWindow: 2_000,
} as const satisfies ObservationBatchPolicy;

/** Reason an observation was not accepted into the queue. */
export type ObservationBatchDropReason = 'duplicate' | 'queue-limit' | 'storm-limit';

/**
 * Limits that bound live observation work before it reaches matching.
 *
 * `maxBatchObservations` controls the size of each emitted batch. The other
 * limits control the in-memory queue so event storms cannot grow without bound
 * while the popup or background is waiting to refresh analysis.
 */
export interface ObservationBatchPolicy {
	/** Maximum observations emitted by one `flush(...)` call. */
	readonly maxBatchObservations: number;
	/** Maximum observations retained in memory before newer unique values are dropped. */
	readonly maxQueuedObservations: number;
	/** Time window in milliseconds for dropping repeated observations. */
	readonly dedupeWindowMs: number;
	/** Time window in milliseconds used to count accepted observations as a storm. */
	readonly stormWindowMs: number;
	/** Maximum accepted observations inside one storm window. */
	readonly maxAcceptedPerStormWindow: number;
}

/** Result returned when a collector pushes one observation. */
export interface ObservationBatchPushResult {
	/** Whether the observation entered the queue. */
	readonly accepted: boolean;
	/** Drop reason when the observation was rejected. */
	readonly reason?: ObservationBatchDropReason;
	/** Queue size after processing the observation. */
	readonly queuedCount: number;
}

/** Public counters that explain batch-controller behavior without raw page data. */
export interface ObservationBatchControllerStats {
	/** Number of observations currently queued. */
	readonly queuedCount: number;
	/** Number of observations accepted since controller creation. */
	readonly acceptedCount: number;
	/** Number of observations dropped as duplicates. */
	readonly duplicateDropCount: number;
	/** Number of observations dropped because the queue was full. */
	readonly queueLimitDropCount: number;
	/** Number of observations dropped because the storm window was saturated. */
	readonly stormLimitDropCount: number;
	/** Number of observations accepted during the current storm window. */
	readonly acceptedInStormWindow: number;
	/** Start timestamp of the current storm window. */
	readonly stormWindowStartedAt?: number;
}

/** Controller used by collectors before emitting normalized observation batches. */
export interface ObservationBatchController {
	/** Accept one observation into the bounded queue when policy allows it. */
	push(observation: NormalizedObservation): ObservationBatchPushResult;
	/** Emit and remove the next bounded batch. */
	flush(input: ObservationBatchFlushInput): ObservationBatch | null;
	/** Return current counters without mutating queued observations. */
	stats(): ObservationBatchControllerStats;
	/** Drop all queued observations and dedupe history. */
	reset(): void;
}

/** Input used when a queued group becomes an `ObservationBatch`. */
export interface ObservationBatchFlushInput {
	/** Target assigned to the emitted batch. */
	readonly target: ObservationTarget;
	/** Timestamp attached to the batch itself. */
	readonly observedAt: number;
}

/** Internal dedupe state for one observation identity. */
interface DedupeEntry {
	/** Last time this observation identity was accepted. */
	lastSeenAt: number;
}

/** Mutable counters kept inside the controller. */
interface MutableObservationBatchControllerStats {
	queuedCount: number;
	acceptedCount: number;
	duplicateDropCount: number;
	queueLimitDropCount: number;
	stormLimitDropCount: number;
	acceptedInStormWindow: number;
	stormWindowStartedAt?: number;
}

/**
 * Create a bounded controller for normalized observation events.
 *
 * The controller is intentionally runtime-agnostic. Content scripts, background
 * orchestration, and future CLI collectors can share the same queue policy while
 * deciding independently when to flush batches into the pipeline.
 */
export function createObservationBatchController(
	policy: ObservationBatchPolicy = DEFAULT_OBSERVATION_BATCH_POLICY,
): ObservationBatchController {
	validatePolicy(policy);

	const queuedObservations: NormalizedObservation[] = [];
	const dedupeEntries = new Map<string, DedupeEntry>();
	const mutableStats: MutableObservationBatchControllerStats = {
		queuedCount: 0,
		acceptedCount: 0,
		duplicateDropCount: 0,
		queueLimitDropCount: 0,
		stormLimitDropCount: 0,
		acceptedInStormWindow: 0,
	};

	function push(observation: NormalizedObservation): ObservationBatchPushResult {
		startOrResetStormWindow(observation.observedAt, mutableStats, policy);
		pruneDedupeEntries(dedupeEntries, observation.observedAt, policy.dedupeWindowMs);

		if (isDuplicateObservation(dedupeEntries, observation, policy.dedupeWindowMs)) {
			mutableStats.duplicateDropCount += 1;
			return rejected('duplicate', queuedObservations.length);
		}

		if (mutableStats.acceptedInStormWindow >= policy.maxAcceptedPerStormWindow) {
			mutableStats.stormLimitDropCount += 1;
			return rejected('storm-limit', queuedObservations.length);
		}

		if (queuedObservations.length >= policy.maxQueuedObservations) {
			mutableStats.queueLimitDropCount += 1;
			return rejected('queue-limit', queuedObservations.length);
		}

		queuedObservations.push(observation);
		dedupeEntries.set(observationIdentity(observation), { lastSeenAt: observation.observedAt });
		mutableStats.acceptedCount += 1;
		mutableStats.acceptedInStormWindow += 1;
		mutableStats.queuedCount = queuedObservations.length;

		return { accepted: true, queuedCount: queuedObservations.length };
	}

	function flush(input: ObservationBatchFlushInput): ObservationBatch | null {
		if (queuedObservations.length === 0) {
			return null;
		}

		const observations = queuedObservations.splice(0, policy.maxBatchObservations);
		mutableStats.queuedCount = queuedObservations.length;

		return {
			target: input.target,
			interface: observations[0]?.interface ?? 'extension',
			observedAt: input.observedAt,
			observations,
		};
	}

	function stats(): ObservationBatchControllerStats {
		return { ...mutableStats, queuedCount: queuedObservations.length };
	}

	function reset(): void {
		queuedObservations.length = 0;
		dedupeEntries.clear();
		mutableStats.queuedCount = 0;
		mutableStats.acceptedInStormWindow = 0;
		mutableStats.stormWindowStartedAt = undefined;
	}

	return { push, flush, stats, reset };
}

function rejected(reason: ObservationBatchDropReason, queuedCount: number): ObservationBatchPushResult {
	return { accepted: false, reason, queuedCount };
}

function validatePolicy(policy: ObservationBatchPolicy): void {
	if (policy.maxBatchObservations < 1) {
		throw new Error('Observation batch policy must allow at least one observation per batch.');
	}
	if (policy.maxQueuedObservations < policy.maxBatchObservations) {
		throw new Error('Observation queue limit must be greater than or equal to the batch size.');
	}
	if (policy.dedupeWindowMs < 0 || policy.stormWindowMs < 1 || policy.maxAcceptedPerStormWindow < 1) {
		throw new Error('Observation batch policy contains an invalid timing or storm limit.');
	}
}

function startOrResetStormWindow(
	observedAt: number,
	stats: MutableObservationBatchControllerStats,
	policy: ObservationBatchPolicy,
): void {
	const startedAt = stats.stormWindowStartedAt;
	if (startedAt !== undefined && observedAt - startedAt <= policy.stormWindowMs) {
		return;
	}

	stats.stormWindowStartedAt = observedAt;
	stats.acceptedInStormWindow = 0;
}

function pruneDedupeEntries(
	entries: Map<string, DedupeEntry>,
	observedAt: number,
	dedupeWindowMs: number,
): void {
	for (const [key, entry] of entries) {
		if (observedAt - entry.lastSeenAt > dedupeWindowMs) {
			entries.delete(key);
		}
	}
}

function isDuplicateObservation(
	entries: Map<string, DedupeEntry>,
	observation: NormalizedObservation,
	dedupeWindowMs: number,
): boolean {
	const entry = entries.get(observationIdentity(observation));
	return entry !== undefined && observation.observedAt - entry.lastSeenAt <= dedupeWindowMs;
}

/**
 * Create a stable identity for dedupe without storing raw object references.
 *
 * Attribute values are sorted so callers do not accidentally bypass dedupe by
 * constructing equivalent attribute objects with different key insertion order.
 */
function observationIdentity(observation: NormalizedObservation): string {
	return JSON.stringify([
		observation.target.url,
		observation.kind,
		observation.key ?? '',
		observation.value,
		stableAttributes(observation.attributes),
	]);
}

function stableAttributes(attributes: NormalizedObservation['attributes']): readonly [string, string | number | boolean][] {
	return Object.entries(attributes ?? {}).sort(([left], [right]) => left.localeCompare(right));
}
