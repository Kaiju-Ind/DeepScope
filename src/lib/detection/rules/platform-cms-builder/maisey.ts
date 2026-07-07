import type { TechnologyDefinition } from '../../types';

export const maiseyTechnologyDefinition = {
	id: "maisey",
	name: "Maisey",
	website: "https://www.maisey.co",
	description: "Maisey is a website builder for churches.",
	icon: "Maisey.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "maisey:dom:0",
			kind: "dom",
			selector: "script[data-cb-site='maisey']",
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
