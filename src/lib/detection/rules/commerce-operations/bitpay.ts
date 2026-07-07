import type { TechnologyDefinition } from '../../types';

export const bitpayTechnologyDefinition = {
	id: "bitpay",
	name: "BitPay",
	website: "https://www.bitpay.com",
	description: "BitPay is a payment processing platform that enables websites to accept bitcoins as a form of payment.",
	icon: "BitPay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "bitpay:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("bitpay"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "bitpay:dom:1",
			kind: "dom",
			selector: "form[action*='bitpay.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
