import type { TechnologyDefinition } from '../../types';

export const onestatTechnologyDefinition = {
	id: "onestat",
	name: "OneStat",
	website: "https://www.onestat.com",
	icon: "OneStat.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "onestat:jsGlobal:0",
			kind: "jsGlobal",
			property: "OneStat_Pageview",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
