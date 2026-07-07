import type { TechnologyDefinition } from '../../types';

export const postpayTechnologyDefinition = {
	id: "postpay",
	name: "Postpay",
	website: "https://postpay.io",
	description: "Postpay is a payment solution that allows you to split your purchase amount into instalments.",
	icon: "Postpay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "postpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.postpay\\.io\\/(?:.+\\?ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "postpay:jsGlobal:1",
			kind: "jsGlobal",
			property: "PostpayJsConfig",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "postpay:jsGlobal:2",
			kind: "jsGlobal",
			property: "postpay",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "postpay:jsGlobal:3",
			kind: "jsGlobal",
			property: "wc_postpay_init_params",
			confidence: 25,
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
