import type { TechnologyDefinition } from '../../types';

export const maptilerTechnologyDefinition = {
	id: "maptiler",
	name: "Maptiler",
	website: "https://www.maptiler.com",
	description: "Maptiler is a mapping platform offering visual tools, global data, SDKs, and APIs for enterprise application development.",
	icon: "Maptiler.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "maptiler:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.maptiler\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
