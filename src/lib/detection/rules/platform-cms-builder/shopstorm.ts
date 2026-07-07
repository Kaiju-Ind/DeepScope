import type { TechnologyDefinition } from '../../types';

export const shopstormTechnologyDefinition = {
	id: "shopstorm",
	name: "ShopStorm",
	website: "https://shopstorm.com",
	description: "ShopStorm is an ecommerce platform that offers a suite of apps designed to enhance functionality and user experience on Shopify stores.",
	icon: "ShopStorm.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopstorm:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.shopstorm\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
