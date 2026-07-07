import type { TechnologyDefinition } from '../../types';

export const litHtmlTechnologyDefinition = {
	id: "lit-html",
	name: "lit-html",
	website: "https://lit.dev",
	description: "lit-html is a simple, modern, safe, small and fast HTML templating library for JavaScript.",
	icon: "Lit.svg",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "lit-html:jsGlobal:0",
			kind: "jsGlobal",
			property: "litHtmlVersions.0",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
