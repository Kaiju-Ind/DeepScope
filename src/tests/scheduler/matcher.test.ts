import { describe, expect, it } from 'vitest';

import { createCompiledDetectionGraph } from '@/lib/detection/registry-graph';
import { createMatcherPartitionTasks } from '@/lib/matcher';
import type {
	MatcherPartitionResult,
	MatcherPartitionTask,
	RunMatcherJobRequest,
	RunMatcherPartitionRequest,
} from '@/lib/matcher';
import * as matcherScheduler from '@/lib/scheduler/matcher';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals } from '../support/factories';

interface PendingPartition {
	readonly request: RunMatcherPartitionRequest;
	readonly resolve: (result: MatcherPartitionResult) => void;
	readonly reject: (error: unknown) => void;
}

function createExecutor(capacity = 2) {
	const partitions: PendingPartition[] = [];
	const canceledJobs: string[] = [];
	return {
		partitions,
		canceledJobs,
		executor: {
			capacity,
			runPartition(request: RunMatcherPartitionRequest) {
				return new Promise<MatcherPartitionResult>((resolve, reject) => {
					partitions.push({ request, resolve, reject });
				});
			},
			async cancelJob(jobId: string) {
				canceledJobs.push(jobId);
			},
			async cancelTab() {},
			async touchLifecycle() {},
			async releaseLifecycle() {},
		} satisfies matcherScheduler.MatcherPartitionExecutor,
	};
}

function createRequest(overrides: Partial<RunMatcherJobRequest['job']> = {}): RunMatcherJobRequest {
	const batch = normalizePageSignals(makePageSignals({
		url: 'https://example.com/products',
		meta: { generator: ['Example CMS'] },
		scripts: ['https://cdn.example/runtime.js'],
		resources: [{ url: 'https://cdn.example/chunk.js', initiatorType: 'script' }],
		scriptContents: ['window.__EXAMPLE__ = true'],
	}));
	return {
		job: {
			jobId: 'job-1',
			tabId: 7,
			windowId: 1,
			expectedUrl: batch.target.url,
			incognito: true,
			...overrides,
		},
		mode: 'complete',
		batch,
		registry: [],
		relationshipGraph: createCompiledDetectionGraph([], []),
		lifecycleId: 'lifecycle-1',
	};
}

