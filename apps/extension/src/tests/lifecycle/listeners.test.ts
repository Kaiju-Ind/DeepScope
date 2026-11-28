/**
 * Characterisation of the background entrypoint's listener wiring.
 *
 * MV3 only delivers an event that woke the service worker to listeners added
 * on the first turn of the background main, so every `addListener` must run
 * synchronously inside `defineBackground`. The browser mock records every
 * listener added anywhere under `browser`, so a new listener is covered without
 * editing this file. The second suite pins that a replaced tab and a closed tab
 * release the same in-memory state.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
	/** Every listener added, keyed by its event path (for example `tabs.onRemoved`). */
	const listeners = new Map<string, Array<(...args: unknown[]) => unknown>>();
	/** Ordered record of cleanup calls made by tab listeners. */
	const cleanup: string[] = [];
	/** Any property is a callable namespace; `addListener` records, calls resolve to undefined. */
	const node = (path: string): unknown => new Proxy(function () {}, {
		get(_target, key) {
			if (key === 'then') return undefined;
			if (key === 'addListener') {
				return (listener: (...args: unknown[]) => unknown) => {
					listeners.set(path, [...(listeners.get(path) ?? []), listener]);
				};
			}
			return node(path ? `${path}.${String(key)}` : String(key));
		},
		apply: () => Promise.resolve(undefined),
	});
	const record = (name: string) => (...args: unknown[]) => {
		cleanup.push(`${name}(${args.join(',')})`);
	};
	return { listeners, cleanup, browser: node(''), record };
});

vi.mock('wxt/browser', () => ({ browser: mocks.browser }));
vi.mock('comctx', () => ({ defineProxy: () => [vi.fn(), vi.fn()] }));
vi.mock('../../lib/background/reconcile-matcher-jobs.ts', () => ({ reconcileInterruptedMatcherJobs: vi.fn(async () => []) }));
vi.mock('../../lib/scheduler/analysis.ts', () => ({
	create: () => ({
		analyze: vi.fn(async () => ({ ok: true, value: {} })),
		activateTab: vi.fn(async () => undefined),
		cancelTab: vi.fn(async (tabId: number) => mocks.record('analysis.cancelTab')(tabId)),
		runBackground: vi.fn(async () => undefined),
		reconcile: vi.fn(async () => undefined),
		resume: vi.fn(),
	}),
}));
vi.mock('../../lib/scheduler/matcher/index.ts', () => ({
	create: () => ({ activateTab: vi.fn(async () => undefined), reconcile: vi.fn(async () => []), resume: vi.fn() }),
}));
vi.mock('../../lib/autostart/controller.ts', () => ({
	createAutoScanController: () => ({
		onTabNavigation: mocks.record('autoscan.onTabNavigation'),
		onTabRemoved: mocks.record('autoscan.onTabRemoved'),
		scanVisibleTab: vi.fn(async () => undefined),
	}),
}));
vi.mock('../../lib/background/badge.ts', () => ({
	badgeText: () => '',
	createBadgeWriter: () => ({ set: vi.fn(async () => undefined), clear: vi.fn(async () => undefined), forget: mocks.record('badges.forget') }),
}));
vi.mock('../../lib/registry/runtime.ts', () => ({ createPackagedRuntimeTechnologyRegistryProvider: () => ({}) }));
vi.mock('../../lib/autostart/settings.ts', () => ({ getAutoScanEnabled: async () => true }));
vi.mock('../../lib/background/runtime/index.ts', () => ({
	createBackgroundRuntime: () => ({
		api: { getVisibleTabIdentity: vi.fn(), analyzeVisibleTab: vi.fn() },
		onTabNavigation: mocks.record('runtime.onTabNavigation'),
		onTabRemoved: mocks.record('runtime.onTabRemoved'),
		resolveScheduledTab: vi.fn(),
		analyzeScheduledTab: vi.fn(),
		handleRuntimeMessage: vi.fn(),
	}),
}));
vi.mock('../../lib/collectors/extension-page-collector.ts', () => ({ collectExtensionObservationBatch: vi.fn() }));
vi.mock('../../lib/diagnostics/crash.ts', () => ({ installDiagnosticCrashHooks: vi.fn() }));
vi.mock('../../lib/diagnostics/logging.ts', () => ({ configure: vi.fn(), get: () => ({ debug: vi.fn(), info: vi.fn() }) }));
vi.mock('../../lib/diagnostics/journal/index.ts', () => ({ isDiagnosticTransportMessage: vi.fn(), persistTransportedDiagnosticMessage: vi.fn() }));
vi.mock('../../lib/matcher/workers/local.ts', () => ({ canRunWorkersLocally: () => false }));
vi.mock('../../lib/matcher/offscreen/index.ts', () => ({
	start: vi.fn(), capacity: 2, cancel: vi.fn(), cancelForRecovery: vi.fn(async () => undefined), cancelTab: vi.fn(),
	runPartition: vi.fn(), touchLifecycle: vi.fn(), releaseLifecycle: vi.fn(),
}));
vi.mock('../../lib/persistence/index.ts', () => ({
	browserDetectionPersistence: {},
	browserDetectionSnapshotStore: {
		markTabSnapshots: vi.fn(async (tabId: number, status: string) => {
			mocks.record('snapshots.mark')(tabId, status);
			return [];
		}),
		removeSessionIndex: vi.fn(async (tabId: number) => mocks.record('snapshots.removeSessionIndex')(tabId)),
	},
}));

