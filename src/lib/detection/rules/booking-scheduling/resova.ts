import type { TechnologyDefinition } from '../../types';

export const resovaTechnologyDefinition = {
	id: "resova",
	name: "Resova",
	website: "https://resova.com",
	description: "Resova is an online booking software.",
	icon: "Resova.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "resova:dom:0",
			kind: "dom",
			selector: "a[href*='.resova.']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "resova:jsGlobal:1",
			kind: "jsGlobal",
			property: "baseUrl",
			valuePattern: new RegExp("\\.resova\\.(?:us|eu|co\\.uk)"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "resova:jsGlobal:2",
			kind: "jsGlobal",
			property: "initResova",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
