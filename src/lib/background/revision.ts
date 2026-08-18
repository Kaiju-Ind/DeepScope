/** Minimum wall-clock gap between non-final visible matcher revisions. */
export const intervalMs = 250;

/** Inputs used to decide whether one partial matcher result should repaint the side panel. */
export interface PublishInputType {
	/** Whether every matcher partition has completed. Final output is never delayed. */
	readonly final: boolean;
	/** Time of the previous visible detector revision, or zero before the first one. */
	readonly previousAt: number;
	/** Current wall-clock time in milliseconds. */
	readonly now: number;
}

/**
 * Decide whether a matcher result may publish another visible detector revision.
 *
 * Large result batches do not bypass the interval. That keeps storage writes and
 * side-panel reactive updates bounded even when many partitions complete in one
 * burst. Final output and the first partial result still publish immediately.
 */
export function shouldPublish(input: PublishInputType): boolean {
	if (input.final || input.previousAt <= 0) return true;
	return input.now - input.previousAt >= intervalMs;
}
