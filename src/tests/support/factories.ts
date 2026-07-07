import type { ObservationSessionState } from '@/lib/content/observed-page-signals';
import type { AnalyzeVisibleTabOutput } from '@/lib/contracts/analysis';
import type { DetectionSessionSnapshot } from '@/lib/contracts/detection-session';
import type {
	CategoryId,
	ConfidenceScore,
	DetectionResult,
	PageSignals,
	SiteAnalysis,
} from '@/lib/detection/types';
import {
	DETECTION_REPLAY_TRACE_SCHEMA_VERSION,
	type DetectionReplayTrace,
} from '@/lib/pipeline';

/**
 * Stable timestamp used by test factories that do not care about time itself.
 *
 * Keeping a single timestamp makes cache, popup, and lifecycle expectations easy
 * to compare without depending on the wall clock. Tests that need time to move
 * should still use `vi.setSystemTime(...)` and override the relevant field.
 */
export const TEST_NOW = 1_700_000_000_000;

/** Confidence object for high-confidence fixture detections. */
export const HIGH_CONFIDENCE: ConfidenceScore = { value: 95, level: 'certain' };

/**
 * Create a normalized analysis fixture for storage, popup, and background tests.
 *
 * The default URL matches the visible-tab fixture used in background tests so a
 * snapshot response record, analysis response, and page-signal snapshot can be combined
 * without each test repeating the same hostname setup.
 */
export function makeAnalysis(
	results: readonly DetectionResult[] = [],
	overrides: Partial<SiteAnalysis> = {},
): SiteAnalysis {
	const url = overrides.url ?? 'https://example.com/products';
	return {
		url,
		hostname: overrides.hostname ?? new URL(url).hostname,
		analyzedAt: overrides.analyzedAt ?? TEST_NOW,
		source: overrides.source ?? 'fresh',
		results: [...results],
		errors: overrides.errors ?? [],
	};
}


/**
 * Create a durable detection session snapshot for storage and popup tests.
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
		schemaVersion: overrides.schemaVersion ?? 1,
		revision: overrides.revision ?? 1,
		urlHash: overrides.urlHash ?? 'url-example-products',
		hostname: overrides.hostname ?? analysis.hostname,
		status: overrides.status ?? 'collecting',
		source: overrides.source ?? 'content',
		updatedAt: overrides.updatedAt ?? TEST_NOW,
		detectionCount: overrides.detectionCount ?? analysis.results.length,
		analysis,
		enrichment: overrides.enrichment ?? { status: 'not-needed' },
		...(overrides.matcherExecutor ? { matcherExecutor: overrides.matcherExecutor } : {}),
		...(overrides.matcherProgress ? { matcherProgress: overrides.matcherProgress } : {}),
		...(overrides.replaySummary ? { replaySummary: overrides.replaySummary } : {}),
	};
}

/**
 * Create a detection result with only the fields popup and graph tests need.
 *
 * Tests can override categories to document UI grouping behavior without copying
 * confidence and website boilerplate into each assertion.
 */
export function makeDetection(
	technologyId: string,
	categories: readonly CategoryId[] = ['framework'],
	overrides: Partial<DetectionResult> = {},
): DetectionResult {
	return {
		technologyId,
		name: overrides.name ?? technologyId,
		website: overrides.website ?? `https://${technologyId}.example`,
		categories: [...categories],
		confidence: overrides.confidence ?? HIGH_CONFIDENCE,
		evidence: overrides.evidence ?? [],
		version: overrides.version,
		description: overrides.description,
		inferred: overrides.inferred,
		warnings: overrides.warnings,
	};
}

/**
 * Create a redacted replay trace fixture for storage, popup, and messaging tests.
 *
 * The default trace has one stage event and no explanations. Tests that need a
 * richer explanation can override only the replay fields they assert against.
 */
export function makeDetectionReplayTrace(
	overrides: Partial<DetectionReplayTrace> = {},
): DetectionReplayTrace {
	const target = overrides.target ?? {
		url: 'https://example.com/products',
		hostname: 'example.com',
	};
	const analyzedAt = overrides.analyzedAt ?? TEST_NOW;

	return {
		schemaVersion: overrides.schemaVersion ?? DETECTION_REPLAY_TRACE_SCHEMA_VERSION,
		target,
		requestedMode: overrides.requestedMode ?? 'event',
		completedMode: overrides.completedMode ?? 'event',
		analyzedAt,
		resultCount: overrides.resultCount ?? 0,
		events: overrides.events ?? [
			{
				sequence: 0,
				stage: 'detections-emitted',
				target,
				occurredAt: analyzedAt,
				count: 0,
			},
		],
		explanations: overrides.explanations ?? [],
		emission: overrides.emission,
	};
}

/**
 * Create a complete page-signal snapshot for detector and background tests.
 *
 * The defaults represent a quiet page. Tests override only the signal surface
 * they care about, such as `html`, `scripts`, or `headers`, which keeps the
 * fixture aligned with the current `PageSignals` contract as that contract moves
 * toward normalized observations later.
 */
export function makePageSignals(overrides: Partial<PageSignals> = {}): PageSignals {
	const url = overrides.url ?? 'https://example.com/products';
	return {
		url,
		hostname: overrides.hostname ?? new URL(url).hostname,
		html: overrides.html ?? '<html><head></head><body></body></html>',
		htmlMatches: overrides.htmlMatches ?? {},
		text: overrides.text ?? '',
		scripts: overrides.scripts ?? [],
		stylesheets: overrides.stylesheets ?? [],
		links: overrides.links ?? [],
		resources: overrides.resources ?? [],
		requests: overrides.requests ?? [],
		scriptContents: overrides.scriptContents ?? [],
		stylesheetContents: overrides.stylesheetContents ?? [],
		cookies: overrides.cookies ?? {},
		headers: overrides.headers ?? {},
		meta: overrides.meta ?? {},
		dom: overrides.dom ?? { selectors: {} },
		storage: overrides.storage ?? { localStorage: {}, sessionStorage: {} },
		jsGlobals: overrides.jsGlobals ?? {},
		robotsTxt: overrides.robotsTxt ?? '',
		dnsRecords: overrides.dnsRecords ?? {},
		certIssuer: overrides.certIssuer ?? '',
		probeResults: overrides.probeResults ?? [],
		collectedAt: overrides.collectedAt ?? TEST_NOW,
	};
}

/**
 * Create an observation-session fixture for lifecycle, popup, and background tests.
 */
export function makeObservationSession(
	status: ObservationSessionState['status'] = 'idle',
	overrides: Partial<ObservationSessionState> = {},
): ObservationSessionState {
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
 * Create a background analysis response fixture for popup and extension tests.
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
