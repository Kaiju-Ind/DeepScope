import type { TechnologyDefinition } from '../../types';

export const bridgerpayTechnologyDefinition = {
	id: "bridgerpay",
	name: "BridgerPay",
	website: "https://bridgerpay.com",
	description: "BridgerPay is a payment operations platform designed to scale with businesses of any size.",
	icon: "BridgerPay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "bridgerpay:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.bridgerpay\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "bridgerpay:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.bridgerpay\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
