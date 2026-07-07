import type { TechnologyDefinition } from '../../types';

export const littleHotelierTechnologyDefinition = {
	id: "little-hotelier",
	name: "Little Hotelier",
	website: "https://www.littlehotelier.com",
	description: "Little Hotelier is an all-in-one property management solution designed for small accomodation businesses.",
	icon: "LittleHotelier.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "little-hotelier:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_littlehotelier_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
