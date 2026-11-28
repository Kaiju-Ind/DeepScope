import * as dictionary from "@deepscope/detection/observations/dictionary";
import { readStorageEntries } from "../../../utils/storage-entries.ts";
import type { DiagnosticRecord, DiagnosticContext } from "../contracts.ts";
import { getStorageArea } from "./storage.ts";
import { DIAGNOSTIC_RECORD_PREFIX, DIAGNOSTIC_CONTEXT_PREFIX, isDiagnosticRecord, isDiagnosticContext } from "./schema.ts";
import { isImportantDiagnosticLevel } from "./sanitize.ts";

const MAX_RECORDS = 400;
const RESERVED_IMPORTANT_RECORDS = 160;
export const MAX_CONTEXTS = 30;
const MAX_RECORD_AGE_MS = 1000 * 60 * 60 * 24 * 7;

/** Enforce journal age and count limits while reserving space for recent warning, error and fatal records. */
export async function trimDiagnosticJournal(): Promise<void> {
	const storage = getStorageArea();
	if (!storage) return;
	const all = dictionary.fromEntries(await readStorageEntries(storage, (key) => key.startsWith(DIAGNOSTIC_RECORD_PREFIX) || key.startsWith(DIAGNOSTIC_CONTEXT_PREFIX)));
	const now = Date.now();
	const records = Object.entries(all)
		.filter(([key, value]) => key.startsWith(DIAGNOSTIC_RECORD_PREFIX) && isDiagnosticRecord(value))
		.map(([key, value]) => ({ key, value: value as DiagnosticRecord }))
		.sort((left, right) => right.value.timestamp - left.value.timestamp || right.value.sequence - left.value.sequence);
	const contexts = Object.entries(all)
		.filter(([key, value]) => key.startsWith(DIAGNOSTIC_CONTEXT_PREFIX) && isDiagnosticContext(value))
		.map(([key, value]) => ({ key, value: value as DiagnosticContext }))
		.sort((left, right) => right.value.startedAt - left.value.startedAt);
	const remove = new Set<string>();
	const currentRecords = records.filter((item) => now - item.value.timestamp <= MAX_RECORD_AGE_MS);
	const forcedImportant = currentRecords
		.filter((item) => isImportantDiagnosticLevel(item.value.level))
		.slice(0, RESERVED_IMPORTANT_RECORDS);
	const keep = new Set(forcedImportant.map((item) => item.key));
	for (const item of currentRecords) {
		if (keep.size >= MAX_RECORDS) break;
		keep.add(item.key);
	}

	for (const item of records) {
		if (now - item.value.timestamp > MAX_RECORD_AGE_MS || !keep.has(item.key)) remove.add(item.key);
	}
	for (const item of contexts) {
		if (now - item.value.startedAt > MAX_RECORD_AGE_MS) remove.add(item.key);
	}
	for (const item of contexts.slice(MAX_CONTEXTS)) remove.add(item.key);

	if (remove.size) await storage.remove([...remove]);
}
