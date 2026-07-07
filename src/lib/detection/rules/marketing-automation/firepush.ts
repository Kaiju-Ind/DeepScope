import type { TechnologyDefinition } from '../../types';

export const firepushTechnologyDefinition = {
	id: "firepush",
	name: "Firepush",
	website: "https://getfirepush.com",
	description: "Firepush is an omnichannel marketing app that helps Shopify stores to drive sales with automated web push, email and SMS campaigns.",
	icon: "Firepush.svg",
	categories: [
		"marketing-automation",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "firepush:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.firepush\\.\\w+"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "firepush:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("fpcdn\\.me\\/.+shopify"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "firepush:dom:2",
			kind: "dom",
			selector: "link[href*='cdn.firepush.net']",
			description: "DOM selector matches a known technology marker.",
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
		"shopify",
	],
} as const satisfies TechnologyDefinition;
