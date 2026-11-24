import { afterEach, describe, expect, it, vi } from 'vitest';

import type { MatcherPartitionTask, MatcherWorkerRunMessage } from '@/lib/matcher/contracts';
import { createMatcherPartitionTasks } from '@/lib/matcher/partition';
import type { Pool } from '@/lib/matcher/workers/pool';

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

	/** Reply to the last dispatched partition, optionally claiming a different partition id. */
	complete(partitionId?: string): void {
		const task = this.messages.at(-1)!.task;
		this.dispatchEvent(new MessageEvent('message', {
			data: {
				type: 'matcher-worker.partition-complete',
				result: {
					job: task.job,
					partitionId: partitionId ?? task.partitionId,
					kind: task.kind,
					priority: task.priority,
					observationCount: task.batch.observations.length,
					matches: [],
					diagnostics: {},
					completedAt: 1,
				},
			},
		}));
	}
}

/** One real URL observation partition owned by an ordinary or private job. */
function task(jobId = 'job', incognito = false): MatcherPartitionTask {
	const target = { url: 'https://example.com/', hostname: 'example.com' };
	return createMatcherPartitionTasks({
		job: { jobId, tabId: 7, windowId: 3, expectedUrl: target.url, incognito },
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
	})[0]!;
}

const pools: Pool[] = [];

/** Replace only browser ports and the logger; keep the real pool and offscreen client. */
async function load() {
	vi.resetModules();
	vi.stubGlobal('Worker', WorkerPort);
	const sendMessage = vi.fn(async (_message: unknown): Promise<unknown> => undefined);
	const logger = { debug: vi.fn(), error: vi.fn(), warning: vi.fn() };
	vi.doMock('wxt/browser', () => ({
		browser: {
			offscreen: { hasDocument: async () => true },
			runtime: {
				ContextType: { OFFSCREEN_DOCUMENT: 'OFFSCREEN_DOCUMENT' },
				getContexts: async () => [{}],
				getURL: (path: string) => path,
				sendMessage,
				onMessage: { addListener() {}, removeListener() {} },
			},
		},
	}));
	vi.doMock('@/lib/diagnostics/logging', () => ({ get: () => logger }));
	return {
		...(await import('@/lib/matcher/workers/pool')),
		client: await import('@/lib/matcher/offscreen/client'),
		logger,
		sendMessage,
	};
}

afterEach(() => {
	for (const pool of pools.splice(0)) pool.dispose('test completed');
	vi.useRealTimers();
	WorkerPort.instances.length = 0;
	vi.restoreAllMocks();
	vi.doUnmock('wxt/browser');
	vi.doUnmock('@/lib/diagnostics/logging');
	vi.unstubAllGlobals();
	vi.resetModules();
});

