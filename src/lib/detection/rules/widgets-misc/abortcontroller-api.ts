import type { TechnologyDefinition } from '../../types';

/**
 * Captures an active browser capability or document standard from concrete page
 * evidence. These rules intentionally use protocol markers and API calls rather
 * than prose references so the card reflects runtime behavior.
 */
export const abortControllerApiTechnologyDefinition = {
	id: "abortcontroller-api",
	name: "AbortController API",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
	description: "AbortController lets scripts cancel fetches, streams, and other abortable asynchronous work.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "abortcontroller-api:scriptContent:0",
			kind: "scriptContent",
			pattern: /\bnew\s+AbortController\s*\(|\bAbortSignal\b/i,
			confidence: 80,
			description: "Bundled script content references abortable browser APIs.",
		},
	],
} as const satisfies TechnologyDefinition;
