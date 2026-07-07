import type { TechnologyDefinition } from '../../types';

export const baremetricsTechnologyDefinition = {
	id: "baremetrics",
	name: "Baremetrics",
	website: "https://baremetrics.com",
	description: "Baremetrics is a subscription analytics platform offering insights for payment providers like Stripe, Braintree, and others.",
	icon: "Baremetrics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "baremetrics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.baremetrics\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
