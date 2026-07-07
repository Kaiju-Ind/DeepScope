import type { TechnologyDefinition } from '../../types';

export const indexicTechnologyDefinition = {
	id: "indexic",
	name: "Indexic",
	website: "https://www.indexic.net",
	description: "Indexic is a booking management platform designed for tours, activities, and rental operations.",
	icon: "Indexic.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "indexic:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.web\\.indexic\\.net"),
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
