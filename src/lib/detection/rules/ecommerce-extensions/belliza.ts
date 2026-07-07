import type { TechnologyDefinition } from '../../types';

export const bellizaTechnologyDefinition = {
	id: "belliza",
	name: "Belliza",
	website: "https://themes.templatescoder.com/belliza/shopify/demo/",
	description: "Belliza is a Shopify theme built for modern brands, offering a performance-focused foundation for creating online storefronts.",
	icon: "Belliza.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "belliza:dom:0",
			kind: "dom",
			selector: "script[data-theme-name*='Belliza']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
