import type { TechnologyDefinition } from '../../types';

export const n1edTechnologyDefinition = {
	id: "n1ed",
	name: "N1ED",
	website: "https://n1ed.com",
	description: "N1ED is an editor for Bootstrap websites that enables block-by-block content building.",
	icon: "N1ED.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "n1ed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.public\\.n1ed\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
