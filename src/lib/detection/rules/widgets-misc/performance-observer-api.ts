import type { TechnologyDefinition } from '../../types';

/**
 * Captures an active browser capability or document standard from concrete page
 * evidence. These rules intentionally use protocol markers and API calls rather
 * than prose references so the card reflects runtime behavior.
 */
export const performanceObserverApiTechnologyDefinition = {
	id: "performance-observer-api",
	name: "PerformanceObserver API",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver",
	description: "PerformanceObserver streams browser performance entries for analytics, observability, and UX measurement.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "performance-observer-api:scriptContent:0",
			kind: "scriptContent",
			pattern: /\bnew\s+PerformanceObserver\s*\(|\bPerformanceObserver\b/i,
			confidence: 80,
			description: "Bundled script content references PerformanceObserver.",
		},
	],
} as const satisfies TechnologyDefinition;
