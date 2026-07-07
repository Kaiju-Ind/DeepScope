import type { TechnologyDefinition } from '../../types';

export const withReachTechnologyDefinition = {
	id: "with-reach",
	name: "With Reach",
	website: "https://www.withreach.com",
	description: "With Reach is a fintech/payments service provider that helps retailers connect with customers around the world.",
	icon: "With Reach.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "with-reach:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.rch\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "with-reach:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("checkout\\.gointerpay\\.net"),
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
