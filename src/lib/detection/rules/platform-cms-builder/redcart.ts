import type { TechnologyDefinition } from '../../types';

export const redcartTechnologyDefinition = {
	id: "redcart",
	name: "RedCart",
	website: "https://redcart.pl",
	description: "RedCart is an all-in-one ecommerce platform from Poland.",
	icon: "RedCart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "redcart:jsGlobal:0",
			kind: "jsGlobal",
			property: "RC_SHOP_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "redcart:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^rc2c\\-erotica$", "i"),
			description: "Cookie name matches a known technology marker.",
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
