import type { TechnologyDefinition } from '../../types';

export const panelbearTechnologyDefinition = {
	id: "panelbear",
	name: "Panelbear",
	website: "https://panelbear.com",
	description: "Panelbear is a simple website performance and traffic analytics tool.",
	icon: "Panelbear.svg",
	categories: [
		"analytics",
		"developer-tooling",
	],
	rules: [
		{
			id: "panelbear:jsGlobal:0",
			kind: "jsGlobal",
			property: "panelbear",
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
