import type { TechnologyDefinition } from '../../types';

export const growthstackTechnologyDefinition = {
	id: "growthstack",
	name: "Growthstack",
	website: "https://www.growthstack.app",
	description: "Growthstack is a growth management platform for healthcare practices, providing centralized tools to manage operations, patient engagement, and practice growth within a single system.",
	icon: "Growthstack.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "growthstack:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Growthstack by Influx$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
