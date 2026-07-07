import type { TechnologyDefinition } from '../../types';

export const coffeecupTechnologyDefinition = {
	id: "coffeecup",
	name: "CoffeeCup",
	website: "https://www.coffeecup.com",
	description: "CoffeeCup is a suite of web development tools for building sites, emails, and forms, with optional coding for added flexibility.",
	icon: "CoffeeCup.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "coffeecup:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^CoffeeCup Visual Site Designer", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "coffeecup:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^coffeecup visual site designer", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
