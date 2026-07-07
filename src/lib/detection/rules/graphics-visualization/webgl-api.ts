import type { TechnologyDefinition } from '../../types';

/**
 * Detects WebGL from context acquisition and WebGL globals. This keeps the card
 * tied to graphics runtime behavior rather than incidental `webgl` text in
 * documentation or asset names.
 */
export const webglApiTechnologyDefinition = {
	id: "webgl-api",
	name: "WebGL API",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API",
	description: "WebGL exposes hardware-accelerated 2D and 3D rendering through an OpenGL ES style browser API.",
	categories: [
		"graphics-visualization",
		"widgets-misc",
	],
	rules: [
		{
			id: "webgl-api:scriptContent:context",
			kind: "scriptContent",
			pattern: /getContext\s*\(\s*[`"']webgl2?[`"']|\bWebGL(?:2)?RenderingContext\b/i,
			confidence: 90,
			description: "Bundled script content acquires or references a WebGL rendering context.",
		},
	],
} as const satisfies TechnologyDefinition;
