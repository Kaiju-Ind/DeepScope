import { DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION } from "../../storage/session.ts";
import type * as observe from '../../content/observe/index.ts';

import type { DetectionEvidenceState, DetectionSessionSnapshot, DetectionSessionSnapshotSource } from "../../storage/session.ts";

import type { SiteAnalysis } from "@deepscope/detection/types";

import { timeAsyncSpan, type TimingContext } from "../../diagnostics/timing.ts";
import type { VisibleTabIdentity, AnalyzeVisibleTabOutput } from "../../messaging/index.ts";

import * as replay from '@deepscope/detection/pipeline/replay';

import * as fence from '../../../utils/fence.ts';

import { createDetectionStorageHash } from "../../storage/contracts.ts";
import type { BackgroundRuntimeDependencies, InspectableTab } from './types.ts';
import { getFinding, summarizeTab, createVisibleTabIdentity, createAnalysisOutput, createObservationSessionTarget, getSnapshotQueueKey, classifySnapshotWriteRejection, shouldAttachReplaySummaryToSnapshot, createDetectionSessionKeyForOutput, getDetectionSnapshotStatus, toDetectionEnrichmentState, getReplayTraceForAnalysis, getReplayHistoryForAnalysis, createPendingSiteAnalysis } from './output.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly setBadge: BackgroundRuntimeDependencies['setBadge'];
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
	readonly persistence: Pick<BackgroundRuntimeDependencies['persistence'], 'getBestVisibleSnapshot' | 'getReplayTrace' | 'getReplayHistory' | 'getLatestSessionSnapshot' | 'saveSnapshot'>;
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly getLatestVisibleDetectionSnapshot: (target: VisibleTabIdentity, timingContext: TimingContext, spanName: string) => Promise<DetectionSessionSnapshot | null>;
	readonly savePanelSnapshot: (tab: InspectableTab, output: AnalyzeVisibleTabOutput, source: DetectionSessionSnapshotSource, matcherExecutor?: DetectionSessionSnapshot['matcherExecutor'], matcherProgress?: DetectionSessionSnapshot['matcherProgress'], evidence?: DetectionEvidenceState, ownsPublication?: () => boolean) => Promise<void>;
	readonly createQueuedAnalysisOutput: (tab: InspectableTab, snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'], session?: observe.StateType, timingTraceId?: string) => Promise<AnalyzeVisibleTabOutput>;
}

