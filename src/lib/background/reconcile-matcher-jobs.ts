import type { MatcherJobRecord } from '@/lib/matcher';
import { cancelOffscreenMatcherJob } from '@/lib/lifecycle/offscreen-matcher';
import { isMatcherJobActive, listMatcherJobRecords, updateMatcherJobRecord } from '@/lib/storage/matcher-jobs';

/**
 * Resolve matcher jobs orphaned by a previous background context.
 *
 * A new MV3 service-worker context cannot recover the Promise/callback ownership
 * of work dispatched by the previous context. Any non-terminal durable record is
 * therefore interrupted work, even when Chrome suspended the old context rather
 * than crashing it. The offscreen host is asked to stop the orphan before the
 * record is marked failed for diagnostics and later recovery policy.
 */
export async function reconcileInterruptedMatcherJobs(
	log?: (event: string, details?: Record<string, unknown>) => void,
): Promise<MatcherJobRecord[]> {
	const active = (await listMatcherJobRecords()).filter(isMatcherJobActive);
	if (!active.length) return [];

	const reconciled: MatcherJobRecord[] = [];
	for (const record of active) {
		try {
			await cancelOffscreenMatcherJob(record.jobId);
		} catch (error) {
			log?.('matcher-job-interruption-cancel-failed', {
				jobId: record.jobId,
				message: error instanceof Error ? error.message : String(error),
			});
		}

		const interruptedAt = Date.now();
		const updated = await updateMatcherJobRecord(record.jobId, {
			status: 'failed',
			reason: 'context-interrupted',
			interruptedStatus: record.status,
			interruptedAt,
			errorMessage: 'Matcher work was interrupted when its owning background context ended.',
		});
		if (updated) reconciled.push(updated);
	}

	log?.('matcher-jobs-reconciled-after-context-start', {
		count: reconciled.length,
		jobs: reconciled.map((record) => ({
			jobId: record.jobId,
			interruptedStatus: record.interruptedStatus,
			interruptedAt: record.interruptedAt,
		})),
	});
	return reconciled;
}
