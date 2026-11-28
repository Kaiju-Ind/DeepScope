import type { PageSignals, DetectionRunOptions, SiteAnalysis, Evidence } from "../types.ts";
import type { TechnologyDefinition } from "@deepscope/registry/types";
import { createCompiledDetectionRegistry } from "../registry/graph.ts";
import type { CompiledDetectionRegistry } from "../registry/graph.ts";
import type { DetectionCandidate } from "./candidate.ts";
import { detectionCandidateToResult, createDirectDetectionCandidate } from "./candidate.ts";
import { applyRelationships } from "./relationships.ts";
import { DISPLAY_CONFIDENCE_THRESHOLD, combineEvidenceConfidence, toConfidenceScore } from "./confidence.ts";
import { compareDetectionResults } from "./order.ts";
import { matchRule } from "./rule/index.ts";

/**
 * Pure detector entrypoint. Browser APIs stay in content/background code so this
 * function can be tested with deterministic fixtures and reused safely.
 */
export function analyzeSite(
	signals: PageSignals,
	registry: TechnologyDefinition[],
	options: DetectionRunOptions = {},
): SiteAnalysis {
	return analyzeCompiledSite(
		signals,
		createCompiledDetectionRegistry(registry),
		options,
	);
}

/**
 * Run detection against a compiled registry graph.
 *
 * Some tests and compatibility callers still provide a raw technology array.
 * The compiled entrypoint lets registry-compiler work prove graph equivalence
 * while the extension runtime consumes compiled artifacts through the event
 * pipeline.
 */
export function analyzeCompiledSite(
	signals: PageSignals,
	compiledRegistry: CompiledDetectionRegistry,
	options: DetectionRunOptions = {},
): SiteAnalysis {
	const candidates = compiledRegistry.technologies
		.map((definition) => detectTechnology(definition, signals, options))
		.filter((result): result is DetectionCandidate => Boolean(result))
		.map(detectionCandidateToResult);

	const results = applyRelationships(candidates, compiledRegistry)
		.filter((result) => result.confidence.value >= DISPLAY_CONFIDENCE_THRESHOLD)
		.sort(compareDetectionResults(compiledRegistry.registryOrderById));

	return {
		url: signals.url,
		hostname: signals.hostname,
		analyzedAt: signals.collectedAt,
		source: 'fresh',
		results,
		errors: [],
	};
}

/** Evaluate one definition's rules, retain actual evidence and use its first present version clue; return null for no matches. */
function detectTechnology(
	definition: TechnologyDefinition,
	signals: PageSignals,
	options: DetectionRunOptions,
): DetectionCandidate | null {
	const evidence = definition.rules
		.map((rule, ruleIndex) => matchRule(definition.id, ruleIndex, rule, signals, options))
		.filter((item): item is Evidence => Boolean(item));

	if (!evidence.length) {
		return null;
	}

	const confidenceValue = combineEvidenceConfidence(definition, evidence);
	const version = evidence.find((item) => item.version)?.version;

	return createDirectDetectionCandidate(
		definition,
		evidence,
		toConfidenceScore(confidenceValue),
		version,
	);
}
