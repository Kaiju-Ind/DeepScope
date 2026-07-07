import type { TechnologyDefinition } from '../../types';

export const jumioTechnologyDefinition = {
	id: "jumio",
	name: "Jumio",
	website: "https://www.jumio.com",
	description: "Jumio is an online mobile payments and identity verification company that provides card and ID scanning and validation products for mobile and web transactions.",
	icon: "Jumio.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "jumio:dom:0",
			kind: "dom",
			selector: "iframe[src*='.netverify.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
