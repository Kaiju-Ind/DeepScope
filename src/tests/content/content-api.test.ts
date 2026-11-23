import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ContentScriptContext } from 'wxt/utils/content-script-context';

import { VALIDATION_KEY, type ArtifactRuntimeType } from '@/lib/content/artifact';
import type * as observe from '@/lib/content/observe';
import type { ContentPageSessionSnapshotTarget } from '@/lib/messaging/analysis';
import type { PageSignals } from '@/lib/detection/types';
import type { ObservationBatch } from '@/lib/observations';

import { createMockBrowserStorageArea } from '../support/mock-browser';

function makeSignals(overrides: Partial<PageSignals> = {}): PageSignals {
	return {
		url: 'https://example.com/products',
		hostname: 'example.com',
		html: '<html><head></head><body>Example</body></html>',
		text: 'Example',
		scripts: ['https://example.com/assets/app.js'],
		stylesheets: [],
		links: [],
		resources: [],
		requests: [],
		scriptContents: [],
		stylesheetContents: [],
		cookies: {},
		headers: {},
		meta: {},
		dom: { selectors: {} },
		storage: { localStorage: {}, sessionStorage: {} },
		jsGlobals: {},
		robotsTxt: '',
		dnsRecords: {},
		certIssuer: '',
		probeResults: [],
		collectedAt: 1_700_000_000_000,
		...overrides,
	};
}

function makeState(overrides: Partial<observe.StateType> = {}): observe.StateType {
	return {
		status: 'idle',
		throttleMs: 1_500,
		pendingMutationCount: 0,
		...overrides,
	};
}

function makeFlushOutput(session = makeState()): observe.FlushType {
	return {
		stats: {
			queuedCount: 0,
			acceptedCount: 0,
			duplicateDropCount: 0,
			queueLimitDropCount: 0,
			stormLimitDropCount: 0,
			acceptedInStormWindow: 0,
		},
		session,
	};
}

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

async function loadContentApiFactory(options: { incognito?: boolean; realObserver?: boolean } = {}) {
	vi.resetModules();
	vi.stubGlobal('defineContentScript', (options: unknown) => options);
	vi.doMock('@/lib/content/collect-page-signals', () => ({
		collectPageSignals: vi.fn(() => makeSignals()),
		collectResourceEntries: vi.fn(() => []),
		collectResourceTimings: vi.fn(() => []),
	}));
	const createObserver = vi.fn();
	if (!options.realObserver) vi.doMock('@/lib/content/observe', () => ({ create: createObserver }));
	vi.doMock('@/lib/detection/validate', () => ({
		validatePageSignals: vi.fn(() => null),
	}));
	const writeContentPageSessionSnapshot = vi.fn(async () => null);
	vi.doMock('@/lib/content/page-session-snapshots', () => ({
		writeContentPageSessionSnapshot,
	}));
	const sendMessage = vi.fn(async () => undefined);
	const debug = vi.fn();
	vi.doMock('@/lib/diagnostics/logging', () => ({ configure: vi.fn(), get: () => ({ debug }) }));
	vi.doMock('wxt/browser', () => ({
		browser: {
			extension: { inIncognitoContext: options.incognito === true },
			runtime: { sendMessage },
		},
	}));
	const provideContentApi = vi.fn();
	vi.doMock('comctx', () => ({
		defineProxy: vi.fn(() => [provideContentApi]),
	}));

	return {
		...(await import('@/entrypoints/content')),
		createObserver,
		debug,
		provideContentApi,
		sendMessage,
		writeContentPageSessionSnapshot,
	};
}

afterEach(() => {
	vi.useRealTimers();
	vi.unstubAllGlobals();
	vi.doUnmock('@/lib/content/collect-page-signals');
	vi.doUnmock('@/lib/content/observe');
	vi.doUnmock('@/lib/detection/validate');
	vi.doUnmock('@/lib/diagnostics/logging');
	vi.doUnmock('@/lib/content/page-session-snapshots');
	vi.doUnmock('wxt/browser');
	vi.doUnmock('comctx');
	vi.resetModules();
});

