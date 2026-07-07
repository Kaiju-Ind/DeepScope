import type { TechnologyDefinition } from '../../types';

export const eolaTechnologyDefinition = {
	id: "eola",
	name: "eola",
	website: "https://eola.co",
	description: "eola is a booking platform that enables users to manage reservations, schedules, and availability for services or events through a centralized online system.",
	icon: "eola.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "eola:dom:0",
			kind: "dom",
			selector: "link[href*='backend.eola.co/'][rel*='stylesheet']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "eola:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_eola_session_eola$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
