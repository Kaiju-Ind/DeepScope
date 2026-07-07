import type { TechnologyDefinition } from '../../types';

export const cartfulTechnologyDefinition = {
	id: "cartful",
	name: "Cartful",
	website: "https://www.cartful.com",
	description: "Cartful is a customer-focused service that assists online shoppers in locating suitable products on a website.",
	icon: "Cartful.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "cartful:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("embed\\.cartfulsolutions\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
