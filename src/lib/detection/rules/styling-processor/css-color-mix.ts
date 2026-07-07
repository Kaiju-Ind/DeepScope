import type { TechnologyDefinition } from '../../types';

export const cssColorMixTechnologyDefinition = {
	id: "css-color-mix",
	name: "CSS color-mix()",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix",
	description: "Uses CSS color-mix() for browser-native color interpolation.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "css-color-mix:html:0",
			kind: "html",
			pattern: new RegExp("\\bcolor-mix\\s*\\(", "i"),
			confidence: 95,
			description: "Inline CSS uses color-mix().",
		},
		{
			id: "css-color-mix:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("\\bcolor-mix\\s*\\(", "i"),
			confidence: 100,
			description: "Stylesheet CSS uses color-mix().",
		},
	],
} as const satisfies TechnologyDefinition;
