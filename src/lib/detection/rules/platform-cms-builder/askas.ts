import type { TechnologyDefinition } from '../../types';

export const askasTechnologyDefinition = {
	id: "askas",
	name: "Askas",
	website: "https://www.askas.com/",
	description: "Askas is an ecommerce design and shop system from Sweden, providing tools for online store creation and management.",
	icon: "Askas.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "askas:dom:0",
			kind: "dom",
			selector: "div[class*='askas'] > a[href*='www.askas.se']",
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
