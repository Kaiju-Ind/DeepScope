/** Maximum foreground/interactive partition dispatches before lower-priority work receives one turn. */
export const FOREGROUND_BURST_LIMIT = 8;

/** Minimal scheduling projection used to choose the next matcher partition owner. */
export interface Candidate {
	readonly jobId: string;
	readonly priorityRank: number;
	readonly createdAt: number;
	readonly lastDispatchSequence: number;
	readonly taskPriority: number;
}

/** Result of one fairness decision, including the next foreground burst state. */
export interface Selection {
	readonly candidate: Candidate;
	readonly foregroundDispatches: number;
}

/**
 * Select the next partition owner without starving background tabs.
 *
 * Interactive and foreground jobs normally win. When lower-priority work is
 * waiting, one background/maintenance turn is forced after a bounded foreground
 * burst. Jobs at the same semantic priority are round-robin by their last
 * dispatch sequence, then prefer cheaper matcher partitions.
 */
export function select(
	candidates: readonly Candidate[],
	foregroundDispatches: number,
	burstLimit = FOREGROUND_BURST_LIMIT,
): Selection | undefined {
	if (candidates.length === 0) return undefined;
	const foreground = candidates.filter((candidate) => candidate.priorityRank <= 1);
	const lower = candidates.filter((candidate) => candidate.priorityRank > 1);

	if (lower.length > 0 && foreground.length > 0 && foregroundDispatches >= burstLimit) {
		return { candidate: [...lower].sort(compare)[0]!, foregroundDispatches: 0 };
	}

	const candidate = [...candidates].sort(compare)[0]!;
	return {
		candidate,
		foregroundDispatches: candidate.priorityRank <= 1 && lower.length > 0
			? foregroundDispatches + 1
			: 0,
	};
}

/** Stable ordering inside one semantic priority class. */
function compare(left: Candidate, right: Candidate): number {
	return (
		left.priorityRank - right.priorityRank ||
		left.lastDispatchSequence - right.lastDispatchSequence ||
		left.taskPriority - right.taskPriority ||
		left.createdAt - right.createdAt ||
		left.jobId.localeCompare(right.jobId)
	);
}
