import type { TechnologyDefinition } from '../../types';

export const kiwiSizingTechnologyDefinition = {
	id: "kiwi-sizing",
	name: "Kiwi Sizing",
	website: "https://www.kiwisizing.com",
	description: "Kiwi Sizing is a size chart and a recommender plugin on the Shopify platform.",
	icon: "Kiwi Sizing.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "kiwi-sizing:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.static\\.kiwisizing\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kiwi-sizing:jsGlobal:1",
			kind: "jsGlobal",
			property: "KiwiSizing",
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
} as const satisfies TechnologyDefinition;
