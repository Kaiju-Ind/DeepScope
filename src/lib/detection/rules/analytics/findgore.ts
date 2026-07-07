import type { TechnologyDefinition } from '../../types';

export const findgoreTechnologyDefinition = {
	id: "findgore",
	name: "FindGore",
	website: "https://www.findgore.com",
	description: "FindGore is a conversion rate improvement analytics tool designed to help businesses optimise their websites by analysing user behaviour and identifying areas for enhancement to increase conversion rates.",
	icon: "FindGore.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "findgore:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.findgore\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
