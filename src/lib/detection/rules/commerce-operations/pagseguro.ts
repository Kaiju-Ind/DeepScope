import type { TechnologyDefinition } from '../../types';

export const pagseguroTechnologyDefinition = {
	id: "pagseguro",
	name: "PagSeguro",
	website: "https://pagseguro.uol.com.br",
	description: "PagSeguro is an online or mobile payment-based ecommerce service for commercial operations.",
	icon: "PagSeguro.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pagseguro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pagseguro\\.uol\\.com\\.br\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pagseguro:dom:1",
			kind: "dom",
			selector: "form[action*='pagseguro.uol.com.br'][target='pagseguro']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pagseguro:jsGlobal:2",
			kind: "jsGlobal",
			property: "PagSeguroDirectPayment",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pagseguro:jsGlobal:3",
			kind: "jsGlobal",
			property: "_PagSeguroDirectPayment",
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
