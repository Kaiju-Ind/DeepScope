import type { TechnologyDefinition } from '../../types';

export const zupplerTechnologyDefinition = {
	id: "zuppler",
	name: "Zuppler",
	website: "https://www.zuppler.com",
	description: "Zuppler is a complete and branded online ordering solution for restaurants and caterers with multi-locations.",
	icon: "Zuppler.png",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "zuppler:dom:0",
			kind: "dom",
			selector: "link[href*='.zuppler.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
