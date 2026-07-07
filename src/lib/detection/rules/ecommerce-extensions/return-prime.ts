import type { TechnologyDefinition } from '../../types';

export const returnPrimeTechnologyDefinition = {
	id: "return-prime",
	name: "Return Prime",
	website: "https://www.returnprime.com/",
	description: "Return Prime is an application to manage returns for Shopify stores.",
	icon: "return-prime.png",
	categories: [
		"ecommerce-extensions",
		"commerce-operations",
	],
	rules: [
		{
			id: "return-prime:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/return-prime-proxy-prod\\.s3[^ ]*\\.amazonaws\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
