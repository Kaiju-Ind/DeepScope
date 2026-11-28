import { afterEach, describe, expect, it, vi } from 'vitest';
import { setImmediate } from 'node:timers/promises';
import { createRoot } from 'solid-js';
import type { AnalyzeVisibleTabOutput, VisibleTabIdentity } from "../../lib/messaging/index.ts";
import { usePanel, type PanelContextType } from "../../app/panel/context.ts";
import { PanelProvider } from "../../app/panel/provider.tsx";
import { createRetainedHistory } from "../../app/history.ts";
import { makeAnalysis, makeDetectionReplayTrace } from "@deepscope/detection/testing/fixtures";

const calls = vi.hoisted(() => ({
	log: vi.fn(), identity: vi.fn(), analyze: vi.fn(), history: vi.fn(), stop: vi.fn(), observation: vi.fn(), stored: vi.fn(),
	subscribe: vi.fn(), unsubscribe: vi.fn(), listen: vi.fn(),
}));
vi.mock('comctx', () => ({ defineProxy: () => [undefined, () => ({
	getVisibleTabIdentity: calls.identity, analyzeVisibleTab: calls.analyze, getReplayTraceHistory: calls.history,
	getAnalysisStatus: async () => ({ ok: true, value: { trackedOrigins: 0, totalAnalyses: 0 } }),
	stopObservationSession: calls.stop, getObservationSessionState: calls.observation,
})] }));
vi.mock('../../lib/diagnostics/logging.ts', () => ({ get: () => ({ debug: calls.log }) }));
vi.mock('../../lib/messaging/index.ts', () => ({ BACKGROUND_RPC_NAMESPACE: 'test', createBackgroundClientAdapter: () => ({}) }));
vi.mock("../../app/browser/tabs.ts", () => ({
	getWindowId: async () => 1, getTabTarget: async () => ({ tabId: 7, windowId: 1 }),
	subscribeTabTargetChanges: calls.listen,
}));
vi.mock('../../lib/autostart/settings.ts', () => ({ DEFAULT_AUTO_SCAN_ENABLED: false, getAutoScanEnabled: async () => false }));
vi.mock("../../app/browser/stored.ts", () => ({
	getStoredAnalysis: calls.stored, subscribeToSnapshotRevisions: calls.subscribe,
}));
vi.mock('../../lib/persistence/index.ts', () => ({ browserDetectionPersistence: {} }));

function identity(tabId: number, incognito: boolean, url = 'https://example.invalid/page'): VisibleTabIdentity {
	return { tabId, windowId: 1, frameId: 0, incognito, url, urlHash: url, originHash: 'origin', hostname: new URL(url).hostname };
}

function command(target: VisibleTabIdentity): AnalyzeVisibleTabOutput {
	const analysis = makeAnalysis([], { url: target.url, hostname: target.hostname, analyzedAt: 100 });
	const replayTrace = makeDetectionReplayTrace({ resultCount: 0, analyzedAt: 100, target: { url: target.url, hostname: target.hostname } });
	return { analysis, snapshot: { status: 'miss', key: 'test' }, replayTrace, replayHistory: [] };
}

type TabListener = { sync: (target: { tabId: number; windowId: number }) => void };
let dispose: (() => void) | undefined;

/** Mount the real provider and History resource with only browser and RPC edges replaced. */
function mount(first: VisibleTabIdentity) {
	let current = first;
	let listener!: TabListener;
	let panel!: PanelContextType;
	let history!: ReturnType<typeof createRetainedHistory>;
	calls.listen.mockImplementation((value: TabListener) => { listener = value; return () => {}; });
	calls.subscribe.mockReturnValue(calls.unsubscribe);
	calls.identity.mockImplementation(async () => ({ ok: true, value: current }));
	calls.stop.mockResolvedValue({ ok: true, value: { status: 'stopped' } });
	createRoot((cleanup) => {
		dispose = cleanup;
		PanelProvider({ get children() {
			panel = usePanel();
			history = createRetainedHistory(panel);
			return null;
		} });
	});
	return { panel, history, switchTo(next: VisibleTabIdentity) {
		current = next;
		listener.sync({ tabId: next.tabId, windowId: next.windowId });
	} };
}

afterEach(() => { dispose?.(); dispose = undefined; vi.resetAllMocks(); });

