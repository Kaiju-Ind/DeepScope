import type { TechnologyDefinition } from '../../types';

export const shopwiredTechnologyDefinition = {
	id: "shopwired",
	name: "ShopWired",
	website: "https://www.shopwired.co.uk",
	description: "ShopWired is an UK based, fully hosted ecommerce platform that is focused on the UK market.",
	icon: "ShopWired.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopwired:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.amazonaws\\.com\\/shopwired-theme-assets\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
