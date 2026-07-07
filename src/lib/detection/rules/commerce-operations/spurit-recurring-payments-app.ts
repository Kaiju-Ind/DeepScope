import type { TechnologyDefinition } from '../../types';

export const spuritRecurringPaymentsAppTechnologyDefinition = {
	id: "spurit-recurring-payments-app",
	name: "SpurIT Recurring Payments App",
	website: "https://spur-i-t.com/shopify-apps/recurring-order-subscription",
	description: "SpurIT Recurring Payments App is a simple way to create a system of bill payment,subscriptions and invoicing.",
	icon: "SpurIT.svg",
	categories: [
		"commerce-operations",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "spurit-recurring-payments-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-spurit\\.com\\/shopify-apps\\/recurring-invoices\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spurit-recurring-payments-app:jsGlobal:1",
			kind: "jsGlobal",
			property: "Spurit.recurringInvoices",
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
