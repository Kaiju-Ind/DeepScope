import type { TechnologyDefinition } from '../../types';

export const paypalCreditTechnologyDefinition = {
	id: "paypal-credit",
	name: "PayPal Credit",
	website: "https://www.paypal.com/uk/webapps/mpp/paypal-virtual-credit",
	description: "PayPal Credit is a reusable line of credit that lets you pay for online purchases over time.",
	icon: "PayPal.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paypal-credit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.paypalobjects\\.com\\/.+\\/smart-credit-message@([\\d\\.]+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "paypal-credit:dom:1",
			kind: "dom",
			selector: "img[alt*='PayPal Credit'], a[title*='PayPal Credit']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "paypal-credit:jsGlobal:2",
			kind: "jsGlobal",
			property: "PaypalOffersObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paypal-credit:jsGlobal:3",
			kind: "jsGlobal",
			property: "payPalCreditPopover",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"paypal",
	],
} as const satisfies TechnologyDefinition;
