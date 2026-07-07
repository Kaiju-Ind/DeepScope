import type { TechnologyDefinition } from '../../types';

export const nudgifyTechnologyDefinition = {
	id: "nudgify",
	name: "Nudgify",
	website: "https://www.nudgify.com",
	description: "Nudgify is a Social Proof & Fomo App tool that integrates seamlessly with ecommerce platform such as Shopify, WooCommerce and Magento.",
	icon: "Nudgify.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "nudgify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.nudgify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nudgify:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.convertize\\.com\\/nudgify-shopify\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nudgify:jsGlobal:2",
			kind: "jsGlobal",
			property: "nudgify.cart",
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
} as const satisfies TechnologyDefinition;
