import type { TechnologyDefinition } from '../../types';

export const boldSubscriptionsTechnologyDefinition = {
	id: "bold-subscriptions",
	name: "Bold Subscriptions",
	website: "https://boldcommerce.com/shopify-subscription-app",
	description: "Bold Subscriptions provides powerful, API-driven customisation options to build and scale a subscription service that fits your business.",
	icon: "Bold.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "bold-subscriptions:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sub\\.boldapps\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bold-subscriptions:jsGlobal:1",
			kind: "jsGlobal",
			property: "BOLD.subscriptions",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
	implies: [
		"bold-commerce",
		"shopify",
	],
} as const satisfies TechnologyDefinition;
