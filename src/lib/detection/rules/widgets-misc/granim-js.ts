import type { TechnologyDefinition } from '../../types';

export const granimJsTechnologyDefinition = {
	id: "granim-js",
	name: "Granim.js",
	website: "https://sarcadass.github.io/granim.js",
	description: "Granim.js is a lightweight javascript library to create fluid and interactive gradients animations.",
	icon: "default.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "granim-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "Granim",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
