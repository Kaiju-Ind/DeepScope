import type { TechnologyDefinition } from '../../types';

export const colorSchemeTechnologyDefinition = {
	id: "color-scheme",
	name: "Color Scheme",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/color-scheme",
	description: "Declares supported light and dark color schemes for browser chrome and form controls.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "color-scheme:meta:0",
			kind: "meta",
			key: "color-scheme",
			confidence: 100,
			description: "Document declares a color-scheme meta tag.",
		},
		{
			id: "color-scheme:html:css-property",
			kind: "html",
			pattern: new RegExp("color-scheme\\s*:", "i"),
			confidence: 70,
			description: "Inline CSS declares color-scheme.",
		},
		{
			id: "color-scheme:stylesheetContent:css-property",
			kind: "stylesheetContent",
			pattern: new RegExp("color-scheme\\s*:", "i"),
			confidence: 70,
			description: "Stylesheet CSS declares color-scheme.",
		},
	],
} as const satisfies TechnologyDefinition;
