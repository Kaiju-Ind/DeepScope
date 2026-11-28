import type { DetectionSessionSnapshot } from "../../lib/storage/session.ts";
import { DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION } from "../../lib/storage/session.ts";
import { makeAnalysis, TEST_NOW } from "@deepscope/detection/testing/fixtures";
import type * as observe from "../../lib/content/observe/index.ts";
import type { AnalyzeVisibleTabOutput } from "../../lib/messaging/analysis.ts";

/**
 * Create a durable detection session snapshot for storage and side panel tests.
 *
 * The default key mirrors a top-frame visible-tab document. Tests can override
 * the revision, status, or analysis without repeating the storage identity that
 * every snapshot needs before it can be compared in browser storage.
 */
export function makeDetectionSessionSnapshot(
	overrides: Partial<DetectionSessionSnapshot> = {},
): DetectionSessionSnapshot {
	const analysis = overrides.analysis ?? makeAnalysis();
	const key = overrides.key ?? {
		tabId: 7,
		frameId: 0,
		documentId: 'document-1',
		originHash: 'origin-example',
	};

	return {
		key,
		schemaVersion: overrides.schemaVersion ?? DETECTION_SESSION_SNAPSHOT_SCHEMA_VERSION,
		revision: overrides.revision ?? 1,
		urlHash: overrides.urlHash ?? 'url-example-products',
		hostname: overrides.hostname ?? analysis.hostname,
		status: overrides.status ?? 'collecting',
		source: overrides.source ?? 'content',
		updatedAt: overrides.updatedAt ?? TEST_NOW,
		detectionCount: overrides.detectionCount ?? analysis.results.length,
		analysis,
		enrichment: overrides.enrichment ?? { status: 'not-needed' },
		...(overrides.evidence ? { evidence: overrides.evidence } : {}),
		...(overrides.matcherExecutor ? { matcherExecutor: overrides.matcherExecutor } : {}),
		...(overrides.matcherProgress ? { matcherProgress: overrides.matcherProgress } : {}),
		...(overrides.replaySummary ? { replaySummary: overrides.replaySummary } : {}),
	};
}

/**
 * Create an observation-session fixture for lifecycle, side panel, and background tests.
 */
export function makeObservationSession(
	status: observe.StateType['status'] = 'idle',
	overrides: Partial<observe.StateType> = {},
): observe.StateType {
	return {
		sessionId: overrides.sessionId ?? 'session-1',
		expectedUrl: overrides.expectedUrl ?? 'https://example.com/products',
		status,
		throttleMs: overrides.throttleMs ?? 1_500,
		startedAt: overrides.startedAt ?? TEST_NOW,
		expiresAt: overrides.expiresAt ?? TEST_NOW + 60_000,
		pendingMutationCount: overrides.pendingMutationCount ?? 0,
		lastObservedAt: overrides.lastObservedAt,
		stopReason: overrides.stopReason,
	};
}

/**
 * Create a background analysis response fixture for side panel and extension tests.
 */
export function makeAnalyzeVisibleTabOutput(
	overrides: Partial<AnalyzeVisibleTabOutput> = {},
): AnalyzeVisibleTabOutput {
	const analysis = overrides.analysis ?? makeAnalysis();
	return {
		analysis,
		snapshot: overrides.snapshot ?? {
			status: 'miss',
			key: 'analysis:https://example.com',
			expiresAt: analysis.analyzedAt + 86_400_000,
		},
		session: overrides.session,
		...(overrides.sessionTarget ? { sessionTarget: overrides.sessionTarget } : {}),
		replayTrace: overrides.replayTrace,
		replayHistory: overrides.replayHistory,
		...(overrides.enrichment ? { enrichment: overrides.enrichment } : {}),
	};
}
