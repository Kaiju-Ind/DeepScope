import type { DiagnosticTransportMessage, DiagnosticRecord, DiagnosticContext } from "../contracts.ts";
import { DIAGNOSTIC_TRANSPORT_CHANNEL } from "../contracts.ts";

export const DIAGNOSTIC_RECORD_PREFIX = 'diagnostics:record:';
export const DIAGNOSTIC_CONTEXT_PREFIX = 'diagnostics:context:';
export const DIAGNOSTIC_SCHEMA_VERSION = 1 as const;

/** Guard the runtime transport contract before the background writes forwarded diagnostics. */
export function isDiagnosticTransportMessage(value: unknown): value is DiagnosticTransportMessage {
	if (!value || typeof value !== 'object') return false;
	const candidate = value as Partial<DiagnosticTransportMessage> & { channel?: unknown; type?: unknown };
	if (candidate.channel !== DIAGNOSTIC_TRANSPORT_CHANNEL) return false;
	if (candidate.type === 'diagnostics.context') return 'context' in candidate && isDiagnosticContext(candidate.context);
	if (candidate.type === 'diagnostics.record') return 'record' in candidate && isDiagnosticRecord(candidate.record);
	return false;
}

/** Build the persisted record identity from padded time, context and sequence fields; callers must preserve this key format. */
export function getDiagnosticRecordKey(record: DiagnosticRecord): string {
	return `${DIAGNOSTIC_RECORD_PREFIX}${String(record.timestamp).padStart(13, '0')}:${record.contextId}:${String(record.sequence).padStart(6, '0')}`;
}

/** Build the persisted context identity from its start time and context ID using the current storage prefix. */
export function getDiagnosticContextKey(context: DiagnosticContext): string {
	return `${DIAGNOSTIC_CONTEXT_PREFIX}${String(context.startedAt).padStart(13, '0')}:${context.id}`;
}

/** Restrict journal reads and removals to the two owned diagnostic prefixes. */
export function isDiagnosticStorageKey(key: string): boolean {
	return key.startsWith(DIAGNOSTIC_RECORD_PREFIX) || key.startsWith(DIAGNOSTIC_CONTEXT_PREFIX);
}

/** Return whether a storage entry contains one persisted diagnostic record. */
export function isDiagnosticRecordEntry(entry: [string, unknown]): entry is [string, DiagnosticRecord] {
	return entry[0].startsWith(DIAGNOSTIC_RECORD_PREFIX) && isDiagnosticRecord(entry[1]);
}

/** Return whether a storage entry contains one persisted diagnostic context. */
export function isDiagnosticContextEntry(entry: [string, unknown]): entry is [string, DiagnosticContext] {
	return entry[0].startsWith(DIAGNOSTIC_CONTEXT_PREFIX) && isDiagnosticContext(entry[1]);
}

/** Check the record version and fields required by journal readers before accepting stored data. */
export function isDiagnosticRecord(value: unknown): value is DiagnosticRecord {
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

/** Check the context version and identity fields before including persisted context metadata. */
export function isDiagnosticContext(value: unknown): value is DiagnosticContext {
	return Boolean(
		value && typeof value === 'object' &&
		'schemaVersion' in value && value.schemaVersion === DIAGNOSTIC_SCHEMA_VERSION &&
		'id' in value && typeof value.id === 'string' &&
		'surface' in value && typeof value.surface === 'string' &&
		'startedAt' in value && typeof value.startedAt === 'number'
	);
}
