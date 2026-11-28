import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ContentScriptContext } from 'wxt/utils/content-script-context';

import { VALIDATION_KEY, type ArtifactRuntimeType } from "../../lib/content/artifact.ts";
import type * as observe from '../../lib/content/observe/index.ts';
import type { ContentPageSessionSnapshotTarget } from "../../lib/messaging/analysis.ts";
import type { PageSignals } from "@deepscope/detection/types";
import type { ObservationBatch } from "@deepscope/detection/observations";

import { createMockBrowserStorageArea } from "../support/mock-browser.ts";

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
	vi.doMock('../../lib/content/signals/index.ts', () => ({
		collectPageSignals: vi.fn(() => makeSignals()),
		collectResourceEntries: vi.fn(() => []),
		collectResourceTimings: vi.fn(() => []),
	}));
	const createObserver = vi.fn();
	if (!options.realObserver) vi.doMock('../../lib/content/observe/index.ts', () => ({ create: createObserver }));
	vi.doMock('@deepscope/detection/validate', () => ({
		validatePageSignals: vi.fn(() => null),
	}));
	const writeContentPageSessionSnapshot = vi.fn(async () => null);
	vi.doMock('../../lib/content/page-session-snapshots.ts', () => ({
		writeContentPageSessionSnapshot,
	}));
	const sendMessage = vi.fn(async () => undefined);
	const debug = vi.fn();
	vi.doMock('../../lib/diagnostics/logging.ts', () => ({ configure: vi.fn(), get: () => ({ debug }) }));
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
		...(await import('../../entrypoints/content.ts')),
		...(await import('../../lib/content/api.ts')),
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
	vi.doUnmock('../../lib/content/signals/index.ts');
	vi.doUnmock('../../lib/content/observe/index.ts');
	vi.doUnmock('@deepscope/detection/validate');
	vi.doUnmock('../../lib/diagnostics/logging.ts');
	vi.doUnmock('../../lib/content/page-session-snapshots.ts');
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
			failure: { code: 'OBSERVATION_SESSION_UNAVAILABLE' },
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
		const { getDiagnosticRecords, getDiagnosticContexts } = await import('../../lib/diagnostics/journal/read.ts');
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

	/** A failed install has no invalidation callback to release its acquired owners later. */
	it.each(['observer', 'artifact', 'rpc', 'invalidation'] as const)(
		'releases crash hooks and observation ownership when %s setup fails',
		async (stage) => {
			vi.stubGlobal('__kaijuDeepScopeContentRuntimeV1', undefined);
			vi.stubGlobal('__kaijuDeepScopeCrashHooksV2', undefined);
			const events = new EventTarget();
			const add = vi.fn(events.addEventListener.bind(events));
			const remove = vi.fn(events.removeEventListener.bind(events));
			vi.stubGlobal('addEventListener', add);
			vi.stubGlobal('removeEventListener', remove);
			const { default: entrypoint, createObserver, provideContentApi } = await loadContentApiFactory();
			const disconnect = vi.fn();
			createObserver.mockReturnValue({ disconnect });
			const failure = new Error(`Failed ${stage} setup`);
			const { context, onInvalidated } = contentScriptContext();
			if (stage === 'observer') createObserver.mockImplementationOnce(() => { throw failure; });
			if (stage === 'artifact') vi.stubGlobal(VALIDATION_KEY, { publish() { throw failure; } });
			if (stage === 'rpc') provideContentApi.mockImplementationOnce(() => { throw failure; });
			if (stage === 'invalidation') onInvalidated.mockImplementationOnce(() => { throw failure; });

			await expect(async () => entrypoint.main(context)).rejects.toBe(failure);

			expect(add.mock.calls.map(([type]) => type)).toEqual(['unhandledrejection', 'messageerror']);
			expect(remove.mock.calls).toEqual(add.mock.calls);
			expect((globalThis as Record<string, unknown>).__kaijuDeepScopeCrashHooksV2).toBeUndefined();
			expect((globalThis as Record<string, unknown>).__kaijuDeepScopeContentRuntimeV1).toBeUndefined();
			expect(disconnect).toHaveBeenCalledTimes(stage === 'observer' ? 0 : 1);
		},
	);

	/** A replaced WXT context may invalidate later; it must not release the new build's hooks. */
	it('keeps replacement ownership intact when the older context invalidates later', async () => {
		vi.stubGlobal('__kaijuDeepScopeContentRuntimeV1', undefined);
		vi.stubGlobal('__kaijuDeepScopeCrashHooksV2', undefined);
		vi.stubGlobal('__KAIJU_BUILD_ID__', 'build-before-replacement');
		const events = new EventTarget();
		const add = vi.fn(events.addEventListener.bind(events));
		const remove = vi.fn(events.removeEventListener.bind(events));
		vi.stubGlobal('addEventListener', add);
		vi.stubGlobal('removeEventListener', remove);
		const { default: entrypoint, createObserver } = await loadContentApiFactory();
		const previousDisconnect = vi.fn();
		const nextDisconnect = vi.fn();
		createObserver.mockReturnValueOnce({ disconnect: previousDisconnect }).mockReturnValueOnce({ disconnect: nextDisconnect });
		const previous = contentScriptContext();
		const next = contentScriptContext();
		await entrypoint.main(previous.context);
		vi.stubGlobal('__KAIJU_BUILD_ID__', 'build-after-replacement');
		await entrypoint.main(next.context);
		expect(previousDisconnect).toHaveBeenCalledOnce();
		expect(remove).toHaveBeenCalledTimes(2);
		previous.onInvalidated.mock.calls[0]![0]();
		expect(previousDisconnect).toHaveBeenCalledOnce();
		expect(nextDisconnect).not.toHaveBeenCalled();
		expect(remove).toHaveBeenCalledTimes(2);
		expect((globalThis as Record<string, unknown>).__kaijuDeepScopeCrashHooksV2).toMatchObject({ buildId: 'build-after-replacement' });
		next.onInvalidated.mock.calls[0]![0]();
		expect(nextDisconnect).toHaveBeenCalledOnce();
		expect(remove.mock.calls).toEqual(add.mock.calls);
		expect((globalThis as Record<string, unknown>).__kaijuDeepScopeContentRuntimeV1).toBeUndefined();
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
