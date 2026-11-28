import { describe, expect, it } from 'vitest';

import * as replay from './replay.ts';
import { makeAnalysis, makeDetection, makeDetectionReplayTrace } from "../testing/fixtures.ts";

describe('replay summary', () => {
	it('keeps the run id, counts and each stage once in first-seen order', () => {
		const base = makeDetectionReplayTrace({ resultCount: 2, analyzedAt: 100 });
		const event = base.events[0]!;
		const trace = {
			...base,
			runId: 'run-1',
			events: [event, { ...event, stage: 'pattern-matched' as const }, event],
		};
		expect(replay.summarize(trace)).toEqual({
			runId: 'run-1',
			analyzedAt: 100,
			eventCount: 3,
			explanationCount: trace.explanations.length,
			resultCount: 2,
			stages: [event.stage, 'pattern-matched'],
		});
		expect(replay.summarize(base)).not.toHaveProperty('runId');
	});

	it('describes an analysis only with the same run time and result count', () => {
		const analysis = makeAnalysis([makeDetection('react')], { analyzedAt: 100 });
		const summary = replay.summarize(makeDetectionReplayTrace({ resultCount: 1, analyzedAt: 100 }));
		expect(replay.describes(summary, analysis)).toBe(true);
		expect(replay.describes({ ...summary, analyzedAt: 101 }, analysis)).toBe(false);
		expect(replay.describes({ ...summary, resultCount: 2 }, analysis)).toBe(false);
		expect(replay.describes(undefined, analysis)).toBe(false);
	});
});
