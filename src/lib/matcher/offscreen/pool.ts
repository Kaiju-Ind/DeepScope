import { browser } from 'wxt/browser';

import type { DiagnosticTransportMessage } from '../../diagnostics/contracts';
import { isDiagnosticTransportMessage } from '../../diagnostics/journal';
import * as logging from '../../diagnostics/logging';
import type {
	MatcherPartitionResult,
	MatcherPartitionTask,
	MatcherWorkerResponseMessage,
	MatcherWorkerRunMessage,
} from '../contracts';

const logger = logging.get('offscreen', 'matcher-pool');

/** Shared dedicated-worker pool that executes scheduler-selected partitions. */
export class Pool {
	/** Fixed worker slots owned for the complete lifetime of this hot pool. */
	readonly #workers: Slot[];

	constructor(workerCount: number) {
		this.#workers = Array.from({ length: Math.max(1, workerCount) }, (_item, index) => new Slot(index));
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
	readonly #diagnosticListener = (event: MessageEvent<unknown>): void => {
		if (!isDiagnosticTransportMessage(event.data)) return;
		forwardDiagnostic(event.data);
	};
	#worker: Worker;
	#activeTask: MatcherPartitionTask | undefined;
	#activeReject: ((error: Error) => void) | undefined;
	#disposed = false;

	constructor(index: number) {
		this.#index = index;
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

		return new Promise((resolve, reject) => {
			let cleanup = (): void => undefined;
			const fail = (
				error: Error,
				event: string,
				details: Record<string, unknown> = {},
				replaceWorker = false,
			): void => {
				cleanup();
				logger.error(event, {
					error,
					workerIndex: this.#index,
					jobId: task.job.jobId,
					partitionId: task.partitionId,
					kind: task.kind,
					...details,
				});
				reject(error);
				if (replaceWorker) this.#replaceWorker();
			};
			const onMessage = (event: MessageEvent<MatcherWorkerResponseMessage | DiagnosticTransportMessage>): void => {
				if (isDiagnosticTransportMessage(event.data)) return;
				if (event.data.type === 'matcher-worker.partition-complete') {
					cleanup();
					resolve(event.data.result);
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
			cleanup = (): void => {
				this.#activeTask = undefined;
				this.#activeReject = undefined;
				this.#worker.removeEventListener('message', onMessage);
				this.#worker.removeEventListener('error', onError);
				this.#worker.removeEventListener('messageerror', onMessageError);
			};
			this.#activeReject = (error) => {
				cleanup();
				reject(error);
			};

			this.#worker.addEventListener('message', onMessage);
			this.#worker.addEventListener('error', onError);
			this.#worker.addEventListener('messageerror', onMessageError);
			const message: MatcherWorkerRunMessage = { type: 'matcher-worker.run-partition', task };
			try {
				this.#worker.postMessage(message);
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
		this.#worker.removeEventListener('message', this.#diagnosticListener);
		this.#worker.terminate();
	}

	/** Create one isolated matcher worker and attach the persistent diagnostic bridge. */
	#createWorker(): Worker {
		const worker = new Worker(
			new URL('../../../entrypoints/offscreen/matcher.worker.ts', import.meta.url),
			{ type: 'module', name: `kaiju-deepscope-matcher-${this.#index}` },
		);
		worker.addEventListener('message', this.#diagnosticListener);
		return worker;
	}

	/** Replace a canceled worker so unrelated job partitions can continue on this slot. */
	#replaceWorker(): void {
		this.#worker.removeEventListener('message', this.#diagnosticListener);
		this.#worker.terminate();
		if (!this.#disposed) this.#worker = this.#createWorker();
	}
}

/** Relay worker diagnostics through the offscreen runtime while the host is alive. */
function forwardDiagnostic(message: DiagnosticTransportMessage): void {
	void browser.runtime.sendMessage(message).catch(() => undefined);
}
