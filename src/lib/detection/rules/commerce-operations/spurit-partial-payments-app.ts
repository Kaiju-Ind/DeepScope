import type { TechnologyDefinition } from '../../types';

export const spuritPartialPaymentsAppTechnologyDefinition = {
	id: "spurit-partial-payments-app",
	name: "SpurIT Partial Payments App",
	website: "https://spur-i-t.com/shopify-apps/split-partial-payments/",
	description: "SpurIT Partial Payments App allow your customers to pay for the order in several ways or to share a payment with other people.",
	icon: "SpurIT.svg",
	categories: [
		"commerce-operations",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "spurit-partial-payments-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-spurit\\.com\\/shopify-apps\\/split-payments\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
