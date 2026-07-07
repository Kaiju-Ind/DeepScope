import type { TechnologyDefinition } from '../../types';

export const leadsquaredTechnologyDefinition = {
	id: "leadsquared",
	name: "Leadsquared",
	website: "https://www.leadsquared.com",
	description: "Leadsquared is a marketing automation software suite.",
	icon: "Leadsquared.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "leadsquared:jsGlobal:0",
			kind: "jsGlobal",
			property: "leadsquared",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
