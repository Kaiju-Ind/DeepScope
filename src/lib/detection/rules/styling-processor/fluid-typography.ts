import type { TechnologyDefinition } from '../../types';

export const fluidTypographyTechnologyDefinition = {
	id: "fluid-typography",
	name: "Fluid Typography",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/clamp",
	description: "Uses clamp-based font sizing or viewport-based typography that scales across screen sizes.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "fluid-typography:html:clamp-font-size",
			kind: "html",
			pattern: new RegExp("font-size\\s*:\\s*clamp\\(", "i"),
			confidence: 85,
			description: "Inline CSS uses clamp() for font sizing.",
		},
		{
			id: "fluid-typography:stylesheetContent:clamp-font-size",
			kind: "stylesheetContent",
			pattern: new RegExp("font-size\\s*:\\s*clamp\\(", "i"),
			confidence: 95,
			description: "Stylesheet CSS uses clamp() for font sizing.",
		},
	],
} as const satisfies TechnologyDefinition;
