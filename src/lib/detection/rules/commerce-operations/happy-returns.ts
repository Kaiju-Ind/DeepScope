import type { TechnologyDefinition } from '../../types';

export const happyReturnsTechnologyDefinition = {
	id: "happy-returns",
	name: "Happy Returns",
	website: "https://happyreturns.com",
	description: "Happy Returns is a return software and reverse logistics company, provides a packaging-free, in-person way for customers to return an online purchase for an immediate refund.",
	icon: "Happy Returns.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "happy-returns:dom:0",
			kind: "dom",
			selector: "a[href*='.happyreturns.com'], img[src*='.happyreturns.com/']",
			description: "DOM selector matches a known technology marker.",
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
