import type { TechnologyDefinition } from '../../types';

export const publiveTechnologyDefinition = {
	id: "publive",
	name: "Publive",
	website: "https://thepublive.com",
	description: "PubLive is a headless CMS for online publishers.",
	icon: "PubLive.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "publive:dom:0",
			kind: "dom",
			selector: "link[href*='.thepublive.com/'], img[src*='.thepublive.com/']",
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
