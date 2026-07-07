import type { TechnologyDefinition } from '../../types';

export const siteklikTechnologyDefinition = {
	id: "siteklik",
	name: "Siteklik",
	website: "https://siteklik.nl/",
	description: "Siteklik is a sitebuilder designed for small businesses and self-employed individuals.",
	icon: "Siteklik.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "siteklik:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/webstats\\.siteklik\\.nl\\/"),
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
