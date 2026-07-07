import type { TechnologyDefinition } from '../../types';

export const froonzeTechnologyDefinition = {
	id: "froonze",
	name: "Froonze",
	website: "https://www.froonze.com",
	description: "Froonze is a modular Shopify app that enhances the customer account page with features like wishlists, loyalty programs, and social logins.",
	icon: "Froonze.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "froonze:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shopify\\.com\\/extensions\\/[^/]+\\/froonze-loyalty-wishlist[^/]*"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "froonze:jsGlobal:1",
			kind: "jsGlobal",
			property: "frcp.httpsUrl",
			valuePattern: new RegExp("app\\.froonze\\.com"),
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
		"shopify",
	],
} as const satisfies TechnologyDefinition;
