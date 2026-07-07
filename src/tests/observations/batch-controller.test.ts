import { describe, expect, it } from 'vitest';

import {
	createObservationBatchController,
	type NormalizedObservation,
	type ObservationBatchPolicy,
} from '@/lib/observations';

const target = { url: 'https://example.test/', hostname: 'example.test' };

function makePolicy(overrides: Partial<ObservationBatchPolicy> = {}): ObservationBatchPolicy {
	return {
		maxBatchObservations: 2,
		maxQueuedObservations: 4,
		dedupeWindowMs: 500,
		stormWindowMs: 1_000,
		maxAcceptedPerStormWindow: 10,
		...overrides,
	};
}

function makeObservation(overrides: Partial<NormalizedObservation> = {}): NormalizedObservation {
	return {
		kind: 'scriptSrc',
		interface: 'extension',
		collector: 'content-observer',
		target,
		observedAt: 100,
		value: 'https://cdn.example/runtime.js',
		...overrides,
	};
}

describe('observation batch controller', () => {
	it('flushes queued observations in bounded batches', () => {
		const controller = createObservationBatchController(makePolicy());
		controller.push(makeObservation({ value: 'one.js' }));
		controller.push(makeObservation({ value: 'two.js' }));
		controller.push(makeObservation({ value: 'three.js' }));

		const first = controller.flush({ target, observedAt: 200 });
		const second = controller.flush({ target, observedAt: 300 });

		expect(first?.observations.map((observation) => observation.value)).toEqual(['one.js', 'two.js']);
		expect(second?.observations.map((observation) => observation.value)).toEqual(['three.js']);
		expect(controller.flush({ target, observedAt: 400 })).toBeNull();
	});

	it('drops duplicate observations inside the dedupe window', () => {
		const controller = createObservationBatchController(makePolicy());

		expect(controller.push(makeObservation({ observedAt: 100 })).accepted).toBe(true);
		expect(controller.push(makeObservation({ observedAt: 300 }))).toEqual({
			accepted: false,
			reason: 'duplicate',
			queuedCount: 1,
		});
		expect(controller.stats()).toMatchObject({ duplicateDropCount: 1, queuedCount: 1 });
	});

	it('accepts the same observation again after the dedupe window', () => {
		const controller = createObservationBatchController(makePolicy());

		controller.push(makeObservation({ observedAt: 100 }));
		const result = controller.push(makeObservation({ observedAt: 700 }));

		expect(result.accepted).toBe(true);
		expect(controller.stats()).toMatchObject({ acceptedCount: 2, duplicateDropCount: 0 });
	});

	it('drops unique observations when the queue is full', () => {
		const controller = createObservationBatchController(makePolicy({ maxBatchObservations: 2, maxQueuedObservations: 2 }));

		controller.push(makeObservation({ value: 'one.js' }));
		controller.push(makeObservation({ value: 'two.js' }));
		const result = controller.push(makeObservation({ value: 'three.js' }));

		expect(result).toEqual({ accepted: false, reason: 'queue-limit', queuedCount: 2 });
		expect(controller.stats()).toMatchObject({ queueLimitDropCount: 1 });
	});

	it('drops observations after the storm window limit is reached', () => {
		const controller = createObservationBatchController(makePolicy({ maxAcceptedPerStormWindow: 2 }));

		controller.push(makeObservation({ observedAt: 100, value: 'one.js' }));
		controller.push(makeObservation({ observedAt: 200, value: 'two.js' }));
		const result = controller.push(makeObservation({ observedAt: 300, value: 'three.js' }));

		expect(result).toEqual({ accepted: false, reason: 'storm-limit', queuedCount: 2 });
		expect(controller.stats()).toMatchObject({ stormLimitDropCount: 1, acceptedInStormWindow: 2 });
	});

	it('starts a new storm window after the configured duration', () => {
		const controller = createObservationBatchController(makePolicy({ maxAcceptedPerStormWindow: 1 }));

		controller.push(makeObservation({ observedAt: 100, value: 'one.js' }));
		const accepted = controller.push(makeObservation({ observedAt: 1_200, value: 'two.js' }));

		expect(accepted.accepted).toBe(true);
		expect(controller.stats()).toMatchObject({ acceptedInStormWindow: 1 });
	});

	it('uses stable attribute ordering for dedupe identity', () => {
		const controller = createObservationBatchController(makePolicy());
		const first = makeObservation({
			kind: 'link',
			key: 'stylesheet',
			value: 'https://example.test/app.css',
			attributes: { media: 'all', rel: 'stylesheet' },
		});
		const second = makeObservation({
			kind: 'link',
			key: 'stylesheet',
			value: 'https://example.test/app.css',
			attributes: { rel: 'stylesheet', media: 'all' },
		});

		controller.push(first);
		expect(controller.push(second).reason).toBe('duplicate');
	});

	it('resets queue and dedupe state without resetting cumulative counters', () => {
		const controller = createObservationBatchController(makePolicy());
		controller.push(makeObservation());

		controller.reset();
		const afterReset = controller.push(makeObservation());

		expect(afterReset.accepted).toBe(true);
		expect(controller.stats()).toMatchObject({ acceptedCount: 2, queuedCount: 1 });
	});
});
