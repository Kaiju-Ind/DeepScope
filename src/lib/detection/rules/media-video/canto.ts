import type { TechnologyDefinition } from '../../types';

export const cantoTechnologyDefinition = {
	id: "canto",
	name: "Canto",
	website: "https://www.canto.com",
	description: "Canto is a digital asset management solution.",
	icon: "Canto.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "canto:dom:0",
			kind: "dom",
			selector: "link[href*='.canto.com/'], a[href*='.canto.com/'], img[src*='.canto.com/']",
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
