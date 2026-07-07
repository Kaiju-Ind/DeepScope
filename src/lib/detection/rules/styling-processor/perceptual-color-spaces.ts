import type { TechnologyDefinition } from '../../types';

export const perceptualColorSpacesTechnologyDefinition = {
	id: "perceptual-color-spaces",
	name: "OKLCH / OKLAB Colors",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch",
	description: "Uses modern perceptual CSS color functions such as oklch() or oklab().",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "perceptual-color-spaces:html:0",
			kind: "html",
			pattern: new RegExp("\\b(?:oklch|oklab)\\s*\\(", "i"),
			confidence: 95,
			description: "Inline CSS uses OKLCH or OKLAB colors.",
		},
		{
			id: "perceptual-color-spaces:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("\\b(?:oklch|oklab)\\s*\\(", "i"),
			confidence: 100,
			description: "Stylesheet CSS uses OKLCH or OKLAB colors.",
		},
	],
} as const satisfies TechnologyDefinition;
