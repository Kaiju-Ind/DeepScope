import type { TechnologyDefinition } from '../../types';

export const fontFaceRuleTechnologyDefinition = {
	id: "font-face-rule",
	name: "CSS @font-face",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face",
	description: "Declares downloadable fonts through CSS @font-face.",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "font-face-rule:html:0",
			kind: "html",
			pattern: new RegExp("@font-face\\s*\\{", "i"),
			confidence: 100,
			description: "Document CSS contains @font-face.",
		},
		{
			id: "font-face-rule:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("@font-face\\s*\\{", "i"),
			confidence: 100,
			description: "Stylesheet CSS contains @font-face.",
		},
	],
} as const satisfies TechnologyDefinition;
