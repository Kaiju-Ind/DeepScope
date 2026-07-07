import type { TechnologyDefinition } from '../../types';

export const fireflyReservationsTechnologyDefinition = {
	id: "firefly-reservations",
	name: "Firefly Reservations",
	website: "https://fireflyreservations.com",
	description: "Firefly Reservations is a management platform that provides tools for handling campground reservations.",
	icon: "FireflyReservations.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "firefly-reservations:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.fireflyreservations\\.com"),
			description: "Script content contains a bounded technology signature.",
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
