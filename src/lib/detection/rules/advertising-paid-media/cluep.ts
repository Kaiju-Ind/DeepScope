import type { TechnologyDefinition } from '../../types';

export const cluepTechnologyDefinition = {
	id: "cluep",
	name: "Cluep",
	website: "https://cluep.com/",
	description: "Cluep's artificially intelligent mobile ad platform targets people based on what they are sharing, how they are feeling and where they go in the physical world.",
	icon: "Cluep.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "cluep:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cas\\.cluep\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
