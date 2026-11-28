import type { MatcherRunReason } from './types.ts';
import type { CollectionEvidencePass, CollectionEvidencePassId } from "@deepscope/detection/collection/plan";

import type * as observe from '../../content/observe/index.ts';
import type { ContentPageSessionSnapshotTarget } from "../../messaging/analysis.ts";
import type { DetectionEnrichmentState, DetectionEvidenceState, DetectionSessionKey, DetectionSessionSnapshot, DetectionSessionStatus } from "../../storage/session.ts";

import type { SiteAnalysis } from "@deepscope/detection/types";
import { filterReplayHistoryForAnalysis, isDetectionReplayTraceForAnalysis } from "@deepscope/detection/pipeline";
import type { DetectionReplayTrace } from "@deepscope/detection/pipeline";
import type { TimingContext } from "../../diagnostics/timing.ts";
import type { VisibleTabIdentity, AnalysisEnrichmentState, AnalyzeVisibleTabOutput, ObservationSessionTarget } from "../../messaging/index.ts";
import type { ObservationBatch } from "@deepscope/detection/observations";

import { errorResponse, ok, type ExtensionResult } from "../../messaging/result.ts";
import { MatcherError, type MatcherJobMode, type MatcherJobRecord } from "../../matcher/index.ts";

import * as rank from '@deepscope/detection/rank';

import * as url from '../../../utils/url.ts';
import { STORAGE_LIMITS, createDetectionStorageHash, getAnalysisResponseKey } from "../../storage/contracts.ts";
import type { InspectableTab, CompiledRegistry, VisibleSessionId } from './types.ts';

/** Select one concise finding for the browser action tooltip without inventing impact scoring. */
export function getFinding(analysis: SiteAnalysis): string | undefined {
	return rank.best(analysis.results)?.name;
}

/** Log tab/window identifiers while omitting hostnames for trusted private-tab contexts. */
export function summarizeTab(tab: InspectableTab): Record<string, unknown> {
	return {
		windowId: tab.windowId,
		tabId: tab.id,
		...(tab.incognito ? { incognito: true } : { hostname: new globalThis.URL(tab.url).hostname }),
	};
}

/** Bind the top frame's full URL, origin and privacy context to the hashes used by scheduling and persistence. */
export function createVisibleTabIdentity(tab: InspectableTab): VisibleTabIdentity {
	const parsedUrl = new globalThis.URL(tab.url);
	const tabOrigin = url.getOrigin(tab.url);

	return {
		windowId: tab.windowId,
		tabId: tab.id,
		frameId: 0,
		url: tab.url,
		hostname: parsedUrl.hostname,
		originHash: createDetectionStorageHash(tabOrigin),
		urlHash: createDetectionStorageHash(tab.url),
		incognito: tab.incognito,
	};
}

/** Expose lifecycle counters and stop reason without logging the page URL or observation payload. */
export function summarizeSession(session: observe.StateType): Record<string, unknown> {
	return {
		sessionId: session.sessionId,
		status: session.status,
		startedAt: session.startedAt,
		expiresAt: session.expiresAt,
		pendingMutationCount: session.pendingMutationCount,
		stopReason: session.stopReason,
	};
}

/** Report registry and requested-collection counts without retaining or logging rule bodies. */
export function summarizeCompiledRegistryArtifact(artifact: CompiledRegistry): Record<string, unknown> {
	const ruleCount = Object.values(artifact.patternTables).reduce((total, count) => total + count, 0);
	return {
		technologyCount: artifact.technologies.length,
		ruleCount,
		diagnosticCount: artifact.diagnosticCount,
		initialDomSelectorCount: artifact.collectionPlan.initial.domSelectorPlan.selectors.length,
		initialJsGlobalProbeCount: artifact.collectionPlan.initial.jsGlobalPropertyList.length,
		enrichmentHtmlProbeCount: artifact.collectionPlan.enrichment.htmlProbeList.length,
	};
}

/** Create the background response returned to the side panel after analysis. */
export function createAnalysisOutput(
	analysis: SiteAnalysis,
	snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'],
	session?: observe.StateType,
	replayTrace?: AnalyzeVisibleTabOutput['replayTrace'],
	replayHistory?: AnalyzeVisibleTabOutput['replayHistory'],
	sessionTarget?: ObservationSessionTarget,
	enrichment?: AnalysisEnrichmentState,
	evidence?: DetectionEvidenceState,
): AnalyzeVisibleTabOutput {
	return {
		analysis,
		snapshot: {
			status: snapshotStatus,
			key: getAnalysisResponseKey(analysis.url),
			expiresAt: analysis.analyzedAt + STORAGE_LIMITS.analysisTtlMs,
		},
		session,
		...(sessionTarget ? { sessionTarget } : {}),
		...(replayTrace ? { replayTrace } : {}),
		...(replayHistory ? { replayHistory } : {}),
		...(enrichment ? { enrichment } : {}),
		...(evidence ? { evidence } : {}),
	};
}

