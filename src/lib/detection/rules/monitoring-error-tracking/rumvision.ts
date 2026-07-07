import type { TechnologyDefinition } from '../../types';

export const rumvisionTechnologyDefinition = {
	id: "rumvision",
	name: "Rumvision",
	website: "https://www.rumvision.com/",
	description: "Rumvision is a front-end performance monitoring service",
	icon: "Rumvision.png",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "rumvision:jsGlobal:0",
			kind: "jsGlobal",
			property: "rumv_config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
