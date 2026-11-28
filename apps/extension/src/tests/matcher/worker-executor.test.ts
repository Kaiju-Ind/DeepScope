import { afterEach, describe, expect, it, vi } from 'vitest';

import type { RunMatcherPartitionRequest } from "../../lib/matcher/contracts.ts";
import { FakeWorker, createTasks, ownedTask, result } from "../support/matcher-workers.ts";

afterEach(() => {
	FakeWorker.instances.length = 0;
	vi.unstubAllGlobals();
	vi.useRealTimers();
	vi.doUnmock('../../lib/diagnostics/journal/write.ts');
	vi.doUnmock('../../lib/diagnostics/journal/schema.ts');
	vi.resetModules();
});

/** Build one scheduler request for a partition owned by `jobId` on `tabId`. */
function request(jobId: string, tabId: number, lifecycleId?: string): RunMatcherPartitionRequest {
	return {
		task: ownedTask(createTasks().scriptSrc, jobId, tabId),
		workerIndex: 0,
		...(lifecycleId ? { lifecycleId } : {}),
	} as RunMatcherPartitionRequest;
}

describe('matcher worker executor', () => {
	it('creates workers on first use and disposes them when the last lifecycle releases', async () => {
		vi.stubGlobal('Worker', FakeWorker as unknown as typeof Worker);
		const { WorkerExecutor } = await import('../../lib/matcher/workers/executor.ts');
		const onIdle = vi.fn();
		const executor = new WorkerExecutor({ onIdle, workerCount: 1 });
		expect(FakeWorker.instances).toHaveLength(0);

		const run = request('job-a', 7, 'life-a');
		const pending = executor.run(run);
		expect(FakeWorker.instances).toHaveLength(1);
		FakeWorker.instances[0]!.emitMessage({ type: 'matcher-worker.partition-complete', result: result(run.task) });
		await expect(pending).resolves.toMatchObject({ partitionId: run.task.partitionId });

		// The lifecycle keeps the warm worker alive between staged passes.
		expect(FakeWorker.instances[0]!.terminated).toBe(false);
		expect(onIdle).not.toHaveBeenCalled();

		executor.releaseLifecycle('life-a');
		expect(FakeWorker.instances[0]!.terminated).toBe(true);
		expect(onIdle).toHaveBeenCalledWith('analysis-complete', executor.generation);
		expect(executor.isIdleAt(executor.generation)).toBe(true);
	});

	it('cancels only the tab that owns the running partition', async () => {
		vi.stubGlobal('Worker', FakeWorker as unknown as typeof Worker);
		const { WorkerExecutor } = await import('../../lib/matcher/workers/executor.ts');
		const executor = new WorkerExecutor({ workerCount: 1 });
		const pending = executor.run(request('job-a', 7));

		expect(executor.cancelTab(8, 'tab-closed')).toBe(0);
		expect(executor.cancelTab(7, 'tab-closed')).toBe(1);
		await expect(pending).rejects.toMatchObject({ reason: 'canceled' });
	});

	it('expires an abandoned lifecycle through the watchdog', async () => {
		vi.useFakeTimers();
		vi.stubGlobal('Worker', FakeWorker as unknown as typeof Worker);
		const { EXECUTOR_IDLE_MS, WorkerExecutor } = await import('../../lib/matcher/workers/executor.ts');
		const onIdle = vi.fn();
		const executor = new WorkerExecutor({ onIdle });

		executor.touchLifecycle('life-a', 7);
		vi.advanceTimersByTime(EXECUTOR_IDLE_MS - 1);
		expect(onIdle).not.toHaveBeenCalled();
		vi.advanceTimersByTime(1);
		expect(onIdle).toHaveBeenCalledWith('watchdog', executor.generation);
	});

	it('treats an idle notice as stale once new work arrives', async () => {
		vi.stubGlobal('Worker', FakeWorker as unknown as typeof Worker);
		const { WorkerExecutor } = await import('../../lib/matcher/workers/executor.ts');
		const executor = new WorkerExecutor();
		executor.releaseLifecycle('nothing');
		const idleGeneration = executor.generation;

		executor.touchLifecycle('life-b', 7);
		expect(executor.isIdleAt(idleGeneration)).toBe(false);
	});
});

describe('background-page matcher executor', () => {
	it('runs workers locally only where the global scope can create them', async () => {
		const { canRunWorkersLocally } = await import('../../lib/matcher/workers/local.ts');
		// A service worker has neither `document` nor `Worker`.
		expect(canRunWorkersLocally()).toBe(false);

		vi.stubGlobal('Worker', FakeWorker as unknown as typeof Worker);
		vi.stubGlobal('document', {});
		expect(canRunWorkersLocally()).toBe(true);
	});

	it('writes worker diagnostics straight to the journal', async () => {
		const persist = vi.fn(async () => undefined);
		vi.doMock('../../lib/diagnostics/journal/write.ts', async (importOriginal) => ({
			...(await importOriginal<typeof import('../../lib/diagnostics/journal/write.ts')>()),
			persistTransportedDiagnosticMessage: persist,
		}));
		vi.doMock('../../lib/diagnostics/journal/schema.ts', async (importOriginal) => ({
			...(await importOriginal<typeof import('../../lib/diagnostics/journal/schema.ts')>()),
			// Recognise a marked test message; this test is about routing, not the record schema.
			isDiagnosticTransportMessage: (value: unknown) => (value as { channel?: string } | undefined)?.channel === 'test-diagnostics',
		}));
		vi.stubGlobal('Worker', FakeWorker as unknown as typeof Worker);
		const { createLocalExecutor } = await import('../../lib/matcher/workers/local.ts');
		const executor = createLocalExecutor();
		const run = request('job-a', 7);
		const pending = executor.runPartition(run);

		const diagnostic = { channel: 'test-diagnostics', type: 'diagnostics.record' };
		FakeWorker.instances[0]!.emitMessage(diagnostic);
		expect(persist).toHaveBeenCalledWith(diagnostic);

		FakeWorker.instances[0]!.emitMessage({ type: 'matcher-worker.partition-complete', result: result(run.task) });
		await expect(pending).resolves.toMatchObject({ partitionId: run.task.partitionId });
		await executor.releaseLifecycle('unused');
	});
});
