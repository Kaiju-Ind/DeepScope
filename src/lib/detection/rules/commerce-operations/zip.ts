import type { TechnologyDefinition } from '../../types';

export const zipTechnologyDefinition = {
	id: "zip",
	name: "Zip",
	website: "https://www.zip.co/",
	description: "Zip is a payment service that lets you receive your purchase now and spread the total cost over an interest-free payment schedule.",
	icon: "zip_pay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "zip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("quadpay\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zip:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.zipmoney\\.com\\.au"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zip:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("zip\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zip:dom:3",
			kind: "dom",
			selector: "link[href*='widgets.quadpay.com/'], div[data-quadpay-src*='.quadpay.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "zip:jsGlobal:4",
			kind: "jsGlobal",
			property: "QuadPayShopify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zip:jsGlobal:5",
			kind: "jsGlobal",
			property: "checkout.enabledpayments.zip",
			valuePattern: new RegExp("^true$"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zip:jsGlobal:6",
			kind: "jsGlobal",
			property: "quadpayID",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
