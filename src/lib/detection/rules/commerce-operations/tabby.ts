import type { TechnologyDefinition } from '../../types';

export const tabbyTechnologyDefinition = {
	id: "tabby",
	name: "Tabby",
	website: "https://tabby.ai/",
	description: "Tabby is a Buy now pay later solution from Middle East.",
	icon: "Tabby.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "tabby:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("checkout\\.tabby\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tabby:jsGlobal:1",
			kind: "jsGlobal",
			property: "Tabby",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tabby:jsGlobal:2",
			kind: "jsGlobal",
			property: "TabbyPromo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
