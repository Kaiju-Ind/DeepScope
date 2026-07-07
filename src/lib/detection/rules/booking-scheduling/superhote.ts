import type { TechnologyDefinition } from '../../types';

export const superhoteTechnologyDefinition = {
	id: "superhote",
	name: "SuperHote",
	website: "https://www.superhote.com",
	description: "SuperHote is a hotel management software designed to streamline hotel bookings, reservations, and other management tasks.",
	icon: "SuperHote.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "superhote:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.superhote\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
