import type { TechnologyDefinition } from '../../types';

export const wordliftTechnologyDefinition = {
	id: "wordlift",
	name: "WordLift",
	website: "https://wordlift.io",
	description: "WordLift is an AI tool that analyzes content, identifies key business topics, and enables the insertion of semantic markup without needing technical skills.",
	icon: "WordLift.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "wordlift:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cloud\\.wordlift\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
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
