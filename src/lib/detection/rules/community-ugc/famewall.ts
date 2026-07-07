import type { TechnologyDefinition } from '../../types';

export const famewallTechnologyDefinition = {
	id: "famewall",
	name: "Famewall",
	website: "https://famewall.io",
	description: "Famewall is a tool that converts social media mentions into visually appealing testimonials and automates the process of collecting them from customers using a custom collection feature.",
	icon: "Famewall.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "famewall:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.famewall\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
