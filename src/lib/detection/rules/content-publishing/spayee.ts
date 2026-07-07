import type { TechnologyDefinition } from '../../types';

export const spayeeTechnologyDefinition = {
	id: "spayee",
	name: "Spayee",
	website: "https://learn.spayee.com",
	description: "Spayee is a platform that enables creators and businesses to build and sell online courses and digital products.",
	icon: "Spayee.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "spayee:dom:0",
			kind: "dom",
			selector: "link[href*='.spayee.com'][rel='canonical']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
