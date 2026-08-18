import { installDiagnosticCrashHooks } from '@/lib/diagnostics/crash';
import * as logging from '@/lib/diagnostics/logging';
import { isDiagnosticTransportMessage } from '@/lib/diagnostics/journal';
import type { DiagnosticTransportMessage } from '@/lib/diagnostics/contracts';
import { browser } from 'wxt/browser';

import {
	DOM_SELECTOR_OFFSCREEN_CHANNEL,
	type DomSelectorOffscreenRequestMessage,
	type DomSelectorOffscreenResponse,
	type MatchDomSelectorsOffscreenRequest,
} from '@/lib/dom-selector/offscreen-contracts';
import {
	MATCHER_OFFSCREEN_CHANNEL,
	type MatcherOffscreenRequestMessage,
	type MatcherOffscreenResponse,
	type MatcherPartitionProgressMessage,
	type MatcherPartitionResult,
	type MatcherPartitionTask,
	type MatcherWorkerResponseMessage,
	type MatcherWorkerRunMessage,
	type OffscreenMatcherJobRequest,
} from '@/lib/matcher/contracts';
import { createMatcherPartitionTasks } from '@/lib/matcher/partition';

logging.configure('offscreen');
installDiagnosticCrashHooks('offscreen');

const offscreenLogger = logging.get('offscreen', 'matcher-host');

/** Default worker count used before benchmark data justifies a larger pool. */
const DEFAULT_WORKER_COUNT = 2;

/** Release matcher workers and compiled shard caches after a short idle period. */
const MATCHER_WORKER_IDLE_MS = 30_000;

/** Jobs canceled by the background before their queued partitions finish. */
const canceledJobs = new Set<string>();

/** Pending matcher jobs waiting for the shared worker pool. */
const queuedJobs: QueuedMatcherJob[] = [];

/** Whether the offscreen host is currently feeding partitions to the pool. */
let matcherQueueRunning = false;

/** Job currently owning the shared worker pool. */
let activeMatcherJobId: string | undefined;

/** Shared worker pool kept hot only across nearby matcher jobs. */
let sharedMatcherWorkerPool: MatcherWorkerPool | undefined;

/** Delayed worker-pool disposal so short follow-up evidence passes can reuse hot shards. */
let matcherWorkerIdleTimer: ReturnType<typeof globalThis.setTimeout> | undefined;

/** Matcher job queued with the promise callbacks returned to the background. */
interface QueuedMatcherJob {
	/** Request sent by the background. */
	readonly request: OffscreenMatcherJobRequest;
	/** Lower values run before inactive or lower-priority evidence work. */
	readonly priority: number;
	/** Resolve the background runtime message when the job completes. */
	readonly resolve: (result: Awaited<ReturnType<typeof runMatcherJob>>) => void;
	/** Reject the background runtime message when the job fails. */
	readonly reject: (error: unknown) => void;
}

/**
 * Offscreen matcher host loaded in a hidden extension page.
 *
 * Chrome only exposes the `runtime` extension API to offscreen documents, so the
 * host does not read tabs, storage, or privileged page data. It owns worker
 * lifetimes and returns public pipeline output to the background, which remains
 * responsible for tab lifecycle and persistence decisions.
 */
class MatcherWorkerPool {
	readonly #workers: MatcherWorkerSlot[];

	constructor(workerCount: number) {
		this.#workers = Array.from({ length: Math.max(1, workerCount) }, (_item, index) => new MatcherWorkerSlot(index));
	}

	async run(tasks: readonly MatcherPartitionTask[]): Promise<readonly MatcherPartitionResult[]> {
		const results: MatcherPartitionResult[] = [];
		let nextTaskIndex = 0;

		await Promise.all(this.#workers.map(async (worker) => {
			while (nextTaskIndex < tasks.length) {
				const task = tasks[nextTaskIndex]!;
				nextTaskIndex += 1;
				if (canceledJobs.has(task.job.jobId)) {
					continue;
				}

				const result = await worker.run(task);
				if (canceledJobs.has(task.job.jobId)) {
					continue;
				}

				results.push(result);
				emitPartitionProgress(result, results.length, tasks.length);
			}
		}));

		return results.sort(comparePartitionResults);
	}

	dispose(reason = 'Matcher worker pool was disposed.'): void {
		for (const worker of this.#workers) {
			worker.dispose(reason);
		}
	}
}

