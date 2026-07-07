import type { TechnologyDefinition } from '../../types';

export const pizzanetzTechnologyDefinition = {
	id: "pizzanetz",
	name: "PizzaNetz",
	website: "https://www.pizzanetz.de",
	description: "PizzaNetz is an ordering system and shop system for pizzerias, Chinese restaurant and kebabs.",
	icon: "PizzaNetz.png",
	categories: [
		"platform-cms-builder",
		"booking-scheduling",
	],
	rules: [
		{
			id: "pizzanetz:dom:0",
			kind: "dom",
			selector: "form[name*='pizzanetz']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
