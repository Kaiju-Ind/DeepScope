import type { TechnologyDefinition } from '../../types';

export const omnyStudioTechnologyDefinition = {
	id: "omny-studio",
	name: "Omny Studio",
	website: "https://omnystudio.com",
	description: "Omny Studio is a podcast hosting solution, which enables radio stations and enterprises to manage, monetize, publish, share, edit and analyze audio episodes.",
	icon: "Omny Studio.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "omny-studio:dom:0",
			kind: "dom",
			selector: "iframe[src*='//omny.fm/shows/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