describe('offscreen matcher lifecycle', () => {
	it('releases temporary listeners before reusing a worker for the next partition', async () => {
		const { Pool } = await load();
		const pool = new Pool(1);
		pools.push(pool);
		for (const jobId of ['first', 'second']) {
			const run = pool.run(task(jobId), 0);
			WorkerPort.instances[0]!.complete();
			await expect(run).resolves.toMatchObject({ job: expect.objectContaining({ jobId }) });
			// Only the persistent idle-error listener remains between partitions.
			expect(WorkerPort.instances[0]!.listeners.get('error')?.size).toBe(1);
			expect(WorkerPort.instances[0]!.listeners.get('messageerror')?.size).toBe(0);
		}
		expect(WorkerPort.instances).toHaveLength(1);
	});

	it('ignores a completion for a different partition instead of attributing it to the active one', async () => {
		const { Pool } = await load();
		const pool = new Pool(1);
		pools.push(pool);
		let settled = false;
		const run = pool.run(task('owner'), 0).finally(() => {
			settled = true;
		});

		WorkerPort.instances[0]!.complete('another-partition');
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(settled).toBe(false);

		WorkerPort.instances[0]!.complete();
		await expect(run).resolves.toMatchObject({ job: expect.objectContaining({ jobId: 'owner' }) });
	});

	it('enforces the per-slot partition deadline by terminating and replacing the worker', async () => {
		vi.useFakeTimers();
		const { Pool } = await load();
		const pool = new Pool(1, 1_000);
		pools.push(pool);
		const run = pool.run(task('slow'), 0);
		const rejected = expect(run).rejects.toMatchObject({ name: 'MatcherError', reason: 'run-timeout' });

		await vi.advanceTimersByTimeAsync(1_000);
		await rejected;
		expect(WorkerPort.instances[0]!.terminate).toHaveBeenCalledOnce();
		expect(WorkerPort.instances).toHaveLength(2);

		const next = pool.run(task('next'), 0);
		WorkerPort.instances[1]!.complete();
		await expect(next).resolves.toMatchObject({ job: expect.objectContaining({ jobId: 'next' }) });
		expect(vi.getTimerCount()).toBe(0);
	});

	it('replaces an idle worker that fails before it receives a partition', async () => {
		const { Pool, logger } = await load();
		const pool = new Pool(1);
		pools.push(pool);
		const idle = WorkerPort.instances[0]!;

		idle.dispatchEvent(Object.assign(new Event('error', { cancelable: true }), { error: new Error('module load failed') }));
		expect(idle.terminate).toHaveBeenCalledOnce();
		expect(logger.warning).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ event: 'matcher-worker-idle-error' }));

		const run = pool.run(task('after-idle-failure'), 0);
		expect(WorkerPort.instances).toHaveLength(2);
		WorkerPort.instances[1]!.complete();
		await expect(run).resolves.toMatchObject({ job: expect.objectContaining({ jobId: 'after-idle-failure' }) });
	});

	it.each(['error', 'messageerror'] as const)(
		'settles a worker %s failure and removes its request listeners',
		async (type) => {
			const { Pool } = await load();
			const pool = new Pool(1);
			pools.push(pool);
			const run = pool.run(task(), 0);
			const rejected = expect(run).rejects.toThrow(type === 'error' ? 'worker crashed' : 'deserialized');
			const worker = WorkerPort.instances[0]!;
			worker.dispatchEvent(Object.assign(new Event(type), { error: new Error('worker crashed') }));
			await rejected;
			expect(worker.listeners.get('error')?.size).toBe(0);
			expect(worker.listeners.get('messageerror')?.size).toBe(0);
			expect(worker.terminate).toHaveBeenCalledOnce();
		},
	);

	it.each([false, true])('limits worker failure diagnostics by job privacy: %s', async (incognito) => {
		const { Pool, logger } = await load();
		const pool = new Pool(1);
		pools.push(pool);
		const failureUrl = 'https://failure.example/private/source';
		const error = new Error(`Worker failed at ${failureUrl}`);
		const run = pool.run(task('privacy', incognito), 0);
		const rejected = expect(run).rejects.toBe(error);

		WorkerPort.instances[0]!.dispatchEvent(Object.assign(new Event('error'), { error, filename: failureUrl }));
		await rejected;

		const poolFailure = logger.error.mock.calls.find(([event]) => event === 'Matcher worker JavaScript error.')?.[1];
		if (incognito) {
			expect(poolFailure).toMatchObject({ errorType: 'Error', jobId: 'privacy' });
			expect(poolFailure).not.toHaveProperty('error');
			expect(poolFailure).not.toHaveProperty('filename');
		} else {
			expect(poolFailure).toMatchObject({ error, filename: failureUrl });
		}
	});

	it.each([false, true])('limits offscreen-client failure diagnostics by job privacy: %s', async (incognito) => {
		const harness = await load();
		const message = 'Matcher failed at https://failure.example/private/source';
		harness.sendMessage.mockResolvedValueOnce({ ok: false, reason: 'failed', message });

		await expect(harness.client.runPartition({ task: task('privacy', incognito), workerIndex: 0 })).rejects.toThrow(message);

		const details = harness.logger.error.mock.calls.find(([event]) => event === 'Offscreen matcher partition failed.')?.[1];
		if (incognito) {
			expect(details).toMatchObject({ errorType: 'Error', jobId: 'privacy' });
			expect(details).not.toHaveProperty('error');
		} else {
			expect(details?.error).toMatchObject({ message });
		}
	});
});
