import type { TechnologyDefinition } from '../../types';

export const eventonTechnologyDefinition = {
	id: "eventon",
	name: "EventOn",
	website: "https://www.myeventon.com",
	description: "EventON is event calendar for WordPress.",
	icon: "eventon.png",
	categories: [
		"booking-scheduling",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "eventon:dom:0",
			kind: "dom",
			selector: "link#eventon_dynamic_styles-css, link[href*='/css/eventon_styles\\.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
