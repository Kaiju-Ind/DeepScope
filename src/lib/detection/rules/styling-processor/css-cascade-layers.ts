import type { TechnologyDefinition } from '../../types';

/**
 * Detects a modern CSS capability from inline or captured stylesheet content.
 * The HTML rule handles critical inline styles while the stylesheet rule covers
 * external CSS fetched during page load.
 */
export const cssCascadeLayersTechnologyDefinition = {
	id: "css-cascade-layers",
	name: "CSS Cascade Layers",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/@layer",
	description: "CSS Cascade Layers organize style precedence through named or anonymous cascade layers.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "css-cascade-layers:html:0",
			kind: "html",
			pattern: /@layer\s+(?:[A-Za-z0-9_-]+|\{)/i,
			confidence: 75,
			description: "Inline document styles use CSS Cascade Layers.",
		},
		{
			id: "css-cascade-layers:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: /@layer\s+(?:[A-Za-z0-9_-]+|\{)/i,
			confidence: 90,
			description: "Captured stylesheet content uses CSS Cascade Layers.",
		},
	],
} as const satisfies TechnologyDefinition;
