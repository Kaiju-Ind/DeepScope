import type { TechnologyDefinition } from '../../types';

export const opentableTechnologyDefinition = {
	id: "opentable",
	name: "OpenTable",
	website: "https://restaurant.opentable.com",
	description: "OpenTable is an online restaurant-reservation service company founded by Sid Gorham, Eric Moe and Chuck Templeton on 2 July 1998 and is based in San Francisco, California.",
	icon: "OpenTable.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "opentable:dom:0",
			kind: "dom",
			selector: "iframe[src*='.opentable.com/'], form[action*='.opentable.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
