import type { TechnologyDefinition } from '../../types';

export const superlemonAppTechnologyDefinition = {
	id: "superlemon-app",
	name: "SuperLemon app",
	website: "https://apps.shopify.com/whatsapp-chat-button",
	description: "SuperLemon app is an all-in-one WhatsApp plugin for Shopify stores.",
	icon: "SuperLemon.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "superlemon-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/files\\/superlemon_.+\\.js"),
			description: "Script source URL matches a known technology marker.",
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
		"whatsapp-business-chat",
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
