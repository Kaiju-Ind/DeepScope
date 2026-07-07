import type { TechnologyDefinition } from '../../types';

export const plugAndPayTechnologyDefinition = {
	id: "plug-and-pay",
	name: "Plug&Pay",
	website: "https://plugandpay.nl",
	description: "Plug&Pay is a payment processor that provides payment solutions for ecommerce businesses.",
	icon: "Plug and Pay.png",
	categories: [
		"platform-cms-builder",
		"commerce-operations",
	],
	rules: [
		{
			id: "plug-and-pay:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^plug_pay_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "plug-and-pay:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.plugandpay\\.nl"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plug-and-pay:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^plugpay_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
