import type { TechnologyDefinition } from '../../types';

export const tontineTechnologyDefinition = {
	id: "tontine",
	name: "Tontine",
	website: "https://www.tontine.ai",
	description: "Tontine is an A/B price testing platform built specifically for high-growth Shopify merchants focused on optimizing their profit margins.",
	icon: "Tontine.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "tontine:jsGlobal:0",
			kind: "jsGlobal",
			property: "TontineApp.tontineAnalytics",
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
