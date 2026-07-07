import type { TechnologyDefinition } from '../../types';

export const avadaAvashipTechnologyDefinition = {
	id: "avada-avaship",
	name: "Avada AVASHIP",
	website: "https://apps.shopify.com/avaship",
	description: "Avada AVASHIP is an order tracking Shopify app.",
	icon: "Avada.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "avada-avaship:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("freeshippingbar\\.apps\\.avada\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "avada-avaship:jsGlobal:1",
			kind: "jsGlobal",
			property: "AVADA_FSB.bars",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
