import type { TechnologyDefinition } from '../../types';

export const modulaTechnologyDefinition = {
	id: "modula",
	name: "Modula",
	website: "https://wp-modula.com",
	description: "Modula is a customizable gallery plugin for WordPress.",
	icon: "Modula.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "modula:jsGlobal:0",
			kind: "jsGlobal",
			property: "ModulaIsotope",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "modula:jsGlobal:1",
			kind: "jsGlobal",
			property: "modulaInViewport",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
