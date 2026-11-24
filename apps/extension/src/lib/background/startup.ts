import type { MatcherRecovery } from '@/lib/scheduler/matcher';

/** Scheduler surface startup reconciliation needs; both schedulers start paused. */
export interface StartupSchedulers {
	readonly analysis: {
		reconcile(): Promise<void>;
		resume(): void;
	};
	readonly matcher: {
		reconcile(): Promise<readonly MatcherRecovery[]>;
		resume(): void;
	};
}

/** Inputs for one background-context startup pass. */
export interface StartupReconciliationInput {
	readonly schedulers: StartupSchedulers;
	/** Mark diagnostic matcher records from earlier contexts `context-interrupted`. Returns their count. */
	readonly reconcileRecords: () => Promise<number>;
	/** Recollect one still-open document whose matcher work the previous context lost. */
	readonly recover: (recovery: MatcherRecovery) => void;
	readonly log: (event: string, details?: Record<string, unknown>) => void;
}

/** Outcome of startup reconciliation, reported for diagnostics and tests. */
export interface StartupReconciliationResult {
	/** True when every reconcile step succeeded; false means the schedulers resumed degraded. */
	readonly complete: boolean;
	readonly recoveries: readonly MatcherRecovery[];
}

/**
 * Reconcile durable scheduler state left by a previous background context, then resume.
 *
 * Both schedulers pause in `reconcile()` so no new work races the cleanup of
 * orphaned records and offscreen workers. Resumption therefore happens in a
 * `finally`: if any step fails (IndexedDB unavailable, storage error), the
 * schedulers still resume in a logged degraded mode instead of leaving every
 * later analysis waiting forever. Recovery recollection runs only for documents
 * the matcher reconcile actually returned.
 */
export async function reconcileAndResume(input: StartupReconciliationInput): Promise<StartupReconciliationResult> {
	let recoveries: readonly MatcherRecovery[] = [];
	const failures: string[] = [];
	try {
		const [analysis, matcher, records] = await Promise.allSettled([
			input.schedulers.analysis.reconcile(),
			input.schedulers.matcher.reconcile(),
			input.reconcileRecords(),
		]);
		if (analysis.status === 'rejected') failures.push(describe('analysis', analysis.reason));
		if (matcher.status === 'rejected') failures.push(describe('matcher', matcher.reason));
		else recoveries = matcher.value;
		if (records.status === 'rejected') failures.push(describe('records', records.reason));
		input.log('scheduler-reconciled', {
			recoveryCount: recoveries.length,
			interruptedMatcherJobCount: records.status === 'fulfilled' ? records.value : undefined,
		});
	} finally {
		input.schedulers.matcher.resume();
		input.schedulers.analysis.resume();
	}

	if (failures.length) {
		input.log('scheduler-reconciliation-degraded', { failures });
	}
	for (const recovery of recoveries) input.recover(recovery);
	return { complete: failures.length === 0, recoveries };
}

/** Summarize a failed step without page data: reconcile errors come from storage, not pages. */
function describe(step: string, error: unknown): string {
	return `${step}: ${error instanceof Error ? error.name : typeof error}`;
}
