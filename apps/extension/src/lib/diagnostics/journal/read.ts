import type { DiagnosticRecord, DiagnosticContext } from "../contracts.ts";
import * as dictionary from "@deepscope/detection/observations/dictionary";
import { readStorageEntries, readStorageKeys } from "../../../utils/storage-entries.ts";
import { getDiagnosticJournal } from "./index.ts";
import { flushSuccessfulDiagnosticSummaries } from "./rate.ts";
import { flushDiagnosticJournal, persistContext } from "./write.ts";
import { getStorageArea } from "./storage.ts";
import { DIAGNOSTIC_RECORD_PREFIX, isDiagnosticRecordEntry, DIAGNOSTIC_CONTEXT_PREFIX, isDiagnosticContextEntry, isDiagnosticStorageKey } from "./schema.ts";
import { MAX_CONTEXTS } from "./retention.ts";

/** Return recent diagnostic records, newest first. */
export async function getDiagnosticRecords(limit = 200): Promise<DiagnosticRecord[]> {
	const current = getDiagnosticJournal();
	if (current) {
		flushSuccessfulDiagnosticSummaries(current, Date.now(), true);
		await flushDiagnosticJournal(current);
	}
	const storage = getStorageArea();
	if (!storage) return [];
	const all = dictionary.fromEntries(await readStorageEntries(storage, (key) => key.startsWith(DIAGNOSTIC_RECORD_PREFIX)));
	return Object.entries(all)
		.filter(isDiagnosticRecordEntry)
		.map(([, value]) => value)
		.sort((left, right) => right.timestamp - left.timestamp || right.sequence - left.sequence)
		.slice(0, Math.max(0, limit));
}

/** Return known context lifetimes, newest first. */
export async function getDiagnosticContexts(limit = MAX_CONTEXTS): Promise<DiagnosticContext[]> {
	const current = getDiagnosticJournal();
	if (current) await flushDiagnosticJournal(current);
	const storage = getStorageArea();
	if (!storage) return [];
	const all = dictionary.fromEntries(await readStorageEntries(storage, (key) => key.startsWith(DIAGNOSTIC_CONTEXT_PREFIX)));
	return Object.entries(all)
		.filter(isDiagnosticContextEntry)
		.map(([, value]) => value)
		.sort((left, right) => right.startedAt - left.startedAt)
		.slice(0, Math.max(0, limit));
}

/** Remove only diagnostics. Detector snapshots and settings are untouched. */
export async function clearDiagnosticJournal(): Promise<number> {
	const current = getDiagnosticJournal();
	if (current) {
		current.pending.length = 0;
		if (current.flushTimer !== undefined) clearTimeout(current.flushTimer);
		if (current.rateTimer !== undefined) clearTimeout(current.rateTimer);
		current.flushTimer = undefined;
		current.rateTimer = undefined;
		current.rateBuckets.clear();
		await current.flushPromise.catch(() => undefined);
	}
	const storage = getStorageArea();
	if (!storage) return 0;
	const keys = await readStorageKeys(storage, isDiagnosticStorageKey);
	if (keys.length) await storage.remove(keys);
	if (current) await persistContext(current.context);
	return keys.length;
}
