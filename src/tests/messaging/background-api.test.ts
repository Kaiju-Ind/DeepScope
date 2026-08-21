import { afterEach, describe, expect, it, vi } from 'vitest';

import { buildCollectionPlan, type CollectionPlan } from '@/lib/collectors/planning';
import type * as observe from '@/lib/content/observe';
import {
	DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION,
	type DetectionSessionSnapshot,
} from '@/lib/storage/session';
import type { PageSignals, SiteAnalysis } from '@/lib/detection/types';
import type { ContentApi } from '@/lib/messaging';
import { CONTENT_SCRIPT_TIMEOUT_MS } from '@/lib/messaging/rpc';
import {
	createDetectionStorageHash,
	getDetectionOriginSnapshotKey,
	getDetectionSessionSnapshotKey,
} from '@/lib/storage/contracts';
import type { ObservationBatch } from '@/lib/observations';
import {
	createMatcherPartitionTasks,
	createMatcherPipelineResult,
	type MatcherJobRecord,
	type MatcherJobRunResult,
	type MatcherPartitionResult,
	type RunMatcherJobRequest,
} from '@/lib/matcher';
import type { DetectionReplayTrace } from '@/lib/pipeline';
import type { RuntimeTechnologyRegistryArtifact } from '@/lib/registry/runtime-artifact';
import { extensionSuccess, type ExtensionResult } from '@/lib/messaging/result';
import { makeDetectionReplayTrace } from '../support/factories';

vi.setConfig({ testTimeout: 20_000 });

type TestTab = {
	id?: number;
	windowId?: number;
	url?: string;
	active?: boolean;
	incognito?: boolean;
};

const HTTP_TAB: TestTab = {
	id: 7,
	windowId: 3,
	url: 'https://example.com/products',
	active: true,
};

const VISIBLE_TAB_TARGET = {
	windowId: 3,
	tabId: 7,
	frameId: 0,
	url: 'https://example.com/products',
	hostname: 'example.com',
	originHash: createDetectionStorageHash('https://example.com'),
	urlHash: createDetectionStorageHash('https://example.com/products'),
	incognito: false,
} as const;

const OBSERVATION_TARGET = {
	tabId: 7,
	sessionId: 'session-1',
	expectedUrl: 'https://example.com/products',
} as const;

type BackgroundApiHarnessOptions = {
	tab?: TestTab | null;
	contentApi?: Partial<ContentApi>;
	cachedAnalysis?: SiteAnalysis | null;
	cachedReplayTrace?: DetectionReplayTrace | null;
	cachedReplayHistory?: DetectionReplayTrace[];
	collectionPlan?: CollectionPlan;
	updateMatcherJobRecord?: (
		jobId: string,
		patch?: Partial<Omit<MatcherJobRecord, 'jobId' | 'tabId' | 'expectedUrl' | 'target' | 'createdAt'>>,
	) => Promise<MatcherJobRecord | null>;
	saveSnapshot?: (snapshot: DetectionSessionSnapshot) => Promise<{
		readonly accepted: boolean;
		readonly sessionStorageKey: string;
		readonly originStorageKey: string;
		readonly snapshot: DetectionSessionSnapshot;
	}>;
};

const SOURCE_LIMITS_STUB = {
	htmlChars: 200_000,
	textChars: 80_000,
	scriptSrc: 300,
	stylesheetHref: 300,
	resourceUrls: 500,
	requestUrls: 500,
	linkTags: 200,
	storageKeys: 200,
	scriptContentItems: 200,
	stylesheetContentItems: 200,
	scriptContentChars: 40_000,
	stylesheetContentChars: 40_000,
	scriptContentTotalChars: 320_000,
	stylesheetContentTotalChars: 240_000,
	jsGlobals: 6_000,
	jsGlobalValueChars: 500,
	robotsTxtChars: 40_000,
	headers: 80,
	headerValueChars: 1_000,
	probeResults: 50,
	metaValueChars: 500,
	metaValuesPerKey: 5,
	cookieNames: 200,
	evidenceValueChars: 160,
} as const;

function canInspectUrl(tab: { url?: string }): boolean {
	if (!tab.url) return false;
	try {
		const protocol = new URL(tab.url).protocol;
		return protocol === 'http:' || protocol === 'https:';
	} catch {
		return false;
	}
}

