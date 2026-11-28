import type { ConfidenceScore, DetectionResult, SiteAnalysis, PageSignals } from "../types.ts";
import type { CategoryId } from "@deepscope/registry/types";
import type { DetectionReplayTrace } from "../pipeline/index.ts";
import { DETECTION_REPLAY_TRACE_SCHEMA_VERSION } from "../pipeline/index.ts";

/**
 * Stable timestamp used by test factories that do not care about time itself.
 *
 * Keeping a single timestamp makes cache, side panel, and lifecycle expectations easy
 * to compare without depending on the wall clock. Tests that need time to move
 * should still use `vi.setSystemTime(...)` and override the relevant field.
 */
export const TEST_NOW = 1_700_000_000_000;

/** Confidence object for high-confidence fixture detections. */
export const HIGH_CONFIDENCE: ConfidenceScore = { value: 95, level: 'certain' };

/**
 * Create a normalized analysis fixture for storage, side panel, and background tests.
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
 * Create a detection result with only the fields side panel and graph tests need.
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
 * Create a redacted replay trace fixture for storage, side panel, and messaging tests.
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
		...(overrides.runId ? { runId: overrides.runId } : {}),
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
		images: overrides.images ?? [],
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
