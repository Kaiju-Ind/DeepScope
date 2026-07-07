import type { TechnologyDefinition } from '../../types';

export const rateparityTechnologyDefinition = {
	id: "rateparity",
	name: "RateParity",
	website: "https://www.rateparity.com",
	description: "RateParity is a conversion rate optimisation platform for hotels.",
	icon: "RateParity.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "rateparity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("code\\.rateparity\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
