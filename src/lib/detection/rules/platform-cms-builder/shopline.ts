import type { TechnologyDefinition } from '../../types';

export const shoplineTechnologyDefinition = {
	id: "shopline",
	name: "Shopline",
	website: "https://shoplineapp.com/",
	description: "Shopline provides solutions for merchants to set up an online store.",
	icon: "Shopline.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopline:jsGlobal:0",
			kind: "jsGlobal",
			property: "Shopline",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shopline:jsGlobal:1",
			kind: "jsGlobal",
			property: "shoplytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	excludes: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
