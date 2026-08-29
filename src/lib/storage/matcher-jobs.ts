import type { MatcherJobLifecycleRecord, MatcherJobRecord } from '../matcher';

import { browser } from 'wxt/browser';

import { getMatcherJobCacheKey, MATCHER_JOB_CACHE_PREFIX } from './contracts';

const MAX_MATCHER_JOB_RECORDS = 80;
const MAX_TERMINAL_JOB_AGE_MS = 1000 * 60 * 60 * 24 * 7;
const MATCHER_JOB_LIFECYCLE_SCHEMA_VERSION = 2 as const;

type MatcherJobLifecyclePatch = Partial<Omit<
	MatcherJobLifecycleRecord,
	'schemaVersion' | 'jobId' | 'tabId' | 'windowId' | 'contextId' | 'createdAt'
>>;

/**
 * Persist the privacy-safe lifecycle projection for one matcher job.
 *
 * Raw document URLs and observation targets belong to transient matcher work and
 * are deliberately omitted. Incognito matcher jobs never enter durable storage.
 */
export async function saveMatcherJobRecord(
	record: MatcherJobRecord | MatcherJobLifecycleRecord,
): Promise<MatcherJobLifecycleRecord> {
	const lifecycle = toMatcherJobLifecycleRecord(record);
	if ('incognito' in record && record.incognito === true) return lifecycle;

	await browser.storage.local.set({ [getMatcherJobCacheKey(record.jobId)]: lifecycle });
	if (lifecycle.status === 'queued') void trimMatcherJobRecords().catch(() => undefined);
	return lifecycle;
}

/** Read one privacy-safe matcher lifecycle record by id. */
export async function getMatcherJobRecord(jobId: string): Promise<MatcherJobLifecycleRecord | null> {
	const key = getMatcherJobCacheKey(jobId);
	const stored = await browser.storage.local.get(key);
	const value = stored[key];
	if (!isMatcherJobRecordSource(value) || isIncognitoLegacyRecord(value)) return null;
	return toMatcherJobLifecycleRecord(value);
}

/** Merge lifecycle changes into an existing matcher diagnostic record. */
export async function updateMatcherJobRecord(
	jobId: string,
	patch: MatcherJobLifecyclePatch,
): Promise<MatcherJobLifecycleRecord | null> {
	const existing = await getMatcherJobRecord(jobId);
	if (!existing) return null;

	const next = Object.assign({}, existing, patch, { updatedAt: Date.now() });
	await saveMatcherJobRecord(next);
	return next;
}

/** Read all matcher lifecycle records, newest first, without exposing legacy raw document fields. */
export async function listMatcherJobRecords(): Promise<MatcherJobLifecycleRecord[]> {
	const all = await browser.storage.local.get(null);
	return Object.entries(all)
		.filter(isMatcherJobRecordEntry)
		.filter(([, value]) => !isIncognitoLegacyRecord(value))
		.map(([, value]) => toMatcherJobLifecycleRecord(value))
		.sort((left, right) => right.updatedAt - left.updatedAt);
}

/** Return whether a durable diagnostic record still describes unfinished matcher work. */
export function isMatcherJobActive(record: MatcherJobLifecycleRecord): boolean {
	return record.status === 'queued'
		|| record.status === 'dispatching'
		|| record.status === 'running'
		|| record.status === 'streaming'
		|| record.status === 'recording';
}

/**
 * Sanitize historical matcher records and classify work orphaned by a previous background context.
 *
 * The execution scheduler owns recovery. This store is diagnostic observation only: an orphaned
 * lifecycle record becomes terminal `context-interrupted`, while scheduler recovery recollects the
 * still-open document as a new job. Legacy raw URL/target fields are removed during the same pass.
 */