/** Dedicated worker wrapper that runs one partition at a time. */
class MatcherWorkerSlot {
	readonly #worker: Worker;
	readonly #index: number;
	readonly #diagnosticListener = (event: MessageEvent<unknown>): void => {
		if (!isDiagnosticTransportMessage(event.data)) return;
		forwardMatcherWorkerDiagnostic(event.data);
	};
	/** Reject callback for the partition currently owned by this worker slot. */
	#activeReject: ((error: Error) => void) | undefined;

	constructor(index: number) {
		this.#index = index;
		this.#worker = new globalThis.Worker(new globalThis.URL('./matcher.worker.ts', import.meta.url), {
			type: 'module',
			name: `kaiju-deepscope-matcher-${index}`,
		});
		this.#worker.addEventListener('message', this.#diagnosticListener);
	}

	run(task: MatcherPartitionTask): Promise<MatcherPartitionResult> {
		return new Promise((resolve, reject) => {
			let cleanup = (): void => undefined;
			const onMessage = (event: MessageEvent<MatcherWorkerResponseMessage | DiagnosticTransportMessage>): void => {
				if (isDiagnosticTransportMessage(event.data)) return;
				if (event.data.type === 'matcher-worker.partition-complete') {
					cleanup();
					resolve(event.data.result);
					return;
				}
				if (event.data.partitionId === task.partitionId) {
					cleanup();
					const error = new Error(event.data.message);
					offscreenLogger.error('Matcher worker reported a partition failure.', {
						error,
						workerIndex: this.#index,
						jobId: task.job.jobId,
						partitionId: task.partitionId,
						kind: task.kind,
					});
					reject(error);
				}
			};
			const onError = (event: ErrorEvent): void => {
				cleanup();
				const error = event.error instanceof Error ? event.error : new Error(event.message || 'Matcher worker failed.');
				offscreenLogger.error('Matcher worker JavaScript error.', {
					error,
					workerIndex: this.#index,
					jobId: task.job.jobId,
					partitionId: task.partitionId,
					kind: task.kind,
					filename: event.filename,
					line: event.lineno,
					column: event.colno,
				});
				reject(error);
			};
			const onMessageError = (): void => {
				cleanup();
				const error = new Error('Matcher worker returned a message that could not be deserialized.');
				offscreenLogger.error('Matcher worker message deserialization failed.', {
					error,
					workerIndex: this.#index,
					jobId: task.job.jobId,
					partitionId: task.partitionId,
					kind: task.kind,
				});
				reject(error);
			};
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
			const message: MatcherWorkerRunMessage = {
				type: 'matcher-worker.run-partition',
				task,
			};
			try {
				this.#worker.postMessage(message);
			} catch (error) {
				cleanup();
				offscreenLogger.error('Matcher worker dispatch failed.', {
					error,
					workerIndex: this.#index,
					jobId: task.job.jobId,
					partitionId: task.partitionId,
					kind: task.kind,
				});
				reject(error);
			}
		});
	}

	dispose(reason = 'Matcher worker was disposed.'): void {
		this.#activeReject?.(new Error(reason));
		this.#activeReject = undefined;
		this.#worker.removeEventListener('message', this.#diagnosticListener);
		this.#worker.terminate();
	}
}

/** Relay already-sanitized dedicated-worker diagnostics through the offscreen runtime channel. */
function forwardMatcherWorkerDiagnostic(message: DiagnosticTransportMessage): void {
	void browser.runtime.sendMessage(message).catch(() => undefined);
}

if (canRegisterMatcherOffscreenHost()) {
	browser.runtime.onMessage.addListener((message: unknown): Promise<MatcherOffscreenResponse | DomSelectorOffscreenResponse> | undefined => {
		if (isDomSelectorOffscreenRequest(message)) {
			return Promise.resolve(matchDomSelectorsOffscreen(message.request));
		}
		if (!isMatcherOffscreenRequest(message)) {
			return undefined;
		}

		if (message.type === 'matcher.ping') {
			return Promise.resolve({ ok: true, ready: true });
		}
		if (message.type === 'matcher.cancel-job') {
			canceledJobs.add(message.jobId);
			cancelQueuedMatcherJob(message.jobId);
			if (activeMatcherJobId === message.jobId) {
				disposeMatcherResources('Matcher job was canceled.');
			} else {
				// No active executor can observe this marker. Do not retain canceled job
				// ids after a late best-effort cancel for work that already settled.
				canceledJobs.delete(message.jobId);
			}
			return Promise.resolve({ ok: true, canceled: true, jobId: message.jobId });
		}

		return enqueueMatcherJob(message.request)
			.then((value): MatcherOffscreenResponse => ({ ok: true, value }))
			.catch((error): MatcherOffscreenResponse => ({
				ok: false,
				message: error instanceof Error ? error.message : 'Offscreen matcher host failed.',
			}));
	});
}

