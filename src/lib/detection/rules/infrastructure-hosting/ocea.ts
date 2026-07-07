import type { TechnologyDefinition } from '../../types';

export const oceaTechnologyDefinition = {
	id: "ocea",
	name: "Ocea",
	website: "https://ocea.app",
	description: "Ocea is a web service facilitating website and app creation, leveraging cloud infrastructure.",
	icon: "Ocea.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "ocea:dom:0",
			kind: "dom",
			selector: "link[href*='.ocea.app/']",
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
