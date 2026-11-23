import { afterEach, describe, expect, it, vi } from 'vitest';

import type { MatcherJobRecord, MatcherJobStatus } from '@/lib/matcher';
import { getMatcherJobCacheKey } from '@/lib/storage/contracts';
import { createMockBrowserStorageArea } from '../support/mock-browser';

/** A complete job whose URL makes an accidental private write observable. */
function privateJob(status: MatcherJobStatus = 'queued'): MatcherJobRecord {
	return {
		jobId: 'private-job',
		tabId: 7,
		windowId: 3,
		contextId: 'context-old',
		expectedUrl: 'https://example.com/private-matcher-sentinel?visit=private',
		incognito: true,
		status,
		mode: 'complete',
		target: {
			url: 'https://example.com/private-matcher-sentinel?visit=private',
			hostname: 'example.com',
		},
		createdAt: 1,
		updatedAt: 2,
		observationCount: 1,
		partitionCount: 1,
		completedPartitionCount: status === 'completed' ? 1 : 0,
	};
}

/** Background context performing startup reconciliation in these tests. */
const CURRENT_CONTEXT = 'context-current';

/** Load the production storage adapter with only the browser I/O replaced. */
async function loadMatcherStore(initialValues: Record<string, unknown> = {}) {
	vi.resetModules();
	const storage = createMockBrowserStorageArea(initialValues);
	const cancel = vi.fn(async () => undefined);
	vi.doMock('wxt/browser', () => ({ browser: { storage: { local: storage.local } } }));
	vi.doMock('@/lib/matcher/offscreen', () => ({ cancel, cancelForRecovery: cancel }));
	return {
		storage,
		cancel,
		...(await import('@/lib/storage/matcher-jobs')),
		...(await import('@/lib/persistence/browser')),
		...(await import('@/lib/background/reconcile-matcher-jobs')),
	};
}

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.doUnmock('@/lib/matcher/offscreen');
	vi.restoreAllMocks();
	vi.resetModules();
});

