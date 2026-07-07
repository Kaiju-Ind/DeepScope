import type { TechnologyDefinition } from '../../types';

export const buntingTechnologyDefinition = {
	id: "bunting",
	name: "Bunting",
	website: "http://getbunting.com",
	description: "Bunting is a website personalization and AB testing tool.",
	icon: "Bunting.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "bunting:jsGlobal:0",
			kind: "jsGlobal",
			property: "$_Bunting",
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
