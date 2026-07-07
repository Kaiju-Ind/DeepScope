import type { TechnologyDefinition } from '../../types';

export const mysitefyTechnologyDefinition = {
	id: "mysitefy",
	name: "Mysitefy",
	website: "https://www.mysitefy.com",
	description: "Mysitefy is a digital platform for B2B enterprises. It provides companies with a closed-loop digital application system from website building to marketing, to customer and order management.",
	icon: "Mysitefy.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mysitefy:dom:0",
			kind: "dom",
			selector: "img[src*='//cdn.mysitefy.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
