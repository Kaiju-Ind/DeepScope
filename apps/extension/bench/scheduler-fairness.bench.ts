import { describe, test } from 'vitest';

import * as fairness from '../src/lib/scheduler/fairness.ts';

/** Eight jobs matches the matcher's current transient job admission ceiling. */
const candidates: fairness.Candidate[] = Array.from({ length: 8 }, (_item, index) => ({
	jobId: `job-${index}`,
	priorityRank: index < 2 ? 1 : 2,
	createdAt: index,
	lastDispatchSequence: index % 3,
	taskPriority: (index % 4) + 1,
}));

/** Vitest benchmark settings; selection is cheap, so a short window is enough. */
const BENCHMARK_OPTIONS = {
	time: 500,
	warmupTime: 100,
} as const;

/** Observable benchmark sink used because Tinybench does not expose `do_not_optimize()`. */
let consumedSelections = 0;

/** Consume the selection through a visible side effect so the engine cannot drop the work. */
function consume(candidate: fairness.Candidate | undefined): void {
	if (candidate) consumedSelections = (consumedSelections + 1) % Number.MAX_SAFE_INTEGER;
}

/** Strict foreground-first reference without the bounded background-progress rule. */
function selectStrict(source: readonly fairness.Candidate[]): fairness.Candidate | undefined {
	let selected: fairness.Candidate | undefined;
	for (const candidate of source) {
		if (!selected || compare(candidate, selected) < 0) selected = candidate;
	}
	return selected;
}

/** Strict ordering: priority, then least-recently dispatched, task priority, age and id. */
function compare(left: fairness.Candidate, right: fairness.Candidate): number {
	return (
		left.priorityRank - right.priorityRank ||
		left.lastDispatchSequence - right.lastDispatchSequence ||
		left.taskPriority - right.taskPriority ||
		left.createdAt - right.createdAt ||
		left.jobId.localeCompare(right.jobId)
	);
}

/**
 * Measure the policy cost paid once per matcher partition selection.
 *
 * The strict selector is not a proposed replacement because it can starve
 * background tabs. It is a reference for the incremental CPU/allocation cost of
 * bounded fairness at the scheduler's actual eight-job admission ceiling.
 */
describe('scheduler fairness', () => {
	test('strict priority reference', async ({ bench }) => {
		await bench('strict priority reference', () => {
			consume(selectStrict(candidates));
		}).run(BENCHMARK_OPTIONS);
	});

	test('bounded fair selection', async ({ bench }) => {
		await bench('bounded fair selection', () => {
			consume(fairness.select(candidates, fairness.FOREGROUND_BURST_LIMIT)?.candidate);
		}).run(BENCHMARK_OPTIONS);
	});
});
