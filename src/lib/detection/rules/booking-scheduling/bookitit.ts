import type { TechnologyDefinition } from '../../types';

export const bookititTechnologyDefinition = {
	id: "bookitit",
	name: "Bookitit",
	website: "https://www.bookitit.com",
	description: "Bookitit is an online scheduling system.",
	icon: "Bookitit.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bookitit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.bookitit\\.com\\/"),
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
