import type { TechnologyDefinition } from '../../types';

export const pagevampTechnologyDefinition = {
	id: "pagevamp",
	name: "Pagevamp",
	website: "https://www.pagevamp.com",
	description: "Pagevamp is a website builder that allows users to create and customize websites quickly by pulling content from their existing Facebook pages or Instagram profiles, offering an easy way to set up a professional online presence.",
	icon: "Pagevamp.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pagevamp:jsGlobal:0",
			kind: "jsGlobal",
			property: "Pagevamp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pagevamp:header:1",
			kind: "header",
			key: "X-ServedBy",
			valuePattern: new RegExp("pagevamp", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pagevamp:header:2",
			kind: "header",
			key: "x-servedby",
			valuePattern: new RegExp("pagevamp", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
