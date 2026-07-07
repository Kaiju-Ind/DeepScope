import type { TechnologyDefinition } from '../../types';

export const sweetAnalyticsTechnologyDefinition = {
	id: "sweet-analytics",
	name: "Sweet Analytics",
	website: "https://sweetanalytics.com",
	description: "Sweet Analytics is a platform that consolidates ecommerce sales and marketing data into a single location for streamlined analysis.",
	icon: "SweetAnalytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "sweet-analytics:jsGlobal:0",
			kind: "jsGlobal",
			property: "sweet.acceptCookies",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
