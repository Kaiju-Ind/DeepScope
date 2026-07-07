import type { TechnologyDefinition } from '../../types';

export const uplistingTechnologyDefinition = {
	id: "uplisting",
	name: "Uplisting",
	website: "https://www.uplisting.io",
	description: "Uplisting is a property management system for Vacation Rental owners, operators and managers.",
	icon: "Uplisting.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "uplisting:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("Uplisting", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "uplisting:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("uplisting", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
