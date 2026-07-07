import type { TechnologyDefinition } from '../../types';

export const coconstructTechnologyDefinition = {
	id: "coconstruct",
	name: "CoConstruct",
	website: "https://www.coconstruct.com",
	icon: "CoConstruct.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "coconstruct:dom:0",
			kind: "dom",
			selector: "a[href*='co-construct.com/skins'], iframe[src*='co-construct.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
