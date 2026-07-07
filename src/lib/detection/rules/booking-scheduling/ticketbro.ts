import type { TechnologyDefinition } from '../../types';

export const ticketbroTechnologyDefinition = {
	id: "ticketbro",
	name: "Ticketbro",
	website: "https://www.ticketbro.com",
	description: "Ticketbro is a mobile ticket booking system that enables users to browse, select, and purchase event or travel tickets directly from a smartphone.",
	icon: "Ticketbro.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "ticketbro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ticketbro\\.(tools|io)(?:\\/widget)?\\/widget\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
