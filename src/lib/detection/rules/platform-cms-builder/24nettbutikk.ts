import type { TechnologyDefinition } from '../../types';

export const technology24nettbutikkTechnologyDefinition = {
	id: "24nettbutikk",
	name: "24nettbutikk",
	website: "https://www.24nettbutikk.no",
	description: "24nettbutikk is an ecommerce platform from Norway.",
	icon: "24nettbutikk.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "24nettbutikk:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_gat_24nb$", "i"),
			confidence: 50,
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "24nettbutikk:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^24nb$", "i"),
			confidence: 50,
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	requires: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
