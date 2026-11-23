import type { MatcherJobRecord } from '../matcher';

import { browser } from 'wxt/browser';

import { getMatcherJobCacheKey, MATCHER_JOB_CACHE_PREFIX } from './contracts';

const MAX_MATCHER_JOB_RECORDS = 80;
const MAX_TERMINAL_JOB_AGE_MS = 1000 * 60 * 60 * 24 * 7;

/**
 * Save ordinary matcher jobs for restart recovery and diagnostics.
 *
 * Private jobs remain owned by the background's in-memory execution context.
 * Return their record without accessing local storage. Startup owns removal of
 * records left by earlier extension versions.
 */
export async function saveMatcherJobRecord(record: MatcherJobRecord): Promise<MatcherJobRecord> {
	if (record.incognito) {
		return record;
	}

	const key = getMatcherJobCacheKey(record.jobId);
	await browser.storage.local.set({ [key]: record });
	if (record.status === 'queued') void trimMatcherJobRecords().catch(() => undefined);
	return record;
}

/** Read an ordinary job by ID without exposing an older private record. */
export async function getMatcherJobRecord(jobId: string): Promise<MatcherJobRecord | null> {
	const key = getMatcherJobCacheKey(jobId);
	const stored = await browser.storage.local.get(key);
	const value = stored[key];
	return isMatcherJobRecord(value) && !value.incognito ? value : null;
}

/** Update a durable job; private or missing jobs have no stored state to update. */
export async function updateMatcherJobRecord(
	job: Pick<MatcherJobRecord, 'jobId' | 'incognito'>,
	patch: Partial<Omit<MatcherJobRecord, 'jobId' | 'tabId' | 'expectedUrl' | 'target' | 'createdAt' | 'incognito'>>,
): Promise<MatcherJobRecord | null> {
	if (job.incognito) return null;
	const existing = await getMatcherJobRecord(job.jobId);
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

/** Read the durable records that match the existing matcher storage format. */
async function getStoredMatcherJobEntries(): Promise<[string, MatcherJobRecord][]> {
	const all = await browser.storage.local.get(null);
	return Object.entries(all).filter(isMatcherJobRecordEntry);
}

/** Read ordinary durable jobs newest first. Only startup migrates old private rows. */
export async function listMatcherJobRecords(): Promise<MatcherJobRecord[]> {
	return ordinaryMatcherJobRecords(await getStoredMatcherJobEntries());
}

/**
 * Recover ordinary jobs while retiring records written by the old private policy.
 *
 * Startup can cancel active offscreen work before deleting its last durable ID.
 * Only the ID reaches the cancel callback. Failed cleanup keeps its row available
 * for another startup attempt without including it in ordinary recovery.
 */
export async function listMatcherJobRecordsForRecovery(
	cancelLegacyPrivateJob: (jobId: string) => Promise<void>,
	reportMigrationFailure: (stage: 'cancel' | 'remove', count: number) => void,
): Promise<MatcherJobRecord[]> {
	const entries = await getStoredMatcherJobEntries();
	const keysToRemove: string[] = [];
	let failedCancellationCount = 0;
	for (const [key, record] of entries) {
		if (!record.incognito) continue;
		if (isMatcherJobActive(record)) {
			try {
				await cancelLegacyPrivateJob(record.jobId);
			} catch {
				failedCancellationCount += 1;
				continue;
			}
		}
		keysToRemove.push(key);
	}

	if (failedCancellationCount) reportMigrationFailure('cancel', failedCancellationCount);
	if (keysToRemove.length) {
		try {
			await browser.storage.local.remove(keysToRemove);
		} catch {
			reportMigrationFailure('remove', keysToRemove.length);
		}
	}
	return ordinaryMatcherJobRecords(entries);
}

/** Keep private rows out of every ordinary listing, including after cleanup fails. */
function ordinaryMatcherJobRecords(entries: [string, MatcherJobRecord][]): MatcherJobRecord[] {
	return entries
		.filter(([, value]) => !value.incognito)
		.map(([, value]) => value)
		.sort((left, right) => right.updatedAt - left.updatedAt);
}

/** Return whether a durable job still represents unfinished matcher work. */
export function isMatcherJobActive(record: MatcherJobRecord): boolean {
	return record.status === 'queued' || record.status === 'dispatching' || record.status === 'running' || record.status === 'streaming' || record.status === 'recording';
}


/** Remove old terminal matcher records without deleting work that can still be reconciled. */
async function trimMatcherJobRecords(): Promise<void> {
	const entries = (await getStoredMatcherJobEntries())
		.filter(([, value]) => !value.incognito)
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
