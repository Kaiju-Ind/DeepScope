import type { TechnologyDefinition } from '../../types';

export const naveggTechnologyDefinition = {
	id: "navegg",
	name: "Navegg",
	website: "https://www.navegg.com/",
	icon: "Navegg.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "navegg:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tag\\.navdmp\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