function makeSignals(overrides: Partial<PageSignals> = {}): PageSignals {
	return {
		url: 'https://example.com/products',
		hostname: 'example.com',
		html: '<html><head></head><body></body></html>',
		text: '',
		scripts: [],
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

function makeObservationBatch(signals = makeSignals()): ObservationBatch {
	const target = {
		url: signals.url,
		hostname: signals.hostname,
	};

	return {
		target,
		interface: 'extension',
		observedAt: signals.collectedAt,
		observations: [{
			kind: 'url',
			interface: 'extension',
			collector: 'content-snapshot',
			target,
			observedAt: signals.collectedAt,
			value: signals.url,
		}],
	};
}

/** Build a deterministic matcher result without crossing extension runtime contexts. */
function makeMatcherRunResult(request: RunMatcherJobRequest): MatcherJobRunResult {
	const partitions = createMatcherPartitionTasks({
		job: request.job,
		batch: request.batch,
		...(request.options ? { options: request.options } : {}),
	}).map((task): MatcherPartitionResult => ({
		job: task.job,
		partitionId: task.partitionId,
		kind: task.kind,
		priority: task.priority,
		observationCount: task.batch.observations.length,
		matches: [],
		diagnostics: {
			observationCount: task.batch.observations.length,
			skippedObservationCount: 0,
			candidateRuleCount: 0,
			keyedRuleCount: 0,
			fallbackRuleCount: 0,
			literalRuleCount: 0,
			literalRejectedRuleCount: 0,
			matchCount: 0,
			observationsByKind: { [task.kind]: task.batch.observations.length },
			skippedObservationsByKind: {},
			candidateRulesByKind: {},
		},
		completedAt: request.analyzedAt ?? request.batch.observedAt,
	}));
	const result = createMatcherPipelineResult({
		batch: request.batch,
		registry: request.registry,
		relationshipGraph: request.relationshipGraph,
		partitions,
		...(request.analyzedAt !== undefined ? { analyzedAt: request.analyzedAt } : {}),
		...(request.source !== undefined ? { source: request.source } : {}),
	});

	return {
		job: request.job,
		mode: request.mode,
		result,
		partitions,
		executor: 'offscreen-worker-pool',
		completedAt: request.analyzedAt ?? request.batch.observedAt,
	};
}

function makeDeferred<T = void>(): {
	readonly promise: Promise<T>;
	readonly resolve: (value: T | PromiseLike<T>) => void;
	readonly reject: (reason?: unknown) => void;
} {
	let resolveDeferred: (value: T | PromiseLike<T>) => void = () => undefined;
	let rejectDeferred: (reason?: unknown) => void = () => undefined;
	const promise = new Promise<T>((resolve, reject) => {
		resolveDeferred = resolve;
		rejectDeferred = reject;
	});

	return {
		promise,
		resolve: resolveDeferred,
		reject: rejectDeferred,
	};
}

function makeTextEnrichmentCollectionPlan(): CollectionPlan {
	return buildCollectionPlan([{
		id: 'text-tech',
		name: 'Text Tech',
		website: 'https://text.example',
		categories: ['unknown'],
		rules: [{ kind: 'text', pattern: /text-tech/ }],
	}]);
}

function makeSourceEnrichmentCollectionPlan(): CollectionPlan {
	return buildCollectionPlan([{
		id: 'source-tech',
		name: 'Source Tech',
		website: 'https://source.example',
		categories: ['unknown'],
		rules: [
			{ kind: 'scriptContent', pattern: /source-script/ },
			{ kind: 'stylesheetContent', pattern: /source-style/ },
		],
	}]);
}

function makeMultiSurfaceEnrichmentCollectionPlan(): CollectionPlan {
	const plan = makeTextEnrichmentCollectionPlan();
	return {
		...plan,
		enrichment: {
			...plan.enrichment,
			htmlProbeList: [{
				technologyId: 'html-tech',
				ruleIndex: 0,
				source: 'html-tech',
				flags: '',
			}],
		},
	};
}

function makeAnalysis(signals = makeSignals()): SiteAnalysis {
	return {
		url: signals.url,
		hostname: signals.hostname,
		analyzedAt: signals.collectedAt,
		source: 'fresh',
		results: [],
		errors: [],
	};
}

function makeDetectionSnapshotFromAnalysis(analysis: SiteAnalysis): DetectionSessionSnapshot {
	return {
		key: {
			tabId: VISIBLE_TAB_TARGET.tabId,
			frameId: VISIBLE_TAB_TARGET.frameId,
			documentId: 'document-1',
			originHash: VISIBLE_TAB_TARGET.originHash,
		},
		schemaVersion: DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION,
		revision: 1,
		urlHash: VISIBLE_TAB_TARGET.urlHash,
		hostname: analysis.hostname,
		status: 'complete',
		source: analysis.source === 'cache' ? 'cache' : 'background',
		updatedAt: analysis.analyzedAt,
		detectionCount: analysis.results.length,
		analysis,
		enrichment: { status: 'not-needed' },
		matcherExecutor: 'unknown',
	};
}

async function loadBackgroundApi(input: BackgroundApiHarnessOptions) {
	return (await loadBackgroundApiHarness(input)).api;
}

async function loadBackgroundApiHarness(input: BackgroundApiHarnessOptions) {
	vi.resetModules();
	vi.doMock('@/registry/technologies', () => ({
		SOURCE_LIMITS: SOURCE_LIMITS_STUB,
		technologies: [],
	}));

	const pollingState: observe.StateType = {
		status: 'idle',
		throttleMs: 1_500,
		pendingMutationCount: 0,
	};
	const observingState: observe.StateType = {
		...pollingState,
		sessionId: 'session-1',
		expectedUrl: HTTP_TAB.url!,
		status: 'observing',
		startedAt: 1_700_000_000_000,
		expiresAt: Number.MAX_SAFE_INTEGER,
	};
	const stoppedState: observe.StateType = {
		...pollingState,
		status: 'stopped',
	};

	const contentApi = {
		collectObservationBatch: vi.fn(async () => extensionSuccess({ batch: makeObservationBatch() })),
		flushObservationBatch: vi.fn(async () => extensionSuccess({
			stats: {
				queuedCount: 0,
				acceptedCount: 0,
				duplicateDropCount: 0,
				queueLimitDropCount: 0,
				stormLimitDropCount: 0,
				acceptedInStormWindow: 0,
			},
			session: observingState,
		})),
		beginObservationSession: vi.fn(async () => extensionSuccess(observingState)),
		stopObservationSession: vi.fn(async () => extensionSuccess(stoppedState)),
		getObservationSessionState: vi.fn(async () => extensionSuccess(pollingState)),
		...input.contentApi,
	} satisfies ContentApi;

	const executeScript = vi.fn(async () => [{ frameId: 0, result: undefined }]);
	const getTab = vi.fn(async (tabId: number) => {
		if (input.tab === null) throw new Error('Tab is unavailable.');
		const tab = input.tab ?? HTTP_TAB;
		if (tab.id !== tabId) throw new Error(`Tab ${tabId} is unavailable.`);
		return { ...tab, active: tab.active ?? true };
	});
	const sendMessage = vi.fn(async () => ({ ok: false, message: 'offscreen unavailable in test' }));
	vi.doMock('wxt/browser', () => ({
		browser: {
			runtime: {
				sendMessage,
				getURL: vi.fn((path: string) => `chrome-extension://kaiju-deepscope${path}`),
			},
			offscreen: undefined,
			scripting: {
				executeScript,
			},
			tabs: {
				get: getTab,
			},
		},
	}));

	const analyzeSite = vi.fn((signals: PageSignals) => makeAnalysis(signals));
	vi.doMock('@/lib/detection/engine', () => ({
		analyzeSite,
	}));

	const { buildCollectionPlan: buildPlan } = await import('@/lib/collectors/planning');
	const { createCompiledDetectionGraph } = await import('@/lib/detection/registry-graph');
	const runtimeRegistryArtifact: RuntimeTechnologyRegistryArtifact = {
		technologies: [],
		patternTables: {},
		relationshipGraph: createCompiledDetectionGraph([], []),
		collectionPlan: input.collectionPlan ?? buildPlan([]),
		diagnosticCount: 0,
	};
	const getRuntimeRegistry = vi.fn(async () => runtimeRegistryArtifact);

	const getCachedReplayTrace = vi.fn(async () => input.cachedReplayTrace ?? null);
	const getCachedReplayTraceHistory = vi.fn(async () =>
		input.cachedReplayHistory ?? (input.cachedReplayTrace ? [input.cachedReplayTrace] : []),
	);
	const getStatus = vi.fn(async () => ({ totalAnalyses: 0, trackedOrigins: 0 }));
	const saveReplayTrace = vi.fn(async (trace: DetectionReplayTrace) => trace);
	const saveMatcherJobRecord = vi.fn(async (record: MatcherJobRecord) => record);
	const updateMatcherJobRecord = vi.fn(input.updateMatcherJobRecord ?? (async () => null));
	const getBestVisibleDetectionSessionSnapshot = vi.fn(async () => input.cachedAnalysis
		? makeDetectionSnapshotFromAnalysis(input.cachedAnalysis)
		: null);
	const getLatestDetectionSessionSnapshot = vi.fn(async () => null);
	const saveDetectionSessionSnapshot = vi.fn(input.saveSnapshot ?? (async (snapshot: DetectionSessionSnapshot) => ({
		accepted: true,
		sessionStorageKey: getDetectionSessionSnapshotKey(snapshot.key),
		originStorageKey: getDetectionOriginSnapshotKey(snapshot.key.originHash),
		snapshot,
	})));

	const { collectExtensionObservationBatch } = await import('@/lib/collectors/extension-page-collector');
	const cancelMatcherJob = vi.fn(async () => undefined);
	const runMatcherJob = vi.fn(async (request: RunMatcherJobRequest) => makeMatcherRunResult(request));
	const { createBackgroundRuntime } = await import('@/lib/background/runtime');
	const runtime = createBackgroundRuntime({
		getTab,
		executeContentScript: async () => {
			await executeScript();
		},
		createContentApiClient: () => contentApi,
		collectObservationBatch: collectExtensionObservationBatch,
		registryProvider: { getRuntimeRegistry },
		matcher: {
			cancelJob: cancelMatcherJob,
			runJob: runMatcherJob,
		},
		persistence: {
			getBestVisibleSnapshot: getBestVisibleDetectionSessionSnapshot,
			getSessionIndex: vi.fn(async () => ({ tabId: HTTP_TAB.id!, entries: [], updatedAt: 0 })),
			getLatestOriginSnapshot: vi.fn(async () => null),
			getLatestSessionSnapshot: getLatestDetectionSessionSnapshot,
			saveSnapshot: saveDetectionSessionSnapshot,
			getReplayTrace: getCachedReplayTrace,
			getReplayHistory: getCachedReplayTraceHistory,
			saveReplayTrace,
			clearStoredData: vi.fn(async () => 0),
			getStatus,
			saveMatcherJob: saveMatcherJobRecord,
			updateMatcherJob: updateMatcherJobRecord,
		},
		logEvent: () => undefined,
		logAnalysisSummary: () => undefined,
		setBadge: async () => undefined,
	});

	return {
		api: runtime.api,
		runtime,
		contentApi,
		mocks: {
			sendMessage,
			analyzeSite,
			executeScript,
			cancelMatcherJob,
			getCachedReplayTrace,
			getCachedReplayTraceHistory,
			getBestVisibleDetectionSessionSnapshot,
			getStatus,
			getRuntimeRegistry,
			saveDetectionSessionSnapshot,
			runMatcherJob,
			saveMatcherJobRecord,
			saveReplayTrace,
			updateMatcherJobRecord,
		},
	};
}

afterEach(() => {
	vi.useRealTimers();
	vi.unstubAllGlobals();
	vi.doUnmock('wxt/browser');
	vi.doUnmock('@/registry/technologies');
	vi.doUnmock('@/lib/detection/engine');
	vi.resetModules();
});

describe.sequential('background visible-tab identity', () => {
	it('returns the visible tab identity without contacting the content script', async () => {
		const collectObservationBatch = vi.fn(async (_input: unknown) => extensionSuccess({ batch: makeObservationBatch() }));
		const harness = await loadBackgroundApiHarness({ tab: HTTP_TAB, contentApi: { collectObservationBatch } });

		await expect(harness.api.getVisibleTabIdentity({ tabId: 7, windowId: 3 })).resolves.toMatchObject({
			ok: true,
			value: {
				windowId: 3,
				tabId: 7,
				frameId: 0,
				url: HTTP_TAB.url,
				hostname: 'example.com',
				originHash: createDetectionStorageHash('https://example.com'),
				urlHash: createDetectionStorageHash(HTTP_TAB.url!),
				incognito: false,
			},
		});
		expect(collectObservationBatch).not.toHaveBeenCalled();
		expect(harness.mocks.getRuntimeRegistry).not.toHaveBeenCalled();
	});

	it('rejects an explicit tab id after that tab becomes inactive', async () => {
		const harness = await loadBackgroundApiHarness({ tab: { ...HTTP_TAB, active: false } });

		await expect(harness.api.getVisibleTabIdentity({ tabId: 7, windowId: 3 })).resolves.toMatchObject({
			ok: false,
			error: { code: 'NO_ACTIVE_TAB' },
		});
	});

	it('rejects a tab that moved out of the side-panel window', async () => {
		const harness = await loadBackgroundApiHarness({ tab: { ...HTTP_TAB, windowId: 4 } });

		await expect(harness.api.getVisibleTabIdentity({ tabId: 7, windowId: 3 })).resolves.toMatchObject({
			ok: false,
			error: { code: 'NO_ACTIVE_TAB' },
		});
	});
});

describe.sequential('background analyzeVisibleTab messaging hardening', () => {
	it('returns NO_ACTIVE_TAB when there is no selected tab', async () => {
		const api = await loadBackgroundApi({ tab: null });

		await expect(
			api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'while-panel-open' }),
		).resolves.toMatchObject({
			ok: false,
			error: {
				code: 'NO_ACTIVE_TAB',
			},
		});
	});

	it('rejects analysis after the target tab moves to another browser window', async () => {
		const api = await loadBackgroundApi({ tab: { ...HTTP_TAB, windowId: 4 } });

		await expect(
			api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'while-panel-open' }),
		).resolves.toMatchObject({
			ok: false,
			error: { code: 'NO_ACTIVE_TAB' },
		});
	});

	it('returns UNSUPPORTED_URL before contacting the content script', async () => {
		const collectObservationBatch = vi.fn(async (_input: unknown) => extensionSuccess({ batch: makeObservationBatch() }));
		const api = await loadBackgroundApi({
			tab: { id: 7, windowId: 3, url: 'chrome://extensions' },
			contentApi: { collectObservationBatch },
		});

		await expect(
			api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'while-panel-open' }),
		).resolves.toMatchObject({
			ok: false,
			error: {
				code: 'UNSUPPORTED_URL',
			},
		});
		expect(collectObservationBatch).not.toHaveBeenCalled();
	});

	it('returns CONTENT_SCRIPT_UNAVAILABLE when content-script RPC rejects', async () => {
		const api = await loadBackgroundApi({
			tab: HTTP_TAB,
			contentApi: {
				collectObservationBatch: vi.fn(async () => {
					throw new Error('Could not establish connection. Receiving end does not exist.');
				}),
			},
		});

		await expect(
			api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'while-panel-open' }),
		).resolves.toMatchObject({
			ok: false,
			error: {
				code: 'CONTENT_SCRIPT_UNAVAILABLE',
				message: 'Could not establish connection. Receiving end does not exist.',
			},
		});
	});

	it('returns CONTENT_SCRIPT_UNAVAILABLE when content-script RPC times out', async () => {
		vi.useFakeTimers();
		const api = await loadBackgroundApi({
			tab: HTTP_TAB,
			contentApi: {
				collectObservationBatch: vi.fn(() => new Promise<ExtensionResult<{ batch: ObservationBatch }>>(() => undefined)),
			},
		});

		const result = api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'while-panel-open' });
		await vi.advanceTimersByTimeAsync(CONTENT_SCRIPT_TIMEOUT_MS);

		await expect(result).resolves.toMatchObject({
			ok: false,
			error: {
				code: 'CONTENT_SCRIPT_UNAVAILABLE',
				message: 'Content script did not respond before the messaging timeout.',
			},
		});
	});

	it('returns stored snapshot analysis without probing content runtime in snapshot-first mode', async () => {
		const collectObservationBatch = vi.fn(async () => extensionSuccess({ batch: makeObservationBatch() }));
		const cachedAnalysis = { ...makeAnalysis(), source: 'cache' as const };
		const cachedReplayTrace = makeDetectionReplayTrace({ completedMode: 'event' });
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			cachedAnalysis,
			cachedReplayTrace,
			contentApi: { collectObservationBatch },
		});

		const result = await harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'while-panel-open' });

		expect(result).toMatchObject({
			ok: true,
			value: {
				analysis: {
					source: 'cache',
				},
				snapshot: {
					status: 'hit',
				},
				replayTrace: {
					completedMode: 'event',
				},
				session: undefined,
			},
		});

		expect(collectObservationBatch).not.toHaveBeenCalled();
		expect(harness.mocks.getRuntimeRegistry).not.toHaveBeenCalled();
		expect(harness.mocks.saveMatcherJobRecord).not.toHaveBeenCalled();
		expect(harness.mocks.saveDetectionSessionSnapshot).not.toHaveBeenCalled();
		expect(harness.contentApi.getObservationSessionState).not.toHaveBeenCalled();
		expect(harness.contentApi.beginObservationSession).not.toHaveBeenCalled();
		expect(harness.mocks.getCachedReplayTrace).toHaveBeenCalledWith(HTTP_TAB.url);
	});

	it('returns stored snapshot analysis without reopening observation when observation is disabled', async () => {
		const cachedAnalysis = { ...makeAnalysis(), source: 'cache' as const };
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			cachedAnalysis,
		});

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'none' }),
		).resolves.toMatchObject({
			ok: true,
			value: {
				analysis: { source: 'cache' },
				snapshot: { status: 'hit' },
				session: undefined,
			},
		});

		expect(harness.contentApi.beginObservationSession).not.toHaveBeenCalled();
	});

	it('returns queued cache-miss output and persists normalized output later', async () => {
		const harness = await loadBackgroundApiHarness({ tab: HTTP_TAB });

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'none' }),
		).resolves.toMatchObject({
			ok: true,
			value: {
				analysis: {
					source: 'fresh',
				},
				snapshot: {
					status: 'miss',
					key: 'analysis:https://example.com',
				},
				session: undefined,
			},
		});

		expect(harness.mocks.getBestVisibleDetectionSessionSnapshot).toHaveBeenCalledWith(VISIBLE_TAB_TARGET);
		expect(harness.contentApi.collectObservationBatch).toHaveBeenCalledOnce();
		expect(harness.mocks.getRuntimeRegistry).toHaveBeenCalledOnce();
		expect(harness.mocks.analyzeSite).not.toHaveBeenCalled();
		await vi.waitFor(() => expect(harness.mocks.saveDetectionSessionSnapshot).toHaveBeenCalledWith(expect.objectContaining({
			analysis: expect.objectContaining({ source: 'fresh' }),
		})));
		expect(harness.mocks.saveDetectionSessionSnapshot).toHaveBeenCalledTimes(2);
		expect(harness.mocks.saveDetectionSessionSnapshot.mock.calls[0]?.[0]).toMatchObject({
			matcherProgress: { phase: 'recording' },
		});
		expect(harness.mocks.saveDetectionSessionSnapshot.mock.calls[1]?.[0]).not.toHaveProperty('matcherProgress');
		expect(harness.mocks.saveReplayTrace).toHaveBeenCalledWith(expect.objectContaining({
			completedMode: 'event',
		}));
		expect(harness.contentApi.beginObservationSession).not.toHaveBeenCalled();
	});

	it('releases matcher-owned batch and registry state when recording persistence fails', async () => {
		const updateMatcherJobRecord = vi.fn(async () => null);
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			updateMatcherJobRecord,
			saveSnapshot: async (snapshot) => {
				if (snapshot.matcherProgress?.phase === 'recording') throw new Error('recording write failed');
				return {
					accepted: true,
					sessionStorageKey: getDetectionSessionSnapshotKey(snapshot.key),
					originStorageKey: getDetectionOriginSnapshotKey(snapshot.key.originHash),
					snapshot,
				};
			},
		});

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'none' }),
		).resolves.toMatchObject({ ok: true, value: { snapshot: { status: 'miss' } } });
		await vi.waitFor(() => expect(updateMatcherJobRecord).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({ status: 'failed', reason: 'persistence-failed' }),
		));

		harness.mocks.sendMessage.mockClear();
		harness.runtime.onTabNavigation(HTTP_TAB.id!);
		expect(harness.mocks.sendMessage).not.toHaveBeenCalledWith(expect.objectContaining({
			type: 'matcher.cancel-job',
		}));
	});

	it('collects enrichment after registration but waits to dispatch until initial matching completes', async () => {
		const initialCompletion = makeDeferred();
		let completedUpdateCount = 0;
		const updateMatcherJobRecord = vi.fn(async (_jobId: string, patch?: unknown) => {
			if ((patch as { status?: string } | undefined)?.status === 'completed') {
				completedUpdateCount += 1;
				if (completedUpdateCount === 1) {
					await initialCompletion.promise;
				}
			}

			return null;
		});
		const collectObservationBatch = vi.fn(async (_input: unknown) => extensionSuccess({ batch: makeObservationBatch() }));
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			collectionPlan: makeTextEnrichmentCollectionPlan(),
			contentApi: { collectObservationBatch },
			updateMatcherJobRecord,
		});

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'none' }),
		).resolves.toMatchObject({
			ok: true,
			value: {
				analysis: { source: 'fresh' },
				snapshot: { status: 'miss' },
				enrichment: { status: 'pending' },
			},
		});

		expect(collectObservationBatch).toHaveBeenCalledOnce();
		await vi.waitFor(() => expect(updateMatcherJobRecord).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({ status: 'dispatching' }),
		));
		await vi.waitFor(() => expect(collectObservationBatch).toHaveBeenCalledTimes(2));
		expect(harness.mocks.saveMatcherJobRecord).toHaveBeenCalledOnce();
		expect(collectObservationBatch.mock.calls[1]?.[0]).toMatchObject({
			includeText: true,
			tier: 'enrichment',
		});
		initialCompletion.resolve(undefined);
		await vi.waitFor(() => expect(harness.mocks.saveMatcherJobRecord).toHaveBeenCalledTimes(2));
		expect(updateMatcherJobRecord).not.toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({ status: 'canceled', reason: 'newer-job' }),
		);
	});

	it('merges multiple enrichment evidence passes into one follow-up matcher run', async () => {
		const collectObservationBatch = vi.fn(async (_input: unknown) => extensionSuccess({ batch: makeObservationBatch() }));
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			collectionPlan: makeMultiSurfaceEnrichmentCollectionPlan(),
			contentApi: { collectObservationBatch },
		});

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'none' }),
		).resolves.toMatchObject({
			ok: true,
			value: {
				analysis: { source: 'fresh' },
				snapshot: { status: 'miss' },
			},
		});

		await vi.waitFor(() => expect(collectObservationBatch).toHaveBeenCalledTimes(3));
		await vi.waitFor(() => expect(harness.mocks.saveMatcherJobRecord).toHaveBeenCalledTimes(2));
		await vi.waitFor(() => expect(harness.mocks.saveDetectionSessionSnapshot).toHaveBeenCalledTimes(4));
		expect(harness.mocks.saveReplayTrace).toHaveBeenCalledOnce();
		const savedSnapshots = harness.mocks.saveDetectionSessionSnapshot.mock.calls.map(([snapshot]) =>
			snapshot as DetectionSessionSnapshot
		);
		expect(savedSnapshots.map((snapshot) => snapshot.enrichment.status)).toEqual([
			'pending', 'pending', 'complete', 'complete',
		]);
		expect(savedSnapshots[0]?.matcherProgress?.phase).toBe('recording');
		expect(savedSnapshots[1]?.replaySummary).toBeUndefined();
		expect(savedSnapshots[2]?.matcherProgress?.phase).toBe('recording');
		expect(savedSnapshots[3]?.replaySummary).toMatchObject({ resultCount: expect.any(Number) });
		expect(collectObservationBatch.mock.calls.map(([input]) => (input as { tier?: string }).tier)).toEqual([
			'initial',
			'enrichment',
			'enrichment',
		]);
	});

	it('cancels active visible-session matcher work when a newer analysis supersedes it', async () => {
		const firstDispatchRegistered = makeDeferred();
		let dispatchingUpdateCount = 0;
		const updateMatcherJobRecord = vi.fn(async (_jobId: string, patch?: unknown) => {
			if ((patch as { status?: string } | undefined)?.status === 'dispatching') {
				dispatchingUpdateCount += 1;
				if (dispatchingUpdateCount === 1) {
					await firstDispatchRegistered.promise;
				}
			}

			return null;
		});
		const collectObservationBatch = vi.fn(async (_input: unknown) => extensionSuccess({ batch: makeObservationBatch() }));
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			contentApi: { collectObservationBatch },
			updateMatcherJobRecord,
		});

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'none' }),
		).resolves.toMatchObject({
			ok: true,
			value: { snapshot: { status: 'miss' } },
		});
		await vi.waitFor(() => expect(updateMatcherJobRecord).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({ status: 'dispatching' }),
		));

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'none' }),
		).resolves.toMatchObject({
			ok: true,
			value: { snapshot: { status: 'bypassed' } },
		});

		await vi.waitFor(() => expect(updateMatcherJobRecord).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({ status: 'canceled', reason: 'newer-job' }),
		));
		const canceledJobId = updateMatcherJobRecord.mock.calls.find(([, patch]) =>
			(patch as { status?: string; reason?: string } | undefined)?.status === 'canceled' &&
			(patch as { status?: string; reason?: string } | undefined)?.reason === 'newer-job'
		)?.[0];

		firstDispatchRegistered.resolve(undefined);
		await vi.waitFor(() => expect(updateMatcherJobRecord).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({ status: 'completed' }),
		));
		const completedJobIds = updateMatcherJobRecord.mock.calls
			.filter(([, patch]) => (patch as { status?: string } | undefined)?.status === 'completed')
			.map(([jobId]) => jobId);
		expect(completedJobIds).not.toContain(canceledJobId);
	});

	it('skips persistent analysis and replay writes for incognito visible tabs', async () => {
		const harness = await loadBackgroundApiHarness({
			tab: { ...HTTP_TAB, incognito: true },
		});

		await expect(
			harness.api.analyzeVisibleTab({ target: { ...VISIBLE_TAB_TARGET, incognito: true }, mode: 'snapshot-first', observe: 'while-panel-open' }),
		).resolves.toMatchObject({
			ok: true,
			value: {
				analysis: {
					source: 'fresh',
				},
				snapshot: {
					status: 'miss',
				},
				sessionTarget: {
					tabId: HTTP_TAB.id,
					sessionId: 'session-1',
					incognito: true,
				},
				replayHistory: [],
			},
		});

		expect(harness.mocks.getBestVisibleDetectionSessionSnapshot).not.toHaveBeenCalled();
		expect(harness.mocks.saveDetectionSessionSnapshot).not.toHaveBeenCalled();
		expect(harness.mocks.saveReplayTrace).not.toHaveBeenCalled();
		expect(harness.contentApi.beginObservationSession).toHaveBeenCalledOnce();
	});

	it('queues a refresh while returning the latest stored output when one exists', async () => {
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			cachedAnalysis: { ...makeAnalysis(), source: 'cache' as const },
		});

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'none' }),
		).resolves.toMatchObject({
			ok: true,
			value: {
				analysis: {
					source: 'cache',
				},
				snapshot: {
					status: 'hit',
				},
				enrichment: {
					status: 'pending',
				},
			},
		});

		expect(harness.mocks.getBestVisibleDetectionSessionSnapshot).toHaveBeenCalledWith(VISIBLE_TAB_TARGET);
		expect(harness.contentApi.collectObservationBatch).toHaveBeenCalledOnce();
		await vi.waitFor(() => expect(harness.mocks.saveDetectionSessionSnapshot).toHaveBeenCalledTimes(2));
	});

	it('routes fresh analysis through the event pipeline', async () => {
		const harness = await loadBackgroundApiHarness({ tab: HTTP_TAB });

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'none' }),
		).resolves.toMatchObject({
			ok: true,
			value: {
				analysis: {
					url: HTTP_TAB.url,
					hostname: 'example.com',
					source: 'fresh',
					results: [],
				},
				snapshot: {
					status: 'bypassed',
					key: 'analysis:https://example.com',
				},
				session: undefined,
			},
		});

		expect(harness.contentApi.collectObservationBatch).toHaveBeenCalledOnce();
		expect(harness.mocks.analyzeSite).not.toHaveBeenCalled();
		await vi.waitFor(() => expect(harness.mocks.saveDetectionSessionSnapshot).toHaveBeenCalledWith(expect.objectContaining({
			analysis: expect.objectContaining({
				url: HTTP_TAB.url,
				hostname: 'example.com',
				source: 'fresh',
				results: [],
			}),
		})));
		expect(harness.mocks.saveReplayTrace).toHaveBeenCalledWith(expect.objectContaining({
			completedMode: 'event',
		}));
		expect(harness.contentApi.beginObservationSession).not.toHaveBeenCalled();
	});

	it('returns VALIDATION_ERROR when collected signals belong to a different document', async () => {
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			contentApi: {
				collectObservationBatch: vi.fn(async () => extensionSuccess({ batch: makeObservationBatch(makeSignals({
					url: 'https://other.example/products',
					hostname: 'other.example',
				})) })),
			},
		});

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'none' }),
		).resolves.toMatchObject({
			ok: false,
			error: {
				code: 'VALIDATION_ERROR',
			},
		});

		expect(harness.mocks.analyzeSite).not.toHaveBeenCalled();
		expect(harness.mocks.saveDetectionSessionSnapshot).not.toHaveBeenCalled();
	});

	it('starts an observation session after a fresh refresh analysis', async () => {
		const harness = await loadBackgroundApiHarness({ tab: HTTP_TAB });

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'while-panel-open' }),
		).resolves.toMatchObject({
			ok: true,
			value: {
				analysis: {
					source: 'fresh',
				},
				snapshot: {
					status: 'bypassed',
				},
				session: {
					status: 'observing',
				},
			},
		});

		expect(harness.mocks.getRuntimeRegistry).toHaveBeenCalledOnce();
	});

	it('returns replay history for the requested visible analysis URL', async () => {
		const trace = makeDetectionReplayTrace({ resultCount: 2 });
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			cachedReplayHistory: [trace],
		});

		await expect(harness.api.getReplayTraceHistory({ url: HTTP_TAB.url! })).resolves.toMatchObject({
			ok: true,
			value: [
				expect.objectContaining({ resultCount: 2 }),
			],
		});
		expect(harness.mocks.getCachedReplayTraceHistory).toHaveBeenCalledWith(HTTP_TAB.url!);
	});

	it('carries source-content requirements into the live observation session', async () => {
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			collectionPlan: makeSourceEnrichmentCollectionPlan(),
		});

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'while-panel-open' }),
		).resolves.toMatchObject({ ok: true });

		expect(harness.contentApi.beginObservationSession).toHaveBeenCalledWith(expect.objectContaining({
			includeScriptContent: true,
			includeStylesheetContent: true,
		}));
	});

	it('starts a panel-owned observation for an explicit while-panel-open request', async () => {
		const harness = await loadBackgroundApiHarness({ tab: HTTP_TAB });

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'while-panel-open' }),
		).resolves.toMatchObject({
			ok: true,
			value: {
				snapshot: {
					status: 'bypassed',
				},
				session: {
					status: 'observing',
				},
			},
		});

		expect(harness.contentApi.beginObservationSession).toHaveBeenCalledOnce();
	});
});

