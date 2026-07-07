import type { TechnologyDefinition } from '../../types';

export const shopifyChatTechnologyDefinition = {
	id: "shopify-chat",
	name: "Shopify Chat",
	website: "https://www.shopify.com/inbox",
	description: "Shopify Chat is Shopify's native live chat function that allows you to have real-time conversations with customers visiting your Shopify store.",
	icon: "Shopify.svg",
	categories: [
		"email-messaging",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "shopify-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shopify\\.com\\/shopifycloud\\/shopify_chat\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopify-chat:dom:1",
			kind: "dom",
			selector: "div#shopify-chat",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
