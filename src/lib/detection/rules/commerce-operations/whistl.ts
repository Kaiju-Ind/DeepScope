import type { TechnologyDefinition } from '../../types';

export const whistlTechnologyDefinition = {
	id: "whistl",
	name: "Whistl",
	website: "https://www.whistl.co.uk",
	description: "Whistl is a postal delivery company operating in the United Kingdom.",
	icon: "Whistl.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "whistl:text:0",
			kind: "text",
			pattern: new RegExp("\\bWhistl\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
