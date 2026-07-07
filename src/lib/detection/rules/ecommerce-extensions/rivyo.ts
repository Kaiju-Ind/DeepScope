import type { TechnologyDefinition } from '../../types';

export const rivyoTechnologyDefinition = {
	id: "rivyo",
	name: "Rivyo",
	website: "https://rivyo.com",
	description: "Rivyo is a Shopify app for product reviews, loyalty programs, referrals, and user-generated content.",
	icon: "Rivyo.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "rivyo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shopify\\.com\\/extensions\\/[^/]+\\/rivyo-product-review-\\d+\\/assets\\/rivyo-script\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rivyo:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\brivyoCustomerDetails\\b"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "rivyo:dom:2",
			kind: "dom",
			selector: "meta#th_rivyo_shop_url, meta#wc_rivyo_shop_url",
			description: "DOM selector matches a known technology marker.",
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
