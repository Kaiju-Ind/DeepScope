import { afterEach, describe, expect, it, vi } from 'vitest';

import { createObservationMatcherIndex, matchIndexedObservationBatch } from '@/lib/detection/observation-matcher-index';
import { createCompiledDetectionGraph } from '@/lib/detection/registry-graph';
import {
	MATCHER_OFFSCREEN_CHANNEL,
	type MatcherOffscreenResponse,
	type MatcherWorkerRunMessage,
	type OffscreenMatcherJobRequest,
} from '@/lib/matcher/contracts';
import { createMatcherPartitionTasks } from '@/lib/matcher/partition';
import type { Pool } from '@/lib/matcher/offscreen/pool';

/** Workers are the browser boundary; the real pool owns protocol, settlement and listener cleanup. */
class WorkerPort extends EventTarget {
	static readonly instances: WorkerPort[] = [];
	readonly messages: MatcherWorkerRunMessage[] = [];
	readonly terminate = vi.fn();
	readonly listeners = new Map<string, Set<EventListenerOrEventListenerObject>>();
	readonly postMessage = vi.fn((message: MatcherWorkerRunMessage) => {
		this.messages.push(message);
	});

	constructor() {
		super();
		WorkerPort.instances.push(this);
	}

	override addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject | null,
		options?: AddEventListenerOptions | boolean,
	): void {
		if (listener) {
			const listeners = this.listeners.get(type) ?? new Set();
			listeners.add(listener);
			this.listeners.set(type, listeners);
		}
		super.addEventListener(type, listener, options);
	}

	override removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject | null,
		options?: EventListenerOptions | boolean,
	): void {
		if (listener) this.listeners.get(type)?.delete(listener);
		super.removeEventListener(type, listener, options);
	}

	/** Complete the last dispatched partition using the ordinary worker response contract. */
	complete(): void {
		const task = this.messages.at(-1)!.task;
		const matched = matchIndexedObservationBatch({
			registry: [],
			batch: task.batch,
			index: createObservationMatcherIndex([]),
		});
		this.dispatchEvent(
			new MessageEvent('message', {
				data: {
					type: 'matcher-worker.partition-complete',
					result: {
						job: task.job,
						partitionId: task.partitionId,
						kind: task.kind,
						priority: task.priority,
						observationCount: task.batch.observations.length,
						matches: [],
						diagnostics: matched.diagnostics,
						completedAt: Date.now(),
					},
				},
			}),
		);
	}
}

/** One real URL observation is enough to exercise host admission and worker ownership. */
function request(jobId = 'job', incognito = false): OffscreenMatcherJobRequest {
	const target = { url: 'https://example.com/', hostname: 'example.com' };
	return {
		job: { jobId, tabId: 7, expectedUrl: target.url, incognito },
		mode: 'complete',
		batch: {
			target,
			interface: 'extension',
			observedAt: 1,
			observations: [{
				target,
				interface: 'extension',
				kind: 'url',
				collector: 'content-snapshot',
				observedAt: 1,
				value: target.url,
			}],
		},
	};
}

const pools: Pool[] = [];
const pendingRequests: Promise<unknown>[] = [];
const cancelHostJobs: Array<() => Promise<MatcherOffscreenResponse> | undefined> = [];

/** Observe settlement immediately so teardown can join a request after an earlier assertion fails. */
function trackRequest<T>(request: Promise<T>): Promise<T> {
	pendingRequests.push(request.then(() => undefined, () => undefined));
	return request;
}

