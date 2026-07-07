import type { TechnologyDefinition } from '../../types';

export const wherewolfTechnologyDefinition = {
	id: "wherewolf",
	name: "Wherewolf",
	website: "https://getwherewolf.com",
	description: "Wherewolf is a platform that offers capture waivers, facilitates drive bookings, and automates review processes to streamline business operations.",
	icon: "Wherewolf.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "wherewolf:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.wherewolf\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
