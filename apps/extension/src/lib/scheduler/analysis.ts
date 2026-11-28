import type { AnalyzeVisibleTabInput, AnalyzeVisibleTabOutput, VisibleTabIdentity } from "../messaging/analysis.ts";
import { errorResponse, type ExtensionResult } from "../messaging/result.ts";

import * as database from './database.ts';
import * as fairness from './fairness.ts';
import * as generation from '../../utils/generation.ts';
import * as lane from './lane.ts';
import * as priority from './priority.ts';
import * as session from './session.ts';
import * as fence from '../../utils/fence.ts';
import { AnalysisWorkSchema, EXECUTION_SCHEMA_VERSION, type AnalysisSourceType, type AnalysisWorkType, type WorkType } from "./schema.ts";

const MAX_PENDING_ANALYSES = 256;
const CLAIM_CLEANUP_ATTEMPTS = 3;

export interface AnalysisSchedulerOptions {
	/** Resolve the current browser document for one persisted hashed identity. */
	readonly resolveTarget: (work: AnalysisWorkType) => Promise<ExtensionResult<VisibleTabIdentity>>;
	/** Execute one analysis after the scheduler resolves its current exact document. */
	readonly analyze: (input: AnalyzeVisibleTabInput) => Promise<ExtensionResult<AnalyzeVisibleTabOutput>>;
	/** Optional structured diagnostic projection. */
	readonly log?: (event: string, details?: Record<string, unknown>) => void;
}

/**
 * In-memory background work that shares the analysis lane but has no durable record.
 *
 * Live observation refreshes use this. They are cheap to lose: after a service
 * worker restart the next page mutation schedules another refresh, so persisting
 * them would only add page-derived session ids to IndexedDB.
 */
export interface BackgroundTaskInput {
	/** Deduplication key; a second task with the same key joins the queued one. */
	readonly key: string;
	/** Tab whose closure or navigation cancels the task. */
	readonly tabId: number;
	/** Work to run once the scheduler grants the lane. Errors are logged, never thrown into the lane. */
	readonly run: () => Promise<void>;
}

export interface AnalysisScheduler {
	/** Queue or join one analysis request. */
	analyze(input: AnalyzeVisibleTabInput, source?: AnalysisSourceType): Promise<ExtensionResult<AnalyzeVisibleTabOutput>>;
	/** Reprioritize non-interactive work after Chrome activates another tab in a window. */
	activateTab(tabId: number, windowId: number): Promise<void>;
	/**
	 * Queue in-memory work at `background` priority behind interactive and foreground analyses.
	 *
	 * The returned Promise settles when the task ran, failed (the error is rethrown to
	 * the caller after being logged) or was dropped because its tab was canceled.
	 */
	runBackground(task: BackgroundTaskInput): Promise<void>;
	/** Cancel queued work for a closed tab. Active runtime work is canceled by the background owner. */
	cancelTab(tabId: number): Promise<void>;
	/** Recover queued/claimed analysis intent after service-worker replacement without executing it yet. */
	reconcile(): Promise<void>;
	/** Resume dispatch after sibling runtime recovery has released stale resources. */
	resume(): void;
}

type Completion = Promise<ExtensionResult<AnalyzeVisibleTabOutput>>;

type ClaimCleanupResult =
	| Readonly<{ kind: 'removed' }>
	| Readonly<{ kind: 'stale' }>
	| Readonly<{ kind: 'failed'; error: unknown }>;

/**
 * Remove a terminal claim without replacing its analysis result.
 * Retry storage failures at most CLAIM_CLEANUP_ATTEMPTS times. A stale claim
 * belongs to a newer admission and must remain untouched. Report exhausted
 * storage failures separately; startup reconciliation retries surviving claims.
 */
async function removeClaim(id: string, claimToken: string): Promise<ClaimCleanupResult> {
	let lastError: unknown;
	for (let attempt = 0; attempt < CLAIM_CLEANUP_ATTEMPTS; attempt += 1) {
		try {
			return await database.removeClaim(id, claimToken) ? { kind: 'removed' } : { kind: 'stale' };
		} catch (error) {
			lastError = error;
		}
	}
	return { kind: 'failed', error: lastError };
}