describe.sequential('background observation session baseline', () => {
	it('recovers dirty observation sessions with a fresh event analysis when no late batch is queued', async () => {
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			contentApi: {
				getObservationSessionState: vi.fn(async () => extensionSuccess({
					status: 'dirty' as const,
					throttleMs: 1_500,
					pendingMutationCount: 2,
					sessionId: 'session-1',
					expectedUrl: HTTP_TAB.url!,
				})),
			},
		});

		await expect(harness.api.refreshObservationSession(OBSERVATION_TARGET)).resolves.toMatchObject({
			ok: true,
			value: {
				snapshot: {
					status: 'bypassed',
				},
				session: {
					status: 'observing',
				},
			},
		});

		expect(harness.contentApi.collectObservationBatch).toHaveBeenCalledOnce();
		expect(harness.contentApi.beginObservationSession).toHaveBeenCalledOnce();
	});



	it('reruns the event pipeline over combined baseline and late observations', async () => {
		const harness = await loadBackgroundApiHarness({ tab: HTTP_TAB });

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'while-panel-open' }),
		).resolves.toMatchObject({ ok: true });

		const dirtyState: observe.StateType = {
			status: 'dirty',
			throttleMs: 1_500,
			pendingMutationCount: 1,
			sessionId: 'session-1',
			expectedUrl: HTTP_TAB.url!,
		};
		const lateTarget = { url: HTTP_TAB.url!, hostname: 'example.com' };
		const lateBatch: ObservationBatch = {
			target: lateTarget,
			interface: 'extension',
			observedAt: 1_700_000_000_500,
			observations: [{
				kind: 'scriptSrc',
				interface: 'extension',
				collector: 'content-observer',
				target: lateTarget,
				observedAt: 1_700_000_000_500,
				value: 'https://example.com/late.js',
			}],
		};

		vi.mocked(harness.contentApi.getObservationSessionState).mockResolvedValueOnce(extensionSuccess(dirtyState));
		vi.mocked(harness.contentApi.flushObservationBatch).mockResolvedValueOnce(extensionSuccess({
			batch: lateBatch,
			stats: {
				queuedCount: 1,
				acceptedCount: 1,
				duplicateDropCount: 0,
				queueLimitDropCount: 0,
				stormLimitDropCount: 0,
				acceptedInStormWindow: 1,
			},
			session: dirtyState,
		}));

		await expect(harness.api.refreshObservationSession(OBSERVATION_TARGET)).resolves.toMatchObject({
			ok: true,
			value: {
				snapshot: { status: 'bypassed' },
			},
		});

		expect(harness.contentApi.collectObservationBatch).toHaveBeenCalledOnce();
		expect(harness.contentApi.flushObservationBatch).toHaveBeenCalledOnce();
		expect(harness.contentApi.beginObservationSession).toHaveBeenCalledOnce();
		expect(harness.mocks.getRuntimeRegistry).toHaveBeenCalledTimes(2);
		await vi.waitFor(() => expect(harness.mocks.saveDetectionSessionSnapshot).toHaveBeenCalledTimes(4));
		expect(harness.mocks.analyzeSite).not.toHaveBeenCalled();
	});

	it('merges queued late observations after service-worker batch recovery', async () => {
		const dirtyState: observe.StateType = {
			status: 'dirty',
			throttleMs: 1_500,
			pendingMutationCount: 1,
			sessionId: 'session-1',
			expectedUrl: HTTP_TAB.url!,
		};
		const lateTarget = { url: HTTP_TAB.url!, hostname: 'example.com' };
		const lateBatch: ObservationBatch = {
			target: lateTarget,
			interface: 'extension',
			observedAt: 1_700_000_000_500,
			observations: [{
				kind: 'scriptSrc',
				interface: 'extension',
				collector: 'content-observer',
				target: lateTarget,
				observedAt: 1_700_000_000_500,
				value: 'https://example.com/late.js',
			}],
		};
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			contentApi: {
				getObservationSessionState: vi.fn(async () => extensionSuccess(dirtyState)),
				flushObservationBatch: vi.fn(async () => extensionSuccess({
					batch: lateBatch,
					stats: {
						queuedCount: 1,
						acceptedCount: 1,
						duplicateDropCount: 0,
						queueLimitDropCount: 0,
						stormLimitDropCount: 0,
						acceptedInStormWindow: 1,
					},
					session: dirtyState,
				})),
			},
		});

		await expect(harness.api.refreshObservationSession(OBSERVATION_TARGET)).resolves.toMatchObject({
			ok: true,
			value: {
				snapshot: { status: 'bypassed' },
			},
		});

		expect(harness.contentApi.collectObservationBatch).toHaveBeenCalledOnce();
		expect(harness.contentApi.flushObservationBatch).toHaveBeenCalledOnce();
		expect(harness.contentApi.beginObservationSession).not.toHaveBeenCalled();
		await vi.waitFor(() => expect(harness.mocks.saveDetectionSessionSnapshot).toHaveBeenCalledTimes(2));
	});

	it('rejects observation refresh when the session belongs to a previous page path', async () => {
		const harness = await loadBackgroundApiHarness({
			tab: { id: 7, windowId: 3, url: 'https://example.com/pricing' },
			contentApi: {
				getObservationSessionState: vi.fn(async () => extensionSuccess({
					status: 'dirty' as const,
					throttleMs: 1_500,
					pendingMutationCount: 2,
					sessionId: 'session-1',
					expectedUrl: 'https://example.com/products',
				})),
			},
		});

		await expect(harness.api.refreshObservationSession(OBSERVATION_TARGET)).resolves.toMatchObject({
			ok: false,
			error: {
				code: 'OBSERVATION_SESSION_UNAVAILABLE',
				message: 'The visible tab navigated away from the observed document.',
			},
		});

		expect(harness.contentApi.collectObservationBatch).not.toHaveBeenCalled();
		expect(harness.contentApi.beginObservationSession).not.toHaveBeenCalled();
	});

	it('rejects observation refresh when the targeted session is unavailable', async () => {
		const harness = await loadBackgroundApiHarness({ tab: HTTP_TAB });

		await expect(harness.api.refreshObservationSession(OBSERVATION_TARGET)).resolves.toMatchObject({
			ok: false,
			error: {
				code: 'OBSERVATION_SESSION_UNAVAILABLE',
			},
		});

		expect(harness.contentApi.collectObservationBatch).not.toHaveBeenCalled();
		expect(harness.mocks.saveDetectionSessionSnapshot).not.toHaveBeenCalled();
	});

	it('does not refresh a live observation after its browser tab becomes inactive', async () => {
		const harness = await loadBackgroundApiHarness({
			tab: { ...HTTP_TAB, active: false },
			contentApi: {
				getObservationSessionState: vi.fn(async () => extensionSuccess({
					status: 'dirty' as const,
					throttleMs: 1_500,
					pendingMutationCount: 2,
					sessionId: 'session-1',
					expectedUrl: HTTP_TAB.url!,
				})),
			},
		});

		await expect(harness.api.refreshObservationSession(OBSERVATION_TARGET)).resolves.toMatchObject({
			ok: false,
			error: {
				code: 'OBSERVATION_SESSION_UNAVAILABLE',
			},
		});

		expect(harness.contentApi.getObservationSessionState).not.toHaveBeenCalled();
		expect(harness.contentApi.flushObservationBatch).not.toHaveBeenCalled();
		expect(harness.mocks.saveDetectionSessionSnapshot).not.toHaveBeenCalled();
	});

	it('forwards stop requests to the targeted content script session', async () => {
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			contentApi: {
				getObservationSessionState: vi.fn(async () => extensionSuccess({
					status: 'observing' as const,
					throttleMs: 1_500,
					pendingMutationCount: 0,
					sessionId: 'session-1',
					expectedUrl: HTTP_TAB.url!,
				})),
			},
		});

		await expect(harness.api.stopObservationSession(OBSERVATION_TARGET)).resolves.toMatchObject({
			ok: true,
			value: {
				status: 'stopped',
			},
		});

		expect(harness.contentApi.stopObservationSession).toHaveBeenCalledOnce();
		expect(harness.contentApi.stopObservationSession).toHaveBeenCalledWith(OBSERVATION_TARGET);
	});
});
