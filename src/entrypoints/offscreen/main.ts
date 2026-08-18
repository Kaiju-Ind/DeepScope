import { installDiagnosticCrashHooks } from '@/lib/diagnostics/crash';
import * as logging from '@/lib/diagnostics/logging';
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
	type RunMatcherJobRequest,
} from '@/lib/matcher/contracts';
import { createMatcherPartitionTasks, createMatcherPipelineResult } from '@/lib/matcher/partition';

logging.configure('offscreen');
installDiagnosticCrashHooks('offscreen');

const offscreenLogger = logging.get('offscreen', 'matcher-host');

/** Default worker count used before benchmark data justifies a larger pool. */
const DEFAULT_WORKER_COUNT = 2;

/** Jobs canceled by the background before their queued partitions finish. */
const canceledJobs = new Set<string>();

/** Pending matcher jobs waiting for the shared worker pool. */
const queuedJobs: QueuedMatcherJob[] = [];

/** Whether the offscreen host is currently feeding partitions to the pool. */
let matcherQueueRunning = false;

/** Shared worker pool kept hot for the lifetime of the offscreen document. */
let sharedMatcherWorkerPool: MatcherWorkerPool | undefined;

/** Matcher job queued with the promise callbacks returned to the background. */
interface QueuedMatcherJob {
	/** Request sent by the background. */
	readonly request: RunMatcherJobRequest;
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

	async run(request: RunMatcherJobRequest, tasks: readonly MatcherPartitionTask[]): Promise<readonly MatcherPartitionResult[]> {
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

	dispose(): void {
		for (const worker of this.#workers) {
			worker.dispose();
		}
	}
}

/** Dedicated worker wrapper that runs one partition at a time. */
class MatcherWorkerSlot {
	readonly #worker: Worker;
	readonly #index: number;

	constructor(index: number) {
		this.#index = index;
		this.#worker = new Worker(new URL('./matcher.worker.ts', import.meta.url), {
			type: 'module',
			name: `kaiju-deepscope-matcher-${index}`,
		});
	}

	run(task: MatcherPartitionTask): Promise<MatcherPartitionResult> {
		return new Promise((resolve, reject) => {
			const cleanup = (): void => {
				this.#worker.removeEventListener('message', onMessage);
				this.#worker.removeEventListener('error', onError);
				this.#worker.removeEventListener('messageerror', onMessageError);
			};
			const onMessage = (event: MessageEvent<MatcherWorkerResponseMessage>): void => {
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

	dispose(): void {
		this.#worker.terminate();
	}
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

function enqueueMatcherJob(request: RunMatcherJobRequest): Promise<Awaited<ReturnType<typeof runMatcherJob>>> {
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

function cancelQueuedMatcherJob(jobId: string): void {
	for (let index = queuedJobs.length - 1; index >= 0; index -= 1) {
		if (queuedJobs[index]?.request.job.jobId === jobId) {
			const [queued] = queuedJobs.splice(index, 1);
			queued?.reject(new Error('Matcher job was canceled before dispatch.'));
		}
	}
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
	void runMatcherJob(next.request)
		.then(next.resolve, next.reject)
		.finally(() => {
			matcherQueueRunning = false;
			drainMatcherQueue();
		});
}

function takeNextQueuedMatcherJob(): QueuedMatcherJob | undefined {
	if (queuedJobs.length === 0) {
		return undefined;
	}

	queuedJobs.sort((left, right) => left.priority - right.priority);
	return queuedJobs.shift();
}

function getJobQueuePriority(request: RunMatcherJobRequest): number {
	if (request.mode === 'complete') {
		return 1;
	}
	return 2;
}

async function runMatcherJob(request: RunMatcherJobRequest) {
	const tasks = createMatcherPartitionTasks({
		job: request.job,
		batch: request.batch,
		options: request.options,
	});
	const pool = getSharedMatcherWorkerPool(request);
	const partitions = await pool.run(request, tasks);
	if (canceledJobs.has(request.job.jobId)) {
		throw new Error('Matcher job was canceled before completion.');
	}

	const result = createMatcherPipelineResult({
		batch: request.batch,
		registry: request.registry,
		compiledRegistryArtifact: { relationshipGraph: request.relationshipGraph },
		partitions,
		analyzedAt: request.analyzedAt,
		source: request.source,
	});

	return {
		job: request.job,
		mode: request.mode,
		result,
		partitions,
		executor: 'offscreen-worker-pool' as const,
		completedAt: Date.now(),
	};
}

/**
 * Keep workers and their shard caches alive across matcher jobs.
 *
 * Worker startup and registry-shard hydration were previously paid for every
 * matcher job, which made follow-up evidence passes behave like cold full runs.
 * A shared pool keeps the offscreen document as the durable CPU executor while
 * the background remains the owner of tab lifecycle and storage writes.
 */
function getSharedMatcherWorkerPool(request: RunMatcherJobRequest): MatcherWorkerPool {
	if (sharedMatcherWorkerPool) {
		return sharedMatcherWorkerPool;
	}

	sharedMatcherWorkerPool = new MatcherWorkerPool(request.maxWorkerCount ?? DEFAULT_WORKER_COUNT);
	return sharedMatcherWorkerPool;
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
		const document = new DOMParser().parseFromString(request.html, 'text/html');
		const selectors = collectDomSelectorMatchesInDocument(document, request);
		return { ok: true, selectors };
	} catch (error) {
		return {
			ok: false,
			message: error instanceof Error ? error.message : 'Offscreen DOM selector matching failed.',
		};
	}
}

function collectDomSelectorMatchesInDocument(
	document: Document,
	request: MatchDomSelectorsOffscreenRequest,
): Record<string, boolean> {
	const matches: Record<string, boolean> = Object.create(null) as Record<string, boolean>;
	if (!request.plan.candidateSelector) {
		return matches;
	}

	for (const element of safeQuerySelectorAll(document, request.plan.candidateSelector)) {
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
