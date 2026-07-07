import type { TechnologyDefinition } from '../../types';

export const delightchatTechnologyDefinition = {
	id: "delightchat",
	name: "DelightChat",
	website: "https://www.delightchat.io",
	description: "DelightChat is a customer service platform for Shopify, offering omnichannel support via Email, Live Chat, Facebook, Instagram, and WhatsApp, all managed through a shared inbox.",
	icon: "DelightChat.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "delightchat:dom:0",
			kind: "dom",
			selector: "div#delightchat-widget, div#delightchat-welcome-widget",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
