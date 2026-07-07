import type { TechnologyDefinition } from '../../types';

export const pinnaclecartTechnologyDefinition = {
	id: "pinnaclecart",
	name: "PinnacleCart",
	website: "https://www.pinnaclecart.com",
	description: "PinnacleCart is an ecommerce platform.",
	icon: "PinnacleCart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pinnaclecart:jsGlobal:0",
			kind: "jsGlobal",
			property: "USER_DELETE_ADDRESS",
			valuePattern: new RegExp("^DeleteShippingAddress$"),
			confidence: 49,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pinnaclecart:jsGlobal:1",
			kind: "jsGlobal",
			property: "USER_DELETE_PAYMENT_PROFILE",
			valuePattern: new RegExp("^DeletePaymentProfile$"),
			confidence: 49,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
