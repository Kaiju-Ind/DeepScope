import type { TechnologyDefinition } from '../../types';

export const simbelTechnologyDefinition = {
	id: "simbel",
	name: "Simbel",
	website: "https://simbel.com.ar/",
	icon: "simbel.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "simbel:header:0",
			kind: "header",
			key: "powered",
			valuePattern: new RegExp("simbel", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
