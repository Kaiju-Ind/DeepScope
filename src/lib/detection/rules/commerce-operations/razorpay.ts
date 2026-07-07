import type { TechnologyDefinition } from '../../types';

export const razorpayTechnologyDefinition = {
	id: "razorpay",
	name: "Razorpay",
	website: "https://razorpay.com/",
	description: "Razorpay is a provider of an online payment gateway that allows businesses to accept, process, and disburse payments.",
	icon: "Razorpay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "razorpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("checkout\\.razorpay\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "razorpay:jsGlobal:1",
			kind: "jsGlobal",
			property: "Razorpay",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
