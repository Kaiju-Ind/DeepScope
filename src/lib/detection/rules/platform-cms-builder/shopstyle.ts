import type { TechnologyDefinition } from '../../types';

export const shopstyleTechnologyDefinition = {
	id: "shopstyle",
	name: "ShopStyle",
	website: "https://www.shopstyle.com",
	description: "Shopstyle is a fashion and lifestyle search engine and shopping platform that aggregates products from multiple retailers to enable discovery and comparison.",
	icon: "ShopStyle.svg",
	categories: [
		"platform-cms-builder",
		"search",
	],
	rules: [
		{
			id: "shopstyle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ssc\\.shopstyle\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
