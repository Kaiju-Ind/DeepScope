import type { TechnologyDefinition } from '../../types';

export const armJsTechnologyDefinition = {
	id: "arm-js",
	name: "ARM JS",
	website: "https://github.com/michaeljymsgutierrez/arm-js-library",
	description: "ARM JS is a JavaScript library that centralizes data management and streamlines interactions with APIs.",
	icon: "ARMJS.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "arm-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "ARM.aliases",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
