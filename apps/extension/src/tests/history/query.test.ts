import { describe, expect, it } from 'vitest';

import * as history from '@/lib/history';
import type { DetectionExplanation, DetectionReplayTrace } from '@/lib/pipeline';

/** Build one minimal emitted explanation for retained-run query tests. */
function explanation(id: string, evidenceCount = 1): DetectionExplanation {
	return {
		technologyId: id,
		name: id,
		categories: [],
		confidence: { value: 80, level: 'high' },
		inferred: false,
		evidenceCount,
		directEvidenceCount: evidenceCount,
		relationshipEvidenceCount: 0,
		reasons: [],
		evidence: [],
		warnings: [],
	};
}

/** Build one replay trace at a known page and time. */
function trace(runId: string, page: string, analyzedAt: number, technologies: Array<string | readonly [string, number]>): DetectionReplayTrace {
	const explanations = technologies.map((item) => Array.isArray(item) ? explanation(item[0], item[1]) : explanation(item as string));
	return {
		runId,
		schemaVersion: 1,
		target: { url: page, hostname: new URL(page).hostname },
		requestedMode: 'event',
		completedMode: 'event',
		analyzedAt,
		resultCount: explanations.length,
		events: [],
		explanations,
	};
}

describe('history query', () => {
	const runs = [
		trace('a4', 'https://example.com/a?view=1', 6, [['React', 2], 'Vite']),
		trace('a3', 'https://example.com/a?view=1', 5, ['React', 'Vite']),
		trace('b2', 'https://example.com/b', 4, ['React', 'Tailwind CSS']),
		trace('a2', 'https://example.com/a?view=1', 3, ['React']),
		trace('b1', 'https://example.com/b', 2, ['React', 'Tailwind CSS']),
		trace('a1', 'https://example.com/a?view=1', 1, ['React', 'Vue']),
	];

	it('finds the previous run for the same page instead of an unrelated origin run', () => {
		expect(history.previous(runs, runs[0])?.runId).toBe('a3');
		expect(history.previous(runs, runs[2])?.runId).toBe('b1');
	});

	it('filters independent page scope and change kinds', () => {
		expect(history.query(runs, { change: 'changed' }).map((run) => run.runId)).toEqual(['a4', 'a3', 'a2']);
		expect(history.query(runs, { change: 'added' }).map((run) => run.runId)).toEqual(['a3']);
		expect(history.query(runs, { change: 'removed' }).map((run) => run.runId)).toEqual(['a2']);
		expect(history.query(runs, { change: 'modified' }).map((run) => run.runId)).toEqual(['a4']);
	});

	it('filters the current page independently from change state and searches technology names', () => {
		expect(history.query(runs, { scope: 'page', page: 'https://example.com/b#section' }).map((run) => run.runId)).toEqual(['b2', 'b1']);
		expect(history.query(runs, { scope: 'page', change: 'changed', page: 'https://example.com/a?view=1#section' }).map((run) => run.runId)).toEqual(['a4', 'a3', 'a2']);
		expect(history.query(runs, { text: 'vite' }).map((run) => run.runId)).toEqual(['a4', 'a3']);
	});

	it('gets one run by stable replay identity', () => {
		expect(history.get(runs, 'b2')?.target.url).toBe('https://example.com/b');
	});
});
