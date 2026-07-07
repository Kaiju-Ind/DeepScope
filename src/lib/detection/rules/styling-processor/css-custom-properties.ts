import type { TechnologyDefinition } from '../../types';

export const cssCustomPropertiesTechnologyDefinition = {
	id: "css-custom-properties",
	name: "CSS Custom Properties",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/--*",
	description: "Uses CSS custom properties for design tokens, theming, or reusable style values.",
	categories: [
		"styling-processor",
	],
	rules: [
		{
			id: "css-custom-properties:html:0",
			kind: "html",
			pattern: new RegExp("--[A-Za-z0-9_-]+\\s*:|var\\(\\s*--[A-Za-z0-9_-]+", "i"),
			confidence: 80,
			description: "Inline CSS declares or references CSS custom properties.",
		},
		{
			id: "css-custom-properties:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("--[A-Za-z0-9_-]+\\s*:|var\\(\\s*--[A-Za-z0-9_-]+", "i"),
			confidence: 90,
			description: "Stylesheet CSS declares or references CSS custom properties.",
		},
	],
} as const satisfies TechnologyDefinition;
