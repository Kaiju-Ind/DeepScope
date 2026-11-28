import type { MatcherProgressType, DetectionSessionSnapshot } from "../../lib/storage/session.ts";

/** Detector work lane shown by the side panel. */
export type MatcherStatus = 'idle' | 'collecting' | 'queued' | 'matching' | 'recording';

/** Matcher progress counters safe for side panel display. */
export type MatcherProgress = Pick<
	MatcherProgressType,
	'phase' | 'queuePosition' | 'queueDepth' | 'completedPartitionCount' | 'partitionCount' | 'latestPartitionKind' | 'resultCount'
>;

/** Visual progress that can be rendered without interpreting matcher internals. */
export type AnalysisProgress =
	| { readonly kind: 'idle' }
	| { readonly kind: 'indeterminate' }
	| {
		readonly kind: 'determinate';
		readonly completed: number;
		readonly total: number;
		readonly percent: number;
	};

/** User-facing progress state for visible-tab analysis work. */
export type AnalysisActivity = {
	/** Whether the side panel should render active progress affordances. */
	readonly busy: boolean;
	/** Compact label used in metrics. */
	readonly label: string;
	/** Headline used beside the progress indicator. */
	readonly headline: string;
	/** Short explanatory copy used near progress affordances. */
	readonly description: string;
	/** Determinate progress when matcher partitions are known, otherwise an indeterminate state. */
	readonly progress: AnalysisProgress;
};

/** Whether matcher work is active enough to deserve visible progress UI. */
export function isMatcherBusy(status: MatcherStatus): boolean {
	return status === 'collecting' || status === 'queued' || status === 'matching' || status === 'recording';
}

/** Returns the compact matcher label for side panel metrics. */
export function getMatcherStatusLabel(status: MatcherStatus, progress?: MatcherProgress): string {
	if (status === 'collecting') return 'collecting page signals';
	if (status === 'queued') {
		if (progress?.queuePosition && progress.queueDepth) return `waiting for matcher ${progress.queuePosition}/${progress.queueDepth}`;
		return 'waiting for matcher';
	}
	if (status === 'matching') {
		if (progress && progress.partitionCount > 0) {
			const completed = Math.min(progress.completedPartitionCount, progress.partitionCount);
			return `matching evidence ${completed}/${progress.partitionCount}`;
		}
		return 'matching evidence';
	}
	if (status === 'recording') return 'recording replay';
	return 'idle';
}

/** User-facing headline for the current matcher lane. */
export function getMatcherActivityHeadline(status: MatcherStatus): string {
	if (status === 'collecting') return 'Collecting page signals';
	if (status === 'queued') return 'Waiting for matcher capacity';
	if (status === 'matching') return 'Matching evidence batches';
	if (status === 'recording') return 'Recording replay trace';
	return 'Analysis complete';
}

/** Short progress copy used near the animated activity indicator. */
export function getMatcherActivityDescription(status: MatcherStatus, progress?: MatcherProgress): string {
	if (status === 'collecting') {
		return 'Reading DOM, resource, metadata, and page-surface signals before worker matching starts.';
	}

	if (status === 'queued') {
		if (progress?.queuePosition && progress.queueDepth) {
			return `This analysis is ${progress.queuePosition} of ${progress.queueDepth} waiting jobs. Existing detections stay visible while capacity frees up.`;
		}
		return 'This analysis is waiting for the offscreen matcher. Existing detections stay visible while capacity frees up.';
	}

	if (status === 'matching') {
		if (progress && progress.partitionCount > 0) {
			const completed = Math.min(progress.completedPartitionCount, progress.partitionCount);
			const surface = progress.latestPartitionKind ? ` Latest surface: ${progress.latestPartitionKind}.` : '';
			return `Matched ${completed} of ${progress.partitionCount} evidence batches.${surface} The count can still climb as stronger evidence arrives.`;
		}
		return 'Worker batches are resolving detections. The count may climb as stronger evidence arrives.';
	}

	if (status === 'recording') {
		return 'Final detector output is being written so replay history and explanations can reopen later.';
	}

	return 'The latest detector snapshot is ready.';
}

