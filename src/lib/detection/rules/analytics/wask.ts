import type { TechnologyDefinition } from '../../types';

export const waskTechnologyDefinition = {
	id: "wask",
	name: "Wask",
	website: "https://www.wask.co",
	description: "Wask is a platform that offers businesses a dedicated library code to analyse website visitors, track visitor behaviour, monitor website events, and gather retention cohort data effectively.",
	icon: "Wask.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "wask:jsGlobal:0",
			kind: "jsGlobal",
			property: "wask_analytics",
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
