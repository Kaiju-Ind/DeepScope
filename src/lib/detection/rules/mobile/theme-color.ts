import type { TechnologyDefinition } from '../../types';

export const themeColorTechnologyDefinition = {
	id: "theme-color",
	name: "Theme Color",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/theme-color",
	description: "Declares a browser UI theme color for the current document.",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "theme-color:meta:0",
			kind: "meta",
			key: "theme-color",
			confidence: 100,
			description: "Document declares a theme-color meta tag.",
		},
	],
} as const satisfies TechnologyDefinition;
