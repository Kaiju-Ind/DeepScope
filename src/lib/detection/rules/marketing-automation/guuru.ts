import type { TechnologyDefinition } from '../../types';

export const guuruTechnologyDefinition = {
	id: "guuru",
	name: "Guuru",
	website: "https://www.guuru.com",
	description: "Guuru is a platform that connects shoppers with customers who share their enthusiasm for specific products or services.",
	icon: "Guuru.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "guuru:jsGlobal:0",
			kind: "jsGlobal",
			property: "Guuru",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "guuru:jsGlobal:1",
			kind: "jsGlobal",
			property: "guuru.init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
