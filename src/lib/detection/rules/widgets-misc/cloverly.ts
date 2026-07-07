import type { TechnologyDefinition } from '../../types';

export const cloverlyTechnologyDefinition = {
	id: "cloverly",
	name: "Cloverly",
	website: "https://www.cloverly.com",
	description: "Cloverly is an API integration for ethical ecommerce brands to help their customers offset the carbon footprint of their online transactions.",
	icon: "Cloverly.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "cloverly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("apps\\.cloverly\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cloverly:jsGlobal:1",
			kind: "jsGlobal",
			property: "removeCloverly",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
