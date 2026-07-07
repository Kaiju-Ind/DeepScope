import type { TechnologyDefinition } from '../../types';

export const webxpayTechnologyDefinition = {
	id: "webxpay",
	name: "WEBXPAY",
	website: "https://webxpay.com",
	description: "WEBXPAY is a specialised online payment gateway that expedites buying and selling in a highly secured environment.",
	icon: "WEBXPAY.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "webxpay:jsGlobal:0",
			kind: "jsGlobal",
			property: "WEBXPAY",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
