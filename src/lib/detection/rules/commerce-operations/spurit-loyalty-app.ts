import type { TechnologyDefinition } from '../../types';

export const spuritLoyaltyAppTechnologyDefinition = {
	id: "spurit-loyalty-app",
	name: "SpurIT Loyalty App",
	website: "https://spur-i-t.com/shopify-apps/loyalty-points-manager",
	description: "SpurIT Loyalty App is a turnkey solution allowing you to reward existing customers in a number of ways.",
	icon: "SpurIT.svg",
	categories: [
		"commerce-operations",
		"marketing-automation",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "spurit-loyalty-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-spurit\\.com\\/shopify-apps\\/loyaltypoints\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spurit-loyalty-app:jsGlobal:1",
			kind: "jsGlobal",
			property: "Spurit.Loyaltypoints",
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
