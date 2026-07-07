import type { TechnologyDefinition } from '../../types';

export const checkoutChampTechnologyDefinition = {
	id: "checkout-champ",
	name: "Checkout Champ",
	website: "https://checkoutchamp.com",
	description: "Checkout Champ is an ecommerce store optimizer designed to enhance store performance and profitability.",
	icon: "CheckoutChamp.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "checkout-champ:dom:0",
			kind: "dom",
			selector: "a[title*='Powered by CheckoutChamp'], link[href*='checkoutchamp.com/']",
			description: "DOM selector matches a known technology marker.",
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
