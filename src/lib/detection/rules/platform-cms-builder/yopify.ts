import type { TechnologyDefinition } from '../../types';

export const yopifyTechnologyDefinition = {
	id: "yopify",
	name: "Yopify",
	website: "https://www.yopify.com",
	description: "Yopify is an ecommerce app suite designed to boost sales, increase conversions, and enhance the customer experience.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "yopify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/yopify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:yopify:yopify:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
