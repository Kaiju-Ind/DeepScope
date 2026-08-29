import type { NormalizedObservation, ObservationBatch, ObservationValue } from '../observations';

/** Approximate object/array bookkeeping retained for one normalized observation. */
const OBSERVATION_OVERHEAD_BYTES = 128;

/** Approximate bookkeeping retained for one scalar attribute key/value pair. */
const ATTRIBUTE_OVERHEAD_BYTES = 32;

/** Approximate batch/target bookkeeping that is independent of observation count. */
const BATCH_OVERHEAD_BYTES = 256;

/** JavaScript strings use one-byte or two-byte internal forms. Two bytes is the safe planning estimate. */
const STRING_BYTES_PER_CODE_UNIT = 2;

/**
 * Estimate the retained JavaScript payload cost of one observation batch.
 *
 * This is an admission-control estimate, not a heap profiler. It intentionally
 * overestimates ordinary ASCII strings because the queue's job is to reject
 * another large structured-clone payload before memory pressure becomes a
 * browser-level failure. The estimate is deterministic and allocation-free.
 */
export function estimateObservationBatchBytes(batch: ObservationBatch): number {
	let bytes = BATCH_OVERHEAD_BYTES;
	bytes += estimateStringBytes(batch.target.url);
	bytes += estimateStringBytes(batch.target.hostname);
	bytes += estimateStringBytes(batch.interface);

	for (const observation of batch.observations) {
		bytes += estimateObservationBytes(observation);
	}

	return bytes;
}

/** Estimate one normalized observation without serializing it to JSON. */
function estimateObservationBytes(observation: NormalizedObservation): number {
	let bytes = OBSERVATION_OVERHEAD_BYTES;
	bytes += estimateStringBytes(observation.kind);
	bytes += estimateStringBytes(observation.interface);
	bytes += estimateStringBytes(observation.collector);
	bytes += estimateStringBytes(observation.target.url);
	bytes += estimateStringBytes(observation.target.hostname);
	bytes += observation.key === undefined ? 0 : estimateStringBytes(observation.key);
	bytes += estimateObservationValueBytes(observation.value);

	if (observation.attributes) {
		for (const [key, value] of Object.entries(observation.attributes)) {
			bytes += ATTRIBUTE_OVERHEAD_BYTES;
			bytes += estimateStringBytes(key);
			bytes += estimateObservationValueBytes(value);
		}
	}

	return bytes;
}

/** Estimate one scalar observation value. Numbers and booleans use a small fixed planning cost. */
function estimateObservationValueBytes(value: ObservationValue): number {
	return typeof value === 'string' ? estimateStringBytes(value) : 16;
}

/** Estimate a JavaScript string with a conservative two-byte code-unit multiplier. */
function estimateStringBytes(value: string): number {
	return value.length * STRING_BYTES_PER_CODE_UNIT;
}
