import type { TechnologyDefinition } from '../../types';

export const paypalTechnologyDefinition = {
	id: "paypal",
	name: "PayPal",
	website: "https://paypal.com",
	description: "PayPal is an online payments system that supports online money transfers and serves as an electronic alternative to traditional paper methods like checks and money orders.",
	icon: "PayPal.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paypal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("paypalobjects\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "paypal:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.paypal\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "paypal:text:3",
			kind: "text",
			pattern: new RegExp("PayPal"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "paypal:dom:4",
			kind: "dom",
			selector: "iframe[src*='paypal.com'], img[src*='paypal.com'], img[src*='paypalobjects.com'], [aria-labelledby='pi-paypal'], [data-paypal-v4='true'], img[alt*='PayPal' i]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "paypal:jsGlobal:5",
			kind: "jsGlobal",
			property: "PAYPAL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paypal:jsGlobal:6",
			kind: "jsGlobal",
			property: "__paypal_global__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paypal:jsGlobal:7",
			kind: "jsGlobal",
			property: "checkout.enabledpayments.paypal",
			valuePattern: new RegExp("^true$"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paypal:jsGlobal:8",
			kind: "jsGlobal",
			property: "enablePaypal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paypal:jsGlobal:9",
			kind: "jsGlobal",
			property: "paypal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paypal:jsGlobal:10",
			kind: "jsGlobal",
			property: "paypalClientId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paypal:jsGlobal:11",
			kind: "jsGlobal",
			property: "paypalJs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paypal:jsGlobal:12",
			kind: "jsGlobal",
			property: "wc_ga_pro.available_gateways.paypal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paypal:header:13",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.paypal\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "paypal:meta:14",
			kind: "meta",
			key: "id",
			valuePattern: new RegExp("in-context-paypal-metadata", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "paypal:dom:15",
			kind: "dom",
			selector: "iframe[src*='paypal.com'], img[src*='paypal.com'], img[src*='paypalobjects.com'], [aria-labelledby='pi-paypal'], [data-paypal-v4], [data-paypal-commerce-button], [data-paypal-smart-button-version], img[alt*='PayPal']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
		cpe: "cpe:2.3:a:paypal:paypal:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
