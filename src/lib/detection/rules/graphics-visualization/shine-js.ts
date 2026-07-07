import type { TechnologyDefinition } from '../../types';

export const shineJsTechnologyDefinition = {
	id: "shine-js",
	name: "shine.js",
	website: "https://bigspaceship.github.io/shine.js/",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "shine-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("shine(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shine-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Shine",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
