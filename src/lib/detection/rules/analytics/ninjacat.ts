import type { TechnologyDefinition } from '../../types';

export const ninjacatTechnologyDefinition = {
	id: "ninjacat",
	name: "NinjaCat",
	website: "https://www.ninjacat.io",
	description: "NinjaCat is a marketing analytics platform that aggregates, analyzes, and reports performance data across multiple marketing channels.",
	icon: "NinjaCat.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "ninjacat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.ninjacat\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
