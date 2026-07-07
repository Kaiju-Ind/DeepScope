import type { TechnologyDefinition } from '../../types';

export const shoptimizedTechnologyDefinition = {
	id: "shoptimized",
	name: "Shoptimized",
	website: "https://shoptimized.net",
	description: "Shoptimized is a Shopify theme and support package designed to enhance store functionality, performance, and user experience.",
	icon: "Shoptimized.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "shoptimized:jsGlobal:0",
			kind: "jsGlobal",
			property: "isshoptimized",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
