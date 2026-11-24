import { afterEach, describe, expect, it, vi } from 'vitest';

import { Pool } from '@/lib/matcher/workers/pool';
import { FakeWorker, createTasks, ownedTask, result } from '../support/matcher-workers';

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
