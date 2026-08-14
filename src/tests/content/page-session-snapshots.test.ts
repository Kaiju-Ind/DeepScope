import type { ContentPageSessionSnapshotTarget } from '@/lib/contracts/analysis';
import type { DetectionSessionSnapshot } from '@/lib/contracts/detection-session';
import type { DetectionSnapshotReader, DetectionSnapshotWriter } from '@/lib/persistence';

import { describe, expect, it, vi } from 'vitest';
import { writeContentPageSessionSnapshot } from '@/lib/content/page-session-snapshots';
import { makeAnalysis, makeDetection, makeDetectionSessionSnapshot } from '../support/factories';

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

type ContentSnapshotStore = Pick<DetectionSnapshotReader, 'getLatestSessionSnapshot'> & DetectionSnapshotWriter;

function createContentSnapshotStore(initial: DetectionSessionSnapshot | null = null): ContentSnapshotStore {
	let stored = initial;
	return {
		getLatestSessionSnapshot: vi.fn(async () => stored),
		saveSnapshot: vi.fn(async (snapshot) => {
			stored = snapshot;
			return {
				accepted: true,
				sessionStorageKey: 'session:test',
				originStorageKey: 'origin:test',
				snapshot,
			};
		}),
	};
}

describe('content page-session snapshots', () => {
	/**
	 * Content can publish the first visible lifecycle state before background
	 * enrichment has produced detector results. The placeholder analysis keeps
	 * popup rendering deterministic without storing raw page observations.
	 */
	it('writes an observing revision when no detector analysis exists yet', async () => {
		const store = createContentSnapshotStore();

		const snapshot = await writeContentPageSessionSnapshot({
			target: SNAPSHOT_TARGET,
			status: 'observing',
			observedAt: 1_700_000_000_000,
			reason: 'observation-session-started',
		}, store);

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
		const store = createContentSnapshotStore(existingSnapshot);

		const snapshot = await writeContentPageSessionSnapshot({
			target: SNAPSHOT_TARGET,
			status: 'observing',
			observedAt: 1_700_000_000_125,
			reason: 'observation-batch-flushed',
		}, store);

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
