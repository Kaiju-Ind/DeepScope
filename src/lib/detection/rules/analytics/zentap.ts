import type { TechnologyDefinition } from '../../types';

export const zentapTechnologyDefinition = {
	id: "zentap",
	name: "Zentap",
	website: "https://zentap.com",
	description: "Zentap is a real estate marketing platform designed to create and manage marketing campaigns, track leads, and measure results.",
	icon: "Zentap.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "zentap:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Zentap", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "zentap:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("zentap", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
