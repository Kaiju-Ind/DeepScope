import { browser } from 'wxt/browser';

import type {
	DetectionOriginSummary,
	DetectionSessionSnapshot,
	DetectionStorageStatusSnapshot,
} from '../contracts/detection-session';
import type { AnalysisStatus } from '../detection/types';
import type { DetectionReplayTrace } from '../pipeline';
import {
	ANALYSIS_RESPONSE_PREFIX,
	DETECTION_ORIGIN_SNAPSHOT_PREFIX,
	DETECTION_ORIGIN_SUMMARY_PREFIX,
	DETECTION_SESSION_INDEX_PREFIX,
	DETECTION_SESSION_SNAPSHOT_PREFIX,
	DETECTION_STORAGE_STATUS_KEY,
	MATCHER_JOB_CACHE_PREFIX,
	REPLAY_TRACE_CACHE_PREFIX,
	REPLAY_TRACE_HISTORY_CACHE_PREFIX,
	STORAGE_LIMITS,
	getReplayTraceCacheKey,
	getReplayTraceHistoryCacheKey,
} from './contracts';
import {
	isDetectionOriginSummary,
	isDetectionStorageStatusSnapshot,
	refreshDetectionStorageStatusSnapshot,
} from './detection-snapshots';


const DETECTION_STORAGE_PREFIXES = [
	ANALYSIS_RESPONSE_PREFIX,
	DETECTION_ORIGIN_SNAPSHOT_PREFIX,
	DETECTION_ORIGIN_SUMMARY_PREFIX,
	DETECTION_SESSION_INDEX_PREFIX,
	DETECTION_SESSION_SNAPSHOT_PREFIX,
	MATCHER_JOB_CACHE_PREFIX,
	REPLAY_TRACE_CACHE_PREFIX,
	REPLAY_TRACE_HISTORY_CACHE_PREFIX,
] as const;

/** Remove detector-owned cache, replay, snapshot, and matcher job records. */
export async function clearStoredDetectionData(): Promise<number> {
	const all = await browser.storage.local.get(null);
	const keys = Object.keys(all).filter(isDetectorStorageKey);

	if (keys.length > 0) {
		await browser.storage.local.remove(keys);
	}

	return keys.length;
}

function isDetectorStorageKey(key: string): boolean {
	return key === DETECTION_STORAGE_STATUS_KEY || DETECTION_STORAGE_PREFIXES.some((prefix) => key.startsWith(prefix));
}

/**
 * Return whether an unknown storage value looks like a replay trace.
 *
 * The trace contract is intentionally redacted before storage. This guard checks
 * only the replay envelope and arrays needed by callers, so older or malformed
 * records are ignored instead of leaking through to the popup.
 */
function isDetectionReplayTrace(value: unknown): value is DetectionReplayTrace {
	return (
		typeof value === 'object' &&
		value !== null &&
		'schemaVersion' in value &&
		'target' in value &&
		'analyzedAt' in value &&
		'events' in value &&
		'explanations' in value
	);
}

/** Return whether an unknown storage value looks like a detector snapshot. */
function isDetectionSessionSnapshot(value: unknown): value is DetectionSessionSnapshot {
	return (
		typeof value === 'object' &&
		value !== null &&
		'schemaVersion' in value &&
		'key' in value &&
		'urlHash' in value &&
		'hostname' in value &&
		'analysis' in value &&
		'detectionCount' in value &&
		'updatedAt' in value
	);
}


/** Return whether an unknown storage value looks like a replay history list. */
function isDetectionReplayTraceHistory(value: unknown): value is DetectionReplayTrace[] {
	return Array.isArray(value) && value.every(isDetectionReplayTrace);
}

/** Return the current age of a cache record in milliseconds. */
function getCacheRecordAge(record: Pick<DetectionReplayTrace, 'analyzedAt'>): number {
	return Date.now() - record.analyzedAt;
}

/** Return a fresh-enough redacted replay trace for the requested origin. */
export async function getCachedReplayTrace(url: string): Promise<DetectionReplayTrace | null> {
	const key = getReplayTraceCacheKey(url);
	const raw = await browser.storage.local.get(key);
	const value = raw[key];

	if (!isDetectionReplayTrace(value)) {
		return null;
	}

	const isExpired = getCacheRecordAge(value) > STORAGE_LIMITS.replayTraceTtlMs;
	if (isExpired) {
		await browser.storage.local.remove(key);
		return null;
	}

	return cloneReplayTrace(value);
}


