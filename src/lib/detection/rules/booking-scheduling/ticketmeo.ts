import type { TechnologyDefinition } from '../../types';

export const ticketmeoTechnologyDefinition = {
	id: "ticketmeo",
	name: "Ticketmeo",
	website: "https://www.ticketmeo.com",
	description: "Ticketmeo is a platform for managing live and virtual events, formerly known as Ploxel, that enables users to sell tickets online.",
	icon: "Ticketmeo.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "ticketmeo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/plugins\\/ploxel\\/js\\/ploxel\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
