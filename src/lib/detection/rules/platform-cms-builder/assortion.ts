import type { TechnologyDefinition } from '../../types';

export const assortionTechnologyDefinition = {
	id: "assortion",
	name: "Assortion",
	website: "https://www.assortion.com",
	description: "Assortion is a tool that helps merchants increase average order value by providing personalized upsell and cross-sell recommendations during the shopping experience.",
	icon: "Assortion.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "assortion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.assortion\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "assortion:jsGlobal:1",
			kind: "jsGlobal",
			property: "Assortion.cart",
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
