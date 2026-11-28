import type { RunMatcherJobRequest } from '../../matcher/contracts.ts';
import type { MatcherPartitionExecutor, MatcherRecovery } from './types.ts';
import { MatcherWorkSchema, EXECUTION_SCHEMA_VERSION } from '../schema.ts';
import type { MatcherWorkType, WorkPriorityType } from '../schema.ts';
import * as priority from '../priority.ts';
import * as session from '../session.ts';
import * as database from '../database.ts';
import { createDetectionStorageHash } from '../../storage/contracts.ts';

/** Create the small durable control record. Observation batches remain in scheduler memory. */
export function create(
	request: RunMatcherJobRequest,
	browserSessionId: string,
	workPriority: WorkPriorityType,
	createdAt: number,
	estimatedBytes: number,
): MatcherWorkType {
	return MatcherWorkSchema.parse({
		schemaVersion: EXECUTION_SCHEMA_VERSION,
		id: request.job.jobId,
		kind: 'matcher',
		browserSessionId,
		windowId: request.job.windowId,
		tabId: request.job.tabId,
		documentKey: createDetectionStorageHash(request.job.expectedUrl),
		priority: workPriority,
		priorityRank: priority.rank(workPriority),
		state: 'queued',
		createdAt,
		updatedAt: createdAt,
		attempt: 0,
		mode: request.mode,
		estimatedBytes,
	});
}

/** Remove orphaned control records after stopping their physical workers, then return documents to recollect. */
export async function recover(
	executor: Pick<MatcherPartitionExecutor, 'cancelTab'>,
	log?: (event: string, details?: Record<string, unknown>) => void,
): Promise<readonly MatcherRecovery[]> {
	const browserSessionId = await session.get();
	await database.removeOtherSessions(browserSessionId);
	const matcherRecords = (await database.listKind(browserSessionId, 'matcher'))
		.filter((work): work is MatcherWorkType => work.kind === 'matcher');
	const tabIds = [...new Set(matcherRecords.map((work) => work.tabId))];
	for (const tabId of tabIds) await executor.cancelTab(tabId, 'context-interrupted');
	for (const work of matcherRecords) await database.remove(work.id);

	const recoveriesByDocument = new Map<string, MatcherRecovery>();
	for (const work of matcherRecords) {
		const recovery = { tabId: work.tabId, windowId: work.windowId, documentKey: work.documentKey };
		recoveriesByDocument.set(`${work.windowId}:${work.tabId}:${work.documentKey}`, recovery);
	}
	const recoveries = [...recoveriesByDocument.values()];
	log?.('scheduler-matcher-reconciled', { orphanedJobs: matcherRecords.length, recoveries });
	return recoveries;
}