/** Return normalized determinate matcher progress when partition counts are known. */
export function getMatcherProgress(
	status: MatcherStatus,
	progress?: MatcherProgress,
): AnalysisProgress {
	if (status !== 'matching' || !progress || progress.partitionCount < 1) {
		return { kind: status === 'idle' ? 'idle' : 'indeterminate' };
	}

	const total = progress.partitionCount;
	const completed = Math.min(Math.max(progress.completedPartitionCount, 0), total);
	return {
		kind: 'determinate',
		completed,
		total,
		percent: Math.round((completed / total) * 100),
	};
}

/**
 * Derives visible side panel progress from command, tab-switch, and matcher lanes.
 *
 * A queued visible tab wins over matcher status because any in-flight matcher may
 * still belong to the previous tab. The side panel should describe the tab the user is
 * currently looking at, not a stale request that is only blocking the queue.
 */
export function getAnalysisActivity(input: {
	readonly matcherStatus: MatcherStatus;
	readonly workflowBusy: boolean;
	readonly analysisRequestInFlight: boolean;
	readonly queuedVisibleAnalysis: boolean;
	readonly matcherProgress?: MatcherProgress;
}): AnalysisActivity {
	if (input.queuedVisibleAnalysis) {
		return {
			busy: true,
			label: 'queued for this tab',
			headline: 'Waiting to scan this tab',
			description: 'The visible tab changed while another scan was finishing. This tab will start next.',
			progress: { kind: 'indeterminate' },
		};
	}

	if (isMatcherBusy(input.matcherStatus)) {
		return {
			busy: true,
			label: getMatcherStatusLabel(input.matcherStatus, input.matcherProgress),
			headline: getMatcherActivityHeadline(input.matcherStatus),
			description: getMatcherActivityDescription(input.matcherStatus, input.matcherProgress),
			progress: getMatcherProgress(input.matcherStatus, input.matcherProgress),
		};
	}

	if (input.analysisRequestInFlight) {
		return {
			busy: true,
			label: 'loading current tab',
			headline: 'Loading latest detections',
			description: 'The side panel is waiting for the active tab scan to publish its first detector revision.',
			progress: { kind: 'indeterminate' },
		};
	}

	if (input.workflowBusy) {
		return {
			busy: true,
			label: 'preparing current tab',
			headline: 'Preparing active tab',
			description: 'Stored detections and live session state are being loaded for the visible tab.',
			progress: { kind: 'indeterminate' },
		};
	}

	return {
		busy: false,
		label: 'complete',
		headline: 'Analysis complete',
		description: 'The latest detector snapshot is ready.',
		progress: { kind: 'idle' },
	};
}

/**
 * Derives the matcher lane from a storage snapshot revision.
 *
 * Partition-progress snapshots can carry `status: complete` before the final
 * replay-backed write lands. A background snapshot is only truly idle when it is
 * cached or has the replay summary that proves the current matcher run finished.
 */
export function getMatcherStatusFromSnapshot(
	snapshot: DetectionSessionSnapshot,
): MatcherStatus | null {
	if (
		snapshot.matcherProgress &&
		(!snapshot.replaySummary || snapshot.matcherProgress.updatedAt >= snapshot.replaySummary.analyzedAt)
	) {
		return snapshot.matcherProgress.phase;
	}

	if (snapshot.enrichment.status === 'pending') {
		return 'matching';
	}

	if (snapshot.source === 'cache' || snapshot.status === 'cached') {
		return 'idle';
	}

	if (snapshot.source !== 'background') {
		return null;
	}

	if (snapshot.replaySummary) {
		return 'idle';
	}

	if (snapshot.status === 'failed' || snapshot.status === 'stale' || snapshot.status === 'stopped') {
		return 'idle';
	}

	return 'matching';
}
