import type { TechnologyDefinition } from '../../types';

export const clientDiaryTechnologyDefinition = {
	id: "client-diary",
	name: "Client Diary",
	website: "https://clientdiary.com",
	description: "Client Diary is a scheduling and booking system used to manage appointments, track availability, and organize client interactions in one platform.",
	icon: "ClientDiary.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "client-diary:dom:0",
			kind: "dom",
			selector: "iframe[src*='booking.clientdiary.com']",
			description: "DOM selector matches a known technology marker.",
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
