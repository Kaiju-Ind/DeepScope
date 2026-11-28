import { afterEach, describe, expect, it, vi } from 'vitest';

import type { AnalyzeVisibleTabInput, VisibleTabIdentity } from "../../lib/messaging/index.ts";
import { ok } from "../../lib/messaging/result.ts";

const mocks = vi.hoisted(() => ({
	onUpdated: vi.fn(),
	onActivated: vi.fn(),
	getTab: vi.fn(),
	debug: vi.fn(),
	onTabNavigation: vi.fn(),
	getVisibleTabIdentity: vi.fn(),
	analyzeVisibleTab: vi.fn(),
	reconcileAnalysis: vi.fn(async () => undefined),
	resumeAnalysis: vi.fn(),
	resumeMatcher: vi.fn(),
}));

vi.mock('comctx', () => ({ defineProxy: () => [vi.fn(), vi.fn()] }));
vi.mock('wxt/browser', () => ({
	browser: {
		action: {
			onClicked: { addListener: vi.fn() },
			setBadgeText: vi.fn(),
			setBadgeBackgroundColor: vi.fn(),
			setTitle: vi.fn(),
		},
		tabs: {
			onUpdated: { addListener: mocks.onUpdated },
			get: mocks.getTab,
			onActivated: { addListener: mocks.onActivated },
			onRemoved: { addListener: vi.fn() },
			onReplaced: { addListener: vi.fn() },
		},
		runtime: { onMessage: { addListener: vi.fn() }, sendMessage: vi.fn(async () => undefined) },
	},
}));
vi.mock('../../lib/background/reconcile-matcher-jobs.ts', () => ({
	reconcileInterruptedMatcherJobs: vi.fn(async () => []),
}));
// Schedulers pass analysis straight through so these tests observe entrypoint wiring only.
vi.mock('../../lib/scheduler/analysis.ts', () => ({
	create: () => ({
		analyze: (input: AnalyzeVisibleTabInput) => mocks.analyzeVisibleTab(input),
		activateTab: vi.fn(async () => undefined),
		cancelTab: vi.fn(async () => undefined),
		runBackground: vi.fn(async () => undefined),
		reconcile: mocks.reconcileAnalysis,
		resume: mocks.resumeAnalysis,
	}),
}));
vi.mock('../../lib/scheduler/matcher/index.ts', () => ({
	create: () => ({
		activateTab: vi.fn(async () => undefined),
		reconcile: vi.fn(async () => []),
		resume: mocks.resumeMatcher,
	}),
}));
vi.mock('../../lib/registry/runtime.ts', () => ({ createPackagedRuntimeTechnologyRegistryProvider: () => ({}) }));
vi.mock('../../lib/autostart/settings.ts', () => ({ getAutoScanEnabled: async () => true }));
vi.mock('../../lib/background/runtime/index.ts', () => ({
	createBackgroundRuntime: () => ({
		api: { getVisibleTabIdentity: mocks.getVisibleTabIdentity, analyzeVisibleTab: mocks.analyzeVisibleTab },
		onTabNavigation: mocks.onTabNavigation,
		onTabRemoved: vi.fn(),
		resolveScheduledTab: vi.fn(),
		analyzeScheduledTab: vi.fn(),
	}),
}));
vi.mock('../../lib/collectors/extension-page-collector.ts', () => ({ collectExtensionObservationBatch: vi.fn() }));
vi.mock('@deepscope/detection/provider', () => ({ bundledRuntimeTechnologyRegistryProvider: {} }));
vi.mock('../../lib/diagnostics/crash.ts', () => ({ installDiagnosticCrashHooks: vi.fn() }));
vi.mock('../../lib/diagnostics/logging.ts', () => ({
	configure: vi.fn(),
	get: () => ({ debug: mocks.debug, info: vi.fn() }),
}));
vi.mock('../../lib/diagnostics/journal/index.ts', () => ({
	isDiagnosticTransportMessage: vi.fn(),
	persistTransportedDiagnosticMessage: vi.fn(),
}));
vi.mock('../../lib/matcher/offscreen/index.ts', () => ({
	start: vi.fn(),
	capacity: 2,
	cancel: vi.fn(),
	cancelForRecovery: vi.fn(async () => undefined),
	cancelTab: vi.fn(),
	runPartition: vi.fn(),
	touchLifecycle: vi.fn(),
	releaseLifecycle: vi.fn(),
}));
vi.mock('../../lib/persistence/index.ts', () => ({
	browserDetectionPersistence: {},
	browserDetectionSnapshotStore: { markTabSnapshots: vi.fn(async () => []) },
}));

