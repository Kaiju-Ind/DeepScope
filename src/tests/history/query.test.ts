import { describe, expect, it } from 'vitest';

import * as history from '@/lib/history';
import type { DetectionExplanation, DetectionReplayTrace } from '@/lib/pipeline';

/** Build one minimal emitted explanation for retained-run query tests. */
function explanation(id: string): DetectionExplanation {
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
	};
}

/** Build one replay trace at a known page and time. */
function trace(runId: string, page: string, analyzedAt: number, technologies: string[]): DetectionReplayTrace {
	return {
		runId,
		schemaVersion: 1,
		target: { url: page, hostname: new URL(page).hostname },
		requestedMode: 'event',
		completedMode: 'event',
		analyzedAt,
		resultCount: technologies.length,
		events: [],
		explanations: technologies.map(explanation),
	};
}

describe('history query', () => {
	const runs = [
		trace('a3', 'https://example.com/a?view=1', 5, ['React', 'Vite']),
		trace('b2', 'https://example.com/b', 4, ['React', 'Tailwind CSS']),
		trace('a2', 'https://example.com/a?view=1', 3, ['React']),
		trace('b1', 'https://example.com/b', 2, ['React', 'Tailwind CSS']),
		trace('a1', 'https://example.com/a?view=1', 1, ['React']),
	];

	it('finds the previous run for the same page instead of an unrelated origin run', () => {
		expect(history.previous(runs, runs[0])?.runId).toBe('a2');
		expect(history.previous(runs, runs[1])?.runId).toBe('b1');
	});

	it('shows only same-page runs that actually changed', () => {
		expect(history.query(runs, { filter: 'changed' }).map((run) => run.runId)).toEqual(['a3']);
	});

	it('filters the current page and searches technology names', () => {
		expect(history.query(runs, { filter: 'page', page: 'https://example.com/b#section' }).map((run) => run.runId)).toEqual(['b2', 'b1']);
		expect(history.query(runs, { text: 'vite' }).map((run) => run.runId)).toEqual(['a3']);
	});

	it('gets one run by stable replay identity', () => {
		expect(history.get(runs, 'b2')?.target.url).toBe('https://example.com/b');
	});
});
