import type { TechnologyDefinition } from '../../types';

export const visbookTechnologyDefinition = {
	id: "visbook",
	name: "VisBook",
	website: "https://visbook.com",
	description: "VisBook is a property management system used by hotels and accommodation providers to manage reservations, daily operations, and guest-related activities in a centralized platform.",
	icon: "VisBook.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "visbook:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("reservations\\.visbook\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
