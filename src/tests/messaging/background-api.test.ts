import { afterEach, describe, expect, it, vi } from 'vitest';

import { buildCollectionPlan, type CollectionPlan } from '@/lib/collectors/planning';
import type * as observe from '@/lib/content/observe';
import {
	DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION,
	type DetectionSessionSnapshot,
} from '@/lib/storage/session';
import type { PageSignals, SiteAnalysis } from '@/lib/detection/types';
import type { ContentApi } from '@/lib/messaging';
import { OBSERVATION_DIRTY_NOTIFICATION_TYPE } from '@/lib/messaging/observation-notifications';
import { CONTENT_SCRIPT_TIMEOUT_MS } from '@/lib/messaging/rpc';
import {
	createDetectionStorageHash,
	getDetectionOriginSnapshotKey,
	getDetectionSessionSnapshotKey,
	MATCHER_JOB_CACHE_PREFIX,
} from '@/lib/storage/contracts';
import type { ObservationBatch } from '@/lib/observations';
import {
	createMatcherPartitionTasks,
	createMatcherPipelineResult,
	type MatcherJobLifecycleRecord,
	type MatcherJobExecutorResult,
	type MatcherJobObserver,
	type MatcherJobRecord,
	type MatcherJobRunResult,
	type MatcherPartitionResult,
	type RunMatcherJobRequest,
} from '@/lib/matcher';
import type { DetectionReplayTrace } from '@/lib/pipeline';
import type { RuntimeTechnologyRegistryArtifact } from '@/lib/registry/runtime-artifact';
import type { MatcherJobStore } from '@/lib/persistence/ports';
import { extensionSuccess, type ExtensionResult } from '@/lib/messaging/result';
import { makeDetectionReplayTrace } from '../support/factories';
import { createMockBrowserStorageArea } from '../support/mock-browser';

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
	/** Exercise matcher persistence through the production browser adapter. */
	matcherPersistence?: 'browser';
	getRuntimeRegistry?: () => Promise<RuntimeTechnologyRegistryArtifact>;
	updateMatcherJobRecord?: MatcherJobStore['updateMatcherJob'];
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

/**
 * Snapshot writes other than streamed partition progress, in write order.
 *
 * The matcher scheduler streams each completed partition, so a run publishes
 * `matching` progress revisions before its `recording` and final revisions. How
 * many depends on partition count and coalescing; these tests assert the
 * recording/final lifecycle, not that count.
 */
