import type { TechnologyDefinition } from '../../types';

export const booksterTechnologyDefinition = {
	id: "bookster",
	name: "Bookster",
	website: "https://www.booksterhq.com",
	description: "Bookster is a property management software designed for holiday rental owners and managers.",
	icon: "Bookster.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "bookster:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.booksterhq\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bookster:jsGlobal:1",
			kind: "jsGlobal",
			property: "bookster",
			description: "Page-owned global matches a known technology marker.",
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
