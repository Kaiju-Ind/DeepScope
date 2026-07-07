import type { TechnologyDefinition } from '../../types';

export const sealSubscriptionsTechnologyDefinition = {
	id: "seal-subscriptions",
	name: "Seal Subscriptions",
	website: "https://www.sealsubscriptions.com",
	description: "Seal Subscriptions is a Shopify subscriptions app, packed with lots of features, such as automated product swaps, interval changes, payment calendar, Quick Checkout Wizard, and more.",
	icon: "Seal Subscriptions.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "seal-subscriptions:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sealsubscriptions\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "seal-subscriptions:jsGlobal:1",
			kind: "jsGlobal",
			property: "SealSubs.checkout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "seal-subscriptions:jsGlobal:2",
			kind: "jsGlobal",
			property: "sealsubscriptions_settings_updated",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "seal-subscriptions:jsGlobal:3",
			kind: "jsGlobal",
			property: "sealsubsloaded",
			description: "Page-owned global matches a known technology marker.",
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
