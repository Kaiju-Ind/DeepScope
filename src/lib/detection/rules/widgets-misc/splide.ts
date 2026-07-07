import type { TechnologyDefinition } from '../../types';

export const splideTechnologyDefinition = {
	id: "splide",
	name: "Splide",
	website: "https://splidejs.com",
	description: "Splide.js is a lightweight, responsive, and customizable slider and carousel library for JavaScript.",
	icon: "Splide.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "splide:jsGlobal:0",
			kind: "jsGlobal",
			property: "Splide.STATES",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "splide:jsGlobal:1",
			kind: "jsGlobal",
			property: "Splide.name",
			valuePattern: new RegExp("i"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
