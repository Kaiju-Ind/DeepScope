import type { DetectionReplaySummary } from "@deepscope/detection/pipeline/replay";
import type { SiteAnalysis } from "@deepscope/detection/types";
import { filterReplayHistoryForAnalysis, isDetectionReplayTraceForAnalysis, type DetectionReplayTrace } from "@deepscope/detection/pipeline";
import * as replay from '@deepscope/detection/pipeline/replay';
import type { VisibleRevision } from './revision.ts';

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
	return replay.describes(summary, analysis) ? summary : undefined;
}

/** Return the normalized replay rendering state for a side panel revision. */
export function getReplayState(revision: VisibleRevision): ReplayState {
	const history = getReplayHistoryForVisibleAnalysis(revision.replayHistory, revision.analysis);
	if (history.length) {
		const summary = getReplaySummaryForVisibleAnalysis(revision.replaySummary, revision.analysis)
			?? replay.summarize(history[0]!);
		return { kind: 'history', summary, history };
	}

	const summary = getReplaySummaryForVisibleAnalysis(revision.replaySummary, revision.analysis);
	if (summary) {
		return { kind: 'summary', summary };
	}

	const replayTrace = getReplayTraceForVisibleAnalysis(revision.replayTrace, revision.analysis);
	if (replayTrace) {
		return { kind: 'summary', summary: replay.summarize(replayTrace) };
	}

	return { kind: 'none' };
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
