import type { TechnologyDefinition } from '../../types';

export const sociavoreTechnologyDefinition = {
	id: "sociavore",
	name: "Sociavore",
	website: "https://www.sociavore.co",
	description: "Sociavore is a platform providing mobile-friendly website solutions for restaurants, enabling optimized browsing and menu access across devices.",
	icon: "Sociavore.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sociavore:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Sociavore$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sociavore:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^sociavore$", "i"),
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
