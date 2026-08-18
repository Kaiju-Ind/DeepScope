import type { LogRecord, Sink } from '@logtape/logtape';

import { redactDiagnosticValue } from '@/lib/privacy/redaction';
import { getDiagnosticBuildId } from './build';
import type {
	DiagnosticContext,
	DiagnosticError,
	DiagnosticRecord,
	DiagnosticSurface,
	DiagnosticTransportMessage,
	DiagnosticValue,
} from './contracts';
import { DIAGNOSTIC_TRANSPORT_CHANNEL } from './contracts';

const DIAGNOSTIC_RECORD_PREFIX = 'diagnostics:record:';
const DIAGNOSTIC_CONTEXT_PREFIX = 'diagnostics:context:';
const DIAGNOSTIC_SCHEMA_VERSION = 1 as const;
const MAX_RECORDS = 400;
const RESERVED_IMPORTANT_RECORDS = 160;
const SUCCESS_RATE_WINDOW_MS = 1_000;
const SUCCESS_RECORD_LIMIT_PER_KEY = 20;
const MAX_CONTEXTS = 30;
const MAX_RECORD_AGE_MS = 1000 * 60 * 60 * 24 * 7;
const TRIM_EVERY_RECORDS = 24;
const MAX_OBJECT_KEYS = 16;
const MAX_ARRAY_ITEMS = 16;
const MAX_DEPTH = 4;
const MAX_STRING_CHARS = 400;
const MAX_STACK_CHARS = 4_000;
const JOURNAL_STATE_KEY = '__kaijuDeepScopeDiagnosticJournalV3';
const FLUSH_DELAY_MS = 80;
const MAX_PENDING_RECORDS = 12;

type StorageArea = {
	get(keys?: null | string | readonly string[]): Promise<Record<string, unknown>>;
	set(items: Record<string, unknown>): Promise<void>;
	remove(keys: string | readonly string[]): Promise<void>;
};

type SuccessfulDiagnosticRateBucket = {
	readonly key: string;
	windowStart: number;
	accepted: number;
	suppressed: number;
	firstSuppressedAt?: number;
	lastSuppressedAt?: number;
	message?: string;
	properties?: Readonly<Record<string, unknown>>;
};

type DiagnosticJournalState = {
	readonly context: DiagnosticContext;
	sequence: number;
	trimScheduled: boolean;
	pending: DiagnosticRecord[];
	flushTimer: ReturnType<typeof setTimeout> | undefined;
	rateTimer: ReturnType<typeof setTimeout> | undefined;
	rateBuckets: Map<string, SuccessfulDiagnosticRateBucket>;
	flushPromise: Promise<void>;
};

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

/** Return recent diagnostic records, newest first. */
export async function getDiagnosticRecords(limit = 200): Promise<DiagnosticRecord[]> {
	const current = getDiagnosticJournal();
	if (current) {
		flushSuccessfulDiagnosticSummaries(current, Date.now(), true);
		await flushDiagnosticJournal(current);
	}
	const storage = getStorageArea();
	if (!storage) return [];
	const all = await storage.get(null);
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
	const all = await storage.get(null);
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
	const all = await storage.get(null);
	const keys = Object.keys(all).filter(isDiagnosticStorageKey);
	if (keys.length) await storage.remove(keys);
	if (current) await persistContext(current.context);
	return keys.length;
}

/** Convert an exception or error-like value into bounded support data. */
export function toDiagnosticError(error: unknown): DiagnosticError {
	if (error instanceof Error) {
		return {
			name: error.name || 'Error',
			message: redactDiagnosticValue(error.message || 'Unknown error', MAX_STRING_CHARS),
			...(error.stack ? { stack: redactDiagnosticValue(error.stack, MAX_STACK_CHARS) } : {}),
			...(error.cause === undefined ? {} : { cause: sanitizeDiagnosticValue(error.cause, 1, 'cause') }),
		};
	}

	if (typeof error === 'object' && error !== null) {
		const value = error as Record<string, unknown>;
		return {
			name: typeof value.name === 'string' ? redactDiagnosticValue(value.name, 120) : 'Error',
			message: typeof value.message === 'string'
				? redactDiagnosticValue(value.message, MAX_STRING_CHARS)
				: redactDiagnosticValue(String(error), MAX_STRING_CHARS),
			...(typeof value.stack === 'string' ? { stack: redactDiagnosticValue(value.stack, MAX_STACK_CHARS) } : {}),
		};
	}

	return { name: 'Error', message: redactDiagnosticValue(String(error), MAX_STRING_CHARS) };
}

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

