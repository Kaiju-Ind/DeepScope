import type { TechnologyDefinition } from '../../types';

export const ordersifyProductAlertsTechnologyDefinition = {
	id: "ordersify-product-alerts",
	name: "Ordersify Product Alerts",
	website: "https://ordersify.com/products/product-alerts",
	description: "Ordersify Product Alerts is a Shopify app which detects automatically product stock and send email alerts to contact immediately after your products are restocked.",
	icon: "Ordersify.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "ordersify-product-alerts:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.ordersify\\.com\\/sdk\\/productalerts-shopify\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ordersify-product-alerts:jsGlobal:1",
			kind: "jsGlobal",
			property: "ORDERSIFY_BIS.stockRemainingSetting",
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
