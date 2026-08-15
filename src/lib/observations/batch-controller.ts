import type { NormalizedObservation, ObservationBatch, ObservationTarget } from './types';

/** Default queue policy for live extension observation batches. */
export const DEFAULT_OBSERVATION_BATCH_POLICY = {
	maxBatchObservations: 250,
	maxQueuedObservations: 1_000,
	dedupeWindowMs: 2_000,
	stormWindowMs: 10_000,
	maxAcceptedPerStormWindow: 1_000,
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

/** Immutable business state owned by the observation batch state machine. */
export interface ObservationBatchControllerState {
	/** Number of observations currently queued by the imperative adapter. */
	readonly queuedCount: number;
	/** Number of observations accepted since state creation. */
	readonly acceptedCount: number;
	/** Number of observations dropped as duplicates. */
	readonly duplicateDropCount: number;
	/** Number of observations dropped because the queue was full. */
	readonly queueLimitDropCount: number;
	/** Number of observations dropped because the storm window was saturated. */
	readonly stormLimitDropCount: number;
	/** Number of observations accepted during the current storm window. */
	readonly acceptedInStormWindow: number;
	/** Start timestamp of the current storm window, when one exists. */
	readonly stormWindowStartedAt: number | undefined;
}

/** Explicit inputs accepted by the pure observation batch state machine. */
export type ObservationBatchControllerEvent =
	| {
		readonly type: 'push';
		readonly observation: NormalizedObservation;
		/** Duplicate fact calculated by the adapter's bounded dedupe index. */
		readonly duplicateWithinWindow: boolean;
	}
	| {
		readonly type: 'flush';
		/** Number of queued observations emitted by the adapter. */
		readonly emittedCount: number;
	}
	| { readonly type: 'reset' };

/** Result of one pure state transition. */
export type ObservationBatchControllerTransition =
	| {
		readonly type: 'push';
		readonly state: ObservationBatchControllerState;
		readonly result: ObservationBatchPushResult;
	}
	| {
		readonly type: 'flush';
		readonly state: ObservationBatchControllerState;
	}
	| {
		readonly type: 'reset';
		readonly state: ObservationBatchControllerState;
	};

type PushEvent = Extract<ObservationBatchControllerEvent, { readonly type: 'push' }>;
type FlushEvent = Extract<ObservationBatchControllerEvent, { readonly type: 'flush' }>;
type ResetEvent = Extract<ObservationBatchControllerEvent, { readonly type: 'reset' }>;
type PushTransition = Extract<ObservationBatchControllerTransition, { readonly type: 'push' }>;
type FlushTransition = Extract<ObservationBatchControllerTransition, { readonly type: 'flush' }>;
type ResetTransition = Extract<ObservationBatchControllerTransition, { readonly type: 'reset' }>;

/** Create the empty immutable state used by the observation batch state machine. */
export function createObservationBatchControllerState(): ObservationBatchControllerState {
	return {
		queuedCount: 0,
		acceptedCount: 0,
		duplicateDropCount: 0,
		queueLimitDropCount: 0,
		stormLimitDropCount: 0,
		acceptedInStormWindow: 0,
		stormWindowStartedAt: undefined,
	};
}

/** Project the public controller stats contract from immutable machine state. */
export function getObservationBatchControllerStats(
	state: ObservationBatchControllerState,
): ObservationBatchControllerStats {
	return {
		queuedCount: state.queuedCount,
		acceptedCount: state.acceptedCount,
		duplicateDropCount: state.duplicateDropCount,
		queueLimitDropCount: state.queueLimitDropCount,
		stormLimitDropCount: state.stormLimitDropCount,
		acceptedInStormWindow: state.acceptedInStormWindow,
		...(state.stormWindowStartedAt === undefined
			? {}
			: { stormWindowStartedAt: state.stormWindowStartedAt }),
	};
}

/** Apply one push event without mutating the input state. */
export function transitionObservationBatchController(
	state: ObservationBatchControllerState,
	event: PushEvent,
	policy?: ObservationBatchPolicy,
): PushTransition;
/** Apply one flush event without mutating the input state. */
export function transitionObservationBatchController(
	state: ObservationBatchControllerState,
	event: FlushEvent,
	policy?: ObservationBatchPolicy,
): FlushTransition;
/** Apply one reset event without mutating the input state. */
export function transitionObservationBatchController(
	state: ObservationBatchControllerState,
	event: ResetEvent,
	policy?: ObservationBatchPolicy,
): ResetTransition;
/** Apply one explicit controller event as a pure state transition. */
export function transitionObservationBatchController(
	state: ObservationBatchControllerState,
	event: ObservationBatchControllerEvent,
	policy: ObservationBatchPolicy = DEFAULT_OBSERVATION_BATCH_POLICY,
): ObservationBatchControllerTransition {
	validatePolicy(policy);
	return transitionObservationBatchControllerWithPolicy(state, event, policy);
}

/** Internal dedupe state for one observation identity. */
interface DedupeEntry {
	/** Last time this observation identity was accepted. */
	readonly lastSeenAt: number;
}

/**
 * Create a bounded imperative adapter around the pure observation batch state machine.
 *
 * The mutable queue and dedupe map stay private as performance-oriented indexes.
 * Acceptance policy, storm-window behavior, queue counts, and cumulative counters
 * are computed by immutable transitions that can be tested and replayed directly.
 */
export function createObservationBatchController(
	policy: ObservationBatchPolicy = DEFAULT_OBSERVATION_BATCH_POLICY,
): ObservationBatchController {
	validatePolicy(policy);

	const queuedObservations: NormalizedObservation[] = [];
	const dedupeEntries = new Map<string, DedupeEntry>();
	let state = createObservationBatchControllerState();

	function push(observation: NormalizedObservation): ObservationBatchPushResult {
		pruneDedupeEntries(dedupeEntries, observation.observedAt, policy.dedupeWindowMs);
		const identity = observationIdentity(observation);
		const duplicateWithinWindow = isDuplicateObservation(
			dedupeEntries,
			identity,
			observation.observedAt,
			policy.dedupeWindowMs,
		);
		const transition = transitionPush(state, observation, duplicateWithinWindow, policy);
		state = transition.state;

		if (transition.result.accepted) {
			queuedObservations.push(observation);
			dedupeEntries.set(identity, { lastSeenAt: observation.observedAt });
		}

		return transition.result;
	}

	function flush(input: ObservationBatchFlushInput): ObservationBatch | null {
		if (queuedObservations.length === 0) {
			return null;
		}

		const observations = queuedObservations.splice(0, policy.maxBatchObservations);
		state = transitionFlush(state, observations.length).state;

		return {
			target: input.target,
			interface: observations[0]?.interface ?? 'extension',
			observedAt: input.observedAt,
			observations,
		};
	}

	function stats(): ObservationBatchControllerStats {
		return getObservationBatchControllerStats(state);
	}

	function reset(): void {
		queuedObservations.length = 0;
		dedupeEntries.clear();
		state = transitionReset(state).state;
	}

	return { push, flush, stats, reset };
}

function transitionObservationBatchControllerWithPolicy(
	state: ObservationBatchControllerState,
	event: ObservationBatchControllerEvent,
	policy: ObservationBatchPolicy,
): ObservationBatchControllerTransition {
	switch (event.type) {
		case 'push':
			return transitionPush(state, event.observation, event.duplicateWithinWindow, policy);
		case 'flush':
			return transitionFlush(state, event.emittedCount);
		case 'reset':
			return transitionReset(state);
	}
}

function transitionPush(
	state: ObservationBatchControllerState,
	observation: NormalizedObservation,
	duplicateWithinWindow: boolean,
	policy: ObservationBatchPolicy,
): PushTransition {
	const stormWindowContinues = state.stormWindowStartedAt !== undefined
		&& observation.observedAt - state.stormWindowStartedAt <= policy.stormWindowMs;
	const acceptedInStormWindow = stormWindowContinues ? state.acceptedInStormWindow : 0;
	const stormWindowStartedAt = stormWindowContinues
		? state.stormWindowStartedAt
		: observation.observedAt;

	if (duplicateWithinWindow) {
		return {
			type: 'push',
			state: {
				queuedCount: state.queuedCount,
				acceptedCount: state.acceptedCount,
				duplicateDropCount: state.duplicateDropCount + 1,
				queueLimitDropCount: state.queueLimitDropCount,
				stormLimitDropCount: state.stormLimitDropCount,
				acceptedInStormWindow,
				stormWindowStartedAt,
			},
			result: rejected('duplicate', state.queuedCount),
		};
	}

	if (acceptedInStormWindow >= policy.maxAcceptedPerStormWindow) {
		return {
			type: 'push',
			state: {
				queuedCount: state.queuedCount,
				acceptedCount: state.acceptedCount,
				duplicateDropCount: state.duplicateDropCount,
				queueLimitDropCount: state.queueLimitDropCount,
				stormLimitDropCount: state.stormLimitDropCount + 1,
				acceptedInStormWindow,
				stormWindowStartedAt,
			},
			result: rejected('storm-limit', state.queuedCount),
		};
	}

	if (state.queuedCount >= policy.maxQueuedObservations) {
		return {
			type: 'push',
			state: {
				queuedCount: state.queuedCount,
				acceptedCount: state.acceptedCount,
				duplicateDropCount: state.duplicateDropCount,
				queueLimitDropCount: state.queueLimitDropCount + 1,
				stormLimitDropCount: state.stormLimitDropCount,
				acceptedInStormWindow,
				stormWindowStartedAt,
			},
			result: rejected('queue-limit', state.queuedCount),
		};
	}

	const queuedCount = state.queuedCount + 1;
	return {
		type: 'push',
		state: {
			queuedCount,
			acceptedCount: state.acceptedCount + 1,
			duplicateDropCount: state.duplicateDropCount,
			queueLimitDropCount: state.queueLimitDropCount,
			stormLimitDropCount: state.stormLimitDropCount,
			acceptedInStormWindow: acceptedInStormWindow + 1,
			stormWindowStartedAt,
		},
		result: { accepted: true, queuedCount },
	};
}

function transitionFlush(
	state: ObservationBatchControllerState,
	emittedCount: number,
): FlushTransition {
	if (emittedCount < 0 || emittedCount > state.queuedCount) {
		throw new Error('Observation batch flush count must be within the queued observation count.');
	}

	return {
		type: 'flush',
		state: {
			queuedCount: state.queuedCount - emittedCount,
			acceptedCount: state.acceptedCount,
			duplicateDropCount: state.duplicateDropCount,
			queueLimitDropCount: state.queueLimitDropCount,
			stormLimitDropCount: state.stormLimitDropCount,
			acceptedInStormWindow: state.acceptedInStormWindow,
			stormWindowStartedAt: state.stormWindowStartedAt,
		},
	};
}

function transitionReset(state: ObservationBatchControllerState): ResetTransition {
	return {
		type: 'reset',
		state: {
			queuedCount: 0,
			acceptedCount: state.acceptedCount,
			duplicateDropCount: state.duplicateDropCount,
			queueLimitDropCount: state.queueLimitDropCount,
			stormLimitDropCount: state.stormLimitDropCount,
			acceptedInStormWindow: 0,
			stormWindowStartedAt: undefined,
		},
	};
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
	entries: ReadonlyMap<string, DedupeEntry>,
	identity: string,
	observedAt: number,
	dedupeWindowMs: number,
): boolean {
	const entry = entries.get(identity);
	return entry !== undefined && observedAt - entry.lastSeenAt <= dedupeWindowMs;
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
