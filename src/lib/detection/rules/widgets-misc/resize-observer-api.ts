import type { TechnologyDefinition } from '../../types';

/**
 * Captures an active browser capability or document standard from concrete page
 * evidence. These rules intentionally use protocol markers and API calls rather
 * than prose references so the card reflects runtime behavior.
 */
export const resizeObserverApiTechnologyDefinition = {
	id: "resize-observer-api",
	name: "ResizeObserver API",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver",
	description: "ResizeObserver lets scripts respond to element box-size changes without polling layout.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "resize-observer-api:scriptContent:0",
			kind: "scriptContent",
			pattern: /\bnew\s+ResizeObserver\s*\(|\bResizeObserver\b/i,
			confidence: 80,
			description: "Bundled script content references ResizeObserver.",
		},
	],
} as const satisfies TechnologyDefinition;
