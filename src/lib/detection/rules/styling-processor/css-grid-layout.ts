import type { TechnologyDefinition } from '../../types';

export const cssGridLayoutTechnologyDefinition = {
	id: "css-grid-layout",
	name: "CSS Grid Layout",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
	description: "Uses CSS Grid layout declarations.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "css-grid-layout:html:display-grid",
			kind: "html",
			pattern: new RegExp("display\\s*:\\s*(?:inline-)?grid\\b", "i"),
			confidence: 95,
			description: "Inline CSS uses CSS Grid layout.",
		},
		{
			id: "css-grid-layout:stylesheetContent:display-grid",
			kind: "stylesheetContent",
			pattern: new RegExp("display\\s*:\\s*(?:inline-)?grid\\b", "i"),
			confidence: 100,
			description: "Stylesheet CSS uses CSS Grid layout.",
		},
		{
			id: "css-grid-layout:html:grid-properties",
			kind: "html",
			pattern: new RegExp("\\bgrid-(?:template(?:-(?:columns|rows|areas))?|auto-(?:columns|rows|flow)|column|row|area|gap)\\s*:", "i"),
			confidence: 75,
			description: "Inline CSS uses CSS Grid-specific properties.",
		},
		{
			id: "css-grid-layout:stylesheetContent:grid-properties",
			kind: "stylesheetContent",
			pattern: new RegExp("\\bgrid-(?:template(?:-(?:columns|rows|areas))?|auto-(?:columns|rows|flow)|column|row|area|gap)\\s*:", "i"),
			confidence: 85,
			description: "Stylesheet CSS uses CSS Grid-specific properties.",
		},
	],
} as const satisfies TechnologyDefinition;
