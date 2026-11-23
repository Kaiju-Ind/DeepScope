import { afterEach, describe, expect, it, vi } from 'vitest';

import { createMatcherPartitionTasks } from '@/lib/matcher/partition';
import type { MatcherPartitionResult, MatcherPartitionTask, MatcherWorkerRunMessage } from '@/lib/matcher/contracts';
import { Pool } from '@/lib/matcher/offscreen/pool';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals } from '../support/factories';

/** Minimal DedicatedWorker test double that keeps message ownership observable. */
class FakeWorker {
	static readonly instances: FakeWorker[] = [];

	readonly listeners = new Map<string, Set<(event: MessageEvent<unknown>) => void>>();
	lastMessage: MatcherWorkerRunMessage | undefined;
	terminated = false;

	constructor(_url: URL, readonly options?: WorkerOptions) {
		FakeWorker.instances.push(this);
	}

	addEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
		const callbacks = this.listeners.get(type) ?? new Set();
		callbacks.add(listener as (event: MessageEvent<unknown>) => void);
		this.listeners.set(type, callbacks);
	}

	removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
		this.listeners.get(type)?.delete(listener as (event: MessageEvent<unknown>) => void);
	}

	postMessage(message: MatcherWorkerRunMessage): void {
		this.lastMessage = message;
	}

	terminate(): void {
		this.terminated = true;
	}

	emitError(message = 'worker crashed'): void {
		const event = { error: new Error(message), message, filename: 'matcher.worker.js', lineno: 1, colno: 1 } as ErrorEvent;
		for (const listener of this.listeners.get('error') ?? []) listener(event as unknown as MessageEvent<unknown>);
	}

	emitMessage(data: unknown): void {
		const event = { data } as MessageEvent<unknown>;
		for (const listener of this.listeners.get('message') ?? []) listener(event);
	}
}

function createTasks(): Readonly<Record<'scriptSrc' | 'meta', MatcherPartitionTask>> {
	const batch = normalizePageSignals(makePageSignals({
		url: 'https://example.com/',
		meta: { generator: ['Example CMS'] },
		scripts: ['https://cdn.example/runtime.js'],
	}));
	const job = { jobId: 'base', tabId: 1, windowId: 1, expectedUrl: batch.target.url } as const;
	const tasks = createMatcherPartitionTasks({ job, batch });
	const scriptSrc = tasks.find((task) => task.kind === 'scriptSrc');
	const meta = tasks.find((task) => task.kind === 'meta');
	if (!scriptSrc || !meta) throw new Error('Matcher pool fixture did not produce required kinds.');
	return { scriptSrc, meta };
}

function ownedTask(template: MatcherPartitionTask, jobId: string, tabId: number): MatcherPartitionTask {
	return {
		...template,
		job: { ...template.job, jobId, tabId },
		partitionId: `${jobId}:${template.kind}`,
	};
}

function result(task: MatcherPartitionTask): MatcherPartitionResult {
	return {
		job: task.job,
		partitionId: task.partitionId,
		kind: task.kind,
		priority: task.priority,
		observationCount: task.batch.observations.length,
		matches: [],
		diagnostics: {
			observationCount: task.batch.observations.length,
			skippedObservationCount: 0,
			candidateRuleCount: 0,
			keyedRuleCount: 0,
			fallbackRuleCount: 0,
			literalRuleCount: 0,
			literalRejectedRuleCount: 0,
			matchCount: 0,
			observationsByKind: { [task.kind]: task.batch.observations.length },
			skippedObservationsByKind: {},
			candidateRulesByKind: {},
		},
		completedAt: 1,
	};
}

afterEach(() => {
	FakeWorker.instances.length = 0;
	vi.unstubAllGlobals();
});

describe('offscreen matcher worker pool', () => {
	it('cancels and replaces only the worker slot owned by the selected job', async () => {
		vi.stubGlobal('Worker', FakeWorker as unknown as typeof Worker);
		const templates = createTasks();
		const firstTask = ownedTask(templates.scriptSrc, 'job-a', 7);
		const secondTask = ownedTask(templates.meta, 'job-b', 8);
		const pool = new Pool(2);

		const first = pool.run(firstTask, 0);
		const second = pool.run(secondTask, 1);
		expect(FakeWorker.instances).toHaveLength(2);
		expect(FakeWorker.instances[0]!.lastMessage?.task.job.jobId).toBe('job-a');
		expect(FakeWorker.instances[1]!.lastMessage?.task.job.jobId).toBe('job-b');

		expect(pool.cancelJob('job-a', 'test cancellation')).toBe(1);
		await expect(first).rejects.toThrow('test cancellation');
		expect(FakeWorker.instances[0]!.terminated).toBe(true);
		expect(FakeWorker.instances[1]!.terminated).toBe(false);
		expect(FakeWorker.instances).toHaveLength(3);

		FakeWorker.instances[1]!.emitMessage({
			type: 'matcher-worker.partition-complete',
			result: result(secondTask),
		});
		await expect(second).resolves.toMatchObject({ partitionId: secondTask.partitionId });

		const replacementTask = ownedTask(templates.scriptSrc, 'job-c', 9);
		const replacement = pool.run(replacementTask, 0);
		expect(FakeWorker.instances[2]!.lastMessage?.task.job.jobId).toBe('job-c');
		FakeWorker.instances[2]!.emitMessage({
			type: 'matcher-worker.partition-complete',
			result: result(replacementTask),
		});
		await expect(replacement).resolves.toMatchObject({ partitionId: replacementTask.partitionId });

		pool.dispose();
	});
	it('replaces only a worker slot that reports a runtime failure', async () => {
		vi.stubGlobal('Worker', FakeWorker as unknown as typeof Worker);
		const templates = createTasks();
		const failedTask = ownedTask(templates.scriptSrc, 'job-failed', 7);
		const pool = new Pool(2);

		const failed = pool.run(failedTask, 0);
		FakeWorker.instances[0]!.emitError('matcher worker crashed');
		await expect(failed).rejects.toThrow('matcher worker crashed');
		expect(FakeWorker.instances[0]!.terminated).toBe(true);
		expect(FakeWorker.instances[1]!.terminated).toBe(false);
		expect(FakeWorker.instances).toHaveLength(3);

		const recoveredTask = ownedTask(templates.scriptSrc, 'job-recovered', 8);
		const recovered = pool.run(recoveredTask, 0);
		expect(FakeWorker.instances[2]!.lastMessage?.task.job.jobId).toBe('job-recovered');
		FakeWorker.instances[2]!.emitMessage({
			type: 'matcher-worker.partition-complete',
			result: result(recoveredTask),
		});
		await expect(recovered).resolves.toMatchObject({ partitionId: recoveredTask.partitionId });
		pool.dispose();
	});

});
