import type { TechnologyDefinition } from '../../types';

export const variableFontsTechnologyDefinition = {
	id: "variable-fonts",
	name: "Variable Fonts",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide",
	description: "Uses CSS variable font controls such as font-variation-settings or optical sizing.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "variable-fonts:html:0",
			kind: "html",
			pattern: new RegExp("\\b(?:font-variation-settings|font-optical-sizing)\\s*:", "i"),
			confidence: 95,
			description: "Inline CSS uses variable font controls.",
		},
		{
			id: "variable-fonts:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("\\b(?:font-variation-settings|font-optical-sizing)\\s*:", "i"),
			confidence: 100,
			description: "Stylesheet CSS uses variable font controls.",
		},
	],
} as const satisfies TechnologyDefinition;
