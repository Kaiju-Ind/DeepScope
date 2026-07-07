import type { TechnologyDefinition } from '../../types';

export const refixTechnologyDefinition = {
	id: "refix",
	name: "Refix",
	website: "https://www.refix.ai",
	description: "Refix is a tracking tool that monitors clicks, views, scrolls, and other key user engagement metrics through a single script.",
	icon: "Refix.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "refix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.refix\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
