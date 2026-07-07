import type { TechnologyDefinition } from '../../types';

export const shopmaticTechnologyDefinition = {
	id: "shopmatic",
	name: "Shopmatic",
	website: "https://goshopmatic.com",
	description: "Shopmatic is an ecommerce website builder.",
	icon: "Shopmatic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
