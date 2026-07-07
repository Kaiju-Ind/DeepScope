import type { TechnologyDefinition } from '../../types';

export const preproductTechnologyDefinition = {
	id: "preproduct",
	name: "PreProduct",
	website: "https://preproduct.io",
	description: "PreProduct is a tool that enables businesses to boost sales and manage demand through Shopify’s pre-order system.",
	icon: "PreProduct.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "preproduct:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.preproduct\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "preproduct:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\/preproduct-embed\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "preproduct:jsGlobal:2",
			kind: "jsGlobal",
			property: "PPshowPreProduct",
			description: "Page-owned global matches a known technology marker.",
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
