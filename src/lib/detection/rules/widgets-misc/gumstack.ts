import type { TechnologyDefinition } from '../../types';

export const gumstackTechnologyDefinition = {
	id: "gumstack",
	name: "Gumstack",
	website: "https://gumstack.com/",
	description: "Gumstack provides a live video shopping solution for eCommerce.",
	icon: "Gumstack.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "gumstack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("w\\.gumstack\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gumstack:jsGlobal:1",
			kind: "jsGlobal",
			property: "Gumstack",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
