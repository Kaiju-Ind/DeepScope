import type { TechnologyDefinition } from '../../types';

export const titanTechnologyDefinition = {
	id: "titan",
	name: "Titan",
	website: "https://titan360.com",
	icon: "Titan.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "titan:jsGlobal:0",
			kind: "jsGlobal",
			property: "titan",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "titan:jsGlobal:1",
			kind: "jsGlobal",
			property: "titanEnabled",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
