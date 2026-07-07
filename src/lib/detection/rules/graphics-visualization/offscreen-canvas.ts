import type { TechnologyDefinition } from '../../types';

/**
 * Detects OffscreenCanvas from JavaScript references to the browser graphics
 * primitive. The rule avoids generic canvas markup because OffscreenCanvas is a
 * specific worker-friendly rendering API.
 */
export const offscreenCanvasTechnologyDefinition = {
	id: "offscreen-canvas",
	name: "OffscreenCanvas",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas",
	description: "OffscreenCanvas allows canvas rendering to run away from the visible DOM, including inside workers.",
	categories: [
		"graphics-visualization",
		"widgets-misc",
	],
	rules: [
		{
			id: "offscreen-canvas:scriptContent:global",
			kind: "scriptContent",
			pattern: /\bOffscreenCanvas\b|\btransferControlToOffscreen\s*\(/i,
			confidence: 90,
			description: "Bundled script content references OffscreenCanvas rendering primitives.",
		},
	],
} as const satisfies TechnologyDefinition;
