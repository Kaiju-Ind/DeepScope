import type { TechnologyDefinition } from '../../types';

export const applePayTechnologyDefinition = {
	id: "apple-pay",
	name: "Apple Pay",
	website: "https://www.apple.com/apple-pay",
	description: "Apple Pay is a mobile payment and digital wallet service by Apple that allows users to make payments in person, in iOS apps, and on the web.",
	icon: "Apple.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "apple-pay:dom:0",
			kind: "dom",
			selector: "[aria-labelledby='pi-apple_pay']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "apple-pay:dom:1",
			kind: "dom",
			selector: "script#apple-pay",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "apple-pay:dom:2",
			kind: "dom",
			selector: "script#apple-pay-shop-capabilities",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "apple-pay:dom:3",
			kind: "dom",
			selector: "input#applePayMerchantId",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "apple-pay:jsGlobal:4",
			kind: "jsGlobal",
			property: "ApplePay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apple-pay:jsGlobal:5",
			kind: "jsGlobal",
			property: "applePayButtonClicked",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apple-pay:jsGlobal:6",
			kind: "jsGlobal",
			property: "braintree.applePay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apple-pay:jsGlobal:7",
			kind: "jsGlobal",
			property: "checkout.enabledpayments.applepay",
			valuePattern: new RegExp("^true$"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apple-pay:jsGlobal:8",
			kind: "jsGlobal",
			property: "dw.applepay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apple-pay:jsGlobal:9",
			kind: "jsGlobal",
			property: "enableApplePay",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
