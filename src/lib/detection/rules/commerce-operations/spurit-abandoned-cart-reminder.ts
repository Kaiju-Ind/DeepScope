import type { TechnologyDefinition } from '../../types';

export const spuritAbandonedCartReminderTechnologyDefinition = {
	id: "spurit-abandoned-cart-reminder",
	name: "SpurIT Abandoned Cart Reminder",
	website: "https://spur-i-t.com/shopify-apps/abandoned-cart-reminder/",
	description: "SpurIT Abandoned Cart Reminder bring back your Shopify store visitors who moved to another tab by blinking your store tab.",
	icon: "SpurIT.svg",
	categories: [
		"commerce-operations",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "spurit-abandoned-cart-reminder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-spurit\\.com\\/shopify-apps\\/abandoned-cart-reminder\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spurit-abandoned-cart-reminder:jsGlobal:1",
			kind: "jsGlobal",
			property: "ACR_SPURIT_Params.folderCss",
			valuePattern: new RegExp("cdn-spurit\\.com\\/shopify-apps\\/abandoned-cart-reminder\\/"),
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
