import type { TechnologyDefinition } from '../../types';

export const sifrTechnologyDefinition = {
	id: "sifr",
	name: "sIFR",
	website: "https://www.mikeindustries.com/blog/sifr",
	description: "sIFR is a JavaScript and Adobe Flash dynamic web fonts implementation.",
	icon: "sIFR.png",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "sifr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sifr\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
