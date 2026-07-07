import type { TechnologyDefinition } from '../../types';

export const blackcartTechnologyDefinition = {
	id: "blackcart",
	name: "Blackcart",
	website: "https://blackcart.co",
	description: "Blackcart is a try-before-you-buy platform that enables customers to test products at home before completing a purchase.",
	icon: "Blackcart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "blackcart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.blackcart\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blackcart:jsGlobal:1",
			kind: "jsGlobal",
			property: "BlackCartShopify",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
