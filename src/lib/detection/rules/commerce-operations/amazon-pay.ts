import type { TechnologyDefinition } from '../../types';

export const amazonPayTechnologyDefinition = {
	id: "amazon-pay",
	name: "Amazon Pay",
	website: "https://pay.amazon.com",
	description: "Amazon Pay is an online payments processing service that is owned by Amazon. It lets you use the payment methods associated with your Amazon account to make payments for goods and services.",
	icon: "Amazon Pay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "amazon-pay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/amazonpayments(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "amazon-pay:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.payments-amazon\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "amazon-pay:requestUrl:2",
			kind: "requestUrl",
			pattern: new RegExp("payments\\.amazon\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "amazon-pay:dom:3",
			kind: "dom",
			selector: "img[src*='amazonpay'], [aria-labelledby='pi-amazon'], meta[id='amazon-payments-metadata'], [data-amazon-payments='true']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "amazon-pay:jsGlobal:4",
			kind: "jsGlobal",
			property: "AmazonPayments",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amazon-pay:jsGlobal:5",
			kind: "jsGlobal",
			property: "OffAmazonPayments",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amazon-pay:jsGlobal:6",
			kind: "jsGlobal",
			property: "enableAmazonPay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amazon-pay:jsGlobal:7",
			kind: "jsGlobal",
			property: "onAmazonPaymentsReady",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amazon-pay:meta:8",
			kind: "meta",
			key: "id",
			valuePattern: new RegExp("amazon-payments-metadata", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
