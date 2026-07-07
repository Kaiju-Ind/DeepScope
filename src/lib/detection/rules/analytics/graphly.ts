import type { TechnologyDefinition } from '../../types';

export const graphlyTechnologyDefinition = {
	id: "graphly",
	name: "Graphly",
	website: "https://graphly.io",
	description: "Graphly is a visual reporting and business intelligence platform.",
	icon: "Graphly.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "graphly:jsGlobal:0",
			kind: "jsGlobal",
			property: "GraphlyTracking",
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
} as const satisfies TechnologyDefinition;
