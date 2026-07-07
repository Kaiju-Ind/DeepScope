import type { TechnologyDefinition } from '../../types';

export const savvycalTechnologyDefinition = {
	id: "savvycal",
	name: "SavvyCal",
	website: "https://savvycal.com",
	description: "SavvyCal is a meeting scheduling tool.",
	icon: "SavvyCal.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "savvycal:jsGlobal:0",
			kind: "jsGlobal",
			property: "SavvyCal",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
