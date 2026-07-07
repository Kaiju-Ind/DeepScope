import type { TechnologyDefinition } from '../../types';

export const shopPayTechnologyDefinition = {
	id: "shop-pay",
	name: "Shop Pay",
	website: "https://shop.app",
	description: "Shop Pay is an accelerated checkout that allows customers to save their email address, credit card, and shipping and billing information so they can complete their transaction faster the next time they are directed to the Shopify checkout.",
	icon: "Shop Pay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "shop-pay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shopify\\.com\\/shopifycloud\\/shopify_pay\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shop-pay:dom:1",
			kind: "dom",
			selector: "[aria-labelledby='pi-shopify_pay']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "shop-pay:dom:2",
			kind: "dom",
			selector: "ul[data-shopify-buttoncontainer] li",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "shop-pay:text:3",
			kind: "text",
			pattern: new RegExp("ShopPay"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "shop-pay:jsGlobal:4",
			kind: "jsGlobal",
			property: "ShopifyPay.apiHost",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shop-pay:jsGlobal:5",
			kind: "jsGlobal",
			property: "ShopPay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shop-pay:scriptSrc:6",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shopify\\.com\\/shopifycloud\\/shopify-js\\/shop-pay-payment-request\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
