import type { TechnologyDefinition } from '../../types';

export const beamAftersellTechnologyDefinition = {
	id: "beam-aftersell",
	name: "Beam AfterSell",
	website: "https://www.aftersell.com",
	description: "AfterSell is a Shopify app by Beam which helps brands create powerful post purchase offers.",
	icon: "AfterSell.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "beam-aftersell:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.aftersell\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "beam-aftersell:jsGlobal:1",
			kind: "jsGlobal",
			property: "aftersell.hooks",
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
