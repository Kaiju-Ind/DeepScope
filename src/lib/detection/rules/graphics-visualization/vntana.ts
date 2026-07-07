import type { TechnologyDefinition } from '../../types';

export const vntanaTechnologyDefinition = {
	id: "vntana",
	name: "Vntana",
	website: "https://www.vntana.com",
	description: "Vntana (stylised as VNTANA) is an American social augmented reality company.",
	icon: "Vntana.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "vntana:dom:0",
			kind: "dom",
			selector: "iframe[src*='embed.vntana.com/'], iframe[nitro-lazy-src*='embed.vntana.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
