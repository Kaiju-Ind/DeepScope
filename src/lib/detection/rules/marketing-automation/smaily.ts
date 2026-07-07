import type { TechnologyDefinition } from '../../types';

export const smailyTechnologyDefinition = {
	id: "smaily",
	name: "Smaily",
	website: "https://smaily.com",
	description: "Smaily is an email marketing and automation solution.",
	icon: "Smaily.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "smaily:dom:0",
			kind: "dom",
			selector: "form[action*='.sendsmaily.net/api/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
