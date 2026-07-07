import type { TechnologyDefinition } from '../../types';

export const eviivoTechnologyDefinition = {
	id: "eviivo",
	name: "Eviivo",
	website: "https://eviivo.com",
	description: "Eviivo is an online booking system that enables hosts and hoteliers to manage reservations and availability.",
	icon: "Eviivo.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "eviivo:jsGlobal:0",
			kind: "jsGlobal",
			property: "eviivo.announcement",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eviivo:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^eviivo_lang$", "i"),
			description: "Cookie name matches a known technology marker.",
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