function createSingleKindRequest(
	kind: MatcherPartitionTask['kind'],
	jobId: string,
	tabId: number,
): RunMatcherJobRequest {
	const request = createRequest({ jobId, tabId });
	const observations = request.batch.observations.filter((observation) => observation.kind === kind);
	if (observations.length === 0) throw new Error(`Matcher scheduler fixture did not produce ${kind} observations.`);
	return { ...request, batch: { ...request.batch, observations } };
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

/** Wait for scheduler progress without allowing a regression to hang the test process forever. */
async function waitFor(predicate: () => boolean, description: string): Promise<void> {
	for (let attempt = 0; attempt < 100; attempt += 1) {
		if (predicate()) return;
		await Promise.resolve();
	}
	throw new Error(`Timed out waiting for ${description}.`);
}

async function flush(): Promise<void> {
	await Promise.resolve();
	await Promise.resolve();
}

describe('matcher partition scheduler', () => {
	it('uses both workers for independent kinds and never exceeds executor capacity', async () => {
		const controlled = createExecutor(2);
		const scheduler = matcherScheduler.create(controlled.executor);
		const request = createRequest();
		const partitionCount = createMatcherPartitionTasks({ job: request.job, batch: request.batch }).length;
		const completion = scheduler.runJob(request);

		await waitFor(() => controlled.partitions.length === 2, 'both independent matcher worker slots to start');
		expect(controlled.partitions).toHaveLength(2);
		expect(new Set(controlled.partitions.map((entry) => entry.request.task.kind)).size).toBe(2);

		for (let index = 0; index < partitionCount; index += 1) {
			await waitFor(() => controlled.partitions.length > index, `matcher partition ${index + 1}`);
			const entry = controlled.partitions[index]!;
			entry.resolve(result(entry.request.task));
			await flush();
		}

		const completed = await completion;
		expect(completed.partitionCount).toBe(partitionCount);
		expect(controlled.partitions).toHaveLength(partitionCount);
	});

	it('does not run two partitions of the same kind concurrently', async () => {
		const controlled = createExecutor(2);
		const scheduler = matcherScheduler.create(controlled.executor);
		const request = createRequest();
		const template = request.batch.observations.find((observation) => observation.kind === 'scriptSrc')!;
		const observations = Array.from({ length: 40 }, (_item, index) => ({
			...template,
			value: `https://cdn.example/script-${index}.js`,
		}));
		const singleKindRequest = { ...request, batch: { ...request.batch, observations } };
		const partitionCount = createMatcherPartitionTasks({
			job: singleKindRequest.job,
			batch: singleKindRequest.batch,
		}).length;
		const completion = scheduler.runJob(singleKindRequest);

		await waitFor(() => controlled.partitions.length === 1, 'the first single-kind matcher partition');
		expect(controlled.partitions).toHaveLength(1);
		for (let index = 0; index < partitionCount; index += 1) {
			await waitFor(() => controlled.partitions.length > index, `single-kind matcher partition ${index + 1}`);
			expect(controlled.partitions.length).toBe(index + 1);
			const entry = controlled.partitions[index]!;
			entry.resolve(result(entry.request.task));
			await flush();
		}
		await completion;
	});

	it('applies tab priority changes at the next partition boundary', async () => {
		const controlled = createExecutor(1);
		const scheduler = matcherScheduler.create(controlled.executor);
		await scheduler.activateTab(7, 1);
		const first = scheduler.runJob(createRequest({ jobId: 'job-1', tabId: 7 }));
		const second = scheduler.runJob(createRequest({ jobId: 'job-2', tabId: 8 }));

		await waitFor(() => controlled.partitions.length >= 1, 'foreground matcher partition');
		expect(controlled.partitions[0]!.request.task.job.jobId).toBe('job-1');
		await scheduler.activateTab(8, 1);
		controlled.partitions[0]!.resolve(result(controlled.partitions[0]!.request.task));
		await waitFor(() => controlled.partitions.length >= 2, 'reprioritized matcher partition');
		expect(controlled.partitions[1]!.request.task.job.jobId).toBe('job-2');

		await scheduler.cancelJob('job-1');
		await scheduler.cancelJob('job-2');
		await expect(first).rejects.toMatchObject({ reason: 'canceled' });
		await expect(second).rejects.toMatchObject({ reason: 'canceled' });
	});

	it('gives a waiting background tab a bounded partition turn under sustained foreground work', async () => {
		const controlled = createExecutor(1);
		const scheduler = matcherScheduler.create(controlled.executor);
		await scheduler.activateTab(7, 1);

		const base = createRequest({ jobId: 'foreground-job', tabId: 7 });
		const template = base.batch.observations.find((observation) => observation.kind === 'scriptSrc')!;
		const foregroundObservations = Array.from({ length: 16 * 12 }, (_item, index) => ({
			...template,
			value: `https://cdn.example/foreground-${index}.js`,
		}));
		const foregroundRequest = { ...base, batch: { ...base.batch, observations: foregroundObservations } };
		const backgroundRequest = createRequest({ jobId: 'background-job', tabId: 8 });
		const foregroundCompletion = scheduler.runJob(foregroundRequest);
		const backgroundCompletion = scheduler.runJob(backgroundRequest);

		for (let index = 0; index <= 8; index += 1) {
			await waitFor(() => controlled.partitions.length > index, `fairness dispatch ${index + 1}`);
			const entry = controlled.partitions[index]!;
			if (index < 8) expect(entry.request.task.job.jobId).toBe('foreground-job');
			if (index === 8) expect(entry.request.task.job.jobId).toBe('background-job');
			entry.resolve(result(entry.request.task));
		}

		await scheduler.cancelJob('foreground-job');
		await scheduler.cancelJob('background-job');
		await expect(foregroundCompletion).rejects.toMatchObject({ reason: 'canceled' });
		await expect(backgroundCompletion).rejects.toMatchObject({ reason: 'canceled' });
	});

	it('waits for a busy affinity worker instead of duplicating its hot shard on an idle worker', async () => {
		const controlled = createExecutor(2);
		const scheduler = matcherScheduler.create(controlled.executor);
		const scriptA = scheduler.runJob(createSingleKindRequest('scriptSrc', 'script-a', 7));
		const meta = scheduler.runJob(createSingleKindRequest('meta', 'meta-b', 8));

		await waitFor(() => controlled.partitions.length === 2, 'initial affinity workers');
		const scriptWorker = controlled.partitions.find((entry) => entry.request.task.kind === 'scriptSrc')!.request.workerIndex;
		const metaEntry = controlled.partitions.find((entry) => entry.request.task.kind === 'meta')!;
		const scriptEntry = controlled.partitions.find((entry) => entry.request.task.kind === 'scriptSrc')!;
		expect(scriptWorker).not.toBe(metaEntry.request.workerIndex);

		scriptEntry.resolve(result(scriptEntry.request.task));
		await scriptA;
		const urlCompletion = scheduler.runJob(createSingleKindRequest('url', 'url-c', 9));
		await waitFor(() => controlled.partitions.length === 3, 'new kind on freed script worker');
		const urlEntry = controlled.partitions[2]!;
		expect(urlEntry.request.workerIndex).toBe(scriptWorker);

		metaEntry.resolve(result(metaEntry.request.task));
		await meta;
		const scriptD = scheduler.runJob(createSingleKindRequest('scriptSrc', 'script-d', 10));
		await flush();
		expect(controlled.partitions).toHaveLength(3);

		urlEntry.resolve(result(urlEntry.request.task));
		await urlCompletion;
		await waitFor(() => controlled.partitions.length === 4, 'script shard affinity worker to become free');
		const resumedScript = controlled.partitions[3]!;
		expect(resumedScript.request.task.kind).toBe('scriptSrc');
		expect(resumedScript.request.workerIndex).toBe(scriptWorker);
		resumedScript.resolve(result(resumedScript.request.task));
		await scriptD;
	});

	it('rejects a duplicate matcher job identity without replacing the original completion owner', async () => {
		const controlled = createExecutor(1);
		const scheduler = matcherScheduler.create(controlled.executor);
		const first = scheduler.runJob(createRequest({ jobId: 'duplicate-job' }));

		await waitFor(() => controlled.partitions.length === 1, 'the original duplicate-id matcher partition');
		await expect(scheduler.runJob(createRequest({ jobId: 'duplicate-job' }))).rejects.toMatchObject({
			name: 'MatcherError',
			reason: 'host-failed',
		});

		await scheduler.cancelJob('duplicate-job');
		await expect(first).rejects.toMatchObject({ name: 'MatcherError', reason: 'canceled' });
	});

	it('cancels only the selected job at the partition executor', async () => {
		const controlled = createExecutor(2);
		const scheduler = matcherScheduler.create(controlled.executor);
		const completion = scheduler.runJob(createRequest());
		await waitFor(() => controlled.partitions.length >= 1, 'matcher partition before cancellation');

		await scheduler.cancelJob('job-1');
		await expect(completion).rejects.toMatchObject({ name: 'MatcherError', reason: 'canceled' });
		expect(controlled.canceledJobs).toEqual(['job-1']);
	});
});
