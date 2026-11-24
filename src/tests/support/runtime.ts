/**
 * Small harness for the background runtime (`createBackgroundRuntime`).
 *
 * It replaces only the browser edges: tab lookup, content RPC, collection,
 * registry, matcher executor and persistence. Matcher runs can be held open so a
 * test can observe what happens to in-flight work when the tab navigates or
 * closes. Callers must `vi.resetModules()` between harnesses.
 */
import { vi } from 'vitest';

import type { ExtensionPageCollectorInput } from '@/lib/collectors/extension-page-collector';
import type { ContentApi, VisibleTabIdentity } from '@/lib/messaging';
import { extensionSuccess } from '@/lib/messaging/result';
import {
	createMatcherPartitionTasks,
	createMatcherPipelineResult,
	type MatcherJobExecutorResult,
	type MatcherJobLifecycleRecord,
	type MatcherJobObserver,
	type MatcherJobRecord,
	type MatcherPartitionResult,
	type RunMatcherJobRequest,
} from '@/lib/matcher';
import type { ObservationBatch } from '@/lib/observations';
import type { RuntimeTechnologyRegistryArtifact } from '@/lib/registry/runtime-artifact';
import { createDetectionStorageHash, getDetectionOriginSnapshotKey, getDetectionSessionSnapshotKey } from '@/lib/storage/contracts';
import type { DetectionSessionSnapshot } from '@/lib/storage/session';

export const TAB = { id: 7, windowId: 3, url: 'https://example.com/products', active: true, incognito: false } as const;

export const TARGET: VisibleTabIdentity = {
	windowId: TAB.windowId,
	tabId: TAB.id,
	frameId: 0,
	url: TAB.url,
	hostname: 'example.com',
	originHash: createDetectionStorageHash('https://example.com'),
	urlHash: createDetectionStorageHash(TAB.url),
	incognito: false,
};

/** One URL observation for the harness tab. */
export function batch(): ObservationBatch {
	const target = { url: TAB.url, hostname: 'example.com' };
	return {
		target,
		interface: 'extension',
		observedAt: 1_700_000_000_000,
		observations: [{ kind: 'url', interface: 'extension', collector: 'content-snapshot', target, observedAt: 1_700_000_000_000, value: TAB.url }],
	};
}

/** Run every partition of a request to an empty match list. */
function complete(request: RunMatcherJobRequest): MatcherJobExecutorResult & { readonly partitions: readonly MatcherPartitionResult[] } {
	const partitions = createMatcherPartitionTasks({ job: request.job, batch: request.batch }).map((task): MatcherPartitionResult => ({
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
		completedAt: request.batch.observedAt,
	}));
	createMatcherPipelineResult({ batch: request.batch, registry: request.registry, relationshipGraph: request.relationshipGraph, partitions });
	return { job: request.job, mode: request.mode, partitionCount: partitions.length, executor: 'offscreen-worker-pool', completedAt: request.batch.observedAt, partitions };
}

/** Options for `load`. */
export interface Options {
	/** Stored snapshot `getBestVisibleSnapshot` returns. */
	readonly stored?: DetectionSessionSnapshot | null;
	/** Hold every matcher run open until the test releases it. */
	readonly holdMatcher?: boolean;
}