/** Capture only the WXT invalidation callback used by the actual entrypoint. */
function contentScriptContext() {
	const onInvalidated = vi.fn<ContentScriptContext['onInvalidated']>(() => () => undefined);
	const context: Pick<ContentScriptContext, 'onInvalidated'> = { onInvalidated };
	return { context: context as ContentScriptContext, onInvalidated };
}

describe('content API observation baseline', { concurrent: false }, () => {
	it('starts observation through the observed-signal store and reports the session', async () => {
		vi.useFakeTimers();
		const { createContentApi, writeContentPageSessionSnapshot } = await loadContentApiFactory();
		const observing = makeState({
			status: 'observing',
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			startedAt: 1_700_000_000_000,
			expiresAt: 1_700_000_060_000,
		});
		const observedSignals = {
			snapshot: vi.fn(),
			beginObservationSession: vi.fn(() => observing),
			stopObservationSession: vi.fn(() => makeState({ status: 'stopped', stopReason: 'manual' })),
			flushObservationBatch: vi.fn(async () => makeFlushOutput(observing)),
			status: vi.fn(() => observing),
			disconnect: vi.fn(),
		} satisfies observe.SignalsType;

		const api = createContentApi(observedSignals);

		await expect(api.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			snapshotTarget: SNAPSHOT_TARGET,
			policy: {
				durationMs: 60_000,
				throttleMs: 1_500,
				maxPendingNodes: 100,
				maxMutations: 5_000,
			},
		})).resolves.toEqual({ ok: true, value: observing });
		expect(observedSignals.beginObservationSession).toHaveBeenCalledWith({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 60_000,
			maxPendingNodes: 100,
			maxMutations: 5_000,
			domSelectorPlan: undefined,
		});
		expect(writeContentPageSessionSnapshot).toHaveBeenCalledWith({
			target: SNAPSHOT_TARGET,
			status: 'observing',
			observedAt: observing.startedAt,
			reason: 'observation-session-started',
		});

		await api.stopObservationSession({ sessionId: 'session-1', expectedUrl: 'https://example.com/products' });
		expect(observedSignals.stopObservationSession).toHaveBeenCalledWith('manual');
	});

	it('does not let a stale stop request terminate a newer observation session', async () => {
		const { createContentApi } = await loadContentApiFactory();
		const current = makeState({
			status: 'observing',
			sessionId: 'session-new',
			expectedUrl: 'https://example.com/products',
		});
		const observedSignals = {
			snapshot: vi.fn(),
			beginObservationSession: vi.fn(() => current),
			stopObservationSession: vi.fn(() => makeState({ status: 'stopped', stopReason: 'manual' })),
			flushObservationBatch: vi.fn(async () => makeFlushOutput(current)),
			status: vi.fn(() => current),
			disconnect: vi.fn(),
		} satisfies observe.SignalsType;

		await expect(createContentApi(observedSignals).stopObservationSession({
			sessionId: 'session-old',
			expectedUrl: 'https://example.com/products',
		})).resolves.toMatchObject({
			ok: false,
			error: { code: 'OBSERVATION_SESSION_UNAVAILABLE' },
		});
		expect(observedSignals.stopObservationSession).not.toHaveBeenCalled();
	});

	it('flushes queued observation batches through the content API', async () => {
		const { createContentApi } = await loadContentApiFactory();
		const session = makeState({ status: 'observing', sessionId: 'session-1' });
		const observedSignals = {
			snapshot: vi.fn(),
			beginObservationSession: vi.fn(() => session),
			stopObservationSession: vi.fn(() => makeState({ status: 'stopped' })),
			flushObservationBatch: vi.fn(async () => makeFlushOutput(session)),
			status: vi.fn(() => session),
			disconnect: vi.fn(),
		} satisfies observe.SignalsType;

		await expect(createContentApi(observedSignals).flushObservationBatch()).resolves.toEqual({ ok: true, value: makeFlushOutput(session) });
		expect(observedSignals.flushObservationBatch).toHaveBeenCalledOnce();
	});

	it('expires observation through the same stop path used by manual stops', async () => {
		vi.useFakeTimers();
		const { createContentApi } = await loadContentApiFactory();
		const observedSignals = {
			snapshot: vi.fn(),
			beginObservationSession: vi.fn(() => makeState({ status: 'observing' })),
			stopObservationSession: vi.fn(() => makeState({ status: 'stopped', stopReason: 'expired' })),
			flushObservationBatch: vi.fn(async () => makeFlushOutput()),
			status: vi.fn(() => makeState()),
			disconnect: vi.fn(),
		} satisfies observe.SignalsType;

		const api = createContentApi(observedSignals);
		await api.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			policy: {
				durationMs: 25,
				throttleMs: 1_500,
				maxPendingNodes: 100,
				maxMutations: 5_000,
			},
		});

		await vi.advanceTimersByTimeAsync(25);

		expect(observedSignals.stopObservationSession).toHaveBeenCalledWith('expired');
	});

	it('clears the expiry timer when observation is stopped manually', async () => {
		vi.useFakeTimers();
		const { createContentApi } = await loadContentApiFactory();
		const observing = makeState({
			status: 'observing',
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
		});
		const observedSignals = {
			snapshot: vi.fn(),
			beginObservationSession: vi.fn(() => observing),
			stopObservationSession: vi.fn(() => makeState({ status: 'stopped', stopReason: 'manual' })),
			flushObservationBatch: vi.fn(async () => makeFlushOutput()),
			status: vi.fn(() => observing),
			disconnect: vi.fn(),
		} satisfies observe.SignalsType;

		const api = createContentApi(observedSignals);
		await api.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			policy: {
				durationMs: 25,
				throttleMs: 1_500,
				maxPendingNodes: 100,
				maxMutations: 5_000,
			},
		});
		await api.stopObservationSession({ sessionId: 'session-1', expectedUrl: 'https://example.com/products' });
		await vi.advanceTimersByTimeAsync(25);

		expect(observedSignals.stopObservationSession).toHaveBeenCalledOnce();
		expect(observedSignals.stopObservationSession).toHaveBeenCalledWith('manual');
	});

	it('disposes invalidated runtimes without reporting a manual stop', async () => {
		vi.useFakeTimers();
		const { createContentRuntime } = await loadContentApiFactory();
		const observedSignals = {
			snapshot: vi.fn(),
			beginObservationSession: vi.fn(() => makeState({ status: 'observing' })),
			stopObservationSession: vi.fn(() => makeState({ status: 'stopped', stopReason: 'manual' })),
			flushObservationBatch: vi.fn(),
			status: vi.fn(() => makeState()),
			disconnect: vi.fn(),
		} satisfies observe.SignalsType;

		const runtime = createContentRuntime(observedSignals);
		await runtime.contentApi.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			policy: {
				durationMs: 25,
				throttleMs: 1_500,
				maxPendingNodes: 100,
				maxMutations: 5_000,
			},
		});
		runtime.dispose('invalidated');
		await vi.advanceTimersByTimeAsync(25);

		expect(observedSignals.disconnect).toHaveBeenCalledWith('invalidated');
		expect(observedSignals.stopObservationSession).not.toHaveBeenCalled();
	});

	it.each([false, true])('collects the initial document with tab privacy: %s', async (incognito) => {
		vi.stubGlobal('location', new URL('https://example.com/products'));
		const { createContentApi, debug } = await loadContentApiFactory();
		const observedSignals = {
			snapshot: vi.fn(async () => ({
				images: [],
				scripts: [],
				stylesheets: [],
				links: [],
				resources: [],
				requests: [],
				scriptContents: [],
				stylesheetContents: [],
				meta: {},
				dom: { selectors: {} },
			})),
			beginObservationSession: vi.fn(() => makeState()),
			stopObservationSession: vi.fn(() => makeState({ status: 'stopped' })),
			flushObservationBatch: vi.fn(async () => makeFlushOutput()),
			status: vi.fn(() => makeState()),
			disconnect: vi.fn(),
		} satisfies observe.SignalsType;

		await expect(createContentApi(observedSignals, incognito).collectObservationBatch({ includeHtml: true })).resolves.toMatchObject({
			ok: true,
			value: { batch: { target: { url: 'https://example.com/products', hostname: 'example.com' } } },
		});
		const records = JSON.stringify(debug.mock.calls);
		if (incognito) {
			expect(records).not.toContain('example.com');
		} else {
			expect(records).toContain('example.com');
		}
	});

	it.each([false, true])('uses the browser privacy context for startup and observer navigation: %s', async (incognito) => {
		vi.useFakeTimers();
		vi.stubGlobal('location', new URL(SNAPSHOT_TARGET.url));
		vi.stubGlobal('document', { documentElement: {}, readyState: 'complete' });
		vi.stubGlobal('MutationObserver', class {
			observe() {}
			disconnect() {}
		});
		vi.stubGlobal('PerformanceObserver', undefined);
		const events = new EventTarget();
		vi.stubGlobal('addEventListener', events.addEventListener.bind(events));
		vi.stubGlobal('removeEventListener', events.removeEventListener.bind(events));
		const storage = createMockBrowserStorageArea();
		vi.stubGlobal('chrome', { storage: { local: storage.local } });
		vi.stubGlobal('__kaijuDeepScopeDiagnosticJournalV3', undefined);
		const staleError = new Error('stale-content error for https://old.example/path');
		vi.stubGlobal('__kaijuDeepScopeContentRuntimeV1', {
			buildId: 'old-build',
			dispose: vi.fn(() => { throw staleError; }),
		});
		const publish = vi.fn<(runtime: ArtifactRuntimeType) => void>();
		vi.stubGlobal(VALIDATION_KEY, { publish });
		const { default: entrypoint, debug, writeContentPageSessionSnapshot } = await loadContentApiFactory({ incognito, realObserver: true });
		const { context, onInvalidated } = contentScriptContext();
		await entrypoint.main(context);
		await entrypoint.main(context);
		expect(publish).toHaveBeenCalledOnce();
		const { contentApi } = publish.mock.calls[0]![0];

		await expect(contentApi.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: SNAPSHOT_TARGET.url,
			snapshotTarget: SNAPSHOT_TARGET,
			policy: { durationMs: 60_000, throttleMs: 1_500, maxPendingNodes: 100, maxMutations: 5_000 },
		})).resolves.toMatchObject({
			ok: true,
			value: { status: 'observing', expectedUrl: SNAPSHOT_TARGET.url },
		});
		vi.stubGlobal('location', new URL('https://next.example/secret-page'));
		await expect(contentApi.getObservationSessionState()).resolves.toMatchObject({
			ok: true,
			value: { status: 'stopped', stopReason: 'navigation' },
		});
		const journalError = new Error('uncaught error at https://journal.example/secret');
		events.dispatchEvent(Object.assign(new Event('unhandledrejection'), { reason: journalError }));
		onInvalidated.mock.calls[0]![0]();
		events.dispatchEvent(new Event('messageerror'));
		await vi.advanceTimersByTimeAsync(1);
		const { getDiagnosticRecords, getDiagnosticContexts } = await import('@/lib/diagnostics/journal');
		const crashRecords = await getDiagnosticRecords();
		expect(crashRecords).toHaveLength(1);
		const contextRecords = await getDiagnosticContexts();
		expect(contextRecords).toEqual([{
			buildId: 'development',
			id: crashRecords[0]!.contextId,
			schemaVersion: 1,
			startedAt: expect.any(Number),
			surface: 'content',
		}]);

		const details = debug.mock.calls.map(([, detail]) => detail);
		expect(details).toEqual(expect.arrayContaining([
			expect.objectContaining({ event: 'runtime-ready', readyState: 'complete' }),
			expect.objectContaining({ event: 'runtime-already-active', readyState: 'complete' }),
			expect.objectContaining({ event: 'observation-start', sessionId: 'session-1' }),
			expect.objectContaining({ event: 'session-navigation', sessionId: 'session-1' }),
			expect.objectContaining({ event: 'runtime-dispose', readyState: 'complete' }),
		]));
		const staleFailure = details.find((record) => record.event === 'stale-runtime-dispose-failed');
		const records = JSON.stringify(details);
		if (incognito) {
			expect(staleFailure).toMatchObject({ errorType: 'Error' });
			expect(crashRecords[0]!.properties).toEqual({ errorType: 'Error' });
			for (const location of ['example.com', 'next.example', 'old.example', 'origin-example', 'url-example-products']) {
				expect(records).not.toContain(location);
			}
			expect(writeContentPageSessionSnapshot).not.toHaveBeenCalled();
		} else {
			expect(staleFailure).toMatchObject({ message: staleError.message });
			expect(crashRecords[0]!.properties).toMatchObject({ error: { message: journalError.message } });
			expect(records).toContain('https://next.example/secret-page');
			expect(records).toContain('origin-example');
			expect(writeContentPageSessionSnapshot).toHaveBeenCalledWith(expect.objectContaining({ status: 'observing' }));
		}
	});

	it.each([false, true])('controls notification failure and expiry diagnostics for a private context: %s', async (incognito) => {
		vi.useFakeTimers();
		vi.stubGlobal('location', new URL(SNAPSHOT_TARGET.url));
		const { createContentRuntime, debug, sendMessage } = await loadContentApiFactory();
		const session = makeState({ status: 'observing', sessionId: 'session-1', expectedUrl: SNAPSHOT_TARGET.url });
		const lateBatch: ObservationBatch = {
			target: { url: 'https://batch.example/private', hostname: 'batch.example' },
			interface: 'extension',
			observedAt: 4,
			observations: [],
		};
		const flush = { ...makeFlushOutput(session), batch: lateBatch };
		const runtime = createContentRuntime({
			snapshot: vi.fn(),
			beginObservationSession: vi.fn(() => session),
			stopObservationSession: vi.fn(() => makeState({ status: 'stopped', stopReason: 'expired' })),
			flushObservationBatch: vi.fn(async () => flush),
			status: vi.fn(() => session),
			disconnect: vi.fn(),
		}, incognito);
		const notificationError = new Error('failed for https://send.example/private');
		sendMessage.mockRejectedValueOnce(notificationError);

		await runtime.contentApi.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: SNAPSHOT_TARGET.url,
			policy: { durationMs: 25, throttleMs: 1_500, maxPendingNodes: 100, maxMutations: 5_000 },
		});
		await expect(runtime.contentApi.flushObservationBatch()).resolves.toEqual({ ok: true, value: flush });
		runtime.publishObservedBatchQueued({ session, observedAt: 4, stats: flush.stats });
		await vi.advanceTimersByTimeAsync(25);

		expect(sendMessage).toHaveBeenCalledWith(expect.objectContaining({ expectedUrl: SNAPSHOT_TARGET.url }));
		const details = debug.mock.calls.map(([, detail]) => detail);
		const notify = details.find((record) => record.event === 'observation-dirty-notify-failed');
		const flushed = details.find((record) => record.event === 'observation-flush');
		const expired = details.find((record) => record.event === 'observation-expired');
		expect(flushed).toMatchObject({ observationCount: 0, status: 'observing' });
		expect(expired).toMatchObject({ sessionId: 'session-1' });
		if (incognito) {
			expect(notify).toMatchObject({ errorType: 'Error' });
			expect(JSON.stringify(details)).not.toMatch(/(?:batch|send)\.example|example\.com/);
		} else {
			expect(notify).toMatchObject({ message: notificationError.message });
			expect(flushed).toMatchObject({ hostname: 'batch.example' });
			expect(expired).toMatchObject({ hostname: SNAPSHOT_TARGET.hostname });
		}
	});

	it.each([false, true])('protects startup exceptions before they reach the WXT wrapper: %s', async (incognito) => {
		const { default: entrypoint, createObserver, debug } = await loadContentApiFactory({ incognito });
		const startupError = new Error('startup failure for https://startup.example/private');
		createObserver.mockImplementationOnce(() => { throw startupError; });
		const { context } = contentScriptContext();
		if (incognito) {
			await expect(async () => entrypoint.main(context)).rejects.toThrow('DeepScope content runtime failed to start.');
			expect(debug.mock.calls.map(([, detail]) => detail)).toContainEqual(expect.objectContaining({
				event: 'runtime-start-failed', errorType: 'Error',
			}));
			expect(JSON.stringify(debug.mock.calls)).not.toContain('startup.example');
		} else {
			await expect(async () => entrypoint.main(context)).rejects.toBe(startupError);
		}
	});

	/**
	 * Late observations should advance the same durable session snapshot while the
	 * side panel is open. A regression here would return to the old behavior where
	 * users only saw the larger result set after closing and reopening the side panel.
	 */
	it('publishes content-owned snapshot revisions when late observation batches flush', async () => {
		const { createContentApi, writeContentPageSessionSnapshot } = await loadContentApiFactory();
		const session = makeState({
			status: 'observing',
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			startedAt: 1_700_000_000_000,
		});
		const lateBatch = {
			target: { url: 'https://example.com/products', hostname: 'example.com' },
			interface: 'extension' as const,
			observedAt: 1_700_000_000_125,
			observations: [{
				kind: 'scriptSrc' as const,
				interface: 'extension' as const,
				collector: 'content-observer' as const,
				target: { url: 'https://example.com/products', hostname: 'example.com' },
				observedAt: 1_700_000_000_125,
				value: 'https://example.com/late.js',
			}],
		} satisfies ObservationBatch;
		const observedSignals = {
			snapshot: vi.fn(),
			beginObservationSession: vi.fn(() => session),
			stopObservationSession: vi.fn(() => makeState({ status: 'stopped' })),
			flushObservationBatch: vi.fn(async () => makeFlushOutput(session)),
			status: vi.fn(() => session),
			disconnect: vi.fn(),
		} satisfies observe.SignalsType;
		observedSignals.flushObservationBatch.mockResolvedValueOnce({
			...makeFlushOutput(session),
			batch: lateBatch,
		});

		const api = createContentApi(observedSignals);
		await api.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			snapshotTarget: SNAPSHOT_TARGET,
			policy: {
				durationMs: 60_000,
				throttleMs: 1_500,
				maxPendingNodes: 100,
				maxMutations: 5_000,
			},
		});
		await api.flushObservationBatch();

		expect(writeContentPageSessionSnapshot).toHaveBeenCalledTimes(1);
		expect(writeContentPageSessionSnapshot).toHaveBeenLastCalledWith({
			target: SNAPSHOT_TARGET,
			status: 'observing',
			observedAt: session.startedAt,
			reason: 'observation-session-started',
		});
	});


	/**
	 * Late facts still notify background immediately, but they do not create a new
	 * content lifecycle record while the observation session remains active.
	 */
	it('notifies background without rewriting unchanged content lifecycle state', async () => {
		const { createContentRuntime, sendMessage, writeContentPageSessionSnapshot } = await loadContentApiFactory();
		const session = makeState({
			status: 'observing',
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			startedAt: 1_700_000_000_000,
		});
		const observedSignals = {
			snapshot: vi.fn(),
			beginObservationSession: vi.fn(() => session),
			stopObservationSession: vi.fn(() => makeState({ status: 'stopped' })),
			flushObservationBatch: vi.fn(async () => makeFlushOutput(session)),
			status: vi.fn(() => session),
			disconnect: vi.fn(),
		} satisfies observe.SignalsType;
		const runtime = createContentRuntime(observedSignals);
		await runtime.contentApi.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			snapshotTarget: SNAPSHOT_TARGET,
			policy: {
				durationMs: 60_000,
				throttleMs: 1_500,
				maxPendingNodes: 100,
				maxMutations: 5_000,
			},
		});

		runtime.publishObservedBatchQueued({
			observedAt: 1_700_000_000_250,
			stats: makeFlushOutput(session).stats,
			session,
		});

		expect(writeContentPageSessionSnapshot).toHaveBeenCalledTimes(1);
		expect(writeContentPageSessionSnapshot).toHaveBeenLastCalledWith({
			target: SNAPSHOT_TARGET,
			status: 'observing',
			observedAt: session.startedAt,
			reason: 'observation-session-started',
		});
		expect(sendMessage).toHaveBeenCalledWith({
			type: 'kaiju-deepscope.observation-dirty.v1',
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			observedAt: 1_700_000_000_250,
			pendingMutationCount: 0,
		});
	});

});
