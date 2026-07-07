import type { TechnologyDefinition } from '../../types';

export const shoppingfeederTechnologyDefinition = {
	id: "shoppingfeeder",
	name: "ShoppingFeeder",
	website: "https://sfdr.co",
	description: "ShoppingFeeder is a feed management solution for online retailers.",
	icon: "ShoppingFeeder.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "shoppingfeeder:jsGlobal:0",
			kind: "jsGlobal",
			property: "sfdrOrderData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shoppingfeeder:jsGlobal:1",
			kind: "jsGlobal",
			property: "sfdrUniqid",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"magento",
		"opencart",
		"prestashop",
		"shopify",
		"woocommerce",
	],
} as const satisfies TechnologyDefinition;