/** Replace only browser message ports; keep the actual queue, partitioner, pool and host. */
async function load() {
	vi.resetModules();
	vi.stubGlobal('Worker', WorkerPort);
	let listener: ((message: unknown) => Promise<MatcherOffscreenResponse> | undefined) | undefined;
	const sendMessage = vi.fn(async (_message: unknown): Promise<unknown> => undefined);
	const logger = { debug: vi.fn(), error: vi.fn() };
	vi.doMock('wxt/browser', () => ({
		browser: {
			offscreen: {},
			runtime: {
				ContextType: { OFFSCREEN_DOCUMENT: 'OFFSCREEN_DOCUMENT' },
				getContexts: async () => [{}],
				getURL: (path: string) => path,
				sendMessage,
				onMessage: {
					addListener(callback: typeof listener) {
						listener = callback;
					},
					removeListener() {},
				},
			},
		},
	}));
	vi.doMock('@/lib/diagnostics/logging', () => ({ get: () => logger }));
	return {
		...(await import('@/lib/matcher/offscreen/pool')),
		start: (await import('@/lib/matcher/offscreen/host')).start,
		runClient: (await import('@/lib/matcher/offscreen/client')).run,
		logger,
		sendMessage,
		dispatch(message: unknown) {
			if (!listener) throw new Error('The host did not register its runtime message listener.');
			return listener(message);
		},
		/** Teardown retains cancellation ownership even when a test fails before it awaits the response. */
		runJob(request: OffscreenMatcherJobRequest) {
			const receiver = listener;
			if (!receiver) throw new Error('The host did not register its runtime message listener.');
			const response = receiver({ channel: MATCHER_OFFSCREEN_CHANNEL, type: 'matcher.run-job', request });
			if (!response) throw new Error('The host did not accept its job message.');
			cancelHostJobs.push(() =>
				receiver({ channel: MATCHER_OFFSCREEN_CHANNEL, type: 'matcher.cancel-job', jobId: request.job.jobId })
			);
			return trackRequest(response);
		},
	};
}

afterEach(async () => {
	try {
		for (const pool of pools.splice(0)) pool.dispose('test completed');
		for (const cancel of cancelHostJobs.splice(0)) await cancel();
		await Promise.all(pendingRequests.splice(0));
		if (vi.isFakeTimers()) {
			await vi.advanceTimersByTimeAsync(30_000);
			expect(vi.getTimerCount()).toBe(0);
		}
	} finally {
		if (vi.isFakeTimers()) vi.clearAllTimers();
		vi.useRealTimers();
		WorkerPort.instances.length = 0;
		vi.restoreAllMocks();
		vi.doUnmock('wxt/browser');
		vi.doUnmock('@/lib/diagnostics/logging');
		vi.unstubAllGlobals();
		vi.resetModules();
	}
});

