import { browser } from 'wxt/browser';

import * as logging from '../../diagnostics/logging';
import {
	MATCHER_OFFSCREEN_CHANNEL,
	type CancelMatcherJobMessage,
	type CancelMatcherTabMessage,
	type MatcherHostIdleMessage,
	type MatcherOffscreenResponse,
	type MatcherPartitionResult,
	type MatcherJobTerminalReason,
	type ReleaseMatcherLifecycleMessage,
	type RunMatcherPartitionMessage,
	type RunMatcherPartitionRequest,
	type TouchMatcherLifecycleMessage,
} from '../contracts';
import { MatcherError } from '../error';
import { MATCHER_PARTITION_CONCURRENCY } from '../policy';

const logger = logging.get('background', 'matcher-offscreen');

/** Static WXT output path for the hidden matcher host document. */
const DOCUMENT_PATH = '/offscreen.html';

/** Maximum execution time for one bounded matcher partition. */
const PARTITION_DEADLINE_MS = 120_000;

/** Bounded close attempts for transient Chrome offscreen teardown races. */
const CLOSE_ATTEMPTS = 3;

/** Short retry delay keeps close recovery bounded without leaving the document resident for another idle cycle. */
const CLOSE_RETRY_DELAY_MS = 150;

/** Matcher partitions that the offscreen host can execute at the same time. */
export const capacity = MATCHER_PARTITION_CONCURRENCY;

/** Promise shared by concurrent requests creating the same offscreen document. */
let creating: Promise<void> | undefined;

/** Promise for an in-flight close that a new request must wait out. */
let closing: Promise<void> | undefined;

/** Runtime messages that still depend on the offscreen host remaining alive. */
let activeRequests = 0;

/** Whether the host has declared itself disposable and still needs a successful close. */
let idleRequested = false;

/** Whether the current background service-worker instance installed its lifecycle listener. */
let started = false;

/** Execute one scheduler-selected matcher partition in the hidden two-worker host. */
export async function runPartition(request: RunMatcherPartitionRequest): Promise<MatcherPartitionResult> {
	const release = acquire();
	try {
		if (!await open()) throw new MatcherError('offscreen-unavailable', 'Matcher offscreen document is unavailable.');
		const message: RunMatcherPartitionMessage = {
			channel: MATCHER_OFFSCREEN_CHANNEL,
			type: 'matcher.run-partition',
			request,
		};
		const response = await withDeadline(
			browser.runtime.sendMessage(message) as Promise<MatcherOffscreenResponse>,
			PARTITION_DEADLINE_MS,
		);
		if (response.ok && 'value' in response) return response.value;
		if (!response.ok) {
			if (response.reason === 'canceled') throw new MatcherError('canceled', response.message);
			throw new MatcherError('host-failed', response.message);
		}
		throw new MatcherError('host-failed', 'Offscreen matcher returned no partition result.');
	} catch (error) {
		if (error instanceof MatcherError && error.reason === 'canceled') throw error;
		logger.error('Offscreen matcher partition failed.', {
			error,
			jobId: request.task.job.jobId,
			partitionId: request.task.partitionId,
			kind: request.task.kind,
		});
		throw error;
	} finally {
		release();
	}
}

/** Ask the offscreen matcher host to stop worker slots currently executing one job. */
export async function cancel(jobId: string): Promise<void> {
	const message: CancelMatcherJobMessage = {
		channel: MATCHER_OFFSCREEN_CHANNEL,
		type: 'matcher.cancel-job',
		jobId,
	};
	await sendBestEffort(message);
}

/** Cancel running matcher partitions by tab even when this service worker lost its local job map. */
export async function cancelTab(tabId: number, reason: MatcherJobTerminalReason): Promise<void> {
	const message: CancelMatcherTabMessage = {
		channel: MATCHER_OFFSCREEN_CHANNEL,
		type: 'matcher.cancel-tab',
		tabId,
		reason,
	};
	await sendBestEffort(message);
}

/** Refresh the host watchdog while staged collection is still expected to queue another matcher pass. */
export async function touchLifecycle(lifecycleId: string, tabId: number): Promise<void> {
	if (!await exists()) return;
	const message: TouchMatcherLifecycleMessage = {
		channel: MATCHER_OFFSCREEN_CHANNEL,
		type: 'matcher.lifecycle-touch',
		lifecycleId,
		tabId,
	};
	await sendBestEffort(message);
}

