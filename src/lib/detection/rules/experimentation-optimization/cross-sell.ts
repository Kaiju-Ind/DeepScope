import type { TechnologyDefinition } from '../../types';

export const crossSellTechnologyDefinition = {
	id: "cross-sell",
	name: "Cross Sell",
	website: "https://csell.io/",
	description: "Cross Sell provide recommendations solution for Shopify based sites.",
	icon: "CrossSell.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "cross-sell:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("load\\.csell\\.co"),
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
		"cart-functionality",
		"shopify",
	],
} as const satisfies TechnologyDefinition;
