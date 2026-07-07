import type { TechnologyDefinition } from '../../types';

export const moatTechnologyDefinition = {
	id: "moat",
	name: "Moat",
	website: "https://moat.com/",
	description: "Moat is a digital ad analytics tool.",
	icon: "Moat.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "moat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("moatads\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
