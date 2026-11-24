import type { DetectionResult } from './types';

/**
 * Compare two emitted technologies for user-facing prominence.
 *
 * The registry does not define business impact or surprise scores. DeepScope
 * therefore ranks only evidence it actually owns: confidence, directness, and
 * evidence count. Stable name ordering keeps the result deterministic.
 */
export function compare(left: DetectionResult, right: DetectionResult): number {
	return right.confidence.value - left.confidence.value
		|| Number(Boolean(left.inferred)) - Number(Boolean(right.inferred))
		|| right.evidence.length - left.evidence.length
		|| left.name.localeCompare(right.name);
}

/** Return emitted technologies ordered from strongest to weakest current evidence. */
export function sort(results: readonly DetectionResult[]): DetectionResult[] {
	return [...results].sort(compare);
}

/** Return the strongest current emitted technology without sorting the whole result set. */
export function best(results: readonly DetectionResult[]): DetectionResult | undefined {
	let best: DetectionResult | undefined;
	for (const result of results) {
		if (!best || compare(result, best) < 0) best = result;
	}
	return best;
}
