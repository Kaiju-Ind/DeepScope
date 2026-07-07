import type { TechnologyDefinition } from '../../types';

export const qikifyTechnologyDefinition = {
	id: "qikify",
	name: "Qikify",
	website: "https://qikify.com",
	description: "Qikify is a trusted Shopify Expert providing services for over 35,000 Shopify merchants through Shopify Apps or custom modifications.",
	icon: "Qikify.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "qikify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.qikify\\.com\\/"),
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