describe('private panel storage access', () => {
	it('hides ordinary history when a private tab opens the same URL, including a pending refetch', async () => {
		const ordinary = identity(7, false);
		const privateTab = identity(8, true);
		const trace = makeDetectionReplayTrace();
		const pending = Promise.withResolvers<{ ok: true; value: typeof trace[] }>();
		calls.history.mockResolvedValueOnce({ ok: true, value: [trace] }).mockReturnValueOnce(pending.promise);
		calls.analyze.mockResolvedValue({ ok: true, value: { ...command(ordinary), replayHistory: [command(ordinary).replayTrace!] } });
		const app = mount(ordinary);
		await vi.waitFor(() => expect(app.history.runs()).toEqual([trace]));
		const refetch = app.history.refetch();
		await vi.waitFor(() => expect(calls.history).toHaveBeenCalledTimes(2));
		app.switchTo(privateTab);
		await vi.waitFor(() => expect(app.panel.visibleTabIdentity()).toEqual(privateTab));
		expect(app.history.runs() ?? []).toEqual([]);
		expect(calls.unsubscribe).toHaveBeenCalledTimes(1);
		expect(calls.subscribe).toHaveBeenCalledTimes(1);
		const reset = calls.log.mock.calls.map(call => call[1]).filter(event => event.event === 'visible-state-reset').at(-1);
		expect(reset).not.toHaveProperty('nextUrl');
		expect(reset.previousUrl).toBe(ordinary.url);
		pending.resolve({ ok: true, value: [trace] });
		await refetch;
		expect(app.history.runs() ?? []).toEqual([]);
		await expect(app.panel.getReplayHistory(privateTab)).resolves.toEqual([]);
		expect(calls.history).toHaveBeenCalledTimes(2);
	});

	it('drops an ordinary history error when the same tab identity becomes private', async () => {
		const ordinary = identity(7, false);
		const privateTab = { ...ordinary, incognito: true };
		calls.history.mockRejectedValue(new Error('retained history unavailable'));
		calls.analyze.mockResolvedValue({ ok: true, value: { ...command(ordinary), replayHistory: [command(ordinary).replayTrace!] } });
		const app = mount(ordinary);
		await vi.waitFor(() => expect(() => app.history.runs()).toThrow('retained history unavailable'));
		app.switchTo(privateTab);
		await vi.waitFor(() => expect(app.panel.visibleTabIdentity()).toEqual(privateTab));
		expect(app.history.runs()).toBeUndefined();
		expect(app.history.loading()).toBe(false);
		expect(calls.history).toHaveBeenCalledTimes(1);
	});

	it('keeps a private in-memory result without subscribing to storage or journaling the target URL', async () => {
		const target = identity(7, true, 'https://private.invalid/personal?view=marker');
		calls.analyze.mockResolvedValue({ ok: true, value: command(target) });
		const app = mount(target);
		await vi.waitFor(() => expect(app.panel.analysis()?.url).toBe(target.url));
		expect(app.panel.latestReplaySummary()?.analyzedAt).toBe(100);
		expect(calls.history).not.toHaveBeenCalled();
		expect(calls.subscribe).not.toHaveBeenCalled();
		const ordinary = identity(8, false, 'https://ordinary.invalid/catalog');
		calls.history.mockResolvedValue({ ok: true, value: [] });
		app.switchTo(ordinary);
		await vi.waitFor(() => expect(app.panel.visibleTabIdentity()).toEqual(ordinary));
		const resets = calls.log.mock.calls.map(c => c[1]).filter(e => e.event === 'visible-state-reset');
		expect(resets[0]).not.toHaveProperty('nextUrl');
		expect(resets[1]).not.toHaveProperty('previousUrl');
		expect(resets[1].nextUrl).toBe(ordinary.url);
		expect(JSON.stringify(calls.log.mock.calls)).not.toContain(target.hostname);
	});

	it('drops page addresses from a stale private command reply and releases its observation target', async () => {
		const target = identity(7, true, 'https://private.invalid/personal?view=marker');
		const pending = Promise.withResolvers<{ ok: true; value: AnalyzeVisibleTabOutput }>();
		calls.analyze.mockReturnValue(pending.promise);
		calls.history.mockResolvedValue({ ok: true, value: [] });
		const app = mount(target);
		await vi.waitFor(() => expect(calls.analyze).toHaveBeenCalledTimes(1));
		const ordinary = identity(8, false);
		app.switchTo(ordinary);
		await vi.waitFor(() => expect(app.panel.visibleTabIdentity()).toEqual(ordinary));
		const session = { sessionId: 'private-session', tabId: 7, expectedUrl: target.url, incognito: true };
		pending.resolve({ ok: true, value: { ...command(target), sessionTarget: session } });
		await vi.waitFor(() => expect(calls.stop).toHaveBeenCalledWith(session));
		const stale = calls.log.mock.calls.map(c => c[1]).find(e => e.event === 'analysis-response-ignored-for-stale-tab');
		expect(stale).toBeDefined();
		expect(stale).not.toHaveProperty('expectedUrl');
		expect(stale).not.toHaveProperty('responseUrl');
		expect(app.panel.analysis()).toBeNull();
	});
	it('omits private URLs while another visible-tab lookup is pending', async () => {
		const privateTab = identity(7, true, 'https://private.invalid/notes');
		const analysis = Promise.withResolvers<{ ok: true; value: AnalyzeVisibleTabOutput }>();
		const lookup = Promise.withResolvers<{ ok: true; value: VisibleTabIdentity }>();
		calls.analyze.mockReturnValue(analysis.promise);
		calls.history.mockResolvedValue({ ok: true, value: [] });
		const app = mount(privateTab);
		await vi.waitFor(() => expect(calls.analyze).toHaveBeenCalledTimes(1));
		const ordinary = identity(8, false);
		calls.identity.mockReturnValueOnce(lookup.promise);
		app.switchTo(ordinary);
		await vi.waitFor(() => expect(calls.identity).toHaveBeenCalledTimes(2));
		app.switchTo(ordinary);
		analysis.resolve({ ok: true, value: command(privateTab) });
		await vi.waitFor(() => {
			const pending = calls.log.mock.calls.map(call => call[1]).find(event => event.event === 'analysis-response-ignored-for-pending-tab-sync');
			expect(pending).toBeDefined();
			expect(pending).not.toHaveProperty('expectedUrl');
			expect(pending).not.toHaveProperty('responseUrl');
		});
		lookup.resolve({ ok: true, value: ordinary });
		await vi.waitFor(() => expect(app.panel.visibleTabIdentity()).toEqual(ordinary));
	});

});

