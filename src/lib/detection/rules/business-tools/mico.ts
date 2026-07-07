import type { TechnologyDefinition } from '../../types';

export const micoTechnologyDefinition = {
	id: "mico",
	name: "Mico",
	website: "https://mico-inc.com",
	description: "Mico is a customer relationship management platform that supports personalized, continuous communication between businesses and customers and includes tools to improve brand visibility across search engines and AI-driven platforms.",
	icon: "Mico.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "mico:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mico-cloud\\.jp\\/"),
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
