import type { ResourceSignal } from "@deepscope/detection/types";
import { SOURCE_LIMITS } from "@deepscope/detection/limits";

/** Convert a finite Performance Timeline entry set into bounded resource signals. */
export function collectResourceEntries(entries: Iterable<PerformanceEntry>): ResourceSignal[] {
	const resources: ResourceSignal[] = [];
	const seenUrls = new Set<string>();

	for (const entry of entries) {
		if (!entry.name || seenUrls.has(entry.name)) continue;

		seenUrls.add(entry.name);
		resources.push({
			url: entry.name,
			initiatorType: isPerformanceResourceTiming(entry) ? entry.initiatorType : undefined,
		});

		if (resources.length >= SOURCE_LIMITS.resourceUrls) break;
	}

	return resources;
}

/** Return the bounded resource signals already present in the page Performance Timeline. */
export function collectResourceTimings(): ResourceSignal[] {
	if (!('performance' in globalThis) || typeof globalThis.performance.getEntriesByType !== 'function') return [];
	return collectResourceEntries(globalThis.performance.getEntriesByType('resource'));
}

/** Recognize resource timing entries by their resource-only initiator field across browser realms. */
function isPerformanceResourceTiming(entry: PerformanceEntry): entry is PerformanceResourceTiming {
	return 'initiatorType' in entry;
}

/** Project a resource URL and initiator type into request-shaped evidence without inventing headers or HTTP details. */
export function resourceToRequestSignal(resource: ResourceSignal) {
	return {
		url: resource.url,
		type: resource.initiatorType,
	};
}
