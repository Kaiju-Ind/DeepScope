import type { TechnologyDefinition } from '../../types';

export const refundidTechnologyDefinition = {
	id: "refundid",
	name: "Refundid",
	website: "https://refundid.com",
	description: "Refundid provides ecommerce customers instant refunds for their online returns.",
	icon: "Refundid.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "refundid:dom:0",
			kind: "dom",
			selector: "a[href*='.refundid.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "refundid:jsGlobal:1",
			kind: "jsGlobal",
			property: "launchRefundidPopup",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
