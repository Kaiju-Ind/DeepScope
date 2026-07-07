import type { TechnologyDefinition } from '../../types';

export const zeviTechnologyDefinition = {
	id: "zevi",
	name: "Zevi",
	website: "https://www.zevi.ai",
	description: "Zevi is an AI-powered site search and discovery platform designed to enhance product discovery.",
	icon: "Zevi.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "zevi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.zevi\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zevi:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^zevi\\-_zldt$", "i"),
			description: "Cookie name matches a known technology marker.",
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