/** Run the background main and report which listeners existed when it returned. */
async function start(): Promise<string[]> {
	let registeredOnFirstTick: string[] = [];
	vi.stubGlobal('defineBackground', (main: () => void) => {
		main();
		registeredOnFirstTick = [...mocks.listeners.keys()].sort();
	});
	await import('../../entrypoints/background.ts');
	return registeredOnFirstTick;
}

afterEach(() => {
	mocks.listeners.clear();
	mocks.cleanup.length = 0;
	vi.unstubAllGlobals();
	vi.resetModules();
});

describe('background listener registration', () => {
	it('adds every listener synchronously on the first tick of the background main', async () => {
		const firstTick = await start();
		await new Promise((resolve) => setTimeout(resolve, 20));

		expect(firstTick).toEqual([...mocks.listeners.keys()].sort());
		expect(firstTick).toEqual([
			'action.onClicked',
			'runtime.onMessage',
			'tabs.onActivated',
			'tabs.onRemoved',
			'tabs.onReplaced',
			'tabs.onUpdated',
		]);
	});
});

describe('replaced and removed tab cleanup', () => {
	/** Fire one event and return the cleanup calls it made, after async work settles. */
	async function fire(path: string, ...args: unknown[]): Promise<string[]> {
		mocks.cleanup.length = 0;
		for (const listener of mocks.listeners.get(path) ?? []) listener(...args);
		await new Promise((resolve) => setTimeout(resolve, 0));
		return [...mocks.cleanup];
	}

	it('releases the same in-memory tab state, in the same order', async () => {
		await start();
		const removed = await fire('tabs.onRemoved', 9);
		const replaced = await fire('tabs.onReplaced', 10, 9);

		const memory = (calls: string[]) => calls.filter((call) => !call.startsWith('snapshots.'));
		expect(memory(removed)).toEqual([
			'badges.forget(9)',
			'autoscan.onTabRemoved(9)',
			'runtime.onTabRemoved(9)',
			'analysis.cancelTab(9)',
		]);
		expect(memory(replaced)).toEqual(memory(removed));
	});

	// Decision: a replaced tab id is forgotten exactly like a closed tab. No event
	// ever names the old id again, so stored sessions left under it would only
	// leak (the stress harness counts them as closed-tab leftovers).
	it('marks stored snapshots stopped and drops the index for a removed or replaced tab', async () => {
		await start();
		const stored = (calls: string[]) => calls.filter((call) => call.startsWith('snapshots.'));
		expect(stored(await fire('tabs.onRemoved', 9))).toEqual(['snapshots.mark(9,stopped)', 'snapshots.removeSessionIndex(9)']);
		expect(stored(await fire('tabs.onReplaced', 10, 9))).toEqual(['snapshots.mark(9,stopped)', 'snapshots.removeSessionIndex(9)']);
	});

	it('runs navigation cleanup before the snapshot is marked stale', async () => {
		await start();
		expect(await fire('tabs.onUpdated', 9, { status: 'loading' }, { active: false, windowId: 1 })).toEqual([
			'autoscan.onTabNavigation(9)',
			'runtime.onTabNavigation(9)',
			'analysis.cancelTab(9)',
			'snapshots.mark(9,stale)',
		]);
	});
});
