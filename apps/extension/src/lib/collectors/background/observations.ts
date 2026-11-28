import type { ObservationBatch, NormalizedObservation } from "@deepscope/detection/observations";
import type { JsGlobalSignalValue } from "./types.ts";

/** Attach sorted MAIN-world global signals to the originating batch's target and observation time. */
export function createJsGlobalObservations(
	batch: ObservationBatch,
	values: Record<string, JsGlobalSignalValue>,
): NormalizedObservation[] {
	return Object.entries(values)
		.sort(([left], [right]) => left.localeCompare(right))
		.map(([key, value]) => createObservation(batch, {
			kind: 'jsGlobal',
			collector: 'page-main-world',
			key,
			value,
		}));
}

/** Attach sorted background header signals to the originating batch without changing its target identity. */
export function createHeaderObservations(
	batch: ObservationBatch,
	values: Record<string, string>,
): NormalizedObservation[] {
	return Object.entries(values)
		.sort(([left], [right]) => left.localeCompare(right))
		.map(([key, value]) => createObservation(batch, {
			kind: 'header',
			collector: 'background-enrichment',
			key,
			value,
		}));
}

/** Convert fetched source text into ordered background observations for the requested source kind. */
export function createTextObservations(
	batch: ObservationBatch,
	kind: Extract<NormalizedObservation['kind'], 'scriptContent' | 'stylesheetContent'>,
	values: readonly string[],
): NormalizedObservation[] {
	return values.map((value) => createObservation(batch, {
		kind,
		collector: 'background-enrichment',
		value,
	}));
}

/** Retain the batch's target, interface and observation time while assigning the enrichment collector and optional key. */
function createObservation(
	batch: ObservationBatch,
	input: Pick<NormalizedObservation, 'kind' | 'collector' | 'value'> & Partial<Pick<NormalizedObservation, 'key'>>,
): NormalizedObservation {
	return {
		kind: input.kind,
		interface: batch.interface,
		collector: input.collector,
		target: batch.target,
		observedAt: batch.observedAt,
		value: input.value,
		...(input.key !== undefined ? { key: input.key } : {}),
	};
}
