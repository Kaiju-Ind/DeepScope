import type { TechnologyDefinition } from '../../types';

export const beyonkTechnologyDefinition = {
	id: "beyonk",
	name: "Beyonk",
	website: "https://beyonk.com",
	description: "Beyonk is an online ticketing software that provides EPOS and booking management solutions for businesses.",
	icon: "Beyonk.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "beyonk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.beyonk\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
