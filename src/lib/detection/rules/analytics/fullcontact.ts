import type { TechnologyDefinition } from '../../types';

export const fullcontactTechnologyDefinition = {
	id: "fullcontact",
	name: "FullContact",
	website: "https://www.fullcontact.com",
	description: "FullContact is a privacy-safe Identity Resolution company building trust between people and brands.",
	icon: "FullContact.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "fullcontact:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tags\\.fullcontact\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fullcontact:jsGlobal:1",
			kind: "jsGlobal",
			property: "Fullcontact",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
