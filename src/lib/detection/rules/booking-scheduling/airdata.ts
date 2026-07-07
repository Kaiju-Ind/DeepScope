import type { TechnologyDefinition } from '../../types';

export const airdataTechnologyDefinition = {
	id: "airdata",
	name: "Airdata",
	website: "https://airdata.vn",
	description: "Airdata is a ticket booking system for agents in Vietnam, offering unique features to maximize benefits for businesses in managing and selling flight tickets.",
	icon: "Airdata.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "airdata:jsGlobal:0",
			kind: "jsGlobal",
			property: "BOOKING_BASE_API_URL",
			valuePattern: new RegExp("api\\.airdata\\.vn"),
			description: "Page-owned global matches a known technology marker.",
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
