import type { TechnologyDefinition } from '../../types';

export const allyableTechnologyDefinition = {
	id: "allyable",
	name: "Allyable",
	website: "https://allyable.com",
	description: "Allyable is an automated web accessibility solution with an AI engine.",
	icon: "Allyable.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "allyable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("portal\\.allyable\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "allyable:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("mk-sense\\.com\\/aweb\\?license"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
