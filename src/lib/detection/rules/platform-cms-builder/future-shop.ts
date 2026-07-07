import type { TechnologyDefinition } from '../../types';

export const futureShopTechnologyDefinition = {
	id: "future-shop",
	name: "Future Shop",
	website: "https://www.future-shop.jp",
	description: "Future Shop is a SaaS-based ecommerce platform.",
	icon: "futureshop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "future-shop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("future-shop.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
