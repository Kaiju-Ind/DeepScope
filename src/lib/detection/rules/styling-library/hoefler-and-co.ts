import type { TechnologyDefinition } from '../../types';

export const hoeflerAndCoTechnologyDefinition = {
	id: "hoefler-and-co",
	name: "Hoefler&Co",
	website: "https://www.typography.com",
	description: "Hoefler&Co is a digital type foundry (font design studio) in Woburn, Massachusetts (formerly New York City), founded by type designer Jonathan Hoefler. Hoefler&Co designs typefaces for clients and for retail on its website.",
	icon: "Hoefler&Co.svg",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "hoefler-and-co:dom:0",
			kind: "dom",
			selector: "link[href*='cloud.typography.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
