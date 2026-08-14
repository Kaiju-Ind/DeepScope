import { describe, expect, it, vi } from 'vitest';

import type { DetectionSessionSnapshot } from '@/lib/contracts/detection-session';
import type { VisibleTabIdentity } from '@/lib/messaging';
import type { DetectionSnapshotRevisionSource } from '@/lib/persistence';
import type { PopupSnapshotPersistence } from '@/lib/popup/snapshot-state';
import {
	createStoredPopupVisibleRevision,
	isNewerSnapshotRevision,
	readStoredPopupAnalysis,
	subscribeToPopupSnapshotRevisions,
} from '@/lib/popup/snapshot-state';
import { createDetectionStorageHash } from '@/lib/storage/contracts';
import { makeAnalysis, makeDetection, makeDetectionSessionSnapshot } from '../support/factories';

const ACTIVE_IDENTITY: VisibleTabIdentity = {
	tabId: 7,
	frameId: 0,
	url: 'https://example.com/products',
	hostname: 'example.com',
	originHash: 'origin-example',
	urlHash: 'url-example-products',
	incognito: false,
};

function createPopupPersistence(input: {
	readonly sessionSnapshots?: readonly DetectionSessionSnapshot[];
	readonly originSnapshot?: DetectionSessionSnapshot | null;
} = {}): PopupSnapshotPersistence {
	const sessionSnapshots = input.sessionSnapshots ?? [];
	return {
		getSessionIndex: vi.fn(async (tabId) => ({
			tabId,
			entries: sessionSnapshots.map((snapshot) => ({
				key: snapshot.key,
				urlHash: snapshot.urlHash,
				status: snapshot.status,
				updatedAt: snapshot.updatedAt,
			})),
			updatedAt: sessionSnapshots[0]?.updatedAt ?? 0,
		})),
		getLatestSessionSnapshot: vi.fn(async (key) =>
			sessionSnapshots.find((snapshot) => snapshot.key.documentId === key.documentId) ?? null),
		getLatestOriginSnapshot: vi.fn(async () => input.originSnapshot ?? null),
		getReplayTrace: vi.fn(async () => null),
		getReplayHistory: vi.fn(async () => []),
	};
}

function createRevisionSource() {
	let handler: ((snapshot: DetectionSessionSnapshot) => void) | undefined;
	const unsubscribe = vi.fn();
	const source: DetectionSnapshotRevisionSource = {
		subscribeOriginSnapshot: vi.fn((_originHash, onRevision) => {
			handler = onRevision;
			return unsubscribe;
		}),
	};
	return {
		source,
		emit(snapshot: DetectionSessionSnapshot) {
			handler?.(snapshot);
		},
		unsubscribe,
	};
}

