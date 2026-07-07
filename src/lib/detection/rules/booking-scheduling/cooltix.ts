import type { TechnologyDefinition } from '../../types';

export const cooltixTechnologyDefinition = {
	id: "cooltix",
	name: "Cooltix",
	website: "https://cooltix.com",
	description: "Cooltix is an event and ticketing system designed to manage and sell tickets for concerts.",
	icon: "Cooltix.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "cooltix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.cooltix\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
