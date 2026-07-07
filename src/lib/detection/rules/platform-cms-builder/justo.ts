import type { TechnologyDefinition } from '../../types';

export const justoTechnologyDefinition = {
	id: "justo",
	name: "Justo",
	website: "https://www.getjusto.com",
	description: "Justo is a subscription-based software that allows anyone to set up an online store and sell their products with delivery options.",
	icon: "Justo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "justo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getjusto\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
