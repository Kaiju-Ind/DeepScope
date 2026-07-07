import type { TechnologyDefinition } from '../../types';

export const cufonTechnologyDefinition = {
	id: "cufon",
	name: "Cufon",
	website: "https://cufon.shoqolate.com",
	description: "Cufon is a tool used to overlap real text with an image.",
	icon: "Cufon.png",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "cufon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cufon-yui\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cufon:jsGlobal:1",
			kind: "jsGlobal",
			property: "Cufon",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
