import { browser } from 'wxt/browser';

import * as logging from '../../diagnostics/logging';
import {
	MATCHER_OFFSCREEN_CHANNEL,
	type CancelMatcherJobMessage,
	type MatcherJobRunResult,
	type MatcherJobStateMessage,
	type MatcherOffscreenResponse,
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
const QUEUE_TIMEOUT_MS = 120_000;

/** Maximum execution time after the offscreen host starts matching a job. */
const RUN_TIMEOUT_MS = 120_000;

/** Close the hidden matcher host after nearby jobs have had time to reuse it. */
const IDLE_MS = 3000_000;

/** Promise shared by concurrent requests creating the same offscreen document. */
let creating: Promise<void> | undefined;

/** Promise for an in-flight close that a new request must wait out. */
let closing: Promise<void> | undefined;

/** Runtime messages that still depend on the offscreen host remaining alive. */
let activeRequests = 0;

/** Delayed document close scheduled after the final matcher request settles. */
let idleTimer: ReturnType<typeof globalThis.setTimeout> | undefined;

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
 * Close the offscreen document only after every background request releases it.
 *
 * `WORKERS` offscreen documents do not have an automatic lifetime. Closing the
 * idle host releases its listener graph and JavaScript heap in addition to the
 * dedicated-worker heaps that the host disposes on its own shorter lifecycle.
 */
export async function close(): Promise<void> {
	clearIdle();
	if (activeRequests > 0 || creating) return;
	if (closing) return closing;
	const offscreen = browser.offscreen;
	if (!offscreen?.closeDocument) return;

	closing = (async () => {
		if (!await exists() || activeRequests > 0 || creating) return;
		await offscreen.closeDocument();
		logger.debug('Closed idle matcher offscreen document.', {
			event: 'matcher-offscreen-document-closed',
			idleMs: IDLE_MS,
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
		const response = await wait(
			request.job.jobId,
			() => browser.runtime.sendMessage(message) as Promise<MatcherOffscreenResponse>,
		);
		if (response.ok && 'value' in response) {
			const result = createMatcherPipelineResult({
				batch: request.batch,
				registry: request.registry,
				compiledRegistryArtifact: { relationshipGraph: request.relationshipGraph },
				partitions: response.value.partitions,
				analyzedAt: request.analyzedAt,
				source: request.source,
			});
			return {
				job: response.value.job,
				mode: response.value.mode,
				result,
				partitions: response.value.partitions,
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
	clearIdle();
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
	clearIdle();
	let released = false;
	return () => {
		if (released) return;
		released = true;
		activeRequests = Math.max(0, activeRequests - 1);
		if (activeRequests === 0) scheduleClose();
	};
}

/** Schedule host cleanup only after every pending runtime message settles. */
function scheduleClose(): void {
	clearIdle();
	idleTimer = globalThis.setTimeout(() => {
		idleTimer = undefined;
		if (activeRequests === 0) void close();
	}, IDLE_MS);
}

/** Cancel the pending document-idle close when new work acquires the host. */
function clearIdle(): void {
	if (idleTimer === undefined) return;
	globalThis.clearTimeout(idleTimer);
	idleTimer = undefined;
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
): Promise<MatcherOffscreenResponse> {
	return new Promise((resolve, reject) => {
		let phase: 'queued' | 'running' = 'queued';
		let settled = false;
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
		const arm = (timeoutMs: number): void => {
			globalThis.clearTimeout(timer);
			timer = globalThis.setTimeout(fail, timeoutMs);
		};
		const onMessage = (message: unknown): undefined => {
			if (!isJobState(message) || message.jobId !== jobId || message.phase !== 'running' || phase === 'running') {
				return undefined;
			}
			phase = 'running';
			arm(RUN_TIMEOUT_MS);
			return undefined;
		};

		// Register before dispatch. A newly empty host can start immediately, and a
		// running-state event emitted before this listener exists would otherwise leave
		// the caller on the queue deadline for the complete execution.
		browser.runtime.onMessage.addListener(onMessage);
		arm(QUEUE_TIMEOUT_MS);
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
			resolve(value);
		}, (error) => {
			if (settled) return;
			settled = true;
			cleanup();
			reject(error);
		});
	});
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
