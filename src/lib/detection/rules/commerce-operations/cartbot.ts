import type { TechnologyDefinition } from '../../types';

export const cartbotTechnologyDefinition = {
	id: "cartbot",
	name: "CartBot",
	website: "https://apps.shopify.com/cartbot-auto-add-to-cart",
	description: "CartBot is a tool that automatically adds products or gifts to a customer's cart based on predefined conditions.",
	icon: "CartBot.svg",
	categories: [
		"commerce-operations",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "cartbot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-app\\.cart-bot\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cartbot:jsGlobal:1",
			kind: "jsGlobal",
			property: "CartBotScriptAppended",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
