import type { TechnologyDefinition } from '../../types';

export const farmakomTechnologyDefinition = {
	id: "farmakom",
	name: "Farmakom",
	website: "https://www.farmakom.it",
	description: "Farmakom is a platform in Italy supporting pharmacy digital transformation by providing channel management, consistent customer support, and tools to drive business growth.",
	icon: "Farmakom.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "farmakom:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.farmakom\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
