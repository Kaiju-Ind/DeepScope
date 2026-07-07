import type { TechnologyDefinition } from '../../types';

export const klarnaCheckoutTechnologyDefinition = {
	id: "klarna-checkout",
	name: "Klarna Checkout",
	website: "https://www.klarna.com/international/",
	description: "Klarna Checkout is a complete payment solution where Klarna handles a store's entire checkout.",
	icon: "Klarna.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "klarna-checkout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.klarnaservices\\.com\\/lib\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "klarna-checkout:dom:1",
			kind: "dom",
			selector: "[aria-labelledby='pi-klarna']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "klarna-checkout:jsGlobal:2",
			kind: "jsGlobal",
			property: "KlarnaOnsiteService",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "klarna-checkout:jsGlobal:3",
			kind: "jsGlobal",
			property: "_klarnaCheckout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "klarna-checkout:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^ku1\\-sid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "klarna-checkout:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^ku1\\-vid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "klarna-checkout:header:6",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.klarna(?:cdn|services)\\.(?:net|com)", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
