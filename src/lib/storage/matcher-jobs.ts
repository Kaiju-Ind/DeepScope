import type { MatcherJobRecord } from '../matcher';

import { browser } from 'wxt/browser';

import { getMatcherJobCacheKey } from './contracts';

/** Save or replace the durable lifecycle record for one matcher job. */
export async function saveMatcherJobRecord(record: MatcherJobRecord): Promise<MatcherJobRecord> {
	await browser.storage.local.set({ [getMatcherJobCacheKey(record.jobId)]: record });
	return record;
}

/** Read a matcher job lifecycle record by id. */
export async function getMatcherJobRecord(jobId: string): Promise<MatcherJobRecord | null> {
	const key = getMatcherJobCacheKey(jobId);
	const stored = await browser.storage.local.get(key);
	const value = stored[key];
	return isMatcherJobRecord(value) ? value : null;
}

/** Merge scalar lifecycle changes into an existing matcher job record. */
export async function updateMatcherJobRecord(
	jobId: string,
	patch: Partial<Omit<MatcherJobRecord, 'jobId' | 'tabId' | 'expectedUrl' | 'target' | 'createdAt'>>,
): Promise<MatcherJobRecord | null> {
	const existing = await getMatcherJobRecord(jobId);
	if (!existing) {
		return null;
	}

	const next = Object.assign({}, existing, patch, { updatedAt: Date.now() });
	await saveMatcherJobRecord(next);
	return next;
}

/** Runtime guard for records read from extension storage. */
function isMatcherJobRecord(value: unknown): value is MatcherJobRecord {
	return Boolean(
		value &&
		typeof value === 'object' &&
		'jobId' in value &&
		typeof value.jobId === 'string' &&
		'tabId' in value &&
		typeof value.tabId === 'number' &&
		'status' in value &&
		typeof value.status === 'string' &&
		'target' in value &&
		value.target &&
		typeof value.target === 'object',
	);
}
