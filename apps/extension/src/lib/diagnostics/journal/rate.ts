import type { LogRecord } from "@logtape/logtape";
import type { DiagnosticJournalState, SuccessfulDiagnosticRateBucket } from "./state.ts";
import { flushDiagnosticJournal, persistRecord } from "./write.ts";

const SUCCESS_RATE_WINDOW_MS = 1_000;
const SUCCESS_RECORD_LIMIT_PER_KEY = 20;

/** Admit a bounded number of repeated successful records per time window and retain suppressed counts for a later summary. */
export function acceptSuccessfulDiagnostic(
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

/** Own one journal timer that closes rate buckets and flushes their summaries after the current rate window. */
function scheduleSuccessfulDiagnosticSummary(journal: DiagnosticJournalState): void {
	if (journal.rateTimer !== undefined) return;
	journal.rateTimer = setTimeout(() => {
		journal.rateTimer = undefined;
		flushSuccessfulDiagnosticSummaries(journal, Date.now(), true);
		void flushDiagnosticJournal(journal);
	}, SUCCESS_RATE_WINDOW_MS);
}

/** Retire expired or explicitly forced buckets, persisting suppressed counts before dropping their state. */
export function flushSuccessfulDiagnosticSummaries(
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

/** Keep the suppressed count, time range and last record in one bounded debug summary. */
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

/** Group repeated records by level, category, event and message template instead of changing interpolation values. */
function getSuccessfulDiagnosticKey(record: LogRecord): string {
	const event = getDiagnosticEvent(record.properties);
	const raw = typeof record.rawMessage === 'string'
		? record.rawMessage
		: Array.isArray(record.rawMessage)
			? record.rawMessage.join('{}')
			: '';
	return `${record.level}|${record.category.join('.')}|${event}|${raw}`;
}

/** Use only a string event property as the diagnostic grouping key; absent or malformed values share the empty key. */
function getDiagnosticEvent(properties: Readonly<Record<string, unknown>> | undefined): string {
	const value = properties?.event;
	return typeof value === 'string' ? value : '';
}
