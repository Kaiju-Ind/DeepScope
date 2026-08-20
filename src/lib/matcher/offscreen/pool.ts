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

/** Callback surface owned by the offscreen host rather than individual worker slots. */
export type PoolOptionsType = {
	/** Return true when the background canceled a job while its partition was running. */
	readonly isCanceled: (jobId: string) => boolean;
	/** Publish a completed partition before the complete job settles. */
	readonly onPartition: (
		partition: MatcherPartitionResult,
		completedPartitionCount: number,
		partitionCount: number,
	) => void;
};

/** Shared dedicated-worker pool that executes matcher partitions in parallel. */
export class Pool {
	/** Fixed worker slots owned for the complete lifetime of this hot pool. */
	readonly #workers: Slot[];
	/** Host callbacks used for cancellation and progressive partition publication. */
	readonly #options: PoolOptionsType;

	constructor(workerCount: number, options: PoolOptionsType) {
		this.#workers = Array.from({ length: Math.max(1, workerCount) }, (_item, index) => new Slot(index));
		this.#options = options;
	}

	/** Run one job's independent partitions across the owned worker slots. */
	async run(tasks: readonly MatcherPartitionTask[]): Promise<readonly MatcherPartitionResult[]> {
		const results: MatcherPartitionResult[] = [];
		let nextTaskIndex = 0;

		await Promise.all(this.#workers.map(async (worker) => {
			while (nextTaskIndex < tasks.length) {
				const task = tasks[nextTaskIndex++]!;
				if (this.#options.isCanceled(task.job.jobId)) continue;
				const result = await worker.run(task);
				if (this.#options.isCanceled(task.job.jobId)) continue;
				results.push(result);
				this.#options.onPartition(result, results.length, tasks.length);
			}
		}));

		return results.sort(compare);
	}

	/** Terminate every worker and reject any partition still owned by a slot. */
	dispose(reason = 'Matcher worker pool was disposed.'): void {
		for (const worker of this.#workers) worker.dispose(reason);
	}
}

/** Dedicated worker slot that owns at most one in-flight partition Promise. */
class Slot {
	/** Dedicated worker whose heap owns one bounded registry-shard cache. */
	readonly #worker: Worker;
	/** Stable slot ordinal used only for diagnostics and worker naming. */
	readonly #index: number;
	readonly #diagnosticListener = (event: MessageEvent<unknown>): void => {
		if (!isDiagnosticTransportMessage(event.data)) return;
		forwardDiagnostic(event.data);
	};
	/** Reject callback for the one partition currently owned by this slot. */
	#activeReject: ((error: Error) => void) | undefined;

	constructor(index: number) {
		this.#index = index;
		this.#worker = new Worker(
			new URL('../../../entrypoints/offscreen/matcher.worker.ts', import.meta.url),
			{ type: 'module', name: `kaiju-deepscope-matcher-${index}` },
		);
		this.#worker.addEventListener('message', this.#diagnosticListener);
	}

	/** Dispatch one partition and own its temporary message/error listeners until settlement. */
	run(task: MatcherPartitionTask): Promise<MatcherPartitionResult> {
		return new Promise((resolve, reject) => {
			let cleanup = (): void => undefined;
			const fail = (error: Error, event: string, details: Record<string, unknown> = {}): void => {
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
			);
			const onMessageError = (): void => fail(
				new Error('Matcher worker returned a message that could not be deserialized.'),
				'Matcher worker message deserialization failed.',
			);
			cleanup = (): void => {
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

	/** End this worker's heap and reject the partition that still owns the slot. */
	dispose(reason = 'Matcher worker was disposed.'): void {
		this.#activeReject?.(new Error(reason));
		this.#activeReject = undefined;
		this.#worker.removeEventListener('message', this.#diagnosticListener);
		this.#worker.terminate();
	}
}

/** Relay worker diagnostics through the offscreen runtime while the host is alive. */
function forwardDiagnostic(message: DiagnosticTransportMessage): void {
	void browser.runtime.sendMessage(message).catch(() => undefined);
}

/** Restore deterministic partition order after concurrent workers finish out of order. */
function compare(left: MatcherPartitionResult, right: MatcherPartitionResult): number {
	const priority = left.priority - right.priority;
	return priority === 0 ? left.kind.localeCompare(right.kind) : priority;
}
