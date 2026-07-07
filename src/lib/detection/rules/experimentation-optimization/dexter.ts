import type { TechnologyDefinition } from '../../types';

export const dexterTechnologyDefinition = {
	id: "dexter",
	name: "Dexter",
	website: "https://www.thedexterapp.com",
	description: "Dexter is a tool that analyzes product pricing through A/B testing to identify potential revenue opportunities.",
	icon: "Dexter.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "dexter:jsGlobal:0",
			kind: "jsGlobal",
			property: "dexterLiquidVariables",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dexter:jsGlobal:1",
			kind: "jsGlobal",
			property: "dexterProduct",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
