import type { TechnologyDefinition } from '../../types';

export const newoTechnologyDefinition = {
	id: "newo",
	name: "Newo",
	website: "https://newo.ai",
	description: "Newo is an AI platform offering automated solutions for sales, reception, and concierge services across various industries.",
	icon: "Newo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "newo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.newo\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
