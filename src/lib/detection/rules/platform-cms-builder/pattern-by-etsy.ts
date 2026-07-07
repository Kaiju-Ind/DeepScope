import type { TechnologyDefinition } from '../../types';

export const patternByEtsyTechnologyDefinition = {
	id: "pattern-by-etsy",
	name: "Pattern by Etsy",
	website: "https://www.etsy.com/pattern",
	description: "Pattern is an offering by Etsy to set up a website for Etsy sellers, in addition to Etsy shop.",
	icon: "Etsy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pattern-by-etsy:jsGlobal:0",
			kind: "jsGlobal",
			property: "Etsy",
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
} as const satisfies TechnologyDefinition;
