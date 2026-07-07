import type { TechnologyDefinition } from '../../types';

export const helixpayTechnologyDefinition = {
	id: "helixpay",
	name: "HelixPay",
	website: "https://helixpay.ph",
	description: "HelixPay is an event ticketing platform providing online payment integration, digital tickets, and customizable event websites for large-scale events.",
	icon: "HelixPay.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "helixpay:jsGlobal:0",
			kind: "jsGlobal",
			property: "HELIXPAY.PAGE",
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