describe('offscreen matcher lifecycle', () => {
	it('streams a completed partition and releases temporary listeners before reusing the worker', async () => {
		const { Pool } = await load();
		const onPartition = vi.fn(async () => undefined);
		const pool = new Pool(1, { isCanceled: () => false, onPartition });
		pools.push(pool);
		for (const jobId of ['first', 'second']) {
			const run = trackRequest(pool.run(createMatcherPartitionTasks(request(jobId))));
			WorkerPort.instances[0]!.complete();
			await expect(run).resolves.toBe(1);
			expect(WorkerPort.instances[0]!.listeners.get('error')?.size).toBe(0);
			expect(WorkerPort.instances[0]!.listeners.get('messageerror')?.size).toBe(0);
		}
		expect(WorkerPort.instances).toHaveLength(1);
		expect(onPartition).toHaveBeenCalledTimes(2);
		expect(onPartition).toHaveBeenLastCalledWith(
			expect.objectContaining({ job: expect.objectContaining({ jobId: 'second' }) }),
			1,
			1,
		);
	});

	it('rejects the owned promise and terminates every worker on disposal', async () => {
		const { Pool } = await load();
		const pool = new Pool(2, { isCanceled: () => false, onPartition: async () => undefined });
		pools.push(pool);
		const run = trackRequest(pool.run(createMatcherPartitionTasks(request())));
		const reason = new Error('request canceled');
		const rejected = expect(run).rejects.toBe(reason);
		pool.dispose(reason);
		await rejected;
		for (const worker of WorkerPort.instances) {
			expect(worker.terminate).toHaveBeenCalledOnce();
			expect([...worker.listeners.values()].every((listeners) => listeners.size === 0)).toBe(true);
		}
	});

	it.each(['error', 'messageerror'] as const)(
		'settles a worker %s failure and removes its request listeners',
		async (type) => {
			const { Pool } = await load();
			const pool = new Pool(1, { isCanceled: () => false, onPartition: async () => undefined });
			pools.push(pool);
			const run = trackRequest(pool.run(createMatcherPartitionTasks(request())));
			const rejected = expect(run).rejects.toThrow(type === 'error' ? 'worker crashed' : 'deserialized');
			const worker = WorkerPort.instances[0]!;
			worker.dispatchEvent(Object.assign(new Event(type), { error: new Error('worker crashed') }));
			await rejected;
			expect(worker.listeners.get('error')?.size).toBe(0);
			expect(worker.listeners.get('messageerror')?.size).toBe(0);
		},
	);

	it.each([false, true])('limits worker and host failure diagnostics by job privacy: %s', async (incognito) => {
		vi.useFakeTimers();
		const host = await load();
		host.start();
		const failureUrl = 'https://failure.example/private/source';
		const error = new Error(`Worker failed at ${failureUrl}`);
		const result = host.runJob(request('privacy', incognito));
		const worker = WorkerPort.instances.find((port) => port.messages.length)!;

		worker.dispatchEvent(Object.assign(new Event('error'), { error, filename: failureUrl }));

		await expect(result).resolves.toMatchObject({ ok: false, reason: 'failed', message: error.message });
		const poolFailure = host.logger.error.mock.calls.find(([event]) => event === 'Matcher worker JavaScript error.')?.[1];
		const hostDisposal = host.logger.debug.mock.calls.find(([event]) => event === 'Disposed matcher worker pool.')?.[1];
		if (incognito) {
			expect(poolFailure).toMatchObject({ errorType: 'Error', jobId: 'privacy' });
			expect(poolFailure).not.toHaveProperty('error');
			expect(poolFailure).not.toHaveProperty('filename');
			expect(hostDisposal).toMatchObject({ errorType: 'Error', activeJobId: 'privacy' });
			expect(hostDisposal).not.toHaveProperty('reason');
		} else {
			expect(poolFailure).toMatchObject({ error, filename: failureUrl });
			expect(hostDisposal).toMatchObject({ reason: error.message });
		}
	});

	it.each([false, true])('limits offscreen-client failure diagnostics by job privacy: %s', async (incognito) => {
		const harness = await load();
		const message = 'Matcher failed at https://failure.example/private/source';
		harness.sendMessage.mockResolvedValueOnce({ ok: false, reason: 'failed', message });
		await expect(harness.runClient({
			...request('privacy', incognito),
			registry: [],
			relationshipGraph: createCompiledDetectionGraph([], []),
		})).rejects.toThrow(message);
		const details = harness.logger.error.mock.calls.find(([event]) => event === 'Offscreen matcher job failed.')?.[1];
		if (incognito) {
			expect(details).toMatchObject({ errorType: 'Error', jobId: 'privacy' });
			expect(details).not.toHaveProperty('error');
		} else {
			expect(details?.error).toMatchObject({ message });
		}
	});

	it('cancels active work, admits a replacement, and releases idle heaps after the grace period', async () => {
		vi.useFakeTimers();
		const host = await load();
		host.start();
		expect(host.dispatch({ type: 'unrelated' })).toBeUndefined();
		const first = host.runJob(request('first'));
		const original = [...WorkerPort.instances];
		expect(original).toHaveLength(2);
		await expect(host.dispatch({ channel: MATCHER_OFFSCREEN_CHANNEL, type: 'matcher.cancel-job', jobId: 'first' }))
			.resolves.toMatchObject({ ok: true, canceled: true });
		await expect(first).resolves.toMatchObject({ ok: false, reason: 'canceled' });
		await vi.advanceTimersByTimeAsync(0);
		for (const worker of original) expect(worker.terminate).toHaveBeenCalledOnce();

		const second = host.runJob(request('second'));
		const replacements = WorkerPort.instances.slice(2);
		expect(replacements).toHaveLength(2);
		replacements.find((worker) => worker.messages.length)!.complete();
		await expect(second).resolves.toMatchObject({ ok: true, value: { partitionCount: 1 } });
		await vi.advanceTimersByTimeAsync(29_999);
		for (const worker of replacements) expect(worker.terminate).not.toHaveBeenCalled();
		await vi.advanceTimersByTimeAsync(1);
		for (const worker of replacements) expect(worker.terminate).toHaveBeenCalledOnce();
		expect(host.sendMessage).toHaveBeenCalledWith(expect.objectContaining({ type: 'matcher.host-idle' }));
		expect(vi.getTimerCount()).toBe(0);
	});
});