/**
 * Create a durable visible-document analysis scheduler.
 *
 * IndexedDB stores only safe execution intent. Raw DOM, HTML, text, script
 * source, and ObservationBatch values remain owned by the live runtime. One
 * in-memory completion Promise is shared by equivalent callers in the current
 * service-worker context, while the durable record lets a replacement context
 * safely rerun collection from the document instead of attempting to resume
 * dead browser handles.
 */
export function create(options: AnalysisSchedulerOptions): AnalysisScheduler {
	const owner = session.createId('analysis-scheduler');
	const completions = new Map<string, Completion>();
	const generations = generation.create<number>();
	const activeTabByWindow = new Map<number, number>();
	const tabCleanup = fence.create<number>();
	let foregroundDispatches = 0;
	let draining: Promise<void> | undefined;
	/** A `drain()` joined a running lane, which must claim again (or restart) before it stops. */
	let wake = false;
	let paused = false;

	/** Queued in-memory background tasks in insertion order, keyed for deduplication. */
	const backgroundTasks = new Map<string, QueuedBackgroundTask>();

	interface QueuedBackgroundTask {
		readonly input: BackgroundTaskInput;
		readonly tabGeneration: number;
		readonly completion: Promise<void>;
		readonly resolve: () => void;
		readonly reject: (error: unknown) => void;
	}

	/** One lane decision: a durable analysis claim or an in-memory background task. */
	type NextWork =
		| Readonly<{ kind: 'analysis'; work: WorkType }>
		| Readonly<{ kind: 'background'; task: QueuedBackgroundTask }>;

	/** Run the lane until nothing is left; work committed while it read an empty store sets `wake`. */
	async function drain(): Promise<void> {
		if (paused) return;
		if (draining) {
			wake = true;
			return draining;
		}
		const task = (async () => {
			const browserSessionId = await session.get();
			while (!paused) {
				wake = false;
				const next = await claimNext(browserSessionId);
				if (!next) {
					if (wake) continue;
					return;
				}
				if (next.kind === 'background') {
					foregroundDispatches = 0;
					await runBackgroundTask(next.task);
					continue;
				}
				const claimed = next.work;
				if (claimed.kind !== 'analysis') return;
				foregroundDispatches = claimed.priorityRank <= 1
					? Math.min(fairness.FOREGROUND_BURST_LIMIT, foregroundDispatches + 1)
					: 0;
				await execute(claimed);
			}
		})().finally(() => {
			if (draining === task) draining = undefined;
			if (wake && !paused) void drain();
		});
		draining = task;
		return task;
	}

	/**
	 * Choose the next unit of lane work.
	 *
	 * Interactive and foreground analyses (ranks 0-1) go first. In-memory background
	 * tasks run before durable background/maintenance analyses because they are
	 * small and already deduplicated per session. After a bounded foreground burst,
	 * lower-priority work receives one turn so background tabs keep progressing.
	 */
	async function claimNext(browserSessionId: string): Promise<NextWork | undefined> {
		if (foregroundDispatches >= fairness.FOREGROUND_BURST_LIMIT) {
			const lowerPriority = await claimRange(browserSessionId, 2, 3);
			if (lowerPriority) return { kind: 'analysis', work: lowerPriority };
			const task = takeBackgroundTask();
			if (task) return { kind: 'background', task };
		}

		const urgent = await claimRange(browserSessionId, 0, 1);
		if (urgent) return { kind: 'analysis', work: urgent };
		const task = takeBackgroundTask();
		if (task) return { kind: 'background', task };
		const rest = await claimRange(browserSessionId, 2, 3);
		return rest ? { kind: 'analysis', work: rest } : undefined;
	}

	/** Claim analysis work for this scheduler owner within the selected priority range and browser session. */
	function claimRange(browserSessionId: string, minPriorityRank: number, maxPriorityRank: number): Promise<WorkType | undefined> {
		return database.claim({ browserSessionId, kind: 'analysis', owner, minPriorityRank, maxPriorityRank });
	}

	/** Remove and return the oldest queued background task, if any. */
	function takeBackgroundTask(): QueuedBackgroundTask | undefined {
		for (const [key, task] of backgroundTasks) {
			backgroundTasks.delete(key);
			return task;
		}
		return undefined;
	}

	/** Run one background task; a failure is logged and handed to its caller, never to the lane. */
	async function runBackgroundTask(task: QueuedBackgroundTask): Promise<void> {
		if (!generations.isCurrent(task.input.tabId, task.tabGeneration)) {
			task.resolve();
			return;
		}
		try {
			await task.input.run();
			task.resolve();
		} catch (error) {
			options.log?.('scheduler-background-task-failed', {
				key: task.input.key,
				tabId: task.input.tabId,
				errorType: error instanceof Error ? error.name : typeof error,
			});
			task.reject(error);
		}
	}

	/** Resolve and execute a claimed target, then publish completion only if claim cleanup and the tab generation still permit it. */
	async function execute(work: AnalysisWorkType): Promise<void> {
		const claimToken = work.claimToken;
		if (!claimToken) {
			options.log?.('scheduler-analysis-invalid-claim', { workId: work.id, tabId: work.tabId });
			return;
		}
		const executionGeneration = generations.capture(work.tabId);

		try {
			const target = await options.resolveTarget(work);
			const result = target.ok
				? await lane.bound(options.analyze({ target: target.value, mode: work.mode, observe: work.observe }), () => {
					options.log?.('scheduler-analysis-timeout', { workId: work.id, tabId: work.tabId });
				})
				: target;
			const cleanup = await removeClaim(work.id, claimToken);
			if (!canPublish(work, executionGeneration, cleanup, 'completion')) {
				releaseSuperseded(work, cleanup);
				return;
			}
			resolveCompletion(work.id, result);
			options.log?.('scheduler-analysis-complete', {
				workId: work.id,
				tabId: work.tabId,
				priority: work.priority,
				ok: result.ok,
			});
		} catch (error) {
			const result = errorResponse(
				'UNKNOWN',
				error instanceof Error ? error.message : 'Scheduled analysis failed.',
				error instanceof Error ? error.stack : undefined,
			);
			const cleanup = await removeClaim(work.id, claimToken);
			if (!canPublish(work, executionGeneration, cleanup, 'failure')) {
				releaseSuperseded(work, cleanup);
				return;
			}
			resolveCompletion(work.id, result);
			options.log?.('scheduler-analysis-failed', {
				workId: work.id,
				tabId: work.tabId,
				message: error instanceof Error ? error.message : String(error),
			});
		}
	}

	/** Decide whether one completed execution still owns its local result publication. */
	function canPublish(
		work: AnalysisWorkType,
		executionGeneration: number,
		cleanup: ClaimCleanupResult,
		phase: 'completion' | 'failure',
	): boolean {
		if (cleanup.kind === 'stale' || !generations.isCurrent(work.tabId, executionGeneration)) {
			options.log?.(`scheduler-analysis-stale-${phase}`, { workId: work.id, tabId: work.tabId });
			return false;
		}
		if (cleanup.kind === 'failed') {
			options.log?.('scheduler-analysis-cleanup-failed', {
				workId: work.id,
				tabId: work.tabId,
				message: cleanup.error instanceof Error ? cleanup.error.message : String(cleanup.error),
			});
		}
		return true;
	}

	/**
	 * Settle the callers of an execution whose tab changed while it ran.
	 *
	 * Its result must not be published, but its callers still have to settle.
	 * When this execution removed its own record, `cancelTab` can no longer find
	 * it, so nothing else would ever resolve the completion and every caller
	 * (including the automatic-scan controller, which runs one scan per tab at a
	 * time) would wait forever. A `stale` cleanup means a newer admission owns the
	 * id and will resolve the shared completion itself.
	 */
	function releaseSuperseded(work: AnalysisWorkType, cleanup: ClaimCleanupResult): void {
		if (cleanup.kind === 'stale') return;
		resolveCompletion(work.id, canceled('Analysis canceled because its tab changed while it ran.'));
	}

	/** Remove the local completion registrations before settling the caller, preventing later cleanup from settling them again. */
	function resolveCompletion(id: string, result: ExtensionResult<AnalyzeVisibleTabOutput>): void {
		const deferred = deferredById.get(id);
		if (!deferred) return;
		deferredById.delete(id);
		completions.delete(id);
		deferred.resolve(result);
	}

	const deferredById = new Map<string, {
		readonly resolve: (result: ExtensionResult<AnalyzeVisibleTabOutput>) => void;
	}>();

	/** Register or reuse the local completion before durable admission makes the work visible to another drain. */
	function getCompletion(id: string): Completion {
		const existing = completions.get(id);
		if (existing) return existing;
		let resolve!: (result: ExtensionResult<AnalyzeVisibleTabOutput>) => void;
		const completion = new Promise<ExtensionResult<AnalyzeVisibleTabOutput>>((next) => {
			resolve = next;
		});
		deferredById.set(id, { resolve });
		completions.set(id, completion);
		return completion;
	}

	/** Represent canceled admission through the existing validation-failure envelope used by scheduled analysis callers. */
	const canceled = (message: string): ExtensionResult<AnalyzeVisibleTabOutput> => errorResponse('VALIDATION_ERROR', message);

	return {
		/** Admit normal-tab analysis with a generation and cleanup fence; private targets bypass durable storage entirely. */
		async analyze(input, source = 'interactive') {
			if (input.target.incognito) return await options.analyze(input);

			const tabGeneration = generations.capture(input.target.tabId);
			const browserSessionId = await session.get();
			await tabCleanup.wait(input.target.tabId);
			if (!generations.isCurrent(input.target.tabId, tabGeneration)) {
				return canceled('Analysis canceled before it entered the durable queue.');
			}
			const workId = getWorkId(browserSessionId, input);
			const now = Date.now();
			const activeTabId = activeTabByWindow.get(input.target.windowId);
			const workPriority = priority.analysis(source, activeTabId === undefined || activeTabId === input.target.tabId);
			const work = AnalysisWorkSchema.parse({
				schemaVersion: EXECUTION_SCHEMA_VERSION,
				id: workId,
				kind: 'analysis',
				browserSessionId,
				windowId: input.target.windowId,
				tabId: input.target.tabId,
				priority: workPriority,
				priorityRank: priority.rank(workPriority),
				state: 'queued',
				createdAt: now,
				updatedAt: now,
				attempt: 0,
				frameId: input.target.frameId,
				originHash: input.target.originHash,
				urlHash: input.target.urlHash,
				mode: input.mode,
				observe: input.observe,
				source,
			});
			if (!generations.isCurrent(input.target.tabId, tabGeneration)) {
				return canceled('Analysis canceled before it entered the durable queue.');
			}

			// Register the local completion before the durable record becomes claimable.
			// Another tab activation can start `drain()` immediately after the IDB
			// commit, so publishing the record first can otherwise lose completion.
			const completion = getCompletion(work.id);
			let admitted: database.AnalysisAdmissionType;
			try {
				admitted = await database.admitAnalysis(work, MAX_PENDING_ANALYSES);
			} catch (error) {
				const result = errorResponse(
					'UNKNOWN',
					error instanceof Error ? error.message : 'Failed to persist scheduled analysis.',
					error instanceof Error ? error.stack : undefined,
				);
				resolveCompletion(work.id, result);
				return await completion;
			}
			if (!admitted.accepted) {
				resolveCompletion(work.id, errorResponse('VALIDATION_ERROR', 'DeepScope analysis queue reached its bounded work limit.'));
				return await completion;
			}
			if (!generations.isCurrent(input.target.tabId, tabGeneration)) {
				await database.remove(work.id).catch(() => undefined);
				resolveCompletion(work.id, canceled('Analysis canceled while it entered the durable queue.'));
				return await completion;
			}

			// Activation can race the admission transaction. Reconcile against the
			// admitted priority so an automatic caller can never downgrade existing
			// interactive work while correcting stale foreground/background state.
			const currentActiveTabId = activeTabByWindow.get(input.target.windowId);
			const currentPriority = priority.tab(
				admitted.work.priority,
				currentActiveTabId === undefined || currentActiveTabId === input.target.tabId,
			);
			if (currentPriority !== admitted.work.priority) {
				// Priority is an ordering hint. If the write fails the admitted record
				// still runs at its stored priority, so log instead of abandoning a
				// completion that drain() will resolve.
				await database.setPriority(work.id, currentPriority).catch((error: unknown) => {
					options.log?.('scheduler-analysis-priority-update-failed', {
						workId: work.id,
						errorType: error instanceof Error ? error.name : typeof error,
					});
				});
			}
			void drain();
			return await completion;
		},

		/** Update the active tab, persist the window's revised work priorities and request another scheduler drain. */
		async activateTab(tabId, windowId) {
			activeTabByWindow.set(windowId, tabId);
			const browserSessionId = await session.get();
			const changed = await database.reprioritizeWindow(browserSessionId, windowId, tabId);
			options.log?.('scheduler-window-reprioritized', { tabId, windowId, changed });
			void drain();
		},

		/** Deduplicate transient background tasks by caller-provided key and retain their tab generation until settlement. */
		runBackground(input) {
			const existing = backgroundTasks.get(input.key);
			if (existing) return existing.completion;
			let resolve!: () => void;
			let reject!: (error: unknown) => void;
			const completion = new Promise<void>((nextResolve, nextReject) => {
				resolve = nextResolve;
				reject = nextReject;
			});
			backgroundTasks.set(input.key, {
				input,
				tabGeneration: generations.capture(input.tabId),
				completion,
				resolve,
				reject,
			});
			void drain();
			return completion;
		},

		/** Invalidate tab work before serialized durable cleanup, settling local waiters without allowing late admission to revive the tab. */
		async cancelTab(tabId) {
			for (const [windowId, activeTabId] of activeTabByWindow) {
				if (activeTabId === tabId) activeTabByWindow.delete(windowId);
			}
			generations.invalidate(tabId);
			for (const [key, task] of backgroundTasks) {
				if (task.input.tabId !== tabId) continue;
				backgroundTasks.delete(key);
				task.resolve();
			}
			await tabCleanup.run(tabId, async () => {
				const browserSessionId = await session.get();
				const removed = await database.removeTabKind(browserSessionId, tabId, 'analysis');
				for (const work of removed) {
					if (work.kind !== 'analysis') continue;
					resolveCompletion(work.id, errorResponse('VALIDATION_ERROR', 'Analysis canceled because its tab closed.'));
				}
			});
		},

		/** Pause new claims while removing other browser sessions and recovering this scheduler's abandoned analysis claims. */
		async reconcile() {
			paused = true;
			const browserSessionId = await session.get();
			await database.removeOtherSessions(browserSessionId);
			const recovered = await database.recoverClaims(browserSessionId, owner, 'analysis');
			options.log?.('scheduler-analysis-reconciled', {
				recovered: recovered.filter((work) => work.kind === 'analysis').length,
			});
		},

		/** Allow claims after reconciliation and request a drain of retained work. */
		resume() {
			paused = false;
			void drain();
		},
	};
}

/** Deduplicate analysis by browser session, tab, URL, mode and observation choice; preserve this durable identity format. */
function getWorkId(browserSessionId: string, input: AnalyzeVisibleTabInput): string {
	return [
		'analysis',
		browserSessionId,
		input.target.tabId,
		input.target.urlHash,
		input.mode,
		input.observe,
	].join(':');
}
