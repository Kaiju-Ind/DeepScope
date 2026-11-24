/**
 * Characterisation of the four panel reset paths in `src/app/provider.tsx`.
 *
 * The provider clears page-owned state in four places: a tab switch
 * (`resetTab`), an unavailable tab (`resetUnavailableTab`), a stored-snapshot
 * miss (`showStoredAnalysis`) and the clear-data command (`clearStoredData`).
 * Each clears a different subset. These tests pin exactly which fields each
 * path clears and which it keeps, so the later split of the provider can merge
 * the blocks without changing what the panel shows.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createRoot } from 'solid-js';
import type { AnalyzeVisibleTabOutput, VisibleTabIdentity } from '@/lib/messaging';
import { usePanel, type PanelContextType } from '@/app/context';
import { PanelProvider } from '@/app/provider';
import { makeAnalysis, makeDetection, makeDetectionReplayTrace } from '../support/factories';

const calls = vi.hoisted(() => ({
	log: vi.fn(), identity: vi.fn(), analyze: vi.fn(), history: vi.fn(), stop: vi.fn(), stored: vi.fn(),
	subscribe: vi.fn(), listen: vi.fn(), clear: vi.fn(), target: vi.fn(),
}));
vi.mock('comctx', () => ({ defineProxy: () => [undefined, () => ({
	getVisibleTabIdentity: calls.identity, analyzeVisibleTab: calls.analyze, getReplayTraceHistory: calls.history,
	getAnalysisStatus: async () => ({ ok: true, value: { trackedOrigins: 0, totalAnalyses: 0 } }),
	stopObservationSession: calls.stop, getObservationSessionState: vi.fn(),
})] }));
vi.mock('@/lib/diagnostics/logging', () => ({ get: () => ({ debug: calls.log }) }));
vi.mock('@/lib/messaging', () => ({ BACKGROUND_RPC_NAMESPACE: 'test', createBackgroundClientAdapter: () => ({}) }));
vi.mock('@/app/tab', () => ({
	getWindowId: async () => 1, getTabTarget: calls.target, subscribeTabTargetChanges: calls.listen,
}));
vi.mock('@/lib/autostart/settings', () => ({ DEFAULT_AUTO_SCAN_ENABLED: false, getAutoScanEnabled: async () => false }));
vi.mock('@/app/snapshot', () => ({ getStoredAnalysis: calls.stored, subscribeToSnapshotRevisions: calls.subscribe }));
vi.mock('@/lib/persistence', () => ({ browserDetectionPersistence: { clearStoredData: calls.clear } }));

function identity(tabId: number, url = `https://example.invalid/page-${tabId}`): VisibleTabIdentity {
	return { tabId, windowId: 1, frameId: 0, incognito: false, url, urlHash: url, originHash: 'origin', hostname: new URL(url).hostname };
}

/** A completed analysis with one result, so every cleared field starts non-empty. */
function command(target: VisibleTabIdentity): AnalyzeVisibleTabOutput {
	const analysis = makeAnalysis([makeDetection('react')], { url: target.url, hostname: target.hostname, analyzedAt: 100 });
	const replayTrace = makeDetectionReplayTrace({ resultCount: 1, analyzedAt: 100, target: { url: target.url, hostname: target.hostname } });
	return { analysis, snapshot: { status: 'miss', key: 'test' }, replayTrace, replayHistory: [replayTrace] };
}

type TabListener = { sync: (target: { tabId: number; windowId: number }) => void };
let dispose: (() => void) | undefined;

/** Mount the real provider with only browser and RPC edges replaced, and wait for the first result. */
async function mount(first: VisibleTabIdentity) {
	let current = first;
	let listener!: TabListener;
	let panel!: PanelContextType;
	calls.listen.mockImplementation((value: TabListener) => { listener = value; return () => {}; });
	calls.target.mockImplementation(async () => ({ tabId: current.tabId, windowId: current.windowId }));
	calls.subscribe.mockReturnValue(() => {});
	calls.stored.mockResolvedValue(null);
	calls.history.mockResolvedValue({ ok: true, value: [] });
	calls.identity.mockImplementation(async () => ({ ok: true, value: current }));
	calls.analyze.mockImplementation(async () => ({ ok: true, value: command(current) }));
	createRoot((cleanup) => {
		dispose = cleanup;
		PanelProvider({ get children() {
			panel = usePanel();
			return null;
		} });
	});
	await vi.waitFor(() => expect(panel.analysis()?.url).toBe(first.url));
	expect(panel.latestReplaySummary()).not.toBeNull();
	expect(panel.replayHistory()).not.toEqual([]);
	return {
		panel,
		switchTo(next: VisibleTabIdentity) {
			current = next;
			listener.sync({ tabId: next.tabId, windowId: next.windowId });
		},
	};
}

