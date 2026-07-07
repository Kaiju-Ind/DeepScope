import type { TechnologyDefinition } from '../../types';

/**
 * Detects a modern CSS capability from inline or captured stylesheet content.
 * The HTML rule handles critical inline styles while the stylesheet rule covers
 * external CSS fetched during page load.
 */
export const cssHasSelectorTechnologyDefinition = {
	id: "css-has-selector",
	name: "CSS :has() Selector",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/:has",
	description: "The CSS :has() selector styles an element based on descendants or relational selector matches.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "css-has-selector:html:0",
			kind: "html",
			pattern: /:has\s*\(/i,
			confidence: 75,
			description: "Inline document styles use CSS :has() Selector.",
		},
		{
			id: "css-has-selector:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: /:has\s*\(/i,
			confidence: 90,
			description: "Captured stylesheet content uses CSS :has() Selector.",
		},
	],
} as const satisfies TechnologyDefinition;
