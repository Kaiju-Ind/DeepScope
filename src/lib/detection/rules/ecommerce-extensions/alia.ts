import type { TechnologyDefinition } from '../../types';

export const aliaTechnologyDefinition = {
	id: "alia",
	name: "Alia",
	website: "https://www.alialearn.com/",
	description: "Alia is a Shopify app to design Email and SMS sign-up pop-up units",
	icon: "Alia.png",
	categories: [
		"ecommerce-extensions",
		"surveys-feedback",
	],
	rules: [
		{
			id: "alia:jsGlobal:0",
			kind: "jsGlobal",
			property: "alia",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
