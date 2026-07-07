import type { TechnologyDefinition } from '../../types';

export const delmTechnologyDefinition = {
	id: "delm",
	name: "Delm",
	website: "https://delm.io",
	description: "Delm is a customisable and multilingual delivery date estimation app for Shopify, providing shipping information.",
	icon: "Delm.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "delm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.delm\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