/** Create an actionable target only for a session with an ID and expected document, retaining the tab's privacy context. */
export function createObservationSessionTarget(
	tab: InspectableTab,
	session?: observe.StateType,
): ObservationSessionTarget | undefined {
	if (!session?.sessionId || !session.expectedUrl) {
		return undefined;
	}

	return {
		tabId: tab.id,
		sessionId: session.sessionId,
		expectedUrl: tab.url,
		...(tab.incognito ? { incognito: true } : {}),
	};
}

/**
 * Build the content-side snapshot target from background-owned tab identity.
 *
 * The content script can observe the document, but only the background receives
 * the tab id from Chrome. Sharing the same key lets content publish revision 1
 * and background promote revision 2 for the exact same page session.
 */
export function createContentPageSessionSnapshotTarget(
	tab: InspectableTab,
	sessionId: string,
): ContentPageSessionSnapshotTarget {
	return {
		key: {
			tabId: tab.id,
			frameId: 0,
			documentId: sessionId,
			originHash: createDetectionStorageHash(url.getOrigin(tab.url)),
		},
		url: tab.url,
		urlHash: createDetectionStorageHash(tab.url),
		hostname: new globalThis.URL(tab.url).hostname,
		...(tab.incognito ? { incognito: true } : {}),
	};
}

/** Build a stable key for ordered writes to one exact visible page session. */
export function getSnapshotQueueKey(key: DetectionSessionKey): string {
	return `${key.tabId}:${key.frameId}:${key.originHash}:${key.documentId}`;
}

/** Explain why storage rejected a write so count regressions are diagnosable. */
export function classifySnapshotWriteRejection(
	candidate: DetectionSessionSnapshot,
	stored: DetectionSessionSnapshot,
): string {
	if (candidate.revision < stored.revision) {
		return 'older-revision';
	}

	if (candidate.revision === stored.revision) {
		if (candidate.detectionCount > stored.detectionCount) {
			return 'same-revision-race-higher-count';
		}
		if (candidate.detectionCount < stored.detectionCount) {
			return 'same-revision-race-lower-count';
		}
		return 'same-revision-race-same-count';
	}

	return 'lower-completeness-merge-rejected';
}

/** Snapshot replay summaries represent durable/final replay state, not preview matcher output. */
export function shouldAttachReplaySummaryToSnapshot(
	output: AnalyzeVisibleTabOutput,
): output is AnalyzeVisibleTabOutput & { readonly replayTrace: NonNullable<AnalyzeVisibleTabOutput['replayTrace']> } {
	return Boolean(output.replayTrace) && output.enrichment?.status !== 'pending';
}

/**
 * Resolve the page-session key available from a background response.
 *
 * Observation sessions provide the strongest document identity. Cached responses
 * can lack a session, so the URL hash becomes a stable fallback until content
 * owns browser document ids in the later page-session runtime.
 */
export function createDetectionSessionKeyForOutput(tab: InspectableTab, output: AnalyzeVisibleTabOutput): DetectionSessionKey {
	return {
		tabId: tab.id,
		frameId: 0,
		documentId: output.sessionTarget?.sessionId ?? output.session?.sessionId ?? createDetectionStorageHash(output.analysis.url),
		originHash: createDetectionStorageHash(url.getOrigin(output.analysis.url)),
	};
}

/** Derive the side-panel-visible lifecycle state from the analysis response. */
export function getDetectionSnapshotStatus(output: AnalyzeVisibleTabOutput): DetectionSessionStatus {
	if (output.session?.status === 'observing' || output.session?.status === 'dirty') return 'observing';
	if (output.session?.status === 'stopped') return 'stopped';
	if (output.snapshot.status === 'hit') return 'cached';
	return 'complete';
}

/** Normalize response enrichment metadata into the durable snapshot schema. */
export function toDetectionEnrichmentState(enrichment?: AnalysisEnrichmentState): DetectionEnrichmentState {
	const updatedAt = Date.now();
	if (!enrichment) return { status: 'not-needed', updatedAt, reason: 'continuous-evidence-revisions' };
	return {
		status: enrichment.status === 'skipped' ? 'skipped' : enrichment.status,
		updatedAt,
		...(enrichment.completedAt ? { completedAt: enrichment.completedAt } : {}),
		...(enrichment.reason ? { reason: enrichment.reason } : {}),
	};
}

