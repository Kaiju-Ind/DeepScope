import type { TechnologyDefinition } from '../../types';

export const wzshopTechnologyDefinition = {
	id: "wzshop",
	name: "WzShop",
	website: "https://wzshop.com.br",
	description: "WzShop is a SaaS platform for creating online catalogs and storefronts that route orders through WhatsApp and social channels.",
	icon: "WzShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wzshop:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^WzShop$", "i"),
			description: "Meta tag matches a known technology marker.",
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
