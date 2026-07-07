import type { TechnologyDefinition } from '../../types';

/**
 * Detects a modern CSS capability from inline or captured stylesheet content.
 * The HTML rule handles critical inline styles while the stylesheet rule covers
 * external CSS fetched during page load.
 */
export const cssContentVisibilityTechnologyDefinition = {
	id: "css-content-visibility",
	name: "CSS content-visibility",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility",
	description: "CSS content-visibility allows browsers to skip rendering work for off-screen or hidden content.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "css-content-visibility:html:0",
			kind: "html",
			pattern: /\bcontent-visibility\s*:/i,
			confidence: 75,
			description: "Inline document styles use CSS content-visibility.",
		},
		{
			id: "css-content-visibility:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: /\bcontent-visibility\s*:/i,
			confidence: 90,
			description: "Captured stylesheet content uses CSS content-visibility.",
		},
	],
} as const satisfies TechnologyDefinition;
