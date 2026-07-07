import type { TechnologyDefinition } from '../../types';

export const ticketspiceTechnologyDefinition = {
	id: "ticketspice",
	name: "TicketSpice",
	website: "https://www.ticketspice.com",
	description: "TicketSpice is a ticketing software platform that enables businesses to sell tickets online and manage event registrations through a web-based interface.",
	icon: "TicketSpice.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "ticketspice:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.ticketspice\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
