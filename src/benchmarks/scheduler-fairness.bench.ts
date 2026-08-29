import { bench, do_not_optimize, summary } from 'mitata';

import * as fairness from '@/lib/scheduler/fairness';

/** Eight jobs matches the matcher's current transient job admission ceiling. */
const candidates: fairness.Candidate[] = Array.from({ length: 8 }, (_item, index) => ({
	jobId: `job-${index}`,
	priorityRank: index < 2 ? 1 : 2,
	createdAt: index,
	lastDispatchSequence: index % 3,
	taskPriority: (index % 4) + 1,
}));

function consume(candidate: fairness.Candidate | undefined): void {
	do_not_optimize(candidate);
}

/** Strict foreground-first reference without the bounded background-progress rule. */
function selectStrict(source: readonly fairness.Candidate[]): fairness.Candidate | undefined {
	let selected: fairness.Candidate | undefined;
	for (const candidate of source) {
		if (!selected || compare(candidate, selected) < 0) selected = candidate;
	}
	return selected;
}

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
summary(() => {
	bench('strict priority reference', () => {
		consume(selectStrict(candidates));
	});

	bench('bounded fair selection', () => {
		consume(fairness.select(candidates, fairness.FOREGROUND_BURST_LIMIT)?.candidate);
	});
});
