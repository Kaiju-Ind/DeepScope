import type { TechnologyDefinition } from '../../types';

export const social9TechnologyDefinition = {
	id: "social9",
	name: "Social9",
	website: "https://social9.com",
	description: "Social9 is a social sharing widgets and plugins.",
	icon: "Social9.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "social9:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("social9\\.com\\/.+\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
