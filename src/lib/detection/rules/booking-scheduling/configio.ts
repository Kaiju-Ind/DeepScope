import type { TechnologyDefinition } from '../../types';

export const configioTechnologyDefinition = {
	id: "configio",
	name: "Configio",
	website: "https://www.configio.com",
	description: "Configio is an event registration software platform that supports event planning, promotion, and execution through integrated tools for managing registrations, payments, and attendee data.",
	icon: "Configio.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "configio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("media\\.configio\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
