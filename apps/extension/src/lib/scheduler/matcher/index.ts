import * as startup from './reconciliation.ts';
import * as record from './record.ts';
import * as select from './select.ts';
import * as session from "../session.ts";
import * as generation from "../../../utils/generation.ts";
import * as fence from "../../../utils/fence.ts";
import type { MatcherPartitionTask, MatcherJobExecutorResult, RunMatcherJobRequest } from "../../matcher/contracts.ts";
import * as budget from "../budget.ts";
import * as database from "../database.ts";
import { MatcherError } from "../../matcher/error.ts";
import type { WorkPriorityType } from "../schema.ts";
import { estimateObservationBatchBytes } from "../../matcher/cost.ts";
import { createMatcherPartitionTasks } from "../../matcher/partition.ts";
import * as priority from "../priority.ts";
import type { MatcherPartitionExecutor, MatcherScheduler, PendingMatcher } from "./types.ts";

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
	/** Transient jobs and estimated bytes, from reservation until the job leaves `pending`. */
	const admission = budget.create();
	const selection = select.create({
		pending, canceledJobs, inFlightKinds, workerIndexByKind, busyWorkerIndexes,
		/** Read the executor's current capacity when selecting dispatch work instead of caching an earlier value. */
		getCapacity: () => executor.capacity,
	});
	let pendingBytes = 0;
	let inFlightPartitionCount = 0;
	let dispatchSequence = 0;
	let foregroundDispatches = 0;
	let pumping: Promise<void> | undefined;
	const reconciliation = startup.create();

	/** Remove one transient matcher payload exactly once and release its byte budget. */
	function takePending(jobId: string): PendingMatcher | undefined {
		const item = pending.get(jobId);
		if (!item) return undefined;
		pending.delete(jobId);
		pendingBytes = Math.max(0, pendingBytes - item.estimatedBytes);
		item.lease.release();
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
		if (reconciliation.isPaused() || pumping) return;
		const task = pumpAvailable().finally(() => {
			if (pumping === task) pumping = undefined;
			if (inFlightPartitionCount < executor.capacity && selection.hasRunnablePartition()) pump();
		});
		pumping = task;
	}

	/** Claim selected jobs lazily and dispatch independent partition kinds in priority order. */
	async function pumpAvailable(): Promise<void> {
		while (inFlightPartitionCount < Math.max(1, executor.capacity)) {
			const selected = selection.selectNext(foregroundDispatches);
			if (!selected) return;
			const item = pending.get(selected.jobId);
			if (!item) continue;
			// A durable claim is not a dispatch: the loop re-selects afterwards, so the
			// foreground burst counter must not advance here.
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
			foregroundDispatches = selected.foregroundDispatches;
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
			executor: executor.kind,
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

	/** Treat the window's active tab as foreground; an unknown active tab also receives foreground priority. */
	function getPriority(request: RunMatcherJobRequest): WorkPriorityType {
		const activeTabId = activeTabByWindow.get(request.job.windowId);
		return activeTabId === undefined || activeTabId === request.job.tabId ? 'foreground' : 'background';
	}

	/** Deliver queue or running progress with this scheduler's current queue size and partition counts. */
	async function notifyState(item: PendingMatcher, phase: 'queued' | 'running'): Promise<void> {
		await item.observer?.onState?.({
			jobId: item.request.job.jobId,
			phase,
			executor: executor.kind,
			queuedAt: item.createdAt,
			...(item.startedAt === undefined ? {} : { startedAt: item.startedAt }),
			queueDepth: pending.size,
			queueEstimatedBytes: pendingBytes,
			partitionCount: item.partitionCount,
		});
	}

	return {
		/** Reserve transient capacity before awaits, fence durable admission against cancellation and transfer lease ownership to the pending job. */
		async runJob(request, observer) {
			if (pending.has(request.job.jobId) || startingJobs.has(request.job.jobId) || admittingJobs.has(request.job.jobId) || finishingJobs.has(request.job.jobId) || canceledJobs.has(request.job.jobId)) {
				throw new MatcherError('host-failed', `Matcher job ${request.job.jobId} is already pending.`);
			}

			const estimatedBytes = estimateObservationBatchBytes(request.batch);
			// Reserve synchronously so concurrent pre-persistence awaits cannot oversubscribe RAM.
			const lease = budget.reserve(admission, estimatedBytes);
			if (!lease) {
				throw new MatcherError('queue-full', `Matcher scheduler exceeded its ${budget.LIMIT.jobs}-job or ${budget.LIMIT.bytes}-byte transient limit.`);
			}
			let reservationHeld = true;

			const tabGeneration = generations.capture(request.job.tabId);
			try {
				const durable = request.job.incognito !== true;
				let browserSessionId = 'incognito';
				startingJobs.add(request.job.jobId);
				try {
					await reconciliation.wait();
					if (canceledJobs.has(request.job.jobId)) {
						canceledJobs.delete(request.job.jobId);
						throw new MatcherError('canceled', 'Matcher job was canceled before admission.');
					}
					if (durable) browserSessionId = await session.get();
					if (canceledJobs.has(request.job.jobId)) {
						canceledJobs.delete(request.job.jobId);
						throw new MatcherError('canceled', 'Matcher job was canceled before durable admission.');
					}
					// Stay in `startingJobs` across the tab cleanup fence: `cancelJob` can run
					// while this call waits, and its tombstone must survive until it is checked
					// below (terminal cleanup keeps tombstones of starting jobs).
					await tabCleanup.wait(request.job.tabId);
					if (!generations.isCurrent(request.job.tabId, tabGeneration)) {
						throw new MatcherError('canceled', 'Matcher job was canceled before durable admission.');
					}
					if (canceledJobs.has(request.job.jobId)) {
						canceledJobs.delete(request.job.jobId);
						throw new MatcherError('canceled', 'Matcher job was canceled before admission.');
					}
				} finally {
					startingJobs.delete(request.job.jobId);
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
				// Cancellation can reject this Promise while `runJob` is still awaiting
				// IndexedDB admission, before it reaches `await completion`. A no-op
				// handler keeps that window from reporting a transient unhandled
				// rejection; the caller still observes the rejection below.
				completion.catch(() => undefined);
				const item: PendingMatcher = {
					request,
					observer,
					estimatedBytes,
					lease,
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
				// The pending item now owns the lease; `takePending` releases it.
				reservationHeld = false;

				if (durable) {
					const work = record.create(request, browserSessionId, workPriority, createdAt, estimatedBytes);
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
					if (item.priority !== workPriority) {
						try {
							await database.setPriority(work.id, item.priority);
						} catch (error) {
							// The job is already pending and counted against admission. Fail it
							// through the normal path so its budget and durable record are
							// released instead of leaking a job that never dispatches.
							failJob(work.id, error);
							return await completion;
						}
					}
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
				if (reservationHeld) lease.release();
				throw error;
			}
		},

		/** Stop live execution before waiting for durable removal and retain cancellation state until terminal cleanup settles. */
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

		/** Invalidate the tab generation, stop its CPU work and serialize durable cleanup without losing pending-admission tombstones. */
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

		/** Wait for reconciliation before asking the executor to retain a live tab lifecycle. */
		async touchLifecycle(lifecycleId, tabId) {
			await reconciliation.wait();
			await executor.touchLifecycle(lifecycleId, tabId);
		},

		/** Release the executor's lifecycle claim; the executor decides when its shared host can stop. */
		async releaseLifecycle(lifecycleId) {
			await executor.releaseLifecycle(lifecycleId);
		},

		/** Reprioritize pending work for one window, persist priorities where needed and reconsider runnable partitions. */
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

		/** Pause admission before recovering stored matcher state and the executor's lifecycle. */
		reconcile() {
			reconciliation.pause();
			return record.recover(executor, log);
		},

		/** Restart dispatch only when reconciliation changes from paused to active. */
		resume() {
			if (!reconciliation.resume()) return;
			pump();
		},
	};
}
