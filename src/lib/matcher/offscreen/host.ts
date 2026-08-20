import { browser } from 'wxt/browser';

import * as logging from '../../diagnostics/logging';
import {
	MATCHER_OFFSCREEN_CHANNEL,
	type MatcherHostIdleMessage,
	type MatcherJobStateMessage,
	type MatcherOffscreenRequestMessage,
	type MatcherOffscreenResponse,
	type MatcherPartitionProgressMessage,
	type MatcherPartitionResult,
	type OffscreenMatcherJobRequest,
	type OffscreenMatcherJobResult,
} from '../contracts';
import { createMatcherPartitionTasks } from '../partition';
import { Pool } from './pool';
import * as queue from './queue';

const logger = logging.get('offscreen', 'matcher-host');

/** Default dedicated-worker count used until representative benchmarks justify another value. */
const DEFAULT_WORKER_COUNT = 2;

/** Retention safety limit for full observation batches waiting in the offscreen host. */
const MAX_QUEUED_JOBS = 8;

/** One grace period before both worker heaps and the hidden host document are released. */
const HOST_IDLE_MS = 30_000;

/**
 * Offscreen matcher host state.
 *
 * Chrome permits one offscreen document for the extension profile, so this host
 * serializes complete matcher jobs while each job uses a small dedicated-worker
 * pool for partition parallelism. The queue is deliberately bounded because each
 * waiting request owns an observation batch. Cancellation removes queued batches
 * immediately and terminates active worker heaps when necessary.
 */
