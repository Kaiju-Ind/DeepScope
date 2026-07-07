import type { TechnologyDefinition } from '../../types';

export const myrestTechnologyDefinition = {
	id: "myrest",
	name: "MyRest",
	website: "https://myrest.io/",
	description: "MyRest is a reservation system for restaurants that incorporates updated guidelines for gastro marketing.",
	icon: "MyRest.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "myrest:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.myrest\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
