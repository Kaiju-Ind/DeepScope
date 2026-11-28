import { createMatcherPipelineResult, type MatcherJobState, type MatcherPartitionProgress } from "../../matcher/index.ts";

import * as revision from '../revision.ts';

import { createDetectionStorageHash } from "../../storage/contracts.ts";
import type { BackgroundRuntimeDependencies, VisibleSessionId, MatcherCancellationReason, ActiveMatcherProgressContext } from './types.ts';
import { summarizeTab, createAnalysisOutput, createObservationSessionTarget, createDetectionSessionKeyForOutput, createPendingSiteAnalysis } from './output.ts';

import type { Type as JobsExecute } from './jobs/execute.ts';
import type { Type as Publish } from './publish.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
	readonly persistence: Pick<BackgroundRuntimeDependencies['persistence'], 'getLatestSessionSnapshot' | 'updateMatcherJob'>;
	readonly requestMatcherCancellation: JobsExecute['requestMatcherCancellation'];
	readonly savePanelSnapshot: Publish['savePanelSnapshot'];
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly isMatcherCurrent: (jobId: string, context: ActiveMatcherProgressContext) => boolean;
	readonly cancelSupersededTabMatchers: (tabId: number, visibleSessionId: VisibleSessionId, jobId: string) => void;
	readonly retireVisibleSessionOwnership: (tabId: number, sessionId: string, expectedUrl: string) => void;
	readonly updateMatcherState: (state: MatcherJobState) => Promise<void>;
	readonly updatePartitionProgress: (progress: MatcherPartitionProgress) => Promise<void>;
	readonly getMatcherProgress: (jobId: string) => ActiveMatcherProgressContext | undefined;
	readonly registerMatcherProgress: (jobId: string, context: ActiveMatcherProgressContext) => void;
	readonly releaseMatcherProgress: (jobId: string) => void;
	readonly getVisibleSessionOwner: (sessionId: VisibleSessionId) => string | undefined;
	readonly setVisibleSessionOwner: (sessionId: VisibleSessionId, jobId: string) => void;
	readonly hasMatcherProgress: (tabId: number) => boolean;
	readonly forgetMatcherProgress: (tabId: number, reason: MatcherCancellationReason) => void;
}