class Host {
	readonly #canceled = new Set<string>();
	readonly #queue = queue.create<OffscreenMatcherJobRequest, OffscreenMatcherJobResult>({
		limit: MAX_QUEUED_JOBS,
		getId: (request) => request.job.jobId,
		getPriority: priority,
		onPosition: (request, position, depth, queuedAt) => {
			this.#emitState({
				channel: MATCHER_OFFSCREEN_CHANNEL,
				type: 'matcher.job-state',
				jobId: request.job.jobId,
				phase: 'queued',
				queuedAt,
				queuePosition: position,
				queueDepth: depth,
			});
		},
	});
	#activeJobId: string | undefined;
	#running = false;
	#pool: Pool | undefined;
	#idleTimer: ReturnType<typeof globalThis.setTimeout> | undefined;

	/** Register the runtime message surface owned by the loaded offscreen document. */
	start(): void {
		browser.runtime.onMessage.addListener((message: unknown): Promise<MatcherOffscreenResponse> | undefined => {
			if (!isRequest(message)) return undefined;
			if (message.type === 'matcher.ping') return Promise.resolve({ ok: true, ready: true });
			if (message.type === 'matcher.cancel-job') return Promise.resolve(this.#cancel(message.jobId));
			const result = this.#queue.add(message.request);
			this.#drain();
			return result
				.then((value): MatcherOffscreenResponse => ({ ok: true, value }))
				.catch((error): MatcherOffscreenResponse => ({
					ok: false,
					reason: hostFailure(error),
					message: error instanceof Error ? error.message : 'Offscreen matcher host failed.',
				}));
		});

		this.#drain();
	}

	/** Cancel queued work or terminate the pool that currently owns this job. */
	#cancel(jobId: string): MatcherOffscreenResponse {
		this.#canceled.add(jobId);
		this.#queue.cancel(jobId);
		if (this.#activeJobId === jobId) {
			this.#dispose('Matcher job was canceled.');
		} else {
			// Queued work is removed synchronously. Late cancellation has no active
			// executor either, so both paths must release the temporary job marker.
			this.#canceled.delete(jobId);
		}
		return { ok: true, canceled: true, jobId };
	}

	/** Claim one queued job and continue until the queue becomes empty. */
	#drain(): void {
		if (this.#running) return;
		const next = this.#queue.take();
		if (!next) {
			this.#scheduleIdle();
			return;
		}

		this.#running = true;
		this.#activeJobId = next.request.job.jobId;
		void this.#run(next.request, next.queuedAt)
			.then(next.resolve, (error) => {
				this.#dispose(error instanceof Error ? error.message : 'Matcher job failed.');
				next.reject(error);
			})
			.finally(() => {
				this.#canceled.delete(next.request.job.jobId);
				this.#activeJobId = undefined;
				this.#running = false;
				this.#drain();
			});
	}

	/** Run one complete matcher job after it acquires the shared worker pool. */
	async #run(request: OffscreenMatcherJobRequest, queuedAt: number): Promise<OffscreenMatcherJobResult> {
		const tasks = createMatcherPartitionTasks({
			job: request.job,
			batch: request.batch,
			options: request.options,
		});
		const startedAt = Date.now();
		this.#emitState({
			channel: MATCHER_OFFSCREEN_CHANNEL,
			type: 'matcher.job-state',
			jobId: request.job.jobId,
			phase: 'running',
			queuedAt,
			startedAt,
			queueDepth: this.#queue.size,
			partitionCount: tasks.length,
		});

		const partitionCount = await this.#getPool(request).run(tasks);
		if (this.#canceled.has(request.job.jobId)) throw new Error('Matcher job was canceled before completion.');
		return { job: request.job, mode: request.mode, partitionCount, completedAt: Date.now() };
	}

	/** Reuse hot workers across nearby jobs while keeping their lifetime explicit. */
	#getPool(request: OffscreenMatcherJobRequest): Pool {
		this.#clearIdle();
		if (this.#pool) return this.#pool;
		const workerCount = request.maxWorkerCount ?? DEFAULT_WORKER_COUNT;
		this.#pool = new Pool(workerCount, {
			isCanceled: (jobId) => this.#canceled.has(jobId),
			onPartition: (partition, completedPartitionCount, partitionCount) =>
				this.#emitPartition(partition, completedPartitionCount, partitionCount),
		});
		logger.debug('Created matcher worker pool.', {
			event: 'matcher-worker-pool-created',
			workerCount,
			jobId: request.job.jobId,
			queuedJobCount: this.#queue.size,
		});
		return this.#pool;
	}

	/** Terminate the worker pool after cancellation, failure, or idle expiry. */
	#dispose(reason: string): void {
		this.#clearIdle();
		const pool = this.#pool;
		if (!pool) return;
		pool.dispose(reason);
		this.#pool = undefined;
		logger.debug('Disposed matcher worker pool.', {
			event: 'matcher-worker-pool-disposed',
			reason,
			activeJobId: this.#activeJobId,
			queuedJobCount: this.#queue.size,
		});
	}

	/**
	 * Release the complete matcher host after one idle grace period.
	 *
	 * The offscreen document owns this timer because a Manifest V3 background timer
	 * can disappear when Chrome suspends the service worker. Expiry first terminates
	 * every dedicated worker, then asks the background to close the document through
	 * the privileged Offscreen API. A new queued job cancels the same timer.
	 */
	#scheduleIdle(): void {
		this.#clearIdle();
		this.#idleTimer = globalThis.setTimeout(() => {
			this.#idleTimer = undefined;
			if (this.#running || this.#queue.size > 0) return;
			this.#dispose(`Matcher host reached the ${HOST_IDLE_MS}ms idle limit.`);
			this.#emitIdle();
		}, HOST_IDLE_MS);
	}

	/** Cancel host-idle disposal while work is active or newly queued. */
	#clearIdle(): void {
		if (this.#idleTimer === undefined) return;
		globalThis.clearTimeout(this.#idleTimer);
		this.#idleTimer = undefined;
	}

	/** Wake the background so it can close this offscreen document immediately. */
	#emitIdle(): void {
		logger.debug('Matcher host reached its idle grace period.', {
			event: 'matcher-host-idle',
			idleMs: HOST_IDLE_MS,
		});
		const message: MatcherHostIdleMessage = {
			channel: MATCHER_OFFSCREEN_CHANNEL,
			type: 'matcher.host-idle',
			idleAt: Date.now(),
		};
		void browser.runtime.sendMessage(message).catch(() => undefined);
	}

	/** Publish queue/execution state without making delivery authoritative to matching. */
	#emitState(message: MatcherJobStateMessage): void {
		void browser.runtime.sendMessage(message).catch(() => undefined);
	}

	/** Publish completed partitions so the background can build partial visible results. */
	#emitPartition(
		partition: MatcherPartitionResult,
		completedPartitionCount: number,
		partitionCount: number,
	): Promise<void> {
		const message: MatcherPartitionProgressMessage = {
			channel: MATCHER_OFFSCREEN_CHANNEL,
			type: 'matcher.partition-complete',
			partition,
			completedPartitionCount,
			partitionCount,
		};
		return browser.runtime.sendMessage(message).then(() => undefined);
	}
}

/** Classify host failures without forcing the background to parse human error text. */
function hostFailure(error: unknown): 'queue-full' | 'canceled' | 'failed' {
	if (error instanceof queue.QueueFullError) return 'queue-full';
	if (error instanceof Error && error.message.toLowerCase().includes('canceled')) return 'canceled';
	return 'failed';
}

/** Start the offscreen matcher host after the WXT runtime document loads. */
export function start(): void {
	new Host().start();
}

/** Complete jobs run before evidence passes while FIFO order is preserved per mode. */
function priority(request: OffscreenMatcherJobRequest): number {
	return request.mode === 'complete' ? 1 : 2;
}

/** Ignore diagnostic, progress, and unrelated extension messages. */
function isRequest(message: unknown): message is MatcherOffscreenRequestMessage {
	return Boolean(
		message &&
		typeof message === 'object' &&
		'channel' in message &&
		message.channel === MATCHER_OFFSCREEN_CHANNEL &&
		'type' in message &&
		(message.type === 'matcher.run-job' || message.type === 'matcher.cancel-job' || message.type === 'matcher.ping'),
	);
}
