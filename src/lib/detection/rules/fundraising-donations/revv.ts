import type { TechnologyDefinition } from '../../types';

export const revvTechnologyDefinition = {
	id: "revv",
	name: "Revv",
	website: "https://revv.com",
	description: "Revv is a lead optimisation and donation platform.",
	icon: "Revv.png",
	categories: [
		"fundraising-donations",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
