import type { TechnologyDefinition } from '../../types';

export const contentlyTechnologyDefinition = {
	id: "contently",
	name: "Contently",
	website: "https://contently.com",
	description: "Contently is a SaaS content marketing platform from the company of the same name headquartered in New York.",
	icon: "Contently.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "contently:jsGlobal:0",
			kind: "jsGlobal",
			property: "_contently.siteId",
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
