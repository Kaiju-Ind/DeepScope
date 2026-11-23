import { afterEach, expect, it, vi } from 'vitest';

import type { MatcherJobRecord } from '@/lib/matcher';
import { getMatcherJobCacheKey } from '@/lib/storage/contracts';
import { createMockBrowserStorageArea } from '../support/mock-browser';

/** Exercise both recovery and the real offscreen client with only browser I/O replaced. */
async function recoveryFixture(getContexts?: () => Promise<unknown>) {
	const record: MatcherJobRecord = {
		jobId: 'interrupted-private-job', tabId: 7, incognito: true, status: 'running', mode: 'complete',
		expectedUrl: 'https://fixture.invalid/private',
		target: { url: 'https://fixture.invalid/private', hostname: 'fixture.invalid' },
		createdAt: 1, updatedAt: 2, observationCount: 3, partitionCount: 1, completedPartitionCount: 0,
	};
	const key = getMatcherJobCacheKey(record.jobId);
	const storage = createMockBrowserStorageArea({ [key]: record });
	const sendMessage = vi.fn();
	const log = vi.fn();
	vi.doMock('wxt/browser', () => ({ browser: {
		runtime: { sendMessage, getContexts, getURL: (path: string) => 'chrome-extension://fixture' + path, ContextType: { OFFSCREEN_DOCUMENT: 'OFFSCREEN_DOCUMENT' } },
		storage: { local: storage.local },
	} }));
	const { reconcileInterruptedMatcherJobs } = await import('@/lib/background/reconcile-matcher-jobs');
	return { record, key, storage, sendMessage, log, reconcile: () => reconcileInterruptedMatcherJobs(log) };
}

afterEach(() => { vi.doUnmock('wxt/browser'); vi.resetModules(); });

it('retires the recovery key after the host acknowledges that exact job', async () => {
	const contexts = vi.fn();
	const fixture = await recoveryFixture(contexts);
	fixture.sendMessage.mockResolvedValue({ ok: true, canceled: true, jobId: fixture.record.jobId });
	await fixture.reconcile();
	expect(fixture.sendMessage).toHaveBeenCalledWith(expect.objectContaining({ type: 'matcher.cancel-job', jobId: fixture.record.jobId }));
	expect(contexts).not.toHaveBeenCalled();
	expect(fixture.storage.values.has(fixture.key)).toBe(false);
	expect(fixture.log).not.toHaveBeenCalled();
});

it('retires the recovery key when Chrome confirms the matcher document is gone', async () => {
	const contexts = vi.fn(async () => []);
	const fixture = await recoveryFixture(contexts);
	fixture.sendMessage.mockRejectedValue(new Error('No receiver'));
	await fixture.reconcile();
	expect(contexts).toHaveBeenCalledExactlyOnceWith({ contextTypes: ['OFFSCREEN_DOCUMENT'], documentUrls: ['chrome-extension://fixture/offscreen.html'] });
	expect(fixture.storage.values.has(fixture.key)).toBe(false);
	expect(fixture.log).not.toHaveBeenCalled();
});

it.each(['rejection', 'missing', 'other job', 'negative'] as const)('retains the key after a live host gives a %s response', async (outcome) => {
	const fixture = await recoveryFixture(async () => [{ contextType: 'OFFSCREEN_DOCUMENT' }]);
	if (outcome === 'rejection') fixture.sendMessage.mockRejectedValue(new Error(fixture.record.expectedUrl));
	else if (outcome === 'other job') fixture.sendMessage.mockResolvedValue({ ok: true, canceled: true, jobId: 'different' });
	else if (outcome === 'negative') fixture.sendMessage.mockResolvedValue({ ok: false, reason: 'failed', message: fixture.record.expectedUrl });
	else fixture.sendMessage.mockResolvedValue(undefined);
	await fixture.reconcile();
	expect(fixture.storage.values.get(fixture.key)).toEqual(fixture.record);
	expect(fixture.log).toHaveBeenCalledExactlyOnceWith('matcher-job-legacy-private-migration-failed', { stage: 'cancel', count: 1 });
});

it.each(['unavailable', 'rejected', 'malformed'] as const)('retains the key when host discovery is %s', async (outcome) => {
	const lookup = outcome === 'unavailable' ? undefined : async () => {
		if (outcome === 'rejected') throw new Error('Context list unavailable');
		return {};
	};
	const fixture = await recoveryFixture(lookup);
	fixture.sendMessage.mockResolvedValue(undefined);
	await fixture.reconcile();
	expect(fixture.storage.values.get(fixture.key)).toEqual(fixture.record);
	expect(fixture.log).toHaveBeenCalledExactlyOnceWith('matcher-job-legacy-private-migration-failed', { stage: 'cancel', count: 1 });
});

it('keeps ordinary live-owner cancellation best effort when the receiver disappears', async () => {
	const fixture = await recoveryFixture();
	fixture.sendMessage.mockRejectedValue(new Error('No receiver'));
	const { cancel } = await import('@/lib/matcher/offscreen');
	await expect(cancel(fixture.record.jobId)).resolves.toBeUndefined();
	expect(fixture.sendMessage).toHaveBeenCalledWith(expect.objectContaining({ type: 'matcher.cancel-job', jobId: fixture.record.jobId }));
});
