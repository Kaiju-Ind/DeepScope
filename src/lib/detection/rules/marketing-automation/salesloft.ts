import type { TechnologyDefinition } from '../../types';

export const salesloftTechnologyDefinition = {
	id: "salesloft",
	name: "Salesloft",
	website: "https://salesloft.com",
	description: "Salesloft is a cloud-based sales engagement platform.",
	icon: "Salesloft.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "salesloft:jsGlobal:0",
			kind: "jsGlobal",
			property: "SLScoutObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesloft:jsGlobal:1",
			kind: "jsGlobal",
			property: "slscout",
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
