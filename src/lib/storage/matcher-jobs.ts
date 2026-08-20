import type { MatcherJobRecord } from '../matcher';

import { browser } from 'wxt/browser';

import { getMatcherJobCacheKey, MATCHER_JOB_CACHE_PREFIX } from './contracts';

const MAX_MATCHER_JOB_RECORDS = 80;
const MAX_TERMINAL_JOB_AGE_MS = 1000 * 60 * 60 * 24 * 7;

/** Save or replace the durable lifecycle record for one matcher job. */
export async function saveMatcherJobRecord(record: MatcherJobRecord): Promise<MatcherJobRecord> {
	await browser.storage.local.set({ [getMatcherJobCacheKey(record.jobId)]: record });
	if (record.status === 'queued') void trimMatcherJobRecords().catch(() => undefined);
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

/** Return whether a local-storage entry contains one durable matcher job. */
function isMatcherJobRecordEntry(entry: [string, unknown]): entry is [string, MatcherJobRecord] {
	return entry[0].startsWith(MATCHER_JOB_CACHE_PREFIX) && isMatcherJobRecord(entry[1]);
}

/** Read all durable matcher jobs, newest first. */
export async function listMatcherJobRecords(): Promise<MatcherJobRecord[]> {
	const all = await browser.storage.local.get(null);
	return Object.entries(all)
		.filter(isMatcherJobRecordEntry)
		.map(([, value]) => value)
		.sort((left, right) => right.updatedAt - left.updatedAt);
}

/** Return whether a durable job still represents unfinished matcher work. */
export function isMatcherJobActive(record: MatcherJobRecord): boolean {
	return record.status === 'queued' || record.status === 'dispatching' || record.status === 'running' || record.status === 'streaming' || record.status === 'recording';
}


/** Remove old terminal matcher records without deleting work that can still be reconciled. */
async function trimMatcherJobRecords(): Promise<void> {
	const all = await browser.storage.local.get(null);
	const entries = Object.entries(all)
		.filter(isMatcherJobRecordEntry)
		.map(([key, value]) => ({ key, value }))
		.sort((left, right) => right.value.updatedAt - left.value.updatedAt);
	const active = entries.filter(({ value }) => isMatcherJobActive(value));
	const terminal = entries.filter(({ value }) => !isMatcherJobActive(value));
	const keepTerminalCount = Math.max(0, MAX_MATCHER_JOB_RECORDS - active.length);
	const now = Date.now();
	const remove = terminal
		.filter(({ value }, index) => index >= keepTerminalCount || now - value.updatedAt > MAX_TERMINAL_JOB_AGE_MS)
		.map(({ key }) => key);
	if (remove.length) await browser.storage.local.remove(remove);
}
