import type { TechnologyDefinition } from '../../types';

export const knockTechnologyDefinition = {
	id: "knock",
	name: "Knock",
	website: "https://www.knockcrm.com",
	description: "Knock is a platform offering insights into marketing, leasing, and renewals for the real estate sector.",
	icon: "Knock.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "knock:jsGlobal:0",
			kind: "jsGlobal",
			property: "knockDoorway",
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
