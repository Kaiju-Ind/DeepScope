import type { TechnologyDefinition } from '../../types';

export const convertflowTechnologyDefinition = {
	id: "convertflow",
	name: "ConvertFlow",
	website: "https://www.convertflow.com",
	description: "ConvertFlow is the all-in-one conversion marketing platform.",
	icon: "ConvertFlow.svg",
	categories: [
		"analytics",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "convertflow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:app|js)\\.convertflow\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "convertflow:jsGlobal:1",
			kind: "jsGlobal",
			property: "convertflow",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
