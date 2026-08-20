import { browser } from 'wxt/browser';

import * as logging from '../../diagnostics/logging';
import {
	MATCHER_OFFSCREEN_CHANNEL,
	type CancelMatcherJobMessage,
	type MatcherJobRunResult,
	type MatcherHostIdleMessage,
	type MatcherJobStateMessage,
	type MatcherOffscreenResponse,
	type MatcherPartitionProgressMessage,
	type MatcherPartitionResult,
	type OffscreenMatcherJobRequest,
	type RunMatcherJobMessage,
	type RunMatcherJobRequest,
} from '../contracts';
import { MatcherError } from '../error';
import { createMatcherPipelineResult } from '../partition';
import * as development from './development';

const logger = logging.get('background', 'matcher-offscreen');

/** Static WXT output path for the hidden matcher host document. */
const DOCUMENT_PATH = '/offscreen.html';

/** Maximum time a job may wait for offscreen matcher capacity. */
const QUEUE_DEADLINE_MS = 120_000;

/** Maximum execution time after the offscreen host starts matching a job. */
const RUN_DEADLINE_MS = 120_000;

/** Promise shared by concurrent requests creating the same offscreen document. */
let creating: Promise<void> | undefined;

/** Promise for an in-flight close that a new request must wait out. */
let closing: Promise<void> | undefined;

/** Runtime messages that still depend on the offscreen host remaining alive. */
let activeRequests = 0;

/**
 * Run one matcher job through its production runtime.
 *
 * Production work is isolated in the offscreen dedicated-worker pool. Development
 * may use the explicit in-background implementation for Vite reloadability. A
 * production failure is surfaced to the caller and is never repeated as a full
 * background matcher pass.
 */
export async function run(request: RunMatcherJobRequest): Promise<MatcherJobRunResult> {
	if (import.meta.env.DEV) return await development.run(request);
	return await runOffscreen(request);
}

/** Ask the offscreen matcher host to remove queued work or stop an active job. */
export async function cancel(jobId: string): Promise<void> {
	const message: CancelMatcherJobMessage = {
		channel: MATCHER_OFFSCREEN_CHANNEL,
		type: 'matcher.cancel-job',
		jobId,
	};
	try {
		await browser.runtime.sendMessage(message);
	} catch {
		// Cancellation is best-effort. Background lifecycle state still rejects stale
		// partitions and marks the durable job terminal if the host already disappeared.
	}
}

/**
 * Register the background listener that owns final offscreen-document disposal.
 *
 * The offscreen host owns the one idle grace period because service-worker timers
 * can disappear when Chrome suspends the background. When that grace period
 * expires, the host sends `matcher.host-idle`, which wakes the background and lets
 * it call the privileged `offscreen.closeDocument()` API immediately.
 */
export function start(): void {
	if (started) return;
	started = true;
	browser.runtime.onMessage.addListener((message: unknown): undefined => {
		if (!isHostIdle(message)) return undefined;
		if (activeRequests === 0 && !creating) void close();
		return undefined;
	});
}

/** Whether the current background service-worker instance installed its lifecycle listener. */
let started = false;

/**
 * Close the offscreen document only when no matcher request still depends on it.
 *
 * This operation is immediate. Idle timing belongs to the offscreen host so Chrome
 * can suspend and later wake the background without losing the cleanup deadline.
 */
async function close(): Promise<void> {
	if (activeRequests > 0 || creating) return;
	if (closing) return closing;
	const offscreen = browser.offscreen;
	if (!offscreen?.closeDocument) return;

	closing = (async () => {
		if (!await exists() || activeRequests > 0 || creating) return;
		await offscreen.closeDocument();
		logger.debug('Closed matcher offscreen document after host idle.', {
			event: 'matcher-offscreen-document-closed',
			reason: 'host-idle',
		});
	})()
		.catch((error) => logger.warning('Failed to close idle matcher offscreen document.', { error }))
		.finally(() => {
			closing = undefined;
		});
	return closing;
}

