import type { TechnologyDefinition } from '../../types';

export const witbookingTechnologyDefinition = {
	id: "witbooking",
	name: "Witbooking",
	website: "https://www.witbooking.com",
	description: "Witbooking is a hotel booking engine that enables the management of reservations, availability, and pricing through an online platform.",
	icon: "Witbooking.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "witbooking:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.witbooking\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "witbooking:dom:1",
			kind: "dom",
			selector: "form[action*='engine.witbooking.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
