import type { SiteAnalysis } from "@deepscope/detection/types";
import { createDetectionReplayTrace } from "@deepscope/detection/pipeline";

import { timeAsyncSpan, timeSyncSpan } from "../../../diagnostics/timing.ts";
import type { AnalyzeVisibleTabOutput, ObservationSessionTarget } from "../../../messaging/index.ts";

import type { BackgroundRuntimeDependencies, MatcherSaveType } from '../types.ts';
import { summarizeTab, createAnalysisOutput, createObservationSessionTarget, getReplayTraceForAnalysis, getReplayHistoryForAnalysis, shouldStoreReplay } from '../output.ts';

import type { Type as Publish } from '../publish.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
	readonly logAnalysisSummary: BackgroundRuntimeDependencies['logAnalysisSummary'];
	readonly persistence: Pick<BackgroundRuntimeDependencies['persistence'], 'getReplayHistory' | 'saveReplayTrace' | 'updateMatcherJob'>;
	readonly savePanelSnapshot: Publish['savePanelSnapshot'];
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly saveMatcher: (input: MatcherSaveType) => Promise<AnalyzeVisibleTabOutput | undefined>;
}

/** Create one jobs record owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const { savePanelSnapshot } = dependencies;

	const { getReplayHistory: getCachedReplayTraceHistory, saveReplayTrace, updateMatcherJob: updateMatcherJobRecord } = dependencies.persistence;

	const logBackgroundEvent = dependencies.logEvent;

	const logAnalysisSummary = dependencies.logAnalysisSummary;

	/** Persist replay and final side-panel state after matcher computation has completed. */
	async function saveMatcher(input: MatcherSaveType): Promise<AnalyzeVisibleTabOutput | undefined> {
		const pipelineResult = input.result.result;
		const analysis = timeSyncSpan(
			'analysis.normalize-fresh-output',
			input.timingContext,
			() => Object.assign({}, pipelineResult.analysis, { source: 'fresh' as const }),
			(value) => ({ resultCount: value.results.length, incognito: input.tab.incognito }),
		);
		const sessionTarget = createObservationSessionTarget(input.tab, input.session);

		try {
			await saveRecording(input, analysis, sessionTarget);
			if (!input.ownsPublication()) return;
			const replayTrace = timeSyncSpan(
				'pipeline.create-replay-trace',
				input.timingContext,
				() => createDetectionReplayTrace({ result: pipelineResult, runId: input.job.jobId }),
				(trace) => ({ eventCount: trace.events.length }),
			);
			const shouldStoreReplayTrace = shouldStoreReplay(input.details);
			const savedReplayTrace = shouldStoreReplayTrace
				? await timeAsyncSpan(
					'storage.save-replay-trace',
					input.timingContext,
					async () => input.tab.incognito ? replayTrace : await saveReplayTrace(replayTrace),
					() => ({ incognito: input.tab.incognito, stored: true }),
				)
				: replayTrace;
			if (!input.ownsPublication()) return;
			const replayHistory = await timeAsyncSpan(
				'storage.get-replay-history',
				input.timingContext,
				async () => input.tab.incognito ? [] : await getCachedReplayTraceHistory(input.tab.url),
				(history) => ({
					replayHistoryCount: history.length,
					incognito: input.tab.incognito,
					storedCurrentRun: shouldStoreReplayTrace,
				}),
			);
			if (!input.ownsPublication()) return;

			if (!input.tab.incognito) logAnalysisSummary(analysis);
			// The toolbar badge follows the snapshot published just below.
			logBackgroundEvent('analysis-event-complete', {
				...summarizeTab(input.tab),
				snapshotStatus: input.snapshotStatus,
				resultCount: analysis.results.length,
				observationCount: input.observationCount,
				eventCount: pipelineResult.events.length,
				sessionStatus: input.session?.status ?? 'none',
				timingTraceId: input.timingTraceId,
				...input.details,
			});

			const output = createAnalysisOutput(
				analysis,
				input.snapshotStatus,
				input.session,
				getReplayTraceForAnalysis(savedReplayTrace, analysis),
				getReplayHistoryForAnalysis(replayHistory, analysis),
				sessionTarget,
				input.enrichment,
				input.evidence,
			);
			await savePanelSnapshot(
				input.tab,
				output,
				'background',
				input.result.executor,
				undefined,
				input.evidence,
				input.ownsPublication,
			);
			if (!input.ownsPublication()) return;
			await updateMatcherJobRecord(input.job, {
				status: 'completed',
				reason: 'completed',
				partitionCount: input.result.partitions.length,
				completedPartitionCount: input.result.partitions.length,
			});
			if (!input.ownsPublication()) return;
			logBackgroundEvent('matcher-job-complete', {
				...summarizeTab(input.tab),
				jobId: input.job.jobId,
				mode: input.mode,
				executor: input.result.executor,
				partitionCount: input.result.partitions.length,
				resultCount: analysis.results.length,
				timingTraceId: input.timingTraceId,
			});
			return output;
		} catch (error) {
			if (input.ownsPublication()) {
				await updateMatcherJobRecord(input.job, {
					status: 'failed',
					reason: 'persistence-failed',
					errorMessage: error instanceof Error ? error.message : String(error),
				});
			}
			throw error;
		}
	}

	/** Publish the final matcher output as a visible recording stage before storage work. */
	async function saveRecording(
		input: MatcherSaveType,
		analysis: SiteAnalysis,
		sessionTarget: ObservationSessionTarget | undefined,
	): Promise<void> {
		await updateMatcherJobRecord(input.job, {
			status: 'recording',
			partitionCount: input.result.partitions.length,
			completedPartitionCount: input.result.partitions.length,
		});
		if (!input.ownsPublication()) return;
		const output = createAnalysisOutput(
			analysis,
			input.snapshotStatus,
			input.session,
			undefined,
			undefined,
			sessionTarget,
			input.enrichment,
			input.evidence,
		);
		await savePanelSnapshot(input.tab, output, 'background', input.result.executor, {
			jobId: input.job.jobId,
			mode: input.mode,
			phase: 'recording',
			completedPartitionCount: input.result.partitions.length,
			partitionCount: input.result.partitions.length,
			resultCount: analysis.results.length,
			updatedAt: Date.now(),
		}, input.evidence, input.ownsPublication);
	}

	return { saveMatcher };
}