describe('matcher job privacy and recovery', { concurrent: false }, () => {
	it.each<MatcherJobStatus>([
		'queued', 'dispatching', 'running', 'streaming', 'recording',
		'completed', 'stale', 'canceled', 'failed',
	])('keeps private %s jobs out of durable storage', async (status) => {
		const harness = await loadMatcherStore();
		const record = privateJob(status);
		harness.storage.local.get.mockRejectedValueOnce(new Error('Storage unavailable'));
		harness.storage.local.remove.mockRejectedValueOnce(new Error('Storage unavailable'));

		const result = await harness.browserMatcherJobStore.saveMatcherJob(record);
		const updated = await harness.browserMatcherJobStore.updateMatcherJob(record, {
			status: 'completed', reason: 'completed',
		});

		// The returned projection is in-memory only and carries no document URL.
		expect(result).toMatchObject({ jobId: record.jobId, status });
		expect(result).not.toHaveProperty('expectedUrl');
		expect(result).not.toHaveProperty('target');
		expect(updated).toBeNull();
		expect(harness.storage.local.get).not.toHaveBeenCalled();
		expect(harness.storage.local.remove).not.toHaveBeenCalled();
		expect(harness.storage.local.set).not.toHaveBeenCalled();
		expect([...harness.storage.values]).toEqual([]);
	});

	it('hides an older private record from a direct read without deleting its recovery ID', async () => {
		const record = privateJob('completed');
		const key = getMatcherJobCacheKey(record.jobId);
		const harness = await loadMatcherStore({ [key]: record, preference: true });

		expect(await harness.getMatcherJobRecord(record.jobId)).toBeNull();
		expect(harness.storage.values.get(key)).toBe(record);
		expect(harness.storage.values.get('preference')).toBe(true);
		expect(harness.storage.local.remove).not.toHaveBeenCalled();
		expect(harness.storage.local.set).not.toHaveBeenCalled();
	});

	it('cannot revive an old private record through a terminal update', async () => {
		const record = privateJob('running');
		const key = getMatcherJobCacheKey(record.jobId);
		const harness = await loadMatcherStore({ [key]: record });

		expect(await harness.updateMatcherJobRecord({ jobId: record.jobId }, {
			status: 'failed', reason: 'worker-failed', errorMessage: 'Matcher stopped.',
		})).toBeNull();
		expect(harness.storage.values.get(key)).toBe(record);
		expect(harness.storage.local.set).not.toHaveBeenCalled();
	});

	it('does not replace a legacy private row with a new private save', async () => {
		const record = privateJob('running');
		const key = getMatcherJobCacheKey(record.jobId);
		const harness = await loadMatcherStore({ [key]: record });

		await harness.saveMatcherJobRecord({ ...record, status: 'canceled' });

		expect(harness.storage.values.get(key)).toBe(record);
		expect(harness.storage.local.remove).not.toHaveBeenCalled();
		expect(harness.storage.local.set).not.toHaveBeenCalled();
	});

	it('lists only ordinary history before startup cleans up older private rows', async () => {
		const privateActive = privateJob('running');
		const privateTerminal = { ...privateJob('completed'), jobId: 'private-terminal' };
		const normal = { ...privateJob('completed'), jobId: 'normal-job', incognito: false };
		const harness = await loadMatcherStore({
			[getMatcherJobCacheKey(privateActive.jobId)]: privateActive,
			[getMatcherJobCacheKey(privateTerminal.jobId)]: privateTerminal,
			[getMatcherJobCacheKey(normal.jobId)]: normal,
			preference: true,
		});

		expect(await harness.listMatcherJobRecords()).toEqual([
			expect.objectContaining({ jobId: normal.jobId, status: normal.status }),
		]);
		expect(harness.storage.values.size).toBe(4);
		expect(harness.storage.local.remove).not.toHaveBeenCalled();
		expect(harness.storage.local.set).not.toHaveBeenCalled();
	});

	it('keeps ordinary job updates and startup interruption recovery durable', async () => {
		const harness = await loadMatcherStore();
		const record = { ...privateJob('running'), jobId: 'normal-job', incognito: false };
		await harness.browserMatcherJobStore.saveMatcherJob(record);

		const reconciled = await harness.reconcileInterruptedMatcherJobs(CURRENT_CONTEXT);
		const stored = await harness.getMatcherJobRecord(record.jobId);

		// Ordinary orphaned work is stopped by the matcher scheduler's reconcile;
		// this pass only records the interruption.
		expect(harness.cancel).not.toHaveBeenCalled();
		expect(reconciled).toEqual([stored]);
		expect(stored).not.toHaveProperty('expectedUrl');
		expect(stored).toMatchObject({
			jobId: record.jobId,
			tabId: record.tabId,
			mode: record.mode,
			status: 'failed',
			reason: 'context-interrupted',
			interruptedStatus: 'running',
			interruptedAt: expect.any(Number),
			updatedAt: expect.any(Number),
		});
		expect(harness.storage.values.get(getMatcherJobCacheKey(record.jobId))).toEqual(stored);
	});

	it('purges old private terminal records even when startup finds no active jobs', async () => {
		const record = privateJob('completed');
		const harness = await loadMatcherStore({ [getMatcherJobCacheKey(record.jobId)]: record });
		const log = vi.fn();

		expect(await harness.reconcileInterruptedMatcherJobs(CURRENT_CONTEXT, log)).toEqual([]);
		expect([...harness.storage.values]).toEqual([]);
		expect(harness.cancel).not.toHaveBeenCalled();
		expect(log).not.toHaveBeenCalled();
	});

	it('cancels an active legacy private job before deleting active and terminal keys', async () => {
		const active = privateJob('running');
		const terminal = { ...privateJob('completed'), jobId: 'terminal-private' };
		const activeKey = getMatcherJobCacheKey(active.jobId);
		const terminalKey = getMatcherJobCacheKey(terminal.jobId);
		const harness = await loadMatcherStore({ [activeKey]: active, [terminalKey]: terminal });

		expect(await harness.reconcileInterruptedMatcherJobs(CURRENT_CONTEXT)).toEqual([]);
		expect(harness.cancel).toHaveBeenCalledExactlyOnceWith(active.jobId);
		expect(harness.storage.local.remove).toHaveBeenCalledExactlyOnceWith([activeKey, terminalKey]);
		expect(harness.cancel.mock.invocationCallOrder[0])
			.toBeLessThan(harness.storage.local.remove.mock.invocationCallOrder[0]!);
		expect(harness.storage.values.size).toBe(0);
	});

	it('recovers ordinary work when storage rejects a private migration removal', async () => {
		const privateRecord = privateJob('running');
		const ordinary = { ...privateJob('running'), jobId: 'ordinary-job', incognito: false };
		const privateKey = getMatcherJobCacheKey(privateRecord.jobId);
		const ordinaryKey = getMatcherJobCacheKey(ordinary.jobId);
		const harness = await loadMatcherStore({ [privateKey]: privateRecord, [ordinaryKey]: ordinary });
		harness.storage.local.remove.mockRejectedValueOnce(new Error('Storage unavailable https://private.example/'));
		const log = vi.fn();

		const reconciled = await harness.reconcileInterruptedMatcherJobs(CURRENT_CONTEXT, log);

		expect(reconciled).toEqual([expect.objectContaining({ jobId: ordinary.jobId, status: 'failed' })]);
		expect(await harness.listMatcherJobRecords()).toEqual(reconciled);
		expect(harness.storage.values.has(privateKey)).toBe(true);
		expect(log).toHaveBeenCalledWith('matcher-job-legacy-private-migration-failed', { stage: 'remove', count: 1 });
		expect(JSON.stringify(log.mock.calls)).not.toContain('private.example');
	});

	it('retains an active legacy key for retry when its cancellation rejects', async () => {
		const active = privateJob('running');
		const terminal = { ...privateJob('completed'), jobId: 'terminal-private' };
		const activeKey = getMatcherJobCacheKey(active.jobId);
		const terminalKey = getMatcherJobCacheKey(terminal.jobId);
		const harness = await loadMatcherStore({ [activeKey]: active, [terminalKey]: terminal });
		harness.cancel.mockRejectedValueOnce(new Error('Cancel failed https://private.example/'));
		const log = vi.fn();

		expect(await harness.reconcileInterruptedMatcherJobs(CURRENT_CONTEXT, log)).toEqual([]);
		expect([...harness.storage.values]).toEqual([[activeKey, active]]);
		expect(harness.storage.local.remove).toHaveBeenCalledExactlyOnceWith([terminalKey]);
		expect(log).toHaveBeenCalledWith('matcher-job-legacy-private-migration-failed', { stage: 'cancel', count: 1 });
		expect(JSON.stringify(log.mock.calls)).not.toContain('private.example');
	});

	it('reports a durable save failure for ordinary matcher work', async () => {
		const harness = await loadMatcherStore();
		const record = { ...privateJob(), incognito: false };
		harness.storage.local.set.mockRejectedValueOnce(new Error('Storage unavailable'));

		await expect(harness.saveMatcherJobRecord(record)).rejects.toThrow('Storage unavailable');
		expect(harness.storage.values.size).toBe(0);
	});
});

