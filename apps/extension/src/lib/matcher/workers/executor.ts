import * as logging from '../../diagnostics/logging';
import type { MatcherPartitionResult, RunMatcherPartitionRequest } from '../contracts';
import { MatcherError } from '../error';
import { MATCHER_PARTITION_CONCURRENCY } from '../policy';
import { Pool, type DiagnosticSink } from './pool';

const logger = logging.get('matcher', 'worker-executor');

/**
 * Safety watchdog for a staged analysis that stops touching its matcher lifecycle.
 *
 * Normal completion releases the lifecycle explicitly and disposes the workers
 * immediately. This timer exists only for an interrupted background or a missed
 * release.
 */
export const EXECUTOR_IDLE_MS = 30_000;

/** Why the executor released its workers. */
export type ExecutorIdleReason = 'analysis-complete' | 'watchdog';

/** Callbacks that connect the executor to the context that owns it. */
export interface WorkerExecutorOptions {
	/**
	 * Called after the executor disposed its workers and holds no work.
	 * `generation` identifies that moment; see {@link WorkerExecutor.isIdleAt}.
	 */
	readonly onIdle?: (reason: ExecutorIdleReason, generation: number) => void;
	/** Receives diagnostics posted by matcher workers. */
	readonly onDiagnostic?: DiagnosticSink;
	/** Worker slots to create. Defaults to the shared matcher concurrency. */
	readonly workerCount?: number;
}

/** Analysis lifecycle kept warm while its background owner can still queue partitions. */
interface LifecycleLease {
	readonly tabId: number;
	lastTouchedAt: number;
}

/**
 * Run scheduler-selected matcher partitions on dedicated workers.
 *
 * The executor owns the expensive resource, the worker heaps, and nothing about
 * scheduling. It creates the pool when the first partition arrives, keeps it warm
 * while an analysis lifecycle is open, and disposes it as soon as no partition
 * and no lifecycle remain. It does not know how it is reached: in Chrome the
 * offscreen document wraps it in a runtime-message protocol, and in Firefox and
 * Safari the background page calls it directly.
 */
export class WorkerExecutor {
	readonly #options: WorkerExecutorOptions;
	readonly #lifecycles = new Map<string, LifecycleLease>();
	#activePartitions = 0;
	#pool: Pool | undefined;
	#idleTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
	/**
	 * Activity generation. Every partition or lifecycle touch increments it, so an
	 * idle notice that crossed new work in flight can be recognised as stale.
	 */
	#generation = 0;

	constructor(options: WorkerExecutorOptions = {}) {
		this.#options = options;
	}

	/** Maximum partitions that run at once. */
	get capacity(): number {
		return this.#options.workerCount ?? MATCHER_PARTITION_CONCURRENCY;
	}

	/** Execute one partition. Rejects with {@link MatcherError} on cancellation, timeout or failure. */
	async run(request: RunMatcherPartitionRequest): Promise<MatcherPartitionResult> {
		this.#retainLifecycle(request);
		this.#generation += 1;
		this.#activePartitions += 1;
		this.#clearIdleTimer();
		try {
			return await this.#getPool().run(request.task, request.workerIndex);
		} finally {
			this.#activePartitions = Math.max(0, this.#activePartitions - 1);
			this.#scheduleIdle();
		}
	}

	/** Stop worker slots running partitions of one job. Returns how many were stopped. */
	cancelJob(jobId: string): number {
		const count = this.#pool?.cancelJob(jobId, new MatcherError('canceled', 'Matcher job was canceled.')) ?? 0;
		this.#scheduleIdle();
		return count;
	}

	/** Stop worker slots and lifecycle leases owned by one tab. Returns how many partitions were stopped. */
	cancelTab(tabId: number, reason: string): number {
		const count = this.#pool?.cancelTab(tabId, new MatcherError('canceled', `Matcher tab work was canceled: ${reason}.`)) ?? 0;
		for (const [lifecycleId, lease] of this.#lifecycles) {
			if (lease.tabId === tabId) this.#lifecycles.delete(lifecycleId);
		}
		this.#scheduleIdle();
		return count;
	}

