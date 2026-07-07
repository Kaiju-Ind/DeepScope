import type { TechnologyDefinition } from '../../types';

export const cartoDataObservatoryTechnologyDefinition = {
	id: "carto-data-observatory",
	name: "CARTO Data Observatory",
	website: "https://carto.com/data-observatory",
	description: "Carto Data Observatory is a platform that provides access to thousands of public and premium datasets from curated source.",
	icon: "Carto.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "carto-data-observatory:jsGlobal:0",
			kind: "jsGlobal",
			property: "CartoDbLib",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "carto-data-observatory:jsGlobal:1",
			kind: "jsGlobal",
			property: "cartodb.$",
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