/** A target mismatch includes both page addresses in the collector's RPC error message. */
function targetFailure(target: VisibleTabIdentity) {
	return { ok: false as const, failure: {
		code: 'VALIDATION_ERROR' as const,
		message: `Collected observations do not match the visible tab URL. Expected ${target.url}, got https://redirect.invalid/notes.`,
	} };
}

describe('panel command failure ownership', () => {
	it.each(['returned', 'thrown'] as const)('keeps a %s private analysis error in the current UI only', async (kind) => {
		const target = identity(7, true, 'https://private.invalid/records');
		const failure = targetFailure(target);
		if (kind === 'returned') calls.analyze.mockResolvedValue(failure);
		else calls.analyze.mockRejectedValue(new Error(failure.failure.message));
		const app = mount(target);
		await vi.waitFor(() => expect(app.panel.errorMessage()).toContain(failure.failure.message));
		expect(app.panel.matcherStatus()).toBe('idle');
		const event = kind === 'returned' ? 'analysis-failed' : 'analysis-request-threw';
		const record = calls.log.mock.calls.map(call => call[1]).find(record => record.event === event);
		expect(record).toMatchObject(kind === 'returned' ? { code: failure.failure.code } : { errorType: 'Error' });
		expect(record).not.toHaveProperty('message');
		expect(JSON.stringify(calls.log.mock.calls)).not.toContain(target.url);
		expect(JSON.stringify(calls.log.mock.calls)).not.toContain('redirect.invalid');
	});

	it.each(['returned', 'thrown'] as const)('preserves replacement matcher progress after a %s error from the previous request', async (kind) => {
		const first = identity(7, true, 'https://private.invalid/records');
		const next = identity(8, false);
		const old = Promise.withResolvers<ReturnType<typeof targetFailure>>();
		calls.analyze.mockReturnValue(old.promise);
		calls.history.mockResolvedValue({ ok: true, value: [] });
		const analysis = command(next).analysis;
		calls.stored.mockImplementation(async (target: VisibleTabIdentity) => target.tabId === next.tabId ? {
			source: 'origin-snapshot', analysis, revision: {
				source: 'snapshot', analysis, snapshot: { status: 'hit', key: 'replacement' }, enrichment: { status: 'pending' },
			},
		} : null);
		const app = mount(first);
		await vi.waitFor(() => expect(calls.analyze).toHaveBeenCalledTimes(1));
		app.switchTo(next);
		await vi.waitFor(() => expect(app.panel.matcherStatus()).toBe('matching'));
		const failure = targetFailure(first);
		if (kind === 'returned') old.resolve(failure);
		else old.reject(new Error(failure.failure.message));
		await vi.waitFor(() => expect(app.panel.busy()).toBe(false));
		expect(app.panel.matcherStatus()).toBe('matching');
		expect(app.panel.errorMessage()).toBe('');
		expect(app.panel.analysis()?.url).toBe(next.url);
	});

	it.each(['returned', 'thrown'] as const)('omits private messages from a %s observation release error', async (kind) => {
		const target = identity(7, true, 'https://private.invalid/records');
		const session = { sessionId: 'private-session', tabId: 7, expectedUrl: target.url, incognito: true };
		const failure = targetFailure(target);
		calls.analyze.mockResolvedValue({ ok: true, value: { ...command(target), sessionTarget: session } });
		calls.observation.mockResolvedValue(failure);
		const app = mount(target);
		await vi.waitFor(() => expect(calls.observation).toHaveBeenCalledWith(session));
		if (kind === 'returned') calls.stop.mockResolvedValue(failure);
		else calls.stop.mockRejectedValue(new Error(failure.failure.message));
		calls.history.mockResolvedValue({ ok: true, value: [] });
		app.switchTo(identity(8, false));
		const event = kind === 'returned' ? 'observation-release-failed' : 'observation-release-threw';
		await vi.waitFor(() => {
			const record = calls.log.mock.calls.map(call => call[1]).find(record => record.event === event);
			expect(record).toMatchObject(kind === 'returned' ? { code: failure.failure.code } : { errorType: 'Error' });
			expect(record).not.toHaveProperty('message');
		});
		expect(JSON.stringify(calls.log.mock.calls)).not.toContain('redirect.invalid');
	});

	it('keeps the error message available in ordinary analysis diagnostics', async () => {
		const ordinary = identity(7, false);
		const failure = targetFailure(ordinary);
		calls.history.mockResolvedValue({ ok: true, value: [] });
		calls.analyze.mockResolvedValue(failure);
		const app = mount(ordinary);
		await vi.waitFor(() => expect(app.panel.errorMessage()).toContain(failure.failure.message));
		expect(calls.log.mock.calls.map(call => call[1])).toContainEqual(expect.objectContaining({
			event: 'analysis-failed', code: failure.failure.code, message: failure.failure.message,
		}));
	});
});

