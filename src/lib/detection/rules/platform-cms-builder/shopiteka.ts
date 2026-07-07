import type { TechnologyDefinition } from '../../types';

export const shopitekaTechnologyDefinition = {
	id: "shopiteka",
	name: "Shopiteka",
	website: "https://www.shopiteka.com",
	description: "Shopiteka is an online shop that provides a platform for browsing products, managing purchases, and completing orders through a web-based storefront.",
	icon: "Shopiteka.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopiteka:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/shopiteka\\.lt\\/_shopi\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
