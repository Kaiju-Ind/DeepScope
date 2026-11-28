import type { MatcherJobLifecycleRecord, MatcherJobRecord } from "../matcher/index.ts";

import { browser } from 'wxt/browser';

import { getMatcherJobCacheKey, MATCHER_JOB_CACHE_PREFIX } from "./contracts.ts";
import * as dictionary from '@deepscope/detection/observations/dictionary';
import { readStorageEntries } from "../../utils/storage-entries.ts";

const MAX_MATCHER_JOB_RECORDS = 80;
const MAX_TERMINAL_JOB_AGE_MS = 1000 * 60 * 60 * 24 * 7;
const MATCHER_JOB_LIFECYCLE_SCHEMA_VERSION = 2 as const;

/**
 * Window id recorded for legacy rows written before jobs carried one.
 *
 * Matches `chrome.windows.WINDOW_ID_NONE`. Without this fallback those rows would
 * fail the record guard and never be migrated, including legacy private rows
 * that startup must delete.
 */
const UNKNOWN_WINDOW_ID = -1;

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

/**
 * Merge lifecycle changes into an existing ordinary matcher record.
 *
 * Private jobs were never stored, so their updates return null without touching
 * extension storage at all (not even a read).
 */
export async function updateMatcherJobRecord(
	job: Pick<MatcherJobRecord, 'jobId' | 'incognito'>,
	patch: MatcherJobLifecyclePatch,
): Promise<MatcherJobLifecycleRecord | null> {
	if (job.incognito) return null;
	const existing = await getMatcherJobRecord(job.jobId);
	if (!existing) return null;

	const next = Object.assign({}, existing, patch, { updatedAt: Date.now() });
	await saveMatcherJobRecord(next);
	return next;
}

/** Read all matcher lifecycle records, newest first, without exposing legacy raw document fields. */
export async function listMatcherJobRecords(): Promise<MatcherJobLifecycleRecord[]> {
	const all = dictionary.fromEntries(await readStorageEntries(browser.storage.local, (key) => key.startsWith(MATCHER_JOB_CACHE_PREFIX)));
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

/** Hooks that let startup retire private rows written by builds before private jobs stayed in memory. */
export interface LegacyPrivateMigration {
	/**
	 * Confirm that an active legacy private job no longer runs. Resolve only after the
	 * host acknowledged this id or the host document is confirmed gone; reject otherwise.
	 */
	readonly cancel: (jobId: string) => Promise<void>;
	/** Report rows kept for another startup attempt. Receives counts only, never record fields. */
	readonly reportFailure: (stage: 'cancel' | 'remove', count: number) => void;
}

/**
 * Sanitize historical matcher records and classify work orphaned by a previous background context.
 *
 * The execution scheduler owns recovery. This store is diagnostic observation only: an orphaned
 * lifecycle record becomes terminal `context-interrupted`, while scheduler recovery recollects the
 * still-open document as a new job. Legacy raw URL/target fields are removed during the same pass.
 *
 * Legacy private rows are removed, never rewritten. An active one is removed only after
 * `migration.cancel` confirms it stopped; an unconfirmed row stays untouched for the next
 * startup and is excluded from every ordinary listing meanwhile.
 */
export async function reconcileMatcherJobRecords(
	currentContextId: string,
	migration?: LegacyPrivateMigration,
): Promise<MatcherJobLifecycleRecord[]> {
	const all = dictionary.fromEntries(await readStorageEntries(browser.storage.local, (key) => key.startsWith(MATCHER_JOB_CACHE_PREFIX)));
	const entries = Object.entries(all).filter(isMatcherJobRecordEntry);
	const updates = dictionary.create<MatcherJobLifecycleRecord>();
	const remove: string[] = [];
	const interrupted: MatcherJobLifecycleRecord[] = [];
	const now = Date.now();
	let failedCancellationCount = 0;

	for (const [key, source] of entries) {
		if (isIncognitoLegacyRecord(source)) {
			if (isMatcherJobActive(toMatcherJobLifecycleRecord(source)) && migration) {
				try {
					await migration.cancel(source.jobId);
				} catch {
					failedCancellationCount += 1;
					continue;
				}
			}
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

	if (failedCancellationCount) migration?.reportFailure('cancel', failedCancellationCount);
	if (Object.keys(updates).length) await browser.storage.local.set(updates);
	if (remove.length) {
		try {
			await browser.storage.local.remove(remove);
		} catch {
			migration?.reportFailure('remove', remove.length);
		}
	}
	await trimMatcherJobRecords();
	return interrupted;
}

/** Remove old terminal matcher records without deleting current-context active work. */
async function trimMatcherJobRecords(): Promise<void> {
	const all = dictionary.fromEntries(await readStorageEntries(browser.storage.local, (key) => key.startsWith(MATCHER_JOB_CACHE_PREFIX)));
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
		// Records from builds before window-aware scheduling have no window id.
		windowId: typeof record.windowId === 'number' ? record.windowId : UNKNOWN_WINDOW_ID,
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
	windowId?: number;
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
		&& (record.windowId === undefined || typeof record.windowId === 'number')
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
	windowId?: number;
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
