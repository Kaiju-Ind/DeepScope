import type { TechnologyDefinition } from '../../types';

export const recolizeTechnologyDefinition = {
	id: "recolize",
	name: "Recolize",
	website: "https://www.recolize.com",
	description: "Recolize is a system that provides personalized product recommendations for ecommerce stores based on customer behavior and preferences.",
	icon: "Recolize.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "recolize:jsGlobal:0",
			kind: "jsGlobal",
			property: "Recolize.Recommendation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "recolize:jsGlobal:1",
			kind: "jsGlobal",
			property: "RecolizeParameters",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
