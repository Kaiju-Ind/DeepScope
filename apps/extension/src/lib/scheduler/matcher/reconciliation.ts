/**
 * Own the startup pause while orphaned workers and records are reconciled.
 *
 * New jobs and lifecycle requests wait on the same promise. Resume releases
 * that promise synchronously; the scheduler then starts its dispatch pump.
 */
export function create() {
	let paused = false;
	let resumeWaiter: (() => void) | undefined;
	let resumed = Promise.resolve();

	return {
		/** Expose the current admission pause without creating or waiting on a resume promise. */
		isPaused: () => paused,
		/** Create one shared resume promise for a paused interval; repeated pauses retain the same waiting callers. */
		pause(): void {
			if (paused) return;
			paused = true;
			resumed = new Promise<void>((resolve) => { resumeWaiter = resolve; });
		},
		/** Hold admission only while reconciliation is paused, sharing the current resume promise. */
		async wait(): Promise<void> {
			if (!paused) return;
			await resumed;
		},
		/** Resolve the current pause exactly once and report whether dispatch needs to restart. */
		resume(): boolean {
			if (!paused) return false;
			paused = false;
			const resolve = resumeWaiter;
			resumeWaiter = undefined;
			resolve?.();
			return true;
		},
	};
}
