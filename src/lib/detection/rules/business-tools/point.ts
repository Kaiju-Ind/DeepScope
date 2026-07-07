import type { TechnologyDefinition } from '../../types';

export const pointTechnologyDefinition = {
	id: "point",
	name: "POINT",
	website: "https://pointapp.org",
	description: "POINT is a volunteer management platform and app for nonprofits to find and manage volunteers.",
	icon: "POINT.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "point:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/pointapp\\.org(?:\\/.*)?(?:\\?.*)?$"),
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