/**
 * Register runtime listeners only inside the bundled offscreen document.
 *
 * WXT can import HTML module dependencies during prepare and production build in
 * a Node-like context. Avoiding listener registration there keeps build steps
 * side-effect safe while preserving the real offscreen runtime path in Chrome.
 */
function canRegisterMatcherOffscreenHost(): boolean {
	return typeof globalThis.document !== 'undefined' && typeof globalThis.Worker !== 'undefined';
}

function enqueueMatcherJob(request: OffscreenMatcherJobRequest): Promise<Awaited<ReturnType<typeof runMatcherJob>>> {
	clearMatcherWorkerIdleTimer();
	return new Promise((resolve, reject) => {
		queuedJobs.push({
			request,
			priority: getJobQueuePriority(request),
			resolve,
			reject,
		});
		drainMatcherQueue();
	});
}


function cancelQueuedMatcherJob(jobId: string): boolean {
	let canceled = false;
	for (let index = queuedJobs.length - 1; index >= 0; index -= 1) {
		if (queuedJobs[index]?.request.job.jobId === jobId) {
			const [queued] = queuedJobs.splice(index, 1);
			queued?.reject(new Error('Matcher job was canceled before dispatch.'));
			canceled = true;
		}
	}
	return canceled;
}

function drainMatcherQueue(): void {
	if (matcherQueueRunning) {
		return;
	}

	const next = takeNextQueuedMatcherJob();
	if (!next) {
		return;
	}

	matcherQueueRunning = true;
	activeMatcherJobId = next.request.job.jobId;
	void runMatcherJob(next.request)
		.then(next.resolve, (error) => {
			disposeMatcherResources(error instanceof Error ? error.message : 'Matcher job failed.');
			next.reject(error);
		})
		.finally(() => {
			canceledJobs.delete(next.request.job.jobId);
			activeMatcherJobId = undefined;
			matcherQueueRunning = false;
			if (queuedJobs.length) {
				drainMatcherQueue();
			} else {
				scheduleMatcherWorkerIdleDisposal();
			}
		});
}

function takeNextQueuedMatcherJob(): QueuedMatcherJob | undefined {
	if (queuedJobs.length === 0) {
		return undefined;
	}

	queuedJobs.sort((left, right) => left.priority - right.priority);
	return queuedJobs.shift();
}

function getJobQueuePriority(request: OffscreenMatcherJobRequest): number {
	if (request.mode === 'complete') {
		return 1;
	}
	return 2;
}

async function runMatcherJob(request: OffscreenMatcherJobRequest) {
	const tasks = createMatcherPartitionTasks({
		job: request.job,
		batch: request.batch,
		options: request.options,
	});
	const pool = getSharedMatcherWorkerPool(request);
	const partitions = await pool.run(tasks);
	if (canceledJobs.has(request.job.jobId)) {
		throw new Error('Matcher job was canceled before completion.');
	}

	return {
		job: request.job,
		mode: request.mode,
		partitions,
		completedAt: Date.now(),
	};
}

/**
 * Reuse workers and their bounded shard caches across nearby matcher jobs.
 *
 * Worker startup and registry-shard hydration were previously paid for every
 * matcher job, which made follow-up evidence passes behave like cold full runs.
 * A shared pool avoids repeated worker startup for immediate follow-up passes,
 * then the idle timer terminates the worker heaps. The background remains the
 * owner of tab lifecycle and storage writes.
 */
function getSharedMatcherWorkerPool(request: OffscreenMatcherJobRequest): MatcherWorkerPool {
	clearMatcherWorkerIdleTimer();
	if (sharedMatcherWorkerPool) {
		return sharedMatcherWorkerPool;
	}

	const workerCount = request.maxWorkerCount ?? DEFAULT_WORKER_COUNT;
	sharedMatcherWorkerPool = new MatcherWorkerPool(workerCount);
	offscreenLogger.debug('Created matcher worker pool.', {
		event: 'matcher-worker-pool-created',
		workerCount,
		jobId: request.job.jobId,
		queuedJobCount: queuedJobs.length,
	});
	return sharedMatcherWorkerPool;
}

/** Release every matcher-worker heap after cancellation, failure, or idle expiry. */
function disposeMatcherResources(reason = 'Matcher resources were disposed.'): void {
	clearMatcherWorkerIdleTimer();
	const pool = sharedMatcherWorkerPool;
	if (!pool) return;

	pool.dispose(reason);
	sharedMatcherWorkerPool = undefined;
	offscreenLogger.debug('Disposed matcher worker pool.', {
		event: 'matcher-worker-pool-disposed',
		reason,
		activeJobId: activeMatcherJobId,
		queuedJobCount: queuedJobs.length,
	});
}

