import type { TechnologyDefinition } from '../../types';

export const pliekTechnologyDefinition = {
	id: "pliek",
	name: "Pliek",
	website: "https://pliek.io",
	description: "Pliek is a system that provides live sales notifications, enabling real-time updates on purchase activities.",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pliek:jsGlobal:0",
			kind: "jsGlobal",
			property: "pliekConfig.key",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
