import { afterEach, describe, expect, it, vi } from 'vitest';

import { getDetectionOriginSnapshotKey } from '@/lib/storage/contracts';
import { makeDetectionSessionSnapshot } from '../support/factories';
import {
	createMockBrowserStorageArea,
	createMockBrowserStorageChangeEvent,
} from '../support/mock-browser';

async function loadBrowserPersistenceHarness() {
	vi.resetModules();
	const storage = createMockBrowserStorageArea();
	const onChanged = createMockBrowserStorageChangeEvent();
	vi.doMock('wxt/browser', () => ({
		browser: {
			storage: {
				local: storage.local,
				onChanged,
			},
		},
	}));

	return {
		...(await import('@/lib/persistence/browser')),
		onChanged,
	};
}

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

describe('browser detection persistence adapters', { concurrent: false }, () => {
	it('publishes only valid snapshots from the requested origin storage key', async () => {
		const harness = await loadBrowserPersistenceHarness();
		const originHash = 'origin-example';
		const storageKey = getDetectionOriginSnapshotKey(originHash);
		const onRevision = vi.fn();
		const unsubscribe = harness.browserDetectionSnapshotRevisionSource.subscribeOriginSnapshot(originHash, onRevision);
		const snapshot = makeDetectionSessionSnapshot({ key: { tabId: 7, frameId: 0, documentId: 'document-1', originHash } });

		harness.onChanged.emit({ other: { newValue: snapshot } });
		harness.onChanged.emit({ [storageKey]: { newValue: { invalid: true } } });
		harness.onChanged.emit({ [storageKey]: { newValue: snapshot } });
		unsubscribe();

		expect(onRevision).toHaveBeenCalledOnce();
		expect(onRevision).toHaveBeenCalledWith(expect.objectContaining({ key: snapshot.key }));
		expect(harness.onChanged.addListener).toHaveBeenCalledOnce();
		expect(harness.onChanged.removeListener).toHaveBeenCalledOnce();
	});
});