function acceptSuccessfulDiagnostic(
	journal: DiagnosticJournalState,
	record: LogRecord,
	message: string,
): boolean {
	const key = getSuccessfulDiagnosticKey(record);
	const timestamp = record.timestamp;
	let bucket = journal.rateBuckets.get(key);

	if (!bucket || timestamp - bucket.windowStart >= SUCCESS_RATE_WINDOW_MS) {
		if (bucket?.suppressed) persistSuccessfulDiagnosticSummary(journal, bucket);
		bucket = { key, windowStart: timestamp, accepted: 0, suppressed: 0 };
		journal.rateBuckets.set(key, bucket);
	}

	if (bucket.accepted < SUCCESS_RECORD_LIMIT_PER_KEY) {
		bucket.accepted += 1;
		scheduleSuccessfulDiagnosticSummary(journal);
		return true;
	}

	bucket.suppressed += 1;
	bucket.firstSuppressedAt ??= timestamp;
	bucket.lastSuppressedAt = timestamp;
	bucket.message = message;
	bucket.properties = record.properties;
	scheduleSuccessfulDiagnosticSummary(journal);
	return false;
}

function scheduleSuccessfulDiagnosticSummary(journal: DiagnosticJournalState): void {
	if (journal.rateTimer !== undefined) return;
	journal.rateTimer = setTimeout(() => {
		journal.rateTimer = undefined;
		flushSuccessfulDiagnosticSummaries(journal, Date.now(), true);
		void flushDiagnosticJournal(journal);
	}, SUCCESS_RATE_WINDOW_MS);
}

function flushSuccessfulDiagnosticSummaries(
	journal: DiagnosticJournalState,
	now = Date.now(),
	force = false,
): void {
	for (const [key, bucket] of journal.rateBuckets) {
		if (!force && now - bucket.windowStart < SUCCESS_RATE_WINDOW_MS) continue;
		if (bucket.suppressed) persistSuccessfulDiagnosticSummary(journal, bucket);
		journal.rateBuckets.delete(key);
	}
}

function persistSuccessfulDiagnosticSummary(
	journal: DiagnosticJournalState,
	bucket: SuccessfulDiagnosticRateBucket,
): void {
	const timestamp = bucket.lastSuppressedAt ?? bucket.windowStart;
	persistRecord(journal, {
		level: 'debug',
		category: ['kaiju', 'deepscope', journal.context.surface, 'diagnostics'],
		message: 'Repeated successful diagnostic records were compacted.',
		properties: {
			event: getDiagnosticEvent(bucket.properties),
			suppressedCount: bucket.suppressed,
			acceptedCount: bucket.accepted,
			firstSuppressedAt: bucket.firstSuppressedAt,
			lastSuppressedAt: bucket.lastSuppressedAt,
			lastMessage: bucket.message,
			lastProperties: bucket.properties,
		},
		timestamp,
		firstTimestamp: bucket.firstSuppressedAt,
		repeatCount: bucket.suppressed,
	});
}

function getSuccessfulDiagnosticKey(record: LogRecord): string {
	const event = getDiagnosticEvent(record.properties);
	const raw = typeof record.rawMessage === 'string'
		? record.rawMessage
		: Array.isArray(record.rawMessage)
			? record.rawMessage.join('{}')
			: '';
	return `${record.level}|${record.category.join('.')}|${event}|${raw}`;
}

function getDiagnosticEvent(properties: Readonly<Record<string, unknown>> | undefined): string {
	const value = properties?.event;
	return typeof value === 'string' ? value : '';
}

