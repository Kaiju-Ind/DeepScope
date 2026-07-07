import type { TechnologyDefinition } from '../../types';

export const edgemeshTechnologyDefinition = {
	id: "edgemesh",
	name: "Edgemesh",
	website: "https://edgemesh.com/",
	description: "Edgemesh is web acceleration platform for e-commerce brands",
	icon: "Edgemesh.png",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "edgemesh:jsGlobal:0",
			kind: "jsGlobal",
			property: "edgemesh",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
