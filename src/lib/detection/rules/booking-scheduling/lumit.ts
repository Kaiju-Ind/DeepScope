import type { TechnologyDefinition } from '../../types';

export const lumitTechnologyDefinition = {
	id: "lumit",
	name: "Lumit",
	website: "https://lumit.app/se",
	description: "Lumit is an online ordering system for restaurants.",
	icon: "Lumit.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "lumit:dom:0",
			kind: "dom",
			selector: "iframe[src*='.lumit.se']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "lumit:jsGlobal:1",
			kind: "jsGlobal",
			property: "injectLumit",
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
