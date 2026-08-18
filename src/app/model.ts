import { categories } from '@/registry/categories.ts';
import type { ObservationSessionState } from '@/lib/content/observed-page-signals.ts';
import type {
	AnalysisEnrichmentState,
	AnalyzeVisibleTabOutput,
	ObservationSessionTarget,
	SnapshotReuseStatus,
} from '@/lib/messaging/analysis';
import type {
	DetectionReplaySummary,
	DetectionEvidenceState,
	DetectionMatcherProgressSummary,
	DetectionSessionSnapshotSource,
	DetectionSessionStatus,
	DetectionSessionSnapshot,
} from '@/lib/storage/session';
import type { CategoryId, ConfidenceScore, DetectionResult, SiteAnalysis } from '@/lib/detection/types';
import {
	filterReplayHistoryForAnalysis,
	isDetectionReplayTraceForAnalysis,
	type DetectionExplanation,
	type DetectionExplanationEvidenceSummary,
	type DetectionReplayTrace,
} from '@/lib/pipeline';
import type { ExtensionError } from '@/lib/messaging/failure';

/**
 * Panel observation states that are meaningful to the user interface.
 *
 * These values intentionally hide the lower-level content-session statuses. The
 * side panel only needs to know whether page watching is active, stopped, idle, or
 * unknown. Storage revisions are the receive stream; this state only drives copy
 * and controls.
 */
export const OBSERVATION_MODES = ['idle', 'active', 'stopped', 'unknown'] as const;

/** User-facing observation state used by the side panel controls and status text. */
export type ObservationMode = typeof OBSERVATION_MODES[number];

/**
 * Source of the side panel analysis request.
 *
 * The source is UI context, not detector metadata. It tells the model function
 * whether to create manual refresh copy, late-observation copy, or no notice.
 */
export type AnalysisRequestSource = 'initial' | 'manual' | 'auto';

/** Detector work lane shown by the side panel. */
export type MatcherStatus = 'idle' | 'collecting' | 'matching' | 'recording';

/** Matcher progress counters safe for side panel display. */
export type MatcherProgress = Pick<
	DetectionMatcherProgressSummary,
	'completedPartitionCount' | 'partitionCount' | 'latestPartitionKind' | 'resultCount'
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

/** Panel workflow state owned by visible tab/session transitions. */
export type SessionState =
	| { readonly kind: 'empty' }
	| { readonly kind: 'loading-visible-tab' }
	| { readonly kind: 'showing-snapshot'; readonly revision: VisibleRevision }
	| { readonly kind: 'requesting-analysis'; readonly previous?: VisibleRevision }
	| { readonly kind: 'streaming-revisions'; readonly revision: VisibleRevision }
	| { readonly kind: 'stopped'; readonly revision?: VisibleRevision }
	| { readonly kind: 'failed'; readonly message: string };

/** Replay state normalized for side panel rendering. */
export type ReplayState =
	| { readonly kind: 'none' }
	| { readonly kind: 'summary'; readonly summary: DetectionReplaySummary }
	| { readonly kind: 'loading-history'; readonly summary: DetectionReplaySummary }
	| {
		readonly kind: 'history';
		readonly summary: DetectionReplaySummary;
		readonly history: readonly DetectionReplayTrace[];
	};

