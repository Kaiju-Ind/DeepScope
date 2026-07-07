import type { TechnologyDefinition } from '../../types';

/**
 * Captures an active browser capability or document standard from concrete page
 * evidence. These rules intentionally use protocol markers and API calls rather
 * than prose references so the card reflects runtime behavior.
 */
export const mutationObserverApiTechnologyDefinition = {
	id: "mutation-observer-api",
	name: "MutationObserver API",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver",
	description: "MutationObserver lets scripts react to DOM tree and attribute changes without polling.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "mutation-observer-api:scriptContent:0",
			kind: "scriptContent",
			pattern: /\bnew\s+MutationObserver\s*\(|\bMutationObserver\b/i,
			confidence: 80,
			description: "Bundled script content references MutationObserver.",
		},
	],
} as const satisfies TechnologyDefinition;
