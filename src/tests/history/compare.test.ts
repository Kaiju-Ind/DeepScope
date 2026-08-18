import { describe, expect, it } from 'vitest';

import * as history from '@/lib/history';
import type { DetectionExplanation, DetectionReplayTrace } from '@/lib/pipeline';

/** Build one minimal emitted explanation for history comparison tests. */
function explanation(id: string, overrides: Partial<DetectionExplanation> = {}): DetectionExplanation {
	return {
		technologyId: id,
		name: id,
		categories: [],
		confidence: { value: 80, level: 'high' },
		inferred: false,
		evidenceCount: 1,
		directEvidenceCount: 1,
		relationshipEvidenceCount: 0,
		reasons: [],
		evidence: [],
		warnings: [],
		...overrides,
	};
}

/** Build one minimal replay trace containing only emitted detector results. */
function trace(runId: string, explanations: DetectionExplanation[]): DetectionReplayTrace {
	return {
		runId,
		schemaVersion: 1,
		target: { url: 'https://example.com/', hostname: 'example.com' },
		requestedMode: 'event',
		completedMode: 'event',
		analyzedAt: runId === 'before' ? 1 : 2,
		resultCount: explanations.length,
		events: [],
		explanations,
	};
}

describe('history comparison', () => {
	it('separates added, removed, changed, and unchanged emitted technologies', () => {
		const before = trace('before', [explanation('same'), explanation('removed'), explanation('changed')]);
		const after = trace('after', [explanation('same'), explanation('added'), explanation('changed', { version: '2.0.0', evidenceCount: 2 })]);
		const result = history.compare(before, after);

		expect(result.added.map((item) => item.technologyId)).toEqual(['added']);
		expect(result.removed.map((item) => item.technologyId)).toEqual(['removed']);
		expect(result.unchanged.map((item) => item.technologyId)).toEqual(['same']);
		expect(result.changed).toEqual([
			expect.objectContaining({ technologyId: 'changed', fields: ['version', 'evidence'] }),
		]);
	});

	it('uses run id before the timestamp fallback identity', () => {
		expect(history.key(trace('run-1', []))).toBe('run-1');
	});
});
