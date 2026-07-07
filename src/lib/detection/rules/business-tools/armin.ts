import type { TechnologyDefinition } from '../../types';

export const arminTechnologyDefinition = {
	id: "armin",
	name: "Armin",
	website: "https://chatarmin.com",
	description: "Armin is a customer experience software solution for ecommerce that centralizes interaction data, supports service management, and helps maintain online operations.",
	icon: "Armin.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "armin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.chatarmin\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