/** Build a runtime with mocked edges and return the mocks in call order. */
export async function load(options: Options = {}) {
	vi.doMock('@/registry/technologies', () => ({ SOURCE_LIMITS: new Proxy({}, { get: () => 1_000 }), technologies: [] }));
	vi.doMock('wxt/browser', () => ({ browser: { runtime: { sendMessage: vi.fn() }, tabs: { get: vi.fn() } } }));
	vi.doMock('@/lib/diagnostics/logging', () => ({ get: () => ({ debug: vi.fn() }) }));

	const { buildCollectionPlan } = await import('@/lib/collectors/planning');
	const { createCompiledDetectionGraph } = await import('@/lib/detection/registry-graph');
	const registry: RuntimeTechnologyRegistryArtifact = {
		technologies: [],
		patternTables: {},
		relationshipGraph: createCompiledDetectionGraph([], []),
		collectionPlan: buildCollectionPlan([]),
		diagnosticCount: 0,
	};

	/** Signals handed to collection, in order; the last one is the current document-work scope. */
	const signals: AbortSignal[] = [];
	const held: Array<() => void> = [];
	const contentApi = {
		collectObservationBatch: vi.fn(),
		flushObservationBatch: vi.fn(),
		beginObservationSession: vi.fn(),
		stopObservationSession: vi.fn(),
		getObservationSessionState: vi.fn(async () => extensionSuccess({ status: 'idle', throttleMs: 1_500, pendingMutationCount: 0 })),
	} as unknown as ContentApi;

	const mocks = {
		getTab: vi.fn(async (tabId: number) => {
			if (tabId !== TAB.id) throw new Error(`Tab ${tabId} is unavailable.`);
			return { ...TAB };
		}),
		collect: vi.fn(async (input: ExtensionPageCollectorInput) => {
			if (input.signal) signals.push(input.signal);
			return extensionSuccess(batch());
		}),
		runJob: vi.fn(async (request: RunMatcherJobRequest, observer?: MatcherJobObserver) => {
			if (options.holdMatcher) await new Promise<void>((resolve) => held.push(resolve));
			const result = complete(request);
			for (const [index, partition] of result.partitions.entries()) {
				await observer?.onPartition?.({ partition, completedPartitionCount: index + 1, partitionCount: result.partitions.length });
			}
			return result;
		}),
		cancelJob: vi.fn(async (_jobId: string) => undefined),
		cancelTab: vi.fn(async (_tabId: number, _reason: string) => undefined),
		setBadge: vi.fn(async (_tabId: number, _count: number, _finding?: string) => undefined),
		logEvent: vi.fn(),
		updateMatcherJob: vi.fn(async (_job: unknown, _patch: { readonly status?: string }) => null),
		saveSnapshot: vi.fn(async (snapshot: DetectionSessionSnapshot) => ({
			accepted: true,
			sessionStorageKey: getDetectionSessionSnapshotKey(snapshot.key),
			originStorageKey: getDetectionOriginSnapshotKey(snapshot.key.originHash),
			snapshot,
		})),
	};

	const { createBackgroundRuntime } = await import('@/lib/background/runtime');
	const runtime = createBackgroundRuntime({
		getTab: mocks.getTab,
		executeContentScript: async () => undefined,
		createContentApiClient: () => contentApi,
		collectObservationBatch: mocks.collect,
		registryProvider: { getRuntimeRegistry: async () => registry },
		matcher: {
			cancelJob: mocks.cancelJob,
			cancelTab: mocks.cancelTab,
			touchLifecycle: vi.fn(async () => undefined),
			releaseLifecycle: vi.fn(async () => undefined),
			runJob: mocks.runJob,
		},
		persistence: {
			getBestVisibleSnapshot: vi.fn(async () => options.stored ?? null),
			getSessionIndex: vi.fn(async () => ({ tabId: TAB.id, entries: [], updatedAt: 0 })),
			getLatestOriginSnapshot: vi.fn(async () => null),
			getLatestSessionSnapshot: vi.fn(async () => null),
			saveSnapshot: mocks.saveSnapshot,
			getReplayTrace: vi.fn(async () => null),
			getReplayHistory: vi.fn(async () => []),
			saveReplayTrace: vi.fn(async (trace) => trace),
			clearStoredData: vi.fn(async () => 0),
			getStatus: vi.fn(async () => ({ totalAnalyses: 0, trackedOrigins: 0 })),
			saveMatcherJob: vi.fn(async (record: MatcherJobRecord): Promise<MatcherJobLifecycleRecord> => ({
				schemaVersion: 2,
				jobId: record.jobId,
				tabId: record.tabId,
				windowId: record.windowId,
				contextId: record.contextId,
				status: record.status,
				mode: record.mode,
				createdAt: record.createdAt,
				updatedAt: record.updatedAt,
				observationCount: record.observationCount,
				partitionCount: record.partitionCount,
				completedPartitionCount: record.completedPartitionCount,
			})),
			updateMatcherJob: mocks.updateMatcherJob,
		},
		logEvent: mocks.logEvent,
		logAnalysisSummary: vi.fn(),
		setBadge: mocks.setBadge,
	});

	return {
		runtime,
		mocks,
		signals,
		/** Let every held matcher run finish. */
		release() {
			for (const resolve of held.splice(0)) resolve();
		},
	};
}

/** Undo the module mocks `load` installs. */
export function unload(): void {
	vi.doUnmock('@/registry/technologies');
	vi.doUnmock('wxt/browser');
	vi.doUnmock('@/lib/diagnostics/logging');
	vi.resetModules();
}