	/** Keep the workers warm while staged collection is expected to queue another pass. */
	touchLifecycle(lifecycleId: string, tabId: number): void {
		this.#generation += 1;
		const existing = this.#lifecycles.get(lifecycleId);
		if (existing) existing.lastTouchedAt = Date.now();
		else this.#lifecycles.set(lifecycleId, { tabId, lastTouchedAt: Date.now() });
		this.#scheduleIdle();
	}

	/** Release a finished analysis lifecycle, disposing the workers if nothing else needs them. */
	releaseLifecycle(lifecycleId: string): void {
		this.#lifecycles.delete(lifecycleId);
		this.#scheduleIdle();
	}

	/** Return whether nothing ran or was retained since the idle notice for `generation`. */
	isIdleAt(generation: number): boolean {
		return this.#activePartitions === 0 && this.#lifecycles.size === 0 && generation === this.#generation;
	}

	/** Current activity generation. */
	get generation(): number {
		return this.#generation;
	}

	/** Dispose the workers now, for example when the owning context shuts down. */
	dispose(reason: string): void {
		this.#lifecycles.clear();
		this.#disposePool(reason);
	}

	/** Keep one lifecycle warm after its first partition arrives. */
	#retainLifecycle(request: RunMatcherPartitionRequest): void {
		if (!request.lifecycleId) return;
		this.#lifecycles.set(request.lifecycleId, { tabId: request.task.job.tabId, lastTouchedAt: Date.now() });
	}

	/** Create the pool only when matching first needs CPU capacity. */
	#getPool(): Pool {
		if (this.#pool) return this.#pool;
		this.#pool = this.#options.onDiagnostic
			? new Pool(this.capacity, undefined, this.#options.onDiagnostic)
			: new Pool(this.capacity);
		logger.debug('Created matcher worker pool.', {
			event: 'matcher-worker-pool-created',
			workerCount: this.capacity,
			activePartitionCount: this.#activePartitions,
		});
		return this.#pool;
	}

	/** Terminate the workers so their matcher state can be reclaimed. */
	#disposePool(reason: string): void {
		this.#clearIdleTimer();
		const pool = this.#pool;
		if (!pool) return;
		pool.dispose(reason);
		this.#pool = undefined;
		logger.debug('Disposed matcher worker pool.', {
			event: 'matcher-worker-pool-disposed',
			reason,
			activePartitionCount: this.#activePartitions,
		});
	}

	/** Dispose now if nothing remains, otherwise arm the watchdog for the oldest lifecycle. */
	#scheduleIdle(): void {
		this.#clearIdleTimer();
		if (this.#activePartitions > 0) return;
		if (this.#lifecycles.size === 0) {
			this.#becomeIdle('analysis-complete');
			return;
		}

		let nextDeadline = Number.POSITIVE_INFINITY;
		for (const lease of this.#lifecycles.values()) {
			nextDeadline = Math.min(nextDeadline, lease.lastTouchedAt + EXECUTOR_IDLE_MS);
		}
		this.#idleTimer = globalThis.setTimeout(() => this.#expireLifecycles(), Math.max(0, nextDeadline - Date.now()));
	}

	/** Drop only lifecycles whose own watchdog deadline has passed. */
	#expireLifecycles(): void {
		this.#idleTimer = undefined;
		if (this.#activePartitions > 0) return;
		const now = Date.now();
		for (const [lifecycleId, lease] of this.#lifecycles) {
			if (now - lease.lastTouchedAt >= EXECUTOR_IDLE_MS) this.#lifecycles.delete(lifecycleId);
		}
		if (this.#lifecycles.size > 0) {
			this.#scheduleIdle();
			return;
		}
		this.#becomeIdle('watchdog');
	}

	/**
	 * Dispose the workers and tell the owner that nothing is retained.
	 *
	 * The notice is sent even when no pool existed: in Chrome it is what lets the
	 * background close the offscreen document that hosts this executor.
	 */
	#becomeIdle(reason: ExecutorIdleReason): void {
		this.#disposePool(reason === 'watchdog'
			? `Matcher executor reached the ${EXECUTOR_IDLE_MS}ms idle watchdog.`
			: 'Matcher executor has no active analysis lifecycle.');
		this.#options.onIdle?.(reason, this.#generation);
	}

	#clearIdleTimer(): void {
		if (this.#idleTimer === undefined) return;
		globalThis.clearTimeout(this.#idleTimer);
		this.#idleTimer = undefined;
	}
}
