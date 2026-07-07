import type { TechnologyDefinition } from '../../types';

export const tiledTechnologyDefinition = {
	id: "tiled",
	name: "Tiled",
	website: "https://www.tiled.co",
	description: "Tiled is a microapp platform proven to drive engagement and deliver insight.",
	icon: "Tiled.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "tiled:dom:0",
			kind: "dom",
			selector: "iframe[src*='s.tiled.co/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