/** Page-owned fields every reset path clears. */
function expectDocumentStateCleared(panel: PanelContextType): void {
	expect(panel.analysis()).toBeNull();
	expect(panel.lateAddedIds()).toEqual([]);
	expect(panel.explanationsByTechnologyId()).toEqual({});
	expect(panel.replayHistory()).toEqual([]);
	expect(panel.latestReplaySummary()).toBeNull();
	expect(panel.evidenceState()).toBeNull();
}

afterEach(() => { dispose?.(); dispose = undefined; vi.resetAllMocks(); });

describe('panel reset paths', () => {
	it('tab switch clears document state, notices and errors, and targets the new tab', async () => {
		const app = await mount(identity(7));
		const next = identity(8);
		const pending = Promise.withResolvers<{ ok: true; value: AnalyzeVisibleTabOutput }>();
		calls.analyze.mockReturnValue(pending.promise);
		app.switchTo(next);
		await vi.waitFor(() => expect(app.panel.visibleTabIdentity()).toEqual(next));

		expectDocumentStateCleared(app.panel);
		expect(app.panel.notice()).toBeNull();
		expect(app.panel.errorMessage()).toBe('');
		expect(app.panel.liveUpdateMode()).toBe('unknown');
		expect(app.panel.matcherStatus()).toBe('idle');
		const reset = calls.log.mock.calls.map((call) => call[1]).find((event) => event?.event === 'visible-state-reset' && event.nextUrl === next.url);
		expect(reset).toMatchObject({ previousUrl: 'https://example.invalid/page-7', previousResultCount: 1, sameVisibleIdentity: false });
		pending.resolve({ ok: true, value: command(next) });
	});

	it('stored-snapshot miss after a switch clears document state and records that nothing was preserved', async () => {
		const app = await mount(identity(7));
		const next = identity(8);
		calls.analyze.mockReturnValue(new Promise(() => {}));
		app.switchTo(next);
		await vi.waitFor(() => expect(calls.stored).toHaveBeenCalledWith(next, expect.anything()));
		await vi.waitFor(() => expect(calls.log.mock.calls.map((call) => call[1]?.event)).toContain('stored-analysis-miss'));

		expectDocumentStateCleared(app.panel);
		const miss = calls.log.mock.calls.map((call) => call[1]).find((event) => event?.event === 'stored-analysis-miss');
		expect(miss).toMatchObject({ preservingCurrentTabAnalysis: false, previousResultCount: 0, hostname: next.hostname });
	});

	it('unavailable tab clears document state and the visible identity and shows the failure', async () => {
		const app = await mount(identity(7));
		calls.identity.mockResolvedValue({ ok: false, error: { code: 'UNSUPPORTED_URL', message: 'This page cannot be inspected.' } });
		app.switchTo(identity(8));
		await vi.waitFor(() => expect(app.panel.visibleTabIdentity()).toBeNull());

		expectDocumentStateCleared(app.panel);
		expect(app.panel.notice()).toBeNull();
		expect(app.panel.errorMessage()).toContain('This page cannot be inspected.');
		expect(app.panel.liveUpdateMode()).toBe('unknown');
		expect(app.panel.matcherStatus()).toBe('idle');
		expect(app.panel.busy()).toBe(false);
	});

	it('clear-data clears document state but keeps the visible tab, matcher status and live-update mode', async () => {
		const first = identity(7);
		const app = await mount(first);
		const matcherStatus = app.panel.matcherStatus();
		const liveUpdateMode = app.panel.liveUpdateMode();
		calls.clear.mockResolvedValue(3);
		await app.panel.clearStoredData();

		expectDocumentStateCleared(app.panel);
		expect(app.panel.visibleTabIdentity()).toEqual(first);
		expect(app.panel.matcherStatus()).toBe(matcherStatus);
		expect(app.panel.liveUpdateMode()).toBe(liveUpdateMode);
		expect(app.panel.errorMessage()).toBe('');
		expect(app.panel.notice()).toEqual({ variant: 'success', text: 'Cleared 3 stored detector records.' });
		expect(app.panel.clearStoredDataInFlight()).toBe(false);
	});
});
