import type { TechnologyDefinition } from '../../types';

export const tatariTechnologyDefinition = {
	id: "tatari",
	name: "Tatari",
	website: "https://www.tatari.tv",
	description: "Tatari is a data and analytics company focused on buying and measuring ads across TV and streaming platforms.",
	icon: "Tatari.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "tatari:jsGlobal:0",
			kind: "jsGlobal",
			property: "tatari",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
