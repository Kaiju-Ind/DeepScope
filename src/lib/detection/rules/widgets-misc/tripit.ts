import type { TechnologyDefinition } from '../../types';

export const tripitTechnologyDefinition = {
	id: "tripit",
	name: "TripIt",
	website: "https://www.tripit.com",
	description: "TripIt is a travel management platform that organizes travel plans and consolidates details in one place.",
	icon: "TripIt.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "tripit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.tripit\\.com"),
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
