import type { TechnologyDefinition } from '../../types';

export const terriajsTechnologyDefinition = {
	id: "terriajs",
	name: "TerriaJS",
	website: "https://terria.io/",
	description: "TerriaJS is an open-source framework for web-based geospatial catalogue explorers.",
	icon: "TerriaJS.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "terriajs:dom:0",
			kind: "dom",
			selector: "html[class*='terria']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
