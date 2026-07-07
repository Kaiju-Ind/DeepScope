import type { TechnologyDefinition } from '../../types';

export const iyongTechnologyDefinition = {
	id: "iyong",
	name: "Iyong",
	website: "https://m.iyong.com",
	description: "Iyong is an intelligent website designed to simplify internet marketing through streamlined tools and data-driven functionality.",
	icon: "Iyong.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "iyong:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("link\\.iyong\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
