import type { TechnologyDefinition } from '../../types';

export const bookluxTechnologyDefinition = {
	id: "booklux",
	name: "Booklux",
	website: "https://www.booklux.com",
	description: "Booklux is an online booking system that enables users to schedule, manage, and organize reservations through a centralized digital platform.",
	icon: "Booklux.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "booklux:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.booklux\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "booklux:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.booklux\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
