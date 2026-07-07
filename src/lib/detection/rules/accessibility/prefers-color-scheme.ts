import type { TechnologyDefinition } from '../../types';

export const prefersColorSchemeTechnologyDefinition = {
	id: "prefers-color-scheme",
	name: "prefers-color-scheme",
	website: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme",
	description: "Uses the prefers-color-scheme media feature to adapt to light or dark user preferences.",
	categories: [
		"accessibility",
		"styling-processor",
	],
	rules: [
		{
			id: "prefers-color-scheme:html:0",
			kind: "html",
			pattern: new RegExp("@media\\s*\\([^)]*prefers-color-scheme\\s*:", "i"),
			confidence: 95,
			description: "Inline CSS uses prefers-color-scheme.",
		},
		{
			id: "prefers-color-scheme:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("@media\\s*\\([^)]*prefers-color-scheme\\s*:", "i"),
			confidence: 100,
			description: "Stylesheet CSS uses prefers-color-scheme.",
		},
	],
} as const satisfies TechnologyDefinition;
