import type { TechnologyDefinition } from '../../types';

export const shopfloTechnologyDefinition = {
	id: "shopflo",
	name: "Shopflo",
	website: "https://shopflo.com",
	description: "Shopflo is a platform that enables easy checkout experience for ecommerce brands.",
	icon: "Shopflo.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "shopflo:jsGlobal:0",
			kind: "jsGlobal",
			property: "Shopflo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
