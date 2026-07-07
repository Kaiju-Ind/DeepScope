import type { TechnologyDefinition } from '../../types';

export const litElementTechnologyDefinition = {
	id: "lit-element",
	name: "lit-element",
	website: "https://lit.dev",
	description: "lit-element is a simple base class for creating web components that work in any web page with any framework. lit-element uses lit-html to render into shadow DOM, and adds API to manage properties and attributes.",
	icon: "Lit.svg",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "lit-element:jsGlobal:0",
			kind: "jsGlobal",
			property: "litElementVersions.0",
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