/** Return bounded fresh replay traces for the requested origin, newest first. */
export async function getCachedReplayTraceHistory(url: string): Promise<DetectionReplayTrace[]> {
	const key = getReplayTraceHistoryCacheKey(url);
	const raw = await browser.storage.local.get(key);
	const value = raw[key];

	if (!isDetectionReplayTraceHistory(value)) {
		return [];
	}

	const freshTraces = value
		.filter((trace) => getCacheRecordAge(trace) <= STORAGE_LIMITS.replayTraceTtlMs)
		.sort((left, right) => right.analyzedAt - left.analyzedAt)
		.slice(0, STORAGE_LIMITS.maxReplayHistoryRunsPerOrigin)
		.map(cloneReplayTrace);

	if (freshTraces.length !== value.length) {
		if (freshTraces.length) {
			await browser.storage.local.set({ [key]: freshTraces });
		} else {
			await browser.storage.local.remove(key);
		}
	}

	return freshTraces;
}

/** Persist a redacted replay trace for the requested origin. */
export async function saveReplayTrace(trace: DetectionReplayTrace): Promise<DetectionReplayTrace> {
	const normalized = cloneReplayTrace(trace);
	await browser.storage.local.set({ [getReplayTraceCacheKey(normalized.target.url)]: normalized });
	await appendReplayTraceHistory(normalized);
	await trimReplayTraceCache();
	return normalized;
}

export async function getStatus(): Promise<AnalysisStatus> {
	const storedStatus = await getStoredDetectionStatus();
	if (storedStatus) {
		return toAnalysisStatus(storedStatus);
	}

	const all = await browser.storage.local.get(null);
	const originSummaries = Object.entries(all)
		.filter((entry): entry is [string, DetectionOriginSummary] =>
			entry[0].startsWith(DETECTION_ORIGIN_SUMMARY_PREFIX) && isDetectionOriginSummary(entry[1])
		)
		.map(([, value]) => value);
	if (originSummaries.length > 0) {
		const status = await refreshDetectionStorageStatusSnapshot();
		return toAnalysisStatus(status);
	}

	const originSnapshots = Object.entries(all)
		.filter(([key, value]) => key.startsWith(DETECTION_ORIGIN_SNAPSHOT_PREFIX) && isDetectionSessionSnapshot(value))
		.map(([, value]) => value as DetectionSessionSnapshot);
	const lastSnapshotUpdatedAt = originSnapshots.reduce(
		(latest, snapshot) => Math.max(latest, snapshot.analysis.analyzedAt, snapshot.updatedAt),
		0,
	);
	const trackedSnapshotOrigins = originSnapshots.map((snapshot) => snapshot.key.originHash);

	return {
		totalAnalyses: originSnapshots.length,
		trackedOrigins: new Set(trackedSnapshotOrigins).size,
		lastAnalyzedAt: lastSnapshotUpdatedAt || undefined,
	};
}

async function getStoredDetectionStatus(): Promise<DetectionStorageStatusSnapshot | null> {
	const raw = await browser.storage.local.get(DETECTION_STORAGE_STATUS_KEY);
	const value = raw[DETECTION_STORAGE_STATUS_KEY];

	return isDetectionStorageStatusSnapshot(value) ? value : null;
}

function toAnalysisStatus(status: DetectionStorageStatusSnapshot): AnalysisStatus {
	return {
		totalAnalyses: status.totalAnalyses,
		trackedOrigins: status.trackedOrigins,
		lastAnalyzedAt: status.lastAnalyzedAt,
	};
}

