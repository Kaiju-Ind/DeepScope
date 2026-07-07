import type { ContentPageSessionSnapshotTarget } from '@/lib/contracts/analysis';

import { afterEach, describe, expect, it, vi } from 'vitest';
import { getDetectionSessionSnapshotKey } from '@/lib/storage/contracts';
import { makeAnalysis, makeDetection, makeDetectionSessionSnapshot } from '../support/factories';
import { createMockBrowserStorageArea } from '../support/mock-browser';

const SNAPSHOT_TARGET: ContentPageSessionSnapshotTarget = {
	key: {
		tabId: 7,
		frameId: 0,
		documentId: 'session-1',
		originHash: 'origin-example',
	},
	url: 'https://example.com/products',
	urlHash: 'url-example-products',
	hostname: 'example.com',
};

async function loadPageSessionSnapshotHarness(initialValues: Record<string, unknown> = {}) {
	vi.resetModules();
	const storage = createMockBrowserStorageArea(initialValues);
	vi.doMock('wxt/browser', () => ({
		browser: {
			storage: {
				local: storage.local,
			},
		},
	}));

	return {
		...(await import('@/lib/content/page-session-snapshots')),
		storage,
	};
}

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

describe.sequential('content page-session snapshots', () => {
	/**
	 * Content can publish the first visible lifecycle state before background
	 * enrichment has produced detector results. The placeholder analysis keeps
	 * popup rendering deterministic without storing raw page observations.
	 */
	it('writes an observing revision when no detector analysis exists yet', async () => {
		const harness = await loadPageSessionSnapshotHarness();

		const snapshot = await harness.writeContentPageSessionSnapshot({
			target: SNAPSHOT_TARGET,
			status: 'observing',
			observedAt: 1_700_000_000_000,
			reason: 'observation-session-started',
		});

		expect(snapshot).toMatchObject({
			revision: 1,
			status: 'observing',
			source: 'content',
			detectionCount: 0,
			analysis: {
				url: SNAPSHOT_TARGET.url,
				hostname: SNAPSHOT_TARGET.hostname,
				results: [],
			},
			enrichment: {
				status: 'not-needed',
				reason: 'observation-session-started',
			},
		});
	});

	/**
	 * Observer updates should not erase detector output already promoted by the
	 * background. Content owns the lifecycle revision, while background-owned
	 * analysis remains the best available evidence until a newer analysis lands.
	 */
	it('preserves existing detector results while content advances lifecycle state', async () => {
		const existingAnalysis = makeAnalysis([makeDetection('solidjs')]);
		const existingSnapshot = makeDetectionSessionSnapshot({
			key: SNAPSHOT_TARGET.key,
			urlHash: SNAPSHOT_TARGET.urlHash,
			analysis: existingAnalysis,
			revision: 2,
			status: 'complete',
			source: 'background',
		});
		const harness = await loadPageSessionSnapshotHarness({
			[getDetectionSessionSnapshotKey(SNAPSHOT_TARGET.key)]: existingSnapshot,
		});

		const snapshot = await harness.writeContentPageSessionSnapshot({
			target: SNAPSHOT_TARGET,
			status: 'observing',
			observedAt: 1_700_000_000_125,
			reason: 'observation-batch-flushed',
		});

		expect(snapshot).toMatchObject({
			revision: 3,
			status: 'observing',
			detectionCount: 1,
			analysis: {
				results: [expect.objectContaining({ technologyId: 'solidjs' })],
			},
		});
	});
});
