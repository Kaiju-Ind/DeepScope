import type { TechnologyDefinition } from '../../types';

export const cartComTechnologyDefinition = {
	id: "cart-com",
	name: "Cart.com",
	website: "https://www.americommerce.com",
	description: "Cart.com is an ecommerce platform built for high volume online stores and complex products with features such as multi-store management.",
	icon: "Cart.com.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cart-com:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.americommerce\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cart-com:dom:1",
			kind: "dom",
			selector: "p.AmeriCommerce-powered-by-link > a[href*='.americommerce.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cart-com:jsGlobal:2",
			kind: "jsGlobal",
			property: "AC.storeDomain",
			description: "Page-owned global matches a known technology marker.",
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
