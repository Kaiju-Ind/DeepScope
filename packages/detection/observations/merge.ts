import type { NormalizedObservation, ObservationBatch } from "./index.ts";

/**
 * Append late observations to the baseline batch and remove duplicate facts.
 *
 * Graph refinement needs one candidate set built from everything known about the
 * page, not a final-result merge. The key deliberately ignores timestamps so a
 * repeated script URL observed later does not create a second evidence record.
 */
export function mergeObservationBatches(base: ObservationBatch, next: ObservationBatch): ObservationBatch {
	const observations: NormalizedObservation[] = [];
	const seen = new Set<string>();
	for (const observation of [...base.observations, ...next.observations]) {
		const key = createObservationDeduplicationKey(observation);
		if (seen.has(key)) {
			continue;
		}

		seen.add(key);
		observations.push(observation);
	}

	return Object.assign({}, base, {
		observedAt: Math.max(base.observedAt, next.observedAt),
		observations,
	});
}

/** Identify a fact by kind, collector, key, value and sorted attributes while deliberately ignoring observation time. */
export function createObservationDeduplicationKey(observation: NormalizedObservation): string {
	const attributes = observation.attributes
		? Object.entries(observation.attributes)
			.sort(([left], [right]) => left.localeCompare(right))
			.map(([key, value]) => `${key}:${String(value)}`)
			.join('|')
		: '';

	return [
		observation.kind,
		observation.collector,
		observation.key ?? '',
		String(observation.value),
		attributes,
	].join('\u001f');
}

/** Require both hostname and complete URL equality before callers combine batches from one page. */
export function isSameObservationTarget(left: ObservationBatch, right: ObservationBatch): boolean {
	return left.target.hostname === right.target.hostname && left.target.url === right.target.url;
}