/** Create one publish owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const { getBestVisibleSnapshot: getBestVisibleDetectionSessionSnapshot, getReplayTrace: getCachedReplayTrace, getReplayHistory: getCachedReplayTraceHistory, getLatestSessionSnapshot: getLatestDetectionSessionSnapshot, saveSnapshot: saveDetectionSessionSnapshot } = dependencies.persistence;

	const logBackgroundEvent = dependencies.logEvent;

	/** Background snapshot writes are serialized per exact visible session. */
	const snapshotWrites = fence.create<string>();

	/** Read the best cached visible result and restore its badge only when its URL exactly matches the target. */
	async function getLatestVisibleDetectionSnapshot(
		target: VisibleTabIdentity,
		timingContext: TimingContext,
		spanName: string,
	): Promise<DetectionSessionSnapshot | null> {
		const snapshot = await timeAsyncSpan(
			spanName,
			timingContext,
			() => getBestVisibleDetectionSessionSnapshot(target),
			(value) => ({ snapshotHit: Boolean(value), revision: value?.revision, detectionCount: value?.detectionCount }),
		);
		if (!snapshot) {
			logBackgroundEvent('visible-snapshot-miss', {
				tabId: target.tabId,
				hostname: target.hostname,
				reason: 'no-exact-session-or-matching-origin-snapshot',
				targetUrlHash: target.urlHash,
			});
		} else if (snapshot.urlHash === target.urlHash) {
			// A stored result for this exact URL restores the badge after navigation
			// cleared it. A same-site fallback snapshot describes another page, so its
			// count would be wrong here.
			void dependencies.setBadge(target.tabId, snapshot.analysis.results.length, getFinding(snapshot.analysis));
		}

		return snapshot;
	}

	/**
	 * Persist the analysis response as the side panel's storage update stream.
	 *
	 * Snapshots are the durable channel that lets an open side panel update without a
	 * polling loop and lets a reopened side panel recover state after background shutdown.
	 * Matcher callbacks test ownership again immediately before starting the storage write.
	 */
	async function savePanelSnapshot(
		tab: InspectableTab,
		output: AnalyzeVisibleTabOutput,
		source: DetectionSessionSnapshotSource,
		matcherExecutor: DetectionSessionSnapshot['matcherExecutor'] = 'unknown',
		matcherProgress?: DetectionSessionSnapshot['matcherProgress'],
		evidence?: DetectionEvidenceState,
		ownsPublication?: () => boolean,
	): Promise<void> {
		if (tab.incognito) {
			// Private results are never stored, but the badge lives only in browser
			// memory for this tab, so it still follows each published revision.
			if (ownsPublication?.() !== false) publishBadge(tab, output.analysis);
			return;
		}

		const key = createDetectionSessionKeyForOutput(tab, output);
		await snapshotWrites.run(getSnapshotQueueKey(key), async () => {
			// A matcher can lose ownership while this revision waits in the write queue.
			if (ownsPublication?.() === false) return;
			const existing = await getLatestDetectionSessionSnapshot(key);
			if (ownsPublication?.() === false) return;
			const replaySummary = shouldAttachReplaySummaryToSnapshot(output)
				? replay.summarize(output.replayTrace)
				: undefined;
			const snapshot: DetectionSessionSnapshot = {
				key,
				schemaVersion: DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION,
				revision: (existing?.revision ?? 0) + 1,
				urlHash: createDetectionStorageHash(output.analysis.url),
				hostname: output.analysis.hostname,
				status: getDetectionSnapshotStatus(output),
				source,
				updatedAt: Date.now(),
				detectionCount: output.analysis.results.length,
				...(evidence ? { evidence } : {}),
				analysis: output.analysis,
				enrichment: toDetectionEnrichmentState(output.enrichment),
				matcherExecutor,
				...(matcherProgress ? { matcherProgress } : {}),
				...(replaySummary ? { replaySummary } : {}),
			};

			const writeResult = await saveDetectionSessionSnapshot(snapshot);
			if (writeResult.accepted && ownsPublication?.() !== false) publishBadge(tab, writeResult.snapshot.analysis);
			if (!writeResult.accepted) {
				logBackgroundEvent('snapshot-write-rejected', {
					...summarizeTab(tab),
					reason: classifySnapshotWriteRejection(snapshot, writeResult.snapshot),
					revision: snapshot.revision,
					rejectedByRevision: writeResult.rejectedByRevision ?? 0,
					resultCount: snapshot.analysis.results.length,
					storedResultCount: writeResult.snapshot.analysis.results.length,
					status: snapshot.status,
					source,
				});
			}
		});
	}

	/**
	 * Show one published result on the tab's toolbar button.
	 *
	 * Called only for a revision that was just published and is still owned by
	 * its document, so the badge always matches what the panel can show. The
	 * background's badge writer orders the browser calls for each tab.
	 */
	function publishBadge(tab: InspectableTab, analysis: SiteAnalysis): void {
		void dependencies.setBadge(tab.id, analysis.results.length, getFinding(analysis));
	}

	/**
	 * Return the best immediate response before CPU-bound matcher work finishes.
	 *
	 * Active-tab commands should start collection and matching, then return the last
	 * durable detector output instead of blocking the side panel for a full matcher job.
	 * Storage revisions from the queued matcher job become the receive stream that
	 * moves the side panel from cached output to newer partial and final detections.
	 */
	async function createQueuedAnalysisOutput(
		tab: InspectableTab,
		snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'],
		session?: observe.StateType,
		timingTraceId?: string,
	): Promise<AnalyzeVisibleTabOutput> {
		const timingContext: TimingContext = {
			traceId: timingTraceId,
			surface: 'background',
			incognito: tab.incognito,
			details: summarizeTab(tab),
		};
		const target = createVisibleTabIdentity(tab);
		const snapshot = tab.incognito
			? null
			: await getLatestVisibleDetectionSnapshot(
				target,
				timingContext,
				'storage.get-visible-snapshot-for-queued-response',
			);
		const analysis = snapshot?.analysis ?? createPendingSiteAnalysis(tab);
		const replayTrace = snapshot && !tab.incognito
			? await timeAsyncSpan(
				'storage.get-cached-replay-trace-for-queued-response',
				timingContext,
				() => getCachedReplayTrace(snapshot.analysis.url),
				(value) => ({ replayTraceHit: Boolean(value) }),
			)
			: null;
		const replayHistory = snapshot && !tab.incognito
			? await timeAsyncSpan(
				'storage.get-replay-history-for-queued-response',
				timingContext,
				() => getCachedReplayTraceHistory(snapshot.analysis.url),
				(value) => ({ replayHistoryCount: value.length }),
			)
			: [];

		return createAnalysisOutput(
			analysis,
			snapshot ? 'hit' : snapshotStatus,
			session,
			getReplayTraceForAnalysis(replayTrace, analysis),
			getReplayHistoryForAnalysis(replayHistory, analysis),
			createObservationSessionTarget(tab, session),
			{ status: 'pending' },
			snapshot?.evidence,
		);
	}

	return { getLatestVisibleDetectionSnapshot, savePanelSnapshot, createQueuedAnalysisOutput };
}
