import type { TechnologyDefinition } from '../../types';

export const kilatechTechnologyDefinition = {
	id: "kilatech",
	name: "Kilatech",
	website: "https://web.kilatechapps.com",
	description: "Kilatech is a Shopify ecommerce application builder.",
	icon: "Kilatech.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "kilatech:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.kilatechapps\\.com\\/"),
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
