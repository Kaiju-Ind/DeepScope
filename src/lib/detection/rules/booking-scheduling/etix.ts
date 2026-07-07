import type { TechnologyDefinition } from '../../types';

export const etixTechnologyDefinition = {
	id: "etix",
	name: "Etix",
	website: "https://hello.etix.com",
	description: "Etix is an international web-based ticketing service provider for the entertainment, travel, and sports industries.",
	icon: "Etix.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "etix:dom:0",
			kind: "dom",
			selector: "a[href*='.etix.com/ticket/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "etix:jsGlobal:1",
			kind: "jsGlobal",
			property: "Etix.javaContext",
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
