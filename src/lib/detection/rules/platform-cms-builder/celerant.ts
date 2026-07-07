import type { TechnologyDefinition } from '../../types';

export const celerantTechnologyDefinition = {
	id: "celerant",
	name: "Celerant",
	website: "https://www.celerant.com",
	description: "Celerant is a retail management platform that integrates point of sale and ecommerce into a single system for streamlined business operations.",
	icon: "Celerant.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "celerant:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.celerantwebservices\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
