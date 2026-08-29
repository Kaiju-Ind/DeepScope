import { afterEach, describe, expect, it, vi } from 'vitest';

import { createCompiledDetectionGraph } from '@/lib/detection/registry-graph';
import type { RunMatcherJobRequest } from '@/lib/matcher/contracts';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals } from '../support/factories';

function request(jobId = 'job-1'): RunMatcherJobRequest {
	const batch = normalizePageSignals(makePageSignals({ url: 'https://example.com/' }));
	return {
		job: { jobId, tabId: 7, windowId: 1, expectedUrl: batch.target.url },
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

describe.sequential('matcher cancellation ordering', () => {
	it('starts job CPU cancellation before durable removal settles', async () => {
		let resolveRemove!: () => void;
		const remove = vi.fn(() => new Promise<void>((resolve) => { resolveRemove = resolve; }));
		vi.doMock('@/lib/scheduler/database', () => ({
			claimId: vi.fn(async () => undefined),
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
		const cancelJob = vi.fn(async () => undefined);
		const scheduler = matcher.create({
			capacity: 1,
			runPartition: vi.fn(() => new Promise(() => undefined)),
			cancelJob,
			cancelTab: vi.fn(async () => undefined),
			touchLifecycle: vi.fn(async () => undefined),
			releaseLifecycle: vi.fn(async () => undefined),
		});
		const completion = scheduler.runJob(request());
		await flush();

		const cancellation = scheduler.cancelJob('job-1');
		await flush();
		expect(cancelJob).toHaveBeenCalledWith('job-1');
		expect(remove).toHaveBeenCalledWith('job-1');
		await expect(scheduler.runJob(request('job-1'))).rejects.toMatchObject({
			name: 'MatcherError',
			reason: 'host-failed',
		});
		resolveRemove();
		await cancellation;
		await expect(completion).rejects.toMatchObject({ name: 'MatcherError', reason: 'canceled' });
	});

	it('starts tab CPU cancellation before session lookup and durable cleanup settle', async () => {
		let resolveSession!: (value: string) => void;
		const sessionPromise = new Promise<string>((resolve) => { resolveSession = resolve; });
		const removeTabKind = vi.fn(async () => []);
		vi.doMock('@/lib/scheduler/database', () => ({
			claimId: vi.fn(async () => undefined),
			listKind: vi.fn(async () => []),
			remove: vi.fn(async () => undefined),
			removeOtherSessions: vi.fn(async () => undefined),
			removeTabKind,
			reprioritizeWindow: vi.fn(async () => undefined),
			save: vi.fn(async () => undefined),
			setPriority: vi.fn(async () => undefined),
		}));
		vi.doMock('@/lib/scheduler/session', () => ({
			createId: vi.fn(() => 'matcher-owner'),
			get: vi.fn(() => sessionPromise),
		}));

		const matcher = await import('@/lib/scheduler/matcher');
		const cancelTab = vi.fn(async () => undefined);
		const scheduler = matcher.create({
			capacity: 1,
			runPartition: vi.fn(),
			cancelJob: vi.fn(async () => undefined),
			cancelTab,
			touchLifecycle: vi.fn(async () => undefined),
			releaseLifecycle: vi.fn(async () => undefined),
		});

		const cancellation = scheduler.cancelTab(7, 'tab-closed');
		await flush();
		expect(cancelTab).toHaveBeenCalledWith(7, 'tab-closed');
		expect(removeTabKind).not.toHaveBeenCalled();
		resolveSession('browser-session-1');
		await cancellation;
		expect(removeTabKind).toHaveBeenCalledWith('browser-session-1', 7, 'matcher');
	});
});
