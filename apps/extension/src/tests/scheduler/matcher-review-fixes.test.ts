import { afterEach, describe, expect, it, vi } from 'vitest';

import { createCompiledDetectionGraph } from "@deepscope/detection/registry/graph";
import type { MatcherPartitionResult, RunMatcherJobRequest, RunMatcherPartitionRequest } from "../../lib/matcher/contracts.ts";
import { normalizePageSignals } from "@deepscope/detection/observations";
import type { MatcherPartitionExecutor } from "../../lib/scheduler/matcher/types.ts";
import { makePageSignals } from "@deepscope/detection/testing/fixtures";
import { settle } from "../support/settle.ts";

/** One ordinary job in window 1 with one partition per kind listed (meta by default). */
function request(jobId: string, tabId = 7, kinds: readonly string[] = ['meta']): RunMatcherJobRequest {
	const batch = normalizePageSignals(makePageSignals({
		url: 'https://example.com/products',
		meta: { generator: ['Example CMS'] },
		scripts: ['https://cdn.example/runtime.js'],
	}));
	return {
		job: { jobId, tabId, windowId: 1, expectedUrl: batch.target.url },
		mode: 'complete',
		batch: { ...batch, observations: batch.observations.filter((observation) => kinds.includes(observation.kind)) },
		registry: [],
		relationshipGraph: createCompiledDetectionGraph([], []),
	};
}

/** IndexedDB double whose individual operations a test can override. */
function databaseMock(overrides: Record<string, unknown> = {}) {
	return {
		claimId: vi.fn(async () => ({ kind: 'matcher' })),
		listKind: vi.fn(async () => []),
		remove: vi.fn(async () => undefined),
		removeOtherSessions: vi.fn(async () => 0),
		removeTabKind: vi.fn(async () => []),
		reprioritizeWindow: vi.fn(async () => 0),
		save: vi.fn(async () => undefined),
		setPriority: vi.fn(async () => true),
		...overrides,
	};
}

/** Executor double whose partitions never finish unless a test completes them. */
function executor(overrides: Partial<MatcherPartitionExecutor> = {}): MatcherPartitionExecutor {
	return {
		kind: 'offscreen-worker-pool',
		capacity: 1,
		runPartition: vi.fn(() => new Promise<never>(() => undefined)),
		cancelJob: vi.fn(async () => undefined),
		cancelTab: vi.fn(async () => undefined),
		touchLifecycle: vi.fn(async () => undefined),
		releaseLifecycle: vi.fn(async () => undefined),
		...overrides,
	};
}

async function load(database: ReturnType<typeof databaseMock>, session: () => Promise<string> = async () => 'browser-session-1') {
	vi.resetModules();
	vi.doMock('../../lib/scheduler/database.ts', () => database);
	vi.doMock('../../lib/scheduler/session.ts', () => ({ createId: vi.fn(() => 'matcher-owner'), get: vi.fn(session) }));
	return await import('../../lib/scheduler/matcher/index.ts');
}

afterEach(() => {
	vi.doUnmock('../../lib/scheduler/database.ts');
	vi.doUnmock('../../lib/scheduler/session.ts');
	vi.resetModules();
});

describe('matcher scheduler review fixes', { concurrent: false }, () => {
	it('releases admission when persisting a raced priority change fails', async () => {
		const saved = Promise.withResolvers<void>();
		const database = databaseMock({
			save: vi.fn(() => saved.promise),
			setPriority: vi.fn(async () => { throw new Error('idb write failed'); }),
		});
		const matcher = await load(database);
		const scheduler = matcher.create(executor());

		// Fill the 8-job admission budget; the first job's save is held open.
		const first = scheduler.runJob(request('raced-job'));
		await vi.waitFor(() => expect(database.save).toHaveBeenCalled());
		// Activating another tab in the same window demotes the job while it is mid-save.
		await scheduler.activateTab(99, 1);
		saved.resolve();

		await expect(first).rejects.toThrow('idb write failed');
		expect(database.remove).toHaveBeenCalledWith('raced-job');

		// The failed job must not keep its slot: eight new jobs still fit.
		const next = Array.from({ length: 8 }, (_item, index) => scheduler.runJob(request(`after-${index}`)));
		await settle();
		await Promise.all(Array.from({ length: 8 }, (_item, index) => scheduler.cancelJob(`after-${index}`)));
		const settled = await Promise.allSettled(next);
		expect(settled.map((entry) => entry.status === 'rejected' && (entry.reason as { reason?: string }).reason))
			.toEqual(Array.from({ length: 8 }, () => 'canceled'));
	});

	it('honors a cancellation that arrives while admission waits for tab cleanup', async () => {
		const cleanup = Promise.withResolvers<readonly never[]>();
		const database = databaseMock({ removeTabKind: vi.fn(() => cleanup.promise) });
		const matcher = await load(database);
		const run = executor();
		const scheduler = matcher.create(run);

		// Tab 8 is being cleaned up; a new job for tab 8 waits on that fence.
		const cleaning = scheduler.cancelTab(8, 'navigation');
		await vi.waitFor(() => expect(database.removeTabKind).toHaveBeenCalled());
		const waiting = scheduler.runJob(request('fenced-job', 8));
		await settle();
		await scheduler.cancelJob('fenced-job');
		cleanup.resolve([]);
		await cleaning;

		await expect(waiting).rejects.toMatchObject({ name: 'MatcherError', reason: 'canceled' });
		expect(database.save).not.toHaveBeenCalled();
		expect(run.runPartition).not.toHaveBeenCalled();
	});

	it('advances the foreground burst only for partitions that were dispatched', async () => {
		// Each durable job needs one claim before its first partition. If selection
		// counted claims as dispatches, the background job would get its turn after
		// only half the foreground burst.
		const dispatched: string[] = [];
		// Hold every durable save so all eight jobs are pending before the first selection.
		const saves = Promise.withResolvers<void>();
		const database = databaseMock({ save: vi.fn(() => saves.promise) });
		const matcher = await load(database);
		const run = executor({
			runPartition: vi.fn(async (input: RunMatcherPartitionRequest) => {
				dispatched.push(input.task.job.jobId);
				return {
					job: input.task.job,
					partitionId: input.task.partitionId,
					kind: input.task.kind,
					priority: input.task.priority,
					observationCount: 0,
					matches: [],
					diagnostics: {},
					completedAt: 1,
				} as unknown as MatcherPartitionResult;
			}),
		});
		const scheduler = matcher.create(run);
		await scheduler.activateTab(7, 1);

		const background = scheduler.runJob(request('background-job', 8));
		// Admission allows eight jobs, so seven foreground jobs carry two partitions each.
		const foreground = Array.from({ length: 7 }, (_item, index) => scheduler.runJob(request(`foreground-${index}`, 7, ['meta', 'scriptSrc'])));
		await vi.waitFor(() => expect(database.save).toHaveBeenCalledTimes(8));
		saves.resolve();
		await Promise.all([background, ...foreground]);

		// Foreground wins while a background job waits; after exactly eight foreground
		// dispatches the burst limit gives the background job one turn.
		expect(dispatched.indexOf('background-job')).toBe(8);
	});
});