/** Release a completed analysis lifecycle so expensive worker heaps can be terminated immediately. */
export async function releaseLifecycle(lifecycleId: string): Promise<void> {
	if (!await exists()) return;
	const message: ReleaseMatcherLifecycleMessage = {
		channel: MATCHER_OFFSCREEN_CHANNEL,
		type: 'matcher.lifecycle-release',
		lifecycleId,
	};
	await sendBestEffort(message);
}

/** Register the background listener that owns privileged offscreen-document disposal. */
export function start(): void {
	if (started) return;
	started = true;
	browser.runtime.onMessage.addListener((message: unknown): undefined => {
		if (!isHostIdle(message)) return undefined;
		idleRequested = true;
		if (activeRequests === 0 && !creating) void close();
		return undefined;
	});
}

/** Close the offscreen document with bounded recovery for transient Chrome teardown failures. */
async function close(): Promise<void> {
	if (activeRequests > 0 || creating) return;
	if (closing) return closing;
	const offscreen = browser.offscreen;
	if (!offscreen?.closeDocument) return;

	closing = closeWithRetry(offscreen)
		.catch((error) => logger.warning('Failed to close idle matcher offscreen document after bounded retries.', { error }))
		.finally(() => {
			closing = undefined;
		});
	return closing;
}

/** Retry only while a document still exists and no new matcher request acquired it. */
async function closeWithRetry(offscreen: NonNullable<typeof browser.offscreen>): Promise<void> {
	for (let attempt = 1; attempt <= CLOSE_ATTEMPTS; attempt += 1) {
		if (activeRequests > 0 || creating) return;
		if (!await exists()) {
			idleRequested = false;
			return;
		}
		try {
			await offscreen.closeDocument();
			idleRequested = false;
			logger.debug('Closed matcher offscreen document.', {
				event: 'matcher-offscreen-document-closed',
				attempt,
			});
			return;
		} catch (error) {
			if (!await exists()) {
				idleRequested = false;
				return;
			}
			if (attempt >= CLOSE_ATTEMPTS) throw error;
			logger.debug('Retrying matcher offscreen document close.', {
				event: 'matcher-offscreen-document-close-retry',
				attempt,
			});
			await delay(CLOSE_RETRY_DELAY_MS * attempt);
		}
	}
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
	idleRequested = false;
	let released = false;
	return () => {
		if (released) return;
		released = true;
		activeRequests = Math.max(0, activeRequests - 1);
		if (activeRequests === 0 && idleRequested && !creating) void close();
	};
}

/** Query the platform for the offscreen document without maintaining a second existence flag. */
async function exists(): Promise<boolean> {
	const offscreen = browser.offscreen as typeof browser.offscreen & {
		hasDocument?: () => Promise<boolean>;
	};
	if (typeof offscreen?.hasDocument === 'function') {
		try {
			return await offscreen.hasDocument();
		} catch {
			// Continue to the Chrome 119-compatible context query.
		}
	}

	const runtime = browser.runtime;
	if (!runtime.getContexts) return false;
	const contexts = await runtime.getContexts({
		contextTypes: [runtime.ContextType.OFFSCREEN_DOCUMENT],
		documentUrls: [runtime.getURL(DOCUMENT_PATH)],
	});
	return contexts.length > 0;
}

/** Bound one partition request without retaining a second service-worker queue timer. */
function withDeadline<T>(request: Promise<T>, timeoutMs: number): Promise<T> {
	return new Promise((resolve, reject) => {
		let settled = false;
		const timer = globalThis.setTimeout(() => {
			if (settled) return;
			settled = true;
			reject(new MatcherError('run-timeout', 'Matcher partition did not complete before the execution timeout.'));
		}, timeoutMs);
		request.then((value) => {
			if (settled) return;
			settled = true;
			globalThis.clearTimeout(timer);
			resolve(value);
		}, (error) => {
			if (settled) return;
			settled = true;
			globalThis.clearTimeout(timer);
			reject(error);
		});
	});
}

/** Send a lifecycle/cancellation command without converting a missing host into a new failure. */
async function sendBestEffort(message: object): Promise<void> {
	try {
		await browser.runtime.sendMessage(message);
	} catch {
		// The host may already be closed. Background state remains authoritative.
	}
}

/** Delay one bounded close retry without introducing a persistent service-worker timer. */
function delay(timeoutMs: number): Promise<void> {
	return new Promise((resolve) => globalThis.setTimeout(resolve, timeoutMs));
}

/** Narrow runtime traffic to the offscreen host's disposable-lifecycle event. */
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
