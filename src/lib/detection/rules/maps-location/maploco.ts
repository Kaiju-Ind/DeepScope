import type { TechnologyDefinition } from '../../types';

export const maplocoTechnologyDefinition = {
	id: "maploco",
	name: "MapLoco",
	website: "https://maploco.com",
	description: "MapLoco is a tool that displays website visitor locations on an interactive map for analysis and tracking.",
	icon: "MapLoco.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "maploco:dom:0",
			kind: "dom",
			selector: "a[href*='m.maploco.com'] > img[src*='www.maploco.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
