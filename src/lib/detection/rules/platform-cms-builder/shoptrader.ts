import type { TechnologyDefinition } from '../../types';

export const shoptraderTechnologyDefinition = {
	id: "shoptrader",
	name: "Shoptrader",
	website: "https://www.shoptrader.nl",
	description: "Shoptrader is a Dutch-based shopping site solution that provides a platform for creating and managing online stores.",
	icon: "Shoptrader.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoptrader:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.shoptrader.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
