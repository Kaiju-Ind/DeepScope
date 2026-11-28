import type { DetectionResult, SiteAnalysis } from "@deepscope/detection/types";
import type { ExtensionError } from "../../lib/messaging/failure.ts";
import type { VisibleRevision } from './revision.ts';
import { type ExplanationLookup, buildExplanationLookup } from './explanations.ts';
import { type ObservationMode, shouldKeepLiveUpdatesActive, getObservationModeFromAnalysis } from './observation.ts';

/**
 * Source of the side panel analysis request.
 *
 * The source is UI context, not detector metadata. It tells the model function
 * whether to create manual refresh copy, late-observation copy, or no notice.
 */
export type AnalysisRequestSource = 'initial' | 'manual' | 'auto';

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
				text: `Late analysis found ${count} additional detection${count === 1 ? '' : 's'} on ${input.nextAnalysis.hostname}.`,
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