/** Create one progress owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const { requestMatcherCancellation, savePanelSnapshot } = dependencies;

	const { getLatestSessionSnapshot: getLatestDetectionSessionSnapshot, updateMatcherJob: updateMatcherJobRecord } = dependencies.persistence;

	const logBackgroundEvent = dependencies.logEvent;

	/** Latest matcher job created for each visible page session while the background is alive. */
	const latestMatcherJobByVisibleSession = new Map<VisibleSessionId, string>();

	/** Matcher jobs currently able to publish real incremental side-panel revisions. */
	const activeMatcherProgressByJob = new Map<string, ActiveMatcherProgressContext>();

	/** Check the exact registered progress owner and its visible-session generation. */
	function isMatcherCurrent(jobId: string, context: ActiveMatcherProgressContext): boolean {
		if (activeMatcherProgressByJob.get(jobId) !== context) return false;
		const newestJobId = latestMatcherJobByVisibleSession.get(context.visibleSessionId);
		return newestJobId === undefined || newestJobId === context.visibleSessionOwnerJobId;
	}

	/** Cancel matcher work and retire session keys superseded by a new complete analysis for one tab. */
	function cancelSupersededTabMatchers(tabId: number, visibleSessionId: VisibleSessionId, jobId: string): void {
		for (const [activeJobId, context] of activeMatcherProgressByJob) {
			if (context.tab.id !== tabId || activeJobId === jobId) continue;
			activeMatcherProgressByJob.delete(activeJobId);
			requestMatcherCancellation({ jobId: activeJobId, tabId: context.tab.id, incognito: context.tab.incognito }, 'newer-job');
		}

		const tabPrefix = `${tabId}:`;
		for (const sessionId of latestMatcherJobByVisibleSession.keys()) {
			if (sessionId !== visibleSessionId && sessionId.startsWith(tabPrefix)) {
				latestMatcherJobByVisibleSession.delete(sessionId);
			}
		}
	}

	/** Retire matcher freshness state when one live observation session is explicitly stopped. */
	function retireVisibleSessionOwnership(tabId: number, sessionId: string, expectedUrl: string): void {
		const urlHash = createDetectionStorageHash(expectedUrl);
		latestMatcherJobByVisibleSession.delete(`${tabId}:0:${sessionId}:${urlHash}`);
	}

	/**
	 * Project offscreen scheduler state into one lightweight side-panel revision.
	 *
	 * Queue messages intentionally preserve the newest detector analysis already
	 * stored for the page instead of replacing it with an empty analysis. The new
	 * revision changes only matcher progress, so a user can keep reading previous
	 * detections while the next evidence job waits for capacity.
	 */
	async function updateMatcherState(state: MatcherJobState): Promise<void> {
		const context = activeMatcherProgressByJob.get(state.jobId);
		if (!context || context.tab.incognito) return;
		/** Read the live job/context claim after every asynchronous boundary before publishing visible state. */
		const ownsPublication = () => isMatcherCurrent(state.jobId, context);
		if (!ownsPublication()) return;

		context.matcherExecutor = state.executor;
		await updateMatcherJobRecord({ jobId: state.jobId, incognito: context.tab.incognito }, {
			status: state.phase === 'queued' ? 'queued' : 'running',
			...(state.partitionCount === undefined ? {} : { partitionCount: state.partitionCount }),
			completedPartitionCount: 0,
		});
		if (!ownsPublication()) return;
		logBackgroundEvent(`matcher-job-${state.phase}`, {
			...summarizeTab(context.tab),
			jobId: state.jobId,
			mode: context.matcherMode,
			queuePosition: state.queuePosition,
			queueDepth: state.queueDepth,
			partitionCount: state.partitionCount,
			queuedAt: state.queuedAt,
			startedAt: state.startedAt,
			...(state.startedAt === undefined ? {} : { queueWaitMs: Math.max(0, state.startedAt - state.queuedAt) }),
		});

		const pending = createAnalysisOutput(
			createPendingSiteAnalysis(context.tab),
			context.snapshotStatus,
			context.session,
			undefined,
			undefined,
			createObservationSessionTarget(context.tab, context.session),
		);
		const key = createDetectionSessionKeyForOutput(context.tab, pending);
		const existing = await getLatestDetectionSessionSnapshot(key);
		if (!ownsPublication()) return;
		const analysis = existing?.analysis ?? pending.analysis;
		const output = createAnalysisOutput(
			analysis,
			context.snapshotStatus,
			context.session,
			undefined,
			undefined,
			createObservationSessionTarget(context.tab, context.session),
		);
		await savePanelSnapshot(context.tab, output, 'background', context.matcherExecutor, {
			jobId: state.jobId,
			mode: context.matcherMode,
			phase: state.phase === 'queued' ? 'queued' : 'matching',
			queuedAt: state.queuedAt,
			...(state.startedAt === undefined ? {} : { startedAt: state.startedAt }),
			...(state.queuePosition === undefined ? {} : { queuePosition: state.queuePosition }),
			queueDepth: state.queueDepth,
			completedPartitionCount: 0,
			partitionCount: state.partitionCount ?? 0,
			resultCount: analysis.results.length,
			updatedAt: Date.now(),
		}, context.evidence, ownsPublication);
	}

	/** Accumulate partitions for all jobs, skip private persistence and publish coalesced visible revisions only while ownership remains current. */
	async function updatePartitionProgress(
		progress: MatcherPartitionProgress,
	): Promise<void> {
		const jobId = progress.partition.job.jobId;
		const context = activeMatcherProgressByJob.get(jobId);
		if (!context) return;

		/** Read the live job/context claim after every asynchronous boundary before publishing visible state. */
		const ownsPublication = () => isMatcherCurrent(jobId, context);
		if (!ownsPublication()) return;

		// The background accumulator is the only copy of completed partitions that
		// terminal assembly reads, so private jobs must record them too. Only the
		// durable record and panel snapshot below are skipped for private tabs.
		const previousIndex = context.partitions.findIndex((partition) => partition.partitionId === progress.partition.partitionId);
		if (previousIndex >= 0) {
			context.partitions[previousIndex] = progress.partition;
		} else {
			context.partitions.push(progress.partition);
		}
		if (context.tab.incognito) return;

		await updateMatcherJobRecord({ jobId, incognito: context.tab.incognito }, {
			status: 'streaming',
			partitionCount: progress.partitionCount,
			completedPartitionCount: progress.completedPartitionCount,
		});
		if (!ownsPublication()) return;
		logBackgroundEvent('matcher-partition-complete', {
			...summarizeTab(context.tab),
			jobId,
			mode: context.matcherMode,
			kind: progress.partition.kind,
			partitionId: progress.partition.partitionId,
			observationCount: progress.partition.observationCount,
			matchCount: progress.partition.matches.length,
			candidateRuleCount: progress.partition.diagnostics.candidateRuleCount,
			completedPartitionCount: progress.completedPartitionCount,
			partitionCount: progress.partitionCount,
		});

		if (context.partitions.length === 0) {
			return;
		}

		const partial = createMatcherPipelineResult({
			batch: context.batch,
			registry: context.compiledRegistryArtifact.technologies,
			relationshipGraph: context.compiledRegistryArtifact.relationshipGraph,
			partitions: context.partitions,
			analyzedAt: Date.now(),
			source: 'fresh',
		});
		const now = Date.now();
		const isFinalPartition = progress.completedPartitionCount >= progress.partitionCount;
		const resultDelta = Math.max(0, partial.analysis.results.length - context.lastVisibleResultCount);
		const elapsedSinceVisibleRevision = now - context.lastVisibleRevisionAt;
		if (!revision.shouldPublish({ final: isFinalPartition, previousAt: context.lastVisibleRevisionAt, now })) {
			logBackgroundEvent('matcher-partition-revision-coalesced', {
				...summarizeTab(context.tab),
				jobId,
				resultCount: partial.analysis.results.length,
				resultDelta,
				elapsedSinceVisibleRevision,
			});
			return;
		}

		const output = createAnalysisOutput(
			partial.analysis,
			context.snapshotStatus,
			context.session,
			undefined,
			undefined,
			createObservationSessionTarget(context.tab, context.session),
		);
		await savePanelSnapshot(context.tab, output, 'background', context.matcherExecutor ?? 'unknown', {
			jobId,
			mode: context.matcherMode,
			phase: 'matching',
			completedPartitionCount: progress.completedPartitionCount,
			partitionCount: progress.partitionCount,
			latestPartitionKind: progress.partition.kind,
			latestPartitionObservationCount: progress.partition.observationCount,
			latestPartitionMatchCount: progress.partition.matches.length,
			resultCount: partial.analysis.results.length,
			updatedAt: now,
		}, context.evidence, ownsPublication);
		if (!ownsPublication()) return;
		context.lastVisibleRevisionAt = now;
		context.lastVisibleResultCount = partial.analysis.results.length;
	}

	/** Read the accumulator while a matcher owns publication rights. */
	function getMatcherProgress(jobId: string): ActiveMatcherProgressContext | undefined { return activeMatcherProgressByJob.get(jobId); }

	/** Retain one job's batch only until its matching flow settles. */
	function registerMatcherProgress(jobId: string, context: ActiveMatcherProgressContext): void { activeMatcherProgressByJob.set(jobId, context); }

	/** Drop registry-scale state on every matcher completion or failure path. */
	function releaseMatcherProgress(jobId: string): void { activeMatcherProgressByJob.delete(jobId); }

	/** Return the current complete-analysis generation for this exact session. */
	function getVisibleSessionOwner(sessionId: VisibleSessionId): string | undefined { return latestMatcherJobByVisibleSession.get(sessionId); }

	/** Publish a complete-analysis generation after its durable job record exists. */
	function setVisibleSessionOwner(sessionId: VisibleSessionId, jobId: string): void { latestMatcherJobByVisibleSession.set(sessionId, jobId); }

	/** Whether a registered matcher can still publish for the tab. */
	function hasMatcherProgress(tabId: number): boolean {
		for (const context of activeMatcherProgressByJob.values()) if (context.tab.id === tabId) return true;
		return false;
	}

	/** Revoke active jobs before retiring every visible-session generation for a closed or navigated tab. */
	function forgetMatcherProgress(tabId: number, reason: MatcherCancellationReason): void {
		for (const [jobId, context] of activeMatcherProgressByJob) {
			if (context.tab.id === tabId) {
				activeMatcherProgressByJob.delete(jobId);
				requestMatcherCancellation({ jobId, tabId, incognito: context.tab.incognito }, reason);
			}
		}
		const tabPrefix = `${tabId}:`;
		for (const [visibleSessionId] of latestMatcherJobByVisibleSession) {
			if (visibleSessionId.startsWith(tabPrefix)) latestMatcherJobByVisibleSession.delete(visibleSessionId);
		}
	}

	return { isMatcherCurrent, cancelSupersededTabMatchers, retireVisibleSessionOwnership, updateMatcherState, updatePartitionProgress, getMatcherProgress, registerMatcherProgress, releaseMatcherProgress, getVisibleSessionOwner, setVisibleSessionOwner, hasMatcherProgress, forgetMatcherProgress };
}
