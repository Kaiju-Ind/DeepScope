import { afterEach, describe, expect, it, vi } from 'vitest';

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
	const markDetectionSessionSnapshotsForTab = vi.fn(async () => []);
	const removeDetectionSessionIndex = vi.fn(async () => undefined);
	vi.doMock('wxt/browser', () => ({
		browser: {
			tabs: {
				onUpdated,
				onRemoved,
			},
		},
	}));
	vi.doMock('@/lib/storage', () => ({
		markDetectionSessionSnapshotsForTab,
		removeDetectionSessionIndex,
	}));

	return {
		...(await import('@/lib/background/lifecycle')),
		onUpdated,
		onRemoved,
		markDetectionSessionSnapshotsForTab,
		removeDetectionSessionIndex,
	};
}

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.doUnmock('@/lib/storage');
	vi.resetModules();
});

describe.sequential('background lifecycle listeners', () => {
	/**
	 * Navigation events can arrive after the service worker has lost all in-memory
	 * observer handles. Stored session indexes let the lightweight listener mark
	 * prior document snapshots stale without loading the detector registry.
	 */
	it('marks indexed tab snapshots stale when a tab starts navigation', async () => {
		const harness = await loadLifecycleHarness();
		const log = vi.fn();
		const onTabNavigation = vi.fn();
		harness.registerBackgroundLifecycleListeners({ onTabNavigation, onTabRemoved: vi.fn(), log });

		harness.onUpdated.emit(7, { status: 'loading' });
		await Promise.resolve();

		expect(onTabNavigation).toHaveBeenCalledWith(7);
		expect(harness.markDetectionSessionSnapshotsForTab).toHaveBeenCalledWith(7, 'stale', 'tab-navigation');
		expect(harness.removeDetectionSessionIndex).not.toHaveBeenCalled();
	});

	it('ignores tab updates that do not replace the document', async () => {
		const harness = await loadLifecycleHarness();
		harness.registerBackgroundLifecycleListeners({ onTabRemoved: vi.fn() });

		harness.onUpdated.emit(7, { status: 'complete' });
		await Promise.resolve();

		expect(harness.markDetectionSessionSnapshotsForTab).not.toHaveBeenCalled();
	});

	/**
	 * Closed tabs should drop both volatile maps and the durable tab-session index.
	 * Exact snapshot records may remain for storage history, but no future tab with
	 * the same browser id should inherit the old session list.
	 */
	it('marks indexed tab snapshots stopped and removes the index when a tab closes', async () => {
		const harness = await loadLifecycleHarness();
		const onTabRemoved = vi.fn();
		harness.registerBackgroundLifecycleListeners({ onTabRemoved });

		harness.onRemoved.emit(7);
		await Promise.resolve();
		await Promise.resolve();

		expect(onTabRemoved).toHaveBeenCalledWith(7);
		expect(harness.markDetectionSessionSnapshotsForTab).toHaveBeenCalledWith(7, 'stopped', 'tab-removed');
		expect(harness.removeDetectionSessionIndex).toHaveBeenCalledWith(7);
	});
});
