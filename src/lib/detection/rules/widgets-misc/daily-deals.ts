import type { TechnologyDefinition } from '../../types';

export const dailyDealsTechnologyDefinition = {
	id: "daily-deals",
	name: "Daily Deals",
	website: "https://dailydeals.ai",
	description: "Daily Deals is a flash sale, limited-time discounts, countdown timers, and sales analytics solution.",
	icon: "Daily Deals.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "daily-deals:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.dailydeals\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "daily-deals:jsGlobal:1",
			kind: "jsGlobal",
			property: "ddAddToCheckout",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "daily-deals:jsGlobal:2",
			kind: "jsGlobal",
			property: "ddAddToOrder",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
