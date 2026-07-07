import type { TechnologyDefinition } from '../../types';

export const arwesTechnologyDefinition = {
	id: "arwes",
	name: "Arwes",
	website: "https://arwes.dev",
	description: "Arwes is a futuristic sci-fi UI web framework.",
	icon: "Arwes.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "arwes:dom:0",
			kind: "dom",
			selector: "style[data-meta^='ArwesSounds(t)']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
