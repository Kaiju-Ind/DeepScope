import type { TechnologyDefinition } from '../../types';

export const shoreTechnologyDefinition = {
	id: "shore",
	name: "Shore",
	website: "https://shore.com",
	description: "Shore is an appointment management software designed to streamline scheduling and organization for businesses.",
	icon: "Shore.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "shore:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("connect\\.shore\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shore:jsGlobal:1",
			kind: "jsGlobal",
			property: "ShoreBookingButtonAlreadyLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shore:jsGlobal:2",
			kind: "jsGlobal",
			property: "shoreBookingSettings",
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
