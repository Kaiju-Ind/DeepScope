import type { TechnologyDefinition } from '../../types';

export const gremindersTechnologyDefinition = {
	id: "greminders",
	name: "GReminders",
	website: "https://www.greminders.com",
	description: "GReminders is an end-to-end meeting management platform designed for professionals to schedule, organize, and manage meetings.",
	icon: "GReminders.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "greminders:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.greminders\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "greminders:dom:1",
			kind: "dom",
			selector: "iframe[src*='app.greminders.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
