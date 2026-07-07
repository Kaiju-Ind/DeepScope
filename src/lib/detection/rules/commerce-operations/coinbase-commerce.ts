import type { TechnologyDefinition } from '../../types';

export const coinbaseCommerceTechnologyDefinition = {
	id: "coinbase-commerce",
	name: "Coinbase Commerce",
	website: "https://commerce.coinbase.com/",
	description: "Coinbase Commerce is a platform that enables merchants to accept cryptocurrency payments.",
	icon: "Coinbase.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "coinbase-commerce:dom:0",
			kind: "dom",
			selector: "a[href^='https://commerce.coinbase.com/checkout/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
