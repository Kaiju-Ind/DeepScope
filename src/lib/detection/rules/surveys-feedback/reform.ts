import type { TechnologyDefinition } from '../../types';

export const reformTechnologyDefinition = {
	id: "reform",
	name: "Reform",
	website: "https://www.reform.app",
	description: "Reform is a conversion-focused form builder designed to optimize data collection.",
	icon: "Reform.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "reform:jsGlobal:0",
			kind: "jsGlobal",
			property: "Reform",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "reform:jsGlobal:1",
			kind: "jsGlobal",
			property: "ReformHandlers",
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
