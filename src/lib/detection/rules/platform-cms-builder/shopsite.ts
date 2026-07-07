import type { TechnologyDefinition } from '../../types';

export const shopsiteTechnologyDefinition = {
	id: "shopsite",
	name: "ShopSite",
	website: "https://www.shopsite.com",
	description: "ShopSite is a provider of shopping cart software tailored for small to medium-sized businesses.",
	icon: "ShopSite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopsite:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ShopSite Pro (\\d+\\.\\d+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shopsite:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^shopsite pro (\\d+\\.\\d+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:shopsite:shopsite:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
