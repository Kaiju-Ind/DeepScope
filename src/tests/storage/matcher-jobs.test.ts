import { afterEach, describe, expect, it, vi } from 'vitest';

import type { MatcherJobRecord } from '@/lib/matcher';
import { getMatcherJobCacheKey } from '@/lib/storage/contracts';
import { createMockBrowserStorageArea } from '../support/mock-browser';

async function loadHarness(initialValues: Record<string, unknown> = {}) {
	vi.resetModules();
	const { local, values } = createMockBrowserStorageArea(initialValues);
	vi.doMock('wxt/browser', () => ({ browser: { storage: { local } } }));
	const storage = await import('@/lib/storage/matcher-jobs');
	return { ...storage, local, values };
}

function matcherJob(overrides: Partial<MatcherJobRecord> = {}): MatcherJobRecord {
	return {
		jobId: 'matcher-1',
		tabId: 7,
		windowId: 3,
		contextId: 'context-current',
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

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

describe.sequential('matcher lifecycle diagnostics', () => {
	it('persists only the privacy-safe matcher lifecycle projection', async () => {
		const harness = await loadHarness();
		const job = matcherJob();

		await harness.saveMatcherJobRecord(job);

		const stored = harness.values.get(getMatcherJobCacheKey(job.jobId));
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

	it('never persists incognito matcher lifecycle records', async () => {
		const harness = await loadHarness();
		const job = matcherJob({ incognito: true });

		await harness.saveMatcherJobRecord(job);

		expect(harness.values.has(getMatcherJobCacheKey(job.jobId))).toBe(false);
	});

	it('sanitizes legacy records and marks only previous-context active jobs interrupted', async () => {
		const old = matcherJob({
			jobId: 'matcher-old',
			contextId: 'context-old',
			status: 'running',
			partitionCount: 4,
			completedPartitionCount: 2,
		});
		const current = matcherJob({ jobId: 'matcher-current', contextId: 'context-current' });
		const incognito = matcherJob({ jobId: 'matcher-private', contextId: 'context-old', incognito: true });
		const harness = await loadHarness({
			[getMatcherJobCacheKey(old.jobId)]: old,
			[getMatcherJobCacheKey(current.jobId)]: current,
			[getMatcherJobCacheKey(incognito.jobId)]: incognito,
		});

		const interrupted = await harness.reconcileMatcherJobRecords('context-current');

		expect(interrupted).toHaveLength(1);
		expect(interrupted[0]).toMatchObject({
			jobId: 'matcher-old',
			status: 'failed',
			reason: 'context-interrupted',
			interruptedStatus: 'running',
		});
		const storedOld = harness.values.get(getMatcherJobCacheKey(old.jobId));
		expect(storedOld).not.toHaveProperty('expectedUrl');
		expect(storedOld).not.toHaveProperty('target');
		expect(storedOld).toMatchObject({ status: 'failed', interruptedStatus: 'running' });
		expect(harness.values.get(getMatcherJobCacheKey(current.jobId))).toMatchObject({
			status: 'queued',
			contextId: 'context-current',
		});
		expect(harness.values.has(getMatcherJobCacheKey(incognito.jobId))).toBe(false);
	});
});