/** Panel-visible detector revision independent from background command envelopes. */
export type VisibleRevision = {
	/** Origin of this visible revision in the side panel data flow. */
	readonly source: 'command' | 'snapshot';
	/** Normalized detector output safe for side panel rendering. */
	readonly analysis: SiteAnalysis;
	/** Snapshot reuse metadata used for copy and diagnostics. */
	readonly snapshot: {
		readonly status: SnapshotReuseStatus;
		readonly key: string;
		readonly expiresAt?: number;
	};
	/** Durable snapshot lifecycle status when this revision was derived from storage. */
	readonly sessionSnapshotStatus?: DetectionSessionStatus;
	/** Durable snapshot writer when this revision was derived from storage. */
	readonly sessionSnapshotSource?: DetectionSessionSnapshotSource;
	/** Live observation state when this revision owns a content session. */
	readonly session?: ObservationSessionState;
	/** Stable session handle for refresh, stop, and cleanup. */
	readonly sessionTarget?: ObservationSessionTarget;
	/** Latest full replay trace, when hydrated. */
	readonly replayTrace?: DetectionReplayTrace;
	/** Bounded newest-first replay traces, when hydrated. */
	readonly replayHistory?: readonly DetectionReplayTrace[];
	/** Compact replay summary stored on detector snapshots. */
	readonly replaySummary?: DetectionReplaySummary;
	/** Compact matcher progress stored on partial snapshot revisions. */
	readonly matcherProgress?: DetectionMatcherProgressSummary;
	/** Deeper evidence lifecycle state attached to the revision. */
	readonly enrichment?: AnalysisEnrichmentState;
	/** Evidence completeness represented by this detector revision. */
	readonly evidence?: DetectionEvidenceState;
	/** Revision write timestamp when the value came from storage. */
	readonly updatedAt?: number;
};

/** User-visible notice severity supported by the current side panel shell. */
export type NoticeVariant = 'success' | 'warning';

/**
 * Small status message rendered above the result panel.
 */
export type Notice = {
	/** Visual treatment for the notice. */
	variant: NoticeVariant;
	/** Plain text shown to the user. */
	text: string;
};

/**
 * Detection group rendered by `CategoryGroup`.
 */
export type CategoryGroup = {
	/** Primary category id chosen from the first category on each detection. */
	category: string;
	/** Human-readable category label from the category metadata table. */
	label: string;
	/** Sort priority from category metadata. Lower values render first. */
	priority: number;
	/** Detection results that belong to this primary category. */
	results: DetectionResult[];
};

/**
 * Panel-ready explanation summary for one detection card.
 *
 * The view model keeps this smaller than `DetectionExplanation` so Solid
 * components do not need to know about the full replay trace schema.
 */
export type DetectionExplanationSummary = {
	/** Technology id this explanation belongs to. */
	technologyId: string;
	/** Short headline rendered above the explanation reasons. */
	headline: string;
	/** Final confidence value and label copied for UI copy. */
	confidence: ConfidenceScore;
	/** Bounded explanation phrases safe for side panel rendering. */
	reasons: readonly string[];
	/** Number of public evidence entries behind the detection. */
	evidenceCount: number;
	/** Most useful public evidence kind to summarize in compact card copy. */
	primaryEvidenceKind: string | null;
	/** Whether the detection was inferred through graph relationships. */
	inferred: boolean;
	/** Public evidence rows rendered below explanation reasons. */
	evidence: readonly EvidencePreview[];
};


/** Public evidence row shown inside a technology card. */
export type EvidencePreview = {
	/** Detector surface that supplied the proof. */
	kind: string;
	/** Bounded value that matched the detector rule, when available. */
	matchedValue?: string;
	/** Version captured from this evidence row, when available. */
	version?: string;
	/** Relationship source for inferred evidence, when available. */
	sourceTechnologyId?: string;
	/** Observation lookup key, such as a header name, meta name, global path, or storage key. */
	observationKey?: string;
	/** Scalar observation context that helps explain property-based evidence. */
	attributes?: Readonly<Record<string, string | number | boolean>>;
	/** Whether this proof came from direct page evidence rather than graph support. */
	direct: boolean;
};

/** Lookup table keyed by technology id for explanation rendering. */
export type ExplanationLookup = Readonly<Record<string, DetectionExplanationSummary>>;

/**
 * Input needed to derive side panel state from a background analysis response.
 */
export type BuildAnalysisUpdateInput = {
	/** Analysis currently rendered by the side panel before the new response arrives. */
	previousAnalysis: SiteAnalysis | null;
	/** Panel-visible revision from a command or storage snapshot. */
	revision: VisibleRevision;
	/** UI request source that controls notice copy. */
	source: AnalysisRequestSource;
	/** Current late-detection ids already marked in the side panel. */
	currentLateDetectionIds?: readonly string[];
	/** Whether the caller intentionally cleared late markers before applying this response. */
	resetLateMarkers?: boolean;
};

/**
 * Panel state derived from a single successful analysis response.
 */