/** Keep workers warm briefly, then terminate them so compiled registry shards can be collected. */
function scheduleMatcherWorkerIdleDisposal(): void {
	clearMatcherWorkerIdleTimer();
	if (!sharedMatcherWorkerPool) return;
	matcherWorkerIdleTimer = globalThis.setTimeout(() => {
		matcherWorkerIdleTimer = undefined;
		if (matcherQueueRunning || queuedJobs.length > 0) return;
		disposeMatcherResources(`Matcher worker pool reached the ${MATCHER_WORKER_IDLE_MS}ms idle limit.`);
	}, MATCHER_WORKER_IDLE_MS);
}

/** Cancel delayed disposal when new matcher work needs the shared worker pool. */
function clearMatcherWorkerIdleTimer(): void {
	if (matcherWorkerIdleTimer === undefined) return;
	globalThis.clearTimeout(matcherWorkerIdleTimer);
	matcherWorkerIdleTimer = undefined;
}

function emitPartitionProgress(
	partition: MatcherPartitionResult,
	completedPartitionCount: number,
	partitionCount: number,
): void {
	const message: MatcherPartitionProgressMessage = {
		channel: MATCHER_OFFSCREEN_CHANNEL,
		type: 'matcher.partition-complete',
		partition,
		completedPartitionCount,
		partitionCount,
	};
	void browser.runtime.sendMessage(message).catch(() => undefined);
}

function matchDomSelectorsOffscreen(
	request: MatchDomSelectorsOffscreenRequest,
): DomSelectorOffscreenResponse {
	try {
		const parsedDocument = new globalThis.DOMParser().parseFromString(request.html, 'text/html');
		const selectors = collectDomSelectorMatchesInDocument(parsedDocument, request);
		return { ok: true, selectors };
	} catch (error) {
		return {
			ok: false,
			message: error instanceof Error ? error.message : 'Offscreen DOM selector matching failed.',
		};
	}
}

function collectDomSelectorMatchesInDocument(
	parsedDocument: Document,
	request: MatchDomSelectorsOffscreenRequest,
): Record<string, boolean> {
	const matches: Record<string, boolean> = Object.create(null) as Record<string, boolean>;
	if (!request.plan.candidateSelector) {
		return matches;
	}

	for (const element of safeQuerySelectorAll(parsedDocument, request.plan.candidateSelector)) {
		for (const selector of routeElementSelectors(request.plan, element)) {
			if (matches[selector]) continue;
			if (safeElementMatches(element, selector)) {
				matches[selector] = true;
			}
		}
	}

	for (const selector of request.selectorProbeList) {
		if (matches[selector] === undefined) matches[selector] = false;
	}

	return matches;
}

function safeQuerySelectorAll(root: ParentNode, selector: string): readonly Element[] {
	try {
		return Array.from(root.querySelectorAll(selector));
	} catch {
		return [];
	}
}

function routeElementSelectors(
	plan: MatchDomSelectorsOffscreenRequest['plan'],
	element: Element,
): readonly string[] {
	const selectors = new Set<string>();
	addRoutedSelectors(selectors, plan.selectorsByTag[element.localName.toLowerCase()]);
	for (const attribute of element.getAttributeNames()) {
		addRoutedSelectors(selectors, plan.selectorsByAttribute[attribute.toLowerCase()]);
	}
	if (element.id) {
		addRoutedSelectors(selectors, plan.selectorsById[element.id]);
	}
	for (const className of element.classList) {
		addRoutedSelectors(selectors, plan.selectorsByClass[className]);
	}
	return [...selectors];
}

function addRoutedSelectors(target: Set<string>, selectors: readonly string[] | undefined): void {
	if (!selectors) return;
	for (const selector of selectors) target.add(selector);
}

function safeElementMatches(element: Element, selector: string): boolean {
	try {
		return element.matches(selector);
	} catch {
		return false;
	}
}

function isDomSelectorOffscreenRequest(message: unknown): message is DomSelectorOffscreenRequestMessage {
	return (
		typeof message === 'object' &&
		message !== null &&
		(message as { channel?: unknown }).channel === DOM_SELECTOR_OFFSCREEN_CHANNEL &&
		(message as { type?: unknown }).type === 'dom-selector.match'
	);
}

function comparePartitionResults(left: MatcherPartitionResult, right: MatcherPartitionResult): number {
	const priorityDelta = left.priority - right.priority;
	return priorityDelta === 0 ? left.kind.localeCompare(right.kind) : priorityDelta;
}

function isMatcherOffscreenRequest(message: unknown): message is MatcherOffscreenRequestMessage {
	return Boolean(
		message &&
		typeof message === 'object' &&
		'channel' in message &&
		message.channel === MATCHER_OFFSCREEN_CHANNEL &&
		'type' in message,
	);
}
