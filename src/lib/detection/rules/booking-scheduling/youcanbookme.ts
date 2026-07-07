import type { TechnologyDefinition } from '../../types';

export const youcanbookmeTechnologyDefinition = {
	id: "youcanbookme",
	name: "YouCanBookMe",
	website: "https://youcanbook.me",
	description: "YouCanBookMe is an online scheduling solution for small businesses that enables appointment booking, calendar integration, and automated availability management.",
	icon: "YouCanBookMe.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "youcanbookme:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.youcanbook\\.me"),
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
