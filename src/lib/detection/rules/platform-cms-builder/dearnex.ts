import type { TechnologyDefinition } from '../../types';

export const dearnexTechnologyDefinition = {
	id: "dearnex",
	name: "Dearnex",
	website: "https://www.dearnex.com",
	description: "Dearnex is an ecommerce platform that enables the creation and management of online stores.",
	icon: "Dearnex.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dearnex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.dearnex\\.cloud"),
			description: "Script source URL matches a known technology marker.",
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
