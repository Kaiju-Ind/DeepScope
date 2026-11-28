/**
 * A closed tab leaves nothing in storage, even when a scan was saving as it closed.
 *
 * Found by the Firefox stress run: `rd:session-index:<id>`, `rd:session:<id>:…`
 * and `rd:content-session:<id>:…` outlived their tabs. The removal cleanup
 * deleted the index while a scan's snapshot write was still in flight, and that
 * write recreated it; a content script's lifecycle records were never indexed.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { BackgroundDetectionPersistence } from "../../lib/persistence/index.ts";
import { getContentSessionLifecycleKey } from "../../lib/storage/contracts.ts";
import { makeDetectionSessionSnapshot } from "../support/factories.ts";
import { createMockBrowserStorageArea } from "../support/mock-browser.ts";

async function loadHarness() {
	vi.resetModules();
	const { local, values } = createMockBrowserStorageArea();
	const onRemoved = new Set<(tabId: number) => void>();
	vi.doMock('wxt/browser', () => ({
		browser: {
			storage: { local },
			tabs: {
				onUpdated: { addListener: vi.fn() },
				onRemoved: { addListener: (listener: (tabId: number) => void) => onRemoved.add(listener) },
				onReplaced: { addListener: vi.fn() },
			},
		},
	}));
	const storage = await import('../../lib/storage/index.ts');
	const { browserDetectionSnapshotStore } = await import('../../lib/persistence/index.ts');
	const lifecycle = await import('../../lib/background/lifecycle.ts');
	const writes = await import('../../lib/background/writes.ts');
	return {
		storage,
		snapshots: browserDetectionSnapshotStore,
		lifecycle,
		writes,
		values,
		closeTab: (tabId: number) => {
			for (const listener of onRemoved) listener(tabId);
		},
		sessionKeys: () => [...values.keys()].filter((key) => key.startsWith('rd:session') || key.startsWith('rd:content-session')),
	};
}

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.useRealTimers();
	vi.resetModules();
});

describe('closed tab storage cleanup', { concurrent: false }, () => {
	it('removes every session key when a save lands after the first cleanup pass', async () => {
		vi.useFakeTimers();
		const harness = await loadHarness();
		const tabWrites = harness.writes.create();
		const key = { tabId: 7, frameId: 0, documentId: 'session-1', originHash: 'origin-example' };
		await harness.storage.saveDetectionSessionSnapshot(makeDetectionSessionSnapshot({ key, revision: 1 }));
		// A content session the background never indexed.
		harness.values.set(getContentSessionLifecycleKey({ ...key, documentId: 'content-only' }), makeDetectionSessionSnapshot());

		// The scan's write starts before the tab closes and commits after cleanup's first pass.
		const gate = Promise.withResolvers<void>();
		const persistence = tabWrites.guard({
			saveSnapshot: async (snapshot) => {
				await gate.promise;
				return await harness.storage.saveDetectionSessionSnapshot(snapshot);
			},
		} as BackgroundDetectionPersistence);
		const inFlight = persistence.saveSnapshot(makeDetectionSessionSnapshot({ key, revision: 5, status: 'complete' }));

		harness.lifecycle.registerBackgroundLifecycleListeners({ snapshots: harness.snapshots, writes: tabWrites, onTabRemoved: vi.fn() });
		harness.closeTab(7);
		await vi.advanceTimersByTimeAsync(0);
		expect(harness.sessionKeys()).toEqual([]);

		gate.resolve();
		await inFlight;
		expect(harness.sessionKeys()).not.toEqual([]);

		await vi.advanceTimersByTimeAsync(harness.writes.CONTENT_WRITE_GRACE_MS);
		expect(harness.sessionKeys()).toEqual([]);

		// A write that starts after the tab closed is refused outright.
		await expect(persistence.saveSnapshot(makeDetectionSessionSnapshot({ key, revision: 9 }))).resolves.toMatchObject({ accepted: false });
		expect(harness.sessionKeys()).toEqual([]);
	});
});