function persistRecord(
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

function scheduleDiagnosticFlush(journal: DiagnosticJournalState): void {
	if (journal.flushTimer !== undefined) return;
	journal.flushTimer = setTimeout(() => {
		journal.flushTimer = undefined;
		void flushDiagnosticJournal(journal);
	}, FLUSH_DELAY_MS);
}

async function flushDiagnosticJournal(journal: DiagnosticJournalState): Promise<void> {
	if (journal.flushTimer !== undefined) {
		clearTimeout(journal.flushTimer);
		journal.flushTimer = undefined;
	}
	if (!journal.pending.length) return journal.flushPromise;

	const batch = journal.pending.splice(0);
	const storage = getStorageArea();
	if (!storage) return;
	const values: Record<string, unknown> = {};
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

async function persistContext(context: DiagnosticContext): Promise<void> {
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

/** Guard the runtime transport contract before the background writes forwarded diagnostics. */
export function isDiagnosticTransportMessage(value: unknown): value is DiagnosticTransportMessage {
	if (!value || typeof value !== 'object') return false;
	const candidate = value as Partial<DiagnosticTransportMessage> & { channel?: unknown; type?: unknown };
	if (candidate.channel !== DIAGNOSTIC_TRANSPORT_CHANNEL) return false;
	if (candidate.type === 'diagnostics.context') return 'context' in candidate && isDiagnosticContext(candidate.context);
	if (candidate.type === 'diagnostics.record') return 'record' in candidate && isDiagnosticRecord(candidate.record);
	return false;
}

async function trimDiagnosticJournal(): Promise<void> {
	const storage = getStorageArea();
	if (!storage) return;
	const all = await storage.get(null);
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

function sanitizeDiagnosticProperties(properties: Readonly<Record<string, unknown>>): Record<string, DiagnosticValue> {
	const result: Record<string, DiagnosticValue> = {};
	for (const [key, value] of Object.entries(properties).slice(0, MAX_OBJECT_KEYS)) {
		result[key] = sanitizeDiagnosticValue(value, 0, key);
	}
	return result;
}

function sanitizeDiagnosticValue(value: unknown, depth: number, key?: string): DiagnosticValue {
	if (value === null || value === undefined) return value === null ? null : '[undefined]';
	if (typeof value === 'boolean' || typeof value === 'number') return Number.isFinite(value) ? value : String(value);
	if (typeof value === 'string') {
		return redactDiagnosticValue(value, key === 'stack' ? MAX_STACK_CHARS : MAX_STRING_CHARS);
	}
	if (typeof value === 'bigint' || typeof value === 'symbol' || typeof value === 'function') {
		return redactDiagnosticValue(String(value), MAX_STRING_CHARS);
	}
	if (value instanceof Error) return sanitizeDiagnosticValue(toDiagnosticError(value), depth + 1, key);
	if (depth >= MAX_DEPTH) return '[truncated]';
	if (Array.isArray(value)) {
		return value.slice(0, MAX_ARRAY_ITEMS).map((item) => sanitizeDiagnosticValue(item, depth + 1));
	}
	if (typeof value === 'object') {
		const result: Record<string, DiagnosticValue> = {};
		for (const [childKey, childValue] of Object.entries(value as Record<string, unknown>).slice(0, MAX_OBJECT_KEYS)) {
			result[childKey] = sanitizeDiagnosticValue(childValue, depth + 1, childKey);
		}
		return result;
	}
	return redactDiagnosticValue(String(value), MAX_STRING_CHARS);
}

function isImportantDiagnosticLevel(level: LogRecord['level']): boolean {
	return level === 'warning' || level === 'error' || level === 'fatal';
}

function formatLogMessage(record: LogRecord): string {
	return record.message.map((part) => typeof part === 'string' ? part : formatMessagePart(part)).join('');
}

function formatMessagePart(value: unknown): string {
	if (value instanceof Error) return `${value.name}: ${value.message}`;
	if (typeof value === 'string') return value;
	try {
		const json = JSON.stringify(sanitizeDiagnosticValue(value, 0));
		return json ?? String(value);
	} catch {
		return String(value);
	}
}

function getStorageArea(): StorageArea | null {
	const runtime = globalThis as typeof globalThis & {
		browser?: { storage?: { local?: StorageArea } };
		chrome?: { storage?: { local?: StorageArea } };
	};
	return runtime.browser?.storage?.local ?? runtime.chrome?.storage?.local ?? null;
}

/** Minimal sender used to move storage-less diagnostics toward the background. */
type DiagnosticTransportSender = {
	send(message: DiagnosticTransportMessage): Promise<unknown> | unknown;
};

/** Return a runtime or parent-worker sender without importing browser-only APIs at build time. */
function getDiagnosticTransportSender(): DiagnosticTransportSender | null {
	const runtime = globalThis as typeof globalThis & {
		browser?: { runtime?: { sendMessage(message: DiagnosticTransportMessage): Promise<unknown> | unknown } };
		chrome?: { runtime?: { sendMessage(message: DiagnosticTransportMessage): Promise<unknown> | unknown } };
		postMessage?: (message: DiagnosticTransportMessage) => void;
		document?: Document;
	};
	const extensionRuntime = runtime.browser?.runtime ?? runtime.chrome?.runtime;
	if (extensionRuntime) {
		return { send: (message) => extensionRuntime.sendMessage(message) };
	}

	// Dedicated matcher workers do not own extension storage or runtime APIs. Their
	// parent offscreen document forwards the same validated transport message.
	if (runtime.document === undefined && typeof runtime.postMessage === 'function') {
		return { send: (message) => runtime.postMessage?.(message) };
	}

	return null;
}

/** Forward one already-sanitized diagnostic to the background persistence owner. */
function transportDiagnosticMessage(message: DiagnosticTransportMessage): void {
	const sender = getDiagnosticTransportSender();
	if (!sender) return;
	try {
		void Promise.resolve(sender.send(message)).catch(() => undefined);
	} catch {
		// Diagnostics must never crash the extension surface they are trying to describe.
	}
}

function getDiagnosticRecordKey(record: DiagnosticRecord): string {
	return `${DIAGNOSTIC_RECORD_PREFIX}${String(record.timestamp).padStart(13, '0')}:${record.contextId}:${String(record.sequence).padStart(6, '0')}`;
}

function getDiagnosticContextKey(context: DiagnosticContext): string {
	return `${DIAGNOSTIC_CONTEXT_PREFIX}${String(context.startedAt).padStart(13, '0')}:${context.id}`;
}

function isDiagnosticStorageKey(key: string): boolean {
	return key.startsWith(DIAGNOSTIC_RECORD_PREFIX) || key.startsWith(DIAGNOSTIC_CONTEXT_PREFIX);
}

/** Return whether a storage entry contains one persisted diagnostic record. */
function isDiagnosticRecordEntry(entry: [string, unknown]): entry is [string, DiagnosticRecord] {
	return entry[0].startsWith(DIAGNOSTIC_RECORD_PREFIX) && isDiagnosticRecord(entry[1]);
}

/** Return whether a storage entry contains one persisted diagnostic context. */
function isDiagnosticContextEntry(entry: [string, unknown]): entry is [string, DiagnosticContext] {
	return entry[0].startsWith(DIAGNOSTIC_CONTEXT_PREFIX) && isDiagnosticContext(entry[1]);
}

function isDiagnosticRecord(value: unknown): value is DiagnosticRecord {
	return Boolean(
		value && typeof value === 'object' &&
		'schemaVersion' in value && value.schemaVersion === DIAGNOSTIC_SCHEMA_VERSION &&
		'id' in value && typeof value.id === 'string' &&
		'contextId' in value && typeof value.contextId === 'string' &&
		'surface' in value && typeof value.surface === 'string' &&
		'timestamp' in value && typeof value.timestamp === 'number' &&
		'level' in value && typeof value.level === 'string' &&
		'category' in value && Array.isArray(value.category) &&
		'message' in value && typeof value.message === 'string'
	);
}

function isDiagnosticContext(value: unknown): value is DiagnosticContext {
	return Boolean(
		value && typeof value === 'object' &&
		'schemaVersion' in value && value.schemaVersion === DIAGNOSTIC_SCHEMA_VERSION &&
		'id' in value && typeof value.id === 'string' &&
		'surface' in value && typeof value.surface === 'string' &&
		'startedAt' in value && typeof value.startedAt === 'number'
	);
}

function createId(): string {
	return globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
