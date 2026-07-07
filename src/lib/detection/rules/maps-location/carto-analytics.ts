import type { TechnologyDefinition } from '../../types';

export const cartoAnalyticsTechnologyDefinition = {
	id: "carto-analytics",
	name: "CARTO Analytics",
	website: "https://carto.com",
	description: "Carto is a cloud-based spatial analytics platform that enables analysis and development with spatial data at scale.",
	icon: "Carto.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "carto-analytics:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.basemaps\\.cartocdn\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
