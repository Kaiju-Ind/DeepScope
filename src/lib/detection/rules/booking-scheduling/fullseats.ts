import type { TechnologyDefinition } from '../../types';

export const fullseatsTechnologyDefinition = {
	id: "fullseats",
	name: "FullSeats",
	website: "https://www.fullseats.com",
	description: "FullSeats is a booking system designed to streamline scheduling and support business growth through reservation management.",
	icon: "FullSeats.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "fullseats:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("apps\\.fullseats\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
