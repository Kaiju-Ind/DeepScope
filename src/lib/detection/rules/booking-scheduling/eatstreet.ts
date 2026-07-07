import type { TechnologyDefinition } from '../../types';

export const eatstreetTechnologyDefinition = {
	id: "eatstreet",
	name: "EatStreet",
	website: "https://eatstreet.com",
	description: "EatStreet is a food booking platform that enables users to browse restaurants, place meal orders, and schedule deliveries or pickups through an online or mobile interface.",
	icon: "EatStreet.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "eatstreet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.eatstreet\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "eatstreet:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^eatstreet\\-year\\-session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
