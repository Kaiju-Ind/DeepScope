import { afterEach, describe, expect, it, vi } from 'vitest';

import { createCompiledDetectionGraph } from '@/lib/detection/registry-graph';
import type { MatcherPartitionResult, RunMatcherJobRequest, RunMatcherPartitionRequest } from '@/lib/matcher/contracts';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals } from '../support/factories';

function request(jobId: string): RunMatcherJobRequest {
	const batch = normalizePageSignals(makePageSignals({
		url: 'https://example.com/',
		meta: { generator: ['Example CMS'] },
	}));
	const observations = batch.observations.filter((observation) => observation.kind === 'meta');
	return {
		job: { jobId, tabId: 7, windowId: 1, expectedUrl: batch.target.url },
		mode: 'complete',
		batch: { ...batch, observations },
		registry: [],
		relationshipGraph: createCompiledDetectionGraph([], []),
	};
}

function result(input: RunMatcherPartitionRequest): MatcherPartitionResult {
	return {
		job: input.task.job,
		partitionId: input.task.partitionId,
		kind: input.task.kind,
		priority: input.task.priority,
		observationCount: input.task.batch.observations.length,
		matches: [],
		diagnostics: {
			observationCount: input.task.batch.observations.length,
			skippedObservationCount: 0,
			candidateRuleCount: 0,
			keyedRuleCount: 0,
			fallbackRuleCount: 0,
			literalRuleCount: 0,
			literalRejectedRuleCount: 0,
			matchCount: 0,
			observationsByKind: { [input.task.kind]: input.task.batch.observations.length },
			skippedObservationsByKind: {},
			candidateRulesByKind: {},
		},
		completedAt: 1,
	};
}

async function flush(): Promise<void> {
	await Promise.resolve();
	await Promise.resolve();
	await Promise.resolve();
}

afterEach(() => {
	vi.doUnmock('@/lib/scheduler/database');
	vi.doUnmock('@/lib/scheduler/session');
	vi.resetModules();
});

