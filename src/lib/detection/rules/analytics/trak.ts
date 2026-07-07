import type { TechnologyDefinition } from '../../types';

export const trakTechnologyDefinition = {
	id: "trak",
	name: "Trak",
	website: "https://www.trak.io",
	description: "Trak is a customer analytics platform designed for startups.",
	icon: "Trak.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "trak:jsGlobal:0",
			kind: "jsGlobal",
			property: "trak.custom_event",
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
