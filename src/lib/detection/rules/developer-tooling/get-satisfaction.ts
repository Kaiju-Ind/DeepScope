import type { TechnologyDefinition } from '../../types';

export const getSatisfactionTechnologyDefinition = {
	id: "get-satisfaction",
	name: "Get Satisfaction",
	website: "https://getsatisfaction.com/corp/",
	icon: "Get Satisfaction.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "get-satisfaction:jsGlobal:0",
			kind: "jsGlobal",
			property: "GSFN",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
