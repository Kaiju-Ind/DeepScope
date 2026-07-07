import type { TechnologyDefinition } from '../../types';

export const litmusTechnologyDefinition = {
	id: "litmus",
	name: "Litmus",
	website: "https://emltrk.com",
	description: "Litmus is an Email Analytics tool that offers email designers advanced open and read statistics for their email campaigns.",
	icon: "Litmus.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "litmus:dom:0",
			kind: "dom",
			selector: "img[src*='.emltrk.com/']",
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
