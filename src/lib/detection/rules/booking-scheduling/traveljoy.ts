import type { TechnologyDefinition } from '../../types';

export const traveljoyTechnologyDefinition = {
	id: "traveljoy",
	name: "TravelJoy",
	website: "https://traveljoy.com",
	description: "TravelJoy is an all-in-one platform for travel advisors, providing tools for managing client bookings, payments, and communication.",
	icon: "TravelJoy.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "traveljoy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("traveljoy\\.com"),
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
