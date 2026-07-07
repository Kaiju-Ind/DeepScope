import type { TechnologyDefinition } from '../../types';

export const giftnoteTechnologyDefinition = {
	id: "giftnote",
	name: "Giftnote",
	website: "https://giftnote.com",
	description: "Giftnote is a Shopify application that enables personalized gift messaging and digital voucher creation for online retail transactions.",
	icon: "Giftnote.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "giftnote:jsGlobal:0",
			kind: "jsGlobal",
			property: "Giftnote.currency",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
