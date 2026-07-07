import type { TechnologyDefinition } from '../../types';

export const glampmanagerTechnologyDefinition = {
	id: "glampmanager",
	name: "GlampManager",
	website: "https://www.glampmanager.com",
	description: "GlampManager is a booking and management software designed to streamline reservations, scheduling, and operational tasks for hospitality businesses.",
	icon: "GlampManager.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "glampmanager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bookings\\.glampmanager\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "glampmanager:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("Glampmanager"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "glampmanager:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("glampmanager"),
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
