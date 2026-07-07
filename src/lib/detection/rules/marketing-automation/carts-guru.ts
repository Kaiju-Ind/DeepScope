import type { TechnologyDefinition } from '../../types';

export const cartsGuruTechnologyDefinition = {
	id: "carts-guru",
	name: "Carts Guru",
	website: "https://www.carts.guru",
	description: "Carts Guru is the all-in-one marketing automation tool for ecommerce stores.",
	icon: "Carts Guru.png",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "carts-guru:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.cartsguru\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
