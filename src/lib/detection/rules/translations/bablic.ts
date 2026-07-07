import type { TechnologyDefinition } from '../../types';

export const bablicTechnologyDefinition = {
	id: "bablic",
	name: "Bablic",
	website: "https://www.bablic.com/",
	description: "Bablic is a localisation solution to translate your website.",
	icon: "bablic.png",
	categories: [
		"translations",
	],
	rules: [
		{
			id: "bablic:jsGlobal:0",
			kind: "jsGlobal",
			property: "bablic",
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
