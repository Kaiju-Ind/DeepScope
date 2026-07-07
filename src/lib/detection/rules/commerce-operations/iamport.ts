import type { TechnologyDefinition } from '../../types';

export const iamportTechnologyDefinition = {
	id: "iamport",
	name: "Iamport",
	website: "https://www.iamport.kr",
	description: "Iamport is an information technology company based in South Korea.",
	icon: "Iamport.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "iamport:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.iamport\\.kr\\/js\\/iamport\\.payment-([\\d\\.]+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "iamport:jsGlobal:1",
			kind: "jsGlobal",
			property: "IMP.request_pay",
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
