import type { TechnologyDefinition } from '../../types';

export const clickskeksTechnologyDefinition = {
	id: "clickskeks",
	name: "Clickskeks",
	website: "https://www.clickskeks.at/",
	description: "Clickskeks is an all-in-one cookie consent management platform for businesses.",
	icon: "Clickskeks.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "clickskeks:jsGlobal:0",
			kind: "jsGlobal",
			property: "Clickskeks",
			description: "Page-owned global matches a known technology marker.",
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
