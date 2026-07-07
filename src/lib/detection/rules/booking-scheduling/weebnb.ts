import type { TechnologyDefinition } from '../../types';

export const weebnbTechnologyDefinition = {
	id: "weebnb",
	name: "WeeBnB",
	website: "https://www.weebnb.com",
	description: "WeeBnB is a rental optimization platform that provides a website for managing and promoting vacation rentals.",
	icon: "WeeBnB.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "weebnb:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^WeeBnB$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "weebnb:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^weebnb$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
