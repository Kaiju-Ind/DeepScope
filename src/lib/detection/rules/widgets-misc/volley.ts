import type { TechnologyDefinition } from '../../types';

export const volleyTechnologyDefinition = {
	id: "volley",
	name: "Volley",
	website: "https://meetvolley.com",
	description: "Volley is a website annotation tool that enables visual feedback on websites.",
	icon: "Volley.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "volley:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.meetvolley\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
