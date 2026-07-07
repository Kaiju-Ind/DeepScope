import type { TechnologyDefinition } from '../../types';

export const deunaTechnologyDefinition = {
	id: "deuna",
	name: "DEUNA",
	website: "https://www.deuna.com",
	description: "DEUNA is an AI-powered platform that orchestrates global payments and enhances commerce performance.",
	icon: "DEUNA.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "deuna:jsGlobal:0",
			kind: "jsGlobal",
			property: "DeunaCDL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "deuna:jsGlobal:1",
			kind: "jsGlobal",
			property: "DunaCheckout",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
