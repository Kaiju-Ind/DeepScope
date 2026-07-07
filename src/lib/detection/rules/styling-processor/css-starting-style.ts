import type { TechnologyDefinition } from '../../types';

/**
 * Detects a modern CSS capability from inline or captured stylesheet content.
 * The HTML rule handles critical inline styles while the stylesheet rule covers
 * external CSS fetched during page load.
 */
export const cssStartingStyleTechnologyDefinition = {
	id: "css-starting-style",
	name: "CSS @starting-style",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style",
	description: "CSS @starting-style provides before-change styles for entry transitions on newly rendered elements.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "css-starting-style:html:0",
			kind: "html",
			pattern: /@starting-style\b/i,
			confidence: 75,
			description: "Inline document styles use CSS @starting-style.",
		},
		{
			id: "css-starting-style:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: /@starting-style\b/i,
			confidence: 90,
			description: "Captured stylesheet content uses CSS @starting-style.",
		},
	],
} as const satisfies TechnologyDefinition;
