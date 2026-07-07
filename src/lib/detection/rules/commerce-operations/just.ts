import type { TechnologyDefinition } from '../../types';

export const justTechnologyDefinition = {
	id: "just",
	name: "JUST",
	website: "https://www.getjusto.com",
	description: "JUST is an one-click payment solution for online business and online shoppers.",
	icon: "JUST.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "just:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("checkout-button-.+\\/just-pay-button\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
