import { bench, describe } from 'vitest';

import {
	createObservationBatchController,
	type NormalizedObservation,
	type ObservationBatchPolicy,
} from '@/lib/observations';

/** Number of observations used to approximate one heavy mutation burst. */
const OBSERVATION_COUNT = 2_000;

/** Vitest benchmark settings tuned for stable local comparison without huge CI cost. */
const BENCHMARK_OPTIONS = {
	time: 1_000,
	warmupTime: 250,
	iterations: 64,
	warmupIterations: 16,
} as const;

/** Workloads measured for the observation batch controller. */
const BATCH_CONTROLLER_WORKLOADS = ['unique', 'duplicate-storm'] as const;

/** Workload name measured by this benchmark. */
type BatchControllerWorkload = typeof BATCH_CONTROLLER_WORKLOADS[number];

/** Visible benchmark sink used because Tinybench does not expose `do_not_optimize()`. */
let consumedBatchCount = 0;

/** Consume benchmark output through a visible side effect. */
function consumeBatchCount(count: number): void {
	consumedBatchCount = (consumedBatchCount + count) % Number.MAX_SAFE_INTEGER;
}

/** Benchmark policy large enough to compare queue behavior rather than setup errors. */
const policy: ObservationBatchPolicy = {
	maxBatchObservations: 250,
	maxQueuedObservations: 2_500,
	dedupeWindowMs: 2_000,
	stormWindowMs: 10_000,
	maxAcceptedPerStormWindow: 2_500,
};

/** Shared target used by generated observations. */
const target = { url: 'https://example.test/', hostname: 'example.test' };

/** Create deterministic observations for one batch-controller workload. */
function createObservations(workload: BatchControllerWorkload): readonly NormalizedObservation[] {
	if (workload === 'duplicate-storm') {
		return Array.from({ length: OBSERVATION_COUNT }, (_item, index) => ({
			kind: 'scriptSrc',
			interface: 'extension',
			collector: 'content-observer',
			target,
			observedAt: 100 + index,
			value: `https://cdn.example/duplicate-${index % 25}.js`,
		}));
	}

	return Array.from({ length: OBSERVATION_COUNT }, (_item, index) => ({
		kind: index % 2 === 0 ? 'scriptSrc' : 'meta',
		interface: 'extension',
		collector: 'content-observer',
		target,
		observedAt: 100 + index,
		key: index % 2 === 0 ? undefined : `generator-${index}`,
		value: index % 2 === 0
			? `https://cdn.example/runtime-${index}.js`
			: `Generator ${index}`,
	}));
}

/** Push all observations and flush every queued batch. */
function runControllerWorkload(observations: readonly NormalizedObservation[]): number {
	const controller = createObservationBatchController(policy);
	for (const observation of observations) {
		controller.push(observation);
	}

	let emittedCount = 0;
	let batch = controller.flush({ target, observedAt: 10_000 });
	while (batch) {
		emittedCount += batch.observations.length;
		batch = controller.flush({ target, observedAt: 10_000 });
	}

	return emittedCount + controller.stats().duplicateDropCount + controller.stats().stormLimitDropCount;
}

const scenarios = BATCH_CONTROLLER_WORKLOADS.map((workload) => ({
	workload,
	observations: createObservations(workload),
}));

describe('observation batch controller', () => {
	for (const scenario of scenarios) {
		bench(`${scenario.workload} workload`, () => {
			consumeBatchCount(runControllerWorkload(scenario.observations));
		}, BENCHMARK_OPTIONS);
	}
});
