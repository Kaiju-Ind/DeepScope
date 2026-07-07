import { afterEach, describe, expect, it, vi } from 'vitest';

vi.setConfig({ testTimeout: 20_000 });

import {
	STORAGE_LIMITS,
	getAnalysisResponseKey,
	getDetectionOriginSnapshotKey,
	getReplayTraceCacheKey,
	getReplayTraceHistoryCacheKey,
} from '@/lib/storage/contracts';
import { makeDetectionReplayTrace, makeDetectionSessionSnapshot } from '../support/factories';
import { createMockBrowserStorageArea } from '../support/mock-browser';

async function loadStorageHarness() {
	vi.resetModules();
	const { local, values } = createMockBrowserStorageArea();

	vi.doMock('wxt/browser', () => ({
		browser: {
			storage: {
				local,
			},
		},
	}));

	const storage = await import('@/lib/storage');
	return { ...storage, local, values };
}

afterEach(() => {
	vi.useRealTimers();
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

describe.sequential('snapshot-backed storage status and replay records', () => {
	it('builds response and replay keys from origins instead of full paths', () => {
		expect(getAnalysisResponseKey('https://example.com/products')).toBe(
			'analysis:https://example.com',
		);
		expect(getAnalysisResponseKey('https://example.com:8443/products')).toBe(
			'analysis:https://example.com:8443',
		);
		expect(getReplayTraceCacheKey('https://example.com/products')).toBe(
			'replay:https://example.com',
		);
		expect(getReplayTraceHistoryCacheKey('https://example.com/products')).toBe(
			'replay-history:https://example.com',
		);
	});

	it('computes analysis status from origin snapshots instead of legacy analysis records', async () => {
		const storage = await loadStorageHarness();
		const snapshot = makeDetectionSessionSnapshot({
			key: {
				tabId: 7,
				frameId: 0,
				documentId: 'document-1',
				originHash: 'origin-example',
			},
			updatedAt: 1_700_000_000_125,
		});

		await storage.saveDetectionSessionSnapshot(snapshot);
		const status = await storage.getStatus();

		expect(status).toEqual({
			totalAnalyses: 1,
			trackedOrigins: 1,
			lastAnalyzedAt: 1_700_000_000_125,
		});
	});

	it('ignores orphaned legacy analysis records when reporting status', async () => {
		const storage = await loadStorageHarness();

		storage.values.set('analysis:https://legacy.example', {
			url: 'https://legacy.example',
			hostname: 'legacy.example',
			analyzedAt: 1_700_000_000_000,
			results: [],
			errors: [],
			source: 'cache',
		});

		await expect(storage.getStatus()).resolves.toEqual({
			totalAnalyses: 0,
			trackedOrigins: 0,
			lastAnalyzedAt: undefined,
		});
	});


	it('clears only detector-owned storage records', async () => {
		const storage = await loadStorageHarness();
		storage.values.set('rd:session:7:0:document', { status: 'complete' });
		storage.values.set('rd:origin:origin-example:latest', { status: 'complete' });
		storage.values.set('rd:origin-summary:origin-example:latest', { status: 'complete' });
		storage.values.set('rd:status', { totalAnalyses: 1 });
		storage.values.set('replay:https://example.com', { resultCount: 1 });
		storage.values.set('replay-history:https://example.com', []);
		storage.values.set('matcher-job:job-1', { status: 'queued' });
		storage.values.set('unrelated-setting', true);

		await expect(storage.clearStoredDetectionData()).resolves.toBe(7);

		expect(storage.values.has('rd:session:7:0:document')).toBe(false);
		expect(storage.values.has('rd:origin:origin-example:latest')).toBe(false);
		expect(storage.values.has('rd:origin-summary:origin-example:latest')).toBe(false);
		expect(storage.values.has('rd:status')).toBe(false);
		expect(storage.values.has('replay:https://example.com')).toBe(false);
		expect(storage.values.has('replay-history:https://example.com')).toBe(false);
		expect(storage.values.has('matcher-job:job-1')).toBe(false);
		expect(storage.values.get('unrelated-setting')).toBe(true);
	});

	it('returns cached replay traces for a different URL on the same origin', async () => {
		const storage = await loadStorageHarness();
		const trace = makeDetectionReplayTrace({
			target: {
				url: 'https://example.com/products',
				hostname: 'example.com',
			},
			analyzedAt: Date.now(),
		});

		await storage.saveReplayTrace(trace);
		const cached = await storage.getCachedReplayTrace('https://example.com/pricing');

		expect(cached).toMatchObject({
			target: {
				url: 'https://example.com/products',
			},
			completedMode: 'event',
		});
		expect(cached).not.toBe(trace);
	});

	it('keeps bounded replay history for the active origin', async () => {
		vi.useFakeTimers({ now: 1_700_000_000_010 });
		const storage = await loadStorageHarness();
		const firstTrace = makeDetectionReplayTrace({ analyzedAt: 1_700_000_000_001, resultCount: 1 });
		const secondTrace = makeDetectionReplayTrace({ analyzedAt: 1_700_000_000_002, resultCount: 2 });

		await storage.saveReplayTrace(firstTrace);
		await storage.saveReplayTrace(secondTrace);
		const history = await storage.getCachedReplayTraceHistory('https://example.com/pricing');

		expect(history.map((trace) => trace.resultCount)).toEqual([2, 1]);
		expect(history[0]).not.toBe(secondTrace);
	});

	it('removes expired replay history records without returning stale runs', async () => {
		vi.useFakeTimers({ now: 1_700_000_000_000 });
		const storage = await loadStorageHarness();

		await storage.saveReplayTrace(makeDetectionReplayTrace({ analyzedAt: 1_700_000_000_000 }));
		vi.setSystemTime(1_700_000_000_000 + STORAGE_LIMITS.replayTraceTtlMs + 1);
		const history = await storage.getCachedReplayTraceHistory('https://example.com/products');

		expect(history).toEqual([]);
		expect(storage.local.remove).toHaveBeenCalledWith('replay-history:https://example.com');
	});

	it('removes expired replay traces without removing fresh snapshot records', async () => {
		vi.useFakeTimers({ now: 1_700_000_000_000 });
		const storage = await loadStorageHarness();
		const snapshot = makeDetectionSessionSnapshot({
			key: {
				tabId: 7,
				frameId: 0,
				documentId: 'document-1',
				originHash: 'origin-example',
			},
		});

		await storage.saveDetectionSessionSnapshot(snapshot);
		await storage.saveReplayTrace(makeDetectionReplayTrace({ analyzedAt: 1_700_000_000_000 }));
		vi.setSystemTime(1_700_000_000_000 + STORAGE_LIMITS.replayTraceTtlMs + 1);
		const cachedTrace = await storage.getCachedReplayTrace('https://example.com/products');

		expect(cachedTrace).toBeNull();
		expect(storage.local.remove).toHaveBeenCalledWith('replay:https://example.com');
		expect(storage.values.has(getDetectionOriginSnapshotKey(snapshot.key.originHash))).toBe(true);
	});
});