describe('stopping a panel observation', () => {
	it.each(['success', 'failure', 'throw'] as const)('preserves a replacement tab when an earlier stop returns %s', async (result) => {
		const first = identity(7, false);
		const second = identity(8, false);
		const firstSession = { sessionId: 'first-session', tabId: 7, expectedUrl: first.url };
		const nextSession = { sessionId: 'next-session', tabId: 8, expectedUrl: second.url };
		const observing = { status: 'observing' as const, throttleMs: 100, pendingMutationCount: 0 };
		calls.analyze.mockImplementation(async ({ target }: { target: VisibleTabIdentity }) => ({
			ok: true, value: { ...command(target), sessionTarget: target.tabId === 7 ? firstSession : nextSession, session: observing },
		}));
		calls.history.mockResolvedValue({ ok: true, value: [] });
		const app = mount(first);
		await vi.waitFor(() => expect(app.panel.analysis()?.url).toBe(first.url));
		const oldStop = Promise.withResolvers<unknown>();
		calls.stop.mockReturnValueOnce(oldStop.promise);
		const stopped = app.panel.stopObservation();
		app.switchTo(second);
		await vi.waitFor(() => expect(app.panel.visibleTabIdentity()).toEqual(second));
		await app.panel.refresh();
		expect(app.panel.liveUpdateMode()).toBe('active');
		const notice = app.panel.notice();
		const error = app.panel.errorMessage();
		if (result === 'throw') oldStop.reject(new Error('Old stop transport failure'));
		else oldStop.resolve(result === 'success' ? { ok: true, value: { status: 'stopped' } } : {
			ok: false, failure: { code: 'VALIDATION_ERROR', message: 'Old stop rejected' },
		});
		await stopped;
		expect(app.panel.liveUpdateMode()).toBe('active');
		expect(app.panel.notice()).toEqual(notice);
		expect(app.panel.errorMessage()).toBe(error);
		await app.panel.stopObservation();
		expect(calls.stop).toHaveBeenLastCalledWith(nextSession);
		expect(app.panel.liveUpdateMode()).toBe('stopped');
	});
});

