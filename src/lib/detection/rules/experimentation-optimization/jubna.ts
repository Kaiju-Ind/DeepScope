import type { TechnologyDefinition } from '../../types';

export const jubnaTechnologyDefinition = {
	id: "jubna",
	name: "Jubna",
	website: "https://www.jubna.com",
	description: "Jubna is a content recommendation engine that delivers personalized suggestions by analyzing user behavior and preferences.",
	icon: "Jubna.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "jubna:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.jubna\\.com"),
			description: "Script source URL matches a known technology marker.",
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
