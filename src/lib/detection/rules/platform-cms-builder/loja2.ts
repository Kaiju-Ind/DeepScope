import type { TechnologyDefinition } from '../../types';

export const loja2TechnologyDefinition = {
	id: "loja2",
	name: "Loja2",
	website: "https://www.loja2.com.br",
	description: "Loja2 is an all-in-one ecommerce platform from Brazil.",
	icon: "Loja2.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "loja2:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("loja2\\.com\\.br"),
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
