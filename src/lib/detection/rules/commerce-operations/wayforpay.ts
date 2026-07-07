import type { TechnologyDefinition } from '../../types';

export const wayforpayTechnologyDefinition = {
	id: "wayforpay",
	name: "WayForPay",
	website: "https://wayforpay.com",
	description: "WayForPay is a payment processing service provider based in Europe.",
	icon: "WayForPay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "wayforpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("secure\\.wayforpay\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wayforpay:dom:1",
			kind: "dom",
			selector: "form[action*='secure.wayforpay.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