export async function reconcileMatcherJobRecords(
	currentContextId: string,
): Promise<MatcherJobLifecycleRecord[]> {
	const all = await browser.storage.local.get(null);
	const entries = Object.entries(all).filter(isMatcherJobRecordEntry);
	const updates: Record<string, MatcherJobLifecycleRecord> = {};
	const remove: string[] = [];
	const interrupted: MatcherJobLifecycleRecord[] = [];
	const now = Date.now();

	for (const [key, source] of entries) {
		if (isIncognitoLegacyRecord(source)) {
			remove.push(key);
			continue;
		}

		let lifecycle = toMatcherJobLifecycleRecord(source);
		if (isMatcherJobActive(lifecycle) && lifecycle.contextId !== currentContextId) {
			lifecycle = {
				...lifecycle,
				status: 'failed',
				reason: 'context-interrupted',
				interruptedStatus: lifecycle.status,
				interruptedAt: now,
				updatedAt: now,
			};
			interrupted.push(lifecycle);
		}
		updates[key] = lifecycle;
	}

	if (Object.keys(updates).length) await browser.storage.local.set(updates);
	if (remove.length) await browser.storage.local.remove(remove);
	await trimMatcherJobRecords();
	return interrupted;
}

/** Remove old terminal matcher records without deleting current-context active work. */
async function trimMatcherJobRecords(): Promise<void> {
	const all = await browser.storage.local.get(null);
	const entries = Object.entries(all)
		.filter(isMatcherJobRecordEntry)
		.filter(([, value]) => !isIncognitoLegacyRecord(value))
		.map(([key, value]) => ({ key, value: toMatcherJobLifecycleRecord(value) }))
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

/** Convert a runtime or legacy matcher record into the only shape allowed in durable diagnostics. */
function toMatcherJobLifecycleRecord(source: MatcherJobRecord | MatcherJobLifecycleRecord | Record<string, unknown>): MatcherJobLifecycleRecord {
	const record = source as MatcherJobRecord & MatcherJobLifecycleRecord;
	return {
		schemaVersion: MATCHER_JOB_LIFECYCLE_SCHEMA_VERSION,
		jobId: record.jobId,
		tabId: record.tabId,
		windowId: record.windowId,
		...(record.sessionId ? { sessionId: record.sessionId } : {}),
		...(record.contextId ? { contextId: record.contextId } : {}),
		status: record.status,
		mode: record.mode,
		createdAt: record.createdAt,
		updatedAt: record.updatedAt,
		observationCount: record.observationCount,
		partitionCount: record.partitionCount,
		completedPartitionCount: record.completedPartitionCount,
		...(record.reason ? { reason: record.reason } : {}),
		...(record.interruptedStatus ? { interruptedStatus: record.interruptedStatus } : {}),
		...(record.interruptedAt === undefined ? {} : { interruptedAt: record.interruptedAt }),
		...(record.errorMessage ? { errorMessage: record.errorMessage } : {}),
	};
}

/** Runtime guard for current and legacy matcher records read from extension storage. */
function isMatcherJobRecordSource(value: unknown): value is Record<string, unknown> & {
	jobId: string;
	tabId: number;
	windowId: number;
	status: MatcherJobLifecycleRecord['status'];
	mode: MatcherJobLifecycleRecord['mode'];
	createdAt: number;
	updatedAt: number;
	observationCount: number;
	partitionCount: number;
	completedPartitionCount: number;
} {
	if (!value || typeof value !== 'object') return false;
	const record = value as Record<string, unknown>;
	return typeof record.jobId === 'string'
		&& typeof record.tabId === 'number'
		&& typeof record.windowId === 'number'
		&& typeof record.status === 'string'
		&& typeof record.mode === 'string'
		&& typeof record.createdAt === 'number'
		&& typeof record.updatedAt === 'number'
		&& typeof record.observationCount === 'number'
		&& typeof record.partitionCount === 'number'
		&& typeof record.completedPartitionCount === 'number';
}

/** Return whether a storage entry contains a matcher lifecycle record. */
function isMatcherJobRecordEntry(entry: [string, unknown]): entry is [string, ReturnTypeGuard] {
	return entry[0].startsWith(MATCHER_JOB_CACHE_PREFIX) && isMatcherJobRecordSource(entry[1]);
}

type ReturnTypeGuard = Record<string, unknown> & {
	jobId: string;
	tabId: number;
	windowId: number;
	status: MatcherJobLifecycleRecord['status'];
	mode: MatcherJobLifecycleRecord['mode'];
	createdAt: number;
	updatedAt: number;
	observationCount: number;
	partitionCount: number;
	completedPartitionCount: number;
};

/** Legacy builds could persist incognito matcher records before this store became privacy-safe. */
function isIncognitoLegacyRecord(value: Record<string, unknown>): boolean {
	return value.incognito === true;
}