describe('private Stop errors', () => {
	it.each(['returned', 'thrown'] as const)('shows a %s Stop error to its private owner without journaling the addresses', async (kind) => {
		const target = identity(7, true, 'https://private.invalid/records');
		const session = { sessionId: 'private-session', tabId: 7, expectedUrl: target.url, incognito: true };
		const failure = targetFailure(target);
		calls.analyze.mockResolvedValue({ ok: true, value: { ...command(target), sessionTarget: session } });
		calls.observation.mockResolvedValue({ ok: true, value: { status: 'observing', throttleMs: 100, pendingMutationCount: 0 } });
		const app = mount(target);
		await vi.waitFor(() => expect(app.panel.liveUpdateMode()).toBe('active'));
		if (kind === 'returned') calls.stop.mockResolvedValueOnce(failure);
		else calls.stop.mockRejectedValueOnce(new Error(failure.failure.message));
		await app.panel.stopObservation();
		expect(app.panel.errorMessage()).toContain(failure.failure.message);
		expect(app.panel.liveUpdateMode()).toBe('active');
		if (kind === 'returned') {
			const record = calls.log.mock.calls.map(call => call[1]).find(record => record.event === 'observation-stop-failed');
			expect(record).toMatchObject({ code: failure.failure.code });
			expect(record).not.toHaveProperty('message');
		}
		expect(JSON.stringify(calls.log.mock.calls)).not.toContain('redirect.invalid');
	});
});

