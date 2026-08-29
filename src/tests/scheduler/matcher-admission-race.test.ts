import { afterEach, describe, expect, it, vi } from 'vitest';

import { createCompiledDetectionGraph } from '@/lib/detection/registry-graph';
import type { RunMatcherJobRequest } from '@/lib/matcher/contracts';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals } from '../support/factories';

function createRequest(): RunMatcherJobRequest {
	const batch = normalizePageSignals(makePageSignals({
		url: 'https://example.com/products',
		meta: { generator: ['Example CMS'] },
	}));
	return {
		job: {
			jobId: 'durable-job-1',
			tabId: 7,
			windowId: 1,
			expectedUrl: batch.target.url,
		},
		mode: 'complete',
		batch,
		registry: [],
		relationshipGraph: createCompiledDetectionGraph([], []),
	};
}

async function flush(): Promise<void> {
	await Promise.resolve();
	await Promise.resolve();
}

afterEach(() => {
	vi.doUnmock('@/lib/scheduler/database');
	vi.doUnmock('@/lib/scheduler/session');
	vi.resetModules();
});

describe.sequential('matcher durable admission cancellation', () => {
	it('does not lose cancellation while the first session lookup is still pending', async () => {
		vi.resetModules();
		let resolveSession!: (value: string) => void;
		const sessionPromise = new Promise<string>((resolve) => {
			resolveSession = resolve;
		});
		const save = vi.fn(async () => undefined);
		const remove = vi.fn(async () => undefined);
		vi.doMock('@/lib/scheduler/database', () => ({
			claimId: vi.fn(),
			listKind: vi.fn(),
			remove,
			removeOtherSessions: vi.fn(),
			removeTabKind: vi.fn(),
			reprioritizeWindow: vi.fn(),
			save,
			setPriority: vi.fn(),
		}));
		vi.doMock('@/lib/scheduler/session', () => ({
			createId: vi.fn(() => 'matcher-scheduler-owner'),
			get: vi.fn(() => sessionPromise),
		}));

		const matcher = await import('@/lib/scheduler/matcher');
		const cancelJob = vi.fn(async () => undefined);
		const scheduler = matcher.create({
			capacity: 2,
			runPartition: vi.fn(),
			cancelJob,
			cancelTab: vi.fn(async () => undefined),
			touchLifecycle: vi.fn(async () => undefined),
			releaseLifecycle: vi.fn(async () => undefined),
		});
		const completion = scheduler.runJob(createRequest());
		await flush();

		await scheduler.cancelJob('durable-job-1');
		resolveSession('browser-session-1');

		await expect(completion).rejects.toMatchObject({ name: 'MatcherError', reason: 'canceled' });
		expect(save).not.toHaveBeenCalled();
		expect(remove).toHaveBeenCalledWith('durable-job-1');
		expect(cancelJob).toHaveBeenCalledWith('durable-job-1');
	});

	it('reserves transient capacity before concurrent durable session lookups settle', async () => {
		vi.resetModules();
		let resolveSession!: (value: string) => void;
		const sessionPromise = new Promise<string>((resolve) => {
			resolveSession = resolve;
		});
		vi.doMock('@/lib/scheduler/database', () => ({
			claimId: vi.fn(),
			listKind: vi.fn(),
			remove: vi.fn(async () => undefined),
			removeOtherSessions: vi.fn(),
			removeTabKind: vi.fn(),
			reprioritizeWindow: vi.fn(),
			save: vi.fn(async () => undefined),
			setPriority: vi.fn(),
		}));
		vi.doMock('@/lib/scheduler/session', () => ({
			createId: vi.fn(() => 'matcher-scheduler-owner'),
			get: vi.fn(() => sessionPromise),
		}));

		const matcher = await import('@/lib/scheduler/matcher');
		const scheduler = matcher.create({
			capacity: 2,
			runPartition: vi.fn(),
			cancelJob: vi.fn(async () => undefined),
			cancelTab: vi.fn(async () => undefined),
			touchLifecycle: vi.fn(async () => undefined),
			releaseLifecycle: vi.fn(async () => undefined),
		});
		const completions = Array.from({ length: 8 }, (_item, index) => scheduler.runJob({
			...createRequest(),
			job: { ...createRequest().job, jobId: `reserved-job-${index}` },
		}));
		await flush();

		await expect(scheduler.runJob({
			...createRequest(),
			job: { ...createRequest().job, jobId: 'overflow-job' },
		})).rejects.toMatchObject({ name: 'MatcherError', reason: 'queue-full' });

		await Promise.all(Array.from({ length: 8 }, (_item, index) => scheduler.cancelJob(`reserved-job-${index}`)));
		resolveSession('browser-session-1');
		const settled = await Promise.allSettled(completions);
		expect(settled.every((entry) => entry.status === 'rejected')).toBe(true);
	});

});
