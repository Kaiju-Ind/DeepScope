import type { TechnologyDefinition } from '../../types';

export const beamOutsellTechnologyDefinition = {
	id: "beam-outsell",
	name: "Beam OutSell",
	website: "https://apps.shopify.com/outsell",
	description: "OutSell is a Shopify app by Beam. Frequently Bought Together, Discounted Upsell, Also Bought.",
	icon: "Beam.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "beam-outsell:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/outsellapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "beam-outsell:jsGlobal:1",
			kind: "jsGlobal",
			property: "outsellAiRecommendationsIsEnabled",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "beam-outsell:jsGlobal:2",
			kind: "jsGlobal",
			property: "outsellApp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
