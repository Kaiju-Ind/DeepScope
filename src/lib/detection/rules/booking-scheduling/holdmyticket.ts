import type { TechnologyDefinition } from '../../types';

export const holdmyticketTechnologyDefinition = {
	id: "holdmyticket",
	name: "HoldMyTicket",
	website: "https://tickets.holdmyticket.com",
	description: "HoldMyTicket is a platform offering event ticketing and box office solutions for organizers.",
	icon: "HoldMyTicket.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "holdmyticket:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/holdmyticket\\.com\\/widgets"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
