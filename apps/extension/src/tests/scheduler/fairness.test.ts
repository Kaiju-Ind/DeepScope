import { describe, expect, it } from 'vitest';

import * as fairness from '@/lib/scheduler/fairness';

const foreground = {
	jobId: 'foreground',
	priorityRank: 1,
	createdAt: 1,
	lastDispatchSequence: 1,
	taskPriority: 1,
} as const;
const background = {
	jobId: 'background',
	priorityRank: 2,
	createdAt: 2,
	lastDispatchSequence: 0,
	taskPriority: 1,
} as const;

describe('matcher scheduler fairness', () => {
	it('normally prioritizes the foreground tab', () => {
		expect(fairness.select([background, foreground], 0)?.candidate.jobId).toBe('foreground');
	});

	it('gives waiting background work a bounded turn', () => {
		const selection = fairness.select(
			[foreground, background],
			fairness.FOREGROUND_BURST_LIMIT,
		);
		expect(selection).toEqual({ candidate: background, foregroundDispatches: 0 });
	});

	it('round-robins jobs at the same semantic priority before partition cost', () => {
		const olderTurn = { ...foreground, jobId: 'older-turn', lastDispatchSequence: 2, taskPriority: 4 };
		const newerTurn = { ...foreground, jobId: 'newer-turn', lastDispatchSequence: 3, taskPriority: 1 };
		expect(fairness.select([newerTurn, olderTurn], 0)?.candidate.jobId).toBe('older-turn');
	});

	it('prefers cheaper partitions when otherwise tied', () => {
		const cheap = { ...foreground, jobId: 'cheap', taskPriority: 1 };
		const expensive = { ...foreground, jobId: 'expensive', taskPriority: 4 };
		expect(fairness.select([expensive, cheap], 0)?.candidate.jobId).toBe('cheap');
	});
});
