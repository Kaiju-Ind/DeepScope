import type { TechnologyDefinition } from '../../types';

export const msaaqTechnologyDefinition = {
	id: "msaaq",
	name: "MSAAQ",
	website: "https://msaaq.com",
	description: "MSAAQ is a platform that allows users to create, sell, and manage their products or services from a single location.",
	icon: "MSAAQ.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "msaaq:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("msaaq\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
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
