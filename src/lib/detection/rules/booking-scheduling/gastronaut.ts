import type { TechnologyDefinition } from '../../types';

export const gastronautTechnologyDefinition = {
	id: "gastronaut",
	name: "Gastronaut",
	website: "https://get.gastronaut.ai",
	description: "Gastronaut is a reservation system designed to automate the booking process, streamlining operations to enhance sales efficiency.",
	icon: "Gastronaut.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "gastronaut:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.gastronaut\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
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
