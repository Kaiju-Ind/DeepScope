import type { TechnologyDefinition } from '../../types';

export const elfsightTechnologyDefinition = {
	id: "elfsight",
	name: "Elfsight",
	website: "https://elfsight.com",
	description: "Elfsight is an all-in-one platform offering 70+ customisable widgets for websites.",
	icon: "Elfsight.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "elfsight:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.elfsight\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