/** Build durable evidence completeness metadata for a detector snapshot. */
export function createDetectionEvidenceState(input: {
	readonly level: DetectionEvidenceState['level'];
	readonly completedPassIds?: readonly string[];
	readonly requiredPassIds?: readonly string[];
	readonly complete?: boolean;
	readonly reason?: string;
}): DetectionEvidenceState {
	const completedPassIds = [...(input.completedPassIds ?? [])];
	const requiredPassIds = [...(input.requiredPassIds ?? completedPassIds)];
	const complete = input.complete ?? (
		requiredPassIds.length > 0 && requiredPassIds.every((passId) => completedPassIds.includes(passId))
	);

	return {
		level: input.level,
		completedPassIds,
		requiredPassIds,
		complete,
		updatedAt: Date.now(),
		...(input.reason ? { reason: input.reason } : {}),
	};
}

/** Preserve collection-pass order when building the completeness record. */
export function getEvidencePassIds(passes: readonly CollectionEvidencePass[]): CollectionEvidencePassId[] {
	return passes.map((pass) => pass.id);
}

/** Keep replay details joined to the exact analysis they describe. */
export function getReplayTraceForAnalysis(
	trace: DetectionReplayTrace | null,
	analysis: SiteAnalysis,
): DetectionReplayTrace | undefined {
	return trace && isDetectionReplayTraceForAnalysis(trace, analysis) ? trace : undefined;
}

/** Use the shared replay-to-analysis compatibility filter so the panel never receives unrelated trace history. */
export function getReplayHistoryForAnalysis(
	history: readonly DetectionReplayTrace[],
	analysis: SiteAnalysis,
): DetectionReplayTrace[] {
	return filterReplayHistoryForAnalysis(history, analysis);
}

/** Require both session ID and document URL agreement before allowing a targeted observation operation. */
export function validateObservationSessionTarget(
	actual: observe.StateType,
	expected: ObservationSessionTarget,
): ExtensionResult<void> {
	if (actual.sessionId !== expected.sessionId) {
		return errorResponse(
			'OBSERVATION_SESSION_UNAVAILABLE',
			'The requested observation session is no longer active in the target tab.',
		);
	}

	if (!actual.expectedUrl || !url.sameDocument(actual.expectedUrl, expected.expectedUrl)) {
		return errorResponse(
			'OBSERVATION_SESSION_UNAVAILABLE',
			'The visible tab navigated away from the observed document.',
		);
	}

	return ok(undefined);
}

/** Scope publication ownership to tab, top frame, session-or-document hash and URL hash. */
export function getVisibleSessionId(
	tab: InspectableTab,
	batch: ObservationBatch,
	session?: observe.StateType,
): VisibleSessionId {
	const documentId = session?.sessionId ?? createDetectionStorageHash(batch.target.url);
	const urlHash = createDetectionStorageHash(batch.target.url);
	return `${tab.id}:0:${documentId}:${urlHash}`;
}

/**
 * Store one replay history entry for each user-visible scan run.
 *
 * Background-owned dirty refreshes are detector revisions inside an existing
 * observation window. They should update snapshots, but they
 * should not appear as separate top-level replay runs because the user did not
 * start a new scan and the side panel would show duplicate histories for one action.
 */
export function shouldStoreReplay(details: MatcherRunReason): boolean {
	const refreshKind = details.refreshKind;
	if (refreshKind === 'queued-continuous-initial' && details.hasFollowUpEnrichment === true) {
		return false;
	}

	if (refreshKind === 'enrichment-pass') {
		return true;
	}

	return (
		refreshKind !== 'incremental' &&
		refreshKind !== 'recovered'
	);
}

/** Map runtime matcher failures to durable lifecycle reasons without parsing error messages. */
export function getMatcherFailureReason(error: unknown): MatcherJobRecord['reason'] {
	if (!(error instanceof MatcherError)) return 'worker-failed';
	switch (error.reason) {
		case 'offscreen-unavailable': return 'offscreen-unavailable';
		case 'queue-full': return 'queue-full';
		case 'run-timeout': return 'matcher-timeout';
		default: return 'worker-failed';
	}
}

/** Build timing metadata once so matcher spans share the same stable context. */
export function createMatcherTiming(
	tab: InspectableTab,
	batch: ObservationBatch,
	snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'],
	matcherMode: MatcherJobMode,
	details: MatcherRunReason,
	timingTraceId?: string,
): TimingContext {
	return {
		traceId: timingTraceId,
		surface: 'pipeline',
		incognito: tab.incognito,
		details: {
			...summarizeTab(tab),
			snapshotStatus,
			observationCount: batch.observations.length,
			refreshKind: details.refreshKind,
			matcherMode,
		},
	};
}

/** Create a minimal analysis envelope while matcher revisions are queued. */
export function createPendingSiteAnalysis(tab: InspectableTab, analyzedAt = Date.now()): SiteAnalysis {
	return {
		url: tab.url,
		hostname: new globalThis.URL(tab.url).hostname,
		analyzedAt,
		source: 'fresh',
		results: [],
		errors: [],
	};
}
