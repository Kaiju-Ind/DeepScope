import type {
	MatcherJobExecutorResult,
	MatcherJobObserver,
	MatcherJobTerminalReason,
	MatcherPartitionResult,
	MatcherPartitionTask,
	RunMatcherJobRequest,
	RunMatcherPartitionRequest,
} from '@/lib/matcher/contracts';
import { estimateObservationBatchBytes } from '@/lib/matcher/cost';
import { createDetectionStorageHash } from '@/lib/storage/contracts';
import { MatcherError } from '@/lib/matcher/error';
import { createMatcherPartitionTasks } from '@/lib/matcher/partition';

import * as budget from './budget';
import * as database from './database';
import * as fairness from './fairness';
import * as generation from '@/utils/generation';
import * as priority from './priority';
import * as session from './session';
import { EXECUTION_SCHEMA_VERSION, MatcherWorkSchema, type WorkPriorityType } from './schema';
import * as fence from '@/utils/fence';

const MAX_TRANSIENT_JOBS = 8;
const MAX_TRANSIENT_BYTES = 12 * 1024 * 1024;

/** Offscreen capability consumed by the background partition scheduler. */
export interface MatcherPartitionExecutor {
	/** Maximum partitions the hidden worker pool can execute at once. */
	readonly capacity: number;
	/** Execute one already-selected partition. */
	runPartition(request: RunMatcherPartitionRequest): Promise<MatcherPartitionResult>;
	/** Stop active worker slots owned by one matcher job. */
	cancelJob(jobId: string): Promise<void>;
	/** Stop active worker slots and lifecycle state owned by one tab. */
	cancelTab(tabId: number, reason: MatcherJobTerminalReason): Promise<void>;
	touchLifecycle(lifecycleId: string, tabId: number): Promise<void>;
	releaseLifecycle(lifecycleId: string): Promise<void>;
}

/** Job-level matcher capability consumed by the background analysis runtime. */
export interface MatcherScheduler {
	runJob(request: RunMatcherJobRequest, observer?: MatcherJobObserver): Promise<MatcherJobExecutorResult>;
	cancelJob(jobId: string): Promise<void>;
	cancelTab(tabId: number, reason: MatcherJobTerminalReason): Promise<void>;
	touchLifecycle(lifecycleId: string, tabId: number): Promise<void>;
	releaseLifecycle(lifecycleId: string): Promise<void>;
	/** Change future partition order when another tab becomes active. */
	activateTab(tabId: number, windowId: number): Promise<void>;
	/** Cancel orphaned matcher records after service-worker replacement and return exact documents to recollect. */
	reconcile(): Promise<readonly MatcherRecovery[]>;
	/** Resume lifecycle creation and matcher admission after startup reconciliation settles. */
	resume(): void;
}

/** Safe document metadata needed to reproduce matcher work after service-worker replacement. */
export interface MatcherRecovery {
	readonly tabId: number;
	readonly windowId: number;
	/** Hash of the exact URL that owned the orphaned matcher work. */
	readonly documentKey: string;
}

interface PendingMatcher {
	readonly request: RunMatcherJobRequest;
	readonly observer?: MatcherJobObserver;
	readonly estimatedBytes: number;
	readonly createdAt: number;
	readonly durable: boolean;
	readonly remaining: MatcherPartitionTask[];
	readonly partitionCount: number;
	readonly resolve: (result: MatcherJobExecutorResult) => void;
	readonly reject: (error: unknown) => void;
	priority: WorkPriorityType;
	priorityRank: number;
	claimed: boolean;
	startedAt?: number;
	completedPartitionCount: number;
	inFlightPartitionCount: number;
	lastDispatchSequence: number;
}

/**
 * Create the background-owned matcher partition scheduler.
 *
 * IndexedDB stores only small job control records. Raw observation batches and
 * their partitions stay in the service-worker context under explicit count and
 * byte limits. The scheduler selects partitions between jobs, so tab activation
 * can change priority without canceling useful work already completed.
 */
