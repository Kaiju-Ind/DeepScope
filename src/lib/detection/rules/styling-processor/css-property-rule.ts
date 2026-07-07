import type { TechnologyDefinition } from '../../types';

/**
 * Detects a modern CSS capability from inline or captured stylesheet content.
 * The HTML rule handles critical inline styles while the stylesheet rule covers
 * external CSS fetched during page load.
 */
export const cssPropertyRuleTechnologyDefinition = {
	id: "css-property-rule",
	name: "CSS @property",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/@property",
	description: "CSS @property registers typed custom properties so browsers can animate and validate design tokens.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "css-property-rule:html:0",
			kind: "html",
			pattern: /@property\s+--[A-Za-z0-9_-]+/i,
			confidence: 75,
			description: "Inline document styles use CSS @property.",
		},
		{
			id: "css-property-rule:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: /@property\s+--[A-Za-z0-9_-]+/i,
			confidence: 90,
			description: "Captured stylesheet content uses CSS @property.",
		},
	],
} as const satisfies TechnologyDefinition;
