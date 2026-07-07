import type { TechnologyDefinition } from '../../types';

export const reloopTechnologyDefinition = {
	id: "reloop",
	name: "RELOOP",
	website: "https://www.reloop.com.au",
	description: "RELOOP is a platform for buying and selling clothing items through a personal network of contacts.",
	icon: "Reloop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "reloop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.reloop\\.com\\.au\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
