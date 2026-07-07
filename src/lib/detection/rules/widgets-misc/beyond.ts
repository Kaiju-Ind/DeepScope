import type { TechnologyDefinition } from '../../types';

export const beyondTechnologyDefinition = {
	id: "beyond",
	name: "Beyond",
	website: "https://www.getbeyond.io",
	description: "Beyond is a slide-out panels system designed to expand or retract sections within a structure for flexible space management.",
	icon: "Beyond.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "beyond:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.getbeyond\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
