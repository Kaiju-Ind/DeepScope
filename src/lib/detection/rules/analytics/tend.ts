import type { TechnologyDefinition } from '../../types';

export const tendTechnologyDefinition = {
	id: "tend",
	name: "Tend",
	website: "https://tend.io",
	description: "Tend is a conversion optimization tool designed to analyze visitor behavior and identify areas of interaction on websites.",
	icon: "Tend.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "tend:jsGlobal:0",
			kind: "jsGlobal",
			property: "tend.event",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tend:jsGlobal:1",
			kind: "jsGlobal",
			property: "tendKey",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