export type AnalysisUpdate = {
	/** Analysis that should become the side panel's current result snapshot. */
	analysis: SiteAnalysis;
	/** Technology ids that appeared compared with the previously rendered analysis. */
	addedDetectionIds: string[];
	/** Complete late-detection id list after this response is applied. */
	lateDetectionIds: string[];
	/** Explanation summaries keyed by technology id for result cards. */
	explanationsByTechnologyId: ExplanationLookup;
	/** User-facing observation state for buttons, chips, and result copy. */
	observationMode: ObservationMode;
	/** Whether the side panel should keep background-driven live updates active for late page signals. */
	shouldKeepLiveUpdatesActive: boolean;
	/** Optional notice to display after applying the response. */
	notice: Notice | null;
};

/** Whether matcher work is active enough to deserve visible progress UI. */
export function isMatcherBusy(status: MatcherStatus): boolean {
	return status === 'collecting' || status === 'matching' || status === 'recording';
}

/** Returns the compact matcher label for side panel metrics. */
export function getMatcherStatusLabel(status: MatcherStatus, progress?: MatcherProgress): string {
	if (status === 'collecting') return 'collecting page signals';
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
	if (status === 'matching') return 'Matching evidence batches';
	if (status === 'recording') return 'Recording replay trace';
	return 'Analysis complete';
}

