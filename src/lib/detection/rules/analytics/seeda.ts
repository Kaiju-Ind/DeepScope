import type { TechnologyDefinition } from '../../types';

export const seedaTechnologyDefinition = {
	id: "seeda",
	name: "Seeda",
	website: "https://www.seeda.io",
	description: "Seeda is an AI-powered analytics platform for ecommerce growth.",
	icon: "Seeda.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "seeda:jsGlobal:0",
			kind: "jsGlobal",
			property: "seedaEvent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "seeda:jsGlobal:1",
			kind: "jsGlobal",
			property: "seedaLink",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "seeda:jsGlobal:2",
			kind: "jsGlobal",
			property: "seedaPageView",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
