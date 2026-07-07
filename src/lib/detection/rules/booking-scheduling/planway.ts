import type { TechnologyDefinition } from '../../types';

export const planwayTechnologyDefinition = {
	id: "planway",
	name: "Planway",
	website: "https://planway.com",
	description: "Planway is an online booking system that allows businesses to manage appointments, schedule services, and streamline client reservations through a digital platform.",
	icon: "Planway.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "planway:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.planway\\.com"),
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
