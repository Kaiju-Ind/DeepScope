import type { TechnologyDefinition } from '../../types';

export const avanserTechnologyDefinition = {
	id: "avanser",
	name: "Avanser",
	website: "https://www.avanser.com",
	description: "Avanser allow you to track every call and enable your business to make better-informed decisions based on your phone calls.",
	icon: "Avanser.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "avanser:jsGlobal:0",
			kind: "jsGlobal",
			property: "AVANSERjs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "avanser:jsGlobal:1",
			kind: "jsGlobal",
			property: "AvanserCore",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "avanser:jsGlobal:2",
			kind: "jsGlobal",
			property: "AvanserOptions",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
