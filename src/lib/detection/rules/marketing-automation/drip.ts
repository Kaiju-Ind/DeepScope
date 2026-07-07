import type { TechnologyDefinition } from '../../types';

export const dripTechnologyDefinition = {
	id: "drip",
	name: "Drip",
	website: "https://www.drip.com",
	description: "Drip is a marketing automation platform built for ecommerce.",
	icon: "Drip.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "drip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getdrip\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
