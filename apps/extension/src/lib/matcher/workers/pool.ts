import { DisposableStack } from '@utils/dispose';
import { browser } from 'wxt/browser';

import type { DiagnosticTransportMessage } from '../../diagnostics/contracts';
import { isDiagnosticTransportMessage } from '../../diagnostics/journal';
import * as logging from '../../diagnostics/logging';
import { diagnosticErrorType } from '../../privacy/redaction';
import type {
	MatcherPartitionResult,
	MatcherPartitionTask,
	MatcherWorkerResponseMessage,
	MatcherWorkerRunMessage,
} from '../contracts';
import { MatcherError } from '../error';
import { MATCHER_PARTITION_DEADLINE_MS } from '../policy';

const logger = logging.get('offscreen', 'matcher-pool');

/** Shared dedicated-worker pool that executes scheduler-selected partitions. */
export class Pool {
	/** Fixed worker slots owned for the complete lifetime of this hot pool. */
	readonly #workers: Slot[];

	/**
	 * @param workerCount Number of dedicated worker slots.
	 * @param deadlineMs Hard per-partition deadline before a slot replaces its worker.
	 * @param onDiagnostic Receives diagnostics posted by workers. The offscreen host
	 * relays them over runtime messaging. A background page that owns the pool
	 * writes them to the journal directly, because a page does not receive its own
	 * runtime messages.
	 */
	constructor(
		workerCount: number,
		deadlineMs = MATCHER_PARTITION_DEADLINE_MS,
		onDiagnostic: DiagnosticSink = forwardDiagnostic,
	) {
		this.#workers = Array.from(
			{ length: Math.max(1, workerCount) },
			(_item, index) => new Slot(index, deadlineMs, onDiagnostic),
		);
	}

	/** Number of partitions that can execute concurrently. */
	get capacity(): number {
		return this.#workers.length;
	}

	/** Execute one partition on the physical worker slot selected by the background scheduler. */
	run(task: MatcherPartitionTask, workerIndex: number): Promise<MatcherPartitionResult> {
		const worker = this.#workers[workerIndex];
		if (!worker) return Promise.reject(new Error(`Matcher worker index is outside pool capacity: ${workerIndex}.`));
		return worker.run(task);
	}

	/** Cancel only worker slots currently executing the selected job. */
	cancelJob(jobId: string, reason: Error | string = 'Matcher job was canceled.'): number {
		return this.#cancel((task) => task.job.jobId === jobId, reason);
	}

	/** Cancel only worker slots currently executing work for one browser tab. */
	cancelTab(tabId: number, reason: Error | string = 'Matcher tab work was canceled.'): number {
		return this.#cancel((task) => task.job.tabId === tabId, reason);
	}

	/** Terminate every worker and reject any partition still owned by a slot. */
	dispose(reason: Error | string = 'Matcher worker pool was disposed.'): void {
		for (const worker of this.#workers) worker.dispose(reason);
	}

	/** Cancel matching slots. The background scheduler owns all shard-affinity state. */
	#cancel(predicate: (task: MatcherPartitionTask) => boolean, reason: Error | string): number {
		let count = 0;
		for (const worker of this.#workers) {
			if (worker.cancel(predicate, reason)) count += 1;
		}
		return count;
	}
}

