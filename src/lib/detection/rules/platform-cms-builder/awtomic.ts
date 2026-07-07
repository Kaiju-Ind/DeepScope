import type { TechnologyDefinition } from '../../types';

export const awtomicTechnologyDefinition = {
	id: "awtomic",
	name: "Awtomic",
	website: "https://www.awtomic.com",
	description: "Awtomic is a platform that offers shoppers and merchants tools for managing subscription products and membership services.",
	icon: "Awtomic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "awtomic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\/shop\\/.*awtomic.*\\.js\\?v=\\d+"),
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