function terminalSnapshots(save: { readonly mock: { readonly calls: readonly (readonly unknown[])[] } }): DetectionSessionSnapshot[] {
	return save.mock.calls
		.map(([snapshot]) => snapshot as DetectionSessionSnapshot)
		.filter((snapshot) => snapshot.matcherProgress?.phase !== 'matching');
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
	const storage = createMockBrowserStorageArea();
	vi.doMock('wxt/browser', () => ({
		browser: {
			storage: { local: storage.local },
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
	const getRuntimeRegistry = vi.fn(input.getRuntimeRegistry ?? (async () => runtimeRegistryArtifact));

	const getCachedReplayTrace = vi.fn(async () => input.cachedReplayTrace ?? null);
	const getCachedReplayTraceHistory = vi.fn(async () =>
		input.cachedReplayHistory ?? (input.cachedReplayTrace ? [input.cachedReplayTrace] : []),
	);
	const getStatus = vi.fn(async () => ({ totalAnalyses: 0, trackedOrigins: 0 }));
	const saveReplayTrace = vi.fn(async (trace: DetectionReplayTrace) => trace);
	const matcherStore = input.matcherPersistence === 'browser'
		? (await import('@/lib/persistence/browser')).browserMatcherJobStore
		: undefined;
	const saveMatcherJobRecord = vi.fn(matcherStore?.saveMatcherJob ?? (async (record: MatcherJobRecord): Promise<MatcherJobLifecycleRecord> => ({
		schemaVersion: 2,
		jobId: record.jobId,
		tabId: record.tabId,
		windowId: record.windowId,
		...(record.sessionId ? { sessionId: record.sessionId } : {}),
		contextId: record.contextId,
		status: record.status,
		mode: record.mode,
		createdAt: record.createdAt,
		updatedAt: record.updatedAt,
		observationCount: record.observationCount,
		partitionCount: record.partitionCount,
		completedPartitionCount: record.completedPartitionCount,
	})));
	const updateMatcherJobRecord = vi.fn(matcherStore?.updateMatcherJob ?? input.updateMatcherJobRecord ?? (async () => null));
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

	const timingDebug = vi.fn();
	vi.doMock('@/lib/diagnostics/logging', () => ({ get: () => ({ debug: timingDebug }) }));
	const { collectExtensionObservationBatch } = await import('@/lib/collectors/extension-page-collector');
	const cancelMatcherJob = vi.fn(async () => undefined);
	const cancelMatcherTab = vi.fn(async () => undefined);
	const touchMatcherLifecycle = vi.fn(async () => undefined);
	const releaseMatcherLifecycle = vi.fn(async () => undefined);
	const runMatcherJob = vi.fn(async (request: RunMatcherJobRequest, _observer?: MatcherJobObserver) => makeMatcherRunResult(request));
	/**
	 * Behave like the background scheduler: stream every partition to the observer
	 * before resolving with the small executor summary. Tests still control the
	 * matcher outcome through `runMatcherJob`.
	 */
	const runScheduledMatcherJob = async (request: RunMatcherJobRequest, observer?: MatcherJobObserver): Promise<MatcherJobExecutorResult> => {
		const result = await runMatcherJob(request, observer);
		for (const [index, partition] of result.partitions.entries()) {
			await observer?.onPartition?.({ partition, completedPartitionCount: index + 1, partitionCount: result.partitions.length });
		}
		return {
			job: result.job,
			mode: result.mode,
			partitionCount: result.partitions.length,
			executor: result.executor,
			completedAt: result.completedAt,
		};
	};
	const logEvent = vi.fn();
	const logAnalysisSummary = vi.fn();
	const setBadge = vi.fn(async () => undefined);
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
			cancelTab: cancelMatcherTab,
			touchLifecycle: touchMatcherLifecycle,
			releaseLifecycle: releaseMatcherLifecycle,
			runJob: runScheduledMatcherJob,
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
		logEvent,
		logAnalysisSummary,
		setBadge,
	});

	return {
		api: runtime.api,
		runtime,
		contentApi,
		storage,
		mocks: {
			getTab,
			logEvent,
			logAnalysisSummary,
			timingDebug,
			sendMessage,
			analyzeSite,
			executeScript,
			cancelMatcherJob,
			cancelMatcherTab,
			touchMatcherLifecycle,
			releaseMatcherLifecycle,
			getCachedReplayTrace,
			getCachedReplayTraceHistory,
			getBestVisibleDetectionSessionSnapshot,
			getLatestDetectionSessionSnapshot,
			getStatus,
			getRuntimeRegistry,
			saveDetectionSessionSnapshot,
			runMatcherJob,
			saveMatcherJobRecord,
			saveReplayTrace,
			setBadge,
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
	vi.doUnmock('@/lib/diagnostics/logging');
	vi.resetModules();
});

describe('background visible-tab identity', { concurrent: false }, () => {
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

	it('resolves persisted hashed scheduler identity against an inactive exact document', async () => {
		const harness = await loadBackgroundApiHarness({ tab: { ...HTTP_TAB, active: false } });

		await expect(harness.runtime.resolveScheduledTab({
			windowId: 3,
			tabId: 7,
			frameId: 0,
			urlHash: createDetectionStorageHash(HTTP_TAB.url!),
		})).resolves.toMatchObject({
			ok: true,
			value: { url: HTTP_TAB.url, tabId: 7 },
		});
	});

	it('rejects persisted scheduler identity after navigation changes its URL hash', async () => {
		const harness = await loadBackgroundApiHarness({ tab: { ...HTTP_TAB, active: false, url: 'https://example.com/other' } });

		await expect(harness.runtime.resolveScheduledTab({
			windowId: 3,
			tabId: 7,
			frameId: 0,
			urlHash: createDetectionStorageHash(HTTP_TAB.url!),
		})).resolves.toMatchObject({
			ok: false,
			error: { code: 'VALIDATION_ERROR' },
		});
	});

	it('keeps public analysis visibility-scoped while scheduler work can continue on the exact inactive document', async () => {
		const cachedAnalysis = makeAnalysis();
		const harness = await loadBackgroundApiHarness({
			tab: { ...HTTP_TAB, active: false },
			cachedAnalysis,
		});
		const input = { target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'none' } as const;

		await expect(harness.api.analyzeVisibleTab(input)).resolves.toMatchObject({
			ok: false,
			error: { code: 'NO_ACTIVE_TAB' },
		});
		await expect(harness.runtime.analyzeScheduledTab(input)).resolves.toMatchObject({
			ok: true,
			value: { analysis: cachedAnalysis, snapshot: { status: 'hit' } },
		});
	});

	// A full-page surface pinned to one tab is itself the active tab, so the tab it
	// inspects is inactive. Only an explicit `pinned` request may target it.
	it('accepts an inactive target only when the surface is pinned to that tab', async () => {
		const cachedAnalysis = makeAnalysis();
		const harness = await loadBackgroundApiHarness({ tab: { ...HTTP_TAB, active: false }, cachedAnalysis });

		await expect(harness.api.getVisibleTabIdentity({ tabId: 7, windowId: 3 })).resolves.toMatchObject({
			ok: false,
			error: { code: 'NO_ACTIVE_TAB' },
		});
		await expect(harness.api.getVisibleTabIdentity({ tabId: 7, windowId: 3, follow: 'pinned' })).resolves.toMatchObject({
			ok: true,
			value: { tabId: 7, windowId: 3, urlHash: VISIBLE_TAB_TARGET.urlHash },
		});
		await expect(harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'snapshot-first', observe: 'none', follow: 'pinned' }))
			.resolves.toMatchObject({ ok: true, value: { analysis: cachedAnalysis, snapshot: { status: 'hit' } } });
	});

	it('still validates window and document identity for a pinned target', async () => {
		const harness = await loadBackgroundApiHarness({ tab: { ...HTTP_TAB, active: false, url: 'https://example.com/other' } });

		await expect(harness.api.getVisibleTabIdentity({ tabId: 7, windowId: 9, follow: 'pinned' })).resolves.toMatchObject({
			ok: false,
			error: { code: 'NO_ACTIVE_TAB' },
		});
		await expect(harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'none', follow: 'pinned' }))
			.resolves.toMatchObject({ ok: false, error: { code: 'VALIDATION_ERROR' } });
	});

	it('keeps a pinned private target out of durable storage', async () => {
		const harness = await loadBackgroundApiHarness({
			tab: { ...HTTP_TAB, active: false, incognito: true }, matcherPersistence: 'browser',
		});

		await expect(harness.api.analyzeVisibleTab({
			target: { ...VISIBLE_TAB_TARGET, incognito: true }, mode: 'refresh', observe: 'none', follow: 'pinned',
		})).resolves.toMatchObject({ ok: true });
		await vi.waitFor(() => expect(harness.mocks.logEvent).toHaveBeenCalledWith('matcher-job-complete', expect.anything()));
		expect(harness.storage.local.set).not.toHaveBeenCalled();
		expect(harness.mocks.saveDetectionSessionSnapshot).not.toHaveBeenCalled();
	});

	it('rejects scheduler work after the tab navigates away from its durable document identity', async () => {
		const harness = await loadBackgroundApiHarness({
			tab: { ...HTTP_TAB, active: false, url: 'https://example.com/other' },
			cachedAnalysis: makeAnalysis(),
		});

		await expect(harness.runtime.analyzeScheduledTab({
			target: VISIBLE_TAB_TARGET,
			mode: 'snapshot-first',
			observe: 'none',
		})).resolves.toMatchObject({
			ok: false,
			error: { code: 'VALIDATION_ERROR' },
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

describe('background analyzeVisibleTab messaging hardening', { concurrent: false }, () => {
	it.each([false, true])('keeps collection failure details within tab privacy: %s', async (incognito) => {
		const message = 'Collection failed for https://failure.example/private/page';
		const collectObservationBatch = vi.fn(async (_input: Parameters<ContentApi['collectObservationBatch']>[0]) => {
			throw new Error(message);
		});
		const harness = await loadBackgroundApiHarness({ tab: { ...HTTP_TAB, incognito }, contentApi: { collectObservationBatch } });
		await expect(harness.api.analyzeVisibleTab({ target: { ...VISIBLE_TAB_TARGET, incognito }, mode: 'refresh', observe: 'none' }))
			.resolves.toMatchObject({ ok: false, error: { message } });
		expect(collectObservationBatch).toHaveBeenCalledOnce();
		const failure = harness.mocks.logEvent.mock.calls.find(([event]) => event === 'collect-observation-batch-failed')?.[1];
		const timing = harness.mocks.timingDebug.mock.calls.map(([, details]) => details)
			.find((details) => details.span === 'collector.content-rpc.collect-observation-batch');
		if (incognito) {
			expect(failure).toMatchObject({ tabId: 7, errorType: 'Error' });
			expect(timing).toMatchObject({ tabId: 7, failed: true, errorType: 'Error' });
			expect(JSON.stringify([failure, timing])).not.toContain('example');
		} else {
			expect(failure).toMatchObject({ hostname: 'example.com', message });
			expect(timing).toMatchObject({ hostname: 'example.com', message });
		}
	});

	it.each([false, true])('keeps successful analysis summaries within tab privacy: %s', async (incognito) => {
		const harness = await loadBackgroundApiHarness({ tab: { ...HTTP_TAB, incognito } });
		await expect(harness.api.analyzeVisibleTab({ target: { ...VISIBLE_TAB_TARGET, incognito }, mode: 'refresh', observe: 'none' }))
			.resolves.toMatchObject({ ok: true });
		await vi.waitFor(() => expect(harness.mocks.logEvent).toHaveBeenCalledWith('analysis-queued-persist-complete', expect.anything()));
		if (incognito) {
			expect(harness.mocks.logAnalysisSummary).not.toHaveBeenCalled();
		} else {
			expect(harness.mocks.logAnalysisSummary).toHaveBeenCalledWith(expect.objectContaining({ hostname: 'example.com' }));
		}
		// Private results are never stored, but the badge still shows them for this tab.
		expect(harness.mocks.setBadge).toHaveBeenCalledWith(7, expect.any(Number), undefined);
	});

	it.each([false, true])('keeps scheduled refresh failures within sender tab privacy: %s', async (incognito) => {
		vi.useFakeTimers();
		const message = 'Observer status failed for https://failure.example/private/page';
		const getObservationSessionState = vi.fn(async () => { throw new Error(message); });
		const tab = { ...HTTP_TAB, incognito };
		const harness = await loadBackgroundApiHarness({ tab, contentApi: { getObservationSessionState } });
		harness.runtime.handleRuntimeMessage({
			type: OBSERVATION_DIRTY_NOTIFICATION_TYPE,
			sessionId: 'session-1',
			expectedUrl: tab.url,
			observedAt: Date.now(),
			pendingMutationCount: 1,
		}, { tab });
		await vi.advanceTimersByTimeAsync(250);
		const failure = harness.mocks.logEvent.mock.calls.find(([event]) => event === 'observation-refresh-background-failed')?.[1];
		expect(failure).toMatchObject({ tabId: 7, sessionId: 'session-1', code: 'CONTENT_SCRIPT_UNAVAILABLE' });
		if (incognito) {
			expect(JSON.stringify(harness.mocks.logEvent.mock.calls)).not.toContain('example');
		} else {
			expect(failure).toMatchObject({ hostname: 'example.com', message });
		}
	});

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

	it('releases fresh-analysis ownership when registry loading throws', async () => {
		vi.useFakeTimers();
		const registryFailure = new Error('registry load failed');
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			getRuntimeRegistry: vi.fn(async () => {
				throw registryFailure;
			}),
			contentApi: {
				getObservationSessionState: vi.fn(async () => extensionSuccess({
					status: 'dirty' as const,
					throttleMs: 1_500,
					pendingMutationCount: 1,
					sessionId: 'session-1',
					expectedUrl: HTTP_TAB.url!,
				})),
			},
		});

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'while-panel-open' }),
		).rejects.toBe(registryFailure);

		harness.runtime.handleRuntimeMessage({
			type: 'kaiju-deepscope.observation-dirty.v1',
			sessionId: 'session-1',
			expectedUrl: HTTP_TAB.url!,
			observedAt: 1_700_000_000_250,
			pendingMutationCount: 1,
		}, { tab: { id: HTTP_TAB.id!, incognito: false } });
		await vi.advanceTimersByTimeAsync(250);

		expect(harness.contentApi.getObservationSessionState).toHaveBeenCalledOnce();
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
		await vi.waitFor(() => expect(terminalSnapshots(harness.mocks.saveDetectionSessionSnapshot)).toHaveLength(2));
		const [recording, final] = terminalSnapshots(harness.mocks.saveDetectionSessionSnapshot);
		expect(recording).toMatchObject({ analysis: { source: 'fresh' }, matcherProgress: { phase: 'recording' } });
		expect(final).not.toHaveProperty('matcherProgress');
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
			expect.objectContaining({ jobId: expect.any(String) }),
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
		const updateMatcherJobRecord = vi.fn<MatcherJobStore['updateMatcherJob']>(async (_job, patch) => {
			if (patch.status === 'completed') {
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
			expect.objectContaining({ jobId: expect.any(String) }),
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
			expect.objectContaining({ jobId: expect.any(String) }),
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
		await vi.waitFor(() => expect(terminalSnapshots(harness.mocks.saveDetectionSessionSnapshot)).toHaveLength(4));
		expect(harness.mocks.saveReplayTrace).toHaveBeenCalledOnce();
		const savedSnapshots = terminalSnapshots(harness.mocks.saveDetectionSessionSnapshot);
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
		const updateMatcherJobRecord = vi.fn<MatcherJobStore['updateMatcherJob']>(async (_job, patch) => {
			if (patch.status === 'dispatching') {
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
			expect.objectContaining({ jobId: expect.any(String) }),
			expect.objectContaining({ status: 'dispatching' }),
		));

		await expect(
			harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'none' }),
		).resolves.toMatchObject({
			ok: true,
			value: { snapshot: { status: 'bypassed' } },
		});

		await vi.waitFor(() => expect(updateMatcherJobRecord).toHaveBeenCalledWith(
			expect.objectContaining({ jobId: expect.any(String) }),
			expect.objectContaining({ status: 'canceled', reason: 'newer-job' }),
		));
		const canceledJobId = updateMatcherJobRecord.mock.calls.find(([, patch]) =>
			patch.status === 'canceled' &&
			patch.reason === 'newer-job'
		)?.[0].jobId;

		firstDispatchRegistered.resolve(undefined);
		await vi.waitFor(() => expect(updateMatcherJobRecord).toHaveBeenCalledWith(
			expect.objectContaining({ jobId: expect.any(String) }),
			expect.objectContaining({ status: 'completed' }),
		));
		const completedJobIds = updateMatcherJobRecord.mock.calls
			.filter(([, patch]) => patch.status === 'completed')
			.map(([job]) => job.jobId);
		expect(completedJobIds).not.toContain(canceledJobId);
	});

	it('supersedes matcher work from an older observation session on the same tab', async () => {
		const firstDispatchRegistered = makeDeferred();
		let dispatchingUpdateCount = 0;
		let observationSession = 0;
		const updateMatcherJobRecord = vi.fn<MatcherJobStore['updateMatcherJob']>(async (_job, patch) => {
			if (patch.status === 'dispatching') {
				dispatchingUpdateCount += 1;
				if (dispatchingUpdateCount === 1) await firstDispatchRegistered.promise;
			}
			return null;
		});
		const beginObservationSession = vi.fn(async () => {
			observationSession += 1;
			return extensionSuccess({
				status: 'observing' as const,
				sessionId: `session-${observationSession}`,
				expectedUrl: HTTP_TAB.url!,
				startedAt: 1_700_000_000_000 + observationSession,
				expiresAt: Number.MAX_SAFE_INTEGER,
				throttleMs: 1_500,
				pendingMutationCount: 0,
			});
		});
		const harness = await loadBackgroundApiHarness({
			tab: HTTP_TAB,
			contentApi: { beginObservationSession },
			updateMatcherJobRecord,
		});
		const request = { target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'while-panel-open' } as const;

		await expect(harness.api.analyzeVisibleTab(request)).resolves.toMatchObject({ ok: true });
		await vi.waitFor(() => expect(updateMatcherJobRecord).toHaveBeenCalledWith(
			expect.objectContaining({ jobId: expect.any(String) }),
			expect.objectContaining({ status: 'dispatching' }),
		));

		await expect(harness.api.analyzeVisibleTab(request)).resolves.toMatchObject({ ok: true });
		await vi.waitFor(() => expect(updateMatcherJobRecord).toHaveBeenCalledWith(
			expect.objectContaining({ jobId: expect.any(String) }),
			expect.objectContaining({ status: 'canceled', reason: 'newer-job' }),
		));

		firstDispatchRegistered.resolve(undefined);
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

	it.each([false, true])('enforces matcher storage policy through a completed background scan (private: %s)', async (incognito) => {
		const scanUrl = 'https://example.com/matcher-retention-sentinel?visit=test';
		const target = { ...VISIBLE_TAB_TARGET, url: scanUrl, urlHash: createDetectionStorageHash(scanUrl), incognito };
		const harness = await loadBackgroundApiHarness({
			tab: { ...HTTP_TAB, url: scanUrl, incognito },
			matcherPersistence: 'browser',
			contentApi: {
				collectObservationBatch: vi.fn(async () => extensionSuccess({
					batch: makeObservationBatch(makeSignals({ url: scanUrl })),
				})),
			},
		});

		if (incognito) {
			harness.storage.local.get.mockRejectedValueOnce(new Error('Storage unavailable'));
			harness.storage.local.remove.mockRejectedValueOnce(new Error('Storage unavailable'));
		}

		await expect(harness.api.analyzeVisibleTab({ target, mode: 'refresh', observe: 'none' }))
			.resolves.toMatchObject({ ok: true });
		await vi.waitFor(() => expect(harness.mocks.logEvent).toHaveBeenCalledWith(
			'matcher-job-complete', expect.objectContaining({ tabId: 7 }),
		));

		expect(harness.mocks.runMatcherJob).toHaveBeenCalledOnce();
		const writes = harness.storage.local.set.mock.calls.flatMap(([values]) => Object.entries(values));
		const records = [...harness.storage.values].filter(([key]) => key.startsWith(MATCHER_JOB_CACHE_PREFIX));
		if (incognito) {
			expect(harness.storage.local.get).not.toHaveBeenCalled();
			expect(harness.storage.local.remove).not.toHaveBeenCalled();
			expect(writes).toEqual([]);
			expect(records).toEqual([]);
			expect(harness.mocks.saveDetectionSessionSnapshot).not.toHaveBeenCalled();
			expect(harness.mocks.saveReplayTrace).not.toHaveBeenCalled();
		} else {
			expect(writes.map(([, value]) => (value as MatcherJobRecord).status))
				.toEqual(['queued', 'dispatching', 'streaming', 'recording', 'completed']);
			expect(records).toEqual([[expect.stringMatching(/^matcher-job:/), expect.objectContaining({
				status: 'completed', reason: 'completed',
			})]]);
			// Ordinary records keep only the lifecycle projection, never the document URL.
			expect(JSON.stringify(records)).not.toContain(scanUrl);
		}
	});

	it.each([false, true])('records matcher failure diagnostics according to tab privacy: %s', async (incognito) => {
		const harness = await loadBackgroundApiHarness({
			tab: { ...HTTP_TAB, incognito }, matcherPersistence: 'browser',
		});
		const message = 'Matcher failed on https://failure.example/private/path?document=fixture';
		harness.mocks.runMatcherJob.mockRejectedValueOnce(new Error(message));

		await expect(harness.api.analyzeVisibleTab({
			target: { ...VISIBLE_TAB_TARGET, incognito }, mode: 'refresh', observe: 'none',
		})).resolves.toMatchObject({ ok: true });
		await vi.waitFor(() => expect(harness.mocks.logEvent).toHaveBeenCalledWith(
			'analysis-queued-persist-threw', expect.objectContaining(incognito ? { errorType: 'Error' } : { message }),
		));
		const details = harness.mocks.logEvent.mock.calls.find(([event]) => event === 'analysis-queued-persist-threw')?.[1];
		expect(harness.mocks.updateMatcherJobRecord).toHaveBeenCalledWith(
			expect.objectContaining({ jobId: expect.any(String) }),
			expect.objectContaining({ status: 'failed', reason: 'worker-failed' }));
		if (incognito) {
			expect(details).not.toHaveProperty('message');
			expect(details).not.toHaveProperty('hostname');
			expect(harness.storage.local.get).not.toHaveBeenCalled();
			expect(harness.storage.local.remove).not.toHaveBeenCalled();
			expect(harness.storage.local.set).not.toHaveBeenCalled();
			expect([...harness.storage.values]).toEqual([]);
		} else {
			expect([...harness.storage.values.values()]).toEqual([
				expect.objectContaining({ status: 'failed', errorMessage: message }),
			]);
		}
	});

	it('does not persist a private job canceled during navigation or its late completion', async () => {
		const matching = makeDeferred<MatcherJobRunResult>();
		const harness = await loadBackgroundApiHarness({
			tab: { ...HTTP_TAB, incognito: true }, matcherPersistence: 'browser',
		});
		harness.mocks.runMatcherJob.mockImplementationOnce(() => matching.promise);

		await expect(harness.api.analyzeVisibleTab({
			target: { ...VISIBLE_TAB_TARGET, incognito: true }, mode: 'refresh', observe: 'none',
		})).resolves.toMatchObject({ ok: true });
		await vi.waitFor(() => expect(harness.mocks.runMatcherJob).toHaveBeenCalledOnce());
		harness.runtime.onTabNavigation(7);
		matching.resolve(makeMatcherRunResult(harness.mocks.runMatcherJob.mock.calls[0]![0]));
		await vi.waitFor(() => expect(harness.mocks.logEvent).toHaveBeenCalledWith(
			'analysis-queued-persist-failed', expect.objectContaining({ code: 'VALIDATION_ERROR' }),
		));

		expect(harness.mocks.cancelMatcherJob).toHaveBeenCalled();
		expect(harness.mocks.updateMatcherJobRecord).toHaveBeenCalledWith(
			expect.objectContaining({ jobId: expect.any(String), incognito: true }),
			expect.objectContaining({ status: 'canceled', reason: 'navigation' }));
		expect(harness.mocks.logEvent).not.toHaveBeenCalledWith('matcher-job-complete', expect.anything());
		expect(harness.storage.local.get).not.toHaveBeenCalled();
		expect(harness.storage.local.remove).not.toHaveBeenCalled();
		expect(harness.storage.local.set).not.toHaveBeenCalled();
		expect([...harness.storage.values]).toEqual([]);
	});

	it.each(['navigation', 'newer-job'] as const)(
		'releases matcher ownership when detached %s cancellation fails', async (reason) => {
			const matching = makeDeferred<MatcherJobRunResult>();
			const harness = await loadBackgroundApiHarness({ tab: { ...HTTP_TAB, incognito: true }, matcherPersistence: 'browser' });
			harness.mocks.runMatcherJob.mockImplementationOnce(() => matching.promise);
			const target = { ...VISIBLE_TAB_TARGET, incognito: true };
			await expect(harness.api.analyzeVisibleTab({ target, mode: 'refresh', observe: 'none' }))
				.resolves.toMatchObject({ ok: true });
			await vi.waitFor(() => expect(harness.mocks.runMatcherJob).toHaveBeenCalledOnce());
			const request = harness.mocks.runMatcherJob.mock.calls[0]![0];
			harness.mocks.cancelMatcherJob.mockRejectedValueOnce(new Error('Cancel failed for https://private.invalid/cancel-sentinel'));

			try {
				if (reason === 'navigation') harness.runtime.onTabNavigation(7);
				else await harness.api.analyzeVisibleTab({ target, mode: 'refresh', observe: 'none' });

				await vi.waitFor(() => expect(harness.mocks.logEvent).toHaveBeenCalledWith('matcher-job-cancel-failed', {
					jobId: request.job.jobId, tabId: 7, reason, errorType: 'Error',
				}));
			} finally {
				matching.resolve(makeMatcherRunResult(request));
			}
			await vi.waitFor(() => expect(harness.mocks.logEvent).toHaveBeenCalledWith(
				'analysis-queued-persist-failed', expect.objectContaining({ code: 'VALIDATION_ERROR' }),
			));
			expect(harness.mocks.logEvent).not.toHaveBeenCalledWith('matcher-job-complete', expect.objectContaining({ jobId: request.job.jobId }));
			expect(JSON.stringify(harness.mocks.logEvent.mock.calls)).not.toContain('cancel-sentinel');
			expect(harness.storage.local.set).not.toHaveBeenCalled();
		});

	it('keeps a canceled owner revoked when its ordinary storage update rejects', async () => {
		const matching = makeDeferred<MatcherJobRunResult>();
		const harness = await loadBackgroundApiHarness({ tab: HTTP_TAB, matcherPersistence: 'browser' });
		harness.mocks.runMatcherJob.mockImplementationOnce(() => matching.promise);
		await harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'none' });
		await vi.waitFor(() => expect(harness.mocks.runMatcherJob).toHaveBeenCalledOnce());
		const request = harness.mocks.runMatcherJob.mock.calls[0]![0];
		harness.storage.local.get.mockRejectedValueOnce(new Error('Storage update unavailable'));

		try {
			harness.runtime.onTabNavigation(7);
			await vi.waitFor(() => expect(harness.mocks.logEvent).toHaveBeenCalledWith('matcher-job-cancel-failed', {
				jobId: request.job.jobId, tabId: 7, reason: 'navigation', errorType: 'Error',
			}));
		} finally {
			matching.resolve(makeMatcherRunResult(request));
		}
		await vi.waitFor(() => expect(harness.mocks.logEvent).toHaveBeenCalledWith(
			'analysis-queued-persist-failed', expect.objectContaining({ code: 'VALIDATION_ERROR' }),
		));
		expect(harness.mocks.logEvent).not.toHaveBeenCalledWith('matcher-job-complete', expect.objectContaining({ jobId: request.job.jobId }));
		expect(harness.mocks.saveDetectionSessionSnapshot).not.toHaveBeenCalled();
		expect(harness.storage.values.get(`${MATCHER_JOB_CACHE_PREFIX}${request.job.jobId}`)).toMatchObject({ status: 'canceled' });
	});

	it.each(['tab validation', 'recording status', 'recording revision', 'replay save', 'replay history', 'final revision', 'current job'] as const)(
		'checks publication rights after awaiting %s',
		async (stage) => {
			const matching = makeDeferred<MatcherJobRunResult>();
			const waiting = makeDeferred();
			const release = makeDeferred();
			const harness = await loadBackgroundApiHarness({ tab: HTTP_TAB, matcherPersistence: 'browser' });
			const { mocks } = harness;
			mocks.runMatcherJob.mockImplementationOnce(() => matching.promise);
			await harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'none' });
			await vi.waitFor(() => expect(mocks.runMatcherJob).toHaveBeenCalledOnce());
			const request = mocks.runMatcherJob.mock.calls[0]![0];
			const jobKey = `${MATCHER_JOB_CACHE_PREFIX}${request.job.jobId}`;
			const pause = async <T>(value: T): Promise<T> => {
				waiting.resolve();
				await release.promise;
				return value;
			};

			if (stage === 'tab validation' || stage === 'current job') {
				mocks.getTab.mockImplementationOnce(() => pause({ ...HTTP_TAB, active: true }));
			} else if (stage === 'recording status') {
				// The first read belongs to the streamed partition's `streaming` update.
				harness.storage.local.get
					.mockImplementationOnce(async () => ({ [jobKey]: harness.storage.values.get(jobKey) }))
					.mockImplementationOnce(() => pause({ [jobKey]: harness.storage.values.get(jobKey) }));
			} else if (stage === 'recording revision') {
				// The first read belongs to the streamed partition's progress revision.
				mocks.getLatestDetectionSessionSnapshot.mockResolvedValueOnce(null)
					.mockImplementationOnce(() => pause(null));
			} else if (stage === 'replay save') {
				mocks.saveReplayTrace.mockImplementationOnce(pause);
			} else if (stage === 'replay history') {
				mocks.getCachedReplayTraceHistory.mockImplementationOnce(() => pause([]));
			} else {
				mocks.getLatestDetectionSessionSnapshot.mockResolvedValueOnce(null).mockResolvedValueOnce(null)
					.mockImplementationOnce(() => pause(null));
			}

			matching.resolve(makeMatcherRunResult(request));
			// Marks the moment the page navigated away, to order badge writes against it.
			const navigated = vi.fn();
			try {
				await waiting.promise;
				if (stage !== 'current job') {
					navigated();
					harness.runtime.onTabNavigation(7);
				}
			} finally {
				release.resolve();
			}
			await vi.waitFor(() => expect(mocks.logEvent.mock.calls).toEqual(expect.arrayContaining([
				[expect.stringMatching(/^analysis-queued-persist-(failed|complete)$/), expect.any(Object)],
			])));

			const completed = stage === 'current job';
			const replayStarted = completed || stage === 'replay save' || stage === 'replay history' || stage === 'final revision';
			expect(mocks.saveReplayTrace).toHaveBeenCalledTimes(replayStarted ? 1 : 0);
			expect(mocks.getCachedReplayTraceHistory).toHaveBeenCalledTimes(replayStarted && stage !== 'replay save' ? 1 : 0);
			// The badge follows each published revision, but never one written after
			// the page lost publication rights.
			const navigatedAt = navigated.mock.invocationCallOrder[0] ?? Number.POSITIVE_INFINITY;
			expect(mocks.setBadge.mock.invocationCallOrder.every((order) => order < navigatedAt)).toBe(true);
			if (completed) expect(mocks.setBadge).toHaveBeenCalled();
			// One streamed partition revision precedes every stage, then recording and final revisions.
			expect(mocks.saveDetectionSessionSnapshot).toHaveBeenCalledTimes(1 + (completed ? 2 : replayStarted ? 1 : 0));
			const event = mocks.logEvent.mock.calls.find(([name, details]) =>
				name === 'matcher-job-complete' && details.jobId === request.job.jobId
			);
			expect(Boolean(event)).toBe(completed);
		},
	);

	it.each(['queue storage', 'queue revision', 'partition storage', 'partition revision', 'current queue', 'current partition'] as const)(
		'checks progress publication rights after awaiting %s',
		async (stage) => {
			const matching = makeDeferred<MatcherJobRunResult>();
			const waiting = makeDeferred();
			const release = makeDeferred();
			const harness = await loadBackgroundApiHarness({ tab: HTTP_TAB, matcherPersistence: 'browser' });
			const { mocks } = harness;
			mocks.runMatcherJob.mockImplementationOnce(() => matching.promise);
			await harness.api.analyzeVisibleTab({ target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'none' });
			await vi.waitFor(() => expect(mocks.runMatcherJob).toHaveBeenCalledOnce());
			const request = mocks.runMatcherJob.mock.calls[0]![0];
			const result = makeMatcherRunResult(request);
			const jobKey = `${MATCHER_JOB_CACHE_PREFIX}${request.job.jobId}`;
			const pause = async <T>(value: T): Promise<T> => {
				waiting.resolve();
				await release.promise;
				return value;
			};
			const isPartition = stage.includes('partition');
			const staysCurrent = stage.startsWith('current');
			if (stage.endsWith('storage')) {
				harness.storage.local.get.mockImplementationOnce(() => pause({ [jobKey]: harness.storage.values.get(jobKey) }));
			} else {
				mocks.getLatestDetectionSessionSnapshot.mockImplementationOnce(() => pause(null));
			}

			const observer = mocks.runMatcherJob.mock.calls[0]![1]!;
			void (isPartition
				? observer.onPartition!({ partition: result.partitions[0]!, partitionCount: 1, completedPartitionCount: 1 })
				: observer.onState!({ jobId: request.job.jobId, phase: 'running', queueDepth: 1, queuedAt: 1, startedAt: 2, partitionCount: 1 }));
			try {
				await waiting.promise;
				if (!staysCurrent) harness.runtime.onTabNavigation(7);
				release.resolve();
				if (staysCurrent) {
					await vi.waitFor(() => expect(mocks.saveDetectionSessionSnapshot).toHaveBeenCalledWith(expect.objectContaining({
						matcherProgress: expect.objectContaining({ jobId: request.job.jobId, phase: 'matching' }),
					})));
				}
			} finally {
				release.resolve();
				matching.resolve(result);
			}
			await vi.waitFor(() => expect(mocks.logEvent.mock.calls).toEqual(expect.arrayContaining([
				[expect.stringMatching(/^analysis-queued-persist-(failed|complete)$/), expect.any(Object)],
			])));
			// Current owners publish this progress, the streamed final partition, recording and final revisions.
			expect(mocks.saveDetectionSessionSnapshot).toHaveBeenCalledTimes(staysCurrent ? 4 : 0);
		},
	);

	it('checks publication rights after a replacement matcher takes ownership', async () => {
		const firstMatch = makeDeferred<MatcherJobRunResult>();
		const secondMatch = makeDeferred<MatcherJobRunResult>();
		const readingHistory = makeDeferred();
		const history = makeDeferred<DetectionReplayTrace[]>();
		const harness = await loadBackgroundApiHarness({ tab: HTTP_TAB, matcherPersistence: 'browser' });
		const { mocks } = harness;
		const refresh = { target: VISIBLE_TAB_TARGET, mode: 'refresh', observe: 'none' } as const;
		mocks.runMatcherJob.mockImplementationOnce(() => firstMatch.promise).mockImplementationOnce(() => secondMatch.promise);
		mocks.getCachedReplayTraceHistory.mockImplementationOnce(() => {
			readingHistory.resolve();
			return history.promise;
		});

		await harness.api.analyzeVisibleTab(refresh);
		await vi.waitFor(() => expect(mocks.runMatcherJob).toHaveBeenCalledOnce());
		const first = mocks.runMatcherJob.mock.calls[0]![0];
		firstMatch.resolve(makeMatcherRunResult(first));
		await readingHistory.promise;
		// Marks the moment the replacement analysis took ownership of the document.
		const superseded = vi.fn();
		superseded();
		await harness.api.analyzeVisibleTab(refresh);
		await vi.waitFor(() => expect(mocks.runMatcherJob).toHaveBeenCalledTimes(2));
		const second = mocks.runMatcherJob.mock.calls[1]![0];

		try {
			history.resolve([]);
			await vi.waitFor(() => expect(mocks.logEvent.mock.calls).toEqual(expect.arrayContaining([
				[expect.stringMatching(/^analysis-queued-persist-(failed|complete)$/), expect.any(Object)],
			])));
			// Revisions the first job published while it owned the document may set the
			// badge; nothing from it may set the badge after the replacement took over.
			const supersededAt = superseded.mock.invocationCallOrder[0]!;
			expect(mocks.setBadge.mock.invocationCallOrder.every((order) => order < supersededAt)).toBe(true);
			// The first job's partition and recording revisions; never its final one.
			expect(mocks.saveDetectionSessionSnapshot).toHaveBeenCalledTimes(2);
			expect(mocks.logEvent).not.toHaveBeenCalledWith('matcher-job-complete', expect.objectContaining({ jobId: first.job.jobId }));
		} finally {
			secondMatch.resolve(makeMatcherRunResult(second));
			await vi.waitFor(() => expect(mocks.logEvent).toHaveBeenCalledWith(
				'matcher-job-complete', expect.objectContaining({ jobId: second.job.jobId }),
			));
		}
		// The replacement's revisions are the last ones shown on the badge.
		expect(mocks.setBadge.mock.invocationCallOrder.at(-1)).toBeGreaterThan(superseded.mock.invocationCallOrder[0]!);
		expect(mocks.saveDetectionSessionSnapshot).toHaveBeenCalledTimes(5);
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
		await vi.waitFor(() => expect(terminalSnapshots(harness.mocks.saveDetectionSessionSnapshot)).toHaveLength(2));
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
		// Wait for the terminal revision; partition progress revisions come first.
		await vi.waitFor(() => expect(harness.mocks.saveReplayTrace).toHaveBeenCalledWith(expect.objectContaining({
			completedMode: 'event',
		})));
		expect(terminalSnapshots(harness.mocks.saveDetectionSessionSnapshot)).toContainEqual(expect.objectContaining({
			analysis: expect.objectContaining({
				url: HTTP_TAB.url,
				hostname: 'example.com',
				source: 'fresh',
				results: [],
			}),
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

describe('background observation session baseline', { concurrent: false }, () => {
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
		// The refresh matcher runs over the merged batch. It may supersede the initial
		// job before that job's final revision, so assert on the refresh's own output.
		await vi.waitFor(() => expect(harness.mocks.runMatcherJob).toHaveBeenCalledTimes(2));
		expect(harness.mocks.runMatcherJob.mock.calls[1]![0].batch.observations).toContainEqual(
			expect.objectContaining({ value: 'https://example.com/late.js' }),
		);
		const refreshJobId = harness.mocks.runMatcherJob.mock.calls[1]![0].job.jobId;
		await vi.waitFor(() => expect(harness.mocks.logEvent).toHaveBeenCalledWith(
			'matcher-job-complete', expect.objectContaining({ jobId: refreshJobId }),
		));
		expect(terminalSnapshots(harness.mocks.saveDetectionSessionSnapshot).at(-1)).not.toHaveProperty('matcherProgress');
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
		await vi.waitFor(() => expect(terminalSnapshots(harness.mocks.saveDetectionSessionSnapshot)).toHaveLength(2));
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

	// Owner decision: activation is a priority signal, not cancellation. A live
	// observation in a background tab keeps refreshing its own document.
	it('keeps refreshing a live observation after its browser tab becomes inactive', async () => {
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

		await expect(harness.api.refreshObservationSession(OBSERVATION_TARGET)).resolves.toMatchObject({ ok: true });

		expect(harness.contentApi.getObservationSessionState).toHaveBeenCalled();
		expect(harness.contentApi.flushObservationBatch).toHaveBeenCalled();
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