/** Short progress copy used near the animated activity indicator. */
export function getMatcherActivityDescription(status: MatcherStatus, progress?: MatcherProgress): string {
	if (status === 'collecting') {
		return 'Reading DOM, resource, metadata, and page-surface signals before worker matching starts.';
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
	if (snapshot.enrichment.status === 'pending') {
		return 'matching';
	}

	if (
		snapshot.matcherProgress &&
		(!snapshot.replaySummary || snapshot.matcherProgress.updatedAt >= snapshot.replaySummary.analyzedAt)
	) {
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

/** Returns whether this revision still represents in-flight matcher work. */
export function isVisibleRevisionPending(revision: VisibleRevision): boolean {
	if (revision.enrichment?.status === 'pending') {
		return true;
	}

	if (revision.replayTrace || revision.replaySummary) {
		return false;
	}

	if (revision.sessionSnapshotStatus) {
		return getMatcherStatusFromSnapshot({
			key: { tabId: 0, frameId: 0, documentId: 'revision', originHash: 'revision' },
			schemaVersion: 1,
			revision: 0,
			urlHash: 'revision',
			hostname: revision.analysis.hostname,
			status: revision.sessionSnapshotStatus,
			source: revision.sessionSnapshotSource ?? (revision.source === 'snapshot' ? 'background' : 'cache'),
			updatedAt: revision.updatedAt ?? revision.analysis.analyzedAt,
			detectionCount: revision.analysis.results.length,
			analysis: revision.analysis,
			enrichment: { status: revision.enrichment?.status ?? 'not-needed' },
			...(revision.matcherProgress ? { matcherProgress: revision.matcherProgress } : {}),
		}) !== 'idle';
	}

	return false;
}


/** Return whether a compact replay summary belongs to the supplied analysis. */
export function isReplaySummaryForAnalysis(
	summary: DetectionReplaySummary,
	analysis: SiteAnalysis,
): boolean {
	return summary.resultCount === analysis.results.length && summary.analyzedAt === analysis.analyzedAt;
}

/** Return only replay history entries that explain the visible analysis. */
export function getReplayHistoryForVisibleAnalysis(
	history: readonly DetectionReplayTrace[] | undefined,
	analysis: SiteAnalysis,
): DetectionReplayTrace[] {
	return filterReplayHistoryForAnalysis(history, analysis);
}

/** Return the replay trace only when it explains the visible analysis. */
export function getReplayTraceForVisibleAnalysis(
	trace: DetectionReplayTrace | undefined,
	analysis: SiteAnalysis,
): DetectionReplayTrace | undefined {
	return trace && isDetectionReplayTraceForAnalysis(trace, analysis) ? trace : undefined;
}

/** Return the compact replay summary only when it explains the visible analysis. */
export function getReplaySummaryForVisibleAnalysis(
	summary: DetectionReplaySummary | undefined,
	analysis: SiteAnalysis,
): DetectionReplaySummary | undefined {
	return summary && isReplaySummaryForAnalysis(summary, analysis) ? summary : undefined;
}

/** Returns whether replay details belong to the current visible revision. */
export function shouldApplyReplayState(revision: VisibleRevision): boolean {
	if (isVisibleRevisionPending(revision)) {
		return false;
	}

	if (revision.replayTrace && !isDetectionReplayTraceForAnalysis(revision.replayTrace, revision.analysis)) {
		return false;
	}

	if (revision.replaySummary && !isReplaySummaryForAnalysis(revision.replaySummary, revision.analysis)) {
		return false;
	}

	return true;
}

/** Convert the current background command response into a side panel revision bridge. */
export function createVisibleRevisionFromAnalysisResponse(
	response: AnalyzeVisibleTabOutput,
): VisibleRevision {
	const replayTrace = getReplayTraceForVisibleAnalysis(response.replayTrace, response.analysis);
	const replayHistory = getReplayHistoryForVisibleAnalysis(response.replayHistory, response.analysis);
	return {
		source: 'command',
		analysis: response.analysis,
		snapshot: { ...response.snapshot },
		...(response.session ? { session: response.session } : {}),
		...(response.sessionTarget ? { sessionTarget: response.sessionTarget } : {}),
		...(replayTrace ? { replayTrace } : {}),
		...(replayHistory.length ? { replayHistory } : {}),
		...(response.enrichment ? { enrichment: response.enrichment } : {}),
		...(response.evidence ? { evidence: response.evidence } : {}),
	};
}

/** Return the normalized replay rendering state for a side panel revision. */
export function getReplayState(revision: VisibleRevision): ReplayState {
	const history = getReplayHistoryForVisibleAnalysis(revision.replayHistory, revision.analysis);
	if (history.length) {
		const summary = getReplaySummaryForVisibleAnalysis(revision.replaySummary, revision.analysis)
			?? createReplaySummaryFromTrace(history[0]!);
		return { kind: 'history', summary, history };
	}

	const summary = getReplaySummaryForVisibleAnalysis(revision.replaySummary, revision.analysis);
	if (summary) {
		return { kind: 'summary', summary };
	}

	const replayTrace = getReplayTraceForVisibleAnalysis(revision.replayTrace, revision.analysis);
	if (replayTrace) {
		return { kind: 'summary', summary: createReplaySummaryFromTrace(replayTrace) };
	}

	return { kind: 'none' };
}

/** Convert a full trace into the compact replay summary shape used by snapshots. */
export function createReplaySummaryFromTrace(trace: DetectionReplayTrace): DetectionReplaySummary {
	const stages: DetectionReplayTrace['events'][number]['stage'][] = [];
	for (const event of trace.events) {
		if (!stages.includes(event.stage)) stages.push(event.stage);
	}

	return {
		...(trace.runId ? { runId: trace.runId } : {}),
		analyzedAt: trace.analyzedAt,
		eventCount: trace.events.length,
		explanationCount: trace.explanations.length,
		resultCount: trace.resultCount,
		stages,
	};
}

/**
 * Input used when the side panel decides whether observation state should trigger a refresh.
 */
export type ShouldRefreshObservedChangeInput = {
	/** Latest content-script observation state reported by the background. */
	session: ObservationSessionState;
	/** Current rendered analysis, if the side panel has one. */
	analysis: SiteAnalysis | null;
};

/**
 * Groups detections by their primary category for the current side panel layout.
 *
 * A technology can belong to multiple categories, but phase 6 preserves the
 * current one-card-per-technology layout by choosing `categories[0]`. Keeping
 * that rule here makes it a visible UI compatibility choice instead of hiding it
 * inside the Solid component.
 */
export function groupDetectionsByPrimaryCategory(
	results: readonly DetectionResult[],
): CategoryGroup[] {
	const grouped = results.reduce<Record<string, DetectionResult[]>>(
		(groups, result) => {
			const category = result.categories[0] ?? 'unknown';
			return Object.assign({}, groups, {
				[category]: [...(groups[category] ?? []), result],
			});
		},
		{},
	);

	return Object.entries(grouped)
		.map(([category, categoryResults]) => {
			const meta = categories[category as CategoryId] ?? categories.unknown;
			return {
				category,
				label: meta.label,
				priority: meta.priority,
				results: categoryResults,
			};
		})
		.sort((a, b) => a.priority - b.priority || a.label.localeCompare(b.label));
}

/**
 * Returns the side panel label for an observation mode.
 */
export function getObservationLabel(mode: ObservationMode): string {
	if (mode === 'active') {
		return 'Observing';
	}

	if (mode === 'stopped') {
		return 'Stopped';
	}

	if (mode === 'idle') {
		return 'Idle';
	}

	return 'Loading';
}

/**
 * Converts content-session state into the smaller side panel state model.
 */
export function getObservationModeFromSession(
	session: Pick<ObservationSessionState, 'status'>,
): ObservationMode {
	if (session.status === 'observing' || session.status === 'dirty') {
		return 'active';
	}

	if (session.status === 'idle') {
		return 'idle';
	}

	return 'stopped';
}

/**
 * Converts durable snapshot lifecycle status into the side panel state model.
 *
 * Detector snapshots and content lifecycle snapshots flow through the same
 * storage subscription. This mapping lets lifecycle-only content revisions stop
 * or idle the controls without replacing the detector results already rendered.
 */
export function getObservationModeFromSnapshot(
	snapshot: Pick<DetectionSessionSnapshot, 'status'>,
): ObservationMode {
	if (snapshot.status === 'collecting' || snapshot.status === 'observing' || snapshot.status === 'enriching') {
		return 'active';
	}

	if (snapshot.status === 'cached' || snapshot.status === 'complete') {
		return 'idle';
	}

	if (snapshot.status === 'stopped' || snapshot.status === 'failed' || snapshot.status === 'stale') {
		return 'stopped';
	}

	return 'unknown';
}

/**
 * Converts a successful analysis response into the side panel observation mode.
 *
 * Cache hits can be useful without active observation, so they render as `idle`.
 * Fresh responses without an active session render as `stopped`, preserving the
 * current copy that tells users refresh is needed to resume observation.
 */
export function getObservationModeFromAnalysis(
	response: Pick<VisibleRevision, 'snapshot' | 'session'>,
): ObservationMode {
	if (response.session) {
		return getObservationModeFromSession(response.session);
	}

	return response.snapshot.status === 'hit' ? 'idle' : 'stopped';
}

/** Returns whether active page watching should keep the side panel in a live-update state. */
export function shouldKeepLiveUpdatesActive(mode: ObservationMode): boolean {
	return mode === 'active';
}


/**
 * Decide whether a storage snapshot can replace the detector output already shown.
 *
 * Content-owned lifecycle revisions are allowed to move observation status forward,
 * but an empty bootstrap snapshot must not erase richer detector output from the
 * same page. Background and cache snapshots still apply because they carry real
 * detector results or explicit cache state.
 */
export function shouldApplySnapshotRevision(input: {
	readonly currentAnalysis: SiteAnalysis | null;
	readonly snapshot: DetectionSessionSnapshot;
}): boolean {
	const currentAnalysis = input.currentAnalysis;
	if (!currentAnalysis) {
		return true;
	}

	if (isLowerCompletenessDetectorRevision(currentAnalysis, input.snapshot)) {
		return false;
	}

	if (input.snapshot.source !== 'content') {
		return true;
	}

	if (input.snapshot.analysis.url !== currentAnalysis.url) {
		return true;
	}

	if (input.snapshot.analysis.results.length > 0 || currentAnalysis.results.length === 0) {
		return true;
	}

	return false;
}

/**
 * Keep older partial matcher snapshots from making the count visibly move backward.
 *
 * Partial background revisions are useful while the first scan is growing, but a
 * lower-count partial from a slower worker batch or a deferred refresh should not
 * replace a richer visible snapshot for the same URL. Replay-backed lower counts
 * remain eligible only when they do not advertise lower evidence completeness,
 * which preserves backward compatibility for older stored snapshots.
 */
function isLowerCompletenessDetectorRevision(
	currentAnalysis: SiteAnalysis,
	snapshot: DetectionSessionSnapshot,
): boolean {
	if (
		snapshot.source !== 'background' ||
		snapshot.analysis.url !== currentAnalysis.url ||
		snapshot.analysis.results.length >= currentAnalysis.results.length
	) {
		return false;
	}

	if (snapshot.evidence && getEvidenceCompletenessRank(snapshot.evidence) < 5) {
		return true;
	}

	return snapshot.replaySummary === undefined;
}

/** Rank evidence coverage so recovered or partial passes cannot visibly replace richer runs. */
function getEvidenceCompletenessRank(state: DetectionEvidenceState | undefined): number {
	switch (state?.level) {
		case 'full':
			return 5;
		case 'enriched':
			return 4;
		case 'incremental':
			return 3;
		case 'initial':
			return 2;
		case 'recovered-initial':
			return 1;
		case 'unknown':
		default:
			return 0;
	}
}

/**
 * Preserve replay UI when a lifecycle-only snapshot repeats the same analysis.
 *
 * Snapshot records intentionally carry only a replay summary. When the analysis
 * payload did not advance, clearing explanation and replay state would make the
 * side panel look like evidence disappeared even though only the observation status
 * changed.
 */
export function shouldPreserveReplayState(input: {
	readonly previousAnalysis: SiteAnalysis | null;
	readonly revision: Pick<VisibleRevision, 'analysis' | 'enrichment' | 'replayHistory' | 'replayTrace'>;
}): boolean {
	if (!input.previousAnalysis || input.revision.replayTrace || input.revision.replayHistory !== undefined) {
		return false;
	}

	if (input.previousAnalysis.url !== input.revision.analysis.url) {
		return false;
	}

	if (input.previousAnalysis.analyzedAt !== input.revision.analysis.analyzedAt) {
		return false;
	}

	const previousIds = input.previousAnalysis.results.map((result) => result.technologyId);
	const nextIds = input.revision.analysis.results.map((result) => result.technologyId);
	return previousIds.length === nextIds.length && previousIds.every((id, index) => id === nextIds[index]);
}


/**
 * Convert replay explanations into a side panel lookup keyed by technology id.
 *
 * The side panel only renders explanation summaries for detections present in the
 * current response. Missing traces, snapshot hits, or stale trace data therefore
 * degrade to an empty lookup instead of creating misleading explanation copy.
 */
export function buildExplanationLookup(
	trace: DetectionReplayTrace | undefined,
): ExplanationLookup {
	if (!trace) {
		return {};
	}

	return Object.fromEntries(
		trace.explanations.map((explanation) => [
			explanation.technologyId,
			createExplanationSummary(explanation),
		]),
	);
}

/**
 * Create the compact explanation shape consumed by detection cards.
 *
 * Reasons and evidence previews are intentionally capped so explanation cards stay
 * scannable inside the extension side panel. Full replay traces remain available in
 * bounded history for users who need to inspect past runs.
 */
function createExplanationSummary(
	explanation: DetectionExplanation,
): DetectionExplanationSummary {
	return {
		technologyId: explanation.technologyId,
		headline: createExplanationHeadline(explanation),
		confidence: { ...explanation.confidence },
		reasons: explanation.reasons.slice(0, 3),
		evidenceCount: explanation.evidenceCount,
		primaryEvidenceKind: getPrimaryEvidenceKind(explanation),
		inferred: explanation.inferred,
		evidence: explanation.evidence.slice(0, 5).map(createEvidencePreview),
	};
}

/** Build the one-line reason shown before detailed explanation bullets. */
function createExplanationHeadline(explanation: DetectionExplanation): string {
	if (explanation.inferred) {
		return `Inferred from ${explanation.relationshipEvidenceCount} relationship signal${explanation.relationshipEvidenceCount === 1 ? '' : 's'}.`;
	}

	return `Matched ${explanation.directEvidenceCount} direct signal${explanation.directEvidenceCount === 1 ? '' : 's'}.`;
}

function createEvidencePreview(evidence: DetectionExplanationEvidenceSummary): EvidencePreview {
	return {
		kind: evidence.kind,
		direct: evidence.direct,
		...(evidence.matchedValue ? { matchedValue: evidence.matchedValue } : {}),
		...(evidence.version ? { version: evidence.version } : {}),
		...(evidence.sourceTechnologyId ? { sourceTechnologyId: evidence.sourceTechnologyId } : {}),
		...(evidence.observationKey ? { observationKey: evidence.observationKey } : {}),
		...(evidence.attributes ? { attributes: { ...evidence.attributes } } : {}),
	};
}

/** Pick the first public evidence kind because replay preserves detector order. */
function getPrimaryEvidenceKind(explanation: DetectionExplanation): string | null {
	return explanation.evidence[0]?.kind ?? null;
}

/** Formats an application error for the existing side panel error state. */
export function formatError(error: ExtensionError): string {
	return `${error.code}: ${error.message}`;
}

/**
 * Builds the side panel state update for a successful analysis response.
 */
export function buildAnalysisUpdate(
	input: BuildAnalysisUpdateInput,
): AnalysisUpdate {
	const nextAnalysis = input.revision.analysis;
	const addedDetectionIds = input.previousAnalysis
		? getAddedDetectionIds(input.previousAnalysis.results, nextAnalysis.results)
		: [];
	const lateMarkerBase = input.resetLateMarkers
		? []
		: input.currentLateDetectionIds ?? [];
	const lateDetectionIds = mergeUniqueIds(lateMarkerBase, addedDetectionIds);
	const explanationsByTechnologyId = buildExplanationLookup(input.revision.replayTrace);
	const observationMode = getObservationModeFromAnalysis(input.revision);
	/**
	 * Storage revisions are the receive stream for continuous matching. The side panel
	 * stays live only when an observation session is active; follow-up evidence
	 * passes publish normal background snapshots without a separate pending state.
	 */
	console.log({
		observationMode,
		shouldKeepLiveUpdatesActive
	})
	const keepLiveUpdates = shouldKeepLiveUpdatesActive(observationMode);
	const notice = getAnalysisNotice({
		addedDetectionIds,
		nextAnalysis,
		revision: input.revision,
		source: input.source,
	});

	return {
		analysis: nextAnalysis,
		addedDetectionIds,
		lateDetectionIds,
		explanationsByTechnologyId,
		observationMode,
		shouldKeepLiveUpdatesActive: keepLiveUpdates,
		notice,
	};
}

/**
 * Returns the user-facing notice for one analysis response.
 */
function getAnalysisNotice(input: {
	addedDetectionIds: readonly string[];
	nextAnalysis: SiteAnalysis;
	revision: VisibleRevision;
	source: AnalysisRequestSource;
}): Notice | null {
	if (input.addedDetectionIds.length) {
		const count = input.addedDetectionIds.length;
		if (input.source === 'auto') {
			return {
				variant: 'success',
				text: `Analysis update found ${count} additional detection${count === 1 ? '' : 's'} on ${input.nextAnalysis.hostname}.`,
			};
		}

		return {
			variant: 'success',
			text: `Detected ${count} additional technolog${count === 1 ? 'y' : 'ies'} on ${input.nextAnalysis.hostname}.`,
		};
	}

	if (input.source === 'manual') {
		return {
			variant: 'success',
			text: `Refreshed ${input.nextAnalysis.results.length} technologies for ${input.nextAnalysis.hostname}. ${input.revision.session ? 'Observation is active again.' : 'Showing the latest cached state.'}`,
		};
	}

	return null;
}

/** Returns technology ids that are present in `next` but missing from `previous`. */
function getAddedDetectionIds(
	previous: readonly DetectionResult[],
	next: readonly DetectionResult[],
): string[] {
	const previousIds = new Set(previous.map((result) => result.technologyId));
	return next
		.filter((result) => !previousIds.has(result.technologyId))
		.map((result) => result.technologyId);
}

/** Merges detection id lists while preserving the first time each id appeared. */
function mergeUniqueIds(previous: readonly string[], next: readonly string[]): string[] {
	return Array.from(new Set([...previous, ...next]));
}
