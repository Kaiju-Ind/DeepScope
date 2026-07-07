import type { TechnologyDefinition } from '../../types';

export const convertimTechnologyDefinition = {
	id: "convertim",
	name: "Convertim",
	website: "https://www.convertim.com",
	description: "Convertim is an ecommerce checkout platform.",
	icon: "Convertim.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "convertim:jsGlobal:0",
			kind: "jsGlobal",
			property: "convertimSetup",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
