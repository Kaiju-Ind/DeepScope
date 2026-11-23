import type { MatcherJobLifecycleRecord } from '@/lib/matcher';
import * as offscreen from '@/lib/matcher/offscreen';
import { reconcileMatcherJobRecords } from '@/lib/storage/matcher-jobs';

/**
 * Classify durable matcher diagnostics orphaned by a previous background context.
 *
 * A new MV3 service-worker context cannot recover the Promise ownership of work
 * dispatched by the previous context. The matcher scheduler cancels orphaned
 * offscreen work and recollects still-open documents; this pass only marks the
 * matching diagnostic records `context-interrupted` and strips legacy raw
 * fields. Rows written by older builds for private tabs are removed, and an
 * active one only after the offscreen host confirms the job stopped (or the
 * host document is confirmed gone), so a failed cancel is retried next start.
 */
export async function reconcileInterruptedMatcherJobs(
	currentContextId: string,
	log?: (event: string, details?: Record<string, unknown>) => void,
	/** Confirm that an orphaned job stopped. Chrome asks the offscreen host; a background page has nothing left to stop. */
	cancel: (jobId: string) => Promise<void> = offscreen.cancelForRecovery,
): Promise<MatcherJobLifecycleRecord[]> {
	const interrupted = await reconcileMatcherJobRecords(currentContextId, {
		cancel,
		reportFailure(stage, count) {
			log?.('matcher-job-legacy-private-migration-failed', { stage, count });
		},
	});
	if (interrupted.length) {
		log?.('matcher-jobs-reconciled-after-context-start', {
			count: interrupted.length,
			jobs: interrupted.map((record) => ({
				jobId: record.jobId,
				interruptedStatus: record.interruptedStatus,
				interruptedAt: record.interruptedAt,
			})),
		});
	}
	return interrupted;
}
