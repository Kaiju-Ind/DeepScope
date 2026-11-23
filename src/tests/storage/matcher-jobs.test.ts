import { afterEach, describe, expect, it, vi } from 'vitest';

import type { MatcherJobRecord, MatcherJobStatus } from '@/lib/matcher';
import { getMatcherJobCacheKey } from '@/lib/storage/contracts';
import { createMockBrowserStorageArea } from '../support/mock-browser';

/** A complete job whose URL makes an accidental private write observable. */
function privateJob(status: MatcherJobStatus = 'queued'): MatcherJobRecord {
	return {
		jobId: 'private-job',
		tabId: 7,
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

		expect(result).toBe(record);
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

		expect(await harness.listMatcherJobRecords()).toEqual([normal]);
		expect(harness.storage.values.size).toBe(4);
		expect(harness.storage.local.remove).not.toHaveBeenCalled();
		expect(harness.storage.local.set).not.toHaveBeenCalled();
	});

	it('keeps ordinary job updates and startup interruption recovery durable', async () => {
		const harness = await loadMatcherStore();
		const record = { ...privateJob('running'), jobId: 'normal-job', incognito: false };
		await harness.browserMatcherJobStore.saveMatcherJob(record);

		const reconciled = await harness.reconcileInterruptedMatcherJobs();
		const stored = await harness.getMatcherJobRecord(record.jobId);

		expect(harness.cancel).toHaveBeenCalledExactlyOnceWith(record.jobId);
		expect(reconciled).toEqual([stored]);
		expect(stored).toMatchObject({
			...record,
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

		expect(await harness.reconcileInterruptedMatcherJobs(log)).toEqual([]);
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

		expect(await harness.reconcileInterruptedMatcherJobs()).toEqual([]);
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

		const reconciled = await harness.reconcileInterruptedMatcherJobs(log);

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

		expect(await harness.reconcileInterruptedMatcherJobs(log)).toEqual([]);
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
