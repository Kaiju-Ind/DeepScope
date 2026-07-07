import type { TechnologyDefinition } from '../../types';

export const privyAppTechnologyDefinition = {
	id: "privy-app",
	name: "Privy App",
	website: "https://apps.shopify.com/privy",
	description: "Privy App helps you improve your website conversion rate, grow your email list, automate your email marketing, drive repeat purchases and much more.",
	icon: "Privy.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "privy-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/shopify\\.privy\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
	implies: [
		"privy",
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
