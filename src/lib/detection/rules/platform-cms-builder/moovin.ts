import type { TechnologyDefinition } from '../../types';

export const moovinTechnologyDefinition = {
	id: "moovin",
	name: "Moovin",
	website: "https://moovin.com.br",
	description: "Moovin is an ecommerce platform.",
	icon: "Moovin.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "moovin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.moovin\\.(com|store)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "moovin:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.moovin\\.(app|com|store)"),
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
