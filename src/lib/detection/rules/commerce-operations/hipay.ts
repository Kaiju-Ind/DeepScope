import type { TechnologyDefinition } from '../../types';

export const hipayTechnologyDefinition = {
	id: "hipay",
	name: "HiPay",
	website: "https://hipay.com/",
	description: "HiPay is a payment gateway provider and payment orchestration platform.",
	icon: "HiPay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "hipay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hipay\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hipay:jsGlobal:1",
			kind: "jsGlobal",
			property: "HiPay",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
