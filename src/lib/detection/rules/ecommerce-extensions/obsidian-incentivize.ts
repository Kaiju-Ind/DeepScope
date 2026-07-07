import type { TechnologyDefinition } from '../../types';

export const obsidianIncentivizeTechnologyDefinition = {
	id: "obsidian-incentivize",
	name: "Obsidian Incentivize",
	website: "https://obsidianapps.co",
	description: "Obsidian Incentivize is designed to increase your average order size through in-cart upsells, cross sells and personalised product recommendations.",
	icon: "Obsidian.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "obsidian-incentivize:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shopify\\.com\\/extensions\\/.+\\/([\\.\\d]{3,})\\/assets\\/upsell\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "obsidian-incentivize:jsGlobal:1",
			kind: "jsGlobal",
			property: "Obsidian.IncentiveApi",
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
