import type { TechnologyDefinition } from '../../types';

export const transcyTechnologyDefinition = {
	id: "transcy",
	name: "Transcy",
	website: "https://transcy.io",
	description: "Transcy is a Shopify translation app. Transcy allows you to translate your whole store content into target languages to reach different nation shoppers.",
	icon: "Transcy.png",
	categories: [
		"translations",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "transcy:jsGlobal:0",
			kind: "jsGlobal",
			property: "_transcy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "transcy:jsGlobal:1",
			kind: "jsGlobal",
			property: "transcy_apiURI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "transcy:jsGlobal:2",
			kind: "jsGlobal",
			property: "transcy_shopifyLocales",
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
