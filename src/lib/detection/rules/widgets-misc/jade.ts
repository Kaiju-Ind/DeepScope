import type { TechnologyDefinition } from '../../types';

export const jadeTechnologyDefinition = {
	id: "jade",
	name: "Jade",
	website: "https://jade-lang.com",
	description: "Jade is a templating engine primarily used for server-side templating in NodeJS.",
	icon: "Jade.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "jade:jsGlobal:0",
			kind: "jsGlobal",
			property: "JADE.components",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
