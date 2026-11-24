import { describe, expect, it } from 'vitest';

import type { DiagnosticRecord } from '@/lib/diagnostics/contracts';
import * as query from '@/lib/diagnostics/query';

/** Build a deterministic synthetic diagnostic record for large-query coverage. */
function record(index: number): DiagnosticRecord {
	return {
		schemaVersion: 1,
		id: `record-${index}`,
		contextId: `context-${index % 8}`,
		surface: index % 2 === 0 ? 'background' : 'content',
		sequence: index,
		timestamp: index,
		level: index % 50 === 0 ? 'error' : 'debug',
		category: ['kaiju', 'deepscope', index % 2 === 0 ? 'matcher' : 'observer'],
		message: index % 100 === 0 ? `target failure ${index}` : `normal record ${index}`,
		properties: { index, partition: index % 16 },
	};
}

describe('diagnostic queries', () => {
	it('searches and orders a 10,000-record synthetic journal without mutating it', () => {
		const records = Array.from({ length: 10_000 }, (_, index) => record(index));
		const result = query.find(records, { text: 'target failure', level: 'error', surface: 'background', order: 'oldest' });

		expect(result).toHaveLength(100);
		expect(result[0]?.id).toBe('record-0');
		expect(result.at(-1)?.id).toBe('record-9900');
		expect(records[0]?.id).toBe('record-0');
		expect(records.at(-1)?.id).toBe('record-9999');
	});
});
