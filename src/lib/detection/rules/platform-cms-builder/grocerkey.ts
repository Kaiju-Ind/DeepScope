import type { TechnologyDefinition } from '../../types';

export const grocerkeyTechnologyDefinition = {
	id: "grocerkey",
	name: "GrocerKey",
	website: "https://grocerkey.com",
	description: "GrocerKey is an ecommerce platform that helps grocery stores build an online store.",
	icon: "GrocerKey.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "grocerkey:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.grocerywebsite\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "grocerkey:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("grocerkey-widget\\.s3\\.amazonaws\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
