import type { TechnologyDefinition } from '../../types';

export const nostraTechnologyDefinition = {
	id: "nostra",
	name: "Nostra",
	website: "https://www.nostra.ai/",
	description: "Nostra is a web performance optimisation solution.",
	icon: "Nostra.png",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "nostra:jsGlobal:0",
			kind: "jsGlobal",
			property: "Nostra",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nostra:jsGlobal:1",
			kind: "jsGlobal",
			property: "NostraEventManager",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