describe('popup snapshot state', () => {
	it('reads a same-tab origin snapshot as the startup source', async () => {
		const snapshot = makeDetectionSessionSnapshot({
			key: { tabId: ACTIVE_IDENTITY.tabId, frameId: ACTIVE_IDENTITY.frameId, documentId: 'document-1', originHash: ACTIVE_IDENTITY.originHash },
			analysis: makeAnalysis([makeDetection('solidjs')], { source: 'fresh' }),
			revision: 2,
			status: 'complete',
		});
		const persistence = createPopupPersistence({ originSnapshot: snapshot });

		const stored = await readStoredPopupAnalysis(ACTIVE_IDENTITY, persistence);

		expect(stored).toMatchObject({
			source: 'origin-snapshot',
			analysis: { results: [expect.objectContaining({ technologyId: 'solidjs' })] },
			snapshot: { revision: 2 },
		});
	});

	it('prefers exact visible session snapshots over origin fallback records', async () => {
		const originSnapshot = makeDetectionSessionSnapshot({
			key: { tabId: ACTIVE_IDENTITY.tabId, frameId: ACTIVE_IDENTITY.frameId, documentId: 'older-document', originHash: ACTIVE_IDENTITY.originHash },
			analysis: makeAnalysis([makeDetection('older')], { source: 'fresh' }),
			urlHash: ACTIVE_IDENTITY.urlHash,
			updatedAt: 1_700_000_000_001,
			source: 'background',
		});
		const exactSnapshot = makeDetectionSessionSnapshot({
			key: { tabId: ACTIVE_IDENTITY.tabId, frameId: ACTIVE_IDENTITY.frameId, documentId: 'exact-document', originHash: ACTIVE_IDENTITY.originHash },
			analysis: makeAnalysis([makeDetection('solidjs')], { source: 'fresh' }),
			urlHash: ACTIVE_IDENTITY.urlHash,
			updatedAt: 1_700_000_000_002,
			source: 'background',
		});
		const persistence = createPopupPersistence({ sessionSnapshots: [exactSnapshot], originSnapshot });

		const stored = await readStoredPopupAnalysis(ACTIVE_IDENTITY, persistence);

		expect(stored).toMatchObject({
			source: 'session-snapshot',
			analysis: { results: [expect.objectContaining({ technologyId: 'solidjs' })] },
			snapshot: { key: exactSnapshot.key },
			revision: {
				source: 'snapshot',
				analysis: { results: [expect.objectContaining({ technologyId: 'solidjs' })] },
				sessionSnapshotStatus: exactSnapshot.status,
				sessionSnapshotSource: exactSnapshot.source,
			},
		});
	});

	it('returns null when no matching snapshot exists for the visible tab', async () => {
		const stored = await readStoredPopupAnalysis(ACTIVE_IDENTITY, createPopupPersistence());
		expect(stored).toBeNull();
	});

	it('filters subscribed revisions to the active visible tab', () => {
		const revisions = createRevisionSource();
		const onRevision = vi.fn();
		const unsubscribe = subscribeToPopupSnapshotRevisions(ACTIVE_IDENTITY, revisions.source, onRevision);
		const otherTabSnapshot = makeDetectionSessionSnapshot({ key: { tabId: 11, frameId: 0, documentId: 'document-1', originHash: ACTIVE_IDENTITY.originHash } });
		const previousPageSnapshot = makeDetectionSessionSnapshot({
			key: { tabId: ACTIVE_IDENTITY.tabId, frameId: ACTIVE_IDENTITY.frameId, documentId: 'document-1', originHash: ACTIVE_IDENTITY.originHash },
			urlHash: 'url-example-previous-page',
		});
		const matchingSnapshot = makeDetectionSessionSnapshot({ key: { tabId: ACTIVE_IDENTITY.tabId, frameId: ACTIVE_IDENTITY.frameId, documentId: 'document-1', originHash: ACTIVE_IDENTITY.originHash }, revision: 3 });

		revisions.emit(otherTabSnapshot);
		revisions.emit(previousPageSnapshot);
		revisions.emit(matchingSnapshot);
		unsubscribe();

		expect(onRevision).toHaveBeenCalledTimes(1);
		expect(onRevision).toHaveBeenCalledWith(expect.objectContaining({ revision: 3 }));
		expect(revisions.source.subscribeOriginSnapshot).toHaveBeenCalledWith(ACTIVE_IDENTITY.originHash, expect.any(Function));
		expect(revisions.unsubscribe).toHaveBeenCalledOnce();
	});

	it('applies only newer revisions for the active popup snapshot', () => {
		const current = makeDetectionSessionSnapshot({ revision: 2, updatedAt: 1_700_000_000_002 });
		const olderSameDocument = makeDetectionSessionSnapshot({ revision: 1, updatedAt: 1_700_000_000_003 });
		const newerSameDocument = makeDetectionSessionSnapshot({ revision: 3, updatedAt: 1_700_000_000_001 });
		const newerDifferentDocument = makeDetectionSessionSnapshot({ key: { ...current.key, documentId: 'document-2' }, revision: 1, updatedAt: 1_700_000_000_004 });

		expect(isNewerSnapshotRevision(null, current)).toBe(true);
		expect(isNewerSnapshotRevision(current, olderSameDocument)).toBe(false);
		expect(isNewerSnapshotRevision(current, newerSameDocument)).toBe(true);
		expect(isNewerSnapshotRevision(current, newerDifferentDocument)).toBe(true);
		expect(createDetectionStorageHash(ACTIVE_IDENTITY.url)).toBeTypeOf('string');
	});

	it('keeps stored revisions compatible with the existing popup view model', () => {
		const snapshot = makeDetectionSessionSnapshot({ analysis: makeAnalysis([makeDetection('solidjs')]) });
		const revision = createStoredPopupVisibleRevision({
			source: 'session-snapshot',
			analysis: snapshot.analysis,
			snapshot,
		});
		expect(revision.analysis.results).toHaveLength(1);
	});
});
