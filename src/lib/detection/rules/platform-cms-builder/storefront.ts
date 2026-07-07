import type { TechnologyDefinition } from '../../types';

export const storefrontTechnologyDefinition = {
	id: "storefront",
	name: "Storefront",
	website: "https://www.storefront.co.za",
	description: "Storefront is an ecommerce solution that enables businesses to build, manage, and expand their online stores.",
	icon: "Storefront.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "storefront:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.storefront7\\.co\\.za"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "storefront:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^STOREFRONT", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "storefront:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^storefront", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