describe.sequential('matcher terminal cleanup', () => {
	it('releases transient admission capacity before durable removal settles', async () => {
		let resolveFirstRemove!: () => void;
		let removeCount = 0;
		const remove = vi.fn(() => {
			removeCount += 1;
			if (removeCount === 1) return new Promise<void>((resolve) => { resolveFirstRemove = resolve; });
			return Promise.resolve();
		});
		vi.doMock('@/lib/scheduler/database', () => ({
			claimId: vi.fn(async () => ({ kind: 'matcher' })),
			listKind: vi.fn(async () => []),
			remove,
			removeOtherSessions: vi.fn(async () => undefined),
			removeTabKind: vi.fn(async () => []),
			reprioritizeWindow: vi.fn(async () => undefined),
			save: vi.fn(async () => undefined),
			setPriority: vi.fn(async () => undefined),
		}));
		vi.doMock('@/lib/scheduler/session', () => ({
			createId: vi.fn(() => 'matcher-owner'),
			get: vi.fn(async () => 'browser-session-1'),
		}));

		const matcher = await import('@/lib/scheduler/matcher');
		let first = true;
		const scheduler = matcher.create({
			capacity: 1,
			runPartition: vi.fn(async (input: RunMatcherPartitionRequest) => {
				if (first) {
					first = false;
					return result(input);
				}
				return await new Promise<MatcherPartitionResult>(() => undefined);
			}),
			cancelJob: vi.fn(async () => undefined),
			cancelTab: vi.fn(async () => undefined),
			touchLifecycle: vi.fn(async () => undefined),
			releaseLifecycle: vi.fn(async () => undefined),
		});

		const completed = scheduler.runJob(request('finished-job'));
		await flush();
		expect(remove).toHaveBeenCalledWith('finished-job');

		const queued = Array.from({ length: 8 }, (_item, index) => scheduler.runJob(request(`queued-${index}`)));
		await flush();
		await expect(scheduler.runJob(request('overflow'))).rejects.toMatchObject({
			name: 'MatcherError',
			reason: 'queue-full',
		});

		resolveFirstRemove();
		await completed;
		await Promise.all(Array.from({ length: 8 }, (_item, index) => scheduler.cancelJob(`queued-${index}`)));
		const settled = await Promise.allSettled(queued);
		expect(settled.every((entry) => entry.status === 'rejected')).toBe(true);
	});

	it('blocks job-id reuse while only durable terminal cleanup remains', async () => {
		let resolveRemove!: () => void;
		vi.doMock('@/lib/scheduler/database', () => ({
			claimId: vi.fn(async () => ({ kind: 'matcher' })),
			listKind: vi.fn(async () => []),
			remove: vi.fn(() => new Promise<void>((resolve) => { resolveRemove = resolve; })),
			removeOtherSessions: vi.fn(async () => undefined),
			removeTabKind: vi.fn(async () => []),
			reprioritizeWindow: vi.fn(async () => undefined),
			save: vi.fn(async () => undefined),
			setPriority: vi.fn(async () => undefined),
		}));
		vi.doMock('@/lib/scheduler/session', () => ({
			createId: vi.fn(() => 'matcher-owner'),
			get: vi.fn(async () => 'browser-session-1'),
		}));

		const matcher = await import('@/lib/scheduler/matcher');
		const scheduler = matcher.create({
			capacity: 1,
			runPartition: vi.fn(async (input: RunMatcherPartitionRequest) => result(input)),
			cancelJob: vi.fn(async () => undefined),
			cancelTab: vi.fn(async () => undefined),
			touchLifecycle: vi.fn(async () => undefined),
			releaseLifecycle: vi.fn(async () => undefined),
		});
		const completion = scheduler.runJob(request('stable-id'));
		await flush();

		await expect(scheduler.runJob(request('stable-id'))).rejects.toMatchObject({
			name: 'MatcherError',
			reason: 'host-failed',
		});
		resolveRemove();
		await completion;
	});

	it('blocks job-id reuse after partition failure until terminal cleanup settles', async () => {
		let resolveRemove!: () => void;
		let removeCount = 0;
		vi.doMock('@/lib/scheduler/database', () => ({
			claimId: vi.fn(async () => ({ kind: 'matcher' })),
			listKind: vi.fn(async () => []),
			remove: vi.fn(() => {
				removeCount += 1;
				if (removeCount === 1) return new Promise<void>((resolve) => { resolveRemove = resolve; });
				return Promise.resolve();
			}),
			removeOtherSessions: vi.fn(async () => undefined),
			removeTabKind: vi.fn(async () => []),
			reprioritizeWindow: vi.fn(async () => undefined),
			save: vi.fn(async () => undefined),
			setPriority: vi.fn(async () => undefined),
		}));
		vi.doMock('@/lib/scheduler/session', () => ({
			createId: vi.fn(() => 'matcher-owner'),
			get: vi.fn(async () => 'browser-session-1'),
		}));

		const matcher = await import('@/lib/scheduler/matcher');
		const scheduler = matcher.create({
			capacity: 1,
			runPartition: vi.fn(async () => { throw new Error('partition failed'); }),
			cancelJob: vi.fn(async () => undefined),
			cancelTab: vi.fn(async () => undefined),
			touchLifecycle: vi.fn(async () => undefined),
			releaseLifecycle: vi.fn(async () => undefined),
		});

		await expect(scheduler.runJob(request('failed-id'))).rejects.toThrow('partition failed');
		await expect(scheduler.runJob(request('failed-id'))).rejects.toMatchObject({
			name: 'MatcherError',
			reason: 'host-failed',
		});
		resolveRemove();
		await flush();
		const replacement = scheduler.runJob(request('failed-id'));
		await flush();
		await scheduler.cancelJob('failed-id');
		await expect(replacement).rejects.toMatchObject({ name: 'MatcherError', reason: 'canceled' });
	});
});
