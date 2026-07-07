import type { TechnologyDefinition } from '../../types';

export const payuPaymentTechnologyDefinition = {
	id: "payu-payment",
	name: "PayU Payment",
	website: "https://corporate.payu.com",
	description: "PayU is a provider of financial solutions for ecommerce, facilitating online payments and related transaction services.",
	icon: "PayU.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "payu-payment:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.payu\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "payu-payment:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.payu\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "payu-payment:jsGlobal:2",
			kind: "jsGlobal",
			property: "OpenPayU",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "payu-payment:jsGlobal:3",
			kind: "jsGlobal",
			property: "PayU",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
