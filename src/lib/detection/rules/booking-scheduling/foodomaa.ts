import type { TechnologyDefinition } from '../../types';

export const foodomaaTechnologyDefinition = {
	id: "foodomaa",
	name: "Foodomaa",
	website: "https://foodomaa.com",
	description: "Foodomaa is a multi-restaurant food ordering and restaurant membership system.",
	icon: "Foodomaa.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "foodomaa:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^foodomaa_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "foodomaa:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^cloudify_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
