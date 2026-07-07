import type { TechnologyDefinition } from '../../types';

export const effiliationTechnologyDefinition = {
	id: "effiliation",
	name: "Effiliation",
	website: "https://www.effiliation.com",
	description: "Effiliation is a performance marketing platform and affiliate network that facilitates partnerships between advertisers and publishers for commission-based promotion of products and services.",
	icon: "Effiliation.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "effiliation:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.effiliation\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
