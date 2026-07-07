import type { TechnologyDefinition } from '../../types';

export const aboutYouCommerceSuiteTechnologyDefinition = {
	id: "about-you-commerce-suite",
	name: "ABOUT YOU Commerce Suite",
	website: "https://commercesuite.aboutyou.com",
	description: "ABOUT YOU Commerce Suite is an enterprise ready infrastructure solution designed for ecommerce companies.",
	icon: "ABOUT YOU Commerce Suite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "about-you-commerce-suite:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.aboutyou.de/'], img[src*='cdn.aboutyou.de/']",
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
