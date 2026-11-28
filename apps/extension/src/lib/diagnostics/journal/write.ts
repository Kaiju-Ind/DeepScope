import type { DiagnosticRecord, DiagnosticContext, DiagnosticTransportMessage } from "../contracts.ts";
import { redactDiagnosticValue } from "@deepscope/detection/privacy/redaction";
import { DIAGNOSTIC_TRANSPORT_CHANNEL } from "../contracts.ts";
import type { DiagnosticJournalState } from "./state.ts";
import { getStorageArea } from "./storage.ts";
import { DIAGNOSTIC_SCHEMA_VERSION, getDiagnosticRecordKey, getDiagnosticContextKey, isDiagnosticContext, isDiagnosticRecord } from "./schema.ts";
import { MAX_STRING_CHARS, sanitizeDiagnosticProperties } from "./sanitize.ts";
import { transportDiagnosticMessage } from "./transport.ts";
import * as dictionary from "@deepscope/detection/observations/dictionary";
import { trimDiagnosticJournal } from "./retention.ts";

const TRIM_EVERY_RECORDS = 24;
const FLUSH_DELAY_MS = 80;
const MAX_PENDING_RECORDS = 12;

/** Allocate the context-local sequence, sanitize the record and either queue a storage write or transport it to a storage owner. */
export function persistRecord(
	journal: DiagnosticJournalState,
	input: {
		readonly level: DiagnosticRecord['level'];
		readonly category: readonly string[];
		readonly message: string;
		readonly properties: Readonly<Record<string, unknown>>;
		readonly timestamp?: number;
		readonly firstTimestamp?: number;
		readonly repeatCount?: number;
	},
): void {
	const storage = getStorageArea();

	const sequence = ++journal.sequence;
	const timestamp = input.timestamp ?? Date.now();
	const id = `${journal.context.id}:${sequence}`;
	const record: DiagnosticRecord = {
		schemaVersion: DIAGNOSTIC_SCHEMA_VERSION,
		id,
		contextId: journal.context.id,
		surface: journal.context.surface,
		sequence,
		timestamp,
		...(input.firstTimestamp === undefined ? {} : { firstTimestamp: input.firstTimestamp }),
		...(input.repeatCount === undefined ? {} : { repeatCount: input.repeatCount }),
		level: input.level,
		category: [...input.category],
		message: redactDiagnosticValue(input.message, MAX_STRING_CHARS),
		properties: sanitizeDiagnosticProperties(input.properties),
	};
	if (!storage) {
		transportDiagnosticMessage({
			channel: DIAGNOSTIC_TRANSPORT_CHANNEL,
			type: 'diagnostics.record',
			record,
		});
		return;
	}
	journal.pending.push(record);
	if (record.level === 'error' || record.level === 'fatal' || journal.pending.length >= MAX_PENDING_RECORDS) {
		void flushDiagnosticJournal(journal);
	} else {
		scheduleDiagnosticFlush(journal);
	}
}

/** Coalesce pending records behind one journal-owned timer; urgent records can flush the same queue earlier. */
function scheduleDiagnosticFlush(journal: DiagnosticJournalState): void {
	if (journal.flushTimer !== undefined) return;
	journal.flushTimer = setTimeout(() => {
		journal.flushTimer = undefined;
		void flushDiagnosticJournal(journal);
	}, FLUSH_DELAY_MS);
}

/** Serialize captured write batches and suppress storage failures so diagnostics cannot break the observed operation. */
export async function flushDiagnosticJournal(journal: DiagnosticJournalState): Promise<void> {
	if (journal.flushTimer !== undefined) {
		clearTimeout(journal.flushTimer);
		journal.flushTimer = undefined;
	}
	if (!journal.pending.length) return journal.flushPromise;

	const batch = journal.pending.splice(0);
	const storage = getStorageArea();
	if (!storage) return;
	const values = dictionary.create<unknown>();
	for (const record of batch) values[getDiagnosticRecordKey(record)] = record;

	journal.flushPromise = journal.flushPromise
		.catch(() => undefined)
		.then(() => storage.set(values))
		.catch(() => undefined);
	await journal.flushPromise;

	if (journal.sequence % TRIM_EVERY_RECORDS === 0 && !journal.trimScheduled) {
		journal.trimScheduled = true;
		void trimDiagnosticJournal().finally(() => { journal.trimScheduled = false; });
	}
}

/** Store context metadata when available or forward it to a storage owner; local write failures remain best-effort. */
export async function persistContext(context: DiagnosticContext): Promise<void> {
	const storage = getStorageArea();
	if (!storage) {
		transportDiagnosticMessage({
			channel: DIAGNOSTIC_TRANSPORT_CHANNEL,
			type: 'diagnostics.context',
			context,
		});
		return;
	}
	await storage.set({ [getDiagnosticContextKey(context)]: context }).catch(() => undefined);
}

/** Persist a diagnostic forwarded by a storage-less extension context. */
export async function persistTransportedDiagnosticMessage(message: DiagnosticTransportMessage): Promise<void> {
	const storage = getStorageArea();
	if (!storage) return;

	if (message.type === 'diagnostics.context') {
		if (!isDiagnosticContext(message.context)) return;
		await storage.set({ [getDiagnosticContextKey(message.context)]: message.context }).catch(() => undefined);
		// Dedicated matcher workers can be recreated repeatedly while the background
		// context stays alive. Trim on each transported context start so those short
		// worker lifetimes cannot accumulate outside the global context limit.
		await trimDiagnosticJournal().catch(() => undefined);
		return;
	}

	if (!isDiagnosticRecord(message.record)) return;
	await storage.set({ [getDiagnosticRecordKey(message.record)]: message.record }).catch(() => undefined);
	if (message.record.sequence % TRIM_EVERY_RECORDS === 0) await trimDiagnosticJournal().catch(() => undefined);
}
