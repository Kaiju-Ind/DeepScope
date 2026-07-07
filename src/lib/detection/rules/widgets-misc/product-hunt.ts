import type { TechnologyDefinition } from '../../types';

export const productHuntTechnologyDefinition = {
	id: "product-hunt",
	name: "Product Hunt",
	website: "https://www.producthunt.com",
	description: "Product Hunt is a community-based website that allows makers and marketers to launch their products or services and get in touch with their first real users.",
	icon: "Product Hunt.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "product-hunt:dom:0",
			kind: "dom",
			selector: "a[href*='.producthunt.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
