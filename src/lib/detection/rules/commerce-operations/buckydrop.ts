import type { TechnologyDefinition } from '../../types';

export const buckydropTechnologyDefinition = {
	id: "buckydrop",
	name: "BuckyDrop",
	website: "https://www.buckydrop.com",
	description: "BuckyDrop is a drop-shipping service specializing in sourcing, fulfillment, and operations across Chinese ecommerce platforms.",
	icon: "BuckyDrop.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "buckydrop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.mybuckyshop\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buckydrop:jsGlobal:1",
			kind: "jsGlobal",
			property: "buckyShop.addCSS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
