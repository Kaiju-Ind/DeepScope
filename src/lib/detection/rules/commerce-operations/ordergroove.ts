import type { TechnologyDefinition } from '../../types';

export const ordergrooveTechnologyDefinition = {
	id: "ordergroove",
	name: "Ordergroove",
	website: "https://www.ordergroove.com/",
	description: "Ordergroove provides a SaaS (Software as a Service) based subscription and membership commerce platform.",
	icon: "ordergroove.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "ordergroove:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ordergroove\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ordergroove:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.ordergroove\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
