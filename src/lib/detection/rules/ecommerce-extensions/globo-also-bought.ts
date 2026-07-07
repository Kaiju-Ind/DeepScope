import type { TechnologyDefinition } from '../../types';

export const globoAlsoBoughtTechnologyDefinition = {
	id: "globo-also-bought",
	name: "Globo Also Bought",
	website: "https://apps.shopify.com/globo-related-products",
	description: "Also Bought is a conversion Shopify app by Globo.",
	icon: "Globo apps.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "globo-also-bought:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\/globo\\.alsobought\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