export function create(
	executor: MatcherPartitionExecutor,
	log?: (event: string, details?: Record<string, unknown>) => void,
): MatcherScheduler {
	const owner = session.createId('matcher-scheduler');
	const pending = new Map<string, PendingMatcher>();
	const generations = generation.create<number>();
	const canceledJobs = new Set<string>();
	/** Job ids synchronously registered before the first durable-admission await. */
	const startingJobs = new Set<string>();
	const admittingJobs = new Set<string>();
	/** Tiny terminal cleanup promises that prevent job-id reuse without retaining observation batches. */
	const finishingJobs = new Map<string, Promise<void>>();
	const activeTabByWindow = new Map<number, number>();
	const tabCleanup = fence.create<number>();
	const inFlightKinds = new Set<MatcherPartitionTask['kind']>();
	/** Stable physical worker preference for each warm observation-kind shard. */
	const workerIndexByKind = new Map<MatcherPartitionTask['kind'], number>();
	/** Worker slots currently executing one selected partition. */
	const busyWorkerIndexes = new Set<number>();
	/** Active job owner for each physical worker slot, used to invalidate affinity after cancellation. */
	const activeJobByWorkerIndex = new Map<number, string>();
	let pendingBytes = 0;
	let reservedJobs = 0;
	let reservedBytes = 0;
	let inFlightPartitionCount = 0;
	let dispatchSequence = 0;
	let foregroundDispatches = 0;
	let pumping: Promise<void> | undefined;
	let paused = false;
	let resumeWaiter: (() => void) | undefined;
	let resumed = Promise.resolve();

	/** Pause new matcher admission while startup reconciliation owns persisted/offscreen state. */
	function pause(): void {
		if (paused) return;
		paused = true;
		resumed = new Promise<void>((resolve) => { resumeWaiter = resolve; });
	}

	/** Wait until startup reconciliation releases matcher execution. */
	async function waitUntilResumed(): Promise<void> {
		if (!paused) return;
		await resumed;
	}

	/** Reserve admission capacity synchronously so concurrent pre-persistence awaits cannot oversubscribe RAM. */
	function reserve(estimatedBytes: number): boolean {
		if (!budget.accepts(
			{ count: pending.size + reservedJobs, bytes: pendingBytes + reservedBytes },
			estimatedBytes,
			{ count: MAX_TRANSIENT_JOBS, bytes: MAX_TRANSIENT_BYTES },
		)) return false;
		reservedJobs += 1;
		reservedBytes += estimatedBytes;
		return true;
	}

	/** Release one pre-admission reservation after it becomes pending or fails before admission. */
	function releaseReservation(estimatedBytes: number): void {
		reservedJobs = Math.max(0, reservedJobs - 1);
		reservedBytes = Math.max(0, reservedBytes - estimatedBytes);
	}

	/** Remove one transient matcher payload exactly once and release its byte budget. */
	function takePending(jobId: string): PendingMatcher | undefined {
		const item = pending.get(jobId);
		if (!item) return undefined;
		pending.delete(jobId);
		pendingBytes = Math.max(0, pendingBytes - item.estimatedBytes);
		return item;
	}

	/** Keep one job identity unavailable until terminal physical and durable cleanup settles. */
	function trackFinishing(jobId: string, cleanup: Promise<unknown>): Promise<void> {
		const finishing = cleanup
			.then(() => undefined, (error) => {
				log?.('scheduler-matcher-cleanup-failed', {
					jobId,
					message: error instanceof Error ? error.message : 'Matcher terminal cleanup failed.',
				});
			})
			.finally(() => {
				finishingJobs.delete(jobId);
				if (!startingJobs.has(jobId) && !admittingJobs.has(jobId)) canceledJobs.delete(jobId);
			});
		finishingJobs.set(jobId, finishing);
		return finishing;
	}

	/** Start or continue dispatching partitions until all worker slots are occupied. */
	function pump(): void {
		if (paused || pumping) return;
		const task = pumpAvailable().finally(() => {
			if (pumping === task) pumping = undefined;
			if (inFlightPartitionCount < executor.capacity && hasRunnablePartition()) pump();
		});
		pumping = task;
	}

	/** Claim selected jobs lazily and dispatch independent partition kinds in priority order. */
	async function pumpAvailable(): Promise<void> {
		while (inFlightPartitionCount < Math.max(1, executor.capacity)) {
			const selected = selectNext();
			if (!selected) return;
			const item = pending.get(selected.jobId);
			if (!item) continue;
			if (item.durable && !item.claimed) {
				const claimed = await database.claimId({ id: selected.jobId, owner });
				if (!claimed || !pending.has(selected.jobId)) {
					failJob(selected.jobId, new MatcherError('canceled', 'Matcher work disappeared before its first partition claim.'));
					continue;
				}
				item.claimed = true;

				// Claiming crosses an IndexedDB await. Re-run selection before dispatch so
				// a tab activation during the transaction can affect this partition boundary.
				continue;
			}
			dispatch(item, selected.task, selected.workerIndex);
		}
	}

	/** Dispatch one partition without awaiting it so independent physical workers remain concurrent. */
	function dispatch(item: PendingMatcher, task: MatcherPartitionTask, workerIndex: number): void {
		const taskIndex = item.remaining.findIndex((candidate) => candidate.partitionId === task.partitionId);
		if (taskIndex < 0) return;
		item.remaining.splice(taskIndex, 1);
		item.inFlightPartitionCount += 1;
		item.lastDispatchSequence = ++dispatchSequence;
		inFlightPartitionCount += 1;
		inFlightKinds.add(task.kind);
		busyWorkerIndexes.add(workerIndex);
		activeJobByWorkerIndex.set(workerIndex, item.request.job.jobId);
		if (!workerIndexByKind.has(task.kind)) workerIndexByKind.set(task.kind, workerIndex);

		if (item.startedAt === undefined) {
			item.startedAt = Date.now();
			void notifyState(item, 'running').catch((error) => failJob(item.request.job.jobId, error));
		}

		void executor.runPartition({
			task,
			workerIndex,
			...(item.request.lifecycleId ? { lifecycleId: item.request.lifecycleId } : {}),
		}).then(async (result) => {
			const current = pending.get(item.request.job.jobId);
			if (current !== item || canceledJobs.has(item.request.job.jobId)) return;
			item.completedPartitionCount += 1;
			await item.observer?.onPartition?.({
				partition: result,
				completedPartitionCount: item.completedPartitionCount,
				partitionCount: item.partitionCount,
			});
		}).catch((error) => {
			if (!canceledJobs.has(item.request.job.jobId)) failJob(item.request.job.jobId, error);
		}).finally(() => {
			item.inFlightPartitionCount = Math.max(0, item.inFlightPartitionCount - 1);
			inFlightPartitionCount = Math.max(0, inFlightPartitionCount - 1);
			inFlightKinds.delete(task.kind);
			busyWorkerIndexes.delete(workerIndex);
			if (activeJobByWorkerIndex.get(workerIndex) === item.request.job.jobId) activeJobByWorkerIndex.delete(workerIndex);
			if (pending.get(item.request.job.jobId) === item) finishIfComplete(item);
			pump();
		});
	}

	/** Complete one matcher job only after every selected partition and observer callback settled. */
	function finishIfComplete(item: PendingMatcher): void {
		if (item.remaining.length > 0 || item.inFlightPartitionCount > 0) return;
		const jobId = item.request.job.jobId;
		if (pending.get(jobId) !== item) return;

		// Snapshot only the small terminal result before releasing the PendingMatcher.
		// Durable cleanup must not retain the completed ObservationBatch in RAM.
		const resolve = item.resolve;
		const result: MatcherJobExecutorResult = {
			job: item.request.job,
			mode: item.request.mode,
			partitionCount: item.completedPartitionCount,
			executor: 'offscreen-worker-pool',
			completedAt: Date.now(),
		};
		takePending(jobId);
		canceledJobs.delete(jobId);

		void trackFinishing(
			jobId,
			(item.durable ? database.remove(jobId).catch(() => undefined) : Promise.resolve()).then(() => resolve(result)),
		);
	}

	/** Fail one job and stop only worker slots that still execute its partitions. */
	function failJob(jobId: string, error: unknown): void {
		const item = takePending(jobId);
		if (!item) return;
		canceledJobs.add(jobId);
		item.reject(error);
		forgetAffinityForJob(jobId);
		const stop = executor.cancelJob(jobId);
		const remove = item.durable ? database.remove(jobId).catch(() => undefined) : Promise.resolve();
		void trackFinishing(jobId, Promise.all([stop, remove]));
	}

	/** Choose one runnable partition while preserving kind affinity and bounded background fairness. */
	function selectNext(): { readonly jobId: string; readonly task: MatcherPartitionTask; readonly workerIndex: number } | undefined {
		const taskByJob = new Map<string, { readonly task: MatcherPartitionTask; readonly workerIndex: number }>();
		const candidates: fairness.Candidate[] = [];
		for (const [jobId, item] of pending) {
			if (canceledJobs.has(jobId)) continue;
			const runnable = findRunnableTask(item);
			if (!runnable) continue;
			const { task, workerIndex } = runnable;
			taskByJob.set(jobId, runnable);
			candidates.push({
				jobId,
				priorityRank: item.priorityRank,
				createdAt: item.createdAt,
				lastDispatchSequence: item.lastDispatchSequence,
				taskPriority: task.priority,
			});
		}
		const selection = fairness.select(candidates, foregroundDispatches);
		if (!selection) return undefined;
		foregroundDispatches = selection.foregroundDispatches;
		const runnable = taskByJob.get(selection.candidate.jobId);
		return runnable ? { jobId: selection.candidate.jobId, ...runnable } : undefined;
	}

	function hasRunnablePartition(): boolean {
		for (const [jobId, item] of pending) {
			if (!canceledJobs.has(jobId) && findRunnableTask(item)) return true;
		}
		return false;
	}

	/** Find the first partition whose affinity worker is currently available. */
	function findRunnableTask(item: PendingMatcher): { readonly task: MatcherPartitionTask; readonly workerIndex: number } | undefined {
		for (const task of item.remaining) {
			if (inFlightKinds.has(task.kind)) continue;
			const workerIndex = getAvailableWorkerIndex(task.kind);
			if (workerIndex !== undefined) return { task, workerIndex };
		}
		return undefined;
	}

	/** Preserve a warm shard on its previous worker instead of duplicating it onto an idle peer. */
	function getAvailableWorkerIndex(kind: MatcherPartitionTask['kind']): number | undefined {
		const preferred = workerIndexByKind.get(kind);
		if (preferred !== undefined) return busyWorkerIndexes.has(preferred) ? undefined : preferred;
		for (let index = 0; index < Math.max(1, executor.capacity); index += 1) {
			if (!busyWorkerIndexes.has(index)) return index;
		}
		return undefined;
	}

	/** Forget every affinity mapped to a worker heap that cancellation will replace. */
	function forgetAffinityForJob(jobId: string): void {
		for (const [workerIndex, activeJobId] of activeJobByWorkerIndex) {
			if (activeJobId !== jobId) continue;
			for (const [kind, affinityIndex] of workerIndexByKind) {
				if (affinityIndex === workerIndex) workerIndexByKind.delete(kind);
			}
		}
	}

	/** Forget affinities for worker heaps that currently execute work owned by the canceled tab. */
	function forgetAffinityForTab(tabId: number): void {
		for (const [workerIndex, jobId] of activeJobByWorkerIndex) {
			if (pending.get(jobId)?.request.job.tabId !== tabId) continue;
			for (const [kind, affinityIndex] of workerIndexByKind) {
				if (affinityIndex === workerIndex) workerIndexByKind.delete(kind);
			}
		}
	}

	function getPriority(request: RunMatcherJobRequest): WorkPriorityType {
		const activeTabId = activeTabByWindow.get(request.job.windowId);
		return activeTabId === undefined || activeTabId === request.job.tabId ? 'foreground' : 'background';
	}

	async function notifyState(item: PendingMatcher, phase: 'queued' | 'running'): Promise<void> {
		await item.observer?.onState?.({
			jobId: item.request.job.jobId,
			phase,
			queuedAt: item.createdAt,
			...(item.startedAt === undefined ? {} : { startedAt: item.startedAt }),
			queueDepth: pending.size,
			queueEstimatedBytes: pendingBytes,
			partitionCount: item.partitionCount,
		});
	}

	return {
		async runJob(request, observer) {
			if (pending.has(request.job.jobId) || startingJobs.has(request.job.jobId) || admittingJobs.has(request.job.jobId) || finishingJobs.has(request.job.jobId) || canceledJobs.has(request.job.jobId)) {
				throw new MatcherError('host-failed', `Matcher job ${request.job.jobId} is already pending.`);
			}

			const estimatedBytes = estimateObservationBatchBytes(request.batch);
			if (!reserve(estimatedBytes)) {
				throw new MatcherError('queue-full', `Matcher scheduler exceeded its ${MAX_TRANSIENT_JOBS}-job or ${MAX_TRANSIENT_BYTES}-byte transient limit.`);
			}
			let reservationHeld = true;

			const tabGeneration = generations.capture(request.job.tabId);
			try {
				const durable = request.job.incognito !== true;
				let browserSessionId = 'incognito';
				startingJobs.add(request.job.jobId);
				try {
					await waitUntilResumed();
					if (canceledJobs.has(request.job.jobId)) {
						canceledJobs.delete(request.job.jobId);
						throw new MatcherError('canceled', 'Matcher job was canceled before admission.');
					}
					if (durable) browserSessionId = await session.get();
					if (canceledJobs.has(request.job.jobId)) {
						canceledJobs.delete(request.job.jobId);
						throw new MatcherError('canceled', 'Matcher job was canceled before durable admission.');
					}
				} finally {
					startingJobs.delete(request.job.jobId);
				}
				await tabCleanup.wait(request.job.tabId);
				if (!generations.isCurrent(request.job.tabId, tabGeneration)) {
					throw new MatcherError('canceled', 'Matcher job was canceled before durable admission.');
				}

				const workPriority = getPriority(request);
				const createdAt = Date.now();
				const tasks = [...createMatcherPartitionTasks({
					job: request.job,
					batch: request.batch,
					...(request.options ? { options: request.options } : {}),
				})];
				let resolve!: (result: MatcherJobExecutorResult) => void;
				let reject!: (error: unknown) => void;
				const completion = new Promise<MatcherJobExecutorResult>((nextResolve, nextReject) => {
					resolve = nextResolve;
					reject = nextReject;
				});
				const item: PendingMatcher = {
					request,
					observer,
					estimatedBytes,
					createdAt,
					durable,
					remaining: tasks,
					partitionCount: tasks.length,
					resolve,
					reject,
					priority: workPriority,
					priorityRank: priority.rank(workPriority),
					claimed: !durable,
					completedPartitionCount: 0,
					inFlightPartitionCount: 0,
					lastDispatchSequence: 0,
				};
				pending.set(request.job.jobId, item);
				pendingBytes += estimatedBytes;
				releaseReservation(estimatedBytes);
				reservationHeld = false;

				if (durable) {
					const work = MatcherWorkSchema.parse({
						schemaVersion: EXECUTION_SCHEMA_VERSION,
						id: request.job.jobId,
						kind: 'matcher',
						browserSessionId,
						windowId: request.job.windowId,
						tabId: request.job.tabId,
						documentKey: createDetectionStorageHash(request.job.expectedUrl),
						priority: workPriority,
						priorityRank: priority.rank(workPriority),
						state: 'queued',
						createdAt,
						updatedAt: createdAt,
						attempt: 0,
						mode: request.mode,
						estimatedBytes,
					});
					admittingJobs.add(work.id);
					try {
						await database.save(work);
					} catch (error) {
						admittingJobs.delete(work.id);
						takePending(work.id);
						reject(error);
						return await completion;
					}
					admittingJobs.delete(work.id);
					if (!generations.isCurrent(request.job.tabId, tabGeneration) || canceledJobs.has(work.id) || !pending.has(work.id)) {
						await database.remove(work.id).catch(() => undefined);
						takePending(work.id);
						canceledJobs.delete(work.id);
						reject(new MatcherError('canceled', 'Matcher job was canceled during durable admission.'));
						return await completion;
					}

					// Activation can race the IndexedDB commit. Persist the priority currently
					// owned by the in-memory scheduler before the record becomes recovery state.
					if (item.priority !== workPriority) await database.setPriority(work.id, item.priority);
				}

				log?.('scheduler-matcher-queued', {
					jobId: request.job.jobId,
					tabId: request.job.tabId,
					priority: workPriority,
					estimatedBytes,
					partitionCount: tasks.length,
					pendingBytes,
				});
				try {
					await notifyState(item, 'queued');
				} catch (error) {
					failJob(request.job.jobId, error);
					return await completion;
				}
				if (tasks.length === 0) finishIfComplete(item);
				else pump();
				return await completion;
			} catch (error) {
				if (reservationHeld) releaseReservation(estimatedBytes);
				throw error;
			}
		},

		async cancelJob(jobId) {
			const finishing = finishingJobs.get(jobId);
			if (finishing) {
				await finishing;
				return;
			}
			canceledJobs.add(jobId);
			forgetAffinityForJob(jobId);
			const item = takePending(jobId);
			item?.reject(new MatcherError('canceled', 'Matcher job was canceled.'));

			// Start physical cancellation before durable cleanup. A slow IndexedDB
			// transaction must never keep canceled matcher CPU work running.
			const stop = executor.cancelJob(jobId);
			const cleanup = item?.durable === false ? Promise.resolve() : database.remove(jobId).catch(() => undefined);
			await trackFinishing(jobId, Promise.all([stop, cleanup]));
		},

		async cancelTab(tabId, reason) {
			for (const [windowId, activeTabId] of activeTabByWindow) {
				if (activeTabId === tabId) activeTabByWindow.delete(windowId);
			}
			generations.invalidate(tabId);
			forgetAffinityForTab(tabId);
			const canceledJobIds: string[] = [];
			for (const [jobId, item] of [...pending]) {
				if (item.request.job.tabId !== tabId) continue;
				canceledJobs.add(jobId);
				canceledJobIds.push(jobId);
				takePending(jobId)?.reject(new MatcherError('canceled', `Matcher job canceled: ${reason}.`));
			}

			// The offscreen executor owns the live CPU resource. Ask it to stop before
			// awaiting browser-session lookup or IndexedDB cleanup.
			const stop = executor.cancelTab(tabId, reason);
			const cleanup = tabCleanup.run(tabId, async () => {
				const browserSessionId = await session.get();
				return await database.removeTabKind(browserSessionId, tabId, 'matcher');
			});
			const terminal = Promise.all([cleanup, stop]);
			for (const jobId of canceledJobIds) finishingJobs.set(jobId, terminal.then(() => undefined));
			let removed: Awaited<typeof cleanup> = [];
			try {
				[removed] = await terminal;
			} finally {
				// Incognito jobs have no durable record, so cleanup cannot depend on the
				// database deletion result. Keep only admission tombstones that still guard
				// a record whose commit may complete after this cancellation.
				for (const jobId of canceledJobIds) {
					finishingJobs.delete(jobId);
					if (!admittingJobs.has(jobId)) canceledJobs.delete(jobId);
				}
				for (const work of removed) {
					if (!admittingJobs.has(work.id)) canceledJobs.delete(work.id);
				}
			}
		},

		async touchLifecycle(lifecycleId, tabId) {
			await waitUntilResumed();
			await executor.touchLifecycle(lifecycleId, tabId);
		},

		async releaseLifecycle(lifecycleId) {
			await executor.releaseLifecycle(lifecycleId);
		},

		async activateTab(tabId, windowId) {
			activeTabByWindow.set(windowId, tabId);
			let hasDurableWork = false;
			for (const item of pending.values()) {
				if (item.request.job.windowId !== windowId) continue;
				const nextPriority = priority.tab(item.priority, item.request.job.tabId === tabId);
				item.priority = nextPriority;
				item.priorityRank = priority.rank(nextPriority);
				hasDurableWork ||= item.durable;
			}
			if (hasDurableWork) {
				const browserSessionId = await session.get();
				await database.reprioritizeWindow(browserSessionId, windowId, tabId);
			}
			pump();
		},

		async reconcile() {
			pause();
			const browserSessionId = await session.get();
			await database.removeOtherSessions(browserSessionId);
			const matcherRecords = await database.listKind(browserSessionId, 'matcher');
			const tabIds = [...new Set(matcherRecords.map((work) => work.tabId))];
			for (const tabId of tabIds) await executor.cancelTab(tabId, 'context-interrupted');
			for (const work of matcherRecords) await database.remove(work.id);

			const recoveriesByDocument = new Map<string, MatcherRecovery>();
			for (const work of matcherRecords) {
				const recovery = { tabId: work.tabId, windowId: work.windowId, documentKey: work.documentKey };
				recoveriesByDocument.set(`${work.windowId}:${work.tabId}:${work.documentKey}`, recovery);
			}
			const recoveries = [...recoveriesByDocument.values()];
			log?.('scheduler-matcher-reconciled', { orphanedJobs: matcherRecords.length, recoveries });
			return recoveries;
		},

		resume() {
			if (!paused) return;
			paused = false;
			const resolve = resumeWaiter;
			resumeWaiter = undefined;
			resolve?.();
			pump();
		},
	};
}
