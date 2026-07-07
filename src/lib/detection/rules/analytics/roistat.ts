import type { TechnologyDefinition } from '../../types';

export const roistatTechnologyDefinition = {
	id: "roistat",
	name: "Roistat",
	website: "https://roistat.com/",
	description: "Roistat is a marketing analytics system.",
	icon: "roistat.svg",
	categories: [
		"analytics",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "roistat:jsGlobal:0",
			kind: "jsGlobal",
			property: "roistatHost",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "roistat:jsGlobal:1",
			kind: "jsGlobal",
			property: "roistatProjectId",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
