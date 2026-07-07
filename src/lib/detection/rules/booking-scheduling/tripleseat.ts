import type { TechnologyDefinition } from '../../types';

export const tripleseatTechnologyDefinition = {
	id: "tripleseat",
	name: "Tripleseat",
	website: "https://tripleseat.com",
	description: "Tripleseat is an event management platform that streamlines venue booking, guest communication, and event coordination for restaurants, hotels, and hospitality teams.",
	icon: "Tripleseat.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "tripleseat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.tripleseat\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
