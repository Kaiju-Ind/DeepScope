import type { TechnologyDefinition } from '../../types';

export const provenexpertTechnologyDefinition = {
	id: "provenexpert",
	name: "ProvenExpert",
	website: "https://www.provenexpert.com",
	description: "ProvenExpert is a review based marketing platform that allows users to create customer surveys, provides aggregate reviews and ratings.",
	icon: "ProvenExpert.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "provenexpert:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("provenexpert\\.\\w+\\/widget"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "provenexpert:dom:1",
			kind: "dom",
			selector: "img[src*='provenexpert']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
