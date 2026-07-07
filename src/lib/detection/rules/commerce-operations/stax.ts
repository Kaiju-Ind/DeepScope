import type { TechnologyDefinition } from '../../types';

export const staxTechnologyDefinition = {
	id: "stax",
	name: "Stax",
	website: "https://staxpayments.com",
	description: "Stax is a subscription-based platform offering integrated payment technology.",
	icon: "Stax.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "stax:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("staxjs\\.staxpayments\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "stax:jsGlobal:1",
			kind: "jsGlobal",
			property: "StaxJs",
			description: "Page-owned global matches a known technology marker.",
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
