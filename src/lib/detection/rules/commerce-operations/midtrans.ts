import type { TechnologyDefinition } from '../../types';

export const midtransTechnologyDefinition = {
	id: "midtrans",
	name: "Midtrans",
	website: "https://midtrans.com",
	description: "Midtrans is a payment gateway system from Indonesia.",
	icon: "Midtrans.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "midtrans:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app(?:\\.sandbox)?\\.midtrans\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
