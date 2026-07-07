import type { TechnologyDefinition } from '../../types';

export const milonicTechnologyDefinition = {
	id: "milonic",
	name: "Milonic",
	website: "https://milonic.com",
	description: "Milonic is a platform for developing Dynamic Hypertext Markup Language (DHTML) JavaScript and building dynamic, DHTML-based websites.",
	icon: "Milonic.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "milonic:jsGlobal:0",
			kind: "jsGlobal",
			property: "milonic.C",
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
