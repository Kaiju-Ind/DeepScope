import type { DiagnosticSurface, DiagnosticContext } from "../contracts.ts";
import { getDiagnosticBuildId } from "../build.ts";
import type { DiagnosticJournalState } from "./state.ts";
import { flushSuccessfulDiagnosticSummaries, acceptSuccessfulDiagnostic } from "./rate.ts";
import { flushDiagnosticJournal, persistContext, persistRecord } from "./write.ts";
import { getStorageArea } from "./storage.ts";
import { getDiagnosticTransportSender } from "./transport.ts";
import { DIAGNOSTIC_SCHEMA_VERSION } from "./schema.ts";
import { trimDiagnosticJournal } from "./retention.ts";
import type { Sink, LogRecord } from "@logtape/logtape";
import { toDiagnosticError, formatLogMessage, isImportantDiagnosticLevel } from "./sanitize.ts";

const JOURNAL_STATE_KEY = '__kaijuDeepScopeDiagnosticJournalV3';

/** Start or return the crash-durable journal for this JavaScript context. */
export function startDiagnosticJournal(surface: DiagnosticSurface): DiagnosticJournalState | null {
	const runtime = globalThis as typeof globalThis & Record<string, DiagnosticJournalState | undefined>;
	const existing = runtime[JOURNAL_STATE_KEY];
	const buildId = getDiagnosticBuildId();
	if (existing?.context.surface === surface && existing.context.buildId === buildId) return existing;
	if (existing) {
		flushSuccessfulDiagnosticSummaries(existing, Date.now(), true);
		void flushDiagnosticJournal(existing);
		if (existing.flushTimer !== undefined) clearTimeout(existing.flushTimer);
		if (existing.rateTimer !== undefined) clearTimeout(existing.rateTimer);
	}

	if (!getStorageArea() && !getDiagnosticTransportSender()) return null;

	const startedAt = Date.now();
	const context: DiagnosticContext = {
		schemaVersion: DIAGNOSTIC_SCHEMA_VERSION,
		id: createId(),
		surface,
		startedAt,
		buildId,
	};
	const state: DiagnosticJournalState = {
		context,
		sequence: 0,
		trimScheduled: false,
		pending: [],
		flushTimer: undefined,
		rateTimer: undefined,
		rateBuckets: new Map(),
		flushPromise: Promise.resolve(),
	};
	runtime[JOURNAL_STATE_KEY] = state;
	void persistContext(context);
	void trimDiagnosticJournal();
	return state;
}

/** Return the current context journal when logging has already configured it. */
export function getDiagnosticJournal(): DiagnosticJournalState | null {
	const runtime = globalThis as typeof globalThis & Record<string, DiagnosticJournalState | undefined>;
	return runtime[JOURNAL_STATE_KEY] ?? null;
}

/** Create a LogTape sink that mirrors structured records to extension storage. */
export function createDiagnosticJournalSink(surface: DiagnosticSurface): Sink {
	const journal = startDiagnosticJournal(surface);
	return ((record: LogRecord) => {
		if (!journal) return;
		persistLogRecord(journal, record);
	}) as Sink;
}

/** Persist an exception even when normal LogTape dispatch is unavailable. */
export function persistDiagnosticFailure(input: {
	readonly surface: DiagnosticSurface;
	readonly category: readonly string[];
	readonly message: string;
	readonly error?: unknown;
	readonly properties?: Readonly<Record<string, unknown>>;
}): void {
	const journal = getDiagnosticJournal() ?? startDiagnosticJournal(input.surface);
	if (!journal) return;

	flushSuccessfulDiagnosticSummaries(journal, Date.now(), true);
	persistRecord(journal, {
		level: 'error',
		category: input.category,
		message: input.message,
		properties: {
			...(input.properties ?? {}),
			...(input.error === undefined ? {} : { error: toDiagnosticError(input.error) }),
		},
	});
}

/** Persist important records immediately after pending summaries; rate-limit repeated successful records by their diagnostic identity. */
function persistLogRecord(journal: DiagnosticJournalState, record: LogRecord): void {
	const input = {
		level: record.level,
		category: record.category,
		message: formatLogMessage(record),
		properties: record.properties,
		timestamp: record.timestamp,
	} as const;

	if (isImportantDiagnosticLevel(record.level)) {
		flushSuccessfulDiagnosticSummaries(journal, record.timestamp, true);
		persistRecord(journal, input);
		return;
	}

	if (acceptSuccessfulDiagnostic(journal, record, input.message)) persistRecord(journal, input);
}

/** Allocate a journal context identity, using a time-and-random fallback when UUID support is unavailable. */
function createId(): string {
	return globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
