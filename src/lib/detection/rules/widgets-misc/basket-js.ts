import type { TechnologyDefinition } from '../../types';

export const basketJsTechnologyDefinition = {
	id: "basket-js",
	name: "basket.js",
	website: "https://addyosmani.github.io/basket.js/",
	description: "basket.js is a JavaScript library for caching and loading scripts with localStorage.",
	icon: "basket.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "basket-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "basket.isValidItem",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
