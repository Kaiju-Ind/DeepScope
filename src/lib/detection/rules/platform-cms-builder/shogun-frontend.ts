import type { TechnologyDefinition } from '../../types';

export const shogunFrontendTechnologyDefinition = {
	id: "shogun-frontend",
	name: "Shogun Frontend",
	website: "https://getshogun.com/frontend",
	description: "Shogun Frontend is an all-in-one ecommerce frontend platform. Shogun Frontend pairs with leading backends: Shopify, BigCommerce, Magento (Adobe Commerce), and more.",
	icon: "Shogun Frontend.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shogun-frontend:dom:0",
			kind: "dom",
			selector: "img[src*='.shgcdn.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