/** Run one production job with separate queue-wait and execution deadlines. */
async function runOffscreen(request: RunMatcherJobRequest): Promise<MatcherJobRunResult> {
	const release = acquire();
	try {
		if (!await open()) throw new MatcherError('offscreen-unavailable', 'Matcher offscreen document is unavailable.');
		const message: RunMatcherJobMessage = {
			channel: MATCHER_OFFSCREEN_CHANNEL,
			type: 'matcher.run-job',
			request: compact(request),
		};
		const waited = await wait(
			request.job.jobId,
			() => browser.runtime.sendMessage(message) as Promise<MatcherOffscreenResponse>,
		);
		const { response, partitions } = waited;
		if (response.ok && 'value' in response) {
			const result = createMatcherPipelineResult({
				batch: request.batch,
				registry: request.registry,
				relationshipGraph: request.relationshipGraph,
				partitions,
				analyzedAt: request.analyzedAt,
				source: request.source,
			});
			return {
				job: response.value.job,
				mode: response.value.mode,
				result,
				partitions,
				executor: 'offscreen-worker-pool',
				completedAt: Date.now(),
			};
		}
		if (!response.ok) {
			const reason = response.reason === 'queue-full'
				? 'queue-full'
				: response.reason === 'canceled' ? 'canceled' : 'host-failed';
			throw new MatcherError(reason, response.message);
		}
		throw new MatcherError('host-failed', 'Offscreen matcher returned no job result.');
	} catch (error) {
		if (error instanceof MatcherError && error.reason === 'canceled') throw error;
		await cancel(request.job.jobId);
		logger.error('Offscreen matcher job failed.', { error, jobId: request.job.jobId, mode: request.mode });
		throw error;
	} finally {
		release();
	}
}

/** Remove registry-scale data before the request crosses extension contexts. */
function compact(request: RunMatcherJobRequest): OffscreenMatcherJobRequest {
	return {
		job: request.job,
		mode: request.mode,
		batch: request.batch,
		...(request.options ? { options: request.options } : {}),
		...(request.maxWorkerCount === undefined ? {} : { maxWorkerCount: request.maxWorkerCount }),
	};
}

/** Create or reuse the one offscreen matcher document available to this extension profile. */
async function open(): Promise<boolean> {
	const offscreen = browser.offscreen;
	if (!offscreen) return false;
	if (closing) await closing;
	if (await exists()) return true;

	if (!creating) {
		creating = offscreen.createDocument({
			url: DOCUMENT_PATH,
			reasons: [offscreen.Reason.WORKERS],
			justification: 'Run CPU-bound technology matching outside the background service worker.',
		}).finally(() => {
			creating = undefined;
		});
	}
	try {
		await creating;
		return true;
	} catch {
		return await exists();
	}
}

/** Hold one local lease while a runtime message still depends on the offscreen host. */
function acquire(): () => void {
	activeRequests += 1;
	let released = false;
	return () => {
		if (released) return;
		released = true;
		activeRequests = Math.max(0, activeRequests - 1);
	};
}

/** Query Chrome runtime contexts instead of maintaining a second host-existence flag. */
async function exists(): Promise<boolean> {
	const runtime = browser.runtime;
	if (!runtime.getContexts) return false;
	const contexts = await runtime.getContexts({
		contextTypes: [runtime.ContextType.OFFSCREEN_DOCUMENT],
		documentUrls: [runtime.getURL(DOCUMENT_PATH)],
	});
	return contexts.length > 0;
}

/**
 * Wait for one runtime response while timing queue wait and execution separately.
 *
 * The old single timeout started before the job acquired matcher capacity, so a
 * healthy job could consume its complete execution allowance while merely waiting
 * behind another tab. A `matcher.job-state` running event now resets the deadline
 * when the host actually starts the job.
 */
