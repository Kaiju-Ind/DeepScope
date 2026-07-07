import type { TechnologyDefinition } from '../../types';

export const bitespeedTechnologyDefinition = {
	id: "bitespeed",
	name: "BiteSpeed",
	website: "https://www.bitespeed.co",
	description: "BiteSpeed is an all-in-one Shopify marketing app which helps ecommerce brands recover revenue.",
	icon: "BiteSpeed.png",
	categories: [
		"ecommerce-extensions",
		"commerce-operations",
	],
	rules: [
		{
			id: "bitespeed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.bitespeed\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bitespeed:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.bitespeed\\.co\\/"),
			description: "Script content contains a bounded technology signature.",
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
