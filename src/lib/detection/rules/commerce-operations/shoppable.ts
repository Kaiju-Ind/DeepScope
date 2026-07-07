import type { TechnologyDefinition } from '../../types';

export const shoppableTechnologyDefinition = {
	id: "shoppable",
	name: "Shoppable",
	website: "https://about.shoppable.com",
	description: "Shoppable is a multi-retailer checkout technology.",
	icon: "Shoppable.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "shoppable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.shoppable\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shoppable:jsGlobal:1",
			kind: "jsGlobal",
			property: "ShoppableApi",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