/** Dedicated worker slot that owns at most one in-flight partition Promise. */
class Slot {
	/** Stable slot ordinal used only for diagnostics and worker naming. */
	readonly #index: number;
	/** Hard per-partition deadline after which this slot terminates and replaces its worker. */
	readonly #deadlineMs: number;
	/** Destination for diagnostics this slot's worker posts. */
	readonly #onDiagnostic: DiagnosticSink;
	readonly #diagnosticListener = (event: MessageEvent<unknown>): void => {
		if (!isDiagnosticTransportMessage(event.data)) return;
		this.#onDiagnostic(event.data);
	};
	/**
	 * Persistent error listener for a worker that owns no partition.
	 *
	 * An idle or freshly replaced worker can still fail (for example while its
	 * module loads). Without this listener the error would surface as an uncaught
	 * offscreen error and the broken worker would receive the next partition. The
	 * worker is terminated and lazily recreated on the next `run`, never in a loop.
	 */
	readonly #idleErrorListener = (event: ErrorEvent): void => {
		if (this.#activeTask) return;
		event.preventDefault?.();
		logger.warning('Idle matcher worker failed; it will be replaced before the next partition.', {
			event: 'matcher-worker-idle-error',
			workerIndex: this.#index,
		});
		this.#terminateWorker();
	};
	#worker: Worker | undefined;
	/** Releases the current worker: its persistent listeners, then the heap. */
	#workerResources: DisposableStack | undefined;
	#activeTask: MatcherPartitionTask | undefined;
	#activeReject: ((error: Error) => void) | undefined;
	#disposed = false;

	constructor(index: number, deadlineMs: number, onDiagnostic: DiagnosticSink) {
		this.#index = index;
		this.#deadlineMs = deadlineMs;
		this.#onDiagnostic = onDiagnostic;
		this.#worker = this.#createWorker();
	}

	/** Whether this slot currently owns a partition. */
	get busy(): boolean {
		return this.#activeTask !== undefined;
	}

	/** Dispatch one partition and own its temporary message/error listeners until settlement. */
	run(task: MatcherPartitionTask): Promise<MatcherPartitionResult> {
		if (this.#disposed) return Promise.reject(new Error('Matcher worker slot is disposed.'));
		if (this.#activeTask) return Promise.reject(new Error(`Matcher worker ${this.#index} already owns a partition.`));
		this.#activeTask = task;
		const worker = this.#worker ??= this.#createWorker();

		return new Promise((resolve, reject) => {
			// Everything this run acquires is released together, once, by whichever
			// of result, failure, deadline or cancellation settles the run first.
			const resources = new DisposableStack();
			const cleanup = (): void => resources.dispose();
			const fail = (
				error: Error,
				event: string,
				details: Record<string, unknown> = {},
				replaceWorker = false,
			): void => {
				cleanup();
				logger.error(event, {
					workerIndex: this.#index,
					jobId: task.job.jobId,
					partitionId: task.partitionId,
					kind: task.kind,
					...(task.job.incognito ? { errorType: diagnosticErrorType(error) } : { error, ...details }),
				});
				reject(error);
				if (replaceWorker) this.#replaceWorker();
			};
			const onMessage = (event: MessageEvent<MatcherWorkerResponseMessage | DiagnosticTransportMessage>): void => {
				if (isDiagnosticTransportMessage(event.data)) return;
				if (event.data.type === 'matcher-worker.partition-complete') {
					// Accept only the result for the partition this slot dispatched; a
					// mismatched result must never be attributed to another job.
					const result = event.data.result;
					if (result.partitionId !== task.partitionId || result.job.jobId !== task.job.jobId) return;
					cleanup();
					resolve(result);
					return;
				}
				if (event.data.partitionId === task.partitionId) {
					fail(new Error(event.data.message), 'Matcher worker reported a partition failure.');
				}
			};
			const onError = (event: ErrorEvent): void => fail(
				event.error instanceof Error ? event.error : new Error(event.message || 'Matcher worker failed.'),
				'Matcher worker JavaScript error.',
				{ filename: event.filename, line: event.lineno, column: event.colno },
				true,
			);
			const onMessageError = (): void => fail(
				new Error('Matcher worker returned a message that could not be deserialized.'),
				'Matcher worker message deserialization failed.',
				{},
				true,
			);
			resources.defer(() => {
				this.#activeTask = undefined;
				this.#activeReject = undefined;
			});
			this.#activeReject = (error) => {
				cleanup();
				reject(error);
			};

			listen(resources, worker, 'message', onMessage);
			listen(resources, worker, 'error', onError);
			listen(resources, worker, 'messageerror', onMessageError);
			const deadline = globalThis.setTimeout(() => fail(
				new MatcherError('run-timeout', `Matcher partition exceeded its ${this.#deadlineMs}ms execution deadline.`),
				'Matcher partition deadline expired; replacing worker.',
				{ deadlineMs: this.#deadlineMs },
				true,
			), this.#deadlineMs);
			resources.defer(() => globalThis.clearTimeout(deadline));
			const message: MatcherWorkerRunMessage = { type: 'matcher-worker.run-partition', task };
			try {
				worker.postMessage(message);
			} catch (error) {
				fail(error instanceof Error ? error : new Error(String(error)), 'Matcher worker dispatch failed.');
			}
		});
	}

	/** Terminate and recreate this worker only when its active task matches cancellation. */
	cancel(predicate: (task: MatcherPartitionTask) => boolean, reason: Error | string): boolean {
		if (!this.#activeTask || !predicate(this.#activeTask)) return false;
		const error = reason instanceof Error ? reason : new Error(reason);
		this.#activeReject?.(error);
		this.#replaceWorker();
		return true;
	}

	/** End this worker's heap and reject the partition that still owns the slot. */
	dispose(reason: Error | string = 'Matcher worker was disposed.'): void {
		if (this.#disposed) return;
		this.#disposed = true;
		this.#activeReject?.(reason instanceof Error ? reason : new Error(reason));
		this.#activeTask = undefined;
		this.#activeReject = undefined;
		this.#terminateWorker();
	}

	/** Create one isolated matcher worker and attach the persistent diagnostic bridge. */
	#createWorker(): Worker {
		const worker = new Worker(
			new URL('./matcher.worker.ts', import.meta.url),
			{ type: 'module', name: `kaiju-deepscope-matcher-${this.#index}` },
		);
		const resources = new DisposableStack();
		resources.defer(() => worker.terminate());
		listen(resources, worker, 'message', this.#diagnosticListener);
		listen(resources, worker, 'error', this.#idleErrorListener);
		this.#workerResources = resources;
		return worker;
	}

	/** Terminate the current worker heap, leaving the slot to recreate one on demand. */
	#terminateWorker(): void {
		const resources = this.#workerResources;
		if (!this.#worker || !resources) return;
		this.#worker = undefined;
		this.#workerResources = undefined;
		resources.dispose();
	}

	/** Replace a canceled, failed or timed-out worker so other partitions can continue on this slot. */
	#replaceWorker(): void {
		this.#terminateWorker();
		if (!this.#disposed) this.#worker = this.#createWorker();
	}
}

/** Add a worker listener and register its removal with the owner of the listener's lifetime. */
function listen<Type extends keyof WorkerEventMap>(
	resources: DisposableStack,
	worker: Worker,
	type: Type,
	listener: (event: WorkerEventMap[Type]) => void,
): void {
	worker.addEventListener(type, listener);
	resources.defer(() => worker.removeEventListener(type, listener));
}

/** Receiver for diagnostics posted by matcher workers. */
export type DiagnosticSink = (message: DiagnosticTransportMessage) => void;

/** Relay worker diagnostics through the offscreen runtime while the host is alive. */
function forwardDiagnostic(message: DiagnosticTransportMessage): void {
	void browser.runtime.sendMessage(message).catch(() => undefined);
}
