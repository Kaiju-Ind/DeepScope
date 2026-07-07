import type { TechnologyDefinition } from '../../types';

export const happyMealPrepTechnologyDefinition = {
	id: "happy-meal-prep",
	name: "Happy Meal Prep",
	website: "https://happymealprep.com",
	description: "Happy Meal Prep is a food order management system tailored for the food industry.",
	icon: "HappyMealPrep.svg",
	categories: [
		"platform-cms-builder",
		"booking-scheduling",
	],
	rules: [
		{
			id: "happy-meal-prep:dom:0",
			kind: "dom",
			selector: "div.footer-block > a[href*='happymealprep.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