afterEach(() => {
	vi.unstubAllGlobals();
	vi.resetAllMocks();
	mocks.reconcileAnalysis.mockImplementation(async () => undefined);
	vi.resetModules();
});

const firstDocument: VisibleTabIdentity = {
	tabId: 7,
	windowId: 3,
	frameId: 0,
	url: 'https://example.com/first',
	hostname: 'example.com',
	originHash: 'example-origin',
	urlHash: 'first-url',
	incognito: false,
};

describe('background entrypoint navigation wiring', () => {
	it('classifies an activation lookup failure before the tab privacy mode is known', async () => {
		mocks.getTab.mockRejectedValue(new Error('Could not read https://private.example/target'));
		vi.stubGlobal('defineBackground', (setup: () => void) => setup());
		await import('../../entrypoints/background.ts');
		expect(mocks.onActivated).toHaveBeenCalledOnce();
		for (const [activate] of mocks.onActivated.mock.calls) activate({ tabId: 7, windowId: 3 });
		await vi.waitFor(() => expect(mocks.debug).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
			event: 'auto-scan-activation-read-failed', tabId: 7, errorType: 'Error',
		})));
		expect(JSON.stringify(mocks.debug.mock.calls)).not.toContain('private.example');
	});

	it('keeps the completed scan when Chrome reports the replacement URL in the same update', async () => {
		const activeAnalysis = Promise.withResolvers<void>();
		const replacement = { ...firstDocument, url: 'https://example.com/replacement', urlHash: 'replacement-url' };
		mocks.getVisibleTabIdentity
			.mockResolvedValueOnce(ok(firstDocument))
			.mockResolvedValueOnce(ok(replacement));
		mocks.analyzeVisibleTab.mockImplementation(async ({ target }: AnalyzeVisibleTabInput) => {
			if (target === firstDocument) await activeAnalysis.promise;
			return ok({ analysis: { results: [] }, snapshot: { status: 'bypassed' } });
		});
		vi.stubGlobal('defineBackground', (start: () => void) => {
			start();
			return undefined;
		});
		await import('../../entrypoints/background.ts');

		const activeTab = { id: firstDocument.tabId, windowId: firstDocument.windowId, active: true };
		for (const [listener] of mocks.onUpdated.mock.calls) listener(activeTab.id, { status: 'complete' }, activeTab);
		await vi.waitFor(() => expect(mocks.analyzeVisibleTab).toHaveBeenCalledOnce());

		for (const [listener] of mocks.onUpdated.mock.calls) {
			listener(activeTab.id, { url: replacement.url, status: 'complete' }, activeTab);
		}
		expect(mocks.onTabNavigation).toHaveBeenCalledWith(activeTab.id);
		activeAnalysis.resolve();

		await vi.waitFor(() => expect(mocks.analyzeVisibleTab).toHaveBeenCalledTimes(2));
		expect(mocks.analyzeVisibleTab).toHaveBeenLastCalledWith({ target: replacement, mode: 'refresh', observe: 'none' });
	});

	it('resumes both schedulers in degraded mode when startup reconciliation fails', async () => {
		mocks.reconcileAnalysis.mockRejectedValueOnce(new Error('IndexedDB unavailable'));
		vi.stubGlobal('defineBackground', (setup: () => void) => setup());
		await import('../../entrypoints/background.ts');

		await vi.waitFor(() => {
			expect(mocks.resumeMatcher).toHaveBeenCalledOnce();
			expect(mocks.resumeAnalysis).toHaveBeenCalledOnce();
		});
		await vi.waitFor(() => expect(mocks.debug).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
			event: 'scheduler-reconciliation-degraded',
			failures: ['analysis: Error'],
		})));
	});
});
