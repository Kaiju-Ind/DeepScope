import { afterEach, describe, expect, it, vi } from 'vitest';

import type { DetectionSnapshotLifecycleStore } from '@/lib/persistence';

type Listener<T extends readonly unknown[]> = (...args: T) => void;

function createListenerRegistry<T extends readonly unknown[]>() {
	const listeners = new Set<Listener<T>>();
	return {
		addListener: vi.fn((listener: Listener<T>) => {
			listeners.add(listener);
		}),
		emit(...args: T) {
			for (const listener of listeners) listener(...args);
		},
	};
}

async function loadLifecycleHarness() {
	vi.resetModules();
	const onUpdated = createListenerRegistry<[number, { status?: string; url?: string }]>();
	const onRemoved = createListenerRegistry<[number]>();
	const onReplaced = createListenerRegistry<[number, number]>();
	const snapshots: DetectionSnapshotLifecycleStore = {
		markTabSnapshots: vi.fn(async () => []),
		removeSessionIndex: vi.fn(async () => undefined),
	};
	vi.doMock('wxt/browser', () => ({
		browser: {
			tabs: {
				onUpdated,
				onRemoved,
				onReplaced,
			},
		},
	}));

	return {
		...(await import('@/lib/background/lifecycle')),
		onUpdated,
		onRemoved,
		onReplaced,
		snapshots,
	};
}

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

describe('background lifecycle listeners', { concurrent: false }, () => {
	/**
	 * Navigation events can arrive after the service worker has lost all in-memory
	 * observer handles. Stored session indexes let the lightweight listener mark
	 * prior document snapshots stale without loading the detector registry.
	 */
	it('marks indexed tab snapshots stale when a tab starts navigation', async () => {
		const harness = await loadLifecycleHarness();
		const log = vi.fn();
		const onTabNavigation = vi.fn();
		harness.registerBackgroundLifecycleListeners({
			snapshots: harness.snapshots,
			onTabNavigation,
			onTabRemoved: vi.fn(),
			log,
		});

		harness.onUpdated.emit(7, { status: 'loading' });
		await Promise.resolve();

		expect(onTabNavigation).toHaveBeenCalledWith(7);
		expect(harness.snapshots.markTabSnapshots).toHaveBeenCalledWith(7, 'stale', 'tab-navigation');
		expect(harness.snapshots.removeSessionIndex).not.toHaveBeenCalled();
	});

	it('ignores tab updates that do not replace the document', async () => {
		const harness = await loadLifecycleHarness();
		harness.registerBackgroundLifecycleListeners({ snapshots: harness.snapshots, onTabRemoved: vi.fn() });

		harness.onUpdated.emit(7, { status: 'complete' });
		await Promise.resolve();

		expect(harness.snapshots.markTabSnapshots).not.toHaveBeenCalled();
	});

	it('reports a rejected navigation write without blocking the next navigation', async () => {
		const harness = await loadLifecycleHarness();
		const log = vi.fn();
		const onTabNavigation = vi.fn();
		vi.mocked(harness.snapshots.markTabSnapshots).mockRejectedValueOnce(
			new Error('Could not write snapshot for https://example.com/private'),
		);
		harness.registerBackgroundLifecycleListeners({
			snapshots: harness.snapshots,
			onTabNavigation,
			onTabRemoved: vi.fn(),
			log,
		});

		harness.onUpdated.emit(7, { status: 'loading' });
		expect(onTabNavigation).toHaveBeenCalledWith(7);
		await vi.waitFor(() => expect(log).toHaveBeenCalledWith('tab-session-cleanup-failed', {
			tabId: 7,
			reason: 'tab-navigation',
			errorType: 'Error',
		}));

		harness.onUpdated.emit(11, { url: 'https://example.com/next' });
		expect(onTabNavigation.mock.calls).toEqual([[7], [11]]);
		expect(harness.snapshots.markTabSnapshots).toHaveBeenLastCalledWith(11, 'stale', 'tab-navigation');
		expect(harness.snapshots.removeSessionIndex).not.toHaveBeenCalled();
	});

	it('reports a rejected removal write after clearing volatile state', async () => {
		const harness = await loadLifecycleHarness();
		const log = vi.fn();
		const onTabRemoved = vi.fn();
		vi.mocked(harness.snapshots.markTabSnapshots).mockRejectedValueOnce(new Error('Stop write failed'));
		harness.registerBackgroundLifecycleListeners({ snapshots: harness.snapshots, onTabRemoved, log });

		harness.onRemoved.emit(7);
		expect(onTabRemoved).toHaveBeenCalledWith(7);
		await vi.waitFor(() => expect(log).toHaveBeenCalledWith('tab-session-cleanup-failed', {
			tabId: 7,
			reason: 'tab-removed',
			errorType: 'Error',
		}));
	});

	/**
	 * Closed tabs should drop both volatile maps and the durable tab-session index.
	 * Exact snapshot records may remain for storage history, but no future tab with
	 * the same browser id should inherit the old session list.
	 */
	it('marks indexed tab snapshots stopped and removes the index when a tab closes', async () => {
		const harness = await loadLifecycleHarness();
		const onTabRemoved = vi.fn();
		harness.registerBackgroundLifecycleListeners({ snapshots: harness.snapshots, onTabRemoved });

		harness.onRemoved.emit(7);
		await Promise.resolve();
		await Promise.resolve();

		expect(onTabRemoved).toHaveBeenCalledWith(7);
		expect(harness.snapshots.markTabSnapshots).toHaveBeenCalledWith(7, 'stopped', 'tab-removed');
		expect(harness.snapshots.removeSessionIndex).toHaveBeenCalledWith(7);
	});

	it('forgets the old id of a replaced tab as if it closed', async () => {
		const harness = await loadLifecycleHarness();
		const onTabRemoved = vi.fn();
		const log = vi.fn();
		harness.registerBackgroundLifecycleListeners({ snapshots: harness.snapshots, onTabRemoved, log });

		harness.onReplaced.emit(10, 7);
		await vi.waitFor(() => expect(harness.snapshots.removeSessionIndex).toHaveBeenCalledWith(7));

		expect(onTabRemoved).toHaveBeenCalledExactlyOnceWith(7);
		expect(harness.snapshots.markTabSnapshots).toHaveBeenCalledExactlyOnceWith(7, 'stopped', 'tab-removed');
		expect(log).toHaveBeenCalledWith('tab-replaced', { addedTabId: 10, removedTabId: 7 });
	});
});
