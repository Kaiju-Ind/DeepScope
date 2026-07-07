import type { TechnologyDefinition } from '../../types';

export const omnisendEmailMarketingAndSmsTechnologyDefinition = {
	id: "omnisend-email-marketing-and-sms",
	name: "Omnisend Email Marketing & SMS",
	website: "https://apps.shopify.com/omnisend",
	description: "Omnisend Email Marketing & SMS is an omnichannel marketing automation channel that allows Shopify store owners to manage their SMS, web push notifications, WhatsApp, Facebook messenger, pop-ups, segmentation, and dynamic Facebook and Google ad integrations.",
	icon: "Omnisend.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "omnisend-email-marketing-and-sms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("omnis(?:nippet1|rc)\\.com\\/inShop\\/Embed\\/shopify\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "omnisend-email-marketing-and-sms:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("omnis(?:nippet1|rc)\\.com\\/inshop\\/embed\\/shopify\\.js"),
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
		"omnisend",
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
