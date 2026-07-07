import type { TechnologyDefinition } from '../../types';

export const regiondoTechnologyDefinition = {
	id: "regiondo",
	name: "Regiondo",
	website: "https://www.regiondo.com",
	description: "Regiondo is an online booking system for tour and activity providers.",
	icon: "Regiondo.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "regiondo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.regiondo\\.net"),
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
