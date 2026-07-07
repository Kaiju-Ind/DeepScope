import type { TechnologyDefinition } from '../../types';

export const bagTechnologyDefinition = {
	id: "bag",
	name: "Bag",
	website: "https://shantaweb.com",
	description: "Bag is a platform that provides an integrated solution for ecommerce growth, offering tools to streamline operations.",
	icon: "Bag.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bag:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^shanta_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
