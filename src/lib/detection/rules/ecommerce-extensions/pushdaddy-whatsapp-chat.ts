import type { TechnologyDefinition } from '../../types';

export const pushdaddyWhatsappChatTechnologyDefinition = {
	id: "pushdaddy-whatsapp-chat",
	name: "PushDaddy Whatsapp Chat",
	website: "https://apps.shopify.com/whatsapp-chat-for-support",
	description: "Whatsapp Chat is an live chat and abondoned cart solution built by PushDaddy.",
	icon: "PushDaddy.png",
	categories: [
		"ecommerce-extensions",
		"commerce-operations",
	],
	rules: [
		{
			id: "pushdaddy-whatsapp-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shopify\\.com\\/.+\\/pushdaddy_v([\\d\\.]+).*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pushdaddy-whatsapp-chat:dom:1",
			kind: "dom",
			selector: "div.pushdaddy-chats",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
	implies: [
		"shopify",
		"whatsapp-business-chat",
	],
} as const satisfies TechnologyDefinition;
