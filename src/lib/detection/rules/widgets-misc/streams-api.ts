import type { TechnologyDefinition } from '../../types';

/**
 * Captures an active browser capability or document standard from concrete page
 * evidence. These rules intentionally use protocol markers and API calls rather
 * than prose references so the card reflects runtime behavior.
 */
export const streamsApiTechnologyDefinition = {
	id: "streams-api",
	name: "Streams API",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/Streams_API",
	description: "The Streams API processes chunks of data as they arrive instead of waiting for a full payload.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "streams-api:scriptContent:0",
			kind: "scriptContent",
			pattern: /\b(?:ReadableStream|WritableStream|TransformStream)\b/i,
			confidence: 80,
			description: "Bundled script content references browser stream primitives.",
		},
	],
} as const satisfies TechnologyDefinition;
