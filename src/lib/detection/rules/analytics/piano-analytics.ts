import type { TechnologyDefinition } from '../../types';

export const pianoAnalyticsTechnologyDefinition = {
	id: "piano-analytics",
	name: "Piano Analytics",
	website: "https://piano.io/product/analytics/",
	description: "Piano Analytics is a data integration platform that consolidates marketing analytics, product analytics, content analytics, transaction data, and first-party data to offer a centralised source for reporting and segmentation.",
	icon: "Piano.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "piano-analytics:jsGlobal:0",
			kind: "jsGlobal",
			property: "pianoAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
