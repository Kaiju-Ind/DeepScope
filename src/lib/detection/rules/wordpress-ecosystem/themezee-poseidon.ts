import type { TechnologyDefinition } from '../../types';

export const themezeePoseidonTechnologyDefinition = {
	id: "themezee-poseidon",
	name: "ThemeZee Poseidon",
	website: "https://themezee.com/themes/poseidon",
	description: "ThemeZee Poseidon is an elegant designed WordPress theme featuring a splendid fullscreen image slideshow.",
	icon: "ThemeZee.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themezee-poseidon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/poseidon\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themezee-poseidon:jsGlobal:1",
			kind: "jsGlobal",
			property: "poseidonScreenReaderText",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
