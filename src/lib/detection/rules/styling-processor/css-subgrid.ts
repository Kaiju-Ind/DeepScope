import type { TechnologyDefinition } from '../../types';

/**
 * Detects a modern CSS capability from inline or captured stylesheet content.
 * The HTML rule handles critical inline styles while the stylesheet rule covers
 * external CSS fetched during page load.
 */
export const cssSubgridTechnologyDefinition = {
	id: "css-subgrid",
	name: "CSS Subgrid",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid",
	description: "CSS Subgrid lets nested grid items align to tracks defined by a parent grid.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "css-subgrid:html:0",
			kind: "html",
			pattern: /\bsubgrid\b/i,
			confidence: 75,
			description: "Inline document styles use CSS Subgrid.",
		},
		{
			id: "css-subgrid:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: /\bsubgrid\b/i,
			confidence: 90,
			description: "Captured stylesheet content uses CSS Subgrid.",
		},
	],
} as const satisfies TechnologyDefinition;
