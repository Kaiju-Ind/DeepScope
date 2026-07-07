import type { TechnologyDefinition } from '../../types';

export const viselyTechnologyDefinition = {
	id: "visely",
	name: "Visely",
	website: "https://visely.io",
	description: "Visely is a Shopify app which personalise product recommendations for Shopify sites.",
	icon: "Visely.svg",
	categories: [
		"ecommerce-extensions",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "visely:jsGlobal:0",
			kind: "jsGlobal",
			property: "Visely.RecommendationsApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "visely:jsGlobal:1",
			kind: "jsGlobal",
			property: "ViselyCartProductIds",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "visely:jsGlobal:2",
			kind: "jsGlobal",
			property: "ViselyPage",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