/** Remove stale and overflow replay records without touching analysis records. */
async function trimReplayTraceCache(): Promise<void> {
	const all = await browser.storage.local.get(null);
	const traces = Object.entries(all)
		.filter(([key, value]) => key.startsWith(REPLAY_TRACE_CACHE_PREFIX) && isDetectionReplayTrace(value))
		.map(([key, value]) => ({ key, trace: value as DetectionReplayTrace }))
		.sort((a, b) => b.trace.analyzedAt - a.trace.analyzedAt);

	const expiredKeys = traces
		.filter(({ trace }) => getCacheRecordAge(trace) > STORAGE_LIMITS.replayTraceTtlMs)
		.map(({ key }) => key);
	const overflowKeys = traces.slice(STORAGE_LIMITS.maxReplayTraces).map(({ key }) => key);
	const historyEntries: [string, DetectionReplayTrace[]][] = Object.entries(all)
		.filter((entry): entry is [string, DetectionReplayTrace[]] =>
			entry[0].startsWith(REPLAY_TRACE_HISTORY_CACHE_PREFIX) && isDetectionReplayTraceHistory(entry[1])
		);
	const historyKeysToRemove: string[] = [];

	for (const [key, value] of historyEntries) {
		const freshHistory = value
			.filter((trace) => getCacheRecordAge(trace) <= STORAGE_LIMITS.replayTraceTtlMs)
			.sort((left, right) => right.analyzedAt - left.analyzedAt)
			.slice(0, STORAGE_LIMITS.maxReplayHistoryRunsPerOrigin)
			.map(cloneReplayTrace);

		if (freshHistory.length) {
			await browser.storage.local.set({ [key]: freshHistory });
		} else {
			historyKeysToRemove.push(key);
		}
	}

	const keysToRemove = Array.from(new Set([...expiredKeys, ...overflowKeys, ...historyKeysToRemove]));

	if (keysToRemove.length) {
		await browser.storage.local.remove(keysToRemove);
	}
}


/** Append one trace to the bounded per-origin history list. */
async function appendReplayTraceHistory(trace: DetectionReplayTrace): Promise<void> {
	const key = getReplayTraceHistoryCacheKey(trace.target.url);
	const raw = await browser.storage.local.get(key);
	const existing = isDetectionReplayTraceHistory(raw[key]) ? raw[key] : [];
	const history = [trace, ...existing]
		.sort((left, right) => right.analyzedAt - left.analyzedAt)
		.filter((item, index, values) => values.findIndex((candidate) => isSameReplayRun(candidate, item)) === index)
		.slice(0, STORAGE_LIMITS.maxReplayHistoryRunsPerOrigin)
		.map(cloneReplayTrace);

	await browser.storage.local.set({ [key]: history });
}

/** Return whether two traces represent the same detector run. */
function isSameReplayRun(left: DetectionReplayTrace, right: DetectionReplayTrace): boolean {
	if (left.runId && right.runId) {
		return left.runId === right.runId;
	}

	return left.analyzedAt === right.analyzedAt && left.target.url === right.target.url;
}

/**
 * Clone replay traces before returning or storing them.
 *
 * Browser storage serializes values, but tests use an in-memory map. The clone
 * keeps tests and callers from accidentally mutating the cached object by
 * reference after a save or read.
 */
function cloneReplayTrace(trace: DetectionReplayTrace): DetectionReplayTrace {
	return {
		...trace,
		target: { ...trace.target },
		events: trace.events.map((event) => ({
			...event,
			target: { ...event.target },
			...(event.details ? { details: { ...event.details } } : {}),
		})),
		explanations: trace.explanations.map((explanation) => ({
			...explanation,
			categories: [...explanation.categories],
			confidence: { ...explanation.confidence },
			reasons: [...explanation.reasons],
			evidence: explanation.evidence.map((evidence) => ({ ...evidence })),
			warnings: [...explanation.warnings],
		})),
		...(trace.emission ? { emission: { ...trace.emission } } : {}),
	};
}


export type { DetectionSessionIndexEntry, DetectionSessionIndexRecord, DetectionSessionSnapshotWriteResult } from '../persistence/ports';
export {
	getBestVisibleDetectionSessionSnapshot,
	getDetectionStorageStatusSnapshot,
	getDetectionSessionIndex,
	getLatestDetectionOriginSummary,
	getLatestDetectionOriginSnapshot,
	getLatestDetectionSessionSnapshot,
	isDetectionOriginSummary,
	markDetectionSessionSnapshotsForTab,
	isDetectionSessionSnapshot,
	refreshDetectionStorageStatusSnapshot,
	removeDetectionSessionIndex,
	saveDetectionSessionSnapshot,
} from './detection-snapshots';

export {
	getMatcherJobRecord,
	saveMatcherJobRecord,
	updateMatcherJobRecord,
} from './matcher-jobs';
