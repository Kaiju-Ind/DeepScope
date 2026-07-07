import type { TechnologyDefinition } from '../../types';

export const easyHidePaypalTechnologyDefinition = {
	id: "easy-hide-paypal",
	name: "Easy Hide PayPal",
	website: "https://apps.shopify.com/easyhide",
	description: "Easy Hide PayPal hides PayPal button from product page, cart and checkout but keep PayPal as payment option in checkout.",
	icon: "Easy Hide PayPal.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "easy-hide-paypal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("easyhide\\.herculesapps\\.com\\/"),
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
