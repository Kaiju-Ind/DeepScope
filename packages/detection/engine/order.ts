import type { DetectionResult } from "../types.ts";

/** Create the output ordering: strongest confidence first, then registry position, then display name. */
export function compareDetectionResults(registryOrderById: Map<string, number>) {
	return (a: DetectionResult, b: DetectionResult): number =>
		b.confidence.value - a.confidence.value ||
		(registryOrderById.get(a.technologyId) ?? Number.MAX_SAFE_INTEGER) -
			(registryOrderById.get(b.technologyId) ?? Number.MAX_SAFE_INTEGER) ||
		a.name.localeCompare(b.name);
}
