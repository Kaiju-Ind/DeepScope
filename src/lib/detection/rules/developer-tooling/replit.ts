import type { TechnologyDefinition } from '../../types';

export const replitTechnologyDefinition = {
	id: "replit",
	name: "Replit",
	website: "https://replit.com",
	description: "Replit is a platform for creating and sharing software.",
	icon: "Replit.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "replit:header:0",
			kind: "header",
			key: "expect-ct",
			valuePattern: new RegExp("\\.repl\\.it\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
