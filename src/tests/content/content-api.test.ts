import { afterEach, describe, expect, it, vi } from 'vitest';

import type {
	FlushObservedObservationBatchOutput,
	ObservedPageSignals,
	ObservationSessionState,
} from '@/lib/content/observed-page-signals';
import type { ContentPageSessionSnapshotTarget } from '@/lib/contracts/analysis';
import type { PageSignals } from '@/lib/detection/types';
import type { ObservationBatch } from '@/lib/observations';

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

function makeState(overrides: Partial<ObservationSessionState> = {}): ObservationSessionState {
	return {
		status: 'idle',
		throttleMs: 1_500,
		pendingMutationCount: 0,
		...overrides,
	};
}

function makeFlushOutput(session = makeState()): FlushObservedObservationBatchOutput {
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

async function loadContentApiFactory() {
	vi.resetModules();
	vi.stubGlobal('defineContentScript', (options: unknown) => options);
	vi.doMock('@/lib/content/collect-page-signals', () => ({
		collectPageSignals: vi.fn(() => makeSignals()),
	}));
	vi.doMock('@/lib/content/observed-page-signals', () => ({
		createObservedPageSignals: vi.fn(),
	}));
	vi.doMock('@/lib/detection/validate', () => ({
		validatePageSignals: vi.fn(() => null),
	}));
	const writeContentPageSessionSnapshot = vi.fn(async () => null);
	vi.doMock('@/lib/content/page-session-snapshots', () => ({
		writeContentPageSessionSnapshot,
	}));
	const sendMessage = vi.fn(async () => undefined);
	vi.doMock('wxt/browser', () => ({
		browser: {
			runtime: { sendMessage },
		},
	}));
	vi.doMock('comctx', () => ({
		defineProxy: vi.fn(() => [vi.fn()]),
	}));

	return {
		...(await import('@/entrypoints/content')),
		sendMessage,
		writeContentPageSessionSnapshot,
	};
}

afterEach(() => {
	vi.useRealTimers();
	vi.unstubAllGlobals();
	vi.doUnmock('@/lib/content/collect-page-signals');
	vi.doUnmock('@/lib/content/observed-page-signals');
	vi.doUnmock('@/lib/detection/validate');
	vi.doUnmock('@/lib/content/page-session-snapshots');
	vi.doUnmock('wxt/browser');
	vi.doUnmock('comctx');
	vi.resetModules();
});

describe.sequential('content API observation baseline', () => {
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
			status: vi.fn(() => makeState()),
			disconnect: vi.fn(),
		} satisfies ObservedPageSignals;

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

		await api.stopObservationSession();
		expect(observedSignals.stopObservationSession).toHaveBeenCalledWith('manual');
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
		} satisfies ObservedPageSignals;

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
		} satisfies ObservedPageSignals;

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
		const observedSignals = {
			snapshot: vi.fn(),
			beginObservationSession: vi.fn(() => makeState({ status: 'observing' })),
			stopObservationSession: vi.fn(() => makeState({ status: 'stopped', stopReason: 'manual' })),
			flushObservationBatch: vi.fn(async () => makeFlushOutput()),
			status: vi.fn(() => makeState()),
			disconnect: vi.fn(),
		} satisfies ObservedPageSignals;

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
		await api.stopObservationSession();
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
		} satisfies ObservedPageSignals;

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
		} satisfies ObservedPageSignals;

		await expect(createContentApi(observedSignals).flushObservationBatch()).resolves.toEqual({ ok: true, value: makeFlushOutput(session) });
		expect(observedSignals.flushObservationBatch).toHaveBeenCalledOnce();
	});

	it('collects the initial document through the observation batch API', async () => {
		const { createContentApi } = await loadContentApiFactory();
		const observedSignals = {
			snapshot: vi.fn(async () => ({
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
		} satisfies ObservedPageSignals;

		await expect(createContentApi(observedSignals).collectObservationBatch({ selectorProbeList: [], includeHtml: true })).resolves.toMatchObject({
			ok: true,
			value: { batch: { target: { url: 'https://example.com/products', hostname: 'example.com' } } },
		});
	});

	/**
	 * Late observations should advance the same durable session snapshot while the
	 * popup is open. A regression here would return to the old behavior where
	 * users only saw the larger result set after closing and reopening the popup.
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
		} satisfies ObservedPageSignals;
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

		expect(writeContentPageSessionSnapshot).toHaveBeenLastCalledWith({
			target: SNAPSHOT_TARGET,
			status: 'observing',
			observedAt: lateBatch.observedAt,
			reason: 'observation-batch-flushed',
		});
	});


	/**
	 * The observer callback uses the runtime publisher instead of waiting for a
	 * background flush request. That keeps popup storage revisions moving at the
	 * content observer throttle, while the detector rerun remains background-owned.
	 */
	it('publishes content and background notifications when the observer queues late facts directly', async () => {
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
		} satisfies ObservedPageSignals;
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

		expect(writeContentPageSessionSnapshot).toHaveBeenLastCalledWith({
			target: SNAPSHOT_TARGET,
			status: 'observing',
			observedAt: 1_700_000_000_250,
			reason: 'observation-batch-queued',
		});
		expect(sendMessage).toHaveBeenCalledWith({
			type: 'kaiju-site-scope.observation-dirty.v1',
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			observedAt: 1_700_000_000_250,
			pendingMutationCount: 0,
		});
	});

});
