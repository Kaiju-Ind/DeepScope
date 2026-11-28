import type { TechnologyDefinition } from "@deepscope/registry/types";
import type { Evidence, ConfidenceScore } from "../types.ts";
import type { DetectionKind } from "@deepscope/registry/rules";

export const DISPLAY_CONFIDENCE_THRESHOLD = 50;
const ADDITIONAL_SAME_SURFACE_WEIGHT = 0.35;
const ADDITIONAL_DISTINCT_SURFACE_WEIGHT = 0.65;
const HTML_ONLY_PRODUCT_CONFIDENCE_CAP = DISPLAY_CONFIDENCE_THRESHOLD - 1;
const HTML_STANDALONE_SAFE_CATEGORIES = new Set([
	'accessibility',
	'mobile',
	'module-format',
	'styling-processor',
]);
const HTML_STANDALONE_SAFE_TECHNOLOGY_IDS = new Set([
	'dialog-element',
	'json-ld',
	'speculation-rules',
]);

/**
 * Combine signals without letting many weak matches from one surface become a
 * fake high-confidence claim. The best signal carries full weight, other
 * distinct surfaces help, and repeated matches from the same surface help less.
 */
export function combineEvidenceConfidence(definition: TechnologyDefinition, evidence: Evidence[]): number {
	const sorted = [...evidence].sort((a, b) => b.confidence - a.confidence);
	const [best, ...rest] = sorted;
	if (!best) {
		return 0;
	}

	const seenKinds = new Set<DetectionKind>([best.kind]);
	let score = Math.max(0, best.confidence);

	for (const item of rest) {
		const weight = seenKinds.has(item.kind)
			? ADDITIONAL_SAME_SURFACE_WEIGHT
			: ADDITIONAL_DISTINCT_SURFACE_WEIGHT;
		score += Math.max(0, item.confidence) * weight;
		seenKinds.add(item.kind);
	}

	const combined = clampConfidence(score);
	if (isUnsafeHtmlOnlyDetection(definition, evidence)) {
		return Math.min(combined, HTML_ONLY_PRODUCT_CONFIDENCE_CAP);
	}

	return combined;
}

/** Cap HTML-only product claims unless every category or the technology ID is explicitly safe without another surface. */
function isUnsafeHtmlOnlyDetection(
	definition: TechnologyDefinition,
	evidence: readonly Evidence[],
): boolean {
	return evidence.every((item) => item.kind === 'html')
		&& !HTML_STANDALONE_SAFE_TECHNOLOGY_IDS.has(definition.id)
		&& !definition.categories.every((category) => HTML_STANDALONE_SAFE_CATEGORIES.has(category));
}

/** Keep combined evidence confidence as an integer from zero through 100. */
function clampConfidence(value: number): number {
	return Math.max(0, Math.min(100, Math.round(value)));
}

/** Assign low, medium, high and certain labels after rounding and clamping numeric confidence. */
export function toConfidenceScore(value: number): ConfidenceScore {
	const clamped = clampConfidence(value);
	if (clamped >= 100) {
		return { value: clamped, level: 'certain' };
	}
	if (clamped >= 80) {
		return { value: clamped, level: 'high' };
	}
	if (clamped >= 50) {
		return { value: clamped, level: 'medium' };
	}
	return { value: clamped, level: 'low' };
}
