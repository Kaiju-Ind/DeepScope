import type { TechnologyDefinition } from '../../types';

export const latitudepayTechnologyDefinition = {
	id: "latitudepay",
	name: "LatitudePay",
	website: "https://www.latitudepay.com",
	description: "LatitudePay is an interest-free, buy now, pay later solution.",
	icon: "LatitudePay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "latitudepay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.latitudepayapps\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "latitudepay:dom:1",
			kind: "dom",
			selector: "a[href*='latitudepay.com/'][target='_blank'], img[src='.latitudepayapps.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "latitudepay:jsGlobal:2",
			kind: "jsGlobal",
			property: "checkout.enabledpayments.latitudepay",
			valuePattern: new RegExp("^true$"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "latitudepay:jsGlobal:3",
			kind: "jsGlobal",
			property: "wc_ga_pro.available_gateways.latitudepay",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
