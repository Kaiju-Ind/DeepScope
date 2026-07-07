import type { TechnologyDefinition } from '../../types';

export const affiloTechnologyDefinition = {
	id: "affilo",
	name: "Affilo",
	website: "https://affilo.io",
	description: "Affilo is an all-in-one solution for referrals and affiliate marketing.",
	icon: "Affilo.png",
	categories: [
		"advertising-paid-media",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "affilo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/affilo\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