/** An ordinary job for the current lifecycle projection tests. */
function matcherJob(overrides: Partial<MatcherJobRecord> = {}): MatcherJobRecord {
	return {
		jobId: 'matcher-1',
		tabId: 7,
		windowId: 3,
		contextId: CURRENT_CONTEXT,
		expectedUrl: 'https://example.com/products?token=secret',
		status: 'queued',
		mode: 'complete',
		target: {
			url: 'https://example.com/products?token=secret',
			hostname: 'example.com',
		},
		createdAt: 100,
		updatedAt: 100,
		observationCount: 10,
		partitionCount: 0,
		completedPartitionCount: 0,
		...overrides,
	};
}

describe('matcher lifecycle diagnostics', { concurrent: false }, () => {
	it('persists only the privacy-safe matcher lifecycle projection', async () => {
		const harness = await loadMatcherStore();
		const job = matcherJob();

		await harness.saveMatcherJobRecord(job);

		const stored = harness.storage.values.get(getMatcherJobCacheKey(job.jobId));
		expect(stored).toMatchObject({
			schemaVersion: 2,
			jobId: job.jobId,
			tabId: job.tabId,
			windowId: job.windowId,
			contextId: job.contextId,
			status: 'queued',
		});
		expect(stored).not.toHaveProperty('expectedUrl');
		expect(stored).not.toHaveProperty('target');
		expect(stored).not.toHaveProperty('incognito');
	});

	it('sanitizes legacy records and marks only previous-context active jobs interrupted', async () => {
		const old = matcherJob({
			jobId: 'matcher-old',
			contextId: 'context-old',
			status: 'running',
			partitionCount: 4,
			completedPartitionCount: 2,
		});
		const current = matcherJob({ jobId: 'matcher-current' });
		const harness = await loadMatcherStore({
			[getMatcherJobCacheKey(old.jobId)]: old,
			[getMatcherJobCacheKey(current.jobId)]: current,
		});

		const interrupted = await harness.reconcileMatcherJobRecords(CURRENT_CONTEXT);

		expect(interrupted).toHaveLength(1);
		expect(interrupted[0]).toMatchObject({
			jobId: 'matcher-old',
			status: 'failed',
			reason: 'context-interrupted',
			interruptedStatus: 'running',
		});
		const storedOld = harness.storage.values.get(getMatcherJobCacheKey(old.jobId));
		expect(storedOld).not.toHaveProperty('expectedUrl');
		expect(storedOld).not.toHaveProperty('target');
		expect(storedOld).toMatchObject({ status: 'failed', interruptedStatus: 'running' });
		expect(harness.storage.values.get(getMatcherJobCacheKey(current.jobId))).toMatchObject({
			status: 'queued',
			contextId: CURRENT_CONTEXT,
		});
	});

	it('migrates a legacy row written before jobs carried a window id', async () => {
		const { windowId: _windowId, contextId: _contextId, ...legacy } = privateJob('completed');
		const ordinary = { ...legacy, jobId: 'legacy-ordinary', incognito: false };
		const harness = await loadMatcherStore({ [getMatcherJobCacheKey(ordinary.jobId)]: ordinary });

		expect(await harness.listMatcherJobRecords()).toEqual([
			expect.objectContaining({ jobId: ordinary.jobId, windowId: -1 }),
		]);
	});
});
