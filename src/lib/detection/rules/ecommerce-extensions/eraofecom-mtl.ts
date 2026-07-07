import type { TechnologyDefinition } from '../../types';

export const eraofecomMtlTechnologyDefinition = {
	id: "eraofecom-mtl",
	name: "EraofEcom MTL",
	website: "https://eraofecom.org/collections/tech/products/milk-the-leads",
	description: "EraofEcom MTL is a Shopify pop up app that enables you to catch your website visitors.",
	icon: "EraofEcom.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "eraofecom-mtl:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mtl\\.eraofecom\\.org"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
