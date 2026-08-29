import { afterEach, describe, expect, it, vi } from 'vitest';

import type { MatcherPartitionExecutor } from '@/lib/scheduler/matcher';
import { EXECUTION_SCHEMA_VERSION } from '@/lib/scheduler/schema';
import { createDetectionStorageHash } from '@/lib/storage/contracts';

const sessionId = 'browser-session-1';

function matcherWork(input: {
	id: string;
	tabId: number;
	windowId: number;
	url: string;
}) {
	return {
		schemaVersion: EXECUTION_SCHEMA_VERSION,
		id: input.id,
		kind: 'matcher' as const,
		browserSessionId: sessionId,
		windowId: input.windowId,
		tabId: input.tabId,
		documentKey: createDetectionStorageHash(input.url),
		priority: 'background' as const,
		priorityRank: 2,
		state: 'queued' as const,
		createdAt: 1_700_000_000_000,
		updatedAt: 1_700_000_000_000,
		attempt: 0,
		mode: 'complete' as const,
		estimatedBytes: 1_024,
	};
}

async function loadHarness(records: readonly ReturnType<typeof matcherWork>[]) {
	vi.resetModules();
	const removeOtherSessions = vi.fn(async () => 0);
	const listKind = vi.fn(async () => [...records]);
	const remove = vi.fn(async () => undefined);
	const cancelTab = vi.fn(async () => undefined);
	const log = vi.fn();

	vi.doMock('@/lib/scheduler/database', () => ({
		claimId: vi.fn(),
		listKind,
		remove,
		removeOtherSessions,
		removeTabKind: vi.fn(),
		reprioritizeWindow: vi.fn(),
		save: vi.fn(),
		setPriority: vi.fn(),
	}));
	vi.doMock('@/lib/scheduler/session', () => ({
		createId: vi.fn(() => 'matcher-scheduler-owner'),
		get: vi.fn(async () => sessionId),
	}));

	const matcher = await import('@/lib/scheduler/matcher');
	const executor = {
		capacity: 2,
		runPartition: vi.fn(),
		cancelJob: vi.fn(async () => undefined),
		cancelTab,
		touchLifecycle: vi.fn(async () => undefined),
		releaseLifecycle: vi.fn(async () => undefined),
	} satisfies MatcherPartitionExecutor;
	const scheduler = matcher.create(executor, log);
	return { scheduler, executor, cancelTab, listKind, remove, removeOtherSessions, log };
}

afterEach(() => {
	vi.doUnmock('@/lib/scheduler/database');
	vi.doUnmock('@/lib/scheduler/session');
	vi.resetModules();
});

describe.sequential('matcher scheduler recovery', () => {
	it('cancels orphaned tab execution and returns each exact document once for recollection', async () => {
		const first = matcherWork({
			id: 'matcher-1',
			tabId: 7,
			windowId: 1,
			url: 'https://example.com/products',
		});
		const duplicateDocument = matcherWork({
			id: 'matcher-2',
			tabId: 7,
			windowId: 1,
			url: 'https://example.com/products',
		});
		const second = matcherWork({
			id: 'matcher-3',
			tabId: 9,
			windowId: 2,
			url: 'https://other.example/pricing',
		});
		const harness = await loadHarness([first, duplicateDocument, second]);

		const recoveries = await harness.scheduler.reconcile();

		expect(harness.removeOtherSessions).toHaveBeenCalledWith(sessionId);
		expect(harness.listKind).toHaveBeenCalledWith(sessionId, 'matcher');
		expect(harness.cancelTab.mock.calls).toEqual([
			[7, 'context-interrupted'],
			[9, 'context-interrupted'],
		]);
		expect(harness.remove.mock.calls.map((call) => call[0])).toEqual(['matcher-1', 'matcher-2', 'matcher-3']);
		expect(recoveries).toEqual([
			{ tabId: 7, windowId: 1, documentKey: createDetectionStorageHash('https://example.com/products') },
			{ tabId: 9, windowId: 2, documentKey: createDetectionStorageHash('https://other.example/pricing') },
		]);
		expect(harness.log).toHaveBeenCalledWith('scheduler-matcher-reconciled', {
			orphanedJobs: 3,
			recoveries,
		});
	});
	it('holds new lifecycle work after reconciliation until the composition root resumes matcher execution', async () => {
		const harness = await loadHarness([]);
		await harness.scheduler.reconcile();

		const touch = harness.scheduler.touchLifecycle('lifecycle-new', 7);
		await Promise.resolve();
		await Promise.resolve();
		expect(harness.executor.touchLifecycle).not.toHaveBeenCalled();

		harness.scheduler.resume();
		await touch;
		expect(harness.executor.touchLifecycle).toHaveBeenCalledWith('lifecycle-new', 7);
	});

});
