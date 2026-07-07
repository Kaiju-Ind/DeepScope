import type { TechnologyDefinition } from '../../types';

export const simplo7TechnologyDefinition = {
	id: "simplo7",
	name: "Simplo7",
	website: "https://www.simplo7.com.br",
	description: "Simplo7 is an all-in-one ecommerce product.",
	icon: "Simplo7.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "simplo7:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.simplo7\\.\\w+\\/"),
			description: "Script source URL matches a known technology marker.",
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
