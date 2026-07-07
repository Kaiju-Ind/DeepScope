import type { TechnologyDefinition } from '../../types';

export const everflowTechnologyDefinition = {
	id: "everflow",
	name: "Everflow",
	website: "https://www.everflow.io",
	description: "Everflow is a partner marketing platform for affiliate, influencer, and referral tracking.",
	icon: "Everflow.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "everflow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("everflow\\.js"),
			description: "Script source URL matches a known technology marker.",
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
