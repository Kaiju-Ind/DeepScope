import type { TechnologyDefinition } from '../../types';

export const resyTechnologyDefinition = {
	id: "resy",
	name: "Resy",
	website: "https://resy.com",
	description: "Resy is an technology and media company that provides an app and back-end management software for restaurant reservations.",
	icon: "Resy.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "resy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widgets\\.resy\\.\\w+"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "resy:jsGlobal:1",
			kind: "jsGlobal",
			property: "resyWidget",
			description: "Page-owned global matches a known technology marker.",
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
