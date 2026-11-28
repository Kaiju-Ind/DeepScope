import type { MatcherPartitionTask } from '../../matcher/contracts.ts';
import type { PendingMatcher } from './types.ts';
import * as fairness from '../fairness.ts';

/** Read-only views of scheduler-owned queues; selection does not reserve or dispatch work. */
export interface Input {
	readonly pending: ReadonlyMap<string, PendingMatcher>;
	readonly canceledJobs: ReadonlySet<string>;
	readonly inFlightKinds: ReadonlySet<MatcherPartitionTask['kind']>;
	readonly workerIndexByKind: ReadonlyMap<MatcherPartitionTask['kind'], number>;
	readonly busyWorkerIndexes: ReadonlySet<number>;
	readonly getCapacity: () => number;
}

/** Build synchronous selection methods over the scheduler's live state. */
export function create(input: Input) {
	const { pending, canceledJobs, inFlightKinds, workerIndexByKind, busyWorkerIndexes, getCapacity } = input;


	/** Choose one runnable partition while preserving kind affinity and bounded background fairness. */
	function selectNext(foregroundDispatches: number): {
		readonly jobId: string;
		readonly task: MatcherPartitionTask;
		readonly workerIndex: number;
		/** Burst counter to commit if, and only if, this selection is dispatched. */
		readonly foregroundDispatches: number;
	} | undefined {
		const taskByJob = new Map<string, { readonly task: MatcherPartitionTask; readonly workerIndex: number }>();
		const candidates: fairness.Candidate[] = [];
		for (const [jobId, item] of pending) {
			if (canceledJobs.has(jobId)) continue;
			const runnable = findRunnableTask(item);
			if (!runnable) continue;
			const { task, workerIndex } = runnable;
			taskByJob.set(jobId, runnable);
			candidates.push({
				jobId,
				priorityRank: item.priorityRank,
				createdAt: item.createdAt,
				lastDispatchSequence: item.lastDispatchSequence,
				taskPriority: task.priority,
			});
		}
		const selection = fairness.select(candidates, foregroundDispatches);
		if (!selection) return undefined;
		const runnable = taskByJob.get(selection.candidate.jobId);
		return runnable
			? { jobId: selection.candidate.jobId, ...runnable, foregroundDispatches: selection.foregroundDispatches }
			: undefined;
	}

	/** Detect uncanceled work whose next partition satisfies the selector's current dispatch constraints. */
	function hasRunnablePartition(): boolean {
		for (const [jobId, item] of pending) {
			if (!canceledJobs.has(jobId) && findRunnableTask(item)) return true;
		}
		return false;
	}

	/** Find the first partition whose affinity worker is currently available. */
	function findRunnableTask(item: PendingMatcher): { readonly task: MatcherPartitionTask; readonly workerIndex: number } | undefined {
		for (const task of item.remaining) {
			if (inFlightKinds.has(task.kind)) continue;
			const workerIndex = getAvailableWorkerIndex(task.kind);
			if (workerIndex !== undefined) return { task, workerIndex };
		}
		return undefined;
	}

	/** Preserve a warm shard on its previous worker instead of duplicating it onto an idle peer. */
	function getAvailableWorkerIndex(kind: MatcherPartitionTask['kind']): number | undefined {
		const preferred = workerIndexByKind.get(kind);
		if (preferred !== undefined) return busyWorkerIndexes.has(preferred) ? undefined : preferred;
		for (let index = 0; index < Math.max(1, getCapacity()); index += 1) {
			if (!busyWorkerIndexes.has(index)) return index;
		}
		return undefined;
	}
	return { selectNext, hasRunnablePartition };
}
