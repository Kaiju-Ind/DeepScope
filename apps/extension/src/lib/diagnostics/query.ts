import type { DiagnosticRecord, DiagnosticSurface } from './contracts';

/** Filters supported by the local diagnostic investigator. */
export type QueryType = {
	readonly text?: string;
	readonly level?: string;
	readonly surface?: DiagnosticSurface | 'all';
	readonly order?: 'newest' | 'oldest';
};

/**
 * Return diagnostic records matching a derived local query.
 *
 * This operation never mutates or trims the durable journal. It is safe to use
 * for UI search, support tooling, and synthetic performance tests.
 */
export function find(records: readonly DiagnosticRecord[], query: QueryType = {}): DiagnosticRecord[] {
	const text = query.text?.trim().toLocaleLowerCase() ?? '';
	const level = query.level ?? 'all';
	const surface = query.surface ?? 'all';
	const result = records.filter((record) => {
		if (level !== 'all' && record.level !== level) return false;
		if (surface !== 'all' && record.surface !== surface) return false;
		if (!text) return true;
		return getSearchText(record).includes(text);
	});

	return result.sort((left, right) => {
		const delta = left.timestamp - right.timestamp || left.sequence - right.sequence;
		return query.order === 'newest' ? -delta : delta;
	});
}

/** Build one normalized search document from bounded persisted fields. */
function getSearchText(record: DiagnosticRecord): string {
	return [record.message, record.category.join('.'), record.contextId, JSON.stringify(record.properties)]
		.join('\n')
		.toLocaleLowerCase();
}
