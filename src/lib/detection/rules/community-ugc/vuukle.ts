import type { TechnologyDefinition } from '../../types';

export const vuukleTechnologyDefinition = {
	id: "vuukle",
	name: "Vuukle",
	website: "https://vuukle.com",
	description: "Vuukle is an audience engagement and commenting platform.",
	icon: "vuukle.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "vuukle:jsGlobal:0",
			kind: "jsGlobal",
			property: "VUUKLE_CONFIG",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
