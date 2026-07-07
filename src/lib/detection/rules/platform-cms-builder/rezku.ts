import type { TechnologyDefinition } from '../../types';

export const rezkuTechnologyDefinition = {
	id: "rezku",
	name: "Rezku",
	website: "https://rezku.com",
	description: "Rezku is a point-of-sale system for restaurants, designed by hospitality experts to manage orders, payments, inventory, and day-to-day operations.",
	icon: "Rezku.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rezku:dom:0",
			kind: "dom",
			selector: "iframe[src*='rezku.com/']",
			description: "DOM selector matches a known technology marker.",
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
