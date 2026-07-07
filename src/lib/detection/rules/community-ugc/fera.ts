import type { TechnologyDefinition } from '../../types';

export const feraTechnologyDefinition = {
	id: "fera",
	name: "Fera",
	website: "https://fera.ai/",
	description: "Fera is a product review and social proof application for ecommerce websites.",
	icon: "Fera.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "fera:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.fera\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fera:jsGlobal:1",
			kind: "jsGlobal",
			property: "fera",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
