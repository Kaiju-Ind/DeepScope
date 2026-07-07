import type { TechnologyDefinition } from '../../types';

export const proofdyTechnologyDefinition = {
	id: "proofdy",
	name: "Proofdy",
	website: "https://proofdy.ru",
	description: "Proofdy is a tool that displays social proof popups on websites to build visitor trust, enhance credibility, and support conversion efforts.",
	icon: "Proofdy.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "proofdy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.proofdy\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
