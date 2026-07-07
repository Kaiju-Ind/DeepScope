import type { TechnologyDefinition } from '../../types';

export const zinreloTechnologyDefinition = {
	id: "zinrelo",
	name: "Zinrelo",
	website: "https://www.zinrelo.com",
	description: "Zinrelo is an enterprise-grade, loyalty rewards platform.",
	icon: "Zinrelo.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "zinrelo:jsGlobal:0",
			kind: "jsGlobal",
			property: "zrl_mi",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
