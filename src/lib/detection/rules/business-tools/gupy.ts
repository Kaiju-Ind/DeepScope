import type { TechnologyDefinition } from '../../types';

export const gupyTechnologyDefinition = {
	id: "gupy",
	name: "Gupy",
	website: "https://www.gupy.io",
	description: "Gupy is a Brazilian-based recruitment software platform that provides tools for managing hiring processes, including candidate sourcing, selection, and recruitment workflow automation.",
	icon: "Gupy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "gupy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.gupy\\.io"),
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
