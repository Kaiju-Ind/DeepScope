import type { TechnologyDefinition } from '../../types';

export const mapmeTechnologyDefinition = {
	id: "mapme",
	name: "Mapme",
	website: "https://mapme.com",
	description: "Mapme is an interactive map builder that allows users to create custom maps.",
	icon: "Mapme.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "mapme:dom:0",
			kind: "dom",
			selector: "iframe[src*='viewer.mapme.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