function wait(
	jobId: string,
	send: () => Promise<MatcherOffscreenResponse>,
): Promise<{ readonly response: MatcherOffscreenResponse; readonly partitions: readonly MatcherPartitionResult[] }> {
	return new Promise((resolve, reject) => {
		let phase: 'queued' | 'running' = 'queued';
		let settled = false;
		const partitions: MatcherPartitionResult[] = [];
		let timer: ReturnType<typeof globalThis.setTimeout>;

		const cleanup = (): void => {
			globalThis.clearTimeout(timer);
			browser.runtime.onMessage.removeListener(onMessage);
		};
		const fail = (): void => {
			if (settled) return;
			settled = true;
			cleanup();
			reject(new MatcherError(
				phase === 'queued' ? 'queue-timeout' : 'run-timeout',
				phase === 'queued'
					? 'Matcher job did not acquire offscreen capacity before the queue timeout.'
					: 'Matcher job did not complete before the execution timeout.',
			));
		};
		const arm = (deadlineMs: number): void => {
			globalThis.clearTimeout(timer);
			timer = globalThis.setTimeout(fail, deadlineMs);
		};
		const onMessage = (message: unknown): undefined => {
			if (isPartitionProgress(message) && message.partition.job.jobId === jobId) {
				const existingIndex = partitions.findIndex((partition) => partition.partitionId === message.partition.partitionId);
				if (existingIndex >= 0) partitions[existingIndex] = message.partition;
				else partitions.push(message.partition);
				return undefined;
			}
			if (!isJobState(message) || message.jobId !== jobId || message.phase !== 'running' || phase === 'running') {
				return undefined;
			}
			phase = 'running';
			arm(RUN_DEADLINE_MS);
			return undefined;
		};

		// Register before dispatch. A newly empty host can start immediately, and a
		// running-state event emitted before this listener exists would otherwise leave
		// the caller on the queue deadline for the complete execution.
		browser.runtime.onMessage.addListener(onMessage);
		arm(QUEUE_DEADLINE_MS);
		let response: Promise<MatcherOffscreenResponse>;
		try {
			response = send();
		} catch (error) {
			settled = true;
			cleanup();
			reject(error);
			return;
		}
		response.then((value) => {
			if (settled) return;
			settled = true;
			cleanup();
			if (value.ok && 'value' in value && value.value.partitionCount !== partitions.length) {
				reject(new MatcherError('host-failed', `Matcher streamed ${partitions.length} of ${value.value.partitionCount} partitions.`));
				return;
			}
			resolve({ response: value, partitions });
		}, (error) => {
			if (settled) return;
			settled = true;
			cleanup();
			reject(error);
		});
	});
}

/** Narrow runtime traffic to the offscreen host's one idle-lifecycle event. */
function isHostIdle(message: unknown): message is MatcherHostIdleMessage {
	return Boolean(
		message &&
		typeof message === 'object' &&
		'channel' in message &&
		message.channel === MATCHER_OFFSCREEN_CHANNEL &&
		'type' in message &&
		message.type === 'matcher.host-idle',
	);
}

/** Narrow runtime traffic to matcher queue/execution state for the awaited job. */
function isJobState(message: unknown): message is MatcherJobStateMessage {
	return Boolean(
		message &&
		typeof message === 'object' &&
		'channel' in message &&
		message.channel === MATCHER_OFFSCREEN_CHANNEL &&
		'type' in message &&
		message.type === 'matcher.job-state',
	);
}

/** Narrow runtime traffic to one streamed matcher partition. */
function isPartitionProgress(message: unknown): message is MatcherPartitionProgressMessage {
	return Boolean(
		message &&
		typeof message === 'object' &&
		'channel' in message &&
		message.channel === MATCHER_OFFSCREEN_CHANNEL &&
		'type' in message &&
		message.type === 'matcher.partition-complete',
	);
}