describe('panel reply ownership while a target is changing', () => {
	it.each(['stopped', 'returned', 'thrown'] as const)(
		'keeps a refreshed session active when the previous session state is %s', async (outcome) => {
			const tab = identity(7, false);
			const first = { tabId: tab.tabId, sessionId: 'first-session', expectedUrl: tab.url };
			const second = { ...first, sessionId: 'refreshed-session' };
			const observing = { status: 'observing' as const, throttleMs: 100, pendingMutationCount: 0 };
			const oldState = Promise.withResolvers<unknown>();
			calls.history.mockResolvedValue({ ok: true, value: [] });
			calls.observation.mockReturnValueOnce(oldState.promise);
			calls.analyze
				.mockResolvedValueOnce({ ok: true, value: { ...command(tab), sessionTarget: first, session: observing } })
				.mockResolvedValueOnce({ ok: true, value: { ...command(tab), sessionTarget: second, session: observing } });
			const app = mount(tab);
			await vi.waitFor(() => expect(calls.observation).toHaveBeenCalledWith(first));
			await app.panel.refresh();
			expect(app.panel.liveUpdateMode()).toBe('active');

			if (outcome === 'thrown') oldState.reject(new Error('The previous session read failed.'));
			else if (outcome === 'returned') oldState.resolve(targetFailure(tab));
			else oldState.resolve({ ok: true, value: { ...observing, status: 'stopped' } });
			await setImmediate();

			expect(app.panel.liveUpdateMode()).toBe('active');
			expect(app.panel.errorMessage()).toBe('');
			await app.panel.stopObservation();
			expect(calls.stop).toHaveBeenLastCalledWith(second);
		},
	);

	it.each(['success', 'returned', 'thrown'] as const)(
		'ignores an old analysis %s during the first lookup of a replacement tab', async (outcome) => {
			const first = identity(7, false);
			const next = identity(8, false);
			const response = Promise.withResolvers<unknown>();
			const lookup = Promise.withResolvers<{ ok: true; value: VisibleTabIdentity }>();
			const oldSession = { tabId: first.tabId, sessionId: 'outgoing-session', expectedUrl: first.url };
			calls.history.mockResolvedValue({ ok: true, value: [] });
			calls.analyze.mockReturnValueOnce(response.promise);
			const app = mount(first);
			await vi.waitFor(() => expect(calls.analyze).toHaveBeenCalledOnce());
			calls.identity.mockReturnValueOnce(lookup.promise);
			app.switchTo(next);
			await vi.waitFor(() => expect(calls.identity).toHaveBeenCalledTimes(2));
			expect(app.panel.visibleTabIdentity()).toBe(first);

			if (outcome === 'thrown') response.reject(new Error('The outgoing analysis was interrupted.'));
			else if (outcome === 'returned') response.resolve(targetFailure(first));
			else response.resolve({ ok: true, value: { ...command(first), sessionTarget: oldSession } });
			await setImmediate();

			expect(app.panel.analysis()).toBeNull();
			expect(app.panel.errorMessage()).toBe('');
			if (outcome === 'success') expect(calls.stop).toHaveBeenCalledWith(oldSession);
			lookup.resolve({ ok: true, value: next });
			await vi.waitFor(() => expect(app.panel.visibleTabIdentity()).toBe(next));
		},
	);

	it.each(['success', 'returned', 'thrown'] as const)(
		'ignores an old Stop %s during the first lookup of a replacement tab', async (outcome) => {
			const first = identity(7, false);
			const next = identity(8, false);
			const session = { tabId: first.tabId, sessionId: 'outgoing-session', expectedUrl: first.url };
			const observing = { status: 'observing' as const, throttleMs: 100, pendingMutationCount: 0 };
			const response = Promise.withResolvers<unknown>();
			const lookup = Promise.withResolvers<{ ok: true; value: VisibleTabIdentity }>();
			calls.history.mockResolvedValue({ ok: true, value: [] });
			calls.analyze.mockResolvedValueOnce({ ok: true, value: { ...command(first), sessionTarget: session, session: observing } });
			calls.observation.mockResolvedValueOnce({ ok: true, value: observing });
			const app = mount(first);
			await vi.waitFor(() => expect(app.panel.liveUpdateMode()).toBe('active'));
			calls.stop.mockReturnValueOnce(response.promise);
			const stopping = app.panel.stopObservation();
			calls.identity.mockReturnValueOnce(lookup.promise);
			app.switchTo(next);
			await vi.waitFor(() => expect(calls.identity).toHaveBeenCalledTimes(2));
			expect(app.panel.visibleTabIdentity()).toBe(first);

			if (outcome === 'thrown') response.reject(new Error('The outgoing Stop was interrupted.'));
			else if (outcome === 'returned') response.resolve(targetFailure(first));
			else response.resolve({ ok: true, value: { status: 'stopped' } });
			await stopping;

			expect(app.panel.liveUpdateMode()).toBe('active');
			expect(app.panel.notice()).toBeNull();
			expect(app.panel.errorMessage()).toBe('');
			lookup.resolve({ ok: true, value: next });
			await vi.waitFor(() => expect(app.panel.visibleTabIdentity()).toBe(next));
		},
	);

	it('keeps a valid analysis when a same-tab lookup confirms the current page', async () => {
		const tab = identity(7, false);
		const response = Promise.withResolvers<unknown>();
		const lookup = Promise.withResolvers<{ ok: true; value: VisibleTabIdentity }>();
		calls.history.mockResolvedValue({ ok: true, value: [] });
		calls.analyze.mockReturnValueOnce(response.promise);
		const app = mount(tab);
		await vi.waitFor(() => expect(calls.analyze).toHaveBeenCalledOnce());
		calls.identity.mockReturnValueOnce(lookup.promise);
		app.switchTo(tab);
		await vi.waitFor(() => expect(calls.identity).toHaveBeenCalledTimes(2));
		response.resolve({ ok: true, value: command(tab) });
		lookup.resolve({ ok: true, value: { ...tab } });
		await vi.waitFor(() => expect(app.panel.analysis()?.url).toBe(tab.url));
		expect(calls.analyze).toHaveBeenCalledOnce();
	});

	it('releases an analysis for the earlier page when a same-tab lookup resolves a new URL', async () => {
		const tab = identity(7, false);
		const replacement = identity(7, false, 'https://example.invalid/replacement');
		const response = Promise.withResolvers<unknown>();
		const lookup = Promise.withResolvers<{ ok: true; value: VisibleTabIdentity }>();
		const session = { tabId: tab.tabId, sessionId: 'earlier-page-session', expectedUrl: tab.url };
		calls.history.mockResolvedValue({ ok: true, value: [] });
		calls.analyze.mockReturnValueOnce(response.promise);
		const app = mount(tab);
		await vi.waitFor(() => expect(calls.analyze).toHaveBeenCalledOnce());
		calls.identity.mockReturnValueOnce(lookup.promise);
		app.switchTo(replacement);
		await vi.waitFor(() => expect(calls.identity).toHaveBeenCalledTimes(2));
		response.resolve({ ok: true, value: { ...command(tab), sessionTarget: session } });
		await setImmediate();
		expect(app.panel.analysis()).toBeNull();
		expect(calls.stop).not.toHaveBeenCalled();
		lookup.resolve({ ok: true, value: replacement });
		await vi.waitFor(() => expect(calls.stop).toHaveBeenCalledWith(session));
		expect(app.panel.visibleTabIdentity()).toBe(replacement);
		expect(app.panel.analysis()).toBeNull();
	});
});
