import { timeAsyncSpan } from "../../../diagnostics/timing.ts";

import { MatcherError, createMatcherPipelineResult, type MatcherJobRecord, type MatcherJobRunResult } from "../../../matcher/index.ts";

import type { BackgroundRuntimeDependencies, MatcherCancellationReason, MatcherRunType } from '../types.ts';
import { summarizeTab, getMatcherFailureReason } from '../output.ts';

import type { Type as Progress } from '../progress.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
	readonly matcher: Pick<BackgroundRuntimeDependencies['matcher'], 'runJob' | 'cancelJob'>;
	readonly persistence: Pick<BackgroundRuntimeDependencies['persistence'], 'updateMatcherJob'>;
	readonly updateMatcherState: Progress['updateMatcherState'];
	readonly updatePartitionProgress: Progress['updatePartitionProgress'];
	readonly getMatcherProgress: Progress['getMatcherProgress'];
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly runMatcher: (input: MatcherRunType) => Promise<MatcherJobRunResult>;
	readonly cancelMatcherJob: (job: Pick<MatcherJobRecord, 'jobId' | 'incognito'>, reason: MatcherCancellationReason) => Promise<void>;
	readonly requestMatcherCancellation: (job: Pick<MatcherJobRecord, 'jobId' | 'tabId' | 'incognito'>, reason: MatcherCancellationReason) => void;
}

/** Create one jobs execute owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const { updateMatcherState, updatePartitionProgress, getMatcherProgress } = dependencies;

	const { updateMatcherJob: updateMatcherJobRecord } = dependencies.persistence;

	const logBackgroundEvent = dependencies.logEvent;

	/** Run the isolated matcher and assemble the terminal pipeline from the one background accumulator. */
	async function runMatcher(input: MatcherRunType): Promise<MatcherJobRunResult> {
		const signal = input.workScope.controller.signal;
		signal.throwIfAborted();
		logBackgroundEvent('matcher-job-dispatch', {
			...summarizeTab(input.tab),
			jobId: input.job.jobId,
			mode: input.mode,
			refreshKind: input.details.refreshKind,
			observationCount: input.batch.observations.length,
			timingTraceId: input.timingTraceId,
		});
		try {
			const executor = await timeAsyncSpan(
				'pipeline.run-partitioned-matcher-job',
				input.timingContext,
				() => dependencies.matcher.runJob({
					job: input.job,
					mode: input.mode,
					batch: input.batch,
					registry: input.registry.technologies,
					relationshipGraph: input.registry.relationshipGraph,
					source: 'fresh',
					lifecycleId: input.workScope.lifecycleId,
				}, {
					onState: updateMatcherState,
					onPartition: updatePartitionProgress,
				}),
				(value) => ({ partitionCount: value.partitionCount, executor: value.executor }),
			);
			signal.throwIfAborted();

			const progress = getMatcherProgress(input.job.jobId);
			if (!progress) {
				throw new MatcherError('host-failed', 'Matcher progress owner disappeared before terminal assembly.');
			}
			if (executor.partitionCount !== progress.partitions.length) {
				throw new MatcherError(
					'host-failed',
					`Matcher completed ${executor.partitionCount} partitions but background retained ${progress.partitions.length}.`,
				);
			}

			const pipeline = createMatcherPipelineResult({
				batch: input.batch,
				registry: input.registry.technologies,
				relationshipGraph: input.registry.relationshipGraph,
				partitions: progress.partitions,
				analyzedAt: executor.completedAt,
				source: 'fresh',
			});
			const result: MatcherJobRunResult = {
				job: executor.job,
				mode: executor.mode,
				result: pipeline,
				partitions: progress.partitions,
				executor: executor.executor,
				completedAt: executor.completedAt,
			};
			logBackgroundEvent('matcher-job-matched', {
				...summarizeTab(input.tab),
				jobId: input.job.jobId,
				mode: input.mode,
				refreshKind: input.details.refreshKind,
				executor: result.executor,
				partitionCount: result.partitions.length,
				resultCount: result.result.analysis.results.length,
				timingTraceId: input.timingTraceId,
			});
			return result;
		} catch (error) {
			if (error instanceof MatcherError && error.reason === 'canceled') throw error;
			if (signal.aborted) throw signal.reason;
			await updateMatcherJobRecord(input.job, {
				status: 'failed',
				reason: getMatcherFailureReason(error),
				errorMessage: error instanceof Error ? error.message : String(error),
			});
			throw error;
		}
	}

	/** Await host cleanup and the ordinary durable transition when a caller owns the Promise. */
	async function cancelMatcherJob(
		job: Pick<MatcherJobRecord, 'jobId' | 'incognito'>,
		reason: MatcherCancellationReason,
	): Promise<void> {
		await dependencies.matcher.cancelJob(job.jobId);
		await updateMatcherJobRecord(job, { status: 'canceled', reason });
	}

	/** Request cleanup after synchronous ownership revocation without losing a rejected Promise. */
	function requestMatcherCancellation(
		job: Pick<MatcherJobRecord, 'jobId' | 'tabId' | 'incognito'>,
		reason: MatcherCancellationReason,
	): void {
		void cancelMatcherJob(job, reason).catch((error: unknown) => {
			logBackgroundEvent('matcher-job-cancel-failed', {
				jobId: job.jobId,
				tabId: job.tabId,
				reason,
				errorType: error instanceof Error ? 'Error' : typeof error,
			});
		});
	}

	return { runMatcher, cancelMatcherJob, requestMatcherCancellation };
}
